import type { Metadata } from "next";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";
import { LINKS } from "@/components/minimal/links";
import { TOOLS, gridItems } from "@/lib/work";
import { WorkGrid } from "@/components/minimal/work-grid";

export const revalidate = 600;
export const metadata: Metadata = { title: "Work · Spencer Curnow" };

export default function WorkIndex() {
  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader />
      <main className="mt-10 flex flex-col gap-2.5">
        <h1 className="sr-only">Work</h1>
        <WorkGrid items={gridItems()} rack />

        <div className="flex max-w-[760px] flex-col gap-2.5">
          <h2 className="muted mt-8">Tools</h2>
          <ul className="flex flex-col">
            {TOOLS.map((t) => (
              <li
                key={t.name}
                className="grid grid-cols-1 gap-x-4 py-1.5 sm:grid-cols-[160px_minmax(0,1fr)_100px] sm:py-0.5"
              >
                <span>{t.name}</span>
                <span className="muted">{t.oneLine}</span>
                <span className="muted hidden text-right sm:block">
                  Private
                </span>
              </li>
            ))}
          </ul>

          <h2 className="muted mt-8">Elsewhere</h2>
          <nav aria-label="Links" className="flex flex-col items-start">
            {LINKS.filter(
              (l) => l.label !== "Work" && l.label !== "Sleeve",
            ).map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </main>
      <div className="flex-1" />
      <SiteFooter />
    </div>
  );
}
