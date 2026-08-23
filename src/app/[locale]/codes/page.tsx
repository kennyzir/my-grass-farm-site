import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { activeCodes, checkedDate, expiredCodes, faqs, monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, ClaimReviewJsonLd, FaqJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader, TrustNote } from "@/components/ui/content";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { AdsterraArticleMid } from "@/components/ads";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = siteConfig.domain;
  if (locale === "es") {
    return {
      title: `My Grass Farm Codes (${monthLabel}) — RELEASE & MERCHANT`,
      description: `Los códigos de My Grass Farm en ${monthLabel}, cómo canjearlos en el juego y qué hacer cuando un código falla.`,
      alternates: { canonical: `${base}/es/codes/`, languages: { en: `${base}/en/codes/`, es: `${base}/es/codes/`, "x-default": `${base}/en/codes/` } }
    };
  }
  return {
    title: `My Grass Farm Codes (${monthLabel}) — RELEASE & MERCHANT`,
    description: `My Grass Farm codes for ${monthLabel}, how to redeem them in-game, and what to do when a code fails.`,
    alternates: { canonical: `${base}/en/codes/`, languages: { en: `${base}/en/codes/`, es: `${base}/es/codes/`, "x-default": `${base}/en/codes/` } }
  };
}

export default async function CodesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const prefix = locale === "es" ? "/es" : "/en";

  const T = {
    crumb: isEs ? "Códigos" : "Codes",
    introTitle: isEs ? "Códigos de My Grass Farm" : "My Grass Farm codes",
    // One line, answer-first. Players came for the code, not a disclaimer.
    introDesc: isEs
      ? "Estos son los códigos que funcionan ahora mismo. Son reportados por la comunidad, no anunciados oficialmente — pruébalos y canjéalos en el juego."
      : "Here are the codes that work right now. They come from the community, not an official announcement — try them and redeem them in-game.",
    activeEyebrow: isEs ? "Códigos actuales" : "Codes right now",
    activeTitle: isEs ? "Códigos para canjear" : "Codes to redeem",
    activeCopy: isEs
      ? "Cada código va con lo que se sabe de él. Los marcamos como 'de la comunidad' porque aún no los ha confirmado una fuente oficial fechada."
      : "Each code lists what's known about it. We mark them 'community' because a dated official source hasn't confirmed them yet.",
    empty: isEs
      ? "Por ahora no hay códigos confirmados. Revisa más abajo dónde aparecen los nuevos."
      : "No confirmed codes right now. See below for where new ones usually appear.",
    redeemEyebrow: isEs ? "Cómo canjear" : "How to redeem",
    redeemTitle: isEs ? "Dónde y cómo canjear un código" : "Where and how to redeem",
    redeemSteps: isEs ? [
      ["Abre My Grass Farm", "Entra desde la página oficial de Roblox para evitar copias falsas. Deja que cargue por completo."],
      ["Busca el panel de recompensas", "Suele estar en la tienda o en los ajustes del juego. El panel exacto depende del build actual."],
      ["Pega el código y reclama", "Los códigos distinguen mayúsculas, así que pégalo exacto y reclama antes de que expire."],
    ] : [
      ["Open My Grass Farm", "Join from the official Roblox page to avoid fake copies. Let it fully load."],
      ["Find the rewards panel", "It's usually in the in-game shop or settings. The exact panel depends on the current build."],
      ["Paste the code and claim", "Codes are case-sensitive, so paste it exactly and claim before it expires."],
    ],
    failEyebrow: isEs ? "Si un código falla" : "If a code fails",
    failTitle: isEs ? "Por qué fallan los códigos" : "Why codes fail",
    failRows: isEs ? [
      ["Expirado", "Los códigos duran poco. Si uno falla, probablemente ya venció."],
      ["Mayúsculas", "Pégala exacta; escribirla a mano mete errores de mayúsculas."],
      ["Ya usado", "Casi todos los códigos son de un solo uso por cuenta."],
    ] : [
      ["Expired", "Codes are short-lived. If one fails, it has likely already expired."],
      ["Case-sensitive", "Paste the exact string; typing by hand adds wrong-case errors."],
      ["Already used", "Nearly all codes are one-time per account."],
    ],
    watchTitle: isEs ? "Dónde aparecen los códigos nuevos" : "Where new codes appear",
    watchBody: isEs
      ? "Los nuevos suelen salir dentro del juego o en los anuncios del creador (One More Grass). Desconfía de webs que prometen 'todos los códigos' sin fecha — muchas son de estafa. Funcionan los que dan una fuente real."
      : "New ones usually drop in-game or on the creator's (One More Grass) announcements. Beware sites promising 'all codes' with no date — many are scams. The ones worth using give a real source.",
    nextTitle: isEs ? "Después de canjear el código" : "After you redeem",
    nextCopy: isEs
      ? "Con la recompensa en mano, toca crecer la granja."
      : "Reward in hand, time to grow the farm.",
  };

  const links = [
    { href: `${prefix}/how-to-play`, title: isEs ? "Cómo jugar" : "How to play", desc: isEs ? "El bucle corta césped → heno → dinero, desde cero." : "The cut grass → hay → cash loop, from scratch." },
    { href: `${prefix}/release-date`, title: isEs ? "Cuándo salió" : "When it launched", desc: isEs ? "Fecha de lanzamiento y popularidad del juego." : "The game's release date and popularity." },
    { href: `${prefix}/updates`, title: isEs ? "Novedades" : "Updates", desc: isEs ? "Qué ha cambiado en el juego." : "What's changed in the game." },
    { href: `/wiki`, title: isEs ? "Todo sobre el juego" : "Everything about the game", desc: isEs ? "La guía completa de My Grass Farm." : "The full My Grass Farm guide." },
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: isEs ? "Inicio" : "Home", href: `${prefix}/` }, { name: T.crumb, href: `${prefix}/codes` }]} />
      <FaqJsonLd items={faqs.codes} />
      <ClaimReviewJsonLd claim={`${siteConfig.gameName} reward codes are redeemed in-game; the codes listed here are community-reported.`} itemReviewed={{ name: siteConfig.gameName, type: "VideoGame" }} author={{ name: `${siteConfig.gameName} Wiki` }} datePublished={checkedDate} rating={{ ratingValue: 3, bestRating: 5, worstRating: 1, alternateName: "Community-reported" }} />
      <Breadcrumbs items={[{ label: T.crumb, href: `${prefix}/codes` }]} />
      <PageIntro eyebrow="My Grass Farm · Codes" title={T.introTitle} description={T.introDesc} />

      {/* ANSWER FIRST: the codes, immediately. */}
      <section className="mt-8">
        <SectionHeader eyebrow={T.activeEyebrow} title={T.activeTitle} copy={T.activeCopy} />
        <div className="mt-4 grid gap-3">
          {activeCodes.length === 0 ? (
            <p className="rounded-lg border border-white/10 bg-black/20 p-5 text-white/70">{T.empty}</p>
          ) : (
            activeCodes.map((c) => (
              <div key={c.code} className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-black/20 p-5">
                <code className="font-mono text-2xl font-bold text-[color:var(--accent)]">{c.code}</code>
                <span className="text-right text-sm text-white/60">
                  {isEs ? "de la comunidad" : "community"} · {isEs ? "visto el" : "seen"} {c.addedDate}
                </span>
              </div>
            ))
          )}
          {expiredCodes.length > 0 && (
            <div className="mt-2 border-t border-white/10 pt-3">
              <span className="text-xs text-white/40">{isEs ? "Expirados" : "Expired"}</span>
              {expiredCodes.map((c) => <div key={c.code} className="text-sm text-white/50 line-through">{c.code}</div>)}
            </div>
          )}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.redeemEyebrow} title={T.redeemTitle} />
        <HowToJsonLd name={isEs ? "Canjear un código de My Grass Farm" : "Redeem a My Grass Farm code"} description={isEs ? "Cómo canjear un código de recompensa en My Grass Farm." : "How to redeem a reward code in My Grass Farm."} steps={T.redeemSteps.map((s) => ({ name: s[0], text: s[1] }))} />
        <ol className="mt-4 grid gap-3 text-sm text-white/75">
          {T.redeemSteps.map((s, i) => (
            <li key={s[0]} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{i + 1}. {s[0]}</strong>
              <p className="mt-1 text-white/65">{s[1]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.failEyebrow} title={T.failTitle} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          {T.failRows.map((r) => (
            <p key={r[0]}><strong className="text-white">{r[0]}</strong> — {r[1]}</p>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={isEs ? "Novedades" : "Freshness"} title={T.watchTitle} />
        <p className="mt-4 text-sm leading-7 text-white/75">{T.watchBody}</p>
      </section>

      <AdsterraArticleMid />

      <section className="mt-10">
        <SectionHeader eyebrow={isEs ? "Siguiente" : "Next"} title={T.nextTitle} copy={T.nextCopy} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="content-card">
              <strong className="text-white">{l.title}</strong>
              <p className="mt-1 text-sm text-white/60">{l.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Freshness + source, parked at the foot where it belongs. */}
      <div className="mt-12">
        <VerificationBox note={isEs ? "códigos reportados por la comunidad, no confirmados oficialmente" : "community-reported codes, not officially confirmed"} />
      </div>
    </main>
  );
}
