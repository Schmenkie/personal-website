"use client";

import { Zap, Heart, Lightbulb, Layers, GraduationCap, Music, Gamepad2, Dog } from "lucide-react";
import { InView } from "@/components/ui/in-view";

const traits = [
  {
    icon: Zap,
    title: "Speed to Ship",
    description: "Full-stack products in weeks. SoundSauce went from idea to live platform in 3 weeks.",
    color: "text-purple",
    bg: "bg-purple/10",
  },
  {
    icon: Heart,
    title: "People-First",
    description: "Psychology degree, team leadership, 1,900+ users managed — I understand what makes people tick.",
    color: "text-cyan",
    bg: "bg-cyan/10",
  },
  {
    icon: Lightbulb,
    title: "Problem \u2192 Product",
    description: "I don\u2019t just identify problems — I build the solution. Every project started with a real need.",
    color: "text-pink",
    bg: "bg-pink/10",
  },
  {
    icon: Layers,
    title: "Full-Stack",
    description: "React, Node.js, Cloudflare Workers, Supabase, Vercel, Stripe — end to end.",
    color: "text-purple-light",
    bg: "bg-purple-light/10",
  },
];

const interests = [
  { icon: Music, label: "Music Production" },
  { icon: Dog, label: "Animals" },
  { icon: Gamepad2, label: "Gaming" },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple">
            About
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Not your typical developer
          </h2>
        </InView>

        {/* Origin story */}
        <div className="mt-10 grid lg:grid-cols-2 gap-12 items-start">
          <InView variant="slide-left">
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p className="text-lg">
                I studied psychology at Boise State, earned an Electronic Music
                Production certificate, managed intramural sports for 1,900+
                participants, and currently lead PT aide operations at Prevail
                Physical Therapy in Shoreline.
              </p>
              <p className="text-lg">
                I&apos;ve always had ideas for tools I wished existed — but I
                didn&apos;t know how to code. When I discovered AI-assisted
                development, everything clicked. Now I ship full-stack products
                in weeks, combining my understanding of people with the power
                to actually build things.
              </p>
              <p className="text-lg">
                Every project I&apos;ve built started with a real problem I
                wanted to solve — not a tutorial I followed.
              </p>
            </div>
          </InView>

          <InView variant="slide-right">
            <div className="space-y-4">
              {/* Education card */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-purple/10 p-2 text-purple">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Boise State University</h3>
                    <p className="text-sm text-text-muted">Class of 2024</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary">
                    BS Psychology
                  </span>
                  <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary">
                    Electronic Music Production Certificate
                  </span>
                </div>
              </div>

              {/* Interests */}
              <div className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="font-semibold mb-3">When I&apos;m not building</h3>
                <div className="flex flex-wrap gap-3">
                  {interests.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 rounded-full bg-surface-light px-4 py-2 text-sm text-text-secondary">
                      <item.icon size={16} />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </InView>
        </div>

        {/* Trait cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {traits.map((trait, i) => (
            <InView key={trait.title} variant="slide-up" delay={i * 0.1}>
              <div className="group rounded-2xl border border-border bg-surface p-6 hover:-translate-y-1 hover:border-purple/50 transition-all duration-300">
                <div
                  className={`inline-flex rounded-xl ${trait.bg} p-3 ${trait.color}`}
                >
                  <trait.icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{trait.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  {trait.description}
                </p>
              </div>
            </InView>
          ))}
        </div>

        {/* Monogram card */}
        <InView variant="scale" delay={0.2} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-surface border border-border p-8 md:p-12">
            <div className="absolute top-4 right-8 font-serif text-[12rem] leading-none text-white/[0.03] select-none">
              SC
            </div>
            <div className="relative z-10 max-w-2xl">
              <p className="text-xl md:text-2xl font-serif leading-relaxed italic text-text-secondary">
                &ldquo;I&apos;ve always had ideas for things I wished existed.
                Now I have the ability to build them.&rdquo;
              </p>
              <div className="mt-8 flex flex-wrap gap-8">
                <div>
                  <div className="text-3xl font-bold text-purple">
                    3
                  </div>
                  <div className="text-sm text-text-muted">Live products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan">
                    Weeks
                  </div>
                  <div className="text-sm text-text-muted">Idea to launch</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink">
                    Self-taught
                  </div>
                  <div className="text-sm text-text-muted">Via AI-assisted dev</div>
                </div>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
