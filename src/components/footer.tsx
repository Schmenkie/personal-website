import { MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-text-primary">
              SC
            </span>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin size={14} />
              Bellevue, WA
            </div>
          </div>

          <p className="text-sm text-text-muted/60">
            Built with Next.js, Tailwind, &amp; Framer Motion.
            &copy; {new Date().getFullYear()} Spencer Curnow.
          </p>
        </div>
      </div>
    </footer>
  );
}
