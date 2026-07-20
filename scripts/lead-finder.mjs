#!/usr/bin/env node
// lead-finder.mjs — find local-services businesses that need a website.
//
// Uses the Google Places API (New). Pulls businesses for a category + city,
// then ranks them as leads: businesses with NO website are the hottest, ones
// with a weak/broken site are next, and ones with a solid modern site are
// filtered out (unless you ask to keep them).
//
// No npm dependencies. Node 20.6+ (native fetch + --env-file).
//
// Setup (one time):
//   1. https://console.cloud.google.com  →  create/pick a project
//   2. APIs & Services → Enable APIs → enable "Places API (New)"
//   3. Credentials → Create credentials → API key
//   4. Put it in .env.local:   GOOGLE_PLACES_API_KEY=AIza...
//   (Billing must be on. Google's free tier covers a lot of runs; Text Search
//    is roughly $32 / 1000 requests and each run here is ~1-3 requests.)
//
// Usage:
//   node --env-file=.env.local scripts/lead-finder.mjs \
//        --query "plumbers" --location "Boise, ID" --check-sites --out leads.csv
//
// Flags:
//   --query "<text>"      What to search for. e.g. "plumbers", "hair salon",
//                         "hvac", "landscaping", "dentist". (required)
//   --location "<place>"  City/area to bias the search to. e.g. "Boise, ID".
//   --check-sites         Fetch each business's site and score it
//                         (HTTPS? mobile-friendly? alive?). Slower but finds
//                         the "has a bad site" leads, not just the missing ones.
//   --keep-good           Include businesses whose site scores as solid.
//                         Off by default — those aren't leads.
//   --max <n>             Max businesses to pull (default 60, the API cap).
//   --out <file>          CSV path (default: leads.csv).

const API = "https://places.googleapis.com/v1/places:searchText";
const KEY = process.env.GOOGLE_PLACES_API_KEY;

// ---- arg parsing -----------------------------------------------------------
function arg(name, fallback = null) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const next = process.argv[i + 1];
  if (!next || next.startsWith("--")) return true; // boolean flag
  return next;
}

const query = arg("query");
const location = arg("location", "");
const checkSites = arg("check-sites") === true;
const keepGood = arg("keep-good") === true;
const maxResults = parseInt(arg("max", "60"), 10);
const outFile = arg("out", "leads.csv");

if (!KEY) {
  console.error(
    "\n  Missing GOOGLE_PLACES_API_KEY.\n" +
      "  Add it to .env.local and run with:  node --env-file=.env.local ...\n" +
      "  Setup steps are at the top of this file.\n"
  );
  process.exit(1);
}
if (!query || query === true) {
  console.error('\n  Missing --query. e.g. --query "plumbers" --location "Boise, ID"\n');
  process.exit(1);
}

// ---- Places API ------------------------------------------------------------
const FIELDS = [
  "places.displayName",
  "places.websiteUri",
  "places.nationalPhoneNumber",
  "places.formattedAddress",
  "places.rating",
  "places.userRatingCount",
  "places.businessStatus",
  "places.googleMapsUri",
  "places.primaryTypeDisplayName",
  "nextPageToken",
].join(",");

async function search() {
  const textQuery = location ? `${query} in ${location}` : query;
  const places = [];
  let pageToken = null;

  do {
    const body = { textQuery };
    if (pageToken) body.pageToken = pageToken;

    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": KEY,
        "X-Goog-FieldMask": FIELDS,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`\n  Places API error ${res.status}:\n${text}\n`);
      process.exit(1);
    }

    const json = await res.json();
    if (json.places) places.push(...json.places);
    pageToken = json.nextPageToken || null;

    // The API needs a beat before a page token becomes valid.
    if (pageToken && places.length < maxResults) await sleep(2000);
  } while (pageToken && places.length < maxResults);

  return places.slice(0, maxResults);
}

// ---- website scoring -------------------------------------------------------
// Tiers: "none" (no site) | "weak" (real lead: broken/dated/not-mobile) |
//        "protected" (bot wall — likely a REAL maintained site, NOT a lead) |
//        "unknown" (unreachable/ambiguous — verify by hand) | "solid" (skip).
//
// A realistic browser UA gets past naive user-agent blocks so more sites score
// honestly. It won't beat a real Cloudflare JS challenge — those we detect and
// label "protected" instead of falsely calling the site broken.

// Cloudflare / Incapsula / Akamai / generic bot-challenge fingerprints.
const BLOCK_MARKERS = [
  "just a moment",
  "cf-browser-verification",
  "cf-chl",
  "__cf_chl",
  "checking your browser",
  "attention required",
  "enable javascript and cookies",
  "ddos protection by",
  "request unsuccessful. incapsula",
];

async function scoreSite(url) {
  if (!url) return { tier: "none", reason: "no website listed" };
  if (!checkSites) return { tier: "unknown", reason: "not checked (--check-sites off)" };

  const reasons = [];
  let https = url.startsWith("https://");
  if (!https) reasons.push("no HTTPS");

  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 12000);
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: "follow",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    clearTimeout(t);

    // Final URL after redirects — a site that upgrades to https is fine.
    https = res.url.startsWith("https://");
    if (https && reasons[0] === "no HTTPS") reasons.shift();

    const server = (res.headers.get("server") || "").toLowerCase();

    // Bot wall by status code (Cloudflare returns 403/503 to blocked bots).
    // A protected site is almost always real and maintained — not a lead.
    if ([401, 403, 429, 503].includes(res.status)) {
      return {
        tier: "protected",
        reason: `bot wall (HTTP ${res.status}${server ? ", " + server : ""}) — likely a real site, verify by hand`,
      };
    }

    const html = (await res.text()).slice(0, 200000).toLowerCase();

    // Bot wall by challenge page (some return 200 with an interstitial).
    if (BLOCK_MARKERS.some((m) => html.includes(m))) {
      return { tier: "protected", reason: "bot challenge page — likely a real site, verify by hand" };
    }

    if (!res.ok) {
      return { tier: "weak", reason: `site returns ${res.status}` };
    }

    const hasViewport = /<meta[^>]+name=["']?viewport/.test(html);
    if (!hasViewport) reasons.push("not mobile-friendly (no viewport tag)");

    // Cheap "is this ancient" tells.
    if (/<table[^>]+(width|cellpadding|border)=/.test(html)) reasons.push("table-based layout");
    if (html.includes("wix.com") || html.includes("godaddy website builder"))
      reasons.push("DIY builder");
    if (!https) reasons.push("no HTTPS");

    if (reasons.length === 0) return { tier: "solid", reason: "modern, https, mobile-friendly" };
    return { tier: "weak", reason: reasons.join("; ") };
  } catch (e) {
    // Thrown error is ambiguous: a dead site (real lead) OR a bot wall that
    // resets the connection (Steve's-Plumbing case) OR just slow hosting.
    // Don't over-claim it as broken — flag for a manual look.
    const kind = e.name === "AbortError" ? "timeout" : "connection reset/DNS";
    return { tier: "unknown", reason: `unreachable (${kind}) — could be down OR blocking a bot, verify by hand` };
  }
}

// ---- helpers ---------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function csvCell(v) {
  const s = v == null ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const TIER_RANK = { none: 0, weak: 1, unknown: 2, protected: 3, solid: 4 };

// ---- main ------------------------------------------------------------------
const places = await search();
console.log(`\n  Found ${places.length} businesses for "${query}"${location ? ` in ${location}` : ""}.`);
if (checkSites) console.log("  Checking each website (this takes a moment)...");

const rows = [];
let i = 0;
for (const p of places) {
  i++;
  const url = p.websiteUri || "";
  const score = await scoreSite(url);
  if (checkSites) process.stdout.write(`\r  Scored ${i}/${places.length}`);
  rows.push({
    name: p.displayName?.text || "",
    tier: score.tier,
    reason: score.reason,
    phone: p.nationalPhoneNumber || "",
    website: url,
    address: p.formattedAddress || "",
    rating: p.rating ?? "",
    reviews: p.userRatingCount ?? "",
    category: p.primaryTypeDisplayName?.text || "",
    maps: p.googleMapsUri || "",
    status: p.businessStatus || "",
  });
}
if (checkSites) process.stdout.write("\n");

// Drop solid sites unless asked to keep them — they aren't leads.
const leads = rows
  .filter((r) => keepGood || r.tier !== "solid")
  .sort((a, b) => TIER_RANK[a.tier] - TIER_RANK[b.tier]);

// ---- write CSV -------------------------------------------------------------
const headers = [
  "name", "tier", "reason", "phone", "website",
  "address", "rating", "reviews", "category", "maps", "status",
];
const csv = [
  headers.join(","),
  ...leads.map((r) => headers.map((h) => csvCell(r[h])).join(",")),
].join("\n");

const fs = await import("node:fs/promises");
await fs.writeFile(outFile, csv, "utf8");

// ---- summary ---------------------------------------------------------------
const counts = leads.reduce((acc, r) => ((acc[r.tier] = (acc[r.tier] || 0) + 1), acc), {});
console.log(`\n  Wrote ${leads.length} rows to ${outFile}`);
console.log(
  `    no website:  ${counts.none || 0}   (hottest — nothing to compete with)`
);
if (checkSites) {
  console.log(`    weak site:   ${counts.weak || 0}   (real lead: broken/dated/not mobile)`);
  if (counts.protected)
    console.log(`    protected:   ${counts.protected}   (bot wall / Cloudflare — likely a REAL site, NOT a lead)`);
  if (counts.unknown)
    console.log(`    unreachable: ${counts.unknown}   (ambiguous — could be down OR blocking, verify by hand)`);
}
if (!checkSites) console.log(`    unchecked:   ${counts.unknown || 0}   (re-run with --check-sites to score these)`);
if (keepGood) console.log(`    solid site:  ${counts.solid || 0}   (probably not worth pitching)`);
console.log("\n  Only 'no website' + 'weak site' are confirmed leads. Verify the rest before pitching.\n");
