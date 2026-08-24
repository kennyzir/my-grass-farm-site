import type { EditorialSignal, FaqItem, GameCode, HeroMetric, LinkCard, PlayerJourneyStage, SiteConfig } from "@/types/site";
import { gameConfig } from "@/data/game.config";
import { gameGenre, gameVisits, gamePlaying } from "@/data/game-db";

export const checkedDate = "2026-08-23";
export const monthLabel = "August 2026";

export const siteConfig: SiteConfig = {
  name: gameConfig.name,
  domain: gameConfig.domain,
  gameName: gameConfig.name,
  description: "My Grass Farm codes, how-to-play, beginner progression, release date, and updates — a focused Roblox My Grass Farm fan wiki.",
  valueProposition: "My Grass Farm is a Roblox tycoon where you cut grass to collect hay, process it for cash, unlock faster blades, and hire workers to farm for you — growing your farm as the loop speeds up. Here you can check active codes, learn the core gameplay loop, follow a beginner progression route, and track updates.",
  shortDisclosure: `${gameConfig.name} is an unofficial fan-made resource. Roblox and the My Grass Farm dev team remain the source of record.`,
  lastUpdated: checkedDate,
  freshnessLabel: "codes, guide, and update status refreshed on August 23, 2026",
  keywords: [
    "My Grass Farm", "My Grass Farm codes", "My Grass Farm Roblox", "My Grass Farm wiki",
    "My Grass Farm how to play", "My Grass Farm guide", "My Grass Farm beginner",
    "My Grass Farm release date", "My Grass Farm update", "My Grass Farm progression",
    "My Grass Farm codes 2026", "My Grass Farm hay", "My Grass Farm tycoon",
    "My Grass Farm how to grow", "My Grass Farm game", "My Grass Farm discord"
  ],
  navGroups: [
    {
      label: "Codes", href: "/en/codes", items: [
        { label: "Codes", href: "/en/codes", description: "My Grass Farm codes status — working codes, where new ones drop, and how to redeem." },
        { label: "Sources", href: "/sources", description: "Where code and guide claims were checked." }
      ]
    },
    {
      label: "Play", href: "/en/how-to-play", items: [
        { label: "How to Play", href: "/en/how-to-play", description: "The farming loop: cut grass, earn cash, expand." },
        { label: "Progression", href: "/en/how-to-play", description: "Beginner route from a small plot to a thriving farm." },
        { label: "Updates", href: "/en/updates", description: "My Grass Farm update log and what changed." },
        { label: "Release Date", href: "/en/release-date", description: "When My Grass Farm launched and its history." }
      ]
    },
    {
      label: "Wiki", href: "/wiki", items: [
        { label: "Full Wiki", href: "/wiki", description: "Codes, how to play, and what's new." },
        { label: "Guide Hub", href: "/guides", description: "The farming guides in one place." }
      ]
    },
    {
      label: "About", href: "/about", items: [
        { label: "Disclosure", href: "/disclosure", description: "Fan-made status and claim-state policy." },
        { label: "Contact", href: "/contact", description: "Corrections and editorial contact path." },
        { label: "Privacy", href: "/privacy", description: "Privacy and ad disclosure." }
      ]
    }
  ]
};

export const heroActions = [
  { href: "/en/codes", label: "Check codes" },
  { href: "/en/how-to-play", label: "How to play" },
  { href: "/en/updates", label: "Latest updates" },
  { href: "/wiki", label: "Full wiki" }
];

export const heroMetrics: HeroMetric[] = [
  { value: `${(gamePlaying / 1000).toFixed(1)}K`, label: "Playing now", note: "Official Roblox API, live" },
  { value: `${(gameVisits / 1000).toFixed(0)}K`, label: "Total visits", note: "Official Roblox API visits" },
  { value: gameGenre, label: "Genre", note: "Official Roblox genre — farming tycoon" }
];

export const activeCodes: GameCode[] = [
  { code: "RELEASE", reward: "Reported in a My Grass Farm codes video (creator-tested, not official-confirmed)", status: "Unverified", addedDate: "2026-08-23" },
  { code: "MERCHANT", reward: "Reported in a My Grass Farm codes video (creator-tested, not official-confirmed)", status: "Unverified", addedDate: "2026-08-23" }
];

export const expiredCodes: GameCode[] = [];

export const toolCards: LinkCard[] = [
  {
    title: "How to Play",
    href: "/en/how-to-play",
    description: "The core loop — cut grass for hay, process it into cash, unlock blades, and hire workers.",
    miniLabel: "Play"
  },
  {
    title: "Progression Route",
    href: "/en/how-to-play",
    description: "A beginner route from a small plot to a growing farm.",
    miniLabel: "Guide"
  },
  {
    title: "Updates",
    href: "/en/updates",
    description: "What changed in the latest My Grass Farm update.",
    miniLabel: "Fresh"
  }
];

export const guideClusters: LinkCard[] = [
  {
    title: "How to Play",
    href: "/en/how-to-play",
    description: "Cut grass, process hay for cash, unlock blades, and hire workers step by step.",
    miniLabel: "Guide"
  },
  {
    title: "Beginner Progression",
    href: "/en/how-to-play",
    description: "The first-session route: what to build and upgrade early.",
    miniLabel: "Beginner"
  },
  {
    title: "Codes",
    href: "/en/codes",
    description: "Active code status and where new codes drop.",
    miniLabel: "Codes"
  },
  {
    title: "Release Date",
    href: "/en/release-date",
    description: "When My Grass Farm launched and how it's grown.",
    miniLabel: "History"
  }
];

// Player-lifecycle routing (farming tycoon): a visitor is starting a farm,
// growing it, or tracking the game. Each stage = a question + next-query chain.
export const playerJourney: PlayerJourneyStage[] = [
  {
    number: "1",
    title: "Redeem & Start",
    question: "Just started?",
    answer: "Redeem the latest codes if any are live, then follow the beginner loop to build your first plot of grass.",
    href: "/en/codes",
    links: [
      { label: "Codes status", href: "/en/codes", description: "Working codes and where new ones drop." },
      { label: "How to Play", href: "/en/how-to-play", description: "The farming loop and first steps." }
    ]
  },
  {
    number: "2",
    title: "Grow the Farm",
    question: "How do I grow my farm?",
    answer: "Cut grass to collect hay, process hay for cash, unlock powerful blades to cut faster, and hire workers to farm for you — upgrade and expand as the loop speeds up.",
    href: "/en/how-to-play",
    links: [
      { label: "How to Play", href: "/en/how-to-play", description: "Cut, earn, upgrade, expand — the core loop." },
      { label: "Progression", href: "/en/how-to-play", description: "A beginner route to grow fast." }
    ]
  },
  {
    number: "3",
    title: "Track the Game",
    question: "What's new and when did it start?",
    answer: "Check the update log for the latest changes and the release date page for the game's history.",
    href: "/en/updates",
    links: [
      { label: "Updates", href: "/en/updates", description: "What changed in the latest My Grass Farm update." },
      { label: "Release Date", href: "/en/release-date", description: "When My Grass Farm launched." }
    ]
  }
];

export const wikiCards: LinkCard[] = [
  {
    title: "Codes",
    href: "/en/codes",
    description: "Active code status, where codes drop, and how to redeem.",
    miniLabel: "Codes"
  },
  {
    title: "How to Play",
    href: "/en/how-to-play",
    description: "The hay-to-cash farming loop and beginner progression.",
    miniLabel: "Play"
  },
  {
    title: "Updates",
    href: "/en/updates",
    description: "The My Grass Farm update log and what changed.",
    miniLabel: "Fresh"
  }
];

export const officialLinks: LinkCard[] = [
  {
    title: "Official Roblox Game Page",
    href: gameConfig.dataSources.officialGameUrl,
    description: "Play My Grass Farm on Roblox and see the official description.",
    miniLabel: "Official"
  },
  {
    title: "Official YouTube",
    href: "https://www.youtube.com/results?search_query=roblox+my+grass+farm",
    description: "Where official trailers and updates appear.",
    miniLabel: "Official"
  },
  {
    title: "Source Status Page",
    href: "/sources",
    description: "What was checked, and when.",
    miniLabel: "Sources"
  }
];

export const editorialSignals: EditorialSignal[] = [
  {
    title: "Fan-made, claim-stated",
    body: "My Grass Farm is the source of record. We label everything Verified or Community-reported and never invent a code, mechanic, or upgrade step."
  },
  {
    title: "Codes verified against official drops",
    body: "We list only codes we can date from an official source, and mark codes honestly as Unknown when none are confirmed rather than inventing fake ones."
  },
  {
    title: "Gameplay from the current build",
    body: "Gameplay steps reflect the current build (game updated August 23, 2026). Exact numbers can change between updates, so stats are Community-reported unless confirmed in-game."
  }
];

export const videoGuides: LinkCard[] = [];

export const faqs: Record<"home" | "codes", FaqItem[]> = {
  home: [
    { q: "What is My Grass Farm?", a: "My Grass Farm is a Roblox tycoon where you cut grass to collect hay, process it for cash, unlock faster blades, and hire workers to farm for you and grow your farm." },
    { q: "Are there My Grass Farm codes?", a: "We list only codes we can verify from an official source. If none are confirmed, the codes page says so honestly rather than inventing working codes." },
    { q: "Do I need to know anything before playing?", a: "The how-to-play page covers the core loop and a beginner route, so you start with a plan for how to grow your farm." }
  ],
  codes: [
    { q: "Are My Grass Farm codes real?", a: "We only list codes we can date from an official source. Unverified codes are marked as Unknown, never presented as active." },
    { q: "Why is there no code listed?", a: "Tycoon games often publish rewards late or through specific channels. If no code is confirmed, the page says so honestly and tracks where new ones would drop." },
    { q: "Is the Discord link official?", a: "We do not publish an invite unless we verify it from an official source — a fake invite is worse than no link." }
  ]
};
