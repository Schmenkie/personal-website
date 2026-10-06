import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";
import { PrintButton } from "@/components/minimal/print-button";

export const revalidate = 600;
export const metadata: Metadata = {
  title: "Resume · Spencer Curnow",
  description: "Resume of Spencer Curnow: shipped products, operations experience, education.",
};

// This page is the canonical resume. Edit work history here, not in a PDF.

const shippedProducts = [
  {
    name: "Sleeve",
    role: "Founder · Solo builder",
    period: "May 2026 – Present",
    summary:
      "Social app for music fans. Log what you listen to, rate it ½ to 5 stars, write reviews, and find the people whose taste tracks yours. Signature touch: on-device dominant-color extraction wraps every album page in its own color. Apple Music import, taste-twin matching, lists, and a vinyl discovery feed.",
    stack: "React Native · Expo SDK 55 · TypeScript · Supabase",
    url: "getsleeve.app",
    notes: "Live on the iOS App Store since June 2026. 350+ users across 20+ countries, 2,750+ albums logged, rated 5.0★.",
  },
  {
    name: "Yurr Magazine",
    role: "Designer · Client work",
    period: "2026",
    summary:
      "Art direction and design for an independent magazine published as Instagram carousels: cover, seven Q&A spreads, a callout for each answer, and a closing grid per issue. Built the Python rendering toolkit that builds a 16-slide issue from one config file.",
    stack: "Python · Pillow · Playwright",
    url: "spencercurnow.com/work/yurr",
    notes: "Eight issues shipped in Vol. 02.",
  },
  {
    name: "Schmenk Golf",
    role: "Founder · Solo builder",
    period: "Jan 2026 – Present",
    summary:
      "A golf round tracker built end to end. Tap-to-score scorecard, GPS distance to the green (wind and elevation adjusted), satellite hole maps, USGA-accurate handicap that recalcs every round, shareable round cards, and a feed of your crew's rounds. Designed with a 60+ accessibility floor.",
    stack: "React Native · Expo SDK 55 · TypeScript · Supabase · Postgres · Realtime · Apple Maps",
    url: "spencercurnow.com/work/schmenk-golf",
    notes: "Shipped to the iOS App Store in April 2026 (launched as LinkUp Golf, rebuilt and renamed Schmenk Golf in 2026).",
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
  { category: "Build", items: ["Full-stack web apps", "iOS / cross-platform mobile", "Internal tools and dashboards", "AI workflows and integrations", "MVPs and rapid prototypes"] },
  { category: "Stack", items: ["React / React Native / Next.js", "Node / Cloudflare Workers", "Supabase / Postgres / D1", "Stripe / Resend / Sentry", "Claude / Gemini / OpenAI APIs"] },
  { category: "Adjacent", items: ["Product thinking", "User research", "CRM / SaaS administration", "Cross-functional collaboration", "Customer retention strategy"] },
];

const row = "grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-[200px_minmax(0,1fr)] print:grid-cols-[170px_minmax(0,1fr)]";

export default function ResumePage() {
  return (
    <div className="minimal resume flex min-h-dvh flex-col px-4 py-3.5 print:p-0">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main className="mt-10 flex max-w-[860px] flex-col gap-10 print:mt-0 print:max-w-none print:gap-5">
        <section className="flex flex-col gap-2.5">
          <h1>Spencer Curnow</h1>
          <ul className="muted flex flex-col print:flex-row print:flex-wrap print:gap-x-4">
            <li>Bellevue, WA</li>
            <li><a href="mailto:scurnow24@gmail.com">scurnow24@gmail.com</a></li>
            <li>(509) 939-9772</li>
            <li><a href="https://spencercurnow.com">spencercurnow.com</a></li>
            <li><a href="https://linkedin.com/in/spencercurnow">linkedin.com/in/spencercurnow</a></li>
            <li><a href="https://github.com/Schmenkie">github.com/Schmenkie</a></li>
          </ul>
          <p className="max-w-[640px]">
            Self-taught full-stack developer with a psychology degree and five shipped products, including
            two iOS apps on the App Store. I take a vision and ship it, using AI-augmented development to
            compress weeks of work into days. Four years of customer-facing operations under the builder
            layer: 92% YoY retention across 1,900+ users at Boise State, 29-person team leadership, clinical
            operations at two outpatient PT clinics.
          </p>
          <div className="muted print:hidden">
            <PrintButton />
          </div>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="muted">Shipped products</h2>
          {shippedProducts.map((p) => (
            <article key={p.name} className={`${row} break-inside-avoid`}>
              <div>
                <h3 className="m-0 text-inherit font-normal">{p.name}</h3>
                <p className="muted">{p.role}</p>
                <p className="muted">{p.period}</p>
                {p.url && <p className="muted">{p.url}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <p>{p.summary}</p>
                {p.notes && <p>{p.notes}</p>}
                <p className="muted">{p.stack}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="muted">What I can build</h2>
          <dl className="flex flex-col gap-1.5">
            {capabilities.map((c) => (
              <div key={c.category} className={row}>
                <dt className="muted">{c.category}</dt>
                <dd className="m-0">{c.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-5">
          <h2 className="muted">Operations experience</h2>
          {experience.map((e) => (
            <article key={e.title + e.company} className={`${row} break-inside-avoid`}>
              <div>
                <h3 className="m-0 text-inherit font-normal">{e.title}</h3>
                <p className="muted">{e.company}</p>
                <p className="muted">{e.location}</p>
                <p className="muted">{e.period}</p>
              </div>
              <ul className="flex flex-col gap-1.5">
                {e.bullets.map((b) => (
                  <li key={b} className="grid grid-cols-[1ch_minmax(0,1fr)] gap-2">
                    <span className="muted" aria-hidden>-</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="muted">Education</h2>
          <div className={row}>
            <div>
              <h3 className="m-0 text-inherit font-normal">Boise State University</h3>
              <p className="muted">May 2024</p>
            </div>
            <p>Bachelor of Science in Psychology · Music Production Certificate</p>
          </div>
        </section>

        <nav aria-label="Back" className="print:hidden">
          <Link href="/" className="muted flex min-h-11 items-center">← home</Link>
        </nav>
      </main>

      <div className="flex-1" />
      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
