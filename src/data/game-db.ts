// Game DB — single source of truth for My Grass Farm entities & systems.
// Facts from the official Roblox game API + official description
// (games.roblox.com/v1/games?universeIds=10553807383, 2026-08-23).
// claimState: Verified (official API/desc) | Community-reported | Unknown.
// Never invent a number; every fact carries its source.

export type ClaimState = "Verified" | "Community-reported" | "Unknown";

export type GameEntity = {
  slug: string;
  name: string;
  role: string;                 // what it is / does
  farmJob: string;              // which part of the farm loop it serves
  claimState: ClaimState;
  source: string;
  blurb: string;                // 1-2 sentence, player-facing
};

// Official description (verified, One More Grass, 2026-08-23):
// • Cut grass to collect hay 🌱
// • Process hay for cash 💸
// • Unlock powerful blades to cut faster 🗡️
// • Hire workers to farm for you 🧑‍🌾
// • Upgrade and Expand Your Farm! 🏡
export const gameEntities: GameEntity[] = [
  {
    slug: "hay",
    name: "Hay",
    role: "The base resource you collect by cutting grass.",
    farmJob: "Core resource",
    claimState: "Verified",
    source: "Official Roblox description (One More Grass, 2026-08-23)",
    blurb: "Cutting grass collects hay — the raw material of the whole farm economy. Everything downstream (cash, blades, workers) starts from your hay income.",
  },
  {
    slug: "cash",
    name: "Cash",
    role: "The currency you make by processing hay.",
    farmJob: "Currency / upgrades",
    claimState: "Verified",
    source: "Official Roblox description (One More Grass, 2026-08-23)",
    blurb: "Process hay for cash, then spend cash on blades, workers, and farm upgrades. Cash is what turns grass into growth.",
  },
  {
    slug: "blades",
    name: "Blades",
    role: "Cutting tools that cut grass faster.",
    farmJob: "Speed / efficiency",
    claimState: "Verified",
    source: "Official Roblox description (One More Grass, 2026-08-23)",
    blurb: "Unlock powerful blades to cut faster — the core 'optimise' lever of the tycoon. Better blades mean more hay per second, so faster cash.",
  },
  {
    slug: "workers",
    name: "Workers",
    role: "Hired helpers that farm automatically.",
    farmJob: "Automation / idle income",
    claimState: "Verified",
    source: "Official Roblox description (One More Grass, 2026-08-23)",
    blurb: "Hire workers to farm for you — the idle/auto layer. Workers keep hay and cash flowing even while you aren't actively cutting.",
  },
  {
    slug: "farm",
    name: "Farm expansion",
    role: "Upgrading and growing your farm.",
    farmJob: "Progression / endgame",
    claimState: "Verified",
    source: "Official Roblox description (One More Grass, 2026-08-23)",
    blurb: "Upgrade and expand your farm as you progress. The farm is the container that scales with your hay, cash, blades, and workers.",
  },
];

export const farmSystems: Array<{ name: string; whatItIs: string; claimState: ClaimState; source: string }> = [
  { name: "Cut grass → hay", whatItIs: "Cutting grass is your base income; every blade swing collects hay.", claimState: "Verified", source: "Official Roblox description" },
  { name: "Process hay → cash", whatItIs: "Hay converts into cash, the currency for every upgrade.", claimState: "Verified", source: "Official Roblox description" },
  { name: "Blades → faster cutting", whatItIs: "Unlock and upgrade blades to raise hay-per-second.", claimState: "Verified", source: "Official Roblox description" },
  { name: "Workers → automation", whatItIs: "Hired workers farm for you, adding idle income.", claimState: "Verified", source: "Official Roblox description" },
  { name: "Upgrade & expand farm", whatItIs: "Scaling the farm is the long-run goal of the tycoon.", claimState: "Verified", source: "Official Roblox description" },
];

export const offlineNote: GameEntity = {
  slug: "offline-workers",
  name: "Offline workers",
  role: "Hired workers keep farming even when you leave the game.",
  farmJob: "Idle income / QoL",
  claimState: "Community-reported",
  source: "Creator video description (0jim8W_7URc, MY GRASS FARM CODES, 2026-08-23): \"your farmers cut grass while you're offline!\"",
  blurb: "A creator video confirms workers keep cutting grass while you're offline — so hiring workers has value beyond your active session. Treat workers as your always-on income layer.",
};

export const gameGenre = "Tycoon";         // official genre_l2, games API 2026-08-23
export const gameGenreL1 = "Simulation";
export const gameCreator = "One More Grass";   // group creator
export const gameCreatedIso = "2026-07-23";
export const gameUpdatedIso = "2026-08-24";
export const gamePlaceId = "98073123711869";
export const gameUniverseId = "10553807383";
export const gameVisits = 830266;          // games API 2026-08-24
export const gamePlaying = 3192;           // games API 2026-08-24
export const gameFavorites = 3759;

export function getGameEntity(slug: string) {
  return gameEntities.find((e) => e.slug === slug);
}

export const gameUpVotes = 6307;           // games API votes 2026-08-24
export const gameDownVotes = 272;          // games API votes 2026-08-24
export const gameRatingPct = Math.round((gameUpVotes / (gameUpVotes + gameDownVotes)) * 100);
