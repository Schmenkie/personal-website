"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SPIN_HEADERS, SPIN_URL, toSpin, type Spin } from "@/lib/spin";
import { VinylMark } from "./vinyl-mark";

// The header: the purple record plays today's Sleeve spin (a 30s preview) and
// spins while it plays; the label turns into the album cover. Right side names
// the song and links to Spencer's Sleeve profile. If the server couldn't reach
// Sleeve, the browser asks Sleeve itself.
export function SpinHeader({ initial, showName }: { initial: Spin | null; showName: boolean }) {
  const [spin, setSpin] = useState(initial);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initial) return;
    let alive = true;
    fetch(SPIN_URL, { headers: SPIN_HEADERS })
      .then((r) => (r.ok ? r.json() : null))
      .then((rows) => alive && setSpin(toSpin(rows)))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [initial]);

  // Stop the clip if the visitor navigates away.
  useEffect(() => () => audioRef.current?.pause(), []);

  const canPlay = Boolean(spin?.previewUrl);

  function toggle() {
    if (!spin?.previewUrl) return;
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(spin.previewUrl);
      audio.volume = 0.8;
      audio.addEventListener("ended", () => setPlaying(false));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("play", () => setPlaying(true));
      audioRef.current = audio;
    }
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }

  const songLabel = spin ? `${spin.title} by ${spin.artist}` : "";

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2">
        {canPlay ? (
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? `Pause ${songLabel}` : `Play today's spin: ${songLabel}`}
            title={playing ? "Pause" : "Play today's spin"}
            className="record flex h-11 w-11 shrink-0 cursor-pointer items-center bg-transparent p-0"
            data-playing={playing || undefined}
          >
            <VinylMark cover={playing ? spin?.coverUrl ?? null : null} />
          </button>
        ) : (
          <Link href="/" aria-label="Home" className="flex h-11 w-11 shrink-0 items-center">
            <VinylMark />
          </Link>
        )}
        {showName && (
          <Link href="/" className="truncate">
            Spencer Curnow
          </Link>
        )}
      </div>

      {spin && (
        <a href={spin.href} className="flex min-h-11 min-w-0 items-center gap-2">
          <span className="muted shrink-0">
            {playing ? "now playing:" : spin.isToday ? "spinning today:" : "last spin:"}
          </span>
          <span className="truncate">
            {spin.title} <span className="muted">—</span> {spin.artist}
          </span>
        </a>
      )}
    </header>
  );
}
