import type { Metadata } from "next";
import Link from "next/link";
import { monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { gameGenre, gameCreator, gameEntities, farmSystems } from "@/data/game-db";
import { AdsterraArticleBottom, AdsterraArticleTop, AdsterraArticleMid } from "@/components/ads";

export const metadata: Metadata = {
  title: `${siteConfig.gameName} Wiki — My Grass Farm Hub · ${monthLabel}`,
  description: `A focused fan wiki for My Grass Farm: cut grass, collect hay, process it for cash, unlock blades, and hire workers — plus codes, updates, and honest sourcing.`,
  alternates: { canonical: `${siteConfig.domain}/wiki` }
};

export default function WikiPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Wiki", href: "/wiki" }]} />
      <FaqJsonLd items={[
        { q: "What is My Grass Farm?", a: `A ${gameGenre} on Roblox by ${gameCreator}: you cut grass, collect hay, process it for cash, unlock blades, and hire workers to expand your farm.` },
        { q: "Is it a combat game?", a: "No — it's an incremental farm tycoon. The official loop is cut grass → hay → cash → blades → workers → farm expansion, not combat." },
        { q: "What are hay, cash, blades, and workers?", a: "Hay is the base resource you collect by cutting grass; cash comes from processing hay; blades cut faster; workers automate harvesting. This split is straight from the official description." },
        { q: "How do I get codes?", a: "We list only codes we can verify from an official source. If none are confirmed, the codes page says so honestly." },
        { q: "When did My Grass Farm launch?", a: "My Grass Farm was created 23 July 2026 per the official Roblox API. See the release date page for details." }
      ]} />
      <Breadcrumbs items={[{ label: "Wiki", href: "/wiki" }]} />
      <VerificationBox />
      <PageIntro eyebrow="My Grass Farm · Wiki" title="My Grass Farm Wiki Explorer" description={`A focused fan wiki for ${siteConfig.gameName}: what it is (a ${gameGenre} by ${gameCreator}), how to play, the hay/cash/blade/worker farm loop, and how to track codes and updates. This is an unofficial fan resource: every piece of info carries its source and claim state.`} />
      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader eyebrow="What it is" title="A farm tycoon you grow by cutting grass" copy={`My Grass Farm is a ${gameGenre} on Roblox by ${gameCreator}. The official description sums the loop up: "Cut grass to collect hay 🌱, process hay for cash 💸, unlock powerful blades to cut faster 🗡️, hire workers to farm for you 🧑‍🌾, upgrade and expand your farm 🏡." It is an incremental farm economy — you turn grass into cash and reinvest it in speed and automation.`} />
        <p className="mt-4 rounded-lg border border-white/10 bg-black/20 p-5 text-sm leading-7 text-white/75">It is not a combat game: the focus is the farm tycoon loop and growing it over time. As a recent game (released 23 July 2026) it changes fast, and this wiki updates as changes are confirmed rather than guessing patch notes.</p>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="The farm" title="Your farm's economy" copy={`The official description frames the farm system as: ${farmSystems.map(s=>s.name).join(" → ")}. Each piece has a distinct farm job:`} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          {gameEntities.map((e) => (
            <div key={e.slug} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{e.name}</strong> <span className="text-white/50">({e.farmJob})</span>
              <p className="mt-1 text-white/65">{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Play" title="Play: learn the core loop" copy="Your first session is a farm-economy loop: cut grass → collect hay → process for cash → reinvest in blades (faster cutting) and workers (automation). Get the full first-day route below." />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link href="/en/how-to-play" className="content-card"><strong>How to play</strong><p className="mt-1 text-sm text-white/60">The farm loop: hay economy, blades, workers.</p></Link>
          <Link href="/en/release-date" className="content-card"><strong>Release date & history</strong><p className="mt-1 text-sm text-white/60">When it launched, its genre, and its early popularity.</p></Link>
          <Link href="/guides" className="content-card"><strong>Guides</strong><p className="mt-1 text-sm text-white/60">Grow your farm, unlock blades, track updates.</p></Link>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Fresh" title="Track: codes, updates, history" copy="As a young, rapidly-changing game, keeping current matters. The codes page reports only verified rewards, the updates page tracks real changes, and the release date page anchors the game's history." />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link href="/en/codes" className="content-card"><strong>Codes</strong><p className="mt-1 text-sm text-white/60">Verified reward code status, or an honest 'none confirmed yet'.</p></Link>
          <Link href="/en/updates" className="content-card"><strong>Updates</strong><p className="mt-1 text-sm text-white/60">What changed in the latest My Grass Farm update.</p></Link>
          <Link href="/en/release-date" className="content-card"><strong>Release date</strong><p className="mt-1 text-sm text-white/60">Created 23 July 2026 — the game's official data.</p></Link>
        </div>
      </section>

      <AdsterraArticleMid />

      <section className="mt-10">
        <SectionHeader eyebrow="How we verify" title="Honest sourcing" copy="This is an unofficial fan resource. My Grass Farm and its developers remain the source of record — we never invent a code, mechanic, or update. Facts above trace to the official Roblox description (cut grass → hay → cash → blades → workers), the Roblox API, and dated creator videos." />
        <p className="mt-4 text-sm leading-7 text-white/70">Changes only count if they come from the official Roblox game page or a dated source. Anything we cannot date or source is labeled as unconfirmed rather than guessed. The source status page is our ledger.</p>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Sources" title="Source status & more" copy="Explore the rest of the wiki — the source ledger, and quick access to every page." />
        <div className="mt-4 grid gap-3">
          <Link href="/sources" className="row-link"><span><strong>Source status page</strong><small>What we verified and when for each claim on this wiki.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/guides" className="row-link"><span><strong>Guides hub</strong><small>Grow your farm, unlock blades, track updates.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/en/how-to-play" className="row-link"><span><strong>How to play</strong><small>The farm loop and first-day progression.</small></span><span aria-hidden="true">-&gt;</span></Link>
        </div>
      </section>

      <AdsterraArticleBottom />
    </main>
  );
}
