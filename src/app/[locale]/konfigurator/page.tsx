import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ConfiguratorWorkshop } from "@/components/configurator/ConfiguratorWorkshop";
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
  const c = t.configuratorPage;

  return buildPageMetadata({
    locale,
    title: c.title,
    description:
      locale === "de"
        ? "G-Force Konfigurator – Parts Library, Geräteansicht und Partlist für G-Force Q/iQ und Q2/iQ2 von SAS × WiMa."
        : locale === "en"
          ? "G-Force Configurator – parts library, unit view and partlist for G-Force Q/iQ and Q2/iQ2 by SAS × WiMa."
          : "G-Force 配置器——Q/iQ 与 Q2/iQ2 零件库、设备视图与零件列表（SAS × WiMa）。",
    path: "/konfigurator",
    keywords: [
      "G-Force Konfigurator",
      "3D Konfigurator",
      "G-Force Ersatzteile",
      "Parts Library",
      "Partlist",
    ],
  });
}

export default async function KonfiguratorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <ConfiguratorWorkshop
      locale={locale as Locale}
      labels={localeContent.configuratorPage}
    />
  );
}
