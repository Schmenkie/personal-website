"use client";

import { InView } from "@/components/ui/in-view";

const stats = [
  { value: "4", label: "Live products shipped" },
  { value: "3 wks", label: "Typical idea to launch" },
  { value: "Sleeve", label: "Newest launch, live on iOS" },
  { value: "2024", label: "Self-taught dev since" },
];

export function Stats() {
  return (
    <section className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:divide-x md:divide-border">
          {stats.map((stat, i) => (
            <InView key={stat.label} variant="fade" delay={i * 0.08}>
              <li className="md:px-6 first:md:pl-0">
                <div className="font-serif text-2xl md:text-3xl text-text-primary leading-tight">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-xs uppercase tracking-widest text-text-muted">
                  {stat.label}
                </div>
              </li>
            </InView>
          ))}
        </ul>
      </div>
    </section>
  );
}
