/** Public marketing website base URL (no trailing slash). */
export function getWebsiteUrl() {
  return (
    process.env.NEXT_PUBLIC_WEBSITE_URL?.replace(/\/$/, "") ||
    "https://sas-konfigurator-website.vercel.app"
  );
}

/** Contact page on the marketing site, optionally with subject query. */
export function getWebsiteContactUrl(locale: string, subject?: string) {
  const base = `${getWebsiteUrl()}/${locale}/contact`;
  if (!subject) return base;
  return `${base}?subject=${encodeURIComponent(subject)}`;
}
