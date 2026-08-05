/**
 * Base URL helpers for configurator ↔ marketing site links.
 * Empty / relative paths work on same-origin Vercel and All-Inkl static hosting.
 */

export function getWebsiteUrl() {
  return process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") || "";
}

/** Locale home on the marketing site (e.g. /de/). */
export function getWebsiteHomeUrl(locale: string) {
  const root = getWebsiteUrl();
  const path = `/${locale}/`;
  return root ? `${root}${path}` : path;
}

/** Contact page, optionally with subject query. */
export function getWebsiteContactUrl(locale: string, subject?: string) {
  const root = getWebsiteUrl();
  const path = `/${locale}/contact/`;
  const base = root ? `${root}${path}` : path;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
