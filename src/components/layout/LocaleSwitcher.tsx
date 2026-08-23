"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n/locales";

const EN_MATRIX_PATHS = [
  "/codes", "/how-to-play", "/updates", "/release-date"
];

/**
 * Content pages in ES: homepage + matrix pages + codes (codes was promoted into
 * [locale] 2026-08-23). Root content pages - wiki/sources etc - have no ES twin yet.
 * If a path has no ES copy, fall back to the /es homepage so we never emit a 404 link.
 *
 * URL model: EN matrix pages live at /en/... ; root content pages at /...
 * (no /en prefix). ES matrix pages at /es/... ; ES content pages mirror EN matrix.
 */
function switchLocalePath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/^\/(en|es)(?=\/|$)/, "");
  const core = clean.startsWith("/") ? clean : `/${clean}` || "/";
  const isMatrix = core === "/" || EN_MATRIX_PATHS.some((p) => core.startsWith(p));

  if (target === "en") {
    return isMatrix ? `/en${core === "/" ? "" : core}` : core;
  }
  // target === es
  if (core === "/") return "/es";
  if (EN_MATRIX_PATHS.some((p) => core.startsWith(p))) return `/es${core}`;
  return "/es"; // ES twin of this content page doesn't exist yet
}

const LABELS: Record<Locale, string> = { en: "EN", es: "ES" };

export function LocaleSwitcher() {
  const pathname = usePathname();

  return (
    <nav aria-label="Language switcher" className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 px-1 py-1">
      {locales.map((loc, i) => {
        const href = switchLocalePath(pathname, loc);
        // active detection: EN is active on / or /en/* ; ES active on /es*
        const isActive =
          (loc === "en" && !pathname.startsWith("/es")) ||
          (loc === "es" && pathname.startsWith("/es"));
        return (
          <span key={loc} className="flex items-center">
            {i > 0 ? <span className="mx-0.5 h-3 w-px bg-white/15" /> : null}
            <Link
              href={href}
              aria-current={isActive ? "true" : undefined}
              className={`rounded-md px-2 py-1 text-xs font-bold transition ${
                isActive ? "bg-white/15 text-white" : "text-white/55 hover:bg-white/10 hover:text-white"
              }`}
            >
              {LABELS[loc]}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}
