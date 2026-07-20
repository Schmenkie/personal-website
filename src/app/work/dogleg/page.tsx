import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { FeaturedProject } from "@/components/featured-project";
import { CaseTopBar, CaseNextUp } from "@/components/case-nav";
import { Footer } from "@/components/footer";
import { InView } from "@/components/ui/in-view";

export const metadata: Metadata = {
  title: "Dogleg · Case Study · Spencer Curnow",
  description:
    "How I built Dogleg, a solo GPS golf caddie for iOS: tap-to-score, satellite hole maps, plays-like distances with wind and elevation, and USGA handicaps.",
};

const caddie = [
  {
    term: "Satellite hole maps",
    detail:
      "Every hole rendered from satellite imagery with drag-to-measure: touch any point on the fairway and get the carry to it.",
  },
  {
    term: "Plays-like distances",
    detail:
      "Raw GPS yardage adjusted for wind and elevation on-device, so 150 out that plays 162 says 162.",
  },
  {
    term: "A real caddie book",
    detail:
      "Per-hole notes and club history that surface the next time you stand on the same tee.",
  },
  {
    term: "Multi-tee support",
    detail:
      "Every rated tee box with its own slope and rating, feeding the handicap math correctly.",
  },
  {
    term: "USGA handicap, properly",
    detail:
      "Full World Handicap System calculation, including 9-hole rounds and a GHIN-style reference card.",
  },
  {
    term: "Shareable round cards",
    detail:
      "A designed scorecard poster generated after every round, made for the group chat.",
  },
];

export default function DoglegCasePage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseTopBar />
        <FeaturedProject />

        <section className="py-20 md:py-28 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
              <InView variant="slide-up">
                <div className="lg:sticky lg:top-28">
                  <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                    The details
                  </span>
                  <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
                    Built like a caddie thinks.
                  </h2>
                  <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                    Dogleg isn&apos;t monetized and isn&apos;t chasing growth.
                    It&apos;s a craft project that happens to live on the App
                    Store, which means every feature exists because it makes a
                    round better, not because a metric asked for it.
                  </p>
                </div>
              </InView>

              <dl className="divide-y divide-border">
                {caddie.map((item, i) => (
                  <InView key={item.term} variant="slide-up" delay={i * 0.05}>
                    <div className="grid sm:grid-cols-[14rem_1fr] gap-x-8 gap-y-1 py-6">
                      <dt className="font-serif text-xl text-text-primary">
                        {item.term}
                      </dt>
                      <dd className="text-text-secondary leading-relaxed">
                        {item.detail}
                      </dd>
                    </div>
                  </InView>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <CaseNextUp current="dogleg" />
      </main>
      <Footer />
    </>
  );
}
