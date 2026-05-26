"use client";

import { InView } from "@/components/ui/in-view";

const stats = [
  { value: "3", label: "Live Products Shipped", color: "text-purple" },
  { value: "Weeks", label: "Idea to Production", color: "text-cyan" },
  { value: "1,900+", label: "Users Managed", color: "text-pink" },
  { value: "Self-Taught", label: "Via AI-Assisted Dev", color: "text-purple-light" },
];

export function Stats() {
  return (
    <section className="py-10 border-y border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <InView key={stat.label} variant="fade" delay={i * 0.1}>
              <div className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-text-muted">
                  {stat.label}
                </div>
              </div>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
