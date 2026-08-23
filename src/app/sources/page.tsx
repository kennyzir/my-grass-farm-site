import type { Metadata } from "next";
import { checkedDate, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";

export const metadata: Metadata = {
  title: "My Grass Farm — Source Status",
  description: "An honest ledger of what we verified on the My Grass Farm fan wiki, when, and from what source.",
  alternates: { canonical: `${siteConfig.domain}/sources` }
};

export default function SourcesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Sources", href: "/sources" }]} />
      <Breadcrumbs items={[{ label: "Sources", href: "/sources" }]} />
      <PageIntro eyebrow="My Grass Farm · Verifiability" title="Source status" description="Every claim on this wiki carries a source and a claim-state label (Verified or Community-reported). Nothing is invented." />

      <section className="mt-10">
        <SectionHeader eyebrow="Verified" title="What we verify" copy="Claims marked Verified come from a dated, current source we can point to — most often the official Roblox game page or an official YouTube drop." />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p><strong className="text-white">Game identity</strong> — from the official Roblox game page (place 98073123711869, "My Grass Farm"). Verified.</p>
          <p><strong className="text-white">Created date</strong> — 2026-07-31 from the Roblox games API. Verified.</p>
          <p><strong className="text-white">Genre</strong> — Morph Roleplay from the official Roblox page. Verified.</p>
          <p><strong className="text-white">Code mechanism</strong> — official YouTube video describes Store → Rewards redemption. Verified.</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Community" title="What we label Community-reported" copy="Gameplay and build details reflect the current build (updated 23 August 2026). Exact numbers are Community-reported unless confirmed in-game." />
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="Honesty" title="What we do not publish" copy="We do not publish stats, odds, or links we cannot source — including Discord invites we have not verified. A missing link is better than a fake one." />
      </section>
    </main>
  );
}
