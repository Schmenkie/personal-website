"use client";

import { InView } from "@/components/ui/in-view";

const advantages = [
  {
    number: "01",
    title: "Psychology, before pixels.",
    description:
      "A BS in Psychology means I identify why users struggle before I touch a line of code. Real empathy, not assumed personas.",
  },
  {
    number: "02",
    title: "AI as a thinking partner.",
    description:
      "Claude Code accelerates the work without cutting corners. I move faster on the boring parts so I can spend more time on the interesting ones.",
  },
  {
    number: "03",
    title: "Ship, or it didn't happen.",
    description:
      "Not prototypes. Not demos. Live products with Stripe payments, auth flows, actual users. If it isn't in production, it isn't done.",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="relative py-24 md:py-32 border-t border-border"
    >
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Approach
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            How I work differently.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Three things that compound. Each one shapes how I pick what to
            build, how fast I build it, and whether it actually ships.
          </p>
        </InView>

        <ol className="mt-16 divide-y divide-border">
          {advantages.map((step, i) => (
            <InView key={step.number} variant="slide-up" delay={i * 0.08}>
              <li className="grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_2fr] gap-x-6 md:gap-x-10 gap-y-3 py-10 md:py-12 items-start">
                <span className="font-mono text-sm text-accent self-start tracking-widest">
                  {step.number}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl leading-tight col-span-1 md:col-span-1">
                  {step.title}
                </h3>
                <p className="col-span-2 md:col-span-1 text-text-secondary text-base md:text-lg leading-relaxed max-w-prose">
                  {step.description}
                </p>
              </li>
            </InView>
          ))}
        </ol>
      </div>
    </section>
  );
}
