"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GridItem, Slide } from "@/lib/work";

// /work: every image from every project in one masonry grid, each at its true
// shape. Clicking one opens it large with that project's story beside it;
// arrow keys (or the buttons) move through the grid, and through a set's
// slides first when the image is a set (a Yurr issue). The open image is in
// the URL hash (#sleeve/album) so it can be linked to.
//
// With `groups` it lays out as a newsstand instead (Yurr's archive): even rows
// of covers under a volume heading, each with its issue line and tagline, and
// the lightbox reads one issue after another.

type Open = { item: number; slide: number };

export function WorkGrid({
  items: flat,
  groups,
  rack = false,
}: {
  items?: GridItem[];
  groups?: { vol: string; items: GridItem[] }[];
  rack?: boolean; // even rows of 4:5 tiles with a line under each, instead of masonry
}) {
  const items = useMemo(
    () => flat ?? groups?.flatMap((g) => g.items) ?? [],
    [flat, groups],
  );
  const [open, setOpen] = useState<Open | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const framesOf = useCallback(
    (i: number) => {
      const s = items[i].shot;
      return (
        s.slides ?? [
          { src: s.src, alt: s.alt, width: s.width, height: s.height },
        ]
      );
    },
    [items],
  );

  const close = useCallback(() => {
    setOpen((o) => {
      if (o) requestAnimationFrame(() => tiles.current[o.item]?.focus());
      return null;
    });
    history.replaceState(null, "", location.pathname);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((o) => {
        if (!o) return o;
        const n = framesOf(o.item).length;
        // An issue starts at its cover: there's no going back from it.
        if (dir === -1 && n > 1 && o.slide === 0) return o;
        if (dir === 1 && o.slide < n - 1)
          return { item: o.item, slide: o.slide + 1 };
        if (dir === -1 && o.slide > 0)
          return { item: o.item, slide: o.slide - 1 };
        return { item: (o.item + dir + items.length) % items.length, slide: 0 };
      });
    },
    [framesOf, items.length],
  );

  // Open from the hash (#sleeve/album), on load and when a link changes it.
  useEffect(() => {
    const fromHash = () => {
      const key = decodeURIComponent(location.hash.slice(1));
      const i = items.findIndex((it) => it.key === key);
      if (i >= 0) setOpen({ item: i, slide: 0 });
    };
    const t = setTimeout(fromHash, 0);
    window.addEventListener("hashchange", fromHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [items]);

  // Keep the hash in step, lock the page behind, and wire the keys.
  useEffect(() => {
    if (!open) return;
    history.replaceState(null, "", `#${items[open.item].key}`);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, items, close, step]);

  const isOpen = open !== null;
  useEffect(() => {
    if (isOpen) closeBtn.current?.focus();
  }, [isOpen]);

  return (
    <>
      {groups || rack ? (
        (groups ?? [{ vol: "", items }]).map((g) => {
          const offset = items.indexOf(g.items[0]);
          return (
            <section
              key={g.vol || "all"}
              aria-label={g.vol || undefined}
              className="mb-12 flex flex-col gap-3"
            >
              {g.vol && <h2 className="muted">{g.vol}</h2>}
              <ul className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 ${groups ? "max-w-[1200px]" : "lg:grid-cols-4"}`}>
                {g.items.map((it, j) => {
                  const i = offset + j;
                  return (
                    <li key={it.key}>
                      {it.shot.href ? (
                        <Link
                          href={it.shot.href}
                          className="tile rack-tile group block"
                        >
                          <RackFace it={it} />
                        </Link>
                      ) : (
                        <button
                          ref={(el) => {
                            tiles.current[i] = el;
                          }}
                          type="button"
                          onClick={() => setOpen({ item: i, slide: 0 })}
                          aria-label={`Open ${it.shot.caption}`}
                          className="tile rack-tile group block w-full cursor-zoom-in bg-transparent p-0 text-left"
                        >
                          <RackFace it={it} />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })
      ) : (
        <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-5">
          {items.map((it, i) => (
            <li key={it.key} className="mb-3 break-inside-avoid sm:mb-4">
              {it.shot.href ? (
                <Link href={it.shot.href} className="tile group relative block">
                  <Image
                    src={it.shot.src}
                    alt={it.shot.alt}
                    width={it.shot.width}
                    height={it.shot.height}
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="block h-auto w-full rounded-[3px] bg-[#EDEDEA]"
                  />
                  <span className="tile-label tile-label-on">
                    {it.project.name}{" "}
                    <span className="muted">· {it.shot.caption} →</span>
                  </span>
                </Link>
              ) : (
                <button
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setOpen({ item: i, slide: 0 })}
                  aria-label={`${it.project.name}: ${it.shot.caption}`}
                  className="tile group relative block w-full cursor-zoom-in bg-transparent p-0 text-left"
                >
                  <Image
                    src={it.shot.src}
                    alt={it.shot.alt}
                    width={it.shot.width}
                    height={it.shot.height}
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className={`block h-auto w-full bg-[#EDEDEA] ${it.shot.phone ? "rounded-[18px]" : "rounded-[3px]"}`}
                  />
                  <span aria-hidden="true" className="tile-label">
                    {it.project.name}
                    {it.shot.slides && (
                      <span className="muted">
                        {" "}
                        · {it.shot.slides.length} slides
                      </span>
                    )}
                  </span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {open && (
        <Lightbox
          item={items[open.item]}
          frames={framesOf(open.item)}
          slide={open.slide}
          position={`${open.item + 1} / ${items.length}`}
          onClose={close}
          onStep={step}
          closeRef={closeBtn}
        />
      )}
    </>
  );
}

/** A newsstand tile: the image at 4:5 (tall phone screens show their top),
 *  then the name and a line. */
function RackFace({ it }: { it: GridItem }) {
  const { shot } = it;
  const line = shot.tagline ?? shot.line;
  return (
    <>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="(min-width: 1024px) 400px, (min-width: 640px) 33vw, 50vw"
        className="block aspect-[4/5] h-auto w-full rounded-[3px] bg-[#EDEDEA] object-cover object-top"
      />
      <span className="mt-2 flex flex-col">
        <span>{shot.caption}</span>
        {line && <span className="muted">{line}</span>}
      </span>
    </>
  );
}

function Lightbox({
  item,
  frames,
  slide,
  position,
  onClose,
  onStep,
  closeRef,
}: {
  item: GridItem;
  frames: Slide[];
  slide: number;
  position: string;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  closeRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { project, shot } = item;
  const f = frames[slide];
  const story = project.story ?? project.body;
  const touch = useRef<number | null>(null);
  const canBack = !(frames.length > 1 && slide === 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name}: ${shot.caption}`}
      className="minimal fixed inset-0 z-50 flex flex-col overflow-y-auto px-4 py-3.5 lg:overflow-hidden"
    >
      <div className="flex min-h-11 items-center justify-between gap-4">
        <span className="muted">{position}</span>
        <div className="flex items-center gap-1">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="lb-btn"
          >
            Close
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-8 pt-4 pb-6 lg:min-h-0 lg:flex-row lg:gap-14 lg:pb-2">
        <figure
          className="m-0 flex min-h-0 flex-1 flex-col items-center justify-center gap-2"
          onTouchStart={(e) => {
            touch.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            touch.current = null;
            if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1);
          }}
        >
          <div className="flex min-h-0 w-full items-center justify-center gap-0 sm:gap-4">
            {canBack ? (
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label={slide > 0 ? "Previous slide" : "Previous image"}
                className="lb-btn lb-arrow"
              >
                ←
              </button>
            ) : (
              <span aria-hidden="true" className="lb-arrow" />
            )}
            <Image
              key={f.src}
              src={f.src}
              alt={f.alt}
              width={f.width}
              height={f.height}
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
              className={`lb-img block h-auto w-[calc(100%-64px)] sm:w-[calc(100%-120px)] min-w-0 lg:w-auto lg:max-w-[calc(100%-96px)] bg-[#EDEDEA] ${shot.phone ? "rounded-[22px]" : "rounded-[3px]"}`}
            />
            <button
              type="button"
              onClick={() => onStep(1)}
              aria-label={
                slide < frames.length - 1
                  ? "Next slide"
                  : frames.length > 1
                    ? "Next issue"
                    : "Next image"
              }
              className="lb-btn lb-arrow"
            >
              →
            </button>
          </div>
          {frames.length > 1 && (
            <figcaption className="muted">
              {slide + 1} of {frames.length}
            </figcaption>
          )}
        </figure>

        <section className="flex flex-col gap-2.5 lg:w-[360px] lg:shrink-0 lg:justify-center lg:overflow-y-auto">
          <h2>
            {project.name}{" "}
            <span className="muted">
              · {shot.tagline ? shot.meta : project.where}
            </span>
          </h2>
          <p className="muted">{f.caption ?? shot.caption}</p>
          {shot.tagline ? (
            <>
              <p>{shot.tagline}</p>
              {shot.post && (
                <a href={shot.post} className="self-start">
                  See it on Instagram ↗
                </a>
              )}
            </>
          ) : (
            story.map((para) => <p key={para.slice(0, 24)}>{para}</p>)
          )}
          {!shot.tagline && project.links.length > 0 && (
            <div className="mt-1 flex flex-col items-start">
              {project.links.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
