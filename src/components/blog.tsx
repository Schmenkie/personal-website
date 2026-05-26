"use client";

import { InView } from "@/components/ui/in-view";

const upcoming = [
  {
    title: "Building LinkUp Golf in 3 months, solo",
    status: "Drafting",
    summary:
      "Going from a single HTML mockup for my dad's foursome to an iOS app on the App Store. What I'd do differently, what's still broken, why density beats reach.",
  },
  {
    title: "Why AI-assisted dev changes everything",
    status: "Planned",
    summary:
      "Claude Code isn't a shortcut, it's a thinking partner. How I use it to ship production apps without a CS degree, and where I still get stuck.",
  },
  {
    title: "Psychology meets product",
    status: "Planned",
    summary:
      "What four years of studying behavior taught me about building software people actually open twice.",
  },
];

export function Blog() {
  return (
    <section id="writing" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Writing
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Coming soon.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Three posts in the pipeline. If any sound interesting, drop me a
            line and I&apos;ll send it your way when it lands.
          </p>
        </InView>

        <InView variant="slide-up" delay={0.15}>
          <ul className="mt-12 space-y-6 max-w-3xl">
            {upcoming.map((post) => (
              <li
                key={post.title}
                className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 items-baseline pb-6 border-b border-border last:border-b-0"
              >
                <span className="rounded-full border border-accent/30 bg-accent/[0.06] px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-accent-light whitespace-nowrap">
                  {post.status}
                </span>
                <div>
                  <h3 className="font-serif text-xl md:text-2xl leading-tight">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-text-secondary leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}
