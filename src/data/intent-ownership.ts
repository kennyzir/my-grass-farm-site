// Intent Ownership — the single source of truth for WHICH page owns WHICH intent.
//
// This is the "Child Intent Owners → Internal Link Graph" spine of Homepage-First
// building: the homepage contract DECLARES who owns what, and every inner page
// CONSUMES this same table (never a second copy) to (a) state its own intent and
// (b) back-link to the homepage main engine / next relevant page.
//
// Methodology: roblox-seo-site-sop-v2/references/homepage-first-methodology.md §8.
// Rule: every query family has exactly ONE canonicalOwner. The homepage owns
// the GAME/wiki/guide intents + the main-engine decision; inner pages own the
// full blocks (codes table, economy strategy, update log, release history).

export type HomepageMode = "primary" | "direct" | "summary" | "status" | "link-only" | "excluded";

export type IntentOwnership = {
  intent: string;          // the query family key
  titleEn: string;         // human-readable intent name
  titleEs: string;
  mode: HomepageMode;      // how deep the homepage answers this intent
  owner: string;           // canonical URL owner (the page that fully owns it)
};

// The homepage's one irreducible answer (main engine decision) — every inner
// page back-links here so the whole site orbits one value proposition.
export const mainEngine = {
  questionEn: "What to upgrade first: blades (active income) or workers (passive + offline income)?",
  questionEs: "¿Qué mejorar primero: cuchillas (ingreso activo) o trabajadores (pasivo + offline)?",
  anchorEn: "the first-hour upgrade order",
  anchorEs: "el orden de mejoras de la primera hora",
  owner: "/",
};

export const intentOwnership: IntentOwnership[] = [
  // Root-owned — the homepage fully owns these
  { intent: "game-entity",      titleEn: "What My Grass Farm is",         titleEs: "Qué es My Grass Farm",      mode: "primary", owner: "/" },
  { intent: "game-wiki",        titleEn: "My Grass Farm wiki hub",        titleEs: "Wiki de My Grass Farm",    mode: "primary", owner: "/" },
  { intent: "first-hour-decision", titleEn: "What to upgrade first",      titleEs: "Qué mejorar primero",        mode: "primary", owner: "/" },

  // Direct-summary — homepage answers shallowly, inner page owns the depth
  { intent: "codes",            titleEn: "Is there a working code",       titleEs: "¿Hay un código activo?",      mode: "status",  owner: "/codes/" },
  { intent: "how-to-play",      titleEn: "How to play the farm loop",     titleEs: "Cómo jugar el bucle",        mode: "summary", owner: "/how-to-play/" },
  { intent: "release-date",     titleEn: "When did the game launch",      titleEs: "Cuándo salió el juego",      mode: "summary", owner: "/release-date/" },

  // Child-owned — homepage never fully answers these
  { intent: "complete-codes-table",    titleEn: "The full codes table",   titleEs: "La tabla completa de códigos", mode: "excluded", owner: "/codes/" },
  { intent: "farm-economy-strategy",   titleEn: "How to grow cash faster", titleEs: "Cómo crecer dinero más rápido", mode: "link-only", owner: "/guides/" },
  { intent: "update-log",              titleEn: "What changed recently",  titleEs: "Qué cambió hace poco",        mode: "link-only", owner: "/updates/" },
];

// Per-page back-link: when a page owns this intent, what it links back TO.
// Keeps every leaf pointing up to the homepage main engine + its siblings.
export function getIntent(owner: string): IntentOwnership | undefined {
  return intentOwnership.find((o) => o.owner === owner);
}

export function getIntentEsp(owner: string): IntentOwnership | undefined {
  return intentOwnership.find((o) => o.owner === owner);
}
