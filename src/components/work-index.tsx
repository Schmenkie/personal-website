"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { InView } from "@/components/ui/in-view";

// The full portfolio index. Three groups, three silhouettes on purpose:
// products get image rows, client work gets a cover strip, tools get a
// definition list. Case-study links go to /work/[slug]; tools without a
// public surface get no link rather than a dead one.

const products = [
  {
    title: "Sleeve",
    tagline: "Where music finds friends.",
    body: "A social app for album lovers: log, rate, review, find taste twins, and meet the daily Spin drop. Live on the App Store with listeners in 20+ countries.",
    status: "Live on iOS",
    href: "/work/sleeve",
    image: "/projects/sleeve/feed.png",
    alt: "Sleeve's home feed",
  },
  {
    title: "Dogleg",
    tagline: "A GPS caddie built for the joy of it.",
    body: "Tap-to-score with satellite hole maps, plays-like distances adjusted for wind and elevation, and a real USGA handicap. Solo-built, not monetized, all craft.",
    status: "Live on iOS",
    href: "/work/dogleg",
    image: "/projects/dogleg/login.png",
    alt: "Dogleg's welcome screen",
  },
  {
    title: "SoundSauce",
    tagline: "Hear a sound. Leave with the preset.",
    body: "Upload any audio clip, get back a Vital synth preset that recreates it: stem separation, AI instrument detection, Web Audio analysis, Stripe billing.",
    status: "Live at soundsauce.app",
    href: "/work/soundsauce",
    image: null,
    alt: "",
  },
];

const yurrCovers = [
  { src: "/projects/yurr/jared.jpg", alt: "Yurr Magazine Issue 007 cover" },
  { src: "/projects/yurr/leallicna.jpg", alt: "Yurr Magazine Issue 005 cover" },
  { src: "/projects/yurr/oliver.jpg", alt: "Yurr Magazine Issue 008 cover" },
];

const tools = [
  {
    name: "Job Scout",
    desc: "A daily AI agent that pulls postings from six job sources, scores each against my profile with Gemini, and emails a curated digest every weekday at 7am.",
    meta: "Running daily on GitHub Actions",
    href: null,
  },
  {
    name: "LeadHawk",
    desc: "A freelance-lead aggregator: Reddit, Hacker News, and Dev.to scanned into a scored dashboard, with magic-link auth and a Stripe Pro tier. Cloudflare Workers, D1, KV, no framework.",
    meta: "Full build, no longer in production",
    href: null,
  },
  {
    name: "Cross-project data hub",
    desc: "One dashboard for every app I run: PostHog and Sentry proxied server-side into KPIs, sparklines, and a unified event feed. Lives behind auth on this site.",
    meta: "Private, in daily use",
    href: null,
  },
  {
    name: "This website",
    desc: "The site you're on: Next.js 16, a hand-built design system on a single terracotta accent, and a print-ready resume. Public source.",
    meta: "github.com/Schmenkie",
    href: "https://github.com/Schmenkie/personal-website",
  },
];

function GroupHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <InView variant="slide-up">
      <span className="text-sm font-semibold uppercase tracking-widest text-accent">
        {kicker}
      </span>
      <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
        {title}
      </h2>
    </InView>
  );
}

export function WorkIndex() {
  return (
    <>
      {/* ---- page header ---- */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <InView variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </span>
            <h1 className="mt-3 font-serif text-5xl md:text-6xl leading-[1.05]">
              The work.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text-secondary leading-relaxed">
              Shipped products, client design, and the tools I build for
              myself. Everything here is real: live on a store, delivered to a
              client, or running on a schedule.
            </p>
          </InView>
        </div>
      </section>

      {/* ---- shipped products ---- */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <GroupHeading kicker="01 / Shipped products" title="Built, launched, live." />

          <div className="mt-12 space-y-4">
            {products.map((p, i) => (
              <InView key={p.title} variant="slide-up" delay={i * 0.07}>
                <Link
                  href={p.href}
                  className="group grid md:grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-4 rounded-2xl border border-border bg-surface/40 px-6 py-6 md:px-8 transition-colors hover:border-accent/40 hover:bg-surface/70"
                >
                  {p.image ? (
                    <div className="relative w-20 overflow-hidden rounded-lg border border-border">
                      <Image
                        src={p.image}
                        alt={p.alt}
                        width={160}
                        height={346}
                        sizes="80px"
                        className="w-full h-auto"
                      />
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className="hidden md:flex h-20 w-20 items-center justify-center rounded-lg border border-border bg-surface"
                    >
                      <span className="font-mono text-xs text-accent">.vital</span>
                    </div>
                  )}
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-accent-light transition-colors">
                        {p.title}
                      </h3>
                      <span className="font-serif italic text-text-secondary">
                        {p.tagline}
                      </span>
                    </div>
                    <p className="mt-2 text-text-secondary leading-relaxed">
                      {p.body}
                    </p>
                    <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-text-muted">
                      {p.status}
                    </span>
                  </div>
                  <ArrowRight
                    size={20}
                    aria-hidden
                    className="hidden md:block text-accent transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ---- client & design ---- */}
      <section className="py-16 md:py-20 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <GroupHeading kicker="02 / Client & design" title="Hired for taste." />

          <InView variant="slide-up" delay={0.1}>
            <Link
              href="/work/yurr"
              className="group mt-12 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center"
            >
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-accent-light transition-colors">
                    Yurr Magazine
                  </h3>
                  <ArrowUpRight
                    size={20}
                    aria-hidden
                    className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                  />
                </div>
                <p className="mt-3 max-w-xl text-text-secondary leading-relaxed">
                  An independent magazine profiling one creator per issue,
                  published as Instagram carousels. I art-direct every drop and
                  built the Python toolkit that renders all sixteen slides in
                  one command. Eight issues shipped.
                </p>
                <span className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-text-muted">
                  Art direction · Editorial design · Python tooling
                </span>
              </div>
              <ul className="flex gap-4" aria-hidden>
                {yurrCovers.map((cover, ci) => (
                  <li
                    key={cover.src}
                    className={`w-1/3 overflow-hidden rounded-lg border border-border transition-transform duration-300 ${
                      ci === 1 ? "group-hover:-translate-y-2" : "group-hover:-translate-y-1"
                    }`}
                  >
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      width={380}
                      height={475}
                      sizes="150px"
                      className="w-full h-auto"
                    />
                  </li>
                ))}
              </ul>
            </Link>
          </InView>
        </div>
      </section>

      {/* ---- tools & automation ---- */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <GroupHeading kicker="03 / Tools & automation" title="Built for myself, kept honest." />

          <dl className="mt-12 divide-y divide-border border-y border-border">
            {tools.map((tool, i) => (
              <InView key={tool.name} variant="slide-up" delay={i * 0.05}>
                <div className="grid md:grid-cols-[14rem_1fr_auto] gap-x-8 gap-y-2 py-7 items-baseline">
                  <dt className="font-serif text-xl text-text-primary">
                    {tool.name}
                  </dt>
                  <dd className="text-text-secondary leading-relaxed max-w-2xl">
                    {tool.desc}
                    <span className="mt-2 block font-mono text-xs uppercase tracking-widest text-text-muted">
                      {tool.meta}
                    </span>
                  </dd>
                  <dd className="hidden md:block">
                    {tool.href && (
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent-light hover:text-accent transition-colors"
                      >
                        Source
                        <ArrowUpRight size={14} aria-hidden />
                      </a>
                    )}
                  </dd>
                </div>
              </InView>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
