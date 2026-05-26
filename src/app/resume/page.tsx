"use client";

import { Mail, Phone, MapPin, Globe, Linkedin, Github, Printer, ArrowLeft } from "lucide-react";
import Link from "next/link";

const shippedProducts = [
  {
    name: "LinkUp Golf",
    role: "Founder · Solo builder",
    period: "Jan 2026 – Present",
    summary:
      "Cross-platform social network for golfers. Tee-time marketplace, GPS scorecard with USGA handicap, group standings, trip planner with cost splitter, social feed with live mid-round updates. Designed with a 60+ accessibility floor.",
    stack: "React Native · Expo SDK 55 · TypeScript · Supabase · Postgres · Realtime · Edge Functions",
    url: "linkupgolf.org",
    notes: "Live on iOS App Store since April 2026. Web app at linkupgolf.org.",
  },
  {
    name: "SoundSauce",
    role: "Founder · Solo builder",
    period: "2025",
    summary:
      "Social audio analysis platform for producers and sound engineers. Client-side FFT and DSP in Web Workers for instant breakdowns (BPM, key, ADSR, tone). Downloadable Vital presets, Ableton recipes, AI stem separation, full social layer.",
    stack: "React 19 · Vite · Supabase · Stripe · Web Audio API",
    url: "soundsauce.app",
    notes: "Shipped concept to production in three weeks.",
  },
  {
    name: "LeadHawk",
    role: "Founder · Solo builder",
    period: "2025",
    summary:
      "Automated lead-sourcing tool scanning six platforms (Reddit, HN, Dev.to, Remotive, Jobicy, RemoteOK) every two hours. Trainable keyword-weight model for scoring opportunities. Pro tier adds instant alerts, budget parsing, CSV export.",
    stack: "Cloudflare Workers · D1 · Stripe · Resend",
    url: "leadhawk.org",
  },
  {
    name: "Job Scout",
    role: "Personal automation",
    period: "2025",
    summary:
      "Daily job-search agent. Pulls listings from JSearch and Remotive, runs two-pass scoring (keyword filter, then Gemini fit analysis with resume matching and cover-letter talking points), delivers curated HTML digest each morning.",
    stack: "Node.js · Gemini AI · Supabase · Resend",
  },
];

const experience = [
  {
    title: "Lead Physical Therapy Aide",
    company: "Prevail Physical Therapy",
    location: "Shoreline, WA",
    period: "Oct 2024 – Present",
    bullets: [
      "Primary point of contact for therapists, triaging requests and coordinating daily operations and scheduling for 11 providers.",
      "Liaison between clinical and administrative teams, resolving operational bottlenecks in a fast-paced outpatient environment.",
      "Manage inventory forecasting and supply tracking to ensure uninterrupted service delivery.",
    ],
  },
  {
    title: "Physical Therapy Aide",
    company: "Therapeutic Associates Inc.",
    location: "Seattle / Spokane, WA",
    period: "Jul 2024 – Sep 2024",
    bullets: [
      "Executed 30+ weekly outbound touchpoints by phone and email to manage account lifecycles and reduce churn.",
      "Processed 60+ weekly referrals through Athena Health CRM with 100% data integrity.",
      "Interpreted and communicated insurance and scheduling information to patients and referring partners.",
    ],
  },
  {
    title: "Intramural Sports Program Manager",
    company: "Boise State University",
    location: "Boise, ID",
    period: "Aug 2022 – May 2024",
    bullets: [
      "Drove 92% year-over-year retention across a 1,900+ participant base via season-long engagement strategy, proactive touch-points, and incentive programs.",
      "Recruited, hired, trained, and managed a 29-person staff, running weekly skill-building sessions and individual career growth meetings.",
      "Administered the IMLeagues SaaS platform across 1,000+ annual events, using BI reporting to surface friction points and inform retention decisions.",
      "Analyzed Qualtrics feedback data to identify retention risks; targeted interventions lifted CSAT scores by 15%.",
      "Partnered cross-functionally with Marketing, Facilities, and University Recreation leadership on event communications and member experiences.",
    ],
  },
];

const capabilities = [
  {
    category: "Build",
    items: ["Full-stack web apps", "iOS / cross-platform mobile", "Internal tools and dashboards", "AI workflows and integrations", "MVPs and rapid prototypes"],
  },
  {
    category: "Stack",
    items: ["React / React Native / Next.js", "Node / Cloudflare Workers", "Supabase / Postgres / D1", "Stripe / Resend / Sentry", "Claude / Gemini / OpenAI APIs"],
  },
  {
    category: "Adjacent",
    items: ["Product thinking", "User research", "CRM / SaaS administration", "Cross-functional collaboration", "Customer retention strategy"],
  },
];

export default function ResumePage() {
  return (
    <div className="resume-page min-h-screen bg-obsidian text-text-primary print:bg-white print:text-black">
      {/* Action bar (hidden in print) */}
      <div className="print:hidden sticky top-0 z-10 border-b border-border bg-obsidian/95 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            <ArrowLeft size={16} />
            Back to site
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-obsidian hover:bg-accent-light transition-colors"
          >
            <Printer size={14} />
            Print / Save PDF
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl px-6 md:px-10 py-10 md:py-16 print:py-0 print:px-0 print:max-w-none">
        {/* Header */}
        <header className="border-b border-border pb-6 print:border-black/20">
          <h1 className="font-serif text-4xl md:text-5xl leading-none print:text-3xl">Spencer Curnow</h1>
          <p className="mt-2 text-lg italic text-accent print:text-black print:not-italic print:font-semibold">
            Solo builder. Available for project work.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary print:text-black/80">
            <li className="inline-flex items-center gap-1.5"><MapPin size={13} aria-hidden /> Bellevue, WA</li>
            <li className="inline-flex items-center gap-1.5"><Mail size={13} aria-hidden /> scurnow24@gmail.com</li>
            <li className="inline-flex items-center gap-1.5"><Phone size={13} aria-hidden /> (509) 939-9772</li>
            <li className="inline-flex items-center gap-1.5"><Globe size={13} aria-hidden /> spencercurnow.com</li>
            <li className="inline-flex items-center gap-1.5"><Linkedin size={13} aria-hidden /> linkedin.com/in/spencercurnow</li>
            <li className="inline-flex items-center gap-1.5"><Github size={13} aria-hidden /> github.com/Schmenkie</li>
          </ul>
        </header>

        {/* Summary */}
        <section className="mt-8 print:mt-5">
          <p className="text-base md:text-lg leading-relaxed text-text-secondary print:text-black">
            Self-taught full-stack developer with a psychology degree and four shipped products,
            including a cross-platform iOS app live on the App Store. I take a vision and ship it,
            using AI-augmented development to compress weeks of work into days. Four years of
            customer-facing operations experience under the builder layer: 92% YoY retention across
            1,900+ users at Boise State, 29-person team leadership, clinical operations at two
            outpatient PT clinics.
          </p>
        </section>

        {/* Shipped products */}
        <section className="mt-10 print:mt-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent print:text-black">
            Shipped Products
          </h2>
          <div className="mt-5 space-y-6">
            {shippedProducts.map((p) => (
              <article key={p.name} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-x-8 gap-y-1 print:grid-cols-[1fr_3fr]">
                <div>
                  <h3 className="font-serif text-xl leading-tight print:text-lg">{p.name}</h3>
                  <p className="mt-0.5 text-sm text-text-muted print:text-black/70">{p.role}</p>
                  <p className="text-xs font-mono text-text-muted print:text-black/70">{p.period}</p>
                  {p.url && (
                    <p className="mt-1 text-xs font-mono text-accent print:text-black">{p.url}</p>
                  )}
                </div>
                <div className="text-sm leading-relaxed text-text-secondary print:text-black">
                  <p>{p.summary}</p>
                  {p.notes && <p className="mt-1.5 italic">{p.notes}</p>}
                  <p className="mt-2 font-mono text-xs text-text-muted print:text-black/70">{p.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mt-10 print:mt-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent print:text-black">
            What I Can Build
          </h2>
          <dl className="mt-5 space-y-3">
            {capabilities.map((c) => (
              <div key={c.category} className="grid grid-cols-[8rem_1fr] gap-x-6 items-baseline">
                <dt className="font-mono text-xs uppercase tracking-widest text-text-muted print:text-black/70">
                  {c.category}
                </dt>
                <dd className="text-sm text-text-secondary print:text-black">
                  {c.items.join(" · ")}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Experience */}
        <section className="mt-10 print:mt-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent print:text-black">
            Operations Experience
          </h2>
          <div className="mt-5 space-y-6">
            {experience.map((e) => (
              <article key={e.title + e.company} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-x-8 gap-y-1 print:grid-cols-[1fr_3fr]">
                <div>
                  <h3 className="font-serif text-lg leading-tight print:text-base">{e.title}</h3>
                  <p className="text-sm text-text-muted print:text-black/70">{e.company}</p>
                  <p className="text-xs text-text-muted print:text-black/70">{e.location}</p>
                  <p className="text-xs font-mono text-text-muted print:text-black/70">{e.period}</p>
                </div>
                <ul className="space-y-1.5 text-sm leading-relaxed text-text-secondary print:text-black">
                  {e.bullets.map((b, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-2">
                      <span className="text-accent print:text-black/60" aria-hidden>·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-10 print:mt-6">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent print:text-black">
            Education
          </h2>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-x-8 print:grid-cols-[1fr_3fr]">
            <div>
              <h3 className="font-serif text-lg leading-tight print:text-base">Boise State University</h3>
              <p className="text-xs font-mono text-text-muted print:text-black/70">May 2024</p>
            </div>
            <div className="text-sm text-text-secondary print:text-black">
              Bachelor of Science in Psychology · Music Production Certificate
            </div>
          </div>
        </section>
      </article>

      <style jsx global>{`
        @media print {
          @page {
            size: letter;
            margin: 0.5in;
          }
          html, body {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  );
}
