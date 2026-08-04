import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutCompanyPage } from "@/components/sections/AboutCompanyPage";
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
    title: t.about.heroTitle,
    description: t.about.heroSubtitle,
    path: "/ueber-uns",
    keywords: [
      "WiMa Industrie-Automation",
      "SAS Sauer-Automation",
      "Gorbel Service",
      "G-Force Service Europa",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <AboutCompanyPage
      content={localeContent}
      images={content.images}
      companies={content.companies}
    />
  );
}
