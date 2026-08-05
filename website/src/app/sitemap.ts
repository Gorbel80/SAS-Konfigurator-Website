import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";

const paths = [
  "",
  "/g-force",
  "/service",
  "/contact",
  "/konfigurator",
  "/ueber-uns",
  "/impressum",
  "/datenschutz",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority:
        path === ""
          ? 1
          : path === "/contact" ||
              path === "/g-force" ||
              path === "/service" ||
              path === "/konfigurator"
            ? 0.8
            : 0.4,
    })),
  );
}
