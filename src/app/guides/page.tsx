import type { Metadata } from "next";
import Link from "next/link";
import { monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { MainEngineBacklink } from "@/components/ui/MainEngineBacklink";
import { gameGenre, gameCreator, gameEntities, offlineNote, gameVisits, gamePlaying, gameUpdatedIso } from "@/data/game-db";
import { AdsterraArticleBottom, AdsterraArticleTop, AdsterraArticleMid } from "@/components/ads";

export const metadata: Metadata = {
  title: `${siteConfig.gameName} Guides — Grow Faster & Spend Smarter · ${monthLabel}`,
  description: `My Grass Farm progression guides: what to upgrade first, how to maximize hay income, and the offline-worker trick that earns cash while you're away.`,
  alternates: { canonical: `${siteConfig.domain}/guides` }
};

export default function GuidesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }]} />
      <FaqJsonLd items={[
        { q: "What should I upgrade first in My Grass Farm?", a: "The blade. A faster blade raises hay-per-second, which lifts every downstream step (hay → cash → more blades and workers). Workers come second — they add automation and, notably, keep farming while you're offline." },
        { q: "Do workers keep farming when I'm offline?", a: "Yes. The official description confirms workers cut grass while you're offline, so hiring workers gives you always-on income — a key reason workers are worth the cash early." },
        { q: "Is there a fastest way to earn cash?", a: "The loop is the strategy: keep both the blade and workers growing together. Blades raise active cutting speed; workers add passive/offline income. Skipping workers to only buy blades caps your growth." },
      ]} />
      <Breadcrumbs items={[{ label: "Guides", href: "/guides" }]} />
      <PageIntro eyebrow="My Grass Farm · Guides" title="Grow faster & spend smarter" description={`Beyond the first day: what to upgrade first, how the blade + worker loop compounds, and the offline-income trick most new players miss. Grounded in the official description, not invented numbers.`} />
      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader eyebrow="Priorities" title="What to upgrade first" copy={`There is no published price table the developers have shared, so we won't invent one. What the official loop makes clear is the order of value: the blade is the engine. A faster blade means more hay per second, which means more cash, which means more upgrades. So early on, reinvest in the blade before piling cash into anything else.`} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          {gameEntities.map((e) => (
            <div key={e.slug} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{e.name}</strong> <span className="text-white/50">— {e.farmJob}</span>
              <p className="mt-1 text-white/65">{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Idle income" title="The offline-worker trick" copy={offlineNote.blurb} />
        <p className="mt-4 text-sm leading-7 text-white/75">
          {`This is the single most useful thing to know about ${siteConfig.gameName}: workers earn while you're away. The official description says it directly — "your farmers cut grass while you're offline." That means workers are not a luxury; they are the passive-income layer. A new player who only buys blades is leaving cash on the table every minute they're not playing. Hire workers early, and treat them as part of the core loop, not an afterthought.`}
        </p>
      </section>

      <AdsterraArticleMid />

      <section className="mt-10">
        <SectionHeader eyebrow="FAQ" title="Quick answers" />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p><strong className="text-white">What should I upgrade first?</strong> — The blade. It raises hay-per-second, which lifts every other step. Workers come second for the offline income.</p>
          <p><strong className="text-white">Do workers farm while I'm offline?</strong> — Yes, the official description confirms it. That's why workers are worth hiring early, not late.</p>
          <p><strong className="text-white">Is there a fastest way to earn cash?</strong> — Grow the blade and workers together. Blades raise active speed, workers add passive income; skipping one caps your growth.</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Strategy" title="The blade + worker compounding loop">
          <p className="mt-3 text-sm leading-7 text-white/75">
            {`${siteConfig.gameName} is a compounding economy: the blade raises active income, and workers add passive income — and both feed back into more of each. The growth path is not "max one, ignore the other" but "grow both together." Cut grass to build hay, process hay into cash, and split each cash chunk between a faster blade and one more worker. That balance is what turns a slow start into a growing farm.`}{" "}
            Never played the loop before? Start with the <Link href="/en/how-to-play" className="font-semibold text-[color:var(--accent)] hover:underline">how-to-play first-day route</Link>, and grab the <Link href="/en/codes" className="font-semibold text-[color:var(--accent)] hover:underline">RELEASE and MERCHANT codes</Link> to kick-start your first farm.
          </p>
        </SectionHeader>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Track" title="The numbers that tell the story" copy={`As of ${gameUpdatedIso}, the official API shows ~${(gameVisits/1000).toFixed(0)}K visits and ~${gamePlaying.toLocaleString()} playing — a fast start for a ${gameGenre} from ${gameCreator}. These are live numbers, and they're why the "grow both" loop matters: the game is competitive enough that efficient reinvestment is the difference between a slow grind and a compounding farm.`} />
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Where to go next" title="Deepen the loop" copy="You have the strategy. Now go deeper on the specific pieces." />
        <div className="mt-4 grid gap-3">
          <Link href="/en/how-to-play" className="row-link"><span><strong>How to play</strong><small>The first-day route, step by step.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/en/codes" className="row-link"><span><strong>Codes</strong><small>RELEASE and MERCHANT, and how to redeem them.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/en/updates" className="row-link"><span><strong>Updates</strong><small>What changed and where updates get announced.</small></span><span aria-hidden="true">-&gt;</span></Link>
          <Link href="/wiki" className="row-link"><span><strong>Wiki hub</strong><small>The full map of My Grass Farm.</small></span><span aria-hidden="true">-&gt;</span></Link>
        </div>
      </section>

      <AdsterraArticleBottom />
      <div className="mt-12"><VerificationBox /></div>
      <MainEngineBacklink />
    </main>
  );
}
