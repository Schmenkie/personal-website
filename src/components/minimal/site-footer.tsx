export function SiteFooter() {
  return (
    <footer className="muted mt-2.5 flex items-start justify-between gap-4">
      <details>
        <summary aria-label="About this site" className="flex min-h-11 cursor-pointer list-none items-center">
          [i]
        </summary>
        <p className="mb-3 max-w-[38ch]">
          Built with Next.js. Set in Geist Mono. The song up top is whatever I posted on Sleeve today.
        </p>
      </details>
      <span className="flex min-h-11 items-center">© {new Date().getFullYear()}</span>
    </footer>
  );
}
