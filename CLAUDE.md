@AGENTS.md

# Spencer Curnow · personal website

A **personal portfolio** (Spencer's call, 2026-10-04): who he is, what he's made, how to reach him. Readers are employers (product/design roles), clients and people he meets. The local-services pitch lives on its own page at `/web` and is not linked from the home page.

Since 2026-10-06 the whole site is a **minimal, plain design** (see Design system). It replaced a dark, animated template that Spencer felt "looks like it was put together with AI". Keep it simple: when in doubt, remove.

## Stack and deploy

- Next.js 16 (app router), React 19, Tailwind v4. (`framer-motion` and `lucide-react` are still in package.json but no page uses them since the 2026-10 redo; safe to uninstall.)
- Fonts via `next/font/google`: **Geist Mono** (`--font-geist-mono`) for every public page. DM Serif Display + Plus Jakarta Sans are still loaded only for `/admin/hub`.
- **Live at https://spencercurnow.com** (as of 2026-05-28).
  - GitHub: `Schmenkie/personal-website` (public).
  - Hosting: Vercel project `personal-website` under `Schmenks's projects` (Hobby tier). Auto-deploys on push to `main`.
  - Domain: `spencercurnow.com` registered at Cloudflare. DNS managed by Cloudflare with Vercel-recommended CNAME flattening (via one-time domain-connect authorization, not ongoing API access). Apex is canonical, `www` redirects to apex.
- Analytics: PostHog client-side via [src/components/PostHogProvider.tsx](src/components/PostHogProvider.tsx). Reuses the LinkUp Golf project key (`NEXT_PUBLIC_POSTHOG_KEY` in Vercel env + `.env.local`). Every event tagged `app: 'personal_website'` so dashboards filter per app inside the shared project. SPA pageviews tracked via `usePathname`; DNT respected.
- Dev: `npm run dev` (port 3000). Project has `.claude/launch.json` wired for the preview MCP, so `mcp__Claude_Preview__preview_start { name: "dev" }` Just Works.

## Design system (2026-10 redo)

Inspired by linusrogge.com (Spencer's reference): one small monospace face, paper background, almost nothing else. Borrow the principles, never copy that site's look.

- **Scope:** every public page wraps its content in `<div className="minimal ...">`. All styling for it is the `.minimal` block at the bottom of [globals.css](src/app/globals.css) (`body:has(.minimal)` switches the page background). The older dark tokens above it exist only for `/admin/hub`.
- **Type:** Geist Mono, 13px / 18px, weight 400 everywhere. Headings are the same size as body text; hierarchy comes from order, spacing and the muted color, never from size or bold.
- **Color:** paper `#FBFBF9`, ink `#111111`, muted `#6B6B66` (5.3:1, use the `.muted` class). The purple record (`#7A2FF2`, Spencer's favorite color) is the only accent: the favicon `src/app/icon.svg`, `apple-icon.png` and the header mark share it. No gradients, shadows, cards, badges or pill buttons.
- **Links:** plain ink text, hover goes muted. The one filled button is the black "Get a free mockup" on `/web` (`a.cta`).
- **No animation** beyond a 150ms opacity hover on thumbnails.
- **Shared pieces** in [src/components/minimal/](src/components/minimal/): `site-header.tsx` (vinyl mark home link + spinning today), `site-footer.tsx` ([i] colophon via `<details>` + year), `links.tsx` (the link list + the one-line bio `ONE_LINE`), `vinyl-mark.tsx`, `print-button.tsx`.
- **Accessibility floor:** text 4.5:1+, touch targets `min-h-11` on standalone controls, real `<a>`/`<button>`, alt text on every image.

### Spinning today

The header shows Spencer's latest **Sleeve daily spin** ([src/lib/spin.ts](src/lib/spin.ts)): a REST read of Sleeve's `daily_spins` (world-readable via RLS) with Sleeve's *publishable* key, filtered to Spencer's user id `029305af-40b4-49ee-b2f0-a3b401d32b33`, linking to `getsleeve.app/user/<username>`. Cached 10 min (`revalidate = 600` on each page). Label is "spinning today" if posted in the last 24h, else "last spin". **On any failure it renders nothing**; the page must never break over it.

## Page architecture

All work content lives in **[src/lib/work.ts](src/lib/work.ts)** (`PROJECTS`): name, one-line, body paragraphs, links, and `shots` (image, filename label, caption, optional `meta` like an issue date). Every page reads from it; add or edit work there only.

- **`/`** ([page.tsx](src/app/page.tsx)): name, one line, links, then a strip of every project's images at the bottom, grouped per project and in sequence. A thumbnail links to `/work/<slug>#<shot id>`. On phones the strip is one sideways-scrolling row.
- **`/work`**: plain text index, one row per project.
- **`/work/[slug]`** (static, `dynamicParams = false`): paragraphs, links, then each image with its filename and caption; prev/next links. Slugs: `sleeve`, `yurr`, `schmenk-golf`, `soundsauce`. `/work/dogleg` 308-redirects to `/work/schmenk-golf` ([next.config.ts](next.config.ts)).
- **`/resume`**: the canonical resume (edit work history here, not in a PDF). Same layout; "Print / save as PDF" prints one clean letter page (print styles at the end of globals.css).
- **`/web`**: the local-services sales page (see below).
- **`not-found.tsx`**: plain 404.

**Image order rules:** app screens in the order you move through the app; Yurr in issue order (005 Leallicna, 006 Luvstruck, 007 Jared cover + Q&A + closing grid together, 008 Oliver). Images are 720px-wide JPEGs in `public/projects/<project>/`.

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

## /web — local-services landing page

[src/app/web/page.tsx](src/app/web/page.tsx): the front door for Spencer's local-business website side business (cold outreach links here). Same minimal design. Sections: intro + CTA, the problem, what you get, how it works (numbered), who builds it (links to `/work`), FAQ, closing CTA. The CTA is a `mailto:` that prefills business name / current site / what they want / phone. Offer rules: free mockup first, price scoped in conversation (no rate card on the site), "live in about a week". The business plan, leads and templates live outside this repo in `~/Downloads/Web Studio/` (this repo is public, so lead data never goes here).

## Lead-gen tooling (`scripts/`)

Support tooling for the `/web` side business (added 2026-07-20). Not shipped to the site, just dev utilities.

- [scripts/lead-finder.mjs](scripts/lead-finder.mjs) — finds local-services businesses that need a website via the **Google Places API (New)**. Tiers each result from a live site fetch (realistic Chrome UA): `none` (no site, hottest lead) → `weak` (real lead: broken/dated/not-mobile) → `unknown` (unreachable/ambiguous — could be down OR bot-blocking, verify by hand) → `protected` (Cloudflare/bot-wall — likely a REAL maintained site, NOT a lead) → `solid` (dropped unless `--keep-good`). **Only `none` + `weak` are confirmed leads.** The `protected`/`unknown` split exists because Cloudflare resets bot connections, which naively read as "site down" (learned from a real Bellevue run where Steve's Plumbing, a fine Cloudflare-protected site, got mis-flagged). Outputs a CSV. Zero npm deps (Node 20.6+ native `fetch` + `--env-file`). Needs `GOOGLE_PLACES_API_KEY` in `.env.local` (Spencer's own Google Cloud key on the already-billed golf-app project, restricted to Places API (New), no app restriction so the Node script works). Run: `node --env-file=.env.local scripts/lead-finder.mjs --query "plumbers" --location "Bellevue, WA" --check-sites --out leads.csv`.
- [scripts/outreach-kit.md](scripts/outreach-kit.md) — cold-outreach playbook keyed to the scraper's `none`/`weak` tiers: positioning line, email templates per tier, follow-up cadence, call script, objection table, deposit/pricing mechanics, and a lead-tracker column schema that extends the scraper CSV.

## The projects (facts as of 2026-10-06)

Source of truth for each is its own repo's CLAUDE.md. Re-check before changing claims.

- **Sleeve** (`~/sleeve`): Letterboxd-style music app. Live on the App Store since 2026-06-26 (`id6779825854`), v1.0.2 released 2026-09-29. Albums *and* songs, shareable playlists, daily spin, weekly issue, taste twins. Numbers on the site: 400+ people, 20+ countries, 3,400+ albums logged. Screenshots = the v3 App Store set (`~/sleeve/design/screenshots/v3/out/`, approved by Spencer 2026-09-29), resized to 720w.
- **Yurr Magazine** (`~/Downloads/Yurr Magazine/`): paid client design work for @clintyurr; Instagram carousels + Spencer's Python render toolkit. 8 issues in Vol. 02. Keep the magazine's profane tagline off the site.
- **Schmenk Golf** (`~/golf-app`): renamed LinkUp Golf → Dogleg → **Schmenk Golf** (trademark filing on "Dogleg"; never use that name on the site). 1.2.0 was pulled from sale 2026-10-01; 1.3.0 relaunches it under the new name. Don't link the App Store until 1.3.0 is live. Screenshots = the 1.3.0 set (`~/golf-app/design/screenshots/out/` 01, 02, 05); skip the Feed/Friends shots, they show friends' real names. PostHog/Sentry ids in the hub stay `linkup_golf` / `linkup-golf` (only labels changed).
- **SoundSauce** (`~/audio-analyzer-pro`): now a personal remix tool; no metrics claims.

## impeccable skill

Installed locally at `.agents/skills/impeccable/` (gitignored). Its old 20/20 rubric was written for the previous dark design; use it for critique, but the minimal design rules above win where they disagree.

## Outstanding asks from Spencer (as of last session)

Send any of these and the answering session can integrate them:

- [x] ~~One-line bio~~ — Spencer chose to keep "Makes apps and magazines in Bellevue, WA." (2026-10-06, after trying "Just like everyone, figuring life out in Bellevue, WA."). `ONE_LINE` in links.tsx.
- [ ] Case studies for design-job applications (Sleeve's album colors, Schmenk Golf's strip-down, Yurr's design system), offered 2026-10-06.
- [ ] Sleeve's App Store rating: removed from the resume 2026-10-06 (last known 5.0★ from 4 ratings, July). Re-add if still true.
- [ ] Headshots (1–2, casual or polished).
- [x] ~~LinkUp Golf metrics.~~ — moot: the golf app is now Dogleg, a personal non-monetized project; the site frames it as craft evidence with no user-count/revenue claims (Spencer's call, 2026-07-14).
- [x] ~~Sleeve metrics now that it's live on the App Store (ratings, user count, anything quotable) to put real numbers behind the "Live on iOS" status.~~ — supplied 2026-07-13: 5.0★ (4 ratings), 350+ users, 20+ countries, 2,750+ albums logged. Live on the site. Send refreshed numbers anytime and a session can bump them.
- [ ] Real public Instagram handle for Yurr Magazine, to relink the gallery CTA (only `@clintyurr` is documented).
- [ ] "Now" paragraph if we want one (what he's working on this week).
- [ ] Testimonials/quotes from anyone — coworkers, professors, TestFlight users.
- [x] ~~Decision: build a dedicated `/work/dogleg` deep-dive case study page?~~ — shipped 2026-07-20 as part of the multi-page restructure (all four case studies).
- [ ] Sierra Music: Spencer is calling his grandpa (Bob Curnow, sierramusicstore.com, big band charts) about a full site redo. If it happens it becomes the flagship client case study at `/work/sierra-music`. Assessment done 2026-07-20: legacy buried in a 2005 store template, no audio/sample previews on $55+ charts, wall-of-names homepage.
- [x] ~~Decision: ship a real blog post or remove the Writing section?~~ — removed 2026-05-28.
- [x] ~~Buy spencercurnow.com.~~ — bought via Cloudflare, pointed at Vercel, live 2026-05-28.

## Shipped on 2026-10-06 — the minimal redo

Branch `redo-minimal`, merged to main. Replaced the dark animated landing, the four headliner case studies, Stats/About/Approach/Journey/Skills sections, navbar, footer, `web-landing.tsx`, and `components/ui/*` with the minimal pages above. Added live "spinning today" from Sleeve, `src/lib/work.ts`, the 404 page, the dogleg redirect. Resume gained Yurr Magazine and lost the dead leadhawk.org link. Every "Dogleg" mention is gone from the site. Verified in the browser pane against `npm run dev` (real spin rendered) and with a production `next build`.

## Shipped on 2026-07-20

- **Multi-page restructure: landing + `/work` + case studies.** See "Page architecture" above for the full map. Landing lost the three full headliner sections and the Projects bento, gained the compact SelectedWork teasers; `/work` index (three grouped silhouettes) and four case studies (`sleeve`, `yurr`, `dogleg`, `soundsauce`) went up. Case-study enrichment drew on a fresh repo survey: Sleeve's Daily Spins, Dogleg's caddie book/multi-tee/plays-like, Yurr's Python pipeline, SoundSauce's full-SaaS build (kept metric-free per the ban). `projects.tsx` deleted. Verified: all 8 routes 200, clean `next build` (15/15 static), no horizontal overflow, single h1 per case page.
- **`/web` local-services landing page + lead-gen tooling** (see their own sections above). Lead-finder ran real sweeps: Bellevue plumbers test + a 3-category × 3-city sweep, 110 unique leads in `leads-sweep/` (gitignored). Cloudflare bot-walls taught the scraper its `protected`/`unknown` tiers.
- **All of the above pushed and verified live on production** (all 8 routes 200 on spencercurnow.com). Post-restructure audit: 20/20 across `/`, `/work`, and all four case pages. Navbar SC logo fixed to link home from any page (was `href="#"`).
- **Business context behind today's work:** Spencer is starting a freelance push, building websites for local-services businesses (his chosen niche) to earn extra income. The funnel: lead-finder CSV → outreach-kit templates → spencercurnow.com/web → free mockup → scope-in-conversation. His next manual steps: verify top leads by phone-checking their sites (Porter Family Roofing, Alpha Plumbers, the no-HTTPS roofers), then send first emails.

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

- Don't claim metrics for SoundSauce or LeadHawk. They're past shipped work, not active products. Never link LeadHawk (the app is dead).
- Don't use the name "Dogleg" anywhere public. It's Schmenk Golf.
- Don't add color, cards, badges, gradients, icons or scroll animations to the public pages. Restraint is the design.
- Don't write `electronic music production` — the certificate is just "Music Production."
- Don't put lead data (CSVs) in this repo; it's public.
- Don't commit `.claude/settings.local.json` or `.agents/`. Both are gitignored.
