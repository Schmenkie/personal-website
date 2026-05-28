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

1. **Hero** ([hero.tsx](src/components/hero.tsx)) — animated terminal on the right, "Available for new projects" badge, "Work with me" primary CTA, "See the work" secondary.
2. **FeaturedProject** ([featured-project.tsx](src/components/featured-project.tsx)) — LinkUp Golf headliner with fanned phones (feed / scorecard / marketplace). Forest+camel ambient gradient is the deliberate nod to LinkUp's actual brand against the dark site theme. **This is the strongest evidence on the page; it must come before Stats and About.**
3. **Stats** ([stats.tsx](src/components/stats.tsx)) — editorial 4-up band. Honest numbers only; **never claim metrics for SoundSauce/LeadHawk** (Spencer hasn't worked on them since LinkUp Golf). Lands after LinkUp so "4 live products shipped" has context.
4. **Projects** ([projects.tsx](src/components/projects.tsx)) — 4-card bento for SoundSauce, LeadHawk, Job Scout, This Website. Mono kicker + serif title. No top-stripe accents.
5. **About** ([about.tsx](src/components/about.tsx)) — prose + education card + interests pills (Music Production, Cooking, Golf, Outdoors, Animals, Gaming). No trait grid. Reads as character study, not introduction — the prospect has already met the work.
6. **Approach** ([approach.tsx](src/components/approach.tsx)) — numbered editorial rows, no cards.
7. **Journey** ([journey.tsx](src/components/journey.tsx)) — vertical timeline showing **build track** (filled accent dot) and **operations track** (hollow border dot) running in parallel since 2024.
8. **Skills** ([skills.tsx](src/components/skills.tsx)) — definition-list layout, sticky heading on the left, pill clouds on the right.
9. **Contact** ([contact.tsx](src/components/contact.tsx)) — Get In Touch + View Resume CTAs, social row below.
10. **Footer** ([footer.tsx](src/components/footer.tsx)).

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
- `POSTHOG_PERSONAL_API_KEY` — `phx_…` Personal API key, scopes `query:read` + `project:read`. Distinct from the public `NEXT_PUBLIC_POSTHOG_KEY` capture key.
- `SENTRY_API_TOKEN` (optional) — Sentry tiles return empty without it.

**Do NOT mark any of these as "Sensitive" in Vercel.** The Sensitive flag restricts which environments the var can target and locks you out of Production. All Vercel env vars are encrypted at rest regardless of that toggle.

When adding a project to the hub: update [src/lib/hub/projects.ts](src/lib/hub/projects.ts) (add to `PROJECTS`, define `ProjectId`), and verify the new app's SDK registers `properties.app` with the same `id` string. Everything else (tabs, KPIs, breakdown, unified feed) derives from that config automatically.

The legacy hub at `~/data-hub/data-hub.html` + `server.mjs` is a localhost fallback. The Next.js version is canonical — change queries here first.

## LinkUp Golf integration

Spencer's flagship product is live on the iOS App Store. The repo lives at **`~/golf-app`** (separate from this project). When making claims about LinkUp on this site, the source-of-truth is golf-app's `PRODUCT.md` and `DESIGN.md`.

- App Store: <https://apps.apple.com/us/app/linkup-golf-app/id6762869994>
- Web: <https://linkupgolf.org>
- Stack: Expo SDK 55, React Native, TypeScript, Supabase.
- Brand ("The Blend"): ivory + deep forest + camel. The forest/camel ambient gradient in FeaturedProject is the nod.
- Landing-page screenshots live in `~/golf-app/assets/landing/` and were copied to `/public/projects/linkup/`. If LinkUp's UI changes meaningfully, refresh those.

## impeccable skill

Installed locally at `.agents/skills/impeccable/` (gitignored; reinstall via `npx impeccable skills install`). `skills-lock.json` is committed for reproducible installs.

Sub-commands available: `audit`, `critique`, `polish`, `bolder`, `quieter`, `distill`, `harden`, `clarify`, `adapt`, `optimize`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `shape`, `craft`, `extract`, `teach`, `document`, `live`.

**Run `/impeccable audit` after any non-trivial visual change.** Target: stay at 20/20.

## Outstanding asks from Spencer (as of last session)

Send any of these and the answering session can integrate them:

- [ ] Headshots (1–2, casual or polished).
- [ ] LinkUp Golf metrics (current user count, App Store rating, anything quotable).
- [ ] "Now" paragraph if we want one (what he's working on this week).
- [ ] Testimonials/quotes from anyone — coworkers, professors, TestFlight users.
- [ ] Decision: build a dedicated `/work/linkup-golf` deep-dive case study page?
- [x] ~~Decision: ship a real blog post or remove the Writing section?~~ — removed 2026-05-28.
- [x] ~~Buy spencercurnow.com.~~ — bought via Cloudflare, pointed at Vercel, live 2026-05-28.

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

## Don't

- Don't claim metrics for SoundSauce or LeadHawk. They're past shipped work, not active products.
- Don't reintroduce purple / cyan / pink. The reflex palette is the exact thing the audit failed.
- Don't add a second accent color. It's "single committed accent" by design.
- Don't write `electronic music production` — the certificate is just "Music Production."
- Don't commit `.claude/settings.local.json` or `.agents/`. Both are gitignored.
