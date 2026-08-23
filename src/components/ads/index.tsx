"use client";

import type { ReactNode, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { runtimeConfig } from "@/lib/runtime-config";

type BannerSize = "160x300" | "300x250" | "320x50" | "468x60" | "728x90" | "160x600";

type BannerConfig = {
  height: number;
  key?: string;
  scriptUrl?: string;
  width: number;
};

const bannerConfigs: Record<BannerSize, BannerConfig> = {
  "160x300": {
    width: 160,
    height: 300,
    key: runtimeConfig.adsterraBanner160x300Key,
    scriptUrl: runtimeConfig.adsterraBanner160x300ScriptUrl
  },
  "300x250": {
    width: 300,
    height: 250,
    key: runtimeConfig.adsterraBanner300x250Key,
    scriptUrl: runtimeConfig.adsterraBanner300x250ScriptUrl
  },
  "320x50": {
    width: 320,
    height: 50,
    key: runtimeConfig.adsterraBanner320x50Key,
    scriptUrl: runtimeConfig.adsterraBanner320x50ScriptUrl
  },
  "468x60": {
    width: 468,
    height: 60,
    key: runtimeConfig.adsterraBanner468x60Key,
    scriptUrl: runtimeConfig.adsterraBanner468x60ScriptUrl
  },
  "728x90": {
    width: 728,
    height: 90,
    key: runtimeConfig.adsterraBanner728x90Key || runtimeConfig.adsterraLeaderboardId,
    scriptUrl: runtimeConfig.adsterraBanner728x90ScriptUrl
  },
  "160x600": {
    width: 160,
    height: 600,
    key: runtimeConfig.adsterraBanner160x600Key,
    scriptUrl: runtimeConfig.adsterraBanner160x600ScriptUrl
  }
};

const CLEAN_AD_ROUTES = new Set(["/about", "/contact", "/disclosure", "/privacy", "/sources", "/terms"]);

declare global {
  interface Window {
    atOptions?: {
      key?: string;
      format: "iframe";
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
    gtag?: (...args: unknown[]) => void;
  }
}

let bannerScriptQueue = Promise.resolve();

function normalizeScriptUrl(url?: string) {
  if (!url) return undefined;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function getBannerScriptUrl(config: BannerConfig) {
  if (config.scriptUrl) return normalizeScriptUrl(config.scriptUrl);
  if (!config.key) return undefined;
  return `https://illuminationacceptedkeynote.com/${config.key}/invoke.js`;
}

function hasBannerSlot(size: BannerSize) {
  const config = bannerConfigs[size];
  return Boolean(getBannerScriptUrl(config) && config.key);
}

function hasLeaderboardSlot() {
  return hasBannerSlot("728x90") || hasBannerSlot("468x60") || hasBannerSlot("320x50");
}

function hasNativeSlot(containerId?: string, scriptUrl?: string) {
  return Boolean(containerId && normalizeScriptUrl(scriptUrl));
}

function isCleanAdRoute(pathname?: string | null) {
  if (!pathname) return false;
  const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return CLEAN_AD_ROUTES.has(cleanPath);
}

function useCleanAdRoute() {
  return isCleanAdRoute(usePathname());
}

function trackAdEvent(eventName: string, payload: Record<string, unknown>) {
  window.gtag?.("event", eventName, {
    event_category: "ads",
    ad_network: "adsterra",
    ...payload
  });
}

function useAdVisibilityTracking(hostRef: RefObject<HTMLElement | null>, slotName: string) {
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        trackAdEvent("ad_slot_viewed", {
          ad_slot: slotName,
          visible_ratio: Math.round(entry.intersectionRatio * 100)
        });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [hostRef, slotName]);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

function AdvertisementShell({
  children,
  className = "",
  label = "Advertisement"
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <aside className={`ad-shell ${className}`} aria-label={label}>
      <span className="ad-label">{label}</span>
      {children}
    </aside>
  );
}

function AdsterraBannerUnit({
  className = "",
  slotName,
  size
}: {
  className?: string;
  slotName?: string;
  size: BannerSize;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  // hasCreative: false until an ad creative actually renders. The shell only
  // occupies space when a real creative lands — an empty ADVERTISEMENT block
  // is never shown (fixes the blank ad-framework on every article page).
  const [hasCreative, setHasCreative] = useState(false);
  const config = bannerConfigs[size];
  const scriptUrl = getBannerScriptUrl(config);
  const resolvedSlotName = slotName || `banner_${size}`;

  useAdVisibilityTracking(hostRef, resolvedSlotName);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !scriptUrl || !config.key) return;

    trackAdEvent("ad_slot_mounted", { ad_slot: resolvedSlotName, ad_format: size });
    let cancelled = false;
    host.replaceChildren();

    bannerScriptQueue = bannerScriptQueue.then(
      () =>
        new Promise<void>((resolve) => {
          if (cancelled || !host.isConnected) {
            resolve();
            return;
          }

          window.atOptions = {
            key: config.key,
            format: "iframe",
            height: config.height,
            width: config.width,
            params: {}
          };

          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = scriptUrl;
          script.async = false;

          let settled = false;
          const finish = (eventName: string) => {
            if (settled) return;
            settled = true;
            trackAdEvent(eventName, { ad_slot: resolvedSlotName, ad_format: size });
            resolve();
          };

          const queueTimeout = window.setTimeout(() => finish("ad_script_queue_timeout"), 8000);
          script.onload = () => {
            window.clearTimeout(queueTimeout);
            finish("ad_script_loaded");
          };
          script.onerror = () => {
            window.clearTimeout(queueTimeout);
            finish("ad_script_error");
          };
          host.appendChild(script);
        })
    );

    const emptyCheck = window.setTimeout(() => {
      const rendered = Boolean(host.querySelector("iframe, ins, a, img"));
      trackAdEvent(rendered ? "ad_creative_rendered" : "ad_empty_after_5s", {
        ad_slot: resolvedSlotName,
        ad_format: size
      });
      // collapse the shell if no ad creative actually landed — never leave an
      // empty reserved framework (blank ADVERTISEMENT block) on the page.
      setHasCreative(rendered || Boolean(host.querySelector(".atcodes.ad-area, [id^='container_'], [id^='placement']")));
    }, 5000);

    return () => {
      cancelled = true;
      window.clearTimeout(emptyCheck);
      host.replaceChildren();
    };
  }, [config.height, config.key, config.width, resolvedSlotName, scriptUrl, size]);

  if (!scriptUrl || !config.key) return null;

  // The host reserves no space until a creative renders; the wrapper (shell +
  // label + min-height) only mounts once an ad actually lands. This kills the
  // blank ADVERTISEMENT framework that used to appear on every article page.
  return (
    <div className={hasCreative ? undefined : "hidden"}>
      <AdvertisementShell className={className}>
        <div
          ref={hostRef}
          className="ad-host"
          style={{ minHeight: config.height, width: "100%", maxWidth: config.width }}
        />
      </AdvertisementShell>
    </div>
  );
}

function usePreferredLeaderboardSize() {
  const [size, setSize] = useState<BannerSize | null>(null);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const tabletQuery = window.matchMedia("(min-width: 500px)");
    const chooseSize = () => {
      if (desktopQuery.matches && hasBannerSlot("728x90")) {
        setSize("728x90");
        return;
      }
      if (tabletQuery.matches && hasBannerSlot("468x60")) {
        setSize("468x60");
        return;
      }
      if (hasBannerSlot("320x50")) {
        setSize("320x50");
        return;
      }
      if (hasBannerSlot("300x250")) {
        setSize("300x250");
        return;
      }
      setSize(null);
    };

    chooseSize();
    desktopQuery.addEventListener("change", chooseSize);
    tabletQuery.addEventListener("change", chooseSize);
    return () => {
      desktopQuery.removeEventListener("change", chooseSize);
      tabletQuery.removeEventListener("change", chooseSize);
    };
  }, []);

  return size;
}

function AdsterraNativeUnit({
  className = "",
  containerId,
  slotName = "native",
  scriptUrl
}: {
  className?: string;
  containerId?: string;
  slotName?: string;
  scriptUrl?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Same "no empty framework" guarantee as AdsterraBannerUnit: the native shell
  // hides until a real creative renders. Deny an empty aside+label on the page.
  const [hasCreative, setHasCreative] = useState(false);
  const cleanContainerId = useMemo(() => containerId?.replace(/^#/, ""), [containerId]);
  const normalizedScriptUrl = normalizeScriptUrl(scriptUrl);

  useAdVisibilityTracking(hostRef, slotName);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !cleanContainerId || !normalizedScriptUrl) return;

    trackAdEvent("ad_slot_mounted", { ad_slot: slotName, ad_format: "native" });
    host.replaceChildren();

    const container = document.createElement("div");
    container.id = cleanContainerId;
    host.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = normalizedScriptUrl;
    script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: slotName, ad_format: "native" });
    script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: slotName, ad_format: "native" });
    host.appendChild(script);

    const emptyCheck = window.setTimeout(() => {
      const rendered = Boolean(container.querySelector("iframe, ins, a, img"));
      trackAdEvent(rendered ? "ad_creative_rendered" : "ad_empty_after_5s", {
        ad_slot: slotName,
        ad_format: "native"
      });
      setHasCreative(rendered);
    }, 5000);

    return () => {
      window.clearTimeout(emptyCheck);
      host.replaceChildren();
    };
  }, [cleanContainerId, normalizedScriptUrl, slotName]);

  if (!cleanContainerId || !normalizedScriptUrl) return null;

  return (
    <div className={hasCreative ? undefined : "hidden"}>
      <AdvertisementShell className={className}>
        <div ref={hostRef} className="ad-host ad-host-native" />
      </AdvertisementShell>
    </div>
  );
}

export function AdsterraGlobalScripts() {
  useEffect(() => {
    runtimeConfig.adsterraGlobalScriptUrls.forEach((scriptUrl, index) => {
      const normalizedScriptUrl = normalizeScriptUrl(scriptUrl);
      if (!normalizedScriptUrl) return;

      const scriptId = `adsterra-global-${index}`;
      if (document.getElementById(scriptId)) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.src = normalizedScriptUrl;
      script.async = true;
      script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: scriptId, ad_format: "global" });
      script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: scriptId, ad_format: "global" });
      document.body.appendChild(script);
    });
  }, []);

  return null;
}

export function AdsterraSmartLink() {
  return null;
}

export function AdsterraSmartLinkAnchor({
  children = "Sponsored link",
  className = ""
}: {
  children?: ReactNode;
  className?: string;
}) {
  if (!runtimeConfig.adsterraSmartLinkUrl) return null;

  return (
    <a
      className={className}
      href={runtimeConfig.adsterraSmartLinkUrl}
      rel="nofollow sponsored noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function AdsterraBanner() {
  return <AdsterraBannerUnit size="300x250" slotName="content_rectangle" />;
}

export function AdsterraRectangle() {
  return <AdsterraBannerUnit size="300x250" slotName="bottom_rectangle" />;
}

export function AdsterraLeaderboard() {
  const size = usePreferredLeaderboardSize();
  if (!size) return null;

  return (
    <div className="ad-leaderboard">
      <AdsterraBannerUnit size={size} slotName={size === "728x90" ? "top_leaderboard" : `responsive_${size}`} />
    </div>
  );
}

export function AdsterraNative1() {
  return (
    <AdsterraNativeUnit
      containerId={runtimeConfig.adsterraNative1Id}
      slotName="native_primary"
      scriptUrl={runtimeConfig.adsterraNative1ScriptUrl}
    />
  );
}

export function AdsterraArticleTop() {
  const cleanAdRoute = useCleanAdRoute();
  if (cleanAdRoute || !hasLeaderboardSlot()) return null;

  return (
    <div className="ad-placement ad-placement-top">
      <AdsterraLeaderboard />
    </div>
  );
}

export function AdsterraArticleMid() {
  const cleanAdRoute = useCleanAdRoute();
  if (cleanAdRoute || (!hasBannerSlot("300x250") && !hasBannerSlot("160x300"))) return null;

  return (
    <div className="ad-placement ad-placement-mid">
      <div className="ad-pair">
        {hasBannerSlot("300x250") ? <AdsterraBanner /> : null}
        {hasBannerSlot("160x300") ? <AdsterraBannerUnit size="160x300" slotName="content_160x300" /> : null}
      </div>
    </div>
  );
}

export function AdsterraArticleBottom() {
  const cleanAdRoute = useCleanAdRoute();
  if (cleanAdRoute || !hasNativeSlot(runtimeConfig.adsterraNative1Id, runtimeConfig.adsterraNative1ScriptUrl)) return null;

  return (
    <div className="ad-placement ad-placement-bottom">
      <AdsterraNative1 />
    </div>
  );
}

export function AdsterraToolAd() {
  const cleanAdRoute = useCleanAdRoute();
  if (cleanAdRoute || !hasLeaderboardSlot()) return null;

  return (
    <div className="ad-placement ad-placement-tool">
      <AdsterraLeaderboard />
    </div>
  );
}

export function AdsterraToolBottom() {
  const cleanAdRoute = useCleanAdRoute();
  if (cleanAdRoute || !hasBannerSlot("300x250")) return null;

  return (
    <div className="ad-placement ad-placement-tool-bottom">
      <AdsterraRectangle />
    </div>
  );
}

export function AdsterraPopunderGate() {
  const cleanAdRoute = useCleanAdRoute();

  useEffect(() => {
    if (cleanAdRoute) return;
    if (!runtimeConfig.adsterraEnablePopunder || !runtimeConfig.adsterraPopunderScriptUrl) return;

    const pageViewsKey = "roblox-site-adsterra-pageviews";
    const loadedKey = "roblox-site-adsterra-popunder-loaded";
    const nextPageViews = Number(window.sessionStorage.getItem(pageViewsKey) || "0") + 1;
    window.sessionStorage.setItem(pageViewsKey, String(nextPageViews));

    if (window.sessionStorage.getItem(loadedKey)) return;
    if (nextPageViews < runtimeConfig.adsterraPopunderMinPageViews) return;

    const timer = window.setTimeout(() => {
      if (document.getElementById("adsterra-popunder")) return;
      const script = document.createElement("script");
      script.id = "adsterra-popunder";
      script.src = normalizeScriptUrl(runtimeConfig.adsterraPopunderScriptUrl) || "";
      script.async = true;
      script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: "popunder_gate", ad_format: "popunder" });
      script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: "popunder_gate", ad_format: "popunder" });
      document.body.appendChild(script);
      window.sessionStorage.setItem(loadedKey, "true");
    }, runtimeConfig.adsterraPopunderDelayMs);

    return () => window.clearTimeout(timer);
  }, [cleanAdRoute]);

  return null;
}

export function AdsterraSocialBarGate() {
  const cleanAdRoute = useCleanAdRoute();

  useEffect(() => {
    if (cleanAdRoute) return;
    if (!runtimeConfig.adsterraEnableSocialBar || !runtimeConfig.adsterraSocialBarScriptUrl) return;
    if (document.getElementById("adsterra-social-bar")) return;

    const script = document.createElement("script");
    script.id = "adsterra-social-bar";
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = normalizeScriptUrl(runtimeConfig.adsterraSocialBarScriptUrl) || "";
    script.onload = () => trackAdEvent("ad_script_loaded", { ad_slot: "social_bar", ad_format: "social_bar" });
    script.onerror = () => trackAdEvent("ad_script_error", { ad_slot: "social_bar", ad_format: "social_bar" });
    document.body.appendChild(script);
  }, [cleanAdRoute]);

  return null;
}

export function AdsterraStickyRail() {
  const cleanAdRoute = useCleanAdRoute();
  const shouldShow = useMediaQuery(`(min-width: ${runtimeConfig.adsterraStickyRailMinWidth}px)`);
  if (cleanAdRoute || !runtimeConfig.adsterraEnableStickyRail || !shouldShow) return null;

  return (
    <div className="ad-sticky-rail">
      <AdsterraBannerUnit size="160x600" slotName="desktop_rail_160x600" />
    </div>
  );
}

export function AdDisclosure() {
  return (
    <p className="text-xs leading-5 text-white/42">
      This fan site may show third-party ads to support hosting and updates.
    </p>
  );
}
