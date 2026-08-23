import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { activeCodes, checkedDate, expiredCodes, faqs, monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, ClaimReviewJsonLd, FaqJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader, TrustNote } from "@/components/ui/content";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { AdsterraArticleMid, AdsterraArticleTop } from "@/components/ads";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = siteConfig.domain;
  if (locale === "es") {
    return {
      title: `Códigos de My Grass Farm (${monthLabel})`,
      description: `Estado actual de los códigos de recompensa de My Grass Farm, dónde buscar nuevos códigos y cómo canjearlos en el juego.`,
      alternates: { canonical: `${base}/es/codes/`, languages: { en: `${base}/en/codes/`, es: `${base}/es/codes/`, "x-default": `${base}/en/codes/` } }
    };
  }
  return {
    title: `${siteConfig.gameName} Codes (${monthLabel})`,
    description: `Current ${siteConfig.gameName} reward code status, where to look for new codes, and how to redeem them in-game.`,
    alternates: { canonical: `${base}/en/codes/`, languages: { en: `${base}/en/codes/`, es: `${base}/es/codes/`, "x-default": `${base}/en/codes/` } }
  };
}

const sourceLinks = [
  {
    label: "Official Roblox game page",
    href: "https://www.roblox.com/games/98073123711869/My-Grass-Farm",
    note: "Source of record for the game title, creator, votes, and live availability."
  },
  {
    label: "Official Roblox YouTube search",
    href: "https://www.youtube.com/results?search_query=roblox+my+grass+farm",
    note: "Where new announcements and potential code drops would appear — check descriptions and pinned comments."
  }
];

const redemptionSteps = [
  {
    name: "Open My Grass Farm from the official Roblox page",
    text: "Launch the game from roblox.com/games/98073123711869/My-Grass-Farm to avoid fake copies. Let it fully load."
  },
  {
    name: "Look for a rewards/redemption panel in-game",
    text: "Roblox farm tycoons commonly put code redemption in the in-game shop or settings. The exact panel is confirmed in the current build."
  },
  {
    name: "Enter the code and claim",
    text: "Paste the exact code string (codes are case-sensitive) and claim before it expires."
  }
];

const refreshHistory = [
  {
    month: "August 2026",
    status: "No confirmed public codes yet",
    note: "As of this refresh no My Grass Farm code had an official, dated in-game confirmation we can point to. The active list stays empty rather than showing guessed or stale strings."
  }
];

export default async function CodesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const prefix = locale === "es" ? "/es" : "/en";

  const links = [
    { href: `${prefix}/how-to-play`, title: isEs ? "Cómo jugar" : "How to Play", desc: isEs ? "El bucle de la granja y los primeros pasos." : "The farm loop and first steps." },
    { href: `${prefix}/release-date`, title: isEs ? "Fecha de lanzamiento" : "Release Date", desc: isEs ? "Cuándo salió My Grass Farm." : "When My Grass Farm launched." },
    { href: `${prefix}/updates`, title: isEs ? "Actualizaciones" : "Updates", desc: isEs ? "Novidades del juego." : "What's new in the game." },
    { href: `/wiki`, title: isEs ? "Explorador Wiki" : "Wiki Explorer", desc: isEs ? "Todo sobre My Grass Farm en un lugar." : "Everything about My Grass Farm in one place." }
  ];

  const T = {
    eyebrow: isEs ? "My Grass Farm · Códigos" : "My Grass Farm · Codes",
    introTitle: isEs ? `Códigos de My Grass Farm (${monthLabel})` : `${siteConfig.gameName} Codes (${monthLabel})`,
    introDesc: isEs
      ? "Estado actual de los códigos de recompensa de My Grass Farm. Solo mostramos códigos que podemos fechar y verificar desde una fuente oficial — nunca cadenas inventadas. Si no hay códigos confirmados, este estado lo dice con honestidad."
      : "Current My Grass Farm reward code status. We list only codes we can date and verify from an official source — never invented strings. If no code is confirmed, this status page says so honestly.",
    activeEyebrow: isEs ? "Códigos activos" : "Active codes",
    activeTitle: isEs ? "Códigos de recompensa confirmados" : "Confirmed reward codes",
    activeCopy: isEs ? "Los códigos de aquí están verificados contra una fuente actual y fechada. Los códigos duran poco, así que esta lista puede estar vacía." : "Codes here are verified against a current, dated source. Codes are short-lived, so this list may be empty.",
    activeEmpty: isEs ? "No hay códigos activos por el momento. Si los desarrolladores publican códigos, suelen hacerlo en el juego o en sus anuncios oficiales — revisa la sección Dónde buscar." : "No active codes listed right now. If the developers publish codes they usually appear in-game or in official announcements — check the Where to look section.",
    expiredLabel: isEs ? "Expirados" : "Expired",
    redeemEyebrow: isEs ? "Cómo canjear" : "How to redeem",
    redeemTitle: isEs ? "Dónde buscar códigos y cómo canjearlos" : "Where to look & how to redeem",
    redeemCopy: isEs ? "Los pasos de canje dependen del juego actual. Abre My Grass Farm, busca un panel de recompensas en la tienda o ajustes, e introduce el código. No confirmamos un mecanismo específico hasta verificarlo en el build actual." : "Redemption steps depend on the current build. Open My Grass Farm, look for a rewards panel in the shop or settings, and enter the code. We don't confirm a specific mechanism until we verify it in the current build.",
    tbEyebrow: isEs ? "Por qué fallan los códigos" : "Why codes fail",
    tbTitle: isEs ? "Solución de problemas" : "Troubleshooting",
    tbCopy: isEs ? "Los códigos duran poco y distinguen mayúsculas de minúsculas. Si uno falla, probablemente expiró o hay un error de mayúsculas." : "Codes are time-limited and case-sensitive. If one fails, it has likely expired or the case is wrong.",
    tbExpired: isEs ? "Expirado" : "Expired",
    tbExpiredTxt: isEs ? "Los códigos suelen expirar en poco tiempo. Si uno falla, comprueba la fecha en que se publicó." : "Codes often expire quickly. If a code fails, check when it was published.",
    tbCase: isEs ? "Distingue mayúsculas" : "Case-sensitive",
    tbCaseTxt: isEs ? "Pega la cadena exacta; escribirla a mano puede introducir un error de mayúsculas." : "Paste the exact string; typing it by hand can introduce a wrong case.",
    tbClaimed: isEs ? "Ya canjeado" : "Already claimed",
    tbClaimedTxt: isEs ? "Los códigos suelen ser de un solo uso por cuenta." : "Codes are usually one-time per account.",
    watchEyebrow: isEs ? "Mirando los lanzamientos" : "Watch for drops",
    watchTitle: isEs ? "Señales del próximo código" : "Next code signals",
    watchCopy: isEs ? "Los códigos nuevos suelen aparecer en el juego o en anuncios oficiales." : "New codes usually appear in-game or in official announcements.",
    watchBody: isEs ? "Sigue la página oficial de Roblox y el canal de YouTube del juego; los códigos suelen anunciarse ahí. Cuidado con los sitios de estafa; confía solo en fuentes de primera mano." : "Follow the official Roblox page and the game's YouTube channel; codes are usually announced there. Watch for scam websites; only trust first-party sources.",
    sourcesEyebrow: isEs ? "Fuentes" : "Sources",
    sourcesTitle: isEs ? "Estado de las fuentes" : "Source status",
    sourcesCopy: isEs ? "Un registro honesto de qué comprobamos y cuándo." : "An honest ledger of what we check and when.",
    keepEye: isEs ? "Sigue explorando" : "Keep exploring",
    keepTitle: isEs ? "Guías relacionadas para jugadores" : "Related guides for players",
    keepCopy: isEs ? "Los códigos son solo el comienzo. Aprende el bucle de la granja (cortar césped → heno → dinero) y sigue el progreso del juego con las guías de abajo." : "Codes are just the start. Learn the farm loop (cut grass → hay → cash) and follow the game's progress with the guides below."
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: isEs ? "Inicio" : "Home", href: `${prefix}/` }, { name: isEs ? "Códigos" : "Codes", href: `${prefix}/codes` }]} />
      <FaqJsonLd items={faqs.codes} />
      <ClaimReviewJsonLd claim={`${siteConfig.gameName} rewards are redeemed in-game; codes are published by the developers when available.`} itemReviewed={{ name: siteConfig.gameName, type: "VideoGame" }} author={{ name: `${siteConfig.gameName} Fan Wiki` }} datePublished={checkedDate} rating={{ ratingValue: 4, bestRating: 5, worstRating: 1, alternateName: "Evidence" }} />
      <Breadcrumbs items={[{ label: isEs ? "Códigos" : "Codes", href: `${prefix}/codes` }]} />
      <PageIntro eyebrow={T.eyebrow} title={T.introTitle} description={T.introDesc} />
      <VerificationBox />
      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader eyebrow={T.activeEyebrow} title={T.activeTitle} copy={T.activeCopy} />
        <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-5">
          {activeCodes.length === 0 ? (
            <p className="text-white/70">{T.activeEmpty}</p>
          ) : (
            <div className="grid gap-2">
              {activeCodes.map((c) => (
                <div key={c.code} className="flex items-center justify-between gap-3">
                  <code className="font-mono text-lg font-bold text-[color:var(--accent)]">{c.code}</code>
                  <span className="text-sm text-white/60">{c.status} · {isEs ? "añadido" : "added"} {c.addedDate}</span>
                </div>
              ))}
            </div>
          )}
          {expiredCodes.length > 0 && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <span className="text-xs text-white/40">{T.expiredLabel}</span>
              {expiredCodes.map((c) => <div key={c.code} className="text-sm text-white/50 line-through">{c.code}</div>)}
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.redeemEyebrow} title={T.redeemTitle} copy={T.redeemCopy} />
        <HowToJsonLd name={isEs ? "Canjear un código de My Grass Farm" : "Redeem a My Grass Farm code"} description={isEs ? "Cómo canjear un código de recompensa en My Grass Farm." : "How to redeem a reward code in My Grass Farm."} steps={[
          { name: redemptionSteps[0].name, text: redemptionSteps[0].text },
          { name: redemptionSteps[1].name, text: redemptionSteps[1].text },
          { name: redemptionSteps[2].name, text: redemptionSteps[2].text }
        ]} />
        <ol className="mt-4 grid gap-3 text-sm text-white/75">
          {redemptionSteps.map((s, i) => (
            <li key={s.name} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{i + 1}. {s.name}</strong>
              <p className="mt-1 text-white/65">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.tbEyebrow} title={T.tbTitle} copy={T.tbCopy} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p><strong className="text-white">{T.tbExpired}</strong> — {T.tbExpiredTxt}</p>
          <p><strong className="text-white">{T.tbCase}</strong> — {T.tbCaseTxt}</p>
          <p><strong className="text-white">{T.tbClaimed}</strong> — {T.tbClaimedTxt}</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.watchEyebrow} title={T.watchTitle} copy={T.watchCopy} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p>{T.watchBody}</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.keepEye} title={T.keepTitle} copy={T.keepCopy} />
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="content-card">
              <strong className="text-white">{l.title}</strong>
              <p className="mt-1 text-sm text-white/60">{l.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.sourcesEyebrow} title={T.sourcesTitle} copy={T.sourcesCopy} />
        <div className="mt-4 grid gap-3">
          {sourceLinks.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="row-link">
              <span><strong>{s.label}</strong><small>{s.note}</small></span>
              <span aria-hidden="true">-&gt;</span>
            </a>
          ))}
        </div>
        <div className="mt-6">{refreshHistory.map((h) => <TrustNote key={h.month} title={h.status} body={h.note} />)}</div>
      </section>

      <AdsterraArticleMid />
    </main>
  );
}
