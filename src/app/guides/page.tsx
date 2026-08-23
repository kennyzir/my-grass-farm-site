import type { Metadata } from "next";
import Link from "next/link";
import { monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { gameGenre, gameCreator, gameEntities } from "@/data/game-db";
import { AdsterraArticleBottom, AdsterraArticleTop, AdsterraArticleMid } from "@/components/ads";

export const metadata: Metadata = {
  title: `${siteConfig.gameName} Guides — Grow Your Farm · ${monthLabel}`,
  description: `My Grass Farm guides: cut grass, collect hay, process it for cash, unlock blades, hire workers, and track codes and updates.`,
  alternates: { canonical: `${siteConfig.domain}/guides` }
};

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]} />
      <FaqJsonLd items={[
        { q: "What is the fastest way to start in My Grass Farm?", a: "Enter the game and start cutting grass. The official loop is cut grass → collect hay → process for cash → unlock blades → hire workers. The how-to-play guide walks the first day." },
        { q: "What should a new player upgrade first?", a: "The blade. Blades raise hay-per-second, which is the whole economy — faster cutting means more hay, more cash, and quicker growth." },
        { q: "What are blades and workers for?", a: "Blades cut faster (raising income) and workers harvest automatically. Both scale the farm economy; blades matter early, workers add idle growth." },
        { q: "Are there active codes?", a: "We only list verified codes from an official source. If none are confirmed, the codes page says so honestly." }
      ]} />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }]} />
      <VerificationBox />
      <PageIntro eyebrow="My Grass Farm · Guides" title="My Grass Farm Guides" description={`Focused guides for ${siteConfig.gameName}: what it is (a ${gameGenre} by ${gameCreator}), how to grow the farm economy (hay → cash → blades → workers). Every guide carries its source and claim state.`} />
      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader eyebrow="First" title="Start by cutting grass" copy="My Grass Farm is an incremental farm tycoon. The official loop is: cut grass → collect hay 🌱 → process hay for cash 💸 → unlock powerful blades 🗡️ → hire workers 🧑‍🌾 → expand your farm 🏡. Your first session is about feeling that loop: cutting grass builds your hay income, hay becomes cash, and cash buys the upgrades that make you faster. Start by cutting, then reinvest in a blade."
/>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link href="/en/how-to-play" className="content-card"><strong>How to play</strong><p className="mt-1 text-sm text-white/60">The full first-day farm loop: hay, cash, blades, workers.</p></Link>
          <Link href="/en/codes" className="content-card"><strong>Redeem codes</strong><p className="mt-1 text-sm text-white/60">Verified reward code status — or an honest none-yet.</p></Link>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Economy" title="Grow your farm, piece by piece" copy={`The farm is made of pieces, each with a farm job. Build the income first (hay and cash), then reinvest in blades (speed) and workers (automation). Here's the roster from the official description:`} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          {gameEntities.map((e) => (
            <div key={e.slug} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{e.name}</strong> <span className="text-white/50">({e.farmJob})</span>
              <p className="mt-1 text-white/65">{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <AdsterraArticleMid />

      <section className="mt-10">
        <SectionHeader eyebrow="Track" title="Keep current with updates & codes" copy="As a recent, fast-changing game, staying current matters. The updates page tracks real changes, and the codes page reports only verified rewards — never invented code strings." />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Link href="/en/updates" className="content-card"><strong>Updates</strong><p className="mt-1 text-sm text-white/60">What changed in the latest My Grass Farm update.</p></Link>
          <Link href="/en/codes" className="content-card"><strong>Codes</strong><p className="mt-1 text-sm text-white/60">Verified reward code status, or an honest empty state.</p></Link>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Where to go next" title="Explore the wiki" copy="The wiki hub ties everything together — what the game is, the hay/cash/blade/worker farm economy, codes, and our honest sourcing policy. Use it as your map of the whole resource." />
        <div className="mt-4 grid gap-3">
          <Link href="/wiki" className="row-link"><span><strong>Wiki hub</strong><small>The full map: what My Grass Farm is, how to grow, codes, and updates.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/sources" className="row-link"><span><strong>Source status</strong><small>Our ledger of what's verified and when for each claim.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/en/release-date" className="row-link"><span><strong>Release date</strong><small>When My Grass Farm launched and its early growth.</small></span><span aria-hidden="true">-&gt;</span></Link>
        </div>
      </section>

      <AdsterraArticleBottom />
    </main>
  );
}
