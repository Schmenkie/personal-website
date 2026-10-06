import Link from "next/link";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";
import { RecordPlayer } from "@/components/minimal/record-player";
import { ONE_LINE } from "@/components/minimal/links";
import { getLatestSpin } from "@/lib/spin";
import { PROJECTS, TOOLS } from "@/lib/work";

export const revalidate = 600; // refresh today's spin every 10 minutes

// Home: the work as a two-sided tracklist on the left, today's Sleeve spin on
// a turntable on the right. On a phone the record comes first.
export default async function Home() {
  const spin = await getLatestSpin();
  const sideA = PROJECTS.map((p, i) => ({ ...p, no: `A${i + 1}` }));
  const sideB = TOOLS.map((t, i) => ({ ...t, no: `B${i + 1}` }));

  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader home />

      <main className="flex flex-1 flex-col items-center gap-12 py-8 lg:flex-row-reverse lg:items-center lg:justify-between lg:gap-14 lg:py-2">
        <RecordPlayer initial={spin} />

        <section aria-label="The work" className="flex w-full max-w-[460px] flex-col gap-8 self-start lg:self-center">
          <div>
            <h1 className="sr-only">Spencer Curnow</h1>
            <p>{ONE_LINE}</p>
          </div>

          <div className="flex flex-col">
            <h2 className="muted mb-1.5">Side A — The work</h2>
            <ul>
              {sideA.map((t) => (
                <li key={t.slug}>
                  <Link href={`/work/${t.slug}`} className="track flex min-h-8 items-baseline gap-2.5">
                    <span className="w-[3ch] shrink-0 text-[#7A2FF2]">{t.no}</span>
                    <span>{t.name}</span>
                    <span aria-hidden className="leader" />
                    <span className="muted">{t.where}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <h2 className="muted mb-1.5">Side B — Private tools</h2>
            <ul>
              {sideB.map((t) => (
                <li key={t.name} className="flex min-h-8 items-baseline gap-2.5" title={t.oneLine}>
                  <span className="muted w-[3ch] shrink-0">{t.no}</span>
                  <span>{t.name}</span>
                  <span aria-hidden className="leader" />
                  <span className="muted">Private</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
