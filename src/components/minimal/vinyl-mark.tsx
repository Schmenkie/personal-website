// Same record as the favicon (src/app/icon.svg): purple vinyl, black label.
// While a spin plays, the label shows the album cover.
export function VinylMark({ cover = null }: { cover?: string | null }) {
  return (
    <svg className="vinyl" width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <clipPath id="vinyl-label">
          <circle cx="16" cy="16" r="5.6" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="15.5" fill="#7A2FF2" />
      <circle cx="16" cy="16" r="12" fill="none" stroke="#5B17CF" strokeWidth="1" />
      <circle cx="16" cy="16" r="9.2" fill="none" stroke="#5B17CF" strokeWidth="1" />
      <circle cx="16" cy="16" r="5.6" fill="#111111" />
      {cover && (
        <image href={cover} x="10.4" y="10.4" width="11.2" height="11.2" clipPath="url(#vinyl-label)" preserveAspectRatio="xMidYMid slice" />
      )}
      <circle cx="16" cy="16" r="1.6" fill="#FBFBF9" />
    </svg>
  );
}
