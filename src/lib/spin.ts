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

export async function getLatestSpin(): Promise<Spin | null> {
  const url =
    `${SLEEVE_API}/daily_spins` +
    `?select=track_title,artist_name,created_at,profiles!daily_spins_user_id_fkey(username)` +
    `&user_id=eq.${SPENCER_ID}&order=created_at.desc&limit=1`;
  try {
    const res = await fetch(url, {
      headers: { apikey: SLEEVE_KEY, Authorization: `Bearer ${SLEEVE_KEY}` },
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) return null;
    const [row] = (await res.json()) as Row[];
    if (!row) return null;
    const ageMs = Date.now() - new Date(row.created_at).getTime();
    const username = row.profiles?.username;
    return {
      title: row.track_title,
      artist: row.artist_name,
      isToday: ageMs < 24 * 60 * 60 * 1000,
      href: username ? `https://getsleeve.app/user/${username}` : "https://getsleeve.app",
    };
  } catch {
    // The site never breaks over this: no spin, no line.
    return null;
  }
}
