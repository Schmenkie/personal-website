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
  phone?: boolean; // a raw phone screen: rounder corners in the grid
  slides?: Slide[]; // a set that plays in the lightbox (a Yurr issue, an app walkthrough)
  line?: string; // the line under a project tile on /work
  href?: string; // the tile links here instead of opening the lightbox
  tagline?: string; // a Yurr issue's cover line, shown under it and in the reader
  post?: string; // the issue's Instagram post
};

export type Slide = { src: string; alt: string; width: number; height: number; caption?: string };

export type Project = {
  slug: string;
  name: string;
  oneLine: string; // the /work index row
  where: string; // right-hand column of the index: App Store, Instagram, Web...
  platform: string; // shown next to each image's filename
  body: string[];
  story?: string[]; // the short story shown beside the images on /work; falls back to body
  links: { label: string; href: string }[];
  shots: Shot[];
  issues?: { vol: string; issues: Shot[] }[]; // Yurr's archive, newest first
};

const cover = { width: 1080, height: 1350 }; // Yurr slides are 4:5

// An app walkthrough: one tile on /work that plays raw screens in order.
const screen = { width: 720, height: 1558 };
function walkthrough(dir: string, name: string, line: string, screens: [file: string, caption: string, alt: string][]): Shot {
  const slides = screens.map(([file, caption, alt]) => ({ src: `/projects/${dir}/screens/${file}.jpg`, caption, alt, ...screen }));
  return { id: "app", src: slides[0].src, file: `${dir}/screens`, caption: name, line, alt: slides[0].alt, ...screen, phone: true, slides };
}

// One Yurr issue: the cover in the grid, every slide in the lightbox.
function issue(slug: string, no: string, who: string, vol: string, count: number, tagline: string, post?: string): Shot {
  const name = no ? `Issue ${no}, ${who}` : `${who}, a compilation`;
  const what = (i: number) =>
    i === 1 ? "cover" : i === count ? "closing grid" : no && i % 2 === 1 ? "photo and callout" : "interview slide";
  const slides = Array.from({ length: count }, (_, k) => ({
    src: `/projects/yurr/${slug}/${String(k + 1).padStart(2, "0")}.jpg`,
    alt: `Yurr Magazine ${name}, ${what(k + 1)}`,
    ...cover,
  }));
  return { id: slug, src: slides[0].src, file: `yurr/${slug}`, caption: name, meta: vol, alt: slides[0].alt, ...cover, slides, tagline, post };
}

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
    story: [
      "Most of my group chats are food, sports and music. Sleeve started as a place for my friends and me to share what we're listening to, and it grew into a place for anyone to do the same.",
      "My favorite moment so far: a friend of mine started talking with a Sleeve user in China. They had never met and live on opposite sides of the world, but they connected over the same songs.",
      "I had no development experience going in. I had a vision, Claude Code as my architect, and a lot of trial and error. People using it told me what worked and what didn't, and every round of that feedback made it better. The thing people say most often is that they're surprised how polished it is.",
    ],
    links: [
      { label: "App Store", href: "https://apps.apple.com/app/id6779825854" },
      { label: "getsleeve.app", href: "https://getsleeve.app" },
    ],
    shots: [
      walkthrough("sleeve", "Sleeve", "A music diary for iOS. On the App Store.", [
        ["01-album", "Every album, wrapped in its own color", "Sleeve's album page for SOS by SZA, tinted in the cover's blues"],
        ["02-song", "Rating a song", "Rating Birds of a Feather in Sleeve, with friends' ratings below"],
        ["03-feed", "What your friends are playing", "Sleeve's feed: friends' album ratings with short reviews"],
        ["04-playlist", "Playlists you can share", "A Sleeve playlist called late night drive"],
        ["05-taste", "People with your taste", "Sleeve's taste twin screen showing albums you both loved"],
        ["06-profile", "Your diary, in one place", "A Sleeve profile with recent songs and albums"],
      ]),
    ],
  },
  {
    slug: "yurr",
    name: "Yurr Magazine",
    oneLine: "Covers and interviews for an Instagram magazine, plus the tool that renders them.",
    where: "Instagram",
    platform: "Instagram",
    body: [
      "An independent magazine that profiles one creator per issue, published as Instagram carousels. I design every issue: the cover, the Q&A spreads, a callout reacting to each answer, and a closing grid.",
      "I also wrote the Python tool that builds an issue from one config file, so every issue stays consistent. Made with @clintyurr.",
    ],
    links: [],
    shots: [
      { id: "archive", href: "/work/yurr", src: "/projects/yurr/jaren/01.jpg", file: "yurr/archive", caption: "Yurr Magazine", line: "Nine issues of an Instagram magazine. Open the archive →", alt: "Yurr Magazine issue 018 cover, opening the archive of every issue", ...cover },
    ],
    issues: [
      {
        vol: "Vol. 02",
        issues: [
          issue("jaren", "018", "@ohthatsjuice__", "Vol. 02", 16, "Small-town America's funniest export."),
          issue("amon", "017", "@amoninsta", "Vol. 02", 16, "Never knowing what he wants to be, and calling it the reward."),
          issue("jared", "010", "@jwesttttttttt", "Vol. 02", 16, "Bringing back the good old days of the internet."),
          issue("oliver", "008", "@ollybee", "Vol. 02", 14, "Actor, creative director, and full-time menace out of Jersey."),
          issue("luvstruck", "006", "@luvstruck", "Vol. 02", 14, "She turned a Twitch stream into a life built around cars, creating, and doing what she loves."),
          issue("leallicna", "005", "@leallicna", "Vol. 02", 16, "Artist. Illustrator. Worldbuilder."),
        ],
      },
      {
        vol: "Vol. 01",
        issues: [
          issue("lyric", "020", "@bestfilmer", "Vol. 01", 16, "The handle isn't a flex. It's a fact."),
          issue("andy", "015", "@waitimgoated", "Vol. 01", 14, "Wait... he's goated."),
          issue("best-advice", "", "The best advice", "Vol. 01", 12, "After 20 interviews, here's some of the best advice we got."),
        ],
      },
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
      walkthrough("golf", "Schmenk Golf", "GPS and a scorecard for my dad's weekly golf group.", [
        ["01-play", "Your home course, one tap away", "Schmenk Golf's screen for starting a round at a home course"],
        ["02-round", "Your round, hole by hole", "A finished round in Schmenk Golf with its scorecard"],
        ["03-log", "Log any round in seconds", "Schmenk Golf's form for logging a past round"],
      ]),
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
    shots: [
      { id: "calc", src: "/projects/soundsauce/calc.jpg", file: "soundsauce/calc.jpg", caption: "SoundSauce", line: "Paste a song link, get its stems, key and tempo.", alt: "SoundSauce's remix calculator, working out the transpose and tempo change to fit a vocal into a project", width: 784, height: 985 },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/** The /work grid, in order: projects mixed together like a mood board. "slug/shot-id". */
export const GRID_ORDER = ["sleeve/app", "yurr/archive", "schmenk-golf/app", "soundsauce/calc"];

export type GridItem = { key: string; project: Project; shot: Shot };

/** Yurr's archive as reader items, newest first, grouped by volume. */
export function yurrIssues(): { vol: string; items: GridItem[] }[] {
  const yurr = getProject("yurr")!;
  return (yurr.issues ?? []).map((v) => ({ vol: v.vol, items: v.issues.map((shot) => ({ key: shot.id, project: yurr, shot })) }));
}

export function gridItems(): GridItem[] {
  const all = PROJECTS.flatMap((project) => project.shots.map((shot) => ({ key: `${project.slug}/${shot.id}`, project, shot })));
  const byKey = new Map(all.map((it) => [it.key, it]));
  const ordered = GRID_ORDER.flatMap((k) => byKey.get(k) ?? []);
  // Anything added to a project but not placed above still shows, at the end.
  return [...ordered, ...all.filter((it) => !GRID_ORDER.includes(it.key))];
}


/** Private tools: listed on /work, no pages (they have no public surface). */
export const TOOLS = [
  { name: "Data hub", oneLine: "A private dashboard of usage and errors across my apps, from PostHog and Sentry." },
  { name: "Job Scout", oneLine: "A daily job-search agent. Scores listings against my resume and emails me a digest." },
  { name: "Lead finder", oneLine: "Finds local businesses with no website, or a broken one, from Google Places." },
];
