import Link from "next/link";
import type { TopicCluster } from "@/data/topic-clusters";
import { checkedDate, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";
import { AdsterraArticleBottom, AdsterraArticleMid, AdsterraArticleTop } from "@/components/ads";

export function TopicClusterPage({ cluster }: { cluster: TopicCluster }) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: cluster.parentLabel, href: cluster.parentRoute },
          { name: cluster.navTitle, href: cluster.route }
        ]}
      />
      <FaqJsonLd items={cluster.faqs} />
      <Breadcrumbs
        items={[
          { label: cluster.parentLabel, href: cluster.parentRoute },
          { label: cluster.navTitle, href: cluster.route }
        ]}
      />
      <PageIntro eyebrow={cluster.eyebrow} title={cluster.title} description={cluster.intro}>
        <div className="flex flex-wrap gap-3">
          <Link className="button-primary" href="/sources">
            Check sources
          </Link>
          <Link className="button-secondary" href={cluster.parentRoute}>
            Back to {cluster.parentLabel}
          </Link>
        </div>
      </PageIntro>
      <AdsterraArticleTop />

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <article className="content-card">
          <span className="mini-label">Demand signal</span>
          <h2 className="mt-3 text-xl font-bold text-white">Why this page exists now</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">{cluster.demandSignal}</p>
        </article>
        <article className="content-card">
          <span className="mini-label">Current answer</span>
          <h2 className="mt-3 text-xl font-bold text-white">Use this as the practical answer</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">{cluster.currentAnswer}</p>
        </article>
        <article className="content-card">
          <span className="mini-label">Updated {checkedDate}</span>
          <h2 className="mt-3 text-xl font-bold text-white">Claim status</h2>
          <p className="mt-2 text-sm leading-6 text-white/65">{cluster.verificationBoundary}</p>
        </article>
      </section>
      <AdsterraArticleMid />

      <section className="mt-10">
        <SectionHeader
          eyebrow="Answer blocks"
          title={`How to use this ${siteConfig.gameName} topic`}
          copy="Each block is written to answer a specific search intent while keeping official facts, community reports, and pending claims separate."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cluster.sections.map((section) => (
            <article key={section.title} className="content-card">
              <span className="mini-label">{section.eyebrow}</span>
              <h2 className="mt-3 text-xl font-bold text-white">{section.title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader
          eyebrow="Related routes"
          title="Keep moving through the cluster"
          copy="These pages form the internal topic cluster instead of leaving every long-tail query on one broad hub."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cluster.relatedRoutes.map((route) => (
            <Link key={route.href} href={route.href} className="content-card">
              <span className="mini-label">Related</span>
              <h2 className="mt-3 text-xl font-bold text-white">{route.label}</h2>
              <p className="mt-2 text-sm leading-6 text-white/65">{route.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow="FAQ" title={`Questions players ask about ${cluster.navTitle}`} />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cluster.faqs.map((faq) => (
            <article key={faq.q} className="content-card">
              <h2 className="text-lg font-bold text-white">{faq.q}</h2>
              <p className="mt-2 text-sm leading-6 text-white/68">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>
      <AdsterraArticleBottom />
    </main>
  );
}

export const LongTailDetailPage = TopicClusterPage;
