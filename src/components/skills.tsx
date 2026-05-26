"use client";

import { InView } from "@/components/ui/in-view";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React 19", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "React Native", "Expo"],
  },
  {
    category: "Backend & Infrastructure",
    skills: ["Node.js", "Cloudflare Workers", "Vercel", "Supabase", "Postgres", "D1 (SQLite)", "REST APIs"],
  },
  {
    category: "AI & Data",
    skills: ["Claude Code", "Gemini AI", "Prompt Engineering", "Web Audio / DSP", "SPSS", "Qualtrics"],
  },
  {
    category: "Business & Product",
    skills: ["Stripe", "Email Automation", "CRM Systems", "Product Thinking", "User Research"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <InView variant="slide-up">
            <div className="lg:sticky lg:top-28">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Skills
              </span>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
                The toolkit.
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                Picked one tool at a time, each chosen for a real project, not a
                tutorial. Heavy on the React + Supabase + Cloudflare side; comfortable
                anywhere the stack is plain JavaScript and a good API.
              </p>
            </div>
          </InView>

          <InView variant="slide-up" delay={0.1}>
            <dl className="space-y-10">
              {skillGroups.map((group) => (
                <div key={group.category} className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-3 md:gap-6 items-baseline">
                  <dt className="font-mono text-xs uppercase tracking-widest text-text-muted">
                    {group.category}
                  </dt>
                  <dd className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </InView>
        </div>
      </div>
    </section>
  );
}
