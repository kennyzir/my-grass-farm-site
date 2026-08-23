export const locales = ["en", "es"] as const;   // add pt/id here to expand
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export function localePath(locale: Locale, path: string) {
  if (locale === defaultLocale) return path === "" ? "/" : path;
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}
