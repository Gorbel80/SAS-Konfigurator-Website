import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import { readContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const content = await readContent();
  const t = content.locales[locale as Locale];

  return buildPageMetadata({
    locale,
    title: t.nav.applications,
    description: t.gforcePage.heroSubtitle,
    path: "/anwendungen",
    keywords: ["G-Force Anwendungen", "Easy Arm", "Gorbel"],
  });
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const t = content.locales[locale as Locale];
  const isDe = locale === "de";
  const isZh = locale === "zh";

  return (
    <div className="flex-1 bg-white">
      <PageHeroBanner
        imageSrc={content.images.hero}
        imageAlt={t.nav.applications}
        eyebrow="Gorbel®"
        title={t.nav.applications}
        subtitle={
          isDe
            ? "Typische Einsatzfelder für G-Force® und Easy Arm® in Fertigung und Montage."
            : isZh
              ? "G-Force® 与 Easy Arm® 在制造与装配中的典型应用。"
              : "Typical use cases for G-Force® and Easy Arm® in manufacturing and assembly."
        }
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-base leading-relaxed text-anthracite-600">
          {isDe
            ? "Ob Montage, Materialhandling oder ergonomisches Heben am Arbeitsplatz – wir beraten Sie zu passenden G-Force®- und Easy Arm®-Lösungen und unterstützen bei Service und Ersatzteilen."
            : isZh
              ? "无论是装配、物料搬运还是工位的人体工学提升，我们为您提供 G-Force® 与 Easy Arm® 方案咨询，并支持服务与备件。"
              : "Whether assembly, material handling or ergonomic lifting at the workstation – we advise on suitable G-Force® and Easy Arm® solutions and support you with service and spare parts."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/g-force"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            G-FORCE®
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-anthracite-800 hover:bg-anthracite-50"
          >
            {t.nav.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
