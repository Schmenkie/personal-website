"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { InView } from "@/components/ui/in-view";

// SoundSauce case study body. Framed as engineering evidence: the full-stack
// range of the build. Per site rules, NO traction or metric claims here.

const pipeline = [
  { step: "Upload", detail: "any clip, any source" },
  { step: "Separate", detail: "stems via Replicate" },
  { step: "Detect", detail: "instruments via Gemini" },
  { step: "Analyze", detail: "DSP in Web Audio" },
  { step: "Generate", detail: "a Vital preset file" },
];

const inside = [
  {
    area: "The audio brain",
    items: [
      "Stem separation through Replicate so a full mix breaks into analyzable parts",
      "Gemini classifies what instrument it's hearing before analysis starts",
      "Web Audio API extracts the waveform, filter curve, ADSR envelope, and modulation",
      "Output is a real .vital preset the producer opens in their synth",
    ],
  },
  {
    area: "The SaaS around it",
    items: [
      "Supabase auth, storage, and Postgres with row-level security across 22 migrations",
      "Stripe subscriptions gating a freemium Pro tier",
      "A social layer: profiles, follows, likes, comments, and sound-design challenges",
      "PostHog, Sentry, web-vitals, Playwright and Vitest suites, CI on GitHub Actions",
    ],
  },
];

export function SoundSauceCase() {
  return (
    <>
      {/* ---- header ---- */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(55% 45% at 70% 30%, rgba(217, 119, 87, 0.14) 0%, transparent 62%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <InView variant="slide-up">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/70" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                Case Study / Shipped SaaS
              </span>
            </div>
            <h1 className="mt-4 font-serif text-5xl md:text-6xl leading-[1.05]">
              SoundSauce
            </h1>
            <p className="mt-3 text-lg md:text-xl text-text-secondary font-serif italic">
              Hear a sound. Leave with the preset.
            </p>
          </InView>

          <InView variant="slide-up" delay={0.1}>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-text-secondary leading-relaxed">
              Producers spend hours reverse-engineering sounds from YouTube
              tutorials and sample packs. SoundSauce collapses that: upload any
              audio clip and get back a free preset for the Vital synth that
              recreates the sound, plus a breakdown of how it was made. Built
              solo as a complete SaaS, from the DSP analysis to the Stripe
              billing.
            </p>
          </InView>

          {/* ---- pipeline ---- */}
          <InView variant="slide-up" delay={0.2}>
            <ol className="mt-12 flex flex-wrap items-center gap-y-4 rounded-2xl border border-border bg-surface/60 px-6 py-6">
              {pipeline.map((p, i) => (
                <li key={p.step} className="flex items-center">
                  <span className="flex flex-col">
                    <span className="font-mono text-sm text-accent-light uppercase tracking-widest">
                      {p.step}
                    </span>
                    <span className="mt-1 text-xs text-text-muted">
                      {p.detail}
                    </span>
                  </span>
                  {i < pipeline.length - 1 && (
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="mx-5 shrink-0 text-text-muted/60"
                    />
                  )}
                </li>
              ))}
            </ol>
          </InView>

          <InView variant="slide-up" delay={0.3}>
            <div className="mt-10">
              <a
                href="https://www.soundsauce.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-accent-light"
              >
                soundsauce.app
                <ArrowUpRight
                  size={16}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </InView>
        </div>
      </section>

      {/* ---- what's inside ---- */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <InView variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Under the hood
            </span>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
              A whole product, not a demo.
            </h2>
          </InView>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {inside.map((group, gi) => (
              <InView key={group.area} variant="slide-up" delay={gi * 0.1}>
                <div>
                  <h3 className="font-serif text-2xl leading-tight">
                    {group.area}
                  </h3>
                  <ul className="mt-5 space-y-4">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="text-text-secondary leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </InView>
            ))}
          </div>

          <InView variant="slide-up" delay={0.2}>
            <p className="mt-14 max-w-2xl text-text-secondary leading-relaxed border-t border-border pt-8">
              The honest coda: SoundSauce shipped in spring 2026, had its launch
              moment on the Vital community's corner of Reddit, and settled into
              quiet. It stays live as a working product and as proof of range,
              the whole stack of a modern SaaS, built and operated by one
              person.
            </p>
          </InView>
        </div>
      </section>
    </>
  );
}
