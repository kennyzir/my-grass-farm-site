import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { activeCodes, faqs, officialLinks, siteConfig } from "@/data/site";
import { homepageContract } from "@/data/homepage-contract";
import { gameGenre, gameCreator, gameEntities, gameUpdatedIso, offlineNote } from "@/data/game-db";
import { VideoGameJsonLd, FaqJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { SectionHeader } from "@/components/ui/content";
import { BrandHero } from "@/components/home/BrandHero";
import { AdsterraArticleTop, AdsterraArticleMid } from "@/components/ads";

const HOMEPAGE_NS = "homePage";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = siteConfig.domain;
  if (locale === "es") {
    return {
      title: "My Grass Farm: Cómo Jugar, Códigos y Cómo Crecer tu Granja",
      description: "La guía de My Grass Farm: corta césped → heno → dinero → cuchillas → trabajadores, más códigos y novedades.",
      alternates: {
        canonical: `${base}/es/`,
        languages: { "en-US": `${base}/en/`, es: `${base}/es/`, "x-default": `${base}/en/` }
      }
    };
  }
  return {
    title: `${siteConfig.gameName} Wiki, Codes & How to Play`,
    description: siteConfig.description,
    alternates: {
      canonical: `${base}/en/`,
      languages: { "en-US": `${base}/en/`, es: `${base}/es/`, "x-default": `${base}/en/` }
    }
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: HOMEPAGE_NS });
  if (locale !== "en" && locale !== "es") notFound();
  const prefix = locale === "es" ? "/es" : "/en";
  const isEs = locale === "es";
  const localHref = (href: string) => (isEs && href.startsWith("/en") ? href.replace("/en", "/es") : href);

  const job = isEs ? homepageContract.primaryPlayerJobEs : homepageContract.primaryPlayerJob;
  const problem = isEs ? homepageContract.problemStateEs : homepageContract.problemState;

  return (
    <main>
      <WebSiteJsonLd />
      <VideoGameJsonLd />
      <FaqJsonLd items={faqs.home} />
      <section data-home-block-id="hero">
        <BrandHero
          isEs={isEs}
          valueProp={isEs ? "Corta césped → gana dinero → contrata trabajadores" : "Cut grass → earn cash → hire workers"}
          shortDisc={isEs
            ? `My Grass Farm es un ${gameGenre} de Roblox por ${gameCreator}. Aquí decides el orden de mejoras de tu primera hora y creces la granja sin estancarte.`
            : `My Grass Farm is a Roblox ${gameGenre} by ${gameCreator}. Here you decide your first-hour upgrade order and grow the farm without stalling.`}
        />
      </section>

      {/* ★ MAIN ENGINE — the first-hour decision route (the page's reason to exist) */}
      <section className="mx-auto max-w-7xl px-4 py-12" data-home-block-id="main-engine">
        <SectionHeader
          eyebrow={isEs ? "La decisión clave" : "The one decision"}
          title={isEs ? "Qué mejorar primero: cuchillas o trabajadores" : "What to upgrade first: blades or workers"}
          copy={job}
        />
        <ol className="mt-6 grid gap-3 text-sm text-white/75">
          {homepageContract.firstHourRoute.map((s) => (
            <li key={s.step} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{s.step}. {s.title}</strong>
              <p className="mt-1 text-white/65">{s.why}</p>
              <Link href={localHref(s.href)} className="mt-2 inline-block text-xs font-semibold text-[color:var(--accent)] hover:underline">→ {isEs ? "Leer la guía" : "Read the guide"}</Link>
            </li>
          ))}
        </ol>
      </section>

      <AdsterraArticleTop />

      {/* ★ Critical answers — 2-3 directly usable answers */}
      <section className="bg-white/[0.025]" data-home-block-id="critical-answers">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow={isEs ? "Rápido" : "Quick answers"} title={isEs ? "Las 3 cosas que todo nuevo jugador pregunta" : "The 3 things every new player asks"} />
          <div className="mt-6 grid gap-3 text-sm text-white/75">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{isEs ? "¿Los trabajadores ganan mientras estoy fuera?" : "Do workers earn while I'm offline?"}</strong>
              <p className="mt-1 text-white/65">{isEs ? "Sí — la descripción oficial lo confirma: 'tus agricultores cortan césped mientras no estás en línea'. Por eso contratar trabajadores pronto vale más de lo que parece." : "Yes — the official description confirms it: 'your farmers cut grass while you're offline.' That's why hiring workers early is worth more than it looks."}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{isEs ? "¿Qué es mejor, cuchilla o trabajador?" : "Which is better, blade or worker?"}</strong>
              <p className="mt-1 text-white/65">{isEs ? "No es uno u otro — es un tándem. La cuchilla sube tu corte activo, el trabajador añade ingreso pasivo+offline. Crece ambos juntos." : "It's not one or the other — it's a tandem. The blade raises active cutting, the worker adds passive + offline income. Grow both together."}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{isEs ? "¿Hay códigos activos?" : "Are there active codes?"}</strong>
              <p className="mt-1 text-white/65">
                {activeCodes.length === 0
                  ? (isEs ? "Ninguno confirmado ahora mismo." : "None confirmed right now.")
                  : (isEs ? <>La comunidad reporta <code className="font-mono text-[color:var(--accent)]">{activeCodes.map(c => c.code).join(", ")}</code> (sin confirmar oficialmente).</> : <>The community reports <code className="font-mono text-[color:var(--accent)]">{activeCodes.map(c => c.code).join(", ")}</code> (not officially confirmed).</>)}
                {" "}<Link href={localHref("/en/codes")} className="font-semibold text-[color:var(--accent)] hover:underline">{isEs ? "Ver códigos" : "See codes"}</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ★ Core loop — the whole game in one pass */}
      <section className="mx-auto max-w-7xl px-4 py-12" data-home-block-id="core-loop">
        <SectionHeader eyebrow={isEs ? "El bucle" : "The loop"} title={isEs ? "Cómo funciona My Grass Farm" : "How My Grass Farm works"} copy={isEs
          ? "El bucle oficial lo resume todo: corta césped → recolecta heno 🌱 → procesa heno por dinero 💸 → desbloquea cuchillas para cortar más rápido 🗡️ → contrata trabajadores 🧑‍🌾 → expande tu granja 🏡."
          : "The official loop sums it all up: cut grass → collect hay 🌱 → process hay for cash 💸 → unlock powerful blades to cut faster 🗡️ → hire workers 🧑‍🌾 → expand your farm 🏡."} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          {gameEntities.map((e) => (
            <div key={e.slug} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{e.name}</strong> <span className="text-white/50">— {e.farmJob}</span>
              <p className="mt-1 text-white/65">{e.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      <AdsterraArticleMid />

      {/* ★ Deep differentiator — the offline-worker insight no other site leads with */}
      <section className="bg-white/[0.025]" data-home-block-id="deep-differentiator">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow={isEs ? "Lo que nadie te dice" : "What nobody tells you"} title={offlineNote.name} copy={offlineNote.blurb} />
          <p className="mt-3 text-sm leading-7 text-white/70">{isEs
            ? "La mayoría de guías repiten la descripción oficial. Lo que importa de verdad es el detalle offline: tus trabajadores son una capa de ingreso siempre activa. Un jugador que solo compra cuchillas deja dinero sobre la mesa cada minuto que no juega."
            : "Most guides repeat the official description. What actually matters is the offline detail: your workers are an always-on income layer. A player who only buys blades leaves money on the table every minute they aren't playing."}</p>
        </div>
      </section>

      {/* ★ Task hubs — funnel into the intent matrix by player state */}
      <section className="mx-auto max-w-7xl px-4 py-12" data-home-block-id="task-hubs">
        <SectionHeader eyebrow={isEs ? "Tu estado" : "Where are you?"} title={isEs ? "Elige tu situación" : "Pick your situation"} />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {homepageContract.hubPlan.map((h) => (
            <Link key={h.target} href={localHref(h.target)} className="rounded-lg border border-white/10 bg-black/20 p-5 hover:border-white/25">
              <span className="mini-label">{h.playerState}</span>
              <strong className="mt-2 block text-lg text-white">{h.label}</strong>
              <p className="mt-1 text-sm text-white/65">{h.nextDecision}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ★ Guide map — the full sitemap of this game's answers */}
      <section className="bg-white/[0.025]" data-home-block-id="guide-map">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow={isEs ? "Mapa" : "Map"} title={isEs ? "Todo lo que cubre esta wiki" : "Everything this wiki covers"} />
          <div className="mt-6 grid gap-3">
            {officialLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link key={link.href} href={localHref(link.href)} className="row-link">
                  <span><strong>{link.title}</strong><small>{link.description}</small></span>
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              ) : (
                <a key={link.href} href={link.href} className="row-link" target="_blank" rel="noreferrer">
                  <span><strong>{link.title}</strong><small>{link.description}</small></span>
                  <span aria-hidden="true">-&gt;</span>
                </a>
              )
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
