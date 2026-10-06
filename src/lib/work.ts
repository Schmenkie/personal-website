// The work shown on the home strip, the /work index and each /work/[slug] page.
// Add a project here and every page picks it up.

export type Shot = {
  id: string; // anchor on the project page; the home strip links to /work/<slug>#<id>
  src: string;
  file: string; // shown like a filename above the image
  caption: string;
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

const phone = { width: 640, height: 1385 };
const cover = { width: 760, height: 950 };

export const PROJECTS: Project[] = [
  {
    slug: "sleeve",
    name: "Sleeve",
    oneLine: "A music diary for iOS. Log albums, rate songs, find friends.",
    where: "App Store",
    platform: "iOS",
    body: [
      "A music diary. You log the albums you listen to, rate songs, and see what your friends are playing. Each album page takes on the colors of its cover.",
      "I designed and built it alone. It's on the App Store with 350+ people from 20+ countries.",
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/id6779825854" },
      { label: "getsleeve.app", href: "https://getsleeve.app" },
    ],
    shots: [
      { id: "album", src: "/projects/sleeve/album.png", file: "sleeve/album.png", caption: "Album page", alt: "Sleeve's album page, tinted in the colors of the album cover", ...phone },
      { id: "feed", src: "/projects/sleeve/feed.png", file: "sleeve/feed.png", caption: "Friends feed", alt: "Sleeve's feed of friends' album ratings", ...phone },
      { id: "discover", src: "/projects/sleeve/discover.png", file: "sleeve/discover.png", caption: "Discover", alt: "Sleeve's discover screen", ...phone },
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
      { id: "jared", src: "/projects/yurr/jared.jpg", file: "yurr/jared.jpg", caption: "Issue 007, cover", alt: "Yurr Magazine cover for Jared", ...cover },
      { id: "jared-qa", src: "/projects/yurr/jared-qa.jpg", file: "yurr/jared-qa.jpg", caption: "Issue 007, Q&A", alt: "A question-and-answer slide from Yurr Magazine", ...cover },
      { id: "luvstruck", src: "/projects/yurr/luvstruck.jpg", file: "yurr/luvstruck.jpg", caption: "Cover", alt: "Yurr Magazine cover for Luvstruck", ...cover },
      { id: "leallicna", src: "/projects/yurr/leallicna.jpg", file: "yurr/leallicna.jpg", caption: "Cover", alt: "Yurr Magazine cover for Leallicna", ...cover },
      { id: "oliver", src: "/projects/yurr/oliver.jpg", file: "yurr/oliver.jpg", caption: "Cover", alt: "Yurr Magazine cover for Oliver", ...cover },
      { id: "jared-outro", src: "/projects/yurr/jared-outro.jpg", file: "yurr/jared-outro.jpg", caption: "Issue 007, closing grid", alt: "Closing photo grid from Yurr Magazine", ...cover },
    ],
  },
  {
    slug: "schmenk-golf",
    name: "Schmenk Golf",
    oneLine: "GPS and a scorecard for my dad's weekly golf group.",
    where: "iPhone",
    platform: "iOS",
    body: [
      "A golf app I built for my dad's weekly group and my friends. Tap to score, GPS distance to the green with wind and elevation, satellite hole maps, a USGA handicap, and a round card you can share.",
      "No ads, no growth plan. It just has to work one-handed on the course, in the sun, for golfers in their sixties.",
    ],
    links: [],
    shots: [
      { id: "scorecard", src: "/projects/golf/scorecard.png", file: "golf/scorecard.png", caption: "Round detail", alt: "Schmenk Golf's round detail with a scorecard", ...phone },
      { id: "play", src: "/projects/golf/play.png", file: "golf/play.png", caption: "Start a round", alt: "Schmenk Golf's screen for starting a round", ...phone },
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

/** Every image, in project order: the home page's strip. */
export const ALL_SHOTS = PROJECTS.flatMap((p) =>
  p.shots.map((s) => ({ ...s, slug: p.slug, project: p.name })),
);
