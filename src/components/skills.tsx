"use client";

import { Brain, Rocket, Users, Puzzle } from "lucide-react";
import { InView } from "@/components/ui/in-view";

const skillGroups = [
  {
    category: "Frontend",
    skills: ["React 19", "Next.js", "Vite", "Tailwind CSS", "Framer Motion", "Vanilla JS/CSS"],
  },
  {
    category: "Backend & Infrastructure",
    skills: ["Node.js", "Cloudflare Workers", "Vercel", "Supabase", "D1 (SQLite)", "REST APIs"],
  },
  {
    category: "AI & Data",
    skills: ["Claude Code", "Gemini AI", "Prompt Engineering", "Web Audio / DSP", "Data Analysis (SPSS, Qualtrics)"],
  },
  {
    category: "Business & Product",
    skills: ["Stripe Integration", "CRM Systems", "Email Automation (Resend)", "Product Thinking", "User Research"],
  },
];

const superpowers = [
  {
    icon: Brain,
    title: "Psychology + Code",
    description: "A BS in Psychology means I build for how people actually think and behave — not just what looks cool.",
  },
  {
    icon: Rocket,
    title: "Idea to Production in Weeks",
    description: "SoundSauce: 3 weeks. LeadHawk: live and monetized. I don\u2019t prototype endlessly — I ship.",
  },
  {
    icon: Users,
    title: "Managed 1,900+ Users",
    description: "Led intramural sports at Boise State — 92% retention, team of 29, 1,000+ events per year.",
  },
  {
    icon: Puzzle,
    title: "Builder Mentality",
    description: "If I have a problem, I build the solution. Every project started with a real need, not a tutorial.",
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple">
            Skills
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            What I bring to the table
          </h2>
        </InView>

        <div className="mt-16 grid lg:grid-cols-2 gap-12">
          {/* Skill pills */}
          <InView variant="slide-left">
            <div className="space-y-8">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted mb-3">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary hover:border-purple hover:text-purple transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </InView>

          {/* What sets me apart */}
          <InView variant="slide-right">
            <div className="rounded-2xl border border-border bg-surface p-8 space-y-6">
              <h3 className="font-serif text-2xl font-bold">
                What sets me apart
              </h3>
              {superpowers.map((sp) => (
                <div key={sp.title} className="flex gap-4">
                  <div className="mt-0.5 flex-shrink-0 rounded-lg bg-purple/10 p-2 text-purple">
                    <sp.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{sp.title}</h4>
                    <p className="text-sm text-text-secondary mt-0.5">
                      {sp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </InView>
        </div>
      </div>
    </section>
  );
}
