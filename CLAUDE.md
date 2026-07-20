@AGENTS.md

# Spencer Curnow · personal website

The site is a sales tool. Primary audience is **prospective clients and employers**. Primary outcome: **hire Spencer to build something.** Contract / project work is the headline pitch; full-time roles welcome as a softer mention.

Engagement model is informal: "send me what you want built, we'll scope and price it in conversation." Don't put rate cards or fixed packages on the site — that's not the offer.

## Stack and deploy

- Next.js 16 (app router), React 19, Tailwind v4, Framer Motion, lucide-react.
- Fonts loaded via `next/font/google`: DM Serif Display, Plus Jakarta Sans.
- **Live at https://spencercurnow.com** (as of 2026-05-28).
  - GitHub: `Schmenkie/personal-website` (public).
  - Hosting: Vercel project `personal-website` under `Schmenks's projects` (Hobby tier). Auto-deploys on push to `main`.
  - Domain: `spencercurnow.com` registered at Cloudflare. DNS managed by Cloudflare with Vercel-recommended CNAME flattening (via one-time domain-connect authorization, not ongoing API access). Apex is canonical, `www` redirects to apex.
- Analytics: PostHog client-side via [src/components/PostHogProvider.tsx](src/components/PostHogProvider.tsx). Reuses the LinkUp Golf project key (`NEXT_PUBLIC_POSTHOG_KEY` in Vercel env + `.env.local`). Every event tagged `app: 'personal_website'` so dashboards filter per app inside the shared project. SPA pageviews tracked via `usePathname`; DNT respected.
- Dev: `npm run dev` (port 3000). Project has `.claude/launch.json` wired for the preview MCP, so `mcp__Claude_Preview__preview_start { name: "dev" }` Just Works.

## Design system

After an `/impeccable audit` rebuild, the site scores 20/20 on the impeccable rubric. **Don't backslide.**

**Palette** (tokens in `src/app/globals.css`):
- Background: warm-tinted obsidian `#100A07`. Never `#000`.
- Text: warm-tinted off-whites `#F5EFE8` / `#B5A89C` / `#8A7E72`. Never `#fff`, never `text-white`.
- Single committed accent: **terracotta `#D97757`** (light `#E8957A`, dark `#B85A3E`). It carries 40–60% of every surface. Resist adding a second accent unless you've thought about it for a full sentence.

**Type**: DM Serif Display for headlines (mixed case, never uppercase), Plus Jakarta Sans for body, font-mono for kickers and labels (uppercase with `tracking-widest`).

**Hard bans** (impeccable absolute rules):
- No gradient text (`background-clip: text` + gradient). Use serif italic in accent for emphasis instead.
- No em dashes in copy. Use commas, colons, semicolons, periods, or parentheses.
- No `#000` or `#fff` literals. No `text-white` / `bg-white`. Tint white-on-dark CTAs with `text-obsidian`.
- No side-stripe (`border-left`/`border-right` >1px colored) or top-stripe accents on cards. No glassmorphism as default (navbar's scrolled state is the one exception, for legibility).
- No identical card grids. Vary silhouette across sections — prose, numbered rows, dl-style lists, timelines, bento.
- No hero-metric template (big number + small label + supporting stats + gradient accent).
- No backdrop-blur for decoration. Animations: `useNativeDriver`-cheap on RN principle here means opacity + transform only, ease-out exponential, no bounce.

**Accessibility floor**:
- WCAG AA throughout. Body text ≥4.5:1 contrast (use `text-muted` not lower).
- Touch targets ≥44pt — use `min-h-11` on interactive elements.
- Global `:focus-visible` outline already set in `globals.css`. Don't override.
- No hover-only secondary actions — anything keyboard users need must be visible at rest.

## Page architecture

Single landing page at [src/app/page.tsx](src/app/page.tsx). The order is **proof-first**: what I do → what I've shipped → who I am → how I work → my timeline → toolkit → contact. Don't slip back into the portfolio-blog reflex of bio-before-evidence.

**Three headliners lead the page, in this hierarchy (Spencer's explicit call, 2026-06-25): Sleeve (01) → Yurr Magazine (02) → Dogleg (03).** They run back-to-back right after the hero, before Stats/About. Each carries an editorial "Featured Work / 0N" eyebrow. To avoid three identical sections, the silhouettes alternate: Sleeve is phones-left/text-right, Yurr is a horizontal scrolling slide carousel, Dogleg is text-left/phones-right.

1. **Hero** ([hero.tsx](src/components/hero.tsx)) — animated terminal on the right, "Available for new projects" badge, "Work with me" primary CTA, "See the work" secondary. Terminal + body copy lead with Sleeve now (was LinkUp). The `#featured` anchor (nav "Work", hero "See the work") lands on the Sleeve section.
2. **FeaturedSleeve** ([featured-sleeve.tsx](src/components/featured-sleeve.tsx)) — headliner 01, `id="featured"`. Fanned phones (feed / album / discover) on the **left**, copy on the right (mirror of LinkUp so the two phone-fan sections don't read identically). Green+purple album-wash ambient gradient is the deliberate nod to Sleeve's signature per-album color environments (same opacity-40 pattern LinkUp uses). Status is **Live on iOS / App Store** (App Store approved + publicly released 2026-06-26). The stat block is a 2×2 (as of 2026-07-13): `Status / Live on iOS`, `Users / 350+`, `Countries / 20+`, `Albums logged / 2,750+`. Links to getsleeve.app and a real "Download on the App Store" link to `https://apps.apple.com/app/id6779825854`. See "Sleeve integration" below.
3. **Magazine** ([magazine.tsx](src/components/magazine.tsx)) — headliner 02, `id="magazine"`. Yurr Magazine client design work as a horizontal snap-scroll carousel of real issue slides (covers + interiors). The gallery column needs `min-w-0` so the scroller engages inside the grid (section is `overflow-hidden`; without it the row expands the track and gets clipped instead of scrolling). Low-opacity orange ambient = Yurr's print ink, held faint so it never reads as a second site accent. See "Yurr Magazine" below.
4. **FeaturedProject** ([featured-project.tsx](src/components/featured-project.tsx)) — headliner 03, `id="dogleg"` (was `id="linkup"`, originally `id="featured"`). **Dogleg** (the golf app formerly named LinkUp Golf; rebranded + pivoted 2026-07-13, see "Dogleg integration" below) with fanned phones (feed / welcome / play; the branded Dogleg welcome screen is the center hero, Spencer's call), text-left/phones-right. Green+cherry ambient gradient nods to Dogleg's "Scorecard" brand (fairway green `#1E5B45` + under-par red `#C2402B`, held faint). Craft-evidence framing: a live solo-built iOS app (GPS, USGA handicap, shareable cards), NOT the old marketplace pitch. Still strong evidence; Spencer demoted it to third behind the two newer pieces. Must still come before Stats and About.
5. **Stats** ([stats.tsx](src/components/stats.tsx)) — editorial 4-up band. Honest numbers only; **never claim metrics for SoundSauce/LeadHawk** (Spencer hasn't worked on them since the golf app). The "Latest launch" tile is "5.0★ / Sleeve's App Store rating" (real rating, supplied 2026-07-13: 5.0 from 4 ratings; the count is held off the site since it's small, the rating value is shown honestly).
6. **Projects** ([projects.tsx](src/components/projects.tsx)) — bento for SoundSauce, LeadHawk, Job Scout, Project Hub, This Website. Mono kicker + serif title. No top-stripe accents.
7. **About** ([about.tsx](src/components/about.tsx)) — prose + education card + interests pills (Music Production, Cooking, Golf, Outdoors, Animals, Gaming). No trait grid. Reads as character study, not introduction — the prospect has already met the work.
8. **Approach** ([approach.tsx](src/components/approach.tsx)) — numbered editorial rows, no cards.
9. **Journey** ([journey.tsx](src/components/journey.tsx)) — vertical timeline showing **build track** (filled accent dot) and **operations track** (hollow border dot) running in parallel since 2024.
10. **Skills** ([skills.tsx](src/components/skills.tsx)) — definition-list layout, sticky heading on the left, pill clouds on the right.
11. **Contact** ([contact.tsx](src/components/contact.tsx)) — Get In Touch + View Resume CTAs, social row below.
12. **Footer** ([footer.tsx](src/components/footer.tsx)).

The Writing/Blog section was removed on 2026-05-28 — three "Coming soon" cards were a credibility tax. If you ship a real post later, add the section back with the real content; never reintroduce placeholders.

Resume page: [src/app/resume/page.tsx](src/app/resume/page.tsx) at `/resume`. Builder-positioned. Print stylesheet generates a clean 1-page PDF via the in-page Print button. This is the canonical resume — when updating Spencer's work history, edit this file, not a PDF.

UI primitives: [src/components/ui/](src/components/ui/) holds `in-view`, `interactive-card`, `particle-field`. `GradientText` was deleted on purpose — don't add it back.

## /admin/hub — internal data hub

This site also hosts Spencer's cross-project observability dashboard at `/admin/hub` (basic-auth gated). It is NOT part of the public sales surface and the impeccable rubric does not apply — it can use identical card grids, hero-metric layouts, and dense tables that would be banned on the marketing pages. It does keep the site palette so it doesn't look alien when you context-switch from `/`.

Pieces:
- [src/proxy.ts](src/proxy.ts) — HTTP Basic Auth gate on `/admin/*` and `/api/admin/*`. Next.js 16 renamed Middleware to Proxy — the file is `proxy.ts`, not `middleware.ts`. Returns 503 if `ADMIN_PASSWORD` isn't set.
- [src/app/admin/hub/page.tsx](src/app/admin/hub/page.tsx) + [HubClient.tsx](src/app/admin/hub/HubClient.tsx) — server shell + client component. Overview tab + one tab per project. Inline SVG sparkline (no Chart.js dep). `robots: { index: false, follow: false }`.
- [src/app/api/admin/](src/app/api/admin/) — three Route Handlers: `posthog-sql/`, `sentry-issues/`, `sentry-events/`. They proxy PostHog + Sentry server-side so credentials never reach the browser.
- [src/lib/hub/](src/lib/hub/) — `projects.ts` (PROJECTS config), `queries.ts` (HogQL templates), `format.ts` (flagEmoji, timeAgo, pluralize, eventKind), `types.ts`.

Env vars required in Vercel (Production + Preview):
- `ADMIN_PASSWORD` — the basic-auth password. Username is ignored; password is checked against this env var.
- `POSTHOG_PERSONAL_API_KEY` — `phx_…` Personal API key, scopes `query:read` + `project:read`. Distinct from the public `NEXT_PUBLIC_POSTHOG_KEY` capture key. Queries the shared project (`POSTHOG_PROJECT_ID`, default `310428`).
- `POSTHOG_SLEEVE_PERSONAL_API_KEY` — a SECOND `phx_…` Personal API key, scoped to **Sleeve's own project** (`473290`, org "Sleeve Inc."), `query:read`. Sleeve does not live on the shared project, so it needs its own key. **Until this is set, the Sleeve tab shows the "set the env var" pending panel** (the route returns 500, the client catches it). Optional `POSTHOG_SLEEVE_PROJECT_ID` overrides the `473290` default.
- `SENTRY_API_TOKEN` (optional) — Sentry tiles return empty without it.

**Do NOT mark any of these as "Sensitive" in Vercel.** The Sensitive flag restricts which environments the var can target and locks you out of Production. All Vercel env vars are encrypted at rest regardless of that toggle.

When adding a project to the hub: update [src/lib/hub/projects.ts](src/lib/hub/projects.ts) (add to `PROJECTS`, define `ProjectId`), and verify the new app's SDK registers `properties.app` with the same `id` string. Everything else (tabs, KPIs, breakdown, unified feed) derives from that config automatically.

**Cross-project sources (added 2026-06-25).** Most projects share one PostHog project, isolated by `properties.app`. A project with its OWN PostHog project (like Sleeve) sets `source: 'sleeve'` on its `Project` config. The query builders in [queries.ts](src/lib/hub/queries.ts) drop the `properties.app` filter when `source !== 'shared'` (it owns the whole project), and the [posthog-sql route](src/app/api/admin/posthog-sql/route.ts) maps each `source` to a `{projectId, key}` pair via its `SOURCES` map. To fold in another standalone project: add a `PosthogSource` value + a `SOURCES` entry (project id + a new `*_PERSONAL_API_KEY` env var), set `source` on the `Project`, and it inherits tabs/KPIs/feed automatically. Sleeve has no Sentry project wired (the Sentry fetch is org-wide and would mislabel LinkUp's issues under Sleeve), so its panel falls back to "PostHog `$exception` handles errors here." Sleeve is also NOT in the per-app breakdown table (that's the shared project's `app` split); it gets its own tab instead.

**Bot-city filter.** Every hub query excludes traffic from known cloud-provider data-center cities (Council Bluffs, Boardman, Warsaw) via the `BOT_CITIES` list at the top of [src/lib/hub/queries.ts](src/lib/hub/queries.ts). These cities only show scrapers, uptime monitors, AI crawlers, and security scanners — the tell is identical UAs, `/`-only pageviews, and no `$pageleave`. If a new city spikes with that fingerprint, add it to `BOT_CITIES` rather than fixing each query. Note: the raw PostHog project still contains the bot events — the filter lives in the hub layer only.

The legacy hub at `~/data-hub/data-hub.html` + `server.mjs` is a localhost fallback. The Next.js version is canonical — change queries here first.

## /web — local-services web-work landing page

A **separate, focused sales page at `/web`** (not part of the main single-page flow) that pitches Spencer building websites for **local-services businesses** (plumbers, HVAC, contractors, salons, dentists). Added 2026-07-20 as the front door for a lead-gen side business (cold outreach → this page → free-mockup CTA). The main site (`/`) stays the personal/craft-credibility layer; `/web` links back to it ("See my full portfolio"), and `/web`'s "Who builds it" section links out to `/`.

- Files: [src/app/web/page.tsx](src/app/web/page.tsx) (server shell + focused metadata) → [src/components/web-landing.tsx](src/components/web-landing.tsx) (`WebLanding`, client). Reuses `Footer` + `InView`; has its **own** lightweight header (SC logo + one "Get a free mockup" CTA), NOT the site `Navbar` (wrong audience).
- **Impeccable rubric applies** (it's a public sales surface). Same palette/type/bans as `/`. Silhouettes deliberately varied so no two sections repeat: hero (phone-mockup visual) → problem (prose) → what-you-get (icon feature list, `sm:grid-cols-2`) → process (numbered `ol`, mirrors [approach.tsx](src/components/approach.tsx)) → credibility (centered prose) → FAQ (`dl`) → final CTA. Verified on desktop + mobile: no console errors, no horizontal overflow.
- CTA is a single `mailto:` (MAILTO const in web-landing.tsx) that **prefills** business name / current site / what they want / phone, so leads arrive scoped. No form backend.
- The hero phone preview is a **generic, clearly-illustrative** mock ("Riverside Plumbing"), not a real business, and desktop-only (`hidden md:block`).
- **Offer copy rules:** free mockup first, scope-and-price-in-conversation (no rate card, matches Spencer's model), "live in about a week." Keep it honest.
- **Not yet done:** `/impeccable audit` on this page (run it to confirm 20/20 holds), and there's no small-business demo/case-study yet — the free-mockup pitch leans on that gap, so a real example would strengthen it.

## Lead-gen tooling (`scripts/`)

Support tooling for the `/web` side business (added 2026-07-20). Not shipped to the site, just dev utilities.

- [scripts/lead-finder.mjs](scripts/lead-finder.mjs) — finds local-services businesses that need a website via the **Google Places API (New)**. Tiers each result from a live site fetch (realistic Chrome UA): `none` (no site, hottest lead) → `weak` (real lead: broken/dated/not-mobile) → `unknown` (unreachable/ambiguous — could be down OR bot-blocking, verify by hand) → `protected` (Cloudflare/bot-wall — likely a REAL maintained site, NOT a lead) → `solid` (dropped unless `--keep-good`). **Only `none` + `weak` are confirmed leads.** The `protected`/`unknown` split exists because Cloudflare resets bot connections, which naively read as "site down" (learned from a real Bellevue run where Steve's Plumbing, a fine Cloudflare-protected site, got mis-flagged). Outputs a CSV. Zero npm deps (Node 20.6+ native `fetch` + `--env-file`). Needs `GOOGLE_PLACES_API_KEY` in `.env.local` (Spencer's own Google Cloud key on the already-billed golf-app project, restricted to Places API (New), no app restriction so the Node script works). Run: `node --env-file=.env.local scripts/lead-finder.mjs --query "plumbers" --location "Bellevue, WA" --check-sites --out leads.csv`.
- [scripts/outreach-kit.md](scripts/outreach-kit.md) — cold-outreach playbook keyed to the scraper's `none`/`weak` tiers: positioning line, email templates per tier, follow-up cadence, call script, objection table, deposit/pricing mechanics, and a lead-tracker column schema that extends the scraper CSV.

## Dogleg integration (formerly LinkUp Golf, headliner 03)

Spencer's live iOS golf app. **Renamed LinkUp Golf → Dogleg and pivoted on 2026-07-13**: the old marketplace / social-network thesis (tee-time marketplace, trips, groups, chat, discover, course reviews) was **torn down**. Dogleg is now a personal GPS + scorecard round tracker (4 tabs: Feed / Play / Friends / Profile) that Spencer builds joy-driven, **not marketing or monetizing**. The repo still lives at **`~/golf-app`** (folder name unchanged). Source-of-truth for claims is golf-app's `CLAUDE.md` (most current — `PRODUCT.md`/`store-listing.md` still carry pre-pivot LinkUp copy, so trust `CLAUDE.md` first).

- **Site framing (Spencer's call, 2026-07-14): craft evidence, not a marketplace/business.** Pitch the shipping ability (a live, polished, solo-built iOS app: tap-to-score, GPS distance-to-green with wind+elevation, satellite hole maps, USGA handicap, shareable round cards) — never the dead "find someone to play with" pitch. No revenue/user-count claims (it's not monetized and the base is tiny by design).
- App Store: <https://apps.apple.com/us/app/linkup-golf-app/id6762869994> — **same numeric id** (the "Dogleg: Golf" 1.2.0 rename goes live ~2026-07-15; the `linkup-golf-app` URL slug still resolves by id).
- Web (marketing): <https://dogleg.spencercurnow.com>. `linkupgolf.org` now shows only a "we've rebranded → Dogleg" splash but stays load-bearing for auth redirects + App Store privacy/support URLs — do NOT link the site to `linkupgolf.org`.
- Stack: Expo SDK 55, React Native, TypeScript, Supabase, Apple Maps.
- Brand ("Scorecard"): warm paper `#FAF9F5` / ink `#1A1915` / one fairway green `#1E5B45` / under-par red `#C2402B`. The green+cherry ambient gradient in FeaturedProject is the nod (opacity-40 pattern, same as Sleeve/Yurr). The old "Blend" (ivory/forest/camel) is deleted.
- Screenshots: real on-device caps in `/public/projects/dogleg/`. `feed.png`, `scorecard.png`, `play.png`, `friends.png` are resized from `~/golf-app/assets/landing/dl-*.png` (640w); `login.png` is the branded welcome screen, resized from `~/golf-app/design/screenshots/raw/6.png`. The phone fan uses **feed / login / play** (welcome screen center); `scorecard.png` + `friends.png` are kept as spare assets. If Dogleg's UI changes meaningfully, refresh those.
- **Telemetry join key is unchanged:** the app still tags `properties.app = 'linkup_golf'` and reports to the `linkup-golf` Sentry org. The hub keeps that `id`/`SENTRY_ORG`; only the display `label` moved to "Dogleg" ([projects.ts](src/lib/hub/projects.ts)). Don't rename the id or the hub's data join breaks.

## Sleeve integration (headliner 01)

Spencer's newest product: **Sleeve, a Letterboxd-style social app for music fans** ("Where music finds friends" — log albums, rate ½ to 5 stars, review, find taste twins, discover through humans not algorithms). Repo lives at **`~/sleeve`** (separate from this project). Source-of-truth for claims is sleeve's `PRODUCT.md`, `DESIGN.md`, and `STORE_LISTING.md`.

- Status (2026-06-26): **Live and publicly released on the App Store.** App Store approved + publicly released 2026-06-26 (build #16). Real metrics supplied by Spencer 2026-07-13 and now on the site: **5.0★ (from 4 ratings), 350+ users, 20+ countries, 2,750+ albums logged.** The star rating is shown as "5.0★" without the 4-count (small, held off); everything else is shown verbatim. Keep copy honest — update these numbers when Spencer sends fresher ones; don't inflate.
- App Store: <https://apps.apple.com/app/id6779825854>
- Marketing site: <https://getsleeve.app> (support `/support`, privacy `/privacy`, terms `/terms`).
- Stack: Expo SDK 55, React Native, TypeScript, Supabase. Apple Music import, **on-device dominant-color extraction** (the signature: every album page is wrapped in its own color), taste-twin matching, lists, a vinyl "Spins" discovery feed.
- Design DNA ("quiet with ink"): neutral near-black chrome, album color only on album-owned surfaces. The green+purple ambient on FeaturedSleeve is the nod to those per-album washes.
- Screenshots: real on-device caps from `~/sleeve/design/screenshots/raw/`, resized to 640w and copied to `/public/projects/sleeve/` (`feed.png`, `album.png`, `discover.png`). If Sleeve's UI changes meaningfully, refresh those.
- **Dev gotcha:** the center phone (`album.png`) renders fine in `next build` / prod but can stay inert under the Turbopack **dev** server (empty `currentSrc`, never fires load/error). It's a dev-only image-optimizer quirk — verified working via `next start`. Don't "fix" it by swapping the asset; the file is valid. `priority` was removed and `sizes="240px"` added to match the real render width.

## Yurr Magazine (headliner 02)

Spencer's **paid client design work**: Yurr is an independent magazine profiling one creator per issue, published as Instagram carousels. He art-directs and designs every drop end to end (cover, 7 Q&A spreads, outfit callouts, closing grid = 16 slides) and **built the rendering toolkit behind them in Python + Pillow** (config-driven; typographic system, shadow/glow compositing, reactive callout library, one-command build per issue). 8 issues shipped in Vol. 02.

- Source material: `~/Downloads/yurr magazine/` — `YURR_VOL02_WORKFLOW.md` has the full pipeline; final slides live in each subject's `*_final/` folder.
- Gallery assets: 4 covers + 2 interiors, exported to JPEG (82q, 760w) in `/public/projects/yurr/` (`jared`, `leallicna`, `luvstruck`, `oliver`, `jared-qa`, `jared-outro`).
- **Open item:** no confirmed public Instagram handle for the magazine account (only `@clintyurr`, the coverage credit, appears in the files). The "See it on Instagram" CTA was replaced with a static credit line to avoid shipping a guessed/broken link. If Spencer supplies the real handle, wire it back as a link.
- The magazine's own tagline contains mild profanity ("...doing cool sh*t"); keep that off the sales site. Frame as "a zine for cool people doing cool things."

## impeccable skill

Installed locally at `.agents/skills/impeccable/` (gitignored; reinstall via `npx impeccable skills install`). `skills-lock.json` is committed for reproducible installs.

Sub-commands available: `audit`, `critique`, `polish`, `bolder`, `quieter`, `distill`, `harden`, `clarify`, `adapt`, `optimize`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `shape`, `craft`, `extract`, `teach`, `document`, `live`.

**Run `/impeccable audit` after any non-trivial visual change.** Target: stay at 20/20.

## Outstanding asks from Spencer (as of last session)

Send any of these and the answering session can integrate them:

- [ ] Headshots (1–2, casual or polished).
- [x] ~~LinkUp Golf metrics.~~ — moot: the golf app is now Dogleg, a personal non-monetized project; the site frames it as craft evidence with no user-count/revenue claims (Spencer's call, 2026-07-14).
- [x] ~~Sleeve metrics now that it's live on the App Store (ratings, user count, anything quotable) to put real numbers behind the "Live on iOS" status.~~ — supplied 2026-07-13: 5.0★ (4 ratings), 350+ users, 20+ countries, 2,750+ albums logged. Live on the site. Send refreshed numbers anytime and a session can bump them.
- [ ] Real public Instagram handle for Yurr Magazine, to relink the gallery CTA (only `@clintyurr` is documented).
- [ ] "Now" paragraph if we want one (what he's working on this week).
- [ ] Testimonials/quotes from anyone — coworkers, professors, TestFlight users.
- [ ] Decision: build a dedicated `/work/dogleg` deep-dive case study page?
- [x] ~~Decision: ship a real blog post or remove the Writing section?~~ — removed 2026-05-28.
- [x] ~~Buy spencercurnow.com.~~ — bought via Cloudflare, pointed at Vercel, live 2026-05-28.

## Shipped on 2026-07-14

- **LinkUp Golf → Dogleg rebrand + pivot reflected across the site.** Spencer rebuilt the golf app: renamed to **Dogleg**, tore down the marketplace/social-network thesis, and reframed it as a personal GPS + scorecard round tracker (see "Dogleg integration"). Site updated to match, framed as **craft evidence** (Spencer's call), not a marketplace pitch:
  - **FeaturedProject** ([featured-project.tsx](src/components/featured-project.tsx)) — title `LinkUp Golf → Dogleg`; `id="linkup" → id="dogleg"` (nothing else referenced it); new serif tagline + body (tap-to-score, GPS distance w/ wind+elevation, satellite hole maps, USGA handicap, shareable cards, crew feed; the dead "2 spots Saturday 8am" marketplace copy is gone); stats `Launched/Platforms/Built → Status:Live on iOS / Built:Solo / Scoring:GPS+USGA`; stack pill `Edge Functions → Apple Maps`; ambient gradient forest+camel → fairway-green `#1E5B45` + under-par-red `#C2402B`; screenshots swapped to `/projects/dogleg/{feed,login,play}.png` (branded welcome screen center, Spencer's call); primary link `linkupgolf.org → dogleg.spencercurnow.com` (App Store id unchanged).
  - **New screenshots**: `dl-{feed,scorecard,play,friends}.png` from `~/golf-app/assets/landing/`, resized to 640w → `/public/projects/dogleg/`. Old `/public/projects/linkup/` (feed/scorecard/marketplace) removed.
  - **Copy elsewhere**: hero terminal `linkup-golf/ → dogleg/` ([hero.tsx](src/components/hero.tsx)); Journey timeline entry → "Dogleg · iOS launch" noting it launched as LinkUp Golf ([journey.tsx](src/components/journey.tsx)); Projects intro + Project-Hub blurb LinkUp → Dogleg ([projects.tsx](src/components/projects.tsx)); resume shipped-products entry rewritten to Dogleg ([resume/page.tsx](src/app/resume/page.tsx)).
  - **Hub (display only, join keys preserved)**: `label 'LinkUp Golf' → 'Dogleg'` and refreshed `keyEvents` to what the current app emits (`signup_completed`, `round_completed`, `round_card_shared`) in [projects.ts](src/lib/hub/projects.ts); Sentry card `sub="LinkUp Golf" → "Dogleg"` ([HubClient.tsx](src/app/admin/hub/HubClient.tsx)). The `id: 'linkup_golf'` and `SENTRY_ORG = 'linkup-golf'` stay — the app still tags `app: 'linkup_golf'` / reports to the `linkup-golf` Sentry org.
  - **Timing note**: the "Dogleg: Golf" App Store rename (1.2.0) was in review on 2026-07-14, going live ~2026-07-15; until then the store page briefly still reads "LinkUp Golf App" while the site says Dogleg. The App Store URL resolves by numeric id regardless.

## Shipped on 2026-07-13

- **Real Sleeve traction numbers on the site.** Spencer supplied: 5.0★ (from 4 ratings), 350+ users, 20+ countries, 2,750+ albums logged. Wired in, distributed so no surface repeats another:
  - FeaturedSleeve stat block: `Status / Platform / Built` (3-up) → 2×2 dl: `Status / Live on iOS` · `Users / 350+` · `Countries / 20+` · `Albums logged / 2,750+` ([featured-sleeve.tsx](src/components/featured-sleeve.tsx), `grid-cols-2`). Spencer asked to keep the explicit "Live on iOS App Store" status, so it stayed as the first tile alongside the traction numbers.
  - Stats band tile: `Sleeve / Newest launch, live on iOS` → `5.0★ / Sleeve's App Store rating` ([stats.tsx](src/components/stats.tsx)).
  - Hero terminal: `→ sleeve live on the app store` → `→ sleeve: live on the ios app store` ([hero.tsx](src/components/hero.tsx)).
  - Resume: appended "350+ users across 20+ countries, 2,750+ albums logged, rated 5.0★." to the Sleeve notes ([resume/page.tsx](src/app/resume/page.tsx)).
  - Rating shown as "5.0★" without the 4-count (honest value, small count held off). Verified in browser preview: all values present in the live DOM, resume route confirmed, no console errors.

## Shipped on 2026-06-26

- **Sleeve is live on the App Store.** Flipped all "TestFlight beta / in review" copy to live-on-iOS. FeaturedSleeve stats now read "Status / Live on iOS" + "Platform / App Store"; the static "In App Store review" pill became a real "Download on the App Store" link to <https://apps.apple.com/app/id6779825854>. Hero terminal line + body copy and the Stats band tile updated to match. Verified in the browser preview: no "TestFlight"/"beta" left in `src/`, link href confirmed.

## Shipped on 2026-06-25

- **Two new headliners added; LinkUp demoted to third.** New page order: Hero → Sleeve (01) → Yurr Magazine (02) → LinkUp (03) → Stats → … Spencer's explicit hierarchy call.
- **FeaturedSleeve** ([featured-sleeve.tsx](src/components/featured-sleeve.tsx)) — Sleeve as headliner 01, phones-left/text-right, green+purple album-wash ambient. Status held honestly at "TestFlight beta / in App Store review." See "Sleeve integration."
- **Magazine** ([magazine.tsx](src/components/magazine.tsx)) — Yurr Magazine as headliner 02, horizontal snap-scroll carousel of real issue slides. See "Yurr Magazine."
- FeaturedProject got `id="featured"` → `id="linkup"` and a "Featured Work / 03" eyebrow; hero copy + terminal now lead with Sleeve; Stats "latest launch" tile now points at Sleeve.
- Assets: Sleeve screens in `/public/projects/sleeve/`, Yurr slides in `/public/projects/yurr/`.
- Verified via `next build` (clean TS + components) and `next start` (all images 200, album.png included).
- **Not yet run:** `/impeccable audit` on the two new sections (do this next to confirm 20/20 holds).

## Shipped on 2026-05-28

- PostHog analytics wired in, tagged `app: 'personal_website'` against the shared LinkUp Golf project. Provider at [src/components/PostHogProvider.tsx](src/components/PostHogProvider.tsx).
- Repo pushed to GitHub (`Schmenkie/personal-website`, public).
- Vercel project created, env vars set, deploy live at https://spencercurnow.com.
- `spencercurnow.com` bought at Cloudflare, DNS pointed at Vercel via auto-configure (CNAME flattening on apex). `www` redirects to apex.
- Page reorganized to proof-first flow (FeaturedProject moved to position 2; About moved to position 5).
- Writing/Blog section deleted.
- About interests expanded: added Cooking (ChefHat), Golf (Flag), Outdoors (Mountain).
- `/admin/hub` shipped — see "/admin/hub — internal data hub" above. Replaces the localhost-only dashboard that used to live at `~/data-hub/data-hub.html`.
- PostHog ingest verified — `app = personal_website` events flowing (pageviews, web-vitals, pageleaves).
- Favicon swapped from the scaffolded Vercel triangle to a `SC` monogram: terracotta `#D97757` rounded square, Georgia bold `#F5EFE8` mark. Delivered as [src/app/icon.svg](src/app/icon.svg) — Next.js handles the `<link>` injection. Removed the old `favicon.ico`. Don't reintroduce one; SVG wins on quality at every size.

## Don't

- Don't claim metrics for SoundSauce or LeadHawk. They're past shipped work, not active products.
- Don't reintroduce purple / cyan / pink. The reflex palette is the exact thing the audit failed.
- Don't add a second accent color. It's "single committed accent" by design.
- Don't write `electronic music production` — the certificate is just "Music Production."
- Don't commit `.claude/settings.local.json` or `.agents/`. Both are gitignored.
