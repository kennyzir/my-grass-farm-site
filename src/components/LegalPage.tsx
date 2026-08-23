import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/data/site";

type LegalKind = "about" | "contact" | "privacy" | "terms" | "disclosure";

type LegalSection = {
  title: string;
  body: ReactNode;
};

type LegalPageContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

function hostName() {
  return siteConfig.domain.replace(/^https?:\/\//, "").replace(/^www\./, "");
}

function contactEmail() {
  return `contact@${hostName()}`;
}

function MailLink({ children }: { children?: ReactNode }) {
  const email = contactEmail();

  return (
    <a
      className="font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
      href={`mailto:${email}`}
    >
      {children ?? email}
    </a>
  );
}

const legalPages: Record<LegalKind, LegalPageContent> = {
  about: {
    eyebrow: "About",
    title: `About ${siteConfig.name}`,
    description: `${siteConfig.name} is an independent Roblox fan resource for ${siteConfig.gameName}, maintained for players who want source-aware guides, tools, and update checks.`,
    sections: [
      {
        title: "Who runs this site",
        body: (
          <>
            The site is edited by an independent fan-site maintainer who reviews public Roblox pages, creator-owned
            channels, community signals, and in-game-facing evidence before publishing guidance. It is not operated by
            Roblox or the game creator.
          </>
        )
      },
      {
        title: "Editorial standard",
        body: (
          <>
            Guides, code lists, rankings, and status notes separate official facts, community reports, and unverified
            claims. When a claim cannot be confirmed, the page should say so instead of turning it into fake certainty.
          </>
        )
      },
      {
        title: "Corrections",
        body: (
          <>
            Send corrections, source updates, rights concerns, or privacy questions to <MailLink />. Include the page
            URL, the claim in question, and the source or date that supports the update.
          </>
        )
      }
    ]
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact Us",
    description: "Use this page for site corrections, source updates, privacy questions, rights concerns, and editorial feedback.",
    sections: [
      {
        title: "Email",
        body: (
          <>
            Contact the site maintainer at <MailLink />. Include the affected URL, a short description of the issue, and
            any public source that supports the change.
          </>
        )
      },
      {
        title: "Official support boundary",
        body: (
          <>
            This site cannot help with Roblox account access, purchases, bans, moderation, private messages, or official
            game support. Use Roblox and creator-owned support channels for those requests.
          </>
        )
      },
      {
        title: "Privacy and rights requests",
        body: (
          <>
            Privacy questions, content corrections, takedown concerns, and rights requests can be sent through the same
            email path. Do not include Roblox passwords, payment details, or private account recovery information.
          </>
        )
      }
    ]
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    description:
      "This Privacy Policy explains analytics, advertising, third-party cookies, external links, children/privacy boundaries, retention, and contact options for this fan site.",
    sections: [
      {
        title: "No Roblox account handling",
        body: (
          <>
            This site does not ask for Roblox passwords, payment details, account recovery information, or private player
            messages. Do not submit sensitive Roblox account data through any correction or contact path.
          </>
        )
      },
      {
        title: "Analytics and third-party cookies",
        body: (
          <>
            The site may use Google Analytics or similar analytics tools to understand aggregate page usage, search
            landing pages, device/browser categories, and content freshness needs. These services may use cookies or
            similar technologies and process data under their own policies.
          </>
        )
      },
      {
        title: "Advertising and Adsterra",
        body: (
          <>
            When advertising is configured, the site may use Adsterra or similar third-party ad providers, including
            banner, native, smart-link, or delayed popunder formats. These providers may use cookies, local storage, IP
            address, device data, and similar technologies for ad delivery, fraud prevention, frequency capping,
            measurement, and personalization.
          </>
        )
      },
      {
        title: "Your choices",
        body: (
          <>
            You can limit cookies through browser settings, private browsing mode, device privacy controls, ad-blocking
            tools, and available Google or advertising opt-out controls. Some features or ads may not work the same way
            when cookies or scripts are blocked.
          </>
        )
      },
      {
        title: "Children and third-party links",
        body: (
          <>
            This fan site is written for a general Roblox audience and does not knowingly collect personal information
            from children. Links to Roblox, Discord, YouTube, Trello, Fandom, analytics providers, and ad networks are
            third-party services with their own privacy practices.
          </>
        )
      },
      {
        title: "Retention and contact",
        body: (
          <>
            Server, analytics, and ad logs are retained by the relevant hosting, analytics, and advertising providers
            according to their systems. For privacy questions or correction requests, contact <MailLink />.
          </>
        )
      }
    ]
  },
  terms: {
    eyebrow: "Terms",
    title: "Terms of Service",
    description: "These terms explain the unofficial fan-site status, acceptable use, information limits, advertising, and contact path.",
    sections: [
      {
        title: "Unofficial fan resource",
        body: (
          <>
            {siteConfig.name} is an unofficial fan-made resource for {siteConfig.gameName}. It is not affiliated with,
            endorsed by, sponsored by, or operated by Roblox Corporation or the game creator.
          </>
        )
      },
      {
        title: "Information only",
        body: (
          <>
            Content is provided for general guide, code-status, source-status, and gameplay planning purposes. Game
            mechanics, codes, rewards, links, rankings, and availability can change. Always verify important details in
            the live game and official Roblox surfaces.
          </>
        )
      },
      {
        title: "Acceptable use",
        body: (
          <>
            Do not use the site to submit spam, malicious content, exploit instructions, private account data,
            impersonation, rights-infringing material, or requests for Roblox account support.
          </>
        )
      },
      {
        title: "Third-party services and ads",
        body: (
          <>
            The site may link to or embed third-party services such as Roblox, Discord, YouTube, Fandom, analytics
            providers, and ad networks including Adsterra when configured. Those services are governed by their own
            terms and policies.
          </>
        )
      },
      {
        title: "No warranty",
        body: (
          <>
            The site is provided as-is without guarantees that every code, source link, ranking, or tutorial step,
            guide step will be accurate, complete, uninterrupted, or current.
          </>
        )
      },
      {
        title: "Contact",
        body: (
          <>
            For terms questions, corrections, takedown concerns, or rights issues, contact <MailLink />.
          </>
        )
      }
    ]
  },
  disclosure: {
    eyebrow: "Disclosure",
    title: "Unofficial Fan-Made Disclosure",
    description: "This page explains the fan-made status, source notes, advertising, affiliate-style links, and official support limits.",
    sections: [
      {
        title: "No affiliation",
        body: (
          <>
            {siteConfig.name} is not affiliated with Roblox Corporation, the Roblox platform team, or the creator of{" "}
            {siteConfig.gameName}. Roblox names, marks, images, and game content belong to their respective owners.
          </>
        )
      },
      {
        title: "Source notes",
        body: (
          <>
            Official Roblox pages and creator-owned channels remain the source of record. Community reports, videos,
            wikis, and guide sites are treated as signals, not final authority.
          </>
        )
      },
      {
        title: "Advertising disclosure",
        body: (
          <>
            This site may display third-party ads or sponsored links to support hosting and updates. Ad placement does
            not mean Roblox, the game creator, or any third-party service endorses the site.
          </>
        )
      },
      {
        title: "More information",
        body: (
          <>
            Read the{" "}
            <Link
              className="font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            ,{" "}
            <Link
              className="font-bold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              href="/terms"
            >
              Terms of Service
            </Link>
            , or contact <MailLink /> for corrections and rights concerns.
          </>
        )
      }
    ]
  }
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  const page = legalPages[kind];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="mini-label">{page.eyebrow}</p>
      <h1 className="mt-3 text-4xl font-extrabold text-white">{page.title}</h1>
      <p className="mt-4 text-lg leading-8 text-white/68">{page.description}</p>
      <section className="mt-10 grid gap-4">
        {page.sections.map((section) => (
          <article key={section.title} className="content-card">
            <h2 className="text-xl font-bold text-white">{section.title}</h2>
            <p className="mt-2 leading-7 text-white/68">{section.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
