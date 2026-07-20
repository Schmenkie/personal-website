"use client";

import Image from "next/image";
import { ArrowUpRight, Apple } from "lucide-react";
import { motion } from "framer-motion";
import { InView } from "@/components/ui/in-view";

const screenshots = [
  { src: "/projects/dogleg/feed.png", alt: "Dogleg rounds feed", rotate: -7, x: -90, z: 0 },
  { src: "/projects/dogleg/login.png", alt: "Dogleg welcome screen", rotate: 0, x: 0, z: 10 },
  { src: "/projects/dogleg/play.png", alt: "Dogleg start-a-round screen", rotate: 7, x: 90, z: 0 },
];

const stack = [
  "Expo SDK 55",
  "React Native",
  "TypeScript",
  "Supabase",
  "Postgres",
  "Realtime",
  "Apple Maps",
];

const stats = [
  { label: "Status", value: "Live on iOS" },
  { label: "Built", value: "Solo" },
  { label: "Scoring", value: "GPS + USGA" },
];

export function FeaturedProject() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, rgba(30, 91, 69, 0.30) 0%, transparent 60%), radial-gradient(50% 40% at 80% 60%, rgba(194, 64, 43, 0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-12 items-center">
          <div>
            <InView variant="slide-up">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  Case Study / Shipped Product
                </span>
              </div>
              <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
                Dogleg
              </h1>
              <p className="mt-3 text-lg md:text-xl text-text-secondary font-serif italic">
                A golf scorecard that feels like the clubhouse, not a
                spreadsheet.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
                Tap to score every hole, with live{" "}
                <span className="text-text-primary">
                  GPS distance to the green
                </span>{" "}
                (wind and elevation adjusted) and a real USGA handicap that
                recalculates the moment you sign the card. Satellite hole maps,
                shareable round posters for the group chat, and a feed where
                your crew&apos;s rounds land. Built solo, end to end, on React
                Native and Supabase, with color, distance, and scoring computed
                on-device. Held to a 60+ accessibility floor, because the first
                user was my dad&apos;s Saturday foursome.
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
                {stack.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface-light border border-border px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </InView>

            <InView variant="slide-up" delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://dogleg.spencercurnow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-accent-light"
                >
                  dogleg.spencercurnow.com
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/linkup-golf-app/id6762869994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-primary transition-colors hover:border-accent/60 hover:bg-surface-light"
                >
                  <Apple size={16} />
                  App Store
                  <ArrowUpRight
                    size={14}
                    className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </InView>
          </div>

          <InView variant="scale" delay={0.2}>
            <div className="relative h-[520px] md:h-[600px] flex items-center justify-center">
              {screenshots.map((shot, i) => (
                <motion.div
                  key={shot.src}
                  initial={{ opacity: 0, x: shot.x, y: 30, rotate: shot.rotate }}
                  animate={{ opacity: 1, x: shot.x, y: 0, rotate: shot.rotate }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8, scale: 1.03, zIndex: 30 }}
                  className="absolute"
                  style={{ zIndex: shot.z }}
                >
                  <PhoneFrame>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={258}
                      height={559}
                      className="block w-full h-auto"
                      priority={i === 1}
                    />
                  </PhoneFrame>
                </motion.div>
              ))}

              <div
                aria-hidden
                className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 w-3/4 rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(closest-side, rgba(217,119,87,0.30), transparent)" }}
              />
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[200px] md:w-[240px] rounded-[2.4rem] bg-obsidian-mid p-2 shadow-2xl ring-1 ring-white/5">
      <div className="absolute left-1/2 top-2 -translate-x-1/2 z-10 h-5 w-20 rounded-b-2xl bg-obsidian-mid" />
      <div className="overflow-hidden rounded-[2rem] border border-white/5">
        {children}
      </div>
    </div>
  );
}
