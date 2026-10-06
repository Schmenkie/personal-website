"use client";

import { useEffect, useState } from "react";
import { SPIN_HEADERS, SPIN_URL, toSpin, type Spin } from "@/lib/spin";

// Shows the server's answer when it has one. If the server couldn't reach Sleeve
// (e.g. a hiccup while Vercel built the page), the browser asks Sleeve itself.
export function SpinningToday({ initial }: { initial: Spin | null }) {
  const [spin, setSpin] = useState(initial);

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

  if (!spin) return null;
  return (
    <a href={spin.href} className="flex min-h-11 min-w-0 items-center gap-2">
      <span className="muted shrink-0">{spin.isToday ? "spinning today:" : "last spin:"}</span>
      <span className="truncate">
        {spin.title} <span className="muted">—</span> {spin.artist}
      </span>
    </a>
  );
}
