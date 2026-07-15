"use client";

import { ExternalLink, Github } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { InteractiveCard } from "@/components/ui/interactive-card";

const projects = [
  {
    title: "SoundSauce",
    kicker: "Audio Platform",
    description:
      "A social audio analysis platform for producers and sound engineers. Upload any sound, get an instant breakdown: BPM, key detection, waveform classification, ADSR envelope, tone and texture. All computed client-side with custom FFT and DSP in Web Workers. Downloadable Vital synth presets, Ableton recipes, AI stem separation, plus a full social layer.",
    tags: ["React 19", "Vite", "Supabase", "Stripe", "Web Audio API"],
    link: "https://www.soundsauce.app",
    source: "https://github.com/Schmenkie",
    span: "md:col-span-2",
  },
  {
    title: "LeadHawk",
    kicker: "AI Lead Sourcing",
    description:
      "Scans 6 platforms (Reddit, Hacker News, Dev.to, Remotive, Jobicy, RemoteOK) every two hours. Surfaces freelance opportunities and scores them via a trainable keyword-weight model. Pro tier adds instant email alerts, budget parsing, and CSV export.",
    tags: ["Cloudflare Workers", "D1", "Stripe", "Resend"],
    link: "https://www.leadhawk.org",
    source: "https://github.com/Schmenkie",
    span: "",
  },
  {
    title: "Job Scout",
    kicker: "Personal Agent",
    description:
      "Automated daily job-search agent. Pulls listings from JSearch and Remotive, runs a two-pass scoring system (keyword filter, then Gemini fit analysis with resume matching and cover-letter talking points), and delivers a curated HTML digest to my inbox every morning.",
    tags: ["Node.js", "Gemini AI", "Supabase", "Resend"],
    link: "https://github.com/Schmenkie",
    source: "https://github.com/Schmenkie",
    span: "",
  },
  {
    title: "Project Hub",
    kicker: "Internal Observability",
    description:
      "A private, auth-gated cross-project dashboard I built into this site. One pane of glass for every product I run: PostHog HogQL queries for events, retention, and feature-flag state, plus Sentry issue counts, all proxied server-side so no credentials touch the browser. Unified activity feed across Dogleg, Job Scout, and this site.",
    tags: ["Next.js 16", "PostHog HogQL", "Sentry API", "Edge Proxy"],
    source: "https://github.com/Schmenkie/personal-website",
    span: "md:col-span-2",
  },
  {
    title: "This Website",
    kicker: "Portfolio",
    description:
      "The site you're looking at. Next.js 16, Tailwind v4, Framer Motion. Built in a single session with AI-assisted development, then audited and rebuilt for craft using the impeccable design rubric.",
    tags: ["Next.js 16", "React 19", "Tailwind v4", "Framer Motion"],
    link: "https://github.com/Schmenkie",
    source: "https://github.com/Schmenkie",
    span: "md:col-span-3",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Projects
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            More from the catalog.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Before Dogleg there was a steady stream of side projects.
            Every one started with a real problem and shipped end-to-end. No
            tutorials, no toy apps, no abandoned half-builds.
          </p>
        </InView>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <InView
              key={project.title}
              variant="slide-up"
              delay={i * 0.08}
              className={project.span}
            >
              <InteractiveCard className="h-full">
                <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/40">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
                        {project.kicker}
                      </p>
                      <h3 className="mt-1 font-serif text-2xl leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                          aria-label={`Visit ${project.title}`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                        aria-label={`${project.title} source on GitHub`}
                      >
                        <Github size={16} />
                      </a>
                    </div>
                  </div>
                  <p className="mt-5 text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </InteractiveCard>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
