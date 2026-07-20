import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Server-safe navigation chrome shared by every /work/[slug] case study.

const CASES = [
  { slug: "sleeve", title: "Sleeve", meta: "Social app for music fans" },
  { slug: "yurr", title: "Yurr Magazine", meta: "Editorial design + tooling" },
  { slug: "dogleg", title: "Dogleg", meta: "GPS golf caddie" },
  { slug: "soundsauce", title: "SoundSauce", meta: "Audio-to-preset SaaS" },
];

export function CaseTopBar() {
  return (
    <div className="pt-28 md:pt-32">
      <div className="mx-auto max-w-6xl px-6">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-text-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} aria-hidden />
          All work
        </Link>
      </div>
    </div>
  );
}

export function CaseNextUp({ current }: { current: string }) {
  const others = CASES.filter((c) => c.slug !== current);
  return (
    <section className="py-20 md:py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">
          Keep reading
        </span>
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/work/${c.slug}`}
                className="group flex items-center justify-between gap-6 py-5"
              >
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-serif text-xl md:text-2xl group-hover:text-accent-light transition-colors">
                    {c.title}
                  </span>
                  <span className="text-sm text-text-muted">{c.meta}</span>
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="shrink-0 text-accent transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
