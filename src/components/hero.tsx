"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { ParticleField } from "@/components/ui/particle-field";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

const terminalLines = [
  { type: "command" as const, text: "$ whoami" },
  { type: "result" as const, text: "→ spencer curnow" },
  { type: "command" as const, text: "$ ls projects/" },
  { type: "result" as const, text: "→ sleeve/  yurr-mag/  linkup-golf/" },
  { type: "command" as const, text: "$ cat status.txt" },
  { type: "result" as const, text: "→ sleeve in testflight, app store soon" },
  { type: "command" as const, text: "$ ./ship.sh" },
  { type: "success" as const, text: "✓ building..." },
  { type: "success" as const, text: "✓ shipped to ios + web" },
  { type: "success" as const, text: "✓ done. on to the next one." },
];

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return;
    const delay = terminalLines[visibleLines]?.type === "command" ? 800 : 400;
    const timeout = setTimeout(() => setVisibleLines((v) => v + 1), delay);
    return () => clearTimeout(timeout);
  }, [visibleLines]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
      className="rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl shadow-accent/10"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-obsidian-mid">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-accent/70" />
          <div className="w-3 h-3 rounded-full bg-accent/40" />
          <div className="w-3 h-3 rounded-full bg-accent/20" />
        </div>
        <span className="flex-1 text-center text-xs text-text-muted font-mono">
          ~/spencer
        </span>
      </div>

      <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="mb-1">
            {line.type === "command" && (
              <span className="text-accent-light">{line.text}</span>
            )}
            {line.type === "result" && (
              <span>
                <span className="text-accent">{line.text.slice(0, 2)}</span>
                <span className="text-text-primary">{line.text.slice(2)}</span>
              </span>
            )}
            {line.type === "success" && (
              <span className="text-accent">{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-accent animate-blink" />
        )}
        {visibleLines >= terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-accent animate-blink mt-1" />
        )}
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <ParticleField />

      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="float-shape-1 absolute top-[15%] right-[10%] w-72 h-72 rounded-full bg-accent/[0.06] blur-3xl" />
        <div className="float-shape-2 absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-accent/[0.04] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.08] px-4 py-1.5 text-sm font-medium text-accent-light">
              <span className="relative flex h-2 w-2">
                <span aria-hidden className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
                <span aria-hidden className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for new projects
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight"
          >
            I see problems.
            <br />
            <span className="italic text-accent">I build solutions.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-lg text-lg text-text-secondary leading-relaxed"
          >
            I&apos;m Spencer Curnow, a psychology grad turned self-taught
            developer. I take a vision and ship it, using AI-augmented
            development to compress weeks of work into days. Most recently{" "}
            <a
              href="#featured"
              className="text-text-primary underline decoration-accent/60 underline-offset-4 hover:decoration-accent transition-colors"
            >
              Sleeve
            </a>
            , a social app for music fans now in TestFlight beta, plus ongoing
            design work for Yurr Magazine. If you have something you want built,
            I&apos;d like to build it for you.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
            <a
              href="#contact"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-obsidian hover:bg-accent-light transition-colors"
            >
              Work with me
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#featured"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-semibold text-accent-light hover:bg-accent/10 transition-colors"
            >
              See the work
              <ArrowDown size={16} />
            </a>
          </motion.div>
        </motion.div>

        <div className="hidden md:block">
          <TerminalWindow />
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={20} className="text-text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
