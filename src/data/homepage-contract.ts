// Homepage Contract — the homepage is a designed search asset, not a template stack.
// Source of truth for how the My Grass Farm homepage wins.
// Methodology: roblox-seo-site-sop-v2/references/homepage-first-methodology.md
import { gameGenre, gameCreator, gameEntities } from "./game-db";

export const homepageContract = {
  pageRole: "game-hub",
  gameArchetype: "tycoon-idle",

  // ★ The single decision this page helps the player make
  primaryPlayerJob:
    "Decide the first-hour upgrade order — blades (active income) vs workers (passive + offline income) — and when to expand, so new players don't stall their early cash flow.",
  primaryPlayerJobEs:
    "Decidir el orden de mejoras de la primera hora — cuchillas (ingreso activo) vs trabajadores (ingreso pasivo + offline) — y cuándo expandir, para no estancar el dinero inicial.",
  problemState:
    "New players don't know blades raise active cutting while workers keep earning offline; they spend early cash on blades only and leave money on the table.",
  problemStateEs:
    "Los nuevos no saben que las cuchillas suben el corte activo y los trabajadores siguen ganando offline; gastan todo en cuchillas y pierden dinero cada minuto alejados.",

  // ★ Route-First: no published numbers → no fake calculator; a decision route instead
  layoutVariant: "route-first",

  engine: {
    type: "first-hour-route",
    mode: "full",
    canonicalIntentOwner: "/",
    selectionReasons: [
      "Official description confirms blades + workers dual lane but no price numbers — a precise ROI calculator would fabricate data",
      "The most universal, most costly new-player mistake is buying blades only and skipping workers (loses offline income)",
      "The decision order IS structurable and reusable (route/checklist), and no in-game guidance exists for it",
    ],
  },

  intentOwnership: {
    rootOwned: ["game-entity", "game-wiki", "first-hour-decision"],
    directSummary: [
      { intent: "codes", mode: "status", owner: "/codes/" },
      { intent: "how-to-play", mode: "summary", owner: "/how-to-play/" },
      { intent: "release-date", mode: "summary", owner: "/release-date/" },
    ],
    childOwned: [
      { intent: "complete-codes-table", owner: "/codes/" },
      { intent: "farm-economy-strategy", owner: "/guides/" },
      { intent: "update-log", owner: "/updates/" },
    ],
    forbiddenFullBlocks: ["complete-codes-table", "complete-progression-walkthrough"],
  },

  requiredModules: [
    "hero", "main-engine", "critical-answers", "core-loop",
    "task-hubs", "deep-differentiator", "guide-map",
  ],

  budget: {
    primaryPlayerJob: 1,
    mainEngine: 1,
    criticalAnswers: { min: 2, max: 3 },
    coreLoop: 1,
    deepDifferentiator: 1,
    taskHubs: { min: 4, max: 6 },
    representativeEntities: { min: 3, max: 5 },
    guideMap: 1,
  },

  // The first-hour decision route — the main engine of this homepage
  firstHourRoute: [
    { step: 1, title: "Cut grass to collect hay", href: "/en/how-to-play", why: "Every farm dollar starts as hay — this is your base income and it's free to start." },
    { step: 2, title: "Process hay into cash", href: "/en/how-to-play", why: "Cash is the currency of every upgrade; stock it before spending." },
    { step: 3, title: "Buy your first blade", href: "/guides", why: "A faster blade raises hay-per-second, the engine that feeds everything else." },
    { step: 4, title: "Hire a worker early", href: "/guides", why: "Workers farm even while you're offline — skipping them leaves cash on the table." },
  ],

  hubPlan: [
    { label: "Start", target: "/en/how-to-play", playerState: "I just joined", nextDecision: "What's the first thing to do" },
    { label: "Grow faster", target: "/guides", playerState: "I want to earn more", nextDecision: "Blade or worker first" },
    { label: "Redeem", target: "/en/codes", playerState: "I want free rewards", nextDecision: "Which code works" },
    { label: "Stay current", target: "/en/updates", playerState: "I don't want to miss changes", nextDecision: "What changed recently" },
  ],
};
