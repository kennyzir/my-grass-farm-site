import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { activeCodes, editorialSignals, faqs, guideClusters, heroMetrics, officialLinks, playerJourney, siteConfig, toolCards, videoGuides, wikiCards } from "@/data/site";
import { editorialSignalsEs, guideClustersEs, heroMetricsEs, officialLinksEs, playerJourneyEs, shortDisclosureEs, videoGuidesEs, valuePropositionEs } from "@/data/home-es";
import { VideoGuide } from "@/components/ui/EvomonBlocks";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { gameGenre, gameCreator, gameUpdatedIso } from "@/data/game-db";
import { VideoGameJsonLd, FaqJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { SectionHeader, TrustNote } from "@/components/ui/content";
import { BrandHero } from "@/components/home/BrandHero";
import { AdsterraArticleTop } from "@/components/ads";

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
      title: "My Grass Farm Códigos, Cómo Jugar y Actualizaciones",
      description: "Códigos de My Grass Farm, cómo jugar, fecha de lanzamiento y actualizaciones — una wiki de fans enfocada de My Grass Farm.",
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
  const ts = await getTranslations({ locale, namespace: "shared" });
  if (locale !== "en" && locale !== "es") notFound();
  const prefix = locale === "es" ? "/es" : "/en";
  const isEs = locale === "es";
  const localHref = (href: string) => (isEs && href.startsWith("/en") ? href.replace("/en", "/es") : href);

  const clusters = isEs ? guideClustersEs : guideClusters;
  const journey = isEs ? playerJourneyEs : playerJourney;
  const ol = isEs ? officialLinksEs : officialLinks;
  const esig = isEs ? editorialSignalsEs : editorialSignals;
  const vids = isEs ? videoGuidesEs : videoGuides;
  const metrics = isEs ? heroMetricsEs : heroMetrics;
  const valueProp = isEs ? valuePropositionEs : siteConfig.valueProposition;
  const shortDisc = isEs ? shortDisclosureEs : siteConfig.shortDisclosure;

  return (
    <main>
      <WebSiteJsonLd />
      <VideoGameJsonLd />
      <FaqJsonLd items={faqs.home} />
      <VerificationBox />
      <BrandHero isEs={isEs} valueProp={valueProp} shortDisc={shortDisc} />

      <section className="border-y border-white/10 bg-black/25">
        <div className="mx-auto grid max-w-7xl gap-px px-4 py-5 sm:grid-cols-3">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white/[0.03] px-4 py-4">
              <div className="text-2xl font-bold text-[color:var(--accent)]">{m.value}</div>
              <div className="mt-1 text-sm font-semibold text-white">{m.label}</div>
              <div className="mt-1 text-sm text-white/60">{m.note}</div>
            </div>
          ))}
        </div>
      </section>
      <AdsterraArticleTop />

      {/* Creator evidence — real grass-farm gameplay (yt-content-miner, yt-dlp-verified) */}
      <section className="mx-auto max-w-7xl px-4 pt-8">
        <VideoGuide
          eyebrow={isEs ? "Creadores" : "Creators"}
          title={isEs ? "Así se juega de verdad" : "Watch real farm gameplay"}
          description={isEs
            ? "Los videos de los creadores muestran el bucle real de cortar césped, recolectar heno y subir en la tabla de líderes, más allá de la descripción oficial. Todos los embeds están verificados con yt-dlp."
            : "Creator videos show the real cutting-grass, collecting-hay loop and leaderboard gameplay beyond the official description. All embeds are yt-dlp-verified."}
          embedId="5ta1QVhlVM4"
        />
      </section>

      {/* Query Router: what are you here to do */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow={t("route_eyebrow")} title={t("route_title")} copy={t("route_copy")} />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-black/20 p-5">
            <span className="mini-label">{t("create_eyebrow")}</span>
            <h2 className="mt-3 text-lg font-bold text-white">{t("create_title")}</h2>
            <p className="mt-2 text-sm text-white/70">{t("create_copy")}</p>
            <Link href={localHref("/en/how-to-play")} className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)] hover:underline">→ {t("create_title")}</Link>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-5">
            <span className="mini-label">{t("style_eyebrow")}</span>
            <h2 className="mt-3 text-lg font-bold text-white">{t("style_title")}</h2>
            <p className="mt-2 text-sm text-white/70">{t("style_copy")}</p>
            <Link href={localHref("/en/how-to-play")} className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)] hover:underline">→ {t("style_title")}</Link>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/20 p-5">
            <span className="mini-label">{t("roleplay_eyebrow")}</span>
            <h2 className="mt-3 text-lg font-bold text-white">{t("roleplay_title")}</h2>
            <p className="mt-2 text-sm text-white/70">{t("roleplay_copy")}</p>
            <Link href={localHref("/en/how-to-play")} className="mt-3 inline-block text-sm font-semibold text-[color:var(--accent)] hover:underline">→ {t("roleplay_title")}</Link>
          </div>
        </div>
      </section>

      {/* Codes strip */}
      <section className="bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow="Freshness" title={t("qa_title")} copy={t("qa_copy")} />
          <div className="mt-6 rounded-lg border border-white/10 bg-black/20 p-5 text-sm text-white/70">
            {activeCodes.length === 0 ? (
              <>{t("no_codes", { fallback: "No active codes listed right now." })}</>
            ) : (
              activeCodes.map((c) => <div key={c.code}><strong className="text-white">{c.code}</strong> — {c.reward}</div>)
            )}
            <Link href={localHref("/en/codes")} className="mt-3 inline-block font-semibold text-[color:var(--accent)] hover:underline">→ {isEs ? "Estado de códigos" : "Codes status"}</Link>
          </div>
        </div>
      </section>

      {/* Create / Style / RP guide clusters */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow={t("qa_eyebrow")} title={isEs ? "Guías de My Grass Farm" : "My Grass Farm guides"} copy={isEs ? "Desde cortar tu primer césped hasta subir en la tabla de líderes — elige una ruta." : "From cutting your first grass to climbing the leaderboard — pick a route."} />
        <div className="mt-6 grid gap-3">
          {clusters.map((c) => (
            <Link key={c.href} href={localHref(c.href)} className="row-link">
              <span><strong>{c.title}</strong><small>{c.description}</small></span>
              <span aria-hidden="true">-&gt;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Player journey */}
      <section className="bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow={isEs ? "Ruta" : "Route"} title={isEs ? "Tu recorrido por My Grass Farm" : "Your My Grass Farm journey"} copy={isEs ? "Canjea, construye, expande y sigue las novedades — en ese orden." : "Redeem, build, expand, then track updates — in that order."} />
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {journey.map((stage) => (
              <div key={stage.number} className="rounded-lg border border-white/10 bg-black/20 p-5">
                <span className="mini-label">{stage.question}</span>
                <Link href={localHref(stage.href)} className="mt-3 block text-lg font-bold text-white hover:text-[color:var(--accent)]"><span className="mr-2 text-[color:var(--accent)]">{stage.number}.</span>{stage.title}</Link>
                <p className="mt-2 text-sm text-white/70">{stage.answer}</p>
                <div className="mt-4 grid gap-2">
                  {stage.links.map((l) => (
                    <Link key={l.href} href={localHref(l.href)} className="row-link">
                      <span><strong>{l.label}</strong><small>{l.description}</small></span>
                      <span aria-hidden="true">-&gt;</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources + EEAT */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <SectionHeader eyebrow={t("src_eyebrow")} title={t("src_title")} copy={t("src_copy")} />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {ol.map((link) => (
            link.href.startsWith("/") ? (
              <Link key={link.href} href={localHref(link.href)} className="content-card"><span className="mini-label">{link.miniLabel}</span><h3 className="mt-3 text-lg font-bold text-white">{link.title}</h3><p className="mt-2 text-sm text-white/65">{link.description}</p></Link>
            ) : (
              <a key={link.href} href={link.href} className="content-card" target="_blank" rel="noreferrer"><span className="mini-label">{link.miniLabel}</span><h3 className="mt-3 text-lg font-bold text-white">{link.title}</h3><p className="mt-2 text-sm text-white/65">{link.description}</p></a>
            )
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {esig.map((s) => <TrustNote key={s.title} title={s.title} body={s.body} />)}
        </div>
      </section>

      {/* Videos */}
      <section className="bg-white/[0.025]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <SectionHeader eyebrow={t("video_eyebrow")} title={t("video_title")} copy={t("video_copy")} />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {vids.map((v) => (
              <a key={v.href} href={v.href} className="content-card" target="_blank" rel="noreferrer"><span className="mini-label">{v.miniLabel}</span><h3 className="mt-3 text-lg font-bold text-white">{v.title}</h3><p className="mt-2 text-sm text-white/65">{v.description}</p></a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
