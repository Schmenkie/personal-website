"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Rocket } from "lucide-react";
import { InView } from "@/components/ui/in-view";

const advantages = [
  {
    icon: Brain,
    number: "01",
    title: "Psychology Background",
    description:
      "I identify why users struggle before touching code. A BS in Psychology means real empathy — not assumed personas.",
    color: "text-purple-light",
    border: "border-purple/30",
    glow: "shadow-purple/5",
  },
  {
    icon: Zap,
    number: "02",
    title: "AI-Assisted Development",
    description:
      "Claude Code as a thinking partner, not a shortcut. I move faster without cutting corners — shipping production-grade code in days.",
    color: "text-cyan",
    border: "border-cyan/30",
    glow: "shadow-cyan/5",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Ship to Real Users",
    description:
      "Not prototypes. Not demos. Live products with Stripe payments, auth flows, and actual users. If it\u2019s not in production, it\u2019s not done.",
    color: "text-pink",
    border: "border-pink/30",
    glow: "shadow-pink/5",
  },
];

export function Approach() {
  return (
    <section
      id="approach"
      className="relative py-24 md:py-32 border-t border-border overflow-hidden"
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.2) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <InView variant="slide-up">
          <span className="text-sm font-semibold uppercase tracking-widest text-purple">
            Approach
          </span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">
            How I work differently
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
            Not your typical dev process. My unique background gives me
            unfair advantages at every stage.
          </p>
        </InView>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {advantages.map((step, i) => (
            <InView key={step.number} variant="slide-up" delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`rounded-2xl border ${step.border} bg-surface/80 backdrop-blur-sm p-8 h-full hover:shadow-lg ${step.glow} transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div className={`${step.color}`}>
                    <step.icon size={28} />
                  </div>
                  <span className="text-sm font-mono text-text-muted">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-serif font-bold">
                  {step.title}
                </h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </InView>
          ))}
        </div>

        {/* Comparison callout */}
        <InView variant="scale" delay={0.2} className="mt-16">
          <div className="rounded-2xl bg-purple/10 border border-purple/20 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-text-muted text-sm uppercase tracking-wider">Traditional</span>
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-text-muted/40">
                  3-6 months
                </div>
              </div>
              <div>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-purple text-sm uppercase tracking-wider font-semibold">My approach</span>
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-purple">
                  3 weeks
                </div>
                <p className="mt-3 text-text-secondary">
                  SoundSauce — from idea to production in 21 days.
                  Full-stack, with payments, auth, and a social layer.
                </p>
              </div>
            </div>
          </div>
        </InView>
      </div>
    </section>
  );
}
