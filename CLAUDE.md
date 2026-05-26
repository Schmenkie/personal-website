@AGENTS.md

# Spencer Curnow · personal website

The site is a sales tool. Primary audience is **prospective clients and employers**. Primary outcome: **hire Spencer to build something.** Contract / project work is the headline pitch; full-time roles welcome as a softer mention.

Engagement model is informal: "send me what you want built, we'll scope and price it in conversation." Don't put rate cards or fixed packages on the site — that's not the offer.

## Stack and deploy

- Next.js 16 (app router), React 19, Tailwind v4, Framer Motion, lucide-react.
- Fonts loaded via `next/font/google`: DM Serif Display, Plus Jakarta Sans.
- Deploy target: **spencercurnow.com** on Vercel. Domain is **not yet purchased** as of this writing — flag this if it still isn't owned.
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

Single landing page at [src/app/page.tsx](src/app/page.tsx). Order:

1. **Hero** ([hero.tsx](src/components/hero.tsx)) — animated terminal on the right, "Available for new projects" badge, "Work with me" primary CTA, "See the work" secondary.
2. **Stats** ([stats.tsx](src/components/stats.tsx)) — editorial 4-up band. Honest numbers only; **never claim metrics for SoundSauce/LeadHawk** (Spencer hasn't worked on them since LinkUp Golf).
3. **About** ([about.tsx](src/components/about.tsx)) — prose + education card + interests pills. No trait grid.
4. **FeaturedProject** ([featured-project.tsx](src/components/featured-project.tsx)) — LinkUp Golf headliner with fanned phones (feed / scorecard / marketplace). Forest+camel ambient gradient is the deliberate nod to LinkUp's actual brand against the dark site theme.
5. **Projects** ([projects.tsx](src/components/projects.tsx)) — 4-card bento for SoundSauce, LeadHawk, Job Scout, This Website. Mono kicker + serif title. No top-stripe accents.
6. **Approach** ([approach.tsx](src/components/approach.tsx)) — numbered editorial rows, no cards.
7. **Journey** ([journey.tsx](src/components/journey.tsx)) — vertical timeline showing **build track** (filled accent dot) and **operations track** (hollow border dot) running in parallel since 2024.
8. **Skills** ([skills.tsx](src/components/skills.tsx)) — definition-list layout, sticky heading on the left, pill clouds on the right.
9. **Blog/Writing** ([blog.tsx](src/components/blog.tsx)) — currently "Coming soon" with three planned posts. Either ship a real post or remove the section; don't leave placeholders forever.
10. **Contact** ([contact.tsx](src/components/contact.tsx)) — Get In Touch + View Resume CTAs, social row below.
11. **Footer** ([footer.tsx](src/components/footer.tsx)).

Resume page: [src/app/resume/page.tsx](src/app/resume/page.tsx) at `/resume`. Builder-positioned. Print stylesheet generates a clean 1-page PDF via the in-page Print button. This is the canonical resume — when updating Spencer's work history, edit this file, not a PDF.

UI primitives: [src/components/ui/](src/components/ui/) holds `in-view`, `interactive-card`, `particle-field`. `GradientText` was deleted on purpose — don't add it back.

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
- [ ] Decision: ship a real blog post or remove the Writing section?
- [ ] Buy spencercurnow.com.

## Don't

- Don't claim metrics for SoundSauce or LeadHawk. They're past shipped work, not active products.
- Don't reintroduce purple / cyan / pink. The reflex palette is the exact thing the audit failed.
- Don't add a second accent color. It's "single committed accent" by design.
- Don't write `electronic music production` — the certificate is just "Music Production."
- Don't commit `.claude/settings.local.json` or `.agents/`. Both are gitignored.
