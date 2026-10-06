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
      { id: "feed", src: "/projects/sleeve/feed.png", file: "sleeve/feed.png", caption: "1. Friends feed", alt: "Sleeve's feed of friends' album ratings", ...phone },
      { id: "album", src: "/projects/sleeve/album.png", file: "sleeve/album.png", caption: "2. Album page", alt: "Sleeve's album page, tinted in the colors of the album cover", ...phone },
      { id: "discover", src: "/projects/sleeve/discover.png", file: "sleeve/discover.png", caption: "3. Discover", alt: "Sleeve's discover screen", ...phone },
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
      "A golf app I built for my dad's weekly group and my friends. Tap to score, GPS distance to the green with wind and elevation, satellite hole maps, a USGA handicap, and a round card you can share.",
      "No ads, no growth plan. It just has to work one-handed on the course, in the sun, for golfers in their sixties.",
    ],
    links: [],
    shots: [
      { id: "play", src: "/projects/golf/play.png", file: "golf/play.png", caption: "1. Start a round", alt: "Schmenk Golf's screen for starting a round", ...phone },
      { id: "scorecard", src: "/projects/golf/scorecard.png", file: "golf/scorecard.png", caption: "2. The finished round", alt: "Schmenk Golf's round detail with a scorecard", ...phone },
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

