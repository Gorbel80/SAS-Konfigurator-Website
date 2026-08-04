import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { HomePage } from "@/components/home/HomePage";
import { readContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo";
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

  return buildPageMetadata({
    locale,
    title:
      meta?.title ??
      "Gorbel G-Force® – Größtes Ersatzteillager Deutschlands | SAS × WiMa",
    description:
      meta?.description ??
      "Größtes Ersatzteillager Deutschlands für Gorbel G-Force® und Easy Arm®. Service und eigene Seil-/Kettenzüge von WiMa und SAS.",
    path: "",
    keywords: [
      "Gorbel G-Force®",
      "Easy Arm®",
      "Ersatzteile Deutschland",
      "Seilbalancer",
      "Service Hebetechnik",
    ],
  });
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
