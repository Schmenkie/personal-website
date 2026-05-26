"use client";

import { Mail, Linkedin, Github, Music, FileText } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import Link from "next/link";

const contactLinks = [
  { icon: Mail, label: "Email", href: "mailto:scurnow24@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/spencercurnow/" },
  { icon: Github, label: "GitHub", href: "https://github.com/Schmenkie" },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <InView variant="scale">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Contact
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Let&apos;s build something{" "}
            <span className="italic text-accent">together</span>.
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Project work is the headline. Send me what you want built, we&apos;ll
            scope it and figure out payment in conversation. Full-time roles
            welcome too if the fit is right.
          </p>
        </InView>

        <InView variant="slide-up" delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:scurnow24@gmail.com"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-obsidian hover:bg-accent-light transition-colors"
            >
              <Mail size={18} />
              Get In Touch
            </a>
            <Link
              href="/resume"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-8 py-3.5 text-sm font-semibold text-accent-light hover:bg-accent/10 transition-colors"
            >
              <FileText size={18} />
              View Resume
            </Link>
          </div>
        </InView>

        <InView variant="fade" delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={22} />
              </a>
            ))}
            <a
              href="https://www.soundsauce.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-text-muted hover:text-accent hover:bg-accent/10 transition-colors"
              aria-label="SoundSauce"
            >
              <Music size={22} />
            </a>
          </div>
        </InView>
      </div>
    </section>
  );
}
