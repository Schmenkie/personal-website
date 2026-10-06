"use client";

import { type Spin } from "@/lib/spin";
import { useSpin, useSpinAudio } from "./use-spin";

// The home page's turntable: today's Sleeve spin on a big record. Play/pause
// from the record itself or the button. Playing: the tonearm swings onto the
// record and the record spins with the album cover as its label. Paused: the
// arm lifts off and the record stops where it is.
const GROOVES = [235, 220, 205, 190, 175, 160, 145, 130];

export function RecordPlayer({ initial }: { initial: Spin | null }) {
  const spin = useSpin(initial);
  const { playing, toggle, canPlay } = useSpinAudio(spin);
  const songLabel = spin ? `${spin.title} by ${spin.artist}` : "today's spin";

  return (
    <section aria-label="Today's spin" className="player flex w-full max-w-[540px] flex-col gap-5" data-playing={playing || undefined}>
      <button
        type="button"
        onClick={toggle}
        disabled={!canPlay}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${songLabel}` : `Play ${songLabel}`}
        className="block w-full cursor-pointer bg-transparent p-0 disabled:cursor-default"
      >
        <svg viewBox="0 0 540 520" className="block h-auto w-full" aria-hidden="true">
          <defs>
            <clipPath id="player-label">
              <circle cx="250" cy="260" r="90" />
            </clipPath>
          </defs>
          <g className="disc">
            <circle cx="250" cy="260" r="250" fill="#141414" />
            {GROOVES.map((r, i) => (
              <circle key={r} cx="250" cy="260" r={r} fill="none" stroke={i % 2 ? "#262626" : "#202020"} strokeWidth="1.2" />
            ))}
            <path d="M250 25 A235 235 0 0 1 455 145" fill="none" stroke="#3a3a3a" strokeWidth="3" opacity="0.6" />
            <circle cx="250" cy="260" r="90" fill="#7A2FF2" />
            {spin?.coverUrl && (
              <image
                href={spin.coverUrl.replace("/120x120bb.jpg", "/400x400bb.jpg")}
                x="160"
                y="170"
                width="180"
                height="180"
                clipPath="url(#player-label)"
                preserveAspectRatio="xMidYMid slice"
              />
            )}
            <circle cx="250" cy="260" r="6" fill="#FBFBF9" />
          </g>
          <g className="arm">
            <circle cx="510" cy="36" r="15" fill="#E4E4DF" stroke="#CFCFC9" />
            <circle cx="510" cy="36" r="5" fill="#6B6B66" />
            <path d="M510 36 L530 225 L515 340" fill="none" stroke="#3A3A38" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="502" y="334" width="26" height="16" rx="2" fill="#111111" />
          </g>
        </svg>
      </button>

      {spin && (
        <div className="flex items-center justify-between gap-4 sm:mr-10">
          <div className="flex min-w-0 flex-col">
            <span className="muted">{playing ? "now playing" : spin.isToday ? "today's spin" : "last spin"}</span>
            <span className="truncate text-[22px] leading-7 font-medium">{spin.title}</span>
            <span className="truncate">
              {spin.artist}
              <a href={spin.href} className="muted ml-2">
                on Sleeve ↗
              </a>
            </span>
          </div>
          {canPlay && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={playing}
              aria-label={playing ? `Pause ${songLabel}` : `Play 30 seconds of ${songLabel}`}
              className="min-h-11 shrink-0 cursor-pointer bg-[#7A2FF2] px-[18px] text-[#FBFBF9] hover:bg-[#5B17CF]"
            >
              {playing ? "Pause" : "Play 30s"}
            </button>
          )}
        </div>
      )}
    </section>
  );
}
