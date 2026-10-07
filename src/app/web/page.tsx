import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";

export const revalidate = 600;
export const metadata: Metadata = {
  title: "Websites for Creative Spaces · Spencer Curnow",
  description:
    "Fast, mobile-first websites for studios, shops and local businesses that turn searches into bookings. Free mockup, live in about a week, one clear price.",
  openGraph: {
    title: "Websites for Creative Spaces · Spencer Curnow",
    description: "Fast, mobile-first websites that turn searches into phone calls. Free mockup, no obligation.",
    type: "website",
  },
};

// Front door for the local-services side business (cold outreach links here).
// A mailto that prefills the details needed to scope a job.
const MAILTO =
  "mailto:scurnow24@gmail.com?subject=" +
  encodeURIComponent("Website for my business") +
  "&body=" +
  encodeURIComponent("Business name:\n\nCurrent website (if any):\n\nWhat you're after:\n\nBest number to reach you:\n");

const features = [
  ["Built for phones first", "Most of your customers are searching on their phone. Your site will look right and load fast on every one of them."],
  ["Fast enough to keep them", "Slow sites lose people before the page even loads. Yours will open instantly, so nobody bounces to a competitor."],
  ["One tap to call you", "A big, obvious call button on every screen. The whole point is turning a visitor into a phone call."],
  ["Your reviews up front", "Your best Google reviews, right where new customers see them. Social proof does the selling for you."],
  ["Ready to be found", "Set up so Google understands who you are, what you do, and where you are. Clean, indexable, honest."],
  ["Live in about a week", "No months-long project. Send me what you have, and most sites go live within a week of scoping."],
];

const steps = [
  ["Send me what you've got.", "Your business name, your current site if you have one, and roughly what you want. A text or a two-line email is plenty."],
  ["I make a free mockup.", "I build a real preview of what your new site could look like, at no cost. You see it before you decide anything."],
  ["We scope it in a conversation.", "If you like it, we talk through what you need and I give you one clear price. No packages, no upsells."],
  ["Your site goes live.", "I build it, connect your domain, and put it online. Most sites are live within about a week."],
];

const faqs = [
  ["How much does it cost?", "It depends on what you need, so I quote one number per project once I've seen it. The mockup is free either way, so there's no cost to find out."],
  ["I already have a website. Can you just fix it?", "Usually I rebuild it, which ends up faster and cleaner than patching an old site. If yours is close, I'll tell you honestly that it isn't worth a rebuild."],
  ["Do I need to know anything technical?", "No. You tell me about your business, I handle the domain, hosting, and every technical piece. You just approve how it looks."],
  ["What if I don't have a logo or photos?", "That's fine. I can design around clean type and your Google reviews, and we can add photos whenever you have them."],
];

function Cta() {
  return (
    <a
      href={MAILTO}
      className="cta inline-flex min-h-11 items-center self-start bg-[#111111] px-4"
    >
      Get a free mockup →
    </a>
  );
}

export default function WebServicesPage() {
  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader />

      <main className="mt-10 flex max-w-[640px] flex-col gap-12">
        <section className="flex flex-col gap-2.5">
          <h1>Websites for creative spaces and local businesses</h1>
          <p>
            I build fast, simple websites for studios, shops and local businesses: the kind that load
            instantly, look right on a phone, and make it easy for someone to book you or call you. Send me what you have, and I&apos;ll
            show you what yours could look like, free.
          </p>
          <Cta />
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">The problem</h2>
          <p>
            When someone needs a studio, a tattoo artist, a photographer or a plumber, they pull out
            their phone and search. If you have no website, they land on a competitor. If your site is slow or broken on
            a phone, they leave before they ever see your number.
          </p>
          <p>
            It isn&apos;t about looking fancy. It&apos;s about being the business that&apos;s easy to find,
            easy to trust, and one tap to call. Most local sites quietly fail at exactly that.
          </p>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">What you get</h2>
          <dl className="flex flex-col gap-3">
            {features.map(([t, b]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd className="muted">{b}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">Example</h2>
          <p>
            A one-page site for a recording studio: rates up front, how a session works, and booking
            from any screen. The studio is made up; the site is real. Open it on your phone.
          </p>
          <a href="/web/examples/northbound-sound">Northbound Sound, an example site ↗</a>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">How it works</h2>
          <p>You never pay to find out if it&apos;s worth it. The mockup comes first.</p>
          <ol className="flex flex-col gap-3">
            {steps.map(([t, b], i) => (
              <li key={t} className="grid grid-cols-[3ch_minmax(0,1fr)] gap-x-2">
                <span className="muted">{i + 1}.</span>
                <div>
                  <p>{t}</p>
                  <p className="muted">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">Who builds it</h2>
          <p>
            Me, directly. I&apos;m Spencer Curnow. I design and build real products, including two iOS
            apps and the design work for an independent magazine. You work with the person building your
            site, not an agency middleman.
          </p>
          <Link href="/work">See my work →</Link>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">Questions</h2>
          <dl className="flex flex-col gap-3">
            {faqs.map(([q, a]) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd className="muted">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="flex flex-col gap-2.5">
          <h2 className="muted">Let&apos;s see what yours could look like</h2>
          <p>Free mockup, no obligation. Tell me your business name and what you do.</p>
          <Cta />
        </section>
      </main>

      <div className="min-h-16 flex-1" />
      <SiteFooter />
    </div>
  );
}
