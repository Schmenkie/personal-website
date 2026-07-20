import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Magazine } from "@/components/magazine";
import { CaseTopBar, CaseNextUp } from "@/components/case-nav";
import { Footer } from "@/components/footer";
import { InView } from "@/components/ui/in-view";

export const metadata: Metadata = {
  title: "Yurr Magazine · Case Study · Spencer Curnow",
  description:
    "Art direction and a Python rendering toolkit for Yurr Magazine: sixteen slides per issue, eight issues shipped, one command per drop.",
};

const pipeline = [
  {
    step: "config",
    title: "Every issue is a config file.",
    body: "Subject name, photos, quotes, palette, and outfit callouts live in one structured file. The design system does the rest, so issue nine starts where issue one left off.",
  },
  {
    step: "typeset",
    title: "A typographic system, not a template.",
    body: "Headline scales, quote treatments, and caption grids are code. Consistency across eight issues without a single copy-pasted layer.",
  },
  {
    step: "composite",
    title: "Shadow and glow, composited.",
    body: "Pillow handles the cutout shadows, glows, and texture passes that make each subject sit inside the page instead of floating on it.",
  },
  {
    step: "export",
    title: "One command, sixteen slides.",
    body: "A full drop renders in a single build: cover, seven Q&A spreads, outfit callouts, closing grid. Revisions are a re-run, not a redo.",
  },
];

export default function YurrCasePage() {
  return (
    <>
      <Navbar />
      <main>
        <CaseTopBar />
        <Magazine />

        <section className="py-20 md:py-28 border-t border-border">
          <div className="mx-auto max-w-6xl px-6">
            <InView variant="slide-up">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent">
                The toolkit
              </span>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl leading-tight">
                Design that compiles.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed">
                The interesting part isn&apos;t any single slide, it&apos;s the
                system. Publishing a magazine on a creator&apos;s schedule meant
                building the pipeline that renders it, in Python and Pillow.
              </p>
            </InView>

            <div className="mt-14 grid gap-y-12 gap-x-10 sm:grid-cols-2">
              {pipeline.map((item, i) => (
                <InView key={item.step} variant="slide-up" delay={i * 0.07}>
                  <div className="max-w-prose">
                    <span className="font-mono text-xs uppercase tracking-widest text-accent">
                      {String(i + 1).padStart(2, "0")} / {item.step}
                    </span>
                    <h3 className="mt-3 font-serif text-2xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-text-secondary leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </section>

        <CaseNextUp current="yurr" />
      </main>
      <Footer />
    </>
  );
}
