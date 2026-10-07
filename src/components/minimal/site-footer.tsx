import { LINKS } from "./links";

export function SiteFooter() {
  return (
    <footer className="muted mt-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
      <p className="flex min-h-11 items-center">Liner notes: produced, designed and built by Spencer Curnow.</p>
      <div className="flex flex-wrap items-center gap-x-5">
        {LINKS.filter((l) => !l.nav).map((l) => (
          <a key={l.label} href={l.href} className="muted flex min-h-11 items-center hover:!text-[#7A2FF2]">
            {l.label}
          </a>
        ))}
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
