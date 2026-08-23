import { faqs, siteConfig } from "@/data/site";

function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.domain,
        description: siteConfig.description,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.domain}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: `${siteConfig.gameName} Mutation Value Calculator`,
        operatingSystem: "Web",
        applicationCategory: "GameApplication",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        description: `Free ${siteConfig.gameName} Roblox fan wiki — codes, OC and outfit ideas, and creation tutorials.`
      }}
    />
  );
}

export function FaqJsonLd({ items = faqs.home }: { items?: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a
          }
        }))
      }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name,
        description,
        step: steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
          url: step.url
        }))
      }}
    />
  );
}

export function ClaimReviewJsonLd({
  claim,
  itemReviewed,
  author,
  datePublished,
  rating
}: {
  claim: string;
  itemReviewed: { name: string; type: string };
  author: { name: string; url?: string };
  datePublished: string;
  rating: { ratingValue: number; bestRating: number; worstRating: number; alternateName: string };
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ClaimReview",
        claimReviewed: claim,
        itemReviewed: {
          "@type": itemReviewed.type,
          name: itemReviewed.name
        },
        author: {
          "@type": "Organization",
          name: author.name,
          url: author.url
        },
        datePublished,
        reviewRating: {
          "@type": "Rating",
          ratingValue: rating.ratingValue,
          bestRating: rating.bestRating,
          worstRating: rating.worstRating,
          alternateName: rating.alternateName
        }
      }}
    />
  );
}

export function VideoGameJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoGame",
        name: siteConfig.gameName,
        description: siteConfig.description,
        url: siteConfig.domain,
        applicationCategory: "Game",
        operatingSystem: "Any",
        genre: "Colony Sim",
        publisher: {
          "@type": "Organization",
          name: `${siteConfig.gameName} Fan Wiki`
        },
        author: {
          "@type": "Organization",
          name: `${siteConfig.gameName} Fan Wiki`
        }
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.domain}${item.href}`
        }))
      }}
    />
  );
}
