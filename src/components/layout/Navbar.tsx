"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/data/site";
import { navEs } from "@/data/home-es";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isEs = pathname.startsWith("/es");
  const navGroups = isEs ? navEs : siteConfig.navGroups;
  const localHref = (href: string) => (isEs && href.startsWith("/en") ? href.replace("/en", "/es") : href);
  const unitsLabel = isEs ? "Cómo jugar" : "How to Play";
  const codesLabel = isEs ? "Códigos" : "Codes";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--bg)]/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl min-w-0 items-center justify-between gap-4 px-4 pr-16 lg:pr-4">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none" onClick={() => setMobileOpen(false)}>
          <Image src="/game-icon.png" alt="" width={40} height={40} className="h-10 w-10 rounded-lg border border-white/10 bg-black/30" />
          <span className="truncate text-sm font-extrabold text-white sm:text-lg">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navGroups.map((group) => {
            const isActive = pathname === group.href || (group.href !== "/" && pathname.startsWith(`${group.href}/`));

            return (
              <div key={group.label} className="group relative">
                <Link
                  href={localHref(group.href)}
                  className={`nav-link ${isActive ? "nav-link-active" : ""}`}
                >
                  {group.label}
                </Link>
                {group.items.length > 0 ? (
                  <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <div className="rounded-lg border border-white/10 bg-[#111113] p-2 shadow-2xl">
                      {group.items.map((item) => (
                        <Link key={item.href} href={localHref(item.href)} className="block rounded-md px-3 py-2 text-sm text-white/72 hover:bg-white/10 hover:text-white">
                          <strong className="block text-white">{item.label}</strong>
                          <span className="mt-1 block text-xs text-white/50">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          <Link href={localHref("/en/how-to-play")} className="button-primary button-small">
            {unitsLabel}
          </Link>
          <Link href={localHref("/en/codes")} className="button-secondary button-small">
            {codesLabel}
          </Link>
          <LocaleSwitcher />
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-site-nav"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span aria-hidden="true">{mobileOpen ? "x" : "="}</span>
        </button>
      </div>

      {mobileOpen ? (
        <nav id="mobile-site-nav" className="border-t border-white/10 bg-[#111113] lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="grid grid-cols-2 gap-2">
                <Link href={localHref("/en/how-to-play")} onClick={() => setMobileOpen(false)} className="button-primary button-small">
                  {unitsLabel}
                </Link>
                <Link href={localHref("/en/codes")} onClick={() => setMobileOpen(false)} className="button-secondary button-small">
                  {codesLabel}
                </Link>
              </div>
              <LocaleSwitcher />
            </div>
            {navGroups.map((group) => (
              <div key={group.label} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                <Link
                  href={localHref(group.href)}
                  onClick={() => setMobileOpen(false)}
                  className="block font-bold text-white"
                >
                  {group.label}
                </Link>
                {group.items.length > 0 ? (
                  <div className="mt-3 grid gap-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={localHref(item.href)}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md bg-black/25 px-3 py-2 text-sm text-white/70"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
