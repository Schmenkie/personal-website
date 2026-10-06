// The work shown on the home strip, the /work index and each /work/[slug] page.
// Add a project here and every page picks it up.

export type Shot = {
  id: string; // anchor on the project page; the home strip links to /work/<slug>#<id>
  src: string;
  file: string; // shown like a filename above the image
  caption: string;
  meta?: string; // right of the filename; defaults to the project's platform
  alt: string;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  name: string;
  oneLine: string; // the /work index row
  where: string; // right-hand column of the index: App Store, Instagram, Web...
  platform: string; // shown next to each image's filename
  body: string[];
  links: { label: string; href: string }[];
  shots: Shot[];
};

const store = { width: 720, height: 1564 }; // App Store screenshots
const golf = { width: 720, height: 1561 };
const cover = { width: 760, height: 950 };

export const PROJECTS: Project[] = [
  {
    slug: "sleeve",
    name: "Sleeve",
    oneLine: "A music diary for iOS. Rate albums and songs, share playlists, find friends.",
    where: "App Store",
    platform: "iOS",
    body: [
      "A music diary. You log the albums and songs you listen to, rate them, and see what your friends are really playing. Every album page takes on the colors of its cover.",
      "Since launch it has grown song ratings, playlists you can share, a daily song everyone posts at the same random moment, and a weekly issue that recaps the week in music every Sunday.",
      "I designed and built it alone. It launched on the App Store in June 2026 and has 400+ people from 20+ countries.",
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/id6779825854" },
      { label: "getsleeve.app", href: "https://getsleeve.app" },
    ],
    shots: [
      { id: "album", src: "/projects/sleeve/01.jpg", file: "sleeve/01-album.jpg", caption: "Every album, wrapped in its own color", alt: "Sleeve's album page, tinted in the colors of the album cover", ...store },
      { id: "songs", src: "/projects/sleeve/02.jpg", file: "sleeve/02-songs.jpg", caption: "Rating a song", alt: "Rating a song in Sleeve, with friends' ratings below", ...store },
      { id: "feed", src: "/projects/sleeve/03.jpg", file: "sleeve/03-feed.jpg", caption: "What your friends are playing", alt: "Sleeve's feed of friends' ratings", ...store },
      { id: "playlists", src: "/projects/sleeve/04.jpg", file: "sleeve/04-playlists.jpg", caption: "Playlists you can share", alt: "A Sleeve playlist and its share card", ...store },
      { id: "taste", src: "/projects/sleeve/05.jpg", file: "sleeve/05-taste.jpg", caption: "People with your taste", alt: "A taste match in Sleeve showing a 94% match", ...store },
      { id: "profile", src: "/projects/sleeve/06.jpg", file: "sleeve/06-profile.jpg", caption: "Your diary, in one place", alt: "A Sleeve profile with recent albums and songs", ...store },
      { id: "week", src: "/projects/sleeve/07.jpg", file: "sleeve/07-week.jpg", caption: "The week in music, every Sunday", alt: "Sleeve's weekly issue recapping the week in music", ...store },
    ],
  },
  {
    slug: "yurr",
    name: "Yurr Magazine",
    oneLine: "Covers and interviews for an Instagram magazine, plus the tool that renders them.",
    where: "Instagram",
    platform: "Instagram",
    body: [
      "An independent magazine that profiles one creator per issue, published as Instagram carousels. I design every issue: the cover, seven Q&A spreads, a callout reacting to each answer, and a closing grid.",
      "I also wrote the Python tool that builds an issue from one config file, so every issue stays consistent. Eight issues so far in Vol. 02, made with @clintyurr.",
    ],
    links: [],
    shots: [
      { id: "leallicna", src: "/projects/yurr/leallicna.jpg", file: "yurr/005-leallicna.jpg", caption: "Issue 005, cover", meta: "Jun 22", alt: "Yurr Magazine issue 005 cover for Leallicna", ...cover },
      { id: "luvstruck", src: "/projects/yurr/luvstruck.jpg", file: "yurr/006-luvstruck.jpg", caption: "Issue 006, cover", meta: "Jun 23", alt: "Yurr Magazine issue 006 cover for Luvstruck", ...cover },
      { id: "jared", src: "/projects/yurr/jared.jpg", file: "yurr/007-jared.jpg", caption: "Issue 007, cover", meta: "Jun 24", alt: "Yurr Magazine issue 007 cover for Jared", ...cover },
      { id: "jared-qa", src: "/projects/yurr/jared-qa.jpg", file: "yurr/007-jared-qa.jpg", caption: "Issue 007, a Q&A slide", meta: "Jun 24", alt: "A question-and-answer slide from Yurr Magazine issue 007", ...cover },
      { id: "jared-outro", src: "/projects/yurr/jared-outro.jpg", file: "yurr/007-jared-outro.jpg", caption: "Issue 007, closing grid", meta: "Jun 24", alt: "The closing photo grid from Yurr Magazine issue 007", ...cover },
      { id: "oliver", src: "/projects/yurr/oliver.jpg", file: "yurr/008-oliver.jpg", caption: "Issue 008, cover", meta: "Jun 25", alt: "Yurr Magazine issue 008 cover for Oliver", ...cover },
    ],
  },
  {
    slug: "schmenk-golf",
    name: "Schmenk Golf",
    oneLine: "GPS and a scorecard for my dad's weekly golf group.",
    where: "iPhone",
    platform: "iOS",
    body: [
      "A golf app I built for my dad's weekly group and my friends. Tap to score, GPS distance to the green, a \u201cplays like\u201d yardage adjusted for wind and elevation, a satellite hole map you tap to measure, a caddie book of notes for every hole, a USGA handicap, and a round card worth sharing.",
      "It started life as a busy golf social network. In July I cut it back to a scorecard: fewer screens, more care in each one. It has to work one-handed, in the sun, for golfers in their sixties.",
      "It shipped to the App Store in April 2026 as LinkUp Golf. A trademark conflict means a new name; version 1.3.0 brings it back as Schmenk Golf.",
    ],
    links: [],
    shots: [
      { id: "round", src: "/projects/golf/01.jpg", file: "golf/01-round.jpg", caption: "Your round, hole by hole", alt: "Schmenk Golf's round detail with a scorecard", ...golf },
      { id: "play", src: "/projects/golf/02.jpg", file: "golf/02-play.jpg", caption: "Your home course, one tap away", alt: "Schmenk Golf's screen for starting a round", ...golf },
      { id: "log", src: "/projects/golf/03.jpg", file: "golf/03-log.jpg", caption: "Log any round in seconds", alt: "Schmenk Golf's form for logging a past round", ...golf },
    ],
  },
  {
    slug: "soundsauce",
    name: "SoundSauce",
    oneLine: "Paste a song link, get its stems, key, BPM and sections.",
    where: "Web",
    platform: "Web",
    body: [
      "A tool I use for remixing. Paste a song link and it pulls the track, splits it into stems, and finds the key, the tempo and where the drops are, then sends it all into Ableton.",
      "Built for one user: me.",
    ],
    links: [{ label: "soundsauce.app", href: "https://soundsauce.app" }],
    shots: [],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);


/** Private tools: listed on /work, no pages (they have no public surface). */
export const TOOLS = [
  { name: "Data hub", oneLine: "A private dashboard of usage and errors across my apps, from PostHog and Sentry." },
  { name: "Job Scout", oneLine: "A daily job-search agent. Scores listings against my resume and emails me a digest." },
  { name: "Lead finder", oneLine: "Finds local businesses with no website, or a broken one, from Google Places." },
];
