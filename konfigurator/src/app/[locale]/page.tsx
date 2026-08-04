import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ConfiguratorWorkshop } from "@/components/configurator/ConfiguratorWorkshop";
import { configuratorLabels } from "@/content/labels";
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
  const labels = configuratorLabels[locale as Locale] ?? configuratorLabels.de;

  return {
    title: labels.title,
    description:
      locale === "de"
        ? "G-Force Konfigurator – Parts Library, Geräteansicht und Partlist für G-Force Q/iQ und Q2/iQ2 von SAS × WiMa."
        : locale === "en"
          ? "G-Force Configurator – parts library, unit view and partlist for G-Force Q/iQ and Q2/iQ2 by SAS × WiMa."
          : "G-Force 配置器——Q/iQ 与 Q2/iQ2 零件库、设备视图与零件列表（SAS × WiMa）。",
  };
}

export default async function KonfiguratorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const labels = configuratorLabels[locale as Locale] ?? configuratorLabels.de;

  return (
    <ConfiguratorWorkshop locale={locale as Locale} labels={labels} />
  );
}
