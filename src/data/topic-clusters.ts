import type { FaqItem } from "@/types/site";
import { monthLabel, siteConfig } from "@/data/site";

export type TopicSection = {
  eyebrow: string;
  title: string;
  body: string;
};

export type TopicCluster = {
  slug: string;
  route: string;
  parentRoute: string;
  parentLabel: string;
  eyebrow: string;
  navTitle: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  demandSignal: string;
  currentAnswer: string;
  verificationBoundary: string;
  sections: TopicSection[];
  faqs: FaqItem[];
  relatedRoutes: Array<{
    href: string;
    label: string;
    description: string;
  }>;
  lastUpdated?: string;
};

// My Grass Farm topic-cluster hubs. The real content lives on the farming-tycoon
// pages; these entries link clusters so the footer and wiki hub read as one
// focused fan resource for THIS game.
export const topicClusters: TopicCluster[] = [
  {
    slug: "wiki",
    route: "/wiki",
    parentRoute: "/",
    parentLabel: "Home",
    eyebrow: "Wiki",
    navTitle: "My Grass Farm Wiki",
    title: "My Grass Farm Wiki",
    metaTitle: `My Grass Farm Wiki — ${monthLabel}`,
    metaDescription: `${siteConfig.gameName} wiki hub for how to play, codes, release date, and updates.`,
    intro: "The focused My Grass Farm fan wiki — how to play, grow your farm, and track the game.",
    demandSignal: "Players search how to play, codes, release date, and updates for My Grass Farm.",
    currentAnswer: "Learn the hay-to-cash farming loop (cut, process, upgrade, hire), check verified codes, and track updates.",
    verificationBoundary: "Codes are verified against official sources; gameplay reflects the current build.",
    sections: [
      { eyebrow: "Play", title: "Farming loop", body: "Cut grass to collect hay, process hay for cash, unlock blades to cut faster, and hire workers to farm for you. The loop is the core of the game." },
      { eyebrow: "Track", title: "Codes & updates", body: "Verified code status (or honest none-yet) plus what changed in recent updates." },
      { eyebrow: "History", title: "Release & growth", body: "Created 31 July 2026; fast early start in the farming-tycoon niche." }
    ],
    faqs: [
      { q: "What is My Grass Farm about?", a: "A Roblox tycoon: cut grass for hay, process it into cash, unlock powerful blades, and hire workers to grow your farm." },
      { q: "Is My Grass Farm a battle game?", a: "No — the focus is farming and incremental tycoon growth, not PvP combat. Check the official page for current modes." },
      { q: "How do I get codes?", a: "We list only verified codes from an official source; if none are confirmed the codes page says so honestly." }
    ],
    relatedRoutes: [
      { href: "/en/how-to-play", label: "How to play", description: "The farming loop and first steps." },
      { href: "/en/codes", label: "Codes", description: "Verified reward code status." },
      { href: "/en/release-date", label: "Release date", description: "When My Grass Farm launched." },
      { href: "/en/updates", label: "Updates", description: "What changed in the latest update." }
    ]
  },
  {
    slug: "how-to-play",
    route: "/en/how-to-play",
    parentRoute: "/wiki",
    parentLabel: "Wiki",
    eyebrow: "Play",
    navTitle: "How to Play",
    title: "How to Play My Grass Farm",
    metaTitle: `My Grass Farm How to Play — ${monthLabel}`,
    metaDescription: "How to play My Grass Farm: cut grass for hay, process it for cash, unlock faster blades, and hire workers.",
    intro: "Start by cutting grass to collect hay, process hay for cash, unlock better blades, then hire workers to farm for you as you expand.",
    demandSignal: "Players search how to play, what to build first, and how to grow fast.",
    currentAnswer: "Cut grass for hay, process hay into cash, unlock faster blades, and hire workers — upgrade and expand as the loop speeds up.",
    verificationBoundary: "Gameplay reflects the current build; exact numbers are Community-reported unless confirmed in-game.",
    sections: [
      { eyebrow: "First day", title: "The core loop", body: "Cut grass → collect hay → process for cash → unlock blades → hire workers → expand the farm. Each upgrade speeds the loop." },
      { eyebrow: "Common pitfalls", title: "What to avoid", body: "Don't blow everything on novelty; production upgrades pay back long-term. Expanding your farm drives the mid game." }
    ],
    faqs: [
      { q: "Is it free to play?", a: "Yes, the game is free on Roblox." }
    ],
    relatedRoutes: [
      { href: "/en/release-date", label: "Release date", description: "When it launched." },
      { href: "/en/updates", label: "Updates", description: "What's new." },
      { href: "/en/codes", label: "Codes", description: "Rewards, if any." }
    ]
  },
  {
    slug: "codes",
    route: "/en/codes",
    parentRoute: "/wiki",
    parentLabel: "Wiki",
    eyebrow: "Rewards",
    navTitle: "Codes",
    title: "My Grass Farm Codes",
    metaTitle: `My Grass Farm Codes — ${monthLabel}`,
    metaDescription: "Verified My Grass Farm reward code status, where to look for new codes, and how to redeem.",
    intro: "We list only verified codes from an official source; if none are confirmed, this page says so honestly.",
    demandSignal: "Players search for My Grass Farm codes and whether any are active.",
    currentAnswer: "No confirmed public codes as of the latest refresh; check the official Roblox/YouTube channels for drops.",
    verificationBoundary: "A code is listed only with a dated official source; unverified codes are marked, never presented as active.",
    sections: [
      { eyebrow: "Status", title: "Verified codes", body: "The active list, or an honest empty state." },
      { eyebrow: "Watch", title: "Where codes drop", body: "Official Roblox page and YouTube announcements." }
    ],
    faqs: [
      { q: "Are My Grass Farm codes real?", a: "We only list codes we can date from an official source." }
    ],
    relatedRoutes: [
      { href: "/en/how-to-play", label: "How to play", description: "The core loop." },
      { href: "/en/updates", label: "Updates", description: "What's new." }
    ]
  }
];

export const topicClusterRoutes = topicClusters.map((cluster) => cluster.route);

export function getTopicCluster(slug: string) {
  return topicClusters.find((cluster) => cluster.slug === slug);
}
