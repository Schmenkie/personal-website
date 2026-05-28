"use client";

import { GraduationCap, Music, Gamepad2, Dog, ChefHat, Flag, Mountain } from "lucide-react";
import { InView } from "@/components/ui/in-view";

const interests = [
  { icon: Music, label: "Music Production" },
  { icon: ChefHat, label: "Cooking" },
  { icon: Flag, label: "Golf" },
  { icon: Mountain, label: "Outdoors" },
  { icon: Dog, label: "Animals" },
  { icon: Gamepad2, label: "Gaming" },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            About
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Not your typical developer.
          </h2>
        </InView>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          <InView variant="slide-up" delay={0.1}>
            <div className="space-y-5 text-text-secondary leading-relaxed text-lg">
              <p>
                I studied psychology at Boise State, earned a Music Production
                certificate, ran intramural sports for 1,900+ student
                participants, and currently lead PT aide operations at Prevail
                Physical Therapy in Shoreline.
              </p>
              <p>
                I&apos;ve always had ideas for tools I wished existed but
                didn&apos;t know how to code. When AI-assisted development
                clicked, everything else followed. Now I ship full-stack
                products in weeks, not months, combining a working knowledge of
                how people behave with the ability to actually build things.
              </p>
              <p>
                Every project I&apos;ve shipped started with a real problem I
                wanted to solve. Not a tutorial. Not a portfolio piece. A thing
                I needed, that I went and made.
              </p>
            </div>
          </InView>

          <InView variant="slide-up" delay={0.2}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-accent/10 p-2 text-accent">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight">Boise State University</h3>
                    <p className="text-sm text-text-muted">Class of 2024</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary">
                    BS Psychology
                  </span>
                  <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary">
                    Music Production
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  When I&apos;m not building
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {interests.map((item) => (
                    <li
                      key={item.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-text-secondary"
                    >
                      <item.icon size={14} className="text-accent" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
