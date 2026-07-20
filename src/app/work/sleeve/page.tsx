import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FeaturedSleeve } from "@/components/featured-sleeve";
import { CaseTopBar, CaseNextUp } from "@/components/case-nav";
import { Footer } from "@/components/footer";
import { InView } from "@/components/ui/in-view";

export const metadata: Metadata = {
  title: "Sleeve · Case Study · Spencer Curnow",
  description:
    "How I built Sleeve, a social app for music fans: Apple Music import, on-device color extraction, taste-twin matching, and a once-a-day Spin ritual. Live on iOS.",
};

const spins = [
  {
    number: "01",
    title: "One spin a day, for everyone.",
    body: "At the same moment every day, the whole app gets one random album drop. Everyone reacts to the same record, which turns a logging app into a shared ritual.",
  },
  {
    number: "02",
    title: "A viewer built like a turntable.",
    body: "The drop opens as a story: a spinning vinyl animation wrapped in the album's own extracted color, with the composer one tap away.",
  },
  {
    number: "03",
    title: "Reactions that travel.",
    body: "Emoji reactions, likes, and a share-to-story card designed to leave the app, so a spin can pull new listeners back in.",
  },
  {
    number: "04",
    title: "Deeper catalog search.",
    body: "Song-level Apple Music search landed alongside Spins, so logging isn't limited to albums you already know by name.",
  },
];

export default function SleeveCasePage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseTopBar />
        <FeaturedSleeve />

        <section className="py-20 md:py-28 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <InView variant="slide-up">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                Shipped since launch
              </span>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
                Daily Spins: a reason to come back.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
                Logging apps live or die on habit. In the weeks after launch I
                built Spins, a once-a-day ritual in the spirit of BeReal: the
                whole community meets around one album at the same time.
              </p>
            </InView>

            <ol className="mt-14 divide-y divide-border">
              {spins.map((item, i) => (
                <InView key={item.number} variant="slide-up" delay={i * 0.06}>
                  <li className="grid grid-cols-[auto_1fr] md:grid-cols-[5rem_1fr_2fr] gap-x-6 md:gap-x-10 gap-y-3 py-8 md:py-10 items-start">
                    <span className="font-mono text-sm text-accent self-start tracking-widest">
                      {item.number}
                    </span>
                    <h3 className="font-serif text-2xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="col-span-2 md:col-span-1 text-text-secondary leading-relaxed max-w-prose">
                      {item.body}
                    </p>
                  </li>
                </InView>
              ))}
            </ol>
          </div>
        </section>

        <CaseNextUp current="sleeve" />
      </main>
      <Footer />
    </>
  );
}
