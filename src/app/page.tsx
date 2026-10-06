import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";
import { LINKS, ONE_LINE } from "@/components/minimal/links";
import { ALL_SHOTS } from "@/lib/work";

export const revalidate = 600; // refresh "spinning today" every 10 minutes

export default function Home() {
  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader />

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

      <section aria-label="Work" className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {ALL_SHOTS.map((s) => (
          <Link key={s.src} href={`/work/${s.slug}#${s.id}`} className="thumb block shrink-0" title={`${s.project}, ${s.caption}`}>
            <Image
              src={s.src}
              alt={`${s.project}: ${s.alt}`}
              width={104}
              height={144}
              sizes="(min-width: 640px) 52px, 64px"
              className="h-[88px] w-16 object-cover object-top sm:h-[72px] sm:w-[52px]"
            />
          </Link>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
