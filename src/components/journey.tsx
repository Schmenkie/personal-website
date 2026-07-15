"use client";

import { InView } from "@/components/ui/in-view";

type Track = "build" | "ops";

const entries: {
  period: string;
  role: string;
  org: string;
  detail: string;
  track: Track;
}[] = [
  {
    period: "Apr 2026",
    role: "Dogleg · iOS launch",
    org: "Founder · solo",
    detail:
      "Shipped a golf round tracker to the App Store (launched as LinkUp Golf, since rebuilt as Dogleg). Tap-to-score scorecard, GPS distance to the green, satellite hole maps, USGA handicap, shareable round cards. Designed against a 60+ accessibility floor.",
    track: "build",
  },
  {
    period: "Oct 2024 – Present",
    role: "Lead Physical Therapy Aide",
    org: "Prevail Physical Therapy",
    detail:
      "Primary point of contact for 11 providers. Coordinate scheduling, triage clinician requests, manage inventory forecasting in a high-volume outpatient environment.",
    track: "ops",
  },
  {
    period: "2025",
    role: "SoundSauce · LeadHawk · Job Scout",
    org: "Founder · solo",
    detail:
      "Three full-stack products shipped to production in parallel with day-job ops. AI-augmented dev workflow makes weeks-of-work fit into days.",
    track: "build",
  },
  {
    period: "Jul 2024 – Sep 2024",
    role: "Physical Therapy Aide",
    org: "Therapeutic Associates Inc.",
    detail:
      "30+ weekly outbound touchpoints across phone and email. 60+ weekly referrals processed through Athena Health with 100% data integrity.",
    track: "ops",
  },
  {
    period: "May 2024",
    role: "BS Psychology · Music Production Certificate",
    org: "Boise State University",
    detail:
      "Graduated with a psychology degree and a music production certificate. The psych background still shapes how I read users and design product flows.",
    track: "ops",
  },
  {
    period: "Aug 2022 – May 2024",
    role: "Intramural Sports Program Manager",
    org: "Boise State University",
    detail:
      "Drove 92% year-over-year retention across a 1,900+ participant base. Led a 29-person staff, administered the IMLeagues SaaS platform across 1,000+ annual events, lifted CSAT 15% via Qualtrics-driven interventions.",
    track: "ops",
  },
];

const trackLabel: Record<Track, string> = {
  build: "Build",
  ops: "Operations",
};

export function Journey() {
  return (
    <section id="journey" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Journey
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            How I got here.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Two tracks running in parallel since 2024: shipping products on
            nights and weekends, and running customer-facing operations during
            the day. Both inform each other.
          </p>
        </InView>

        <InView variant="slide-up" delay={0.1}>
          <ol className="mt-16 relative max-w-3xl">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-border"
            />
            {entries.map((e, i) => (
              <li
                key={e.period + e.role}
                className="relative grid grid-cols-[auto_1fr] gap-x-6 pb-10 last:pb-0"
              >
                <span
                  aria-hidden
                  className={
                    e.track === "build"
                      ? "mt-2 h-3.5 w-3.5 rounded-full bg-accent ring-4 ring-obsidian"
                      : "mt-2 h-3.5 w-3.5 rounded-full bg-surface border border-border ring-4 ring-obsidian"
                  }
                />
                <div className="pt-0.5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
                      {e.period}
                    </p>
                    <span
                      className={
                        e.track === "build"
                          ? "rounded-full bg-accent/[0.08] border border-accent/30 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-accent-light"
                          : "rounded-full bg-surface border border-border px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-text-muted"
                      }
                    >
                      {trackLabel[e.track]}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-xl md:text-2xl leading-tight">
                    {e.role}
                  </h3>
                  <p className="text-sm text-text-muted mt-0.5">{e.org}</p>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    {e.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
