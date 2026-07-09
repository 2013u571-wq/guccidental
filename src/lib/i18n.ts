export const languages = [
  { code: "en", label: "English", dir: "ltr" },
  { code: "es", label: "Español", dir: "ltr" },
  { code: "fr", label: "Français", dir: "ltr" },
  { code: "pt", label: "Português", dir: "ltr" },
  { code: "de", label: "Deutsch", dir: "ltr" },
  { code: "it", label: "Italiano", dir: "ltr" },
  { code: "ar", label: "العربية", dir: "rtl" },
  { code: "ru", label: "Русский", dir: "ltr" },
  { code: "ro", label: "Română", dir: "ltr" }
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

export function isLanguage(value: string | undefined): value is LanguageCode {
  return languages.some((language) => language.code === value);
}

export function getLanguage(value: string | undefined): LanguageCode {
  return isLanguage(value) ? value : defaultLanguage;
}

export function getDirection(language: LanguageCode): "ltr" | "rtl" {
  return language === "ar" ? "rtl" : "ltr";
}

export function localizedPath(language: LanguageCode, path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `/${language}${normalizedPath}`.replace(/\/+/g, "/");
}

export function withoutLanguage(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (isLanguage(parts[0])) {
    return `/${parts.slice(1).join("/")}`;
  }
  return pathname || "/";
}

export function alternateLinks(pathname: string) {
  const routePath = withoutLanguage(pathname);
  return languages.map((language) => ({
    lang: language.code,
    href: localizedPath(language.code, routePath)
  }));
}
