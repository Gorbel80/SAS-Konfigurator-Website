import type { Metadata } from "next";
import type { Locale, LocaleContent } from "@/content/types";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://sas-konfigurator-website.vercel.app";

export function getSiteUrl() {
  return SITE_URL;
}

export function buildPageMetadata({
  locale,
  title,
  description,
  path = "",
  keywords = [],
}: {
  locale: Locale | string;
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  const url = `${base}/${locale}${normalized}`;

  const defaultKeywords = [
    "Gorbel",
    "G-Force",
    "G-Force®",
    "Easy Arm",
    "Easy Arm®",
    "Ersatzteile",
    "Service",
    "Seilbalancer",
    "Seilzüge",
    "Kettenzüge",
    "WiMa",
    "SAS",
    "Hebetechnik",
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
      languages: {
        de: `${base}/de${normalized}`,
        en: `${base}/en${normalized}`,
        zh: `${base}/zh${normalized}`,
        "x-default": `${base}/de${normalized}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : locale === "en" ? "en_US" : "zh_CN",
      url,
      siteName: "SAS × WiMa – Gorbel Service",
      title,
      description,
      images: [
        {
          url: `${base}/images/site/hero.jpg`,
          width: 1600,
          height: 900,
          alt: "Gorbel G-Force® Service und Ersatzteile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${base}/images/site/hero.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd(content: LocaleContent) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SAS × WiMa",
    description: content.meta.description,
    url: getSiteUrl(),
    areaServed: "EU",
    knowsAbout: [
      "Gorbel G-Force®",
      "Gorbel Easy Arm®",
      "Ersatzteile",
      "Seilbalancer",
      "Service",
    ],
  };
}
