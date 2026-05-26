"use client";

import { ArrowUpRight } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { InteractiveCard } from "@/components/ui/interactive-card";

const posts = [
  {
    title: "Building SoundSauce in 3 Weeks",
    excerpt:
      "How I went from a napkin idea to a live audio analysis platform with payments, auth, and a social layer — using AI-assisted development.",
    date: "Feb 2026",
    tag: "Case Study",
    borderColor: "border-t-purple",
    link: "#",
  },
  {
    title: "Why AI-Assisted Dev Changes Everything",
    excerpt:
      "Claude Code isn\u2019t a shortcut — it\u2019s a thinking partner. Here\u2019s how I use it to ship production apps without a CS degree.",
    date: "Mar 2026",
    tag: "Process",
    borderColor: "border-t-cyan",
    link: "#",
  },
  {
    title: "Psychology Meets Product Design",
    excerpt:
      "What studying human behavior taught me about building software people actually want to use.",
    date: "Mar 2026",
    tag: "Perspective",
    borderColor: "border-t-pink",
    link: "#",
  },
];

export function Blog() {
  return (
    <section id="writing" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple">
            Writing
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Thoughts &amp; lessons
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Reflections on building products, learning to code, and the
            intersection of psychology and technology.
          </p>
        </InView>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <InView key={post.title} variant="slide-up" delay={i * 0.1}>
              <InteractiveCard className="h-full">
                <a
                  href={post.link}
                  className={`group block h-full rounded-2xl border-t-4 ${post.borderColor} bg-surface border border-border p-8 hover:border-purple/30 transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                      {post.date}
                    </span>
                    <span className="rounded-full bg-surface-light px-3 py-1 text-xs font-medium text-text-secondary">
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-purple-light transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-1 text-sm font-medium text-purple-light opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more
                    <ArrowUpRight size={14} />
                  </div>
                </a>
              </InteractiveCard>
            </InView>
          ))}
        </div>
      </div>
    </section>
  );
}
