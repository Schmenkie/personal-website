"use client";

import Link from "next/link";
import { type Spin } from "@/lib/spin";
import { LINKS } from "./links";
import { useSpin, useSpinAudio } from "./use-spin";
import { VinylMark } from "./vinyl-mark";

// Site header. Left: name (home) + Work, Resume, Email.
// Right (inner pages only; home has the big record): the small purple record
// plays today's Sleeve spin, with the song named beside it.
export function SpinHeader({ initial, home }: { initial: Spin | null; home: boolean }) {
  const spin = useSpin(initial);
  const { playing, toggle, canPlay } = useSpinAudio(home ? null : spin);
  const songLabel = spin ? `${spin.title} by ${spin.artist}` : "";

  return (
    <header className="flex items-center justify-between gap-4">
      <nav aria-label="Main" className="flex min-w-0 flex-wrap items-center gap-x-5">
        <Link href="/" className="flex min-h-11 items-center">
          Spencer Curnow
        </Link>
        {LINKS.filter((l) => l.nav).map((l) => (
          <a key={l.label} href={l.href} className="muted flex min-h-11 items-center hover:!text-[#7A2FF2]">
            {l.label}
          </a>
        ))}
      </nav>

      {!home && spin && (
        <div className="flex min-w-0 items-center gap-2">
          {canPlay && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={playing}
              aria-label={playing ? `Pause ${songLabel}` : `Play today's spin: ${songLabel}`}
              title={playing ? "Pause" : "Play today's spin"}
              className="record flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center bg-transparent p-0"
              data-playing={playing || undefined}
            >
              <VinylMark cover={playing ? spin.coverUrl : null} />
            </button>
          )}
          <a href={spin.href} className="hidden min-h-11 min-w-0 items-center gap-2 sm:flex">
            <span className="muted shrink-0">
              {playing ? "now playing:" : spin.isToday ? "spinning today:" : "last spin:"}
            </span>
            <span className="truncate">
              {spin.title} <span className="muted">—</span> {spin.artist}
            </span>
          </a>
        </div>
      )}
    </header>
  );
}
