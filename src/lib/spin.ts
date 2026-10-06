// "Spinning today": Spencer's latest Sleeve daily spin, read from Sleeve's public API.
// The key below is Sleeve's publishable (client) key. It's public by design; the
// daily_spins table is world-readable through row-level security.

const SLEEVE_API = "https://ulahxuoqpcshtkrkxrgx.supabase.co/rest/v1";
const SLEEVE_KEY =
  process.env.SLEEVE_PUBLISHABLE_KEY ?? "sb_publishable_tyDuGK4YIvLa-nClWx9qTw_IN9gvSt_";
const SPENCER_ID = "029305af-40b4-49ee-b2f0-a3b401d32b33";

export type Spin = {
  title: string;
  artist: string;
  isToday: boolean; // posted in the last 24 hours
  href: string; // Spencer's Sleeve profile
};

type Row = {
  track_title: string;
  artist_name: string;
  created_at: string;
  profiles: { username: string } | null;
};

// Built with URLSearchParams on purpose: the production compiler mangled the
// equivalent string concatenation (it dropped the "/daily_spins?select=..." part).
const SPIN_QUERY = new URLSearchParams({
  select: "track_title,artist_name,created_at,profiles!daily_spins_user_id_fkey(username)",
  user_id: `eq.${SPENCER_ID}`,
  order: "created_at.desc",
  limit: "1",
});
export const SPIN_URL = `${SLEEVE_API}/daily_spins?${SPIN_QUERY.toString()}`;
export const SPIN_HEADERS = { apikey: SLEEVE_KEY, Authorization: `Bearer ${SLEEVE_KEY}` };

export function toSpin(rows: unknown): Spin | null {
  const [row] = (Array.isArray(rows) ? rows : []) as Row[];
  if (!row) return null;
  const ageMs = Date.now() - new Date(row.created_at).getTime();
  const username = row.profiles?.username;
  return {
    title: row.track_title,
    artist: row.artist_name,
    isToday: ageMs < 24 * 60 * 60 * 1000,
    href: username ? `https://getsleeve.app/user/${username}` : "https://getsleeve.app",
  };
}

/** Server side, cached 10 minutes. Null on any failure; the header then asks from the browser. */
export async function getLatestSpin(): Promise<Spin | null> {
  try {
    const res = await fetch(SPIN_URL, {
      headers: SPIN_HEADERS,
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return toSpin(await res.json());
  } catch {
    // The site never breaks over this: no spin, no line.
    return null;
  }
}
