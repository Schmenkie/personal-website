"use client";

import Image from "next/image";
import { InView } from "@/components/ui/in-view";

const slides = [
  { src: "/projects/yurr/jared.jpg", label: "Issue 007", caption: "Jared · cover" },
  { src: "/projects/yurr/jared-qa.jpg", label: "Issue 007", caption: "Q&A spread" },
  { src: "/projects/yurr/leallicna.jpg", label: "Issue 005", caption: "Leallicna · cover" },
  { src: "/projects/yurr/oliver.jpg", label: "Issue 008", caption: "Oliver · cover" },
  { src: "/projects/yurr/luvstruck.jpg", label: "Issue 006", caption: "Luvstruck · cover" },
  { src: "/projects/yurr/jared-outro.jpg", label: "Issue 007", caption: "Closing grid" },
];

const stats = [
  { label: "Issues designed", value: "8" },
  { label: "Slides per drop", value: "16" },
  { label: "Role", value: "Design + tooling" },
];

export function Magazine() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Yurr's orange print ink, held to a low ambient so it never reads as a second site accent. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          background:
            "radial-gradient(45% 40% at 85% 20%, rgba(224, 78, 27, 0.30) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-end">
          <div>
            <InView variant="slide-up">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  Case Study / Client Design
                </span>
              </div>
              <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
                Yurr Magazine
              </h1>
              <p className="mt-3 text-lg md:text-xl text-text-secondary font-serif italic">
                Client work: a zine for cool people doing cool things.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
                Yurr is an independent magazine that profiles one creator per
                issue, published as Instagram carousels. I art-direct and design
                every drop end to end:{" "}
                <span className="text-text-primary">
                  cover, seven question-and-answer spreads, outfit callouts, and
                  the closing grid
                </span>
                . To keep eight issues consistent and fast to ship, I built the
                rendering toolkit behind them in Python and Pillow: a typographic
                system, shadow and glow compositing, a reactive callout library,
                and a one-command build per issue.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.2}>
              <dl className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs uppercase tracking-widest text-text-muted">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-serif text-xl text-text-primary">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </InView>

            <InView variant="slide-up" delay={0.3}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {["Art direction", "Editorial layout", "Typography", "Python", "Pillow"].map(
                  (tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-surface-light border border-border px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {tag}
                    </li>
                  )
                )}
              </ul>
            </InView>

            <InView variant="slide-up" delay={0.4}>
              <p className="mt-10 text-sm text-text-muted">
                Eight issues and counting, art-directed and designed for Yurr
                Magazine.
              </p>
            </InView>
          </div>

          <InView variant="slide-up" delay={0.2} className="min-w-0">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Swipe the catalog ↔
            </p>
            <ul
              className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Yurr Magazine issue gallery"
            >
              {slides.map((slide) => (
                <li
                  key={slide.src}
                  className="group shrink-0 snap-start first:pl-0"
                >
                  <div className="relative w-[220px] md:w-[260px] overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40 transition-transform duration-300 group-hover:-translate-y-1.5">
                    <Image
                      src={slide.src}
                      alt={`Yurr Magazine ${slide.label}, ${slide.caption}`}
                      width={760}
                      height={950}
                      className="block h-auto w-full"
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
                      {slide.label}
                    </span>
                    <span className="text-xs text-text-muted">{slide.caption}</span>
                  </div>
                </li>
              ))}
            </ul>
          </InView>
        </div>
      </div>
    </section>
  );
}
