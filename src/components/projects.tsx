"use client";

import { ExternalLink, Github, Terminal } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { InteractiveCard } from "@/components/ui/interactive-card";

const projects = [
  {
    title: "SoundSauce",
    description:
      "A social audio analysis platform for producers and sound engineers. Upload any sound to get instant breakdowns — BPM, key detection, waveform classification, ADSR envelope, tone and texture analysis — all computed client-side with custom FFT/DSP in Web Workers. Includes downloadable Vital synth presets, Ableton Live recipes, AI-powered stem separation, and a full social layer with feeds, messaging, challenges, and user profiles.",
    tags: ["React 19", "Vite", "Supabase", "Vercel", "Stripe", "Web Audio API"],
    borderColor: "border-t-purple",
    accentBg: "bg-purple/5",
    link: "https://www.soundsauce.app",
    span: "md:col-span-2",
    hasImage: true,
  },
  {
    title: "LeadHawk",
    description:
      "AI-powered lead sourcing tool that scans 6 platforms (Reddit, Hacker News, Dev.to, Remotive, Jobicy, RemoteOK) every 2 hours. Surfaces and scores freelance opportunities using a trainable keyword-weight model — like/dislike posts to teach it your preferences. Pro tier adds instant email alerts, budget parsing, and CSV export.",
    tags: ["Cloudflare Workers", "D1", "Stripe", "Resend", "Vanilla JS"],
    borderColor: "border-t-cyan",
    accentBg: "bg-cyan/5",
    link: "https://www.leadhawk.org",
    span: "",
    hasImage: true,
  },
  {
    title: "Job Scout",
    description:
      "Automated daily job search agent. Aggregates listings from JSearch and Remotive, runs a two-pass scoring system — fast keyword filter, then Gemini AI analysis for fit scoring, resume matching, and cover letter talking points — and delivers a curated HTML digest to my inbox every morning.",
    tags: ["Node.js", "Gemini AI", "Supabase", "Resend", "RapidAPI"],
    borderColor: "border-t-pink",
    accentBg: "bg-pink/5",
    link: "https://github.com/Schmenkie",
    span: "",
    hasImage: false,
  },
  {
    title: "This Website",
    description:
      "The site you\u2019re looking at right now. Built with Next.js 16, Tailwind v4, and Framer Motion. Features 3D interactive cards, scroll-triggered animations, canvas particle effects, and an animated terminal — all shipped in a single session with AI-assisted development.",
    tags: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
    borderColor: "border-t-purple-light",
    accentBg: "bg-purple-light/5",
    link: "https://github.com/Schmenkie",
    span: "md:col-span-2",
    hasImage: false,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple">
            Projects
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            More from the catalog
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Before LinkUp Golf there was a steady stream of side projects.
            Every one started with a real problem and shipped end-to-end —
            no tutorials, no toy apps, no abandoned half-builds.
          </p>
        </InView>

        {/* Bento grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <InView
              key={project.title}
              variant="slide-up"
              delay={i * 0.1}
              className={project.span}
            >
              <InteractiveCard className="h-full">
                <div
                  className={`group relative h-full overflow-hidden rounded-2xl border-t-4 ${project.borderColor} ${project.accentBg} bg-surface border border-border p-8 transition-all duration-300 hover:border-purple/30`}
                >
                  {/* Gradient placeholder for projects without images */}
                  {!project.hasImage && project.title === "Job Scout" && (
                    <div className="mb-6 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-pink/20 via-surface to-purple/10">
                      <Terminal size={40} className="text-pink/60" />
                    </div>
                  )}
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-surface-light transition-colors"
                        aria-label="View project"
                      >
                        <ExternalLink size={16} className="text-text-secondary" />
                      </a>
                      <a
                        href="https://github.com/Schmenkie"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full hover:bg-surface-light transition-colors"
                        aria-label="View source"
                      >
                        <Github size={16} className="text-text-secondary" />
                      </a>
                    </div>
                  </div>
                  <p className="mt-3 text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-light border border-border px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </InteractiveCard>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
