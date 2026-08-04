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
        ? "3D Konfigurator für Gorbel G-Force® und Easy Arm® Ersatzteile – Teilebibliothek und Geräteansicht von SAS × WiMa."
        : locale === "en"
          ? "3D configurator for Gorbel G-Force® and Easy Arm® spare parts – parts library and unit view by SAS × WiMa."
          : "Gorbel G-Force® 与 Easy Arm® 备件 3D 配置器——SAS × WiMa 零件库与设备视图。",
    path: "/konfigurator",
    keywords: [
      "3D Konfigurator",
      "Produktkonfigurator",
      "G-Force Ersatzteile",
      "Easy Arm Ersatzteile",
      "Teilebibliothek",
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
