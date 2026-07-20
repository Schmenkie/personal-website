"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { InView } from "@/components/ui/in-view";

// Landing-page teasers for the three flagship stories. The full sections
// (phone fans, the Yurr carousel) live on each project's case-study page
// under /work. Keep this list to three; everything else belongs on /work.
const stories = [
  {
    number: "01",
    title: "Sleeve",
    hook: "A social app for music fans, live on the App Store with listeners in 20+ countries. Log albums, find taste twins, catch the daily Spin.",
    href: "/work/sleeve",
    image: "/projects/sleeve/feed.png",
    alt: "Sleeve's home feed on an iPhone",
    meta: "iOS · Live",
  },
  {
    number: "02",
    title: "Yurr Magazine",
    hook: "An independent magazine profiling one creator per issue. Art direction, sixteen slides a drop, and a Python toolkit that renders it all.",
    href: "/work/yurr",
    image: "/projects/yurr/jared.jpg",
    alt: "Yurr Magazine issue cover",
    meta: "Client design · 8 issues",
  },
  {
    number: "03",
    title: "Dogleg",
    hook: "A GPS caddie built for the joy of it: tap-to-score, satellite hole maps, USGA handicap. Solo-built and live on iOS.",
    href: "/work/dogleg",
    image: "/projects/dogleg/login.png",
    alt: "Dogleg's welcome screen on an iPhone",
    meta: "iOS · Live",
  },
];

export function SelectedWork() {
  return (
    <section id="featured" className="relative py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Selected Work
              </span>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
                Three stories worth reading.
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-6 py-2.5 text-sm font-semibold text-accent-light hover:bg-accent/10 transition-colors"
            >
              Browse everything
              <ArrowRight size={16} />
            </Link>
          </div>
        </InView>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {stories.map((story, i) => (
            <InView key={story.number} variant="slide-up" delay={i * 0.08}>
              <Link
                href={story.href}
                className="group grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_auto] items-center gap-x-6 md:gap-x-10 gap-y-4 py-8 md:py-10"
              >
                <span className="font-mono text-sm text-accent tracking-widest self-start pt-2">
                  {story.number}
                </span>
                <div className="max-w-xl">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl md:text-3xl leading-tight group-hover:text-accent-light transition-colors">
                      {story.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      aria-hidden
                      className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </div>
                  <p className="mt-2 text-text-secondary leading-relaxed">
                    {story.hook}
                  </p>
                  <span className="mt-3 inline-block font-mono text-xs uppercase tracking-widest text-text-muted">
                    {story.meta}
                  </span>
                </div>
                <div className="col-span-2 md:col-span-1 justify-self-start md:justify-self-end">
                  <div className="relative w-28 md:w-32 overflow-hidden rounded-xl border border-border bg-surface">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      width={256}
                      height={554}
                      sizes="128px"
                      className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </Link>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
