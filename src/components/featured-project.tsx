"use client";

import Image from "next/image";
import { ArrowUpRight, Apple } from "lucide-react";
import { motion } from "framer-motion";
import { InView } from "@/components/ui/in-view";

const screenshots = [
  { src: "/projects/linkup/feed.png", alt: "LinkUp Golf social feed", rotate: -7, x: -100, z: 0 },
  { src: "/projects/linkup/scorecard.png", alt: "LinkUp Golf scorecard", rotate: 0, x: 0, z: 10 },
  { src: "/projects/linkup/marketplace.png", alt: "LinkUp Golf tee time marketplace", rotate: 7, x: 100, z: 0 },
];

const stack = [
  "Expo SDK 55",
  "React Native",
  "TypeScript",
  "Supabase",
  "Postgres",
  "Realtime",
  "Edge Functions",
];

const stats = [
  { label: "Launched", value: "Apr 2026" },
  { label: "Platforms", value: "iOS + Web" },
  { label: "Built", value: "Solo" },
];

export function FeaturedProject() {
  return (
    <section
      id="featured"
      className="relative overflow-hidden py-24 md:py-32 border-t border-border"
    >
      {/* Ambient forest-tinted glow to nod at LinkUp's brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 40%, rgba(20, 53, 43, 0.35) 0%, transparent 60%), radial-gradient(50% 40% at 80% 60%, rgba(201, 168, 118, 0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-12 items-center">
          {/* Copy column */}
          <div>
            <InView variant="slide-up">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#C9A876]/70" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C9A876]">
                  Featured Project
                </span>
              </div>
              <h2 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
                LinkUp Golf
              </h2>
              <p className="mt-3 text-lg md:text-xl text-text-secondary font-serif italic">
                The only golf app where you actually find someone to play with.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.1}>
              <p className="mt-6 text-base md:text-lg text-text-secondary leading-relaxed">
                Every other major golf app — 18Birdies, GolfShot, TheGrint — is a solo
                stats tracker. LinkUp is the only one where you can post{" "}
                <span className="text-text-primary">
                  &ldquo;2 spots Saturday 8am at Chambers Bay&rdquo;
                </span>{" "}
                and have vouched-via-mutuals golfers claim a seat. Tee-time marketplace,
                GPS scorecard with USGA handicap, recurring group standings, full trip
                planner with cost splitter, and a social feed with live mid-round
                updates — designed with a 60+ accessibility floor because the first
                user was my dad&apos;s Saturday foursome.
              </p>
            </InView>

            <InView variant="slide-up" delay={0.2}>
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-xs uppercase tracking-widest text-text-muted">
                      {s.label}
                    </div>
                    <div className="mt-1 font-serif text-xl text-text-primary">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </InView>

            <InView variant="slide-up" delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-2">
                {stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-light border border-border px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </InView>

            <InView variant="slide-up" delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="https://linkupgolf.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-purple px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-purple-dark glow-purple-hover"
                >
                  linkupgolf.org
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="https://apps.apple.com/us/app/linkup-golf-app/id6762869994"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-primary transition-all hover:border-[#C9A876]/60 hover:bg-surface-light"
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

          {/* Phone mockups column */}
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

              {/* Subtle floor glow */}
              <div
                aria-hidden
                className="absolute bottom-4 left-1/2 -translate-x-1/2 h-10 w-3/4 rounded-full blur-3xl opacity-50"
                style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.35), transparent)" }}
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
    <div className="relative w-[200px] md:w-[240px] rounded-[2.4rem] bg-[#0f0f17] p-2 shadow-2xl ring-1 ring-white/5">
      {/* Notch */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 z-10 h-5 w-20 rounded-b-2xl bg-[#0f0f17]" />
      <div className="overflow-hidden rounded-[2rem] border border-white/5">
        {children}
      </div>
    </div>
  );
}
