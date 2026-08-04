import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ConfiguratorComingSoonPage } from "@/components/sections/ConfiguratorComingSoonPage";
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
    title: `${c.title} – ${c.message}`,
    description:
      locale === "de"
        ? "3D Konfigurator für Gorbel G-Force® und Easy Arm® Ersatzteile – bald verfügbar bei SAS × WiMa. Seilbalancer Service und Identifikation."
        : locale === "en"
          ? "3D configurator for Gorbel G-Force® and Easy Arm® spare parts – coming soon from SAS × WiMa. Intelligent lift service and identification."
          : "Gorbel G-Force® 与 Easy Arm® 备件 3D 配置器即将由 SAS × WiMa 推出。",
    path: "/konfigurator",
    keywords: [
      "3D Konfigurator",
      "Produktkonfigurator",
      "G-Force Ersatzteile",
      "Easy Arm Ersatzteile",
    ],
  });
}

export default async function KonfiguratorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const localeContent = content.locales[locale as Locale];

  return (
    <ConfiguratorComingSoonPage
      content={localeContent}
      images={content.images}
    />
  );
}
