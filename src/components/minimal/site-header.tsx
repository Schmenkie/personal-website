import Link from "next/link";
import { getLatestSpin } from "@/lib/spin";
import { SpinningToday } from "./spinning-today";
import { VinylMark } from "./vinyl-mark";

export async function SiteHeader() {
  const spin = await getLatestSpin();
  return (
    <header className="flex items-center justify-between gap-4">
      <Link href="/" aria-label="Home" className="flex h-11 w-11 shrink-0 items-center">
        <VinylMark />
      </Link>
      <SpinningToday initial={spin} />
    </header>
  );
}
