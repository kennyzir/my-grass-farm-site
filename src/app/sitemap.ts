import type { MetadataRoute } from "next";
import { checkedDate, siteConfig } from "@/data/site";

export const dynamic = "force-static";

// My Grass Farm sitemap. EN+ES content pages live under /en/ & /es/ (next-intl [locale]);
// codes/wiki/sources/legal — codes is now localized too (/en/codes + /es/codes with hreflang).
// No tier list / calculator / unit DB — this is a creation + roleplay game.
const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/en/", changeFrequency: "daily", priority: 1 },
  { path: "/en/codes", changeFrequency: "daily", priority: 0.95 },
  { path: "/es/codes", changeFrequency: "daily", priority: 0.95 },
  { path: "/wiki", changeFrequency: "weekly", priority: 0.9 },
  { path: "/sources", changeFrequency: "monthly", priority: 0.5 },
  // creation + roleplay matrix pages (EN)
  { path: "/en/how-to-play", changeFrequency: "weekly", priority: 0.85 },
  { path: "/en/how-to-play", changeFrequency: "weekly", priority: 0.85 },
  { path: "/en/how-to-play", changeFrequency: "weekly", priority: 0.85 },
  { path: "/en/codes", changeFrequency: "weekly", priority: 0.8 },
  { path: "/en/codes", changeFrequency: "weekly", priority: 0.8 },
  { path: "/en/how-to-play", changeFrequency: "monthly", priority: 0.7 },
  { path: "/en/updates", changeFrequency: "daily", priority: 0.7 },
  { path: "/en/release-date", changeFrequency: "monthly", priority: 0.7 },
  // legal
  { path: "/about", changeFrequency: "monthly", priority: 0.3 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/disclosure", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 }
];

const sitemap: () => MetadataRoute.Sitemap = () => {
  const lastmod = checkedDate;
  return routes.map((r) => ({
    url: `${siteConfig.domain}${r.path.startsWith("/") ? r.path : `/${r.path}`}`,
    lastModified: lastmod,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));
};

export default sitemap;
