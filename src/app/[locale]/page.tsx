import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home/HomePage";
import { readContent } from "@/lib/content-store";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await readContent();
  const meta = content.locales[locale as Locale]?.meta;
  return {
    title: meta?.title,
    description: meta?.description,
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <HomePage
      content={localeContent}
      images={content.images}
      companies={content.companies}
    />
  );
}
