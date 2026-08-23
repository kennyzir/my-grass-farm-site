import Link from "next/link";
import Image from "next/image";
import { heroActions, siteConfig } from "@/data/site";
import { heroActionsEs } from "@/data/home-es";

/**
 * BrandHero — homepage hero. Locale-aware: takes isEs so the H1 and label row
 * localize (multi-locale DUP-H1 bug fix: en/es home both shipped "X Wiki").
 * The "Wiki" suffix is same in both, but the H1 wording + CTA links switch.
 */
export function BrandHero({
  isEs = false,
  valueProp,
  shortDisc
}: {
  isEs?: boolean;
  valueProp?: string;
  shortDisc?: string;
}) {
  const localHref = (href: string) => (isEs && href.startsWith("/en") ? href.replace("/en", "/es") : href);
  // Locale-distinct H1 (fixes multi-locale DUP-H1: en/es home both shipped "{game} Wiki").
  // es gets a properly localized headline, not a copy of the en one.
  const brand = isEs
    ? `Guía y Wiki de ${siteConfig.gameName}`
    : `${siteConfig.gameName} Wiki`;
  const actions = isEs ? heroActionsEs : heroActions;
  const vp = valueProp ?? siteConfig.valueProposition;
  const sd = shortDisc ?? siteConfig.shortDisclosure;
  return (
    <section className="hero-shell">
      <Image src="/game-cover.png" alt="My Grass Farm official Roblox cover art" width={768} height={432} priority sizes="100vw" className="hero-bg" />
      <div className="hero-scrim" />
      <div className="mx-auto flex min-h-[620px] max-w-7xl items-end px-4 py-10">
        <div className="relative w-full min-w-0 max-w-4xl pb-8">
          <p className="mb-4 block max-w-[21rem] whitespace-normal rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-semibold leading-5 text-[color:var(--accent)] sm:inline-flex sm:max-w-full sm:text-sm">
            {isEs ? "Actualizado " : "Updated "}{siteConfig.lastUpdated} - {siteConfig.freshnessLabel}
          </p>
          <h1 className="max-w-[21rem] break-words text-4xl font-extrabold leading-tight text-white sm:max-w-4xl sm:text-5xl md:text-7xl">
            {brand}
          </h1>
          <p className="mt-3 inline-flex max-w-[21rem] flex-wrap items-center gap-1 text-sm font-medium text-white/75 sm:max-w-3xl">
            <Link href={localHref("/en/how-to-play")} className="underline decoration-dotted underline-offset-4 hover:text-white">
              {isEs ? "Cómo jugar" : "How to Play"}
            </Link>
            <span aria-hidden>·</span>
            <span>{isEs ? "cómo jugar" : "how to play"}</span>
            <span aria-hidden>·</span>
            <span>{isEs ? "códigos" : "codes"}</span>
          </p>
          <p className="mt-5 max-w-[21rem] text-lg leading-8 text-white/82 sm:max-w-3xl sm:text-xl md:text-2xl">
            {vp}
          </p>
          <div className="mt-7 grid max-w-[21rem] gap-3 sm:flex sm:max-w-none sm:flex-wrap">
            {actions.map((action, index) => (
              <Link key={action.href} href={localHref(action.href)} className={index === 0 ? "button-primary" : "button-secondary"}>
                {action.label}
              </Link>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/58">
            {sd}
          </p>
        </div>
      </div>
    </section>
  );
}
