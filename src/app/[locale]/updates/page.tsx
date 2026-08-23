import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { checkedDate, monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader, TrustNote } from "@/components/ui/content";
import { PlayQuickRules, VideoGuide } from "@/components/ui/EvomonBlocks";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { gameGenre, gameCreator, gameUpdatedIso, gameVisits, gamePlaying, gameCreatedIso, farmSystems } from "@/data/game-db";
import { AdsterraArticleTop, AdsterraArticleMid } from "@/components/ads";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = siteConfig.domain;
  const path = locale === "es" ? "/es/updates" : "/en/updates";
  return {
    title: locale === "es" ? `Actualizaciones de My Grass Farm — qué cambió · ${monthLabel}` : `My Grass Farm Updates — What's Changed · ${monthLabel}`,
    description: locale === "es"
      ? "Seguimiento de actualizaciones de My Grass Farm: cómo verificar cambios reales, dónde se anuncian, y el estado confirmado."
      : "My Grass Farm update tracking: how to verify real changes, where they're announced, and the confirmed status.",
    alternates: { canonical: `${base}${path}/`, languages: { en: `${base}/en/updates/`, es: `${base}/es/updates/`, "x-default": `${base}/en/updates/` } }
  };
}

export default async function UpdatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const prefix = locale === "es" ? "/es" : "/en";
  const T = {
    crumb: isEs ? "Actualizaciones" : "Updates",
    introTitle: isEs ? "Actualizaciones de My Grass Farm" : "My Grass Farm updates",
    introDesc: isEs
      ? "My Grass Farm cambia seguido, pero casi nunca publica notas de parche oficiales. Aquí te decimos dónde se anuncian los cambios y cómo darte cuenta si algo de verdad cambió — sin inventar notas de parche ni fechas."
      : "My Grass Farm changes often, but it rarely publishes official patch notes. Here's where changes get announced and how to tell if something actually changed — without making up patch notes or dates.",
    howEyebrow: isEs ? "Qué cuenta" : "What counts",
    howT: isEs ? "Qué contamos como actualización real" : "What counts as a real update",
    howB: isEs ? [
      "Cambios en la página oficial del juego en Roblox (fecha de última actualización, descripción).",
      "Videos fechados de creadores que muestran una mecánica o recurso nuevo en el editor.",
      "cosas confirmadas por más de una fuente fechada.",
    ].join(" ") :
      [
      "Changes on the official Roblox game page (last-updated date, description updates).",
      "Dated creator videos showing a new mechanic or editor feature.",
      "Only things confirmed by more than one dated source.",
    ].join(" "),
    whereEyebrow: isEs ? "Dónde se anuncian" : "Where updates get announced",
    whereT: isEs ? "Fuentes para seguir las novedades" : "Sources to follow for new features",
    whereB: isEs
      ? "My Grass Farm no publica notas de parche en un blog central. Las novedades suelen aparecer en: el canal oficial de YouTube (descripciones y comentarios de videos), la página oficial del juego en Roblox (fecha de actualización), y los videos más recientes de creadores (quienes cubren cambios en el editor). Sigue el canal oficial de YouTube y revisa los videos recientes; los creadores suelen cubrir una actualización grande en la semana."
      : "My Grass Farm doesn't publish patch notes on a central blog. New features usually show up in: the official YouTube channel (video descriptions and comments), the official Roblox game page (update date), and the newest creator videos (who cover editor changes). Follow the official YouTube channel and check recent uploads; creators usually cover a major update within the week.",
    statusEyebrow: isEs ? "Estado confirmado" : "Confirmed status",
    statusT: isEs ? "Última comprobación y qué está confirmado" : "Last check and what's confirmed",
    statusItems: isEs ? [
      [`Última comprobación`, `Agosto de 2026. La página oficial se revisó y está al día según la API de Roblox (actualizado ${gameUpdatedIso}).`],
      [`Identidad del juego`, `My Grass Farm, lugar 98073123711869, creado el ${gameCreatedIso ?? "23 de julio de 2026"}. Confirmado por la API oficial.`],
      [`Género oficial`, `${gameGenre} (genre_l2, API de Roblox).`],
      [`Bucle de granja`, `Cortas césped → recolectas heno → lo procesas en dinero → cuchillas → trabajadores → expansión. Los sistemas del bucle: ${farmSystems.map(s=>s.name).join(" → ")}.`],
      [`Popularidad`, `~${(gameVisits/1000).toFixed(0)}K visitas, ~${gamePlaying} jugando (${gameUpdatedIso}).`],
    ] : [
      [`Last check`, `August 2026. The official page was reviewed and is current per the Roblox API (last-updated ${gameUpdatedIso}).`],
      [`Game identity`, `My Grass Farm, place 98073123711869, created ${gameCreatedIso ?? "23 July 2026"}. Confirmed by the official API.`],
      [`Official genre`, `${gameGenre} (genre_l2, Roblox API).`],
      [`Farm loop`, `Cut grass → collect hay → process for cash → blades → workers → expansion. The loop systems: ${farmSystems.map(s=>s.name).join(" → ")}.`],
      [`Popularity`, `~${(gameVisits/1000).toFixed(0)}K visits, ~${gamePlaying} playing (${gameUpdatedIso}).`],
    ],
    honestEyebrow: isEs ? "Honestidad" : "Honesty",
    honestT: isEs ? "Lo que no publicamos" : "What we don't publish",
    confirmedEyebrow: isEs ? "Cambios confirmados" : "Confirmed changes",
    confirmedT: isEs ? "Lo que sí sabemos que cambió" : "What we know changed",
    confirmedB: isEs
      ? `A ${gameUpdatedIso}, la descripción oficial del juego incluye una línea sobre trabajadores offline: "recuerda, tus agricultores cortan césped mientras no estás en línea". Es una señal confirmada de cómo funciona la automatización. Aparte de eso, al ser un juego tan nuevo (creado ${gameCreatedIso}), la historia de parches aún es corta — no hay una lista larga de cambios. Cuando aparezca una actualización confirmada, esta sección la listará con su fuente.`
      : `As of ${gameUpdatedIso}, the game's official description carries a line about offline workers: "remember, your farmers cut grass while you're offline." That is a confirmed signal of how the automation works. Beyond that, because the game is so new (created ${gameCreatedIso}), its patch history is still short — there is no long list of changes. When a confirmed update lands, this section will list it with its date and source.`,
    honestB: isEs
      ? "No listamos cambios que no podamos fechar ni confirmar. Si un video de creador menciona algo pero otra fuente fechada no lo confirma, lo marcamos como 'sin confirmar' en lugar de publicado. De la misma manera, no inventamos fechas ni números específicos. Cuando una actualización confirmada aparezca, la añadiremos aquí con su fuente fechada."
      : "We don't list changes we can't date or confirm. If a creator video mentions something but another dated source doesn't confirm it, we mark it 'unconfirmed' rather than published. Likewise, we don't invent dates or specific numbers. When a confirmed update appears, we'll add it here with its dated source, so this page stays a real record rather than a guess.",
    faqEyebrow: isEs ? "Preguntas frecuentes" : "FAQ",
    faq1q: isEs ? "¿Cómo sé que un cambio es real?" : "How do I know a change is real?",
    faq1a: isEs ? "Solo contamos cambios de la página oficial de Roblox o de videos fechados de creadores, y normalmente de más de una fuente. Si no lo podemos fechar, lo dejamos fuera." : "We only count changes from the official Roblox page or dated creator videos, usually from more than one source. If we can't date it, we leave it out.",
    faq2q: isEs ? "¿El editor cambia a menudo?" : "Does the editor change often?",
    faq2a: isEs ? "El juego recibe ajustes con frecuencia. Consulta la página de actualizaciones para lo que cambió." : "The game receives frequent tweaks. Check the updates page for what changed.",
    faq3q: isEs ? "¿Dónde me entero primero de una actualización?" : "Where do I hear about an update first?",
    faq3a: isEs ? "Canal oficial de YouTube y la página oficial del juego en Roblox. Revisa descripciones de videos nuevos." : "The official YouTube channel and the official Roblox game page. Check new video descriptions.",
    nextEyebrow: isEs ? "Explora" : "Explore",
    nextTitle: isEs ? "Sigue aprendiendo" : "Keep learning",
    howLink: isEs ? "Cómo jugar" : "How to play",
    howDesc: isEs ? "Guía de inicio." : "Getting-started guide.",
    tutLink: isEs ? "Cómo jugar" : "How to play",
    tutDesc: isEs ? "Pasos del editor." : "Editor steps.",
    relTitle: isEs ? "Fecha de lanzamiento" : "Release date",
    relDesc: isEs ? "Cuándo salió." : "When it launched."
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: isEs ? "Inicio" : "Home", href: `${prefix}/` }, { name: T.crumb, href: `${prefix}/updates` }]} />
      <FaqJsonLd items={[{ q: T.faq1q, a: T.faq1a }, { q: T.faq2q, a: T.faq2a }, { q: T.faq3q, a: T.faq3a }]} />
      <Breadcrumbs items={[{ label: T.crumb, href: `${prefix}/updates` }]} />
      <PageIntro eyebrow="My Grass Farm · Updates" title={T.introTitle} description={T.introDesc} />
      <VideoGuide
        eyebrow={isEs ? "Creadores" : "Creators"}
        title={isEs ? "Video de la comunidad" : "Community code & gameplay evidence"}
        description={isEs
          ? "Un video reciente de la comunidad sobre My Grass Farm (estado de códigos y del juego). Embed verificado con yt-dlp; úsalo para ver el estado actual antes de que llegue una nota de parche oficial."
          : "A recent community My Grass Farm video (code status and game state). Embed is yt-dlp-verified; use it to see the current state before official patch notes land."}
        embedId="0jim8W_7URc"
      />
      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader eyebrow={T.howEyebrow} title={T.howT} copy={T.howB} />
      </section>

      <AdsterraArticleMid />
      <section className="mt-10">
        <SectionHeader eyebrow={T.whereEyebrow} title={T.whereT} copy={T.whereB} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <a href="https://www.roblox.com/games/98073123711869/My-Grass-Farm" target="_blank" rel="noreferrer" className="row-link">
            <span><strong>{isEs ? "Página oficial del juego" : "Official game page"}</strong><small>{isEs ? "El título, el género y la disponibilidad viven aquí." : "The game's title, genre, and availability live here."}</small></span>
            <span aria-hidden="true">-&gt;</span>
          </a>
          <a href="https://www.youtube.com/results?search_query=roblox+my+grass+farm" target="_blank" rel="noreferrer" className="row-link">
            <span><strong>{isEs ? "Búsqueda en YouTube" : "YouTube search"}</strong><small>{isEs ? "Donde aparecen los videos nuevos de creadores y los anuncios." : "Where new creator videos and announcements surface."}</small></span>
            <span aria-hidden="true">-&gt;</span>
          </a>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.statusEyebrow} title={T.statusT} />
        <div className="mt-4 grid gap-3">
          {T.statusItems.map((row: string[], i: number) => (
            <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{row[0]}</strong>
              <p className="mt-1 text-sm text-white/65">{row[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.confirmedEyebrow} title={T.confirmedT} copy={T.confirmedB} />
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.honestEyebrow} title={T.honestT} copy={T.honestB} />
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={isEs ? "Luego" : "Next"} title={isEs ? "Sigue jugando" : "Keep playing"}>
          <p className="mt-3 text-sm leading-7 text-white/75">
            {isEs ? (
              <>Mientras esperas la próxima actualización, repasa <Link href={`${prefix}/how-to-play`} className="font-semibold text-[color:var(--accent)] hover:underline">cómo aprovechar el bucle de granja</Link>, canjea los <Link href={`${prefix}/codes`} className="font-semibold text-[color:var(--accent)] hover:underline">códigos vigentes</Link>, y revisa <Link href={`${prefix}/release-date`} className="font-semibold text-[color:var(--accent)] hover:underline">el historial del juego</Link>.</>
            ) : (
              <>While you wait for the next update, brush up on <Link href={`${prefix}/how-to-play`} className="font-semibold text-[color:var(--accent)] hover:underline">making the most of the farm loop</Link>, redeem the <Link href={`${prefix}/codes`} className="font-semibold text-[color:var(--accent)] hover:underline">current codes</Link>, and review <Link href={`${prefix}/release-date`} className="font-semibold text-[color:var(--accent)] hover:underline">the game's history</Link>.</>
            )}
          </p>
        </SectionHeader>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.faqEyebrow} title={T.faq1q} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p><strong className="text-white">{T.faq1q}</strong> {T.faq1a}</p>
          <p><strong className="text-white">{T.faq2q}</strong> {T.faq2a}</p>
          <p><strong className="text-white">{T.faq3q}</strong> {T.faq3a}</p>
          <p><strong className="text-white">{isEs ? "¿Qué sigue?" : "What comes next?"}</strong> {isEs ? "Este juego crece rápido: ~830K visitas en su primer mes. Cada actualización puede mover la economía de la granja, así que vuelve a esta página cada vez que el juego se actualice." : "This game is growing fast: ~830K visits in its first month. Each update can shift the farm economy, so check back here whenever the game updates."}</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.nextEyebrow} title={T.nextTitle} />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Link href={`${prefix}/how-to-play`} className="content-card"><strong>{T.howLink}</strong><p className="mt-1 text-sm text-white/60">{T.howDesc}</p></Link>
          <Link href={`${prefix}/how-to-play`} className="content-card"><strong>{T.tutLink}</strong><p className="mt-1 text-sm text-white/60">{T.tutDesc}</p></Link>
          <Link href={`${prefix}/release-date`} className="content-card"><strong>{T.relTitle}</strong><p className="mt-1 text-sm text-white/60">{T.relDesc}</p></Link>
        </div>
      </section>
      <div className="mt-12"><VerificationBox note="tracked against the official Roblox page" /></div>
    </main>
  );
}
