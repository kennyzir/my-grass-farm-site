import { getRequestConfig } from "next-intl/server";

// next-intl v4 request config — wired by the build plugin (next.config.ts via
// createNextIntlPlugin("./src/i18n/request.ts")). Locale for static export
// comes from the [locale] route param (setRequestLocale in each [locale]/layout);
// no middleware. Fall back to 'en'.
export default getRequestConfig(async ({ locale }) => {
  const resolved = locale || "en";
  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
    localePrefix: "as-needed",
    defaultLocale: "en",
    locales: ["en", "es"]
  };
});
