import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const sitePath = path.join(root, "src", "data", "site.ts");
const sourcesPath = path.join(root, "src", "app", "sources", "page.tsx");
const statusPath = path.join(root, "src", "data", "update-status.json");
const universeId = "10261267004";
const votesUrl = `https://games.roblox.com/v1/games/votes?universeIds=${universeId}`;
const gameUrl = `https://games.roblox.com/v1/games?universeIds=${universeId}`;
const execFileAsync = promisify(execFile);
const userAgent = "storagehuntersopenworld-content-updater/1.0";
const requiredTopicRoutes = [
  "/lost-items",
  "/mutations",
  "/containers",
  "/exclusive-items",
  "/safes",
  "/quests",
  "/forecourt-cleanup",
  "/cargo-ship",
  "/best-money-method",
  "/gamepasses",
  "/basketball-quest",
  "/discord",
  "/gems",
  "/luck",
  "/auction-guide",
  "/shop-upgrades"
];

const now = new Date();
const checkedDate = process.env.CONTENT_UPDATE_DATE || now.toISOString().slice(0, 10);
const monthLabel = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC"
}).format(new Date(`${checkedDate}T00:00:00Z`));
const longDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC"
}).format(new Date(`${checkedDate}T00:00:00Z`));

function formatRobloxTimestampLabel(value) {
  if (!value) return "the public update timestamp was unavailable";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "the public update timestamp was unavailable";
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  }).format(parsed);
  return `the public update timestamp advanced to ${formatted} without a code announcement`;
}

function compactNumber(value) {
  if (!Number.isFinite(value)) return "0";
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M+`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
}

function fullNumber(value) {
  return Number.isFinite(value) ? value.toLocaleString("en-US") : "0";
}

function likeRatio(upVotes, downVotes) {
  const total = upVotes + downVotes;
  if (!total) return "Unavailable";
  return `${((upVotes / total) * 100).toFixed(1)}%`;
}

function hasVoteMetrics(metrics) {
  return metrics.upVotes + metrics.downVotes > 0;
}

async function fetchRobloxMetrics() {
  const payload = await fetchJson(gameUrl);
  const game = payload?.data?.[0];
  if (!game) {
    throw new Error("Roblox API response did not include game data");
  }

  let upVotes = Number(game.upVotes ?? 0);
  let downVotes = Number(game.downVotes ?? 0);

  if (!upVotes && !downVotes) {
    try {
      const votesPayload = await fetchJson(votesUrl);
      const votes = votesPayload?.data?.[0];
      upVotes = Number(votes?.upVotes ?? 0);
      downVotes = Number(votes?.downVotes ?? 0);
    } catch {
      // Preserve the main metrics snapshot even if the vote endpoint is unavailable.
    }
  }

  return {
    name: game.name,
    visits: Number(game.visits ?? 0),
    playing: Number(game.playing ?? 0),
    favorites: Number(game.favoritedCount ?? 0),
    upVotes,
    downVotes,
    updated: game.updated ?? null
  };
}

async function fetchJson(url) {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": userAgent, Accept: "application/json" }
    });

    if (!response.ok) {
      throw new Error(`Roblox API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    const stdout = await fetchJsonWithCurl(url, error);
    return JSON.parse(stdout);
  }
}

async function fetchJsonWithCurl(url, originalError) {
  try {
    const { stdout } = await execFileAsync("curl.exe", [
      "--silent",
      "--show-error",
      "--fail",
      "--location",
      "--user-agent",
      userAgent,
      "--header",
      "Accept: application/json",
      url
    ]);

    return stdout;
  } catch {
    throw originalError;
  }
}

function topicRouteToPagePath(route) {
  return path.join(root, "src", "app", route.replace(/^\//, ""), "page.tsx");
}

function validateTopicRoutes(siteSource) {
  const missingFiles = requiredTopicRoutes.filter((route) => !existsSync(topicRouteToPagePath(route)));
  const missingSitemapRoutes = requiredTopicRoutes.filter((route) => !siteSource.includes(route));

  if (missingFiles.length || missingSitemapRoutes.length) {
    throw new Error(
      [
        missingFiles.length ? `Missing topic page files: ${missingFiles.join(", ")}` : "",
        missingSitemapRoutes.length ? `Missing topic routes from data/sitemap import path: ${missingSitemapRoutes.join(", ")}` : ""
      ]
        .filter(Boolean)
        .join("; ")
    );
  }
}

function replaceConst(source, name, value) {
  return source.replace(new RegExp(`export const ${name} = ".*?";`), `export const ${name} = "${value}";`);
}

function replaceHeroMetrics(source, metrics) {
  const ratioLine = hasVoteMetrics(metrics)
    ? `{ label: "Like ratio", value: "${likeRatio(metrics.upVotes, metrics.downVotes)}", note: "${fullNumber(metrics.upVotes)} upvotes and ${fullNumber(metrics.downVotes)} downvotes in the snapshot" }`
    : `{ label: "Like ratio", value: "Unavailable", note: "Vote totals were not included in the latest Roblox API snapshot" }`;
  const block = `export const heroMetrics: HeroMetric[] = [
  { label: "Code status", value: "None", note: "No active codes verified on ${longDate}" },
  { label: "Roblox visits", value: "${compactNumber(metrics.visits)}", note: "${fullNumber(metrics.visits)} visits in the latest ${longDate} Roblox API snapshot" },
  { label: "Players now", value: "${compactNumber(metrics.playing)}", note: "${fullNumber(metrics.playing)} playing in the same official snapshot" },
  ${ratioLine}
];`;

  return source.replace(/export const heroMetrics: HeroMetric\[\] = \[[\s\S]*?\];/, block);
}

function replaceCodeReward(source, metrics) {
  const voteClause = hasVoteMetrics(metrics)
    ? `, and about a ${likeRatio(metrics.upVotes, metrics.downVotes)} like ratio from ${fullNumber(metrics.upVotes)} upvotes versus ${fullNumber(metrics.downVotes)} downvotes`
    : ". Vote totals were not included in this Roblox API snapshot";
  const reward = `The latest ${longDate} Roblox snapshot reached ${fullNumber(metrics.visits)} visits with ${fullNumber(metrics.playing)} current players and ${fullNumber(metrics.favorites)} favorites${voteClause}. Public source checks still require creator-owned proof before this site lists any active Storage Hunters Open World code, reward, expiry, or redeem UI claim.`;

  return source.replace(
    /code: "NONE VERIFIED",\r?\n    reward: ".*?",\r?\n    status: "Verified",/s,
    `code: "NONE VERIFIED",\n    reward: "${reward}",\n    status: "Verified",`
  );
}

function buildCodeStatusSnapshot(metrics) {
  const voteClause = hasVoteMetrics(metrics)
    ? `, and about a ${likeRatio(metrics.upVotes, metrics.downVotes)} like ratio from ${fullNumber(metrics.upVotes)} upvotes versus ${fullNumber(metrics.downVotes)} downvotes`
    : ", while vote totals were not included in this Roblox API snapshot";

  return `${fullNumber(metrics.visits)} visits, ${fullNumber(metrics.playing)} current players, ${fullNumber(metrics.favorites)} favorites${voteClause}`;
}

function replaceCodeFaq(source, metrics) {
  const answer = `No active codes were verified on ${longDate}. Creator Exchange still exposed the game with an empty public codes list, the latest official Roblox snapshot climbed to ${buildCodeStatusSnapshot(metrics)} while ${formatRobloxTimestampLabel(metrics.updated)}, the closest dated no-code report still said no code box, and recent pages from Destructoid, Games.gg, Pocket Tactics, PCGamesN, and Pro Game Guides still did not prove a live redeem UI or creator-owned code post.`;

  return source.replace(
    /q: "Are there any active Storage Hunters Open World codes\?",\r?\n      a: ".*?"/s,
    `q: "Are there any active Storage Hunters Open World codes?",\n      a: "${answer}"`
  );
}

function replaceSourcesSnapshot(source, metrics) {
  const snapshot = buildCodeStatusSnapshot(metrics);
  const updateClause = formatRobloxTimestampLabel(metrics.updated);

  return source.replace(
    /the latest .*? Roblox snapshot at [\s\S]*?(?:plus|while) .*? without a code announcement, still do not verify a live code menu or creator-owned code post\./,
    `the latest ${longDate} Roblox snapshot at ${snapshot}, while ${updateClause}, still do not verify a live code menu or creator-owned code post.`
  );
}

let metrics;
let sourceStatus = "roblox-api";
try {
  metrics = await fetchRobloxMetrics();
} catch (error) {
  sourceStatus = `fallback: ${error instanceof Error ? error.message : "unknown error"}`;
  metrics = null;
}

let siteSource = await readFile(sitePath, "utf8");
validateTopicRoutes(siteSource);

siteSource = replaceConst(siteSource, "checkedDate", checkedDate);
siteSource = replaceConst(siteSource, "monthLabel", monthLabel);
siteSource = siteSource.replace(
  /freshnessLabel: ".*?"/,
  `freshnessLabel: "codes, topic clusters, wiki, and source status refreshed on ${longDate}"`
);

if (sourceStatus === "roblox-api" && metrics) {
  siteSource = replaceHeroMetrics(siteSource, metrics);
  siteSource = replaceCodeReward(siteSource, metrics);
  siteSource = replaceCodeFaq(siteSource, metrics);
}

await writeFile(sitePath, siteSource);

if (sourceStatus === "roblox-api" && metrics) {
  const sourcesSource = await readFile(sourcesPath, "utf8");
  await writeFile(sourcesPath, replaceSourcesSnapshot(sourcesSource, metrics));
}

await mkdir(path.dirname(statusPath), { recursive: true });
await writeFile(
  statusPath,
  `${JSON.stringify(
    {
      status: "completed",
      updatedAt: now.toISOString(),
      checkedDate,
      monthLabel,
      sourceStatus,
      universeId,
      roblox: metrics ? { ...metrics, voteTotalsAvailable: hasVoteMetrics(metrics) } : null,
      requiredTopicRoutes,
      notes: [
        "Daily updater refreshes current date and Roblox public metrics when available.",
        "Topic route validation fails if the required cluster pages are removed.",
        "The updater does not invent active codes, rewards, odds, route math, loot tables, or official Trello claims."
      ]
    },
    null,
    2
  )}\n`
);

console.log(`Content update completed for ${checkedDate} (${sourceStatus}).`);
