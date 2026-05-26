"use client";

import { Mail, Linkedin, Github, Music } from "lucide-react";
import { InView } from "@/components/ui/in-view";
import { GradientText } from "@/components/ui/gradient-text";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:scurnow24@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/spencercurnow/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/Schmenkie",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <InView variant="scale">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple">
            Contact
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            Let&apos;s build something{" "}
            <GradientText>together</GradientText>
          </h2>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Whether you have a project in mind, a role to fill, or just want
            to chat — I&apos;d love to hear from you.
          </p>
        </InView>

        <InView variant="slide-up" delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:scurnow24@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-purple px-8 py-3.5 text-sm font-semibold text-white hover:bg-purple-light transition-colors"
            >
              <Mail size={18} />
              Get In Touch
            </a>
            <a
              href="https://www.linkedin.com/in/spencercurnow/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-purple/50 px-8 py-3.5 text-sm font-semibold text-purple hover:bg-purple/10 transition-colors"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </InView>

        <InView variant="fade" delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="p-3 rounded-full text-text-muted hover:text-purple hover:bg-purple/10 transition-colors"
                aria-label={link.label}
              >
                <link.icon size={22} />
              </a>
            ))}
            <a
              href="https://www.soundsauce.app"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full text-text-muted hover:text-purple hover:bg-purple/10 transition-colors"
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
