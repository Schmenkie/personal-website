import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";
import { PROJECTS, getProject } from "@/lib/work";

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.name} · Spencer Curnow`, description: p.oneLine } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const i = PROJECTS.indexOf(p);
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader />

      <main className="mt-10 flex flex-col gap-10">
        <section className="flex max-w-[460px] flex-col gap-2.5">
          <h1>{p.name}</h1>
          {p.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
          {p.links.length > 0 && (
            <div className="mt-2.5 flex flex-col items-start">
              {p.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </section>

        {p.shots.length > 0 && (
          <section aria-label={`${p.name} images`} className="flex flex-wrap gap-6">
            {p.shots.map((s) => (
              <figure key={s.id} id={s.id} className="m-0 flex w-[300px] max-w-full scroll-mt-6 flex-col gap-1.5">
                <div className="flex justify-between gap-4">
                  <span>{s.file}</span>
                  <span className="muted">{p.platform}</span>
                </div>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="300px"
                  className="h-auto w-full bg-[#EDEDEA] outline outline-1 -outline-offset-1 outline-black/10"
                />
                <figcaption className="muted text-right">{s.caption}</figcaption>
              </figure>
            ))}
          </section>
        )}

        <nav aria-label="Projects" className="muted flex max-w-[460px] justify-between gap-4">
          <Link href="/work" className="muted flex min-h-11 items-center">
            ← all work
          </Link>
          <Link href={`/work/${next.slug}`} className="muted flex min-h-11 items-center">
            next: {next.name} →
          </Link>
        </nav>
      </main>

      <div className="flex-1" />
      <SiteFooter />
    </div>
  );
}
