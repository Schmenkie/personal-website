import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";
import { LINKS, ONE_LINE } from "@/components/minimal/links";
import { PROJECTS } from "@/lib/work";

export const revalidate = 600; // refresh "spinning today" every 10 minutes

export default function Home() {
  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader showName={false} />

      <main className="mt-10 flex flex-col gap-2.5">
        <h1>Spencer Curnow</h1>
        <p>{ONE_LINE}</p>
        <nav aria-label="Links" className="flex flex-col items-start">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href}>
              {l.label}
            </a>
          ))}
          <Link href="/work">All work</Link>
        </nav>
      </main>

      <div className="min-h-24 flex-1" />

      <section
        aria-label="Work"
        className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:gap-x-4 sm:gap-y-2 sm:overflow-visible sm:px-0 sm:pb-0"
      >
        {PROJECTS.filter((p) => p.shots.length > 0).map((p) => (
          <div key={p.slug} role="group" aria-label={p.name} className="flex shrink-0 gap-1">
            {p.shots.map((s) => (
              <Link key={s.id} href={`/work/${p.slug}#${s.id}`} className="thumb block shrink-0" title={`${p.name}, ${s.caption}`}>
                <Image
                  src={s.src}
                  alt={`${p.name}: ${s.alt}`}
                  width={104}
                  height={144}
                  sizes="(min-width: 640px) 52px, 64px"
                  className="h-[88px] w-16 object-cover object-top sm:h-[72px] sm:w-[52px]"
                />
              </Link>
            ))}
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
