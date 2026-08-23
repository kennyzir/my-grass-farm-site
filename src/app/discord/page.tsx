import type { Metadata } from "next";
import { checkedDate, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";

export const metadata: Metadata = {
  title: "My Grass Farm Discord — Official Invite Status",
  description: "My Grass Farm Discord invite status. We only link the official server when we verify it from a dated official source — never a fake invite.",
  alternates: { canonical: `${siteConfig.domain}/discord` }
};

export default function DiscordPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Discord status", href: "/discord" }]} />
      <Breadcrumbs items={[{ label: "Discord status", href: "/discord" }]} />
      <PageIntro eyebrow="My Grass Farm · Community" title="Official Discord invite status" description="An honest status page: we publish a Discord invite only when we verify it from a dated official source." />
      <section className="mt-10">
        <SectionHeader
          eyebrow="Status"
          title="No unverified invite"
          copy="We do not publish a Discord invite because we have not verified an official server link from a dated first-party source. A fake invite hurts players more than a missing one — see the official Roblox game page for the most trustworthy community links."
        />
      </section>
    </main>
  );
}
