"use client";

import { useEffect, useRef, useState } from "react";
import { SPIN_HEADERS, SPIN_URL, toSpin, type Spin } from "@/lib/spin";

/** The server's spin shows first (it's cached up to 10 minutes); then the
 *  browser asks Sleeve directly, so a spin posted a minute ago shows right away. */
export function useSpin(initial: Spin | null) {
  const [spin, setSpin] = useState(initial);
  useEffect(() => {
    let alive = true;
    fetch(SPIN_URL, { headers: SPIN_HEADERS, cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((rows) => {
        const fresh = toSpin(rows);
        if (!alive || !fresh) return;
        setSpin((cur) =>
          cur && cur.title === fresh.title && cur.artist === fresh.artist && cur.isToday === fresh.isToday ? cur : fresh,
        );
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [initial]);
  return spin;
}

/** Plays the spin's 30s preview. One Audio element per player; stops on unmount. */
export function useSpinAudio(spin: Spin | null) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => audioRef.current?.pause(), []);

  const canPlay = Boolean(spin?.previewUrl);

  function toggle() {
    if (!spin?.previewUrl) return;
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio(spin.previewUrl);
      audio.volume = 0.8;
      audio.addEventListener("play", () => setPlaying(true));
      audio.addEventListener("pause", () => setPlaying(false));
      audio.addEventListener("ended", () => setPlaying(false));
      audioRef.current = audio;
    }
    if (audio.paused) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }

  return { playing, toggle, canPlay };
}
