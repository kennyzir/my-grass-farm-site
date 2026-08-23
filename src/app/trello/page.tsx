import type { Metadata } from "next";
import Link from "next/link";
import { gameConfig } from "@/data/game.config";
import { monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";
import { AdsterraArticleBottom, AdsterraArticleMid, AdsterraArticleTop } from "@/components/ads";

export const metadata: Metadata = {
  title: `${siteConfig.gameName} Discord & Wiki Status (${monthLabel})`,
  description: `Community source status for ${siteConfig.gameName}: the official Roblox page, Discord, and any community wiki.`,
  alternates: { canonical: `${siteConfig.domain}/trello` },
  openGraph: {
    title: `${siteConfig.gameName} Discord & Wiki Status (${monthLabel})`,
    description: `Community source status for ${siteConfig.gameName}: official Roblox page, Discord, and wiki.`,
    url: `${siteConfig.domain}/trello`,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.gameName} Discord & Wiki Status (${monthLabel})`,
    description: `Community source status for ${siteConfig.gameName}: official Roblox page, Discord, and wiki.`,
    images: ["/opengraph-image"]
  }
};

const statusRows = [
  {
    label: "Official Roblox page",
    href: gameConfig.dataSources.officialGameUrl,
    status: "Primary source",
    note: "Source of record for the game title, creator, Roblox availability, up/down votes, and live update text."
  },
  {
    label: "Discord",
    href: "/discord",
    status: "Community signal, creator invite unresolved",
    note: "Seek the official Discord invite from the game's Roblox page — never a random link. This site tracks invite status as a monitored community signal, not a creator-verified source, until a creator-owned invite is confirmed."
  },
  {
    label: "Wiki",
    href: "#",
    status: "No official wiki on file",
    note: "This site is the focused My Grass Farm wiki hub (/wiki). If the developer publishes an official wiki, it becomes the source of record and wins over community content."
  }
];

export default function CommunityStatusPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Community status", href: "/trello" }]} />
      <Breadcrumbs items={[{ label: "Community status", href: "/trello" }]} />
      <PageIntro
        eyebrow="Community status"
        title={`${siteConfig.gameName} Discord & Wiki Status`}
        description="Check which My Grass Farm community sources are official, which are community-run, and where to confirm codes and updates. The official Roblox page wins when sources disagree."
      />
      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader
          eyebrow="Source status"
          title="Which community sources to trust"
          copy="No official My Grass Farm Trello or wiki is confirmed. Use the official Roblox page as the baseline, and treat Discord and community wikis as monitored signals until a creator-owned source is confirmed."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {statusRows.map((item) => {
            const isInternal = item.href.startsWith("/");
            const hasLink = item.href !== "#";
            const content = (
              <>
                <span className="mini-label">{item.status}</span>
                <h2 className="mt-3 text-xl font-bold text-white">{item.label}</h2>
                <p className="mt-2 text-sm leading-6 text-white/65">{item.note}</p>
              </>
            );

            if (!hasLink) {
              return (
                <article key={item.label} className="content-card">
                  {content}
                </article>
              );
            }

            return isInternal ? (
              <Link key={item.label} href={item.href} className="content-card">
                {content}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="content-card" target="_blank" rel="noreferrer">
                {content}
              </a>
            );
          })}
        </div>
      </section>
      <AdsterraArticleMid />

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Link href="/discord" className="content-card">
          <span className="mini-label">Discord</span>
          <h2 className="mt-3 text-xl font-bold text-white">Discord server status</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">Where to find the official invite and how to avoid fake links.</p>
        </Link>
        <Link href="/en/codes" className="content-card">
          <span className="mini-label">Freshness</span>
          <h2 className="mt-3 text-xl font-bold text-white">Codes verification</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">Check the creator-reported code batch — evidence-gated, never invented.</p>
        </Link>
        <Link href="/wiki" className="content-card">
          <span className="mini-label">Wiki</span>
          <h2 className="mt-3 text-xl font-bold text-white">My Grass Farm wiki hub</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">Units, gems, gold, accessories, stars, traits, story — all in one focused hub.</p>
        </Link>
        <Link href="/sources" className="content-card">
          <span className="mini-label">Editorial</span>
          <h2 className="mt-3 text-xl font-bold text-white">Source checklist</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">Keep official, community, and video evidence separated so updates stay auditable.</p>
        </Link>
      </section>
      <AdsterraArticleBottom />
    </main>
  );
}
