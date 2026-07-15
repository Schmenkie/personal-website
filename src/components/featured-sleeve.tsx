"use client";

import Image from "next/image";
import { ArrowUpRight, Apple } from "lucide-react";
import { motion } from "framer-motion";
import { InView } from "@/components/ui/in-view";

const screenshots = [
  { src: "/projects/sleeve/feed.png", alt: "Sleeve friends feed of album ratings", rotate: -7, x: -90, z: 0 },
  { src: "/projects/sleeve/album.png", alt: "Sleeve album page wrapped in its own color", rotate: 0, x: 0, z: 10 },
  { src: "/projects/sleeve/discover.png", alt: "Sleeve discover screen with taste twins", rotate: 7, x: 90, z: 0 },
];

const stack = [
  "Expo SDK 55",
  "React Native",
  "TypeScript",
  "Supabase",
  "Apple Music API",
  "On-device palette",
  "Push",
];

const stats = [
  { label: "Status", value: "Live on iOS" },
  { label: "Users", value: "350+" },
  { label: "Countries", value: "20+" },
  { label: "Albums logged", value: "2,750+" },
];

export function FeaturedSleeve() {
  return (
    <section
      id="featured"
      className="relative overflow-hidden py-24 md:py-32 border-t border-border"
    >
      {/* Album-wash ambient: the deliberate nod to Sleeve's signature color environments. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(55% 45% at 75% 35%, rgba(28, 74, 56, 0.34) 0%, transparent 62%), radial-gradient(50% 45% at 25% 70%, rgba(74, 48, 92, 0.26) 0%, transparent 62%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-12 items-center">
          {/* Visual first on desktop: mirrors Dogleg's layout so the two headliners don't read identically. */}
          <InView variant="scale" delay={0.2} className="order-2 lg:order-1">
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
                      width={640}
                      height={1385}
                      className="block w-full h-auto"
                      sizes="240px"
                    />
                  </PhoneFrame>
                </motion.div>
              ))}

              <div
                aria-hidden
                className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 w-3/4 rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(closest-side, rgba(28,74,56,0.45), transparent)" }}
              />
            </div>
          </InView>

          <div className="order-1 lg:order-2">
            <InView variant="slide-up">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                  Featured Work / 01
                </span>
              </div>
              <h2 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
                Sleeve
              </h2>
              <p className="mt-3 text-lg md:text-xl text-text-secondary font-serif italic">
                Where music finds friends.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
                A social app for people who love albums. Log what you listen to,
                rate it{" "}
                <span className="text-text-primary">½ to 5 stars</span>, write
                reviews, and find the people whose taste actually tracks yours.
                No algorithm deciding what you hear. The signature touch: every
                album page is wrapped in its own color pulled straight from the
                cover art, so a review reads like a little mood piece instead of
                a row in a database. Built solo, end to end: Apple Music import,
                on-device color extraction, taste-twin matching, lists, and a
                vinyl discovery feed.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.2}>
              <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 max-w-md">
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
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="https://getsleeve.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-accent-light"
                >
                  getsleeve.app
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="https://apps.apple.com/app/id6779825854"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-accent/50 hover:text-text-primary"
                >
                  <Apple size={16} />
                  Download on the App Store
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </InView>
          </div>
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
