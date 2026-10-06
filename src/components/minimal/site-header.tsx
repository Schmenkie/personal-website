import Link from "next/link";
import { getLatestSpin } from "@/lib/spin";
import { VinylMark } from "./vinyl-mark";

export async function SiteHeader() {
  const spin = await getLatestSpin();
  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" aria-label="Home" className="flex h-11 w-11 shrink-0 items-center">
        <VinylMark />
      </Link>
      {spin && (
        <a href={spin.href} className="flex min-h-11 min-w-0 items-center gap-2">
          <span className="muted shrink-0">{spin.isToday ? "spinning today:" : "last spin:"}</span>
          <span className="truncate">
            {spin.title} <span className="muted">—</span> {spin.artist}
          </span>
        </a>
      )}
    </header>
  );
}
