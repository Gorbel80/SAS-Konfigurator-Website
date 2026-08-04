import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GForcePage } from "@/components/sections/GForcePage";
import { readContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await readContent();
  const t = content.locales[locale as Locale];

  return buildPageMetadata({
    locale,
    title: t.gforcePage.heroTitle,
    description: t.gforcePage.heroSubtitle,
    path: "/g-force",
    keywords: [
      "Gorbel G-Force",
      "Easy Arm",
      "Seilbalancer",
      "Intelligente Hebetechnik",
      "G-Force Q iQ",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return <GForcePage content={localeContent} images={content.images} />;
}
