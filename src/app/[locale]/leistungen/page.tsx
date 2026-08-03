import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { OfferingsPage } from "@/components/sections/OfferingsPage";
import { readContent } from "@/lib/content-store";
import type { Locale } from "@/content/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await readContent();
  const t = content.locales[locale as Locale];
  return {
    title: t.offerings.title,
    description: t.offerings.intro,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <OfferingsPage content={localeContent} images={content.images} />
  );
}
