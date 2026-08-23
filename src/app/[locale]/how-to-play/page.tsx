import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { locales } from "@/i18n/locales";
import { monthLabel, siteConfig } from "@/data/site";
import { BreadcrumbJsonLd, FaqJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs, PageIntro, SectionHeader } from "@/components/ui/content";
import { VerificationBox } from "@/components/ui/VerificationBox";
import { PlayQuickRules, VideoGuide, DataTable } from "@/components/ui/EvomonBlocks";
import { PerPageLinks } from "@/components/ui/PerPageLinks";
import { gameEntities, farmSystems, gameGenre, gameCreator } from "@/data/game-db";
import { AdsterraArticleTop, AdsterraArticleMid } from "@/components/ads";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = siteConfig.domain;
  const path = locale === "es" ? "/es/how-to-play" : "/en/how-to-play";
  return {
    title: locale === "es" ? `Cómo jugar My Grass Farm — tu granja de césped · ${monthLabel}` : `How to Play My Grass Farm — Grow Your Farm · ${monthLabel}`,
    description: locale === "es"
      ? "Guía de inicio para My Grass Farm: corta césped, recolecta heno, conviértelo en dinero, desbloquea cuchillas y contrata trabajadores. Pasos claros."
      : "Getting started guide for My Grass Farm: cut grass, collect hay, process it for cash, unlock blades, and hire workers. Clear steps.",
    alternates: { canonical: `${base}${path}/`, languages: { en: `${base}/en/how-to-play/`, es: `${base}/es/how-to-play/`, "x-default": `${base}/en/how-to-play/` } }
  };
}

export default async function HowToPlayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (locale !== "en" && locale !== "es") notFound();
  const isEs = locale === "es";
  const prefix = locale === "es" ? "/es" : "/en";
  const T = {
    crumb: isEs ? "Cómo jugar" : "How to Play",
    introTitle: isEs ? "Cómo jugar My Grass Farm" : "How to play My Grass Farm",
    introDesc: isEs
      ? `My Grass Farm es un ${gameGenre} en Roblox: cortas césped → recolectas heno → lo cambias por dinero → desbloqueas cuchillas → contratas trabajadores para que corten por ti. Abajo, la ruta desde cero.`
      : `My Grass Farm is a Roblox ${gameGenre}: cut grass → collect hay → trade it for cash → unlock blades → hire workers to cut for you. The route from scratch is below.`,
    section1Eyebrow: isEs ? "Lo esencial" : "The essentials",
    section1T: isEs ? "Qué es My Grass Farm" : "What My Grass Farm is",
    section1B: isEs ? [
        "Es un tycoon de granja: cortas césped para obtener heno, que procesas en dinero.",
        "El dinero se reinvierte en cuchillas (cortan más rápido) y trabajadores (cosechan por ti).",
        "Es incremental: cada mejora acelera la producción. No es un shooter ni un juego de combate PvP.",
      ] : [
        "It's a farm tycoon: you cut grass to collect hay, then process hay into cash.",
        "Cash reinvests into blades (cut faster) and workers (harvest for you).",
        "It's incremental: every upgrade speeds production. Not a shooter or a PvP-combat game.",
      ],
    section2Eyebrow: isEs ? "Primeros pasos" : "First steps",
    section2T: isEs ? "Tu primer día" : "Your first day",
    section2Intro: isEs
      ? "El objetivo temprano es sencillo: corta césped → heno → dinero, y siente cómo cada cuchilla acelera el bucle."
      : "The early goal is simple: cut grass → hay → cash, and feel how each blade upgrade speeds the loop.",
    section2Steps: isEs ? [
      ["Entra al juego", "Entra a My Grass Farm desde la página oficial de Roblox. Un servidor con pocos jugadores suele ser más tranquilo."],
      ["Corta césped para get heno", "Tu ingreso base: corta césped y recolecta heno (🌱). Es la materia prima de toda la economía."],
      ["Procesa heno para dinero", "Convierte el heno en dinero (💸). El dinero es la moneda de todas las mejoras."],
      ["Desbloquea cuchillas", "Compra cuchillas más potentes (🗡️) para cortar más rápido y subir tu heno por segundo."],
      ["Contrata trabajadores y expande", "Los trabajadores (🧑‍🌾) cosechan por ti; luego expande tu granja (🏡) para escalar."],
    ] : [
      ["Join the game", "Enter My Grass Farm from the official Roblox page. A lower-player-count server is usually calmer."],
      ["Cut grass to collect hay", "Your base income: cut grass and collect hay (🌱). It's the raw material of the whole farm economy."],
      ["Process hay for cash", "Convert hay into cash (💸). Cash is the currency of every upgrade."],
      ["Unlock blades", "Buy more powerful blades (🗡️) to cut faster and raise your hay-per-second."],
      ["Hire workers and expand", "Workers (🧑‍🌾) farm for you; then expand your farm (🏡) to scale."],
    ],
    econEyebrow: isEs ? "Sistema de granja" : "Farm system",
    econT: isEs ? "Cómo funciona la economía" : "How the farm economy works",
    econB: isEs
      ? `El bucle de My Grass Farm, según la descripción oficial, es: ${farmSystems.map(s=>s.name).join(" → ")}. No inventamos números: la tabla resume el concepto verificado, no cifras exactas.`
      : `The My Grass Farm loop, per the official description, is: ${farmSystems.map(s=>s.name).join(" → ")}. We don't invent numbers: the table summarizes the verified concept, not exact figures.`,
    econRows: isEs ? [
      ["Heno = ingreso base", "Cortar césped recolecta heno. Todo empieza en tu producción de heno."],
      ["Dinero = mejoras", "Procesa heno para dinero, la moneda de cuchillas y trabajadores."],
      ["Cuchillas = velocidad", "Más cuchilla = más heno por segundo = más dinero."],
      ["Trabajadores = automatización", "Contratar trabajadores añade cosecha automática (ingreso idle)."],
      ["Trabajadores = ingreso offline", "Un video de creador (yt-dlp verificado) confirma: tus trabajadores siguen cortando césped aunque estés fuera."],
    ] : [
      ["Hay = base income", "Cutting grass collects hay. Everything starts from your hay production."],
      ["Cash = upgrades", "Process hay for cash, the currency of blades and workers."],
      ["Blades = speed", "More blade = more hay per second = more cash."],
      ["Workers = automation", "Hiring workers adds automatic harvesting (idle income)."],
      ["Workers = offline income", "A creator video (yt-dlp-verified) confirms: your workers keep cutting grass even while you're offline."],
    ],
    econNote: isEs
      ? "Honestidad: no hay una fuente oficial con fecha que publique cifras exactas (precio de cada cuchilla, heno por segundo, producción por trabajador). Cuando un creador o la actualización oficial los confirme, esta sección se actualizará con números verificados. Hasta entonces, aquí no hay números inventados."
      : "Honesty: there is no dated official source publishing exact figures (blade prices, hay-per-second, per-worker production). When a creator or the official update confirms them, this section will be updated with verified numbers. Until then, no numbers are invented here.",
    pitfallsEyebrow: isEs ? "Errores comunes" : "Common mistakes",
    pitfallsTitle: isEs ? "Qué evitar" : "What to avoid",
    pit1t: isEs ? "Gastar dinero en cada novedad" : "Spending cash on every upgrade",
    pit1b: isEs ? "En un tycoon, reinvierte en el upgrade de mayor retorno (cuchilla o trabajador que más suba tu producción), no en cada objeto nuevo." : "In a tycoon, reinvest in the highest-return upgrade (the blade or worker that most raises production), not every new item.",
    pit2t: isEs ? "Ignorar la automatización" : "Ignoring automation",
    pit2b: isEs ? "Los trabajadores generan ingreso aunque no estés cortando; son la clave del crecimiento idle." : "Workers generate income even when you aren't cutting; they are the key to idle growth.",
    pit3t: isEs ? "Códigos no verificados" : "Unverified codes",
    pit3b: isEs ? "Usa solo códigos que confirmes en la página de códigos; los no verificados pueden estar expirados o ser falsos." : "Only use codes you confirm on the codes page; unverified ones may be expired or fake.",
    faqEyebrow: isEs ? "Preguntas" : "FAQ",
    faq1q: isEs ? "¿Es gratis jugar?" : "Is it free to play?",
    faq1a: isEs ? "Sí, el juego es gratis en Roblox. Los códigos dan recompensas opcionales, pero no se requieren para jugar." : "Yes, the game is free on Roblox. Codes give optional rewards but aren't required to play.",
    faq2q: isEs ? "¿Es un juego de combate?" : "Is it a combat game?",
    faq2a: isEs ? "No, el foco es la granja tycoon (cortar césped, heno, dinero, mejoras). Verifica la página oficial para modos actuales." : "No, the focus is the farm tycoon (cutting grass, hay, cash, upgrades). Check the official page for current modes.",
    nextEyebrow: isEs ? "Sigue leyendo" : "Keep reading",
    nextTitle: isEs ? "Continúa desde aquí" : "Continue from here",
  };

  const qrRules = isEs
    ? [`Corta césped para recolectar heno.`, `Procesa el heno para conseguir dinero.`, `Desbloquea cuchillas para cortar más rápido.`, `Contrata trabajadores y expande tu granja.`]
    : [`Cut grass to collect hay.`, `Process hay for cash.`, `Unlock blades to cut faster.`, `Hire workers and expand your farm.`];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <BreadcrumbJsonLd items={[{ name: isEs ? "Inicio" : "Home", href: `${prefix}/` }, { name: T.crumb, href: `${prefix}/how-to-play` }]} />
      <FaqJsonLd items={[{ q: T.faq1q, a: T.faq1a }, { q: T.faq2q, a: T.faq2a }]} />
      <HowToJsonLd name={T.introTitle} description={T.introDesc} steps={T.section2Steps.slice(0, 3).map((s) => ({ name: s[0], text: s[1] }))} />
      <Breadcrumbs items={[{ label: T.crumb, href: `${prefix}/how-to-play` }]} />
      <PageIntro eyebrow="My Grass Farm · How to Play" title={T.introTitle} description={T.introDesc} />
      <PlayQuickRules label={isEs ? "En 30 segundos" : "In 30 seconds"} rules={qrRules} />

      {/* ANSWER FIRST: the starting route, before any "what it is" talk. */}
      <section className="mt-8">
        <SectionHeader eyebrow={T.section2Eyebrow} title={T.section2T} copy={T.section2Intro} />
        <ol className="mt-4 grid gap-3 text-sm text-white/75">
          {T.section2Steps.map((s: string[], i: number) => (
            <li key={i} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{i + 1}. {s[0]}</strong>
              <p className="mt-1 text-white/65">{s[1]}</p>
            </li>
          ))}
        </ol>
      </section>

      <AdsterraArticleTop />

      <section className="mt-10">
        <SectionHeader eyebrow={T.section1Eyebrow} title={T.section1T} />
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-white/75 list-disc pl-5">
          {T.section1B.map((p: string) => <li key={p}>{p}</li>)}
        </ul>
      </section>

      <AdsterraArticleMid />

      {/* Farm roster — the farm's pieces (from the official description) */}
      <section className="mt-10">
        <DataTable
          eyebrow={isEs ? "Granja" : "Farm"}
          title={isEs ? "Las piezas de tu granja" : "Your farm's pieces"}
          description={isEs
            ? "Estas piezas vienen de la descripción oficial del juego: heno, dinero, cuchillas, trabajadores y expansión."
            : "These pieces come from the game's official description: hay, cash, blades, workers, and expansion."}
          columns={[isEs ? "Pieza" : "Piece", isEs ? "Rol" : "Role", isEs ? "Misión en la granja" : "Farm job"]}
          rows={gameEntities.map((e) => [e.name, e.role, e.farmJob])}
        />
      </section>

      {/* Farm economy — the loop, in plain words */}
      <section className="mt-10">
        <SectionHeader eyebrow={T.econEyebrow} title={T.econT} copy={T.econB} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          {T.econRows.map((r: string[], i: number) => (
            <div key={i} className="rounded-lg border border-white/10 bg-black/20 p-4">
              <strong className="text-white">{r[0]}</strong>
              <p className="mt-1 text-white/65">{r[1]}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-lg border border-dashed border-white/15 bg-black/10 p-4 text-xs leading-6 text-white/50">
          {T.econNote}
        </p>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.pitfallsEyebrow} title={T.pitfallsTitle} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p><strong className="text-white">{T.pit1t}</strong> {T.pit1b}</p>
          <p><strong className="text-white">{T.pit2t}</strong> {T.pit2b}</p>
          <p><strong className="text-white">{T.pit3t}</strong> {T.pit3b}</p>
        </div>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={isEs ? "Siguiente" : "Next"} title={isEs ? "Pega el impulso" : "Keep the momentum"}>
          <p className="mt-3 text-sm leading-7 text-white/75">
            {isEs ? (
              <>Con el bucle dominado, canjea los <Link href={`${prefix}/codes`} className="font-semibold text-[color:var(--accent)] hover:underline">códigos RELEASE y MERCHANT</Link> para un empujón, mira <Link href={`${prefix}/release-date`} className="font-semibold text-[color:var(--accent)] hover:underline">desde cuándo existe el juego</Link>, y sigue <Link href={`${prefix}/updates`} className="font-semibold text-[color:var(--accent)] hover:underline">los cambios recientes</Link> para adaptarte.</>
            ) : (
              <>With the loop down, redeem the <Link href={`${prefix}/codes`} className="font-semibold text-[color:var(--accent)] hover:underline">RELEASE and MERCHANT codes</Link> for a boost, check <Link href={`${prefix}/release-date`} className="font-semibold text-[color:var(--accent)] hover:underline">when the game launched</Link>, and track <Link href={`${prefix}/updates`} className="font-semibold text-[color:var(--accent)] hover:underline">recent changes</Link> to stay ahead.</>
            )}
          </p>
        </SectionHeader>
      </section>

      <section className="mt-10">
        <SectionHeader eyebrow={T.faqEyebrow} title={T.faq1q} />
        <div className="mt-4 grid gap-3 text-sm text-white/75">
          <p><strong className="text-white">{T.faq1q}</strong> {T.faq1a}</p>
          <p><strong className="text-white">{T.faq2q}</strong> {T.faq2a}</p>
        </div>
      </section>

      {/* Keep reading — contextual routes (seo-eeat-audit §D) */}
      <PerPageLinks
        eyebrow={T.nextEyebrow}
        title={T.nextTitle}
        groups={[
          {
            title: isEs ? "Siguiente" : "Next",
            links: [
              { href: `${prefix}/release-date`, label: isEs ? "Fecha de lanzamiento" : "Release date", hint: isEs ? "Cuándo salió el juego." : "When the game launched." },
              { href: `${prefix}/updates`, label: isEs ? "Actualizaciones" : "Updates", hint: isEs ? "Novedades del juego." : "What's new in the game." },
            ],
          },
          {
            title: isEs ? "Recursos" : "Resources",
            links: [
              { href: `${prefix}/codes`, label: isEs ? "Códigos" : "Codes", hint: isEs ? "Recompensas confirmadas." : "Confirmed rewards." },
              { href: `/wiki`, label: isEs ? "Explorador Wiki" : "Wiki Explorer", hint: isEs ? "Todo sobre My Grass Farm." : "Everything about My Grass Farm." },
            ],
          },
        ]}
      />
    </main>
  );
}
