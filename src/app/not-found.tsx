import Link from "next/link";
import { SiteHeader } from "@/components/minimal/site-header";
import { SiteFooter } from "@/components/minimal/site-footer";

export default function NotFound() {
  return (
    <div className="minimal flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader />
      <main className="mt-10 flex flex-col gap-2.5">
        <h1>Nothing here.</h1>
        <p className="muted">That page moved or never existed.</p>
        <Link href="/" className="flex min-h-11 items-center">← home</Link>
      </main>
      <div className="flex-1" />
      <SiteFooter />
    </div>
  );
}
