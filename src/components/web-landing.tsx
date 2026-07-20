"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  Star,
  Zap,
  Smartphone,
  Search,
  MousePointerClick,
  Clock,
  Check,
} from "lucide-react";
import { InView } from "@/components/ui/in-view";

// A mailto that prefills the details Spencer needs to scope a job.
const MAILTO =
  "mailto:scurnow24@gmail.com?subject=" +
  encodeURIComponent("Website for my business") +
  "&body=" +
  encodeURIComponent(
    "Business name:\n\nCurrent website (if any):\n\nWhat you're after:\n\nBest number to reach you:\n"
  );

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    icon: Smartphone,
    title: "Built for phones first",
    body: "Most of your customers are searching on their phone. Your site will look right and load fast on every one of them.",
  },
  {
    icon: Zap,
    title: "Fast enough to keep them",
    body: "Slow sites lose people before the page even loads. Yours will open instantly, so nobody bounces to a competitor.",
  },
  {
    icon: MousePointerClick,
    title: "One tap to call you",
    body: "A big, obvious call button on every screen. The whole point is turning a visitor into a phone call.",
  },
  {
    icon: Star,
    title: "Your reviews up front",
    body: "Your best Google reviews, right where new customers see them. Social proof does the selling for you.",
  },
  {
    icon: Search,
    title: "Ready to be found",
    body: "Set up so Google understands who you are, what you do, and where you are. Clean, indexable, honest.",
  },
  {
    icon: Clock,
    title: "Live in about a week",
    body: "No months-long project. Send me what you have, and most sites go live within a week of scoping.",
  },
];

const steps = [
  {
    number: "01",
    title: "Send me what you've got.",
    body: "Your business name, your current site if you have one, and roughly what you want. A text or a two-line email is plenty.",
  },
  {
    number: "02",
    title: "I make a free mockup.",
    body: "I build a real preview of what your new site could look like, at no cost. You see it before you decide anything.",
  },
  {
    number: "03",
    title: "We scope it in a conversation.",
    body: "If you like it, we talk through what you need and I give you one clear price. No packages, no upsells.",
  },
  {
    number: "04",
    title: "Your site goes live.",
    body: "I build it, connect your domain, and put it online. Most sites are live within about a week.",
  },
];

const faqs = [
  {
    q: "How much does it cost?",
    a: "It depends on what you need, so I quote one number per project once I've seen it. The mockup is free either way, so there's no cost to find out.",
  },
  {
    q: "I already have a website. Can you just fix it?",
    a: "Usually I rebuild it, which ends up faster and cleaner than patching an old site. If yours is close, I'll tell you honestly that it isn't worth a rebuild.",
  },
  {
    q: "Do I need to know anything technical?",
    a: "No. You tell me about your business, I handle the domain, hosting, and every technical piece. You just approve how it looks.",
  },
  {
    q: "What if I don't have a logo or photos?",
    a: "That's fine. I can design around clean type and your Google reviews, and we can add photos whenever you have them.",
  },
];

/* A generic, clearly-illustrative preview of a clean local-business site.
   Not a real business, just a visual of the outcome. */
function PhonePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      aria-hidden
      className="relative mx-auto w-[260px]"
    >
      <div className="rounded-[2.2rem] border border-border-strong bg-obsidian-mid p-2.5 shadow-2xl shadow-accent/10">
        <div className="overflow-hidden rounded-[1.7rem] border border-border bg-surface">
          {/* mock browser bar */}
          <div className="flex items-center gap-1.5 border-b border-border bg-obsidian-mid px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-accent/60" />
            <span className="h-2 w-2 rounded-full bg-accent/30" />
            <span className="ml-2 flex-1 truncate rounded bg-surface-light px-2 py-0.5 text-[9px] font-mono text-text-muted">
              riversideplumbing.com
            </span>
          </div>
          {/* mock site body */}
          <div className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <span className="font-serif text-sm text-text-primary">
                Riverside Plumbing
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-1 text-[9px] font-semibold text-obsidian">
                <Phone size={9} />
                Call
              </span>
            </div>
            <div className="h-20 rounded-lg bg-surface-light" />
            <div className="space-y-1.5">
              <div className="h-2 w-4/5 rounded bg-border-strong" />
              <div className="h-2 w-3/5 rounded bg-border-strong" />
            </div>
            <div className="flex items-center gap-0.5 text-accent">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
              ))}
              <span className="ml-1 text-[9px] text-text-muted">
                128 reviews
              </span>
            </div>
            <div className="rounded-lg bg-accent px-3 py-2 text-center text-[10px] font-semibold text-obsidian">
              Call for a free quote
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              <div className="h-8 rounded bg-surface-light" />
              <div className="h-8 rounded bg-surface-light" />
              <div className="h-8 rounded bg-surface-light" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function WebLanding() {
  return (
    <>
      {/* ---- lightweight header (own banner landmark, kept outside <main>) ---- */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a
            href="/"
            className="inline-flex min-h-11 items-center font-serif text-xl font-bold tracking-tight text-text-primary"
          >
            SC
          </a>
          <a
            href={MAILTO}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-5 py-2.5 text-sm font-semibold text-accent-light transition-colors hover:bg-accent/10"
          >
            Get a free mockup
          </a>
        </nav>
      </header>

      <main>
      {/* ---- hero ---- */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="float-shape-1 absolute right-[8%] top-[18%] h-72 w-72 rounded-full bg-accent/[0.06] blur-3xl" />
          <div className="float-shape-2 absolute bottom-[15%] left-[6%] h-96 w-96 rounded-full bg-accent/[0.04] blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.08] px-4 py-1.5 text-sm font-medium text-accent-light">
                <span className="relative flex h-2 w-2">
                  <span
                    aria-hidden
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"
                  />
                  <span
                    aria-hidden
                    className="relative inline-flex h-2 w-2 rounded-full bg-accent"
                  />
                </span>
                Taking on new local projects
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl lg:text-6xl"
            >
              A website that turns searches into{" "}
              <span className="italic text-accent">phone calls</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="max-w-lg text-lg leading-relaxed text-text-secondary"
            >
              I build fast, modern websites for local businesses. The kind that
              load instantly, look right on a phone, and make it dead simple for
              a new customer to call you. Send me what you have, and I&apos;ll
              show you what yours could look like, free.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <a
                href={MAILTO}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-obsidian transition-colors hover:bg-accent-light"
              >
                Get a free mockup
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#what-you-get"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-semibold text-accent-light transition-colors hover:bg-accent/10"
              >
                See what you get
              </a>
            </motion.div>
          </motion.div>

          <div className="hidden md:block">
            <PhonePreview />
          </div>
        </div>
      </section>

      {/* ---- the problem (prose, no cards) ---- */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <InView variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              The problem
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Your next customer is looking you up right now.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-text-secondary">
              <p>
                When someone needs a plumber, an electrician, or a haircut, they
                pull out their phone and search. If you have no website, they
                land on a competitor. If your site is slow or broken on mobile,
                they leave before they ever see your number.
              </p>
              <p>
                It isn&apos;t about looking fancy. It&apos;s about being the
                business that&apos;s easy to find, easy to trust, and{" "}
                <span className="italic text-accent">one tap to call</span>.
                That&apos;s the whole job, and it&apos;s the job most local
                sites quietly fail at.
              </p>
            </div>
          </InView>
        </div>
      </section>

      {/* ---- what you get (feature list, not identical cards) ---- */}
      <section
        id="what-you-get"
        className="border-t border-border py-24 md:py-32"
      >
        <div className="mx-auto max-w-6xl px-6">
          <InView variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              What you get
            </span>
            <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-4xl">
              A site that does one thing well: bring in business.
            </h2>
          </InView>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {features.map((f, i) => (
              <InView key={f.title} variant="slide-up" delay={i * 0.06}>
                <div className="flex gap-4">
                  <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <f.icon size={20} aria-hidden />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl leading-snug text-text-primary">
                      {f.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-text-secondary">
                      {f.body}
                    </p>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* ---- process (numbered rows) ---- */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <InView variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              How it works
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Four steps, no runaround.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-secondary">
              You never pay to find out if it&apos;s worth it. The mockup comes
              first, and you only commit once you&apos;ve seen it.
            </p>
          </InView>

          <ol className="mt-14 divide-y divide-border">
            {steps.map((step, i) => (
              <InView key={step.number} variant="slide-up" delay={i * 0.06}>
                <li className="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 py-9 md:grid-cols-[5rem_1fr_2fr] md:gap-x-10 md:py-11">
                  <span className="self-start font-mono text-sm tracking-widest text-accent">
                    {step.number}
                  </span>
                  <h3 className="font-serif text-2xl leading-tight md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="col-span-2 max-w-prose leading-relaxed text-text-secondary md:col-span-1">
                    {step.body}
                  </p>
                </li>
              </InView>
            ))}
          </ol>
        </div>
      </section>

      {/* ---- credibility (short, links out to the full portfolio) ---- */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <InView variant="scale">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Who builds it
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              Me. Directly.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              I&apos;m Spencer Curnow, a developer and designer who ships real
              products: live iOS apps on the App Store and design work for
              independent brands. You work with the person building your site,
              not an agency middleman. That&apos;s why it&apos;s fast, and why I
              actually care that it works.
            </p>
            <a
              href="/"
              className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-accent/50 px-7 py-3 text-sm font-semibold text-accent-light transition-colors hover:bg-accent/10"
            >
              See my full portfolio
              <ArrowRight size={16} aria-hidden />
            </a>
          </InView>
        </div>
      </section>

      {/* ---- FAQ (definition list) ---- */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <InView variant="slide-up">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Questions
            </span>
            <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
              The stuff people usually ask.
            </h2>
          </InView>

          <dl className="mt-12 divide-y divide-border">
            {faqs.map((item, i) => (
              <InView key={item.q} variant="slide-up" delay={i * 0.05}>
                <div className="py-8">
                  <dt className="font-serif text-xl leading-snug text-text-primary">
                    {item.q}
                  </dt>
                  <dd className="mt-3 leading-relaxed text-text-secondary">
                    {item.a}
                  </dd>
                </div>
              </InView>
            ))}
          </dl>
        </div>
      </section>

      {/* ---- final CTA ---- */}
      <section className="border-t border-border py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <InView variant="scale">
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Let&apos;s see what yours could{" "}
              <span className="italic text-accent">look like</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-secondary">
              Free mockup, no obligation. Tell me your business name and what you
              do, and I&apos;ll build a preview you can actually look at.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={MAILTO}
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-obsidian transition-colors hover:bg-accent-light"
              >
                Get a free mockup
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted">
              <li className="inline-flex items-center gap-1.5">
                <Check size={15} aria-hidden className="text-accent" />
                Free to start
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check size={15} aria-hidden className="text-accent" />
                Live in about a week
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Check size={15} aria-hidden className="text-accent" />
                One clear price
              </li>
            </ul>
          </InView>
        </div>
      </section>
      </main>
    </>
  );
}
