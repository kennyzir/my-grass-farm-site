function readEnv(value: string | undefined): string | undefined {
  return value && value.trim().length > 0 ? value : undefined;
}

function readBooleanEnv(value: string | undefined, fallback = false): boolean {
  const clean = readEnv(value)?.toLowerCase();
  if (!clean) return fallback;
  return ["1", "true", "yes", "on"].includes(clean);
}

function readNumberEnv(value: string | undefined, fallback: number): number {
  const clean = readEnv(value);
  if (!clean) return fallback;
  const parsed = Number(clean);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : fallback;
}

const adsterraHost = "https://illuminationacceptedkeynote.com";

export const runtimeConfig = {
  adsenseClientId: readEnv(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) || "ca-pub-8101324760553502",
  adsterraBannerId: readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_ID),
  adsterraBanner160x300Key:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_160X300_KEY) ||
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_ID) ||
    "4b8e84c3ac917a31e0e48634313ddd69",
  adsterraBanner160x300ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_160X300_SCRIPT_URL) ||
    `${adsterraHost}/4b8e84c3ac917a31e0e48634313ddd69/invoke.js`,
  adsterraBanner300x250Key:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_300X250_KEY) ||
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_ID) ||
    "bbd5b8887043b76e6f9f7acfef894443",
  adsterraBanner300x250ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_300X250_SCRIPT_URL) ||
    `${adsterraHost}/bbd5b8887043b76e6f9f7acfef894443/invoke.js`,
  adsterraBanner320x50Key:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_KEY) || "adfd3b92e4b987701965a5a09a749ff6",
  adsterraBanner320x50ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_320X50_SCRIPT_URL) ||
    `${adsterraHost}/adfd3b92e4b987701965a5a09a749ff6/invoke.js`,
  adsterraBanner468x60Key:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_KEY) || "bd13c8ac514bb3f923ed2d45ead40cd8",
  adsterraBanner468x60ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_468X60_SCRIPT_URL) ||
    `${adsterraHost}/bd13c8ac514bb3f923ed2d45ead40cd8/invoke.js`,
  adsterraBanner728x90Key:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_728X90_KEY) ||
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD_ID) ||
    "156f80d61adc47d85f89ea9b1835ce17",
  adsterraBanner728x90ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_728X90_SCRIPT_URL) ||
    `${adsterraHost}/156f80d61adc47d85f89ea9b1835ce17/invoke.js`,
  adsterraBanner160x600Key:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_160X600_KEY) || "97e3beb744e1586c0b837d272be5d9d1",
  adsterraBanner160x600ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_BANNER_160X600_SCRIPT_URL) ||
    `${adsterraHost}/97e3beb744e1586c0b837d272be5d9d1/invoke.js`,
  adsterraNative1Id:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_1_ID) || "container-7d5f9e1e5086660120c1f594622ff33c",
  adsterraNative1ScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_1_SCRIPT_URL) ||
    `${adsterraHost}/7d5f9e1e5086660120c1f594622ff33c/invoke.js`,
  adsterraLeaderboardId: readEnv(process.env.NEXT_PUBLIC_ADSTERRA_LEADERBOARD_ID),
  adsterraSmartLinkUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_SMARTLINK_URL) ||
    `${adsterraHost}/r0ejuacr2r?key=bd893f02e5d5ab7db54432231810ee4d`,
  adsterraGlobalScriptUrls: [readEnv(process.env.NEXT_PUBLIC_ADSTERRA_GLOBAL_SCRIPT_URL)].filter(
    (scriptUrl): scriptUrl is string => Boolean(scriptUrl)
  ),
  adsterraPopunderScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_SCRIPT_URL) ||
    `${adsterraHost}/fe/76/d5/fe76d58f2de3c73903c500548a3164cc.js`,
  adsterraEnablePopunder: readBooleanEnv(process.env.NEXT_PUBLIC_ADSTERRA_ENABLE_POPUNDER, false),
  adsterraPopunderDelayMs: readNumberEnv(process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_DELAY_MS, 30000),
  adsterraPopunderMinPageViews: readNumberEnv(process.env.NEXT_PUBLIC_ADSTERRA_POPUNDER_MIN_PAGEVIEWS, 2),
  adsterraSocialBarScriptUrl:
    readEnv(process.env.NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT_URL) ||
    `${adsterraHost}/3d/f1/38/3df138f4c762d39294d6c72f2f7e91de.js`,
  adsterraEnableSocialBar: readBooleanEnv(process.env.NEXT_PUBLIC_ADSTERRA_ENABLE_SOCIAL_BAR, false),
  adsterraEnableStickyRail: readBooleanEnv(process.env.NEXT_PUBLIC_ADSTERRA_ENABLE_STICKY_RAIL, false),
  adsterraStickyRailMinWidth: readNumberEnv(process.env.NEXT_PUBLIC_ADSTERRA_STICKY_RAIL_MIN_WIDTH, 1600),
  analyticsId: readEnv(process.env.NEXT_PUBLIC_ANALYTICS_ID)
};
