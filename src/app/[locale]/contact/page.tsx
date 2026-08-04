import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactPage } from "@/components/sections/ContactPage";
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
    title: t.contact.heroTitle,
    description: t.contact.heroSubtitle,
    path: "/contact",
    keywords: [
      "Kontakt Gorbel Service",
      "G-Force Ersatzteile anfragen",
      "Easy Arm Service",
      "Seilbalancer Reparatur",
    ],
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <ContactPage
      content={localeContent}
      images={content.images}
      companies={content.companies}
    />
  );
}
