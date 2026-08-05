import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import { readContent } from "@/lib/content-store";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/content/types";
import { routing } from "@/i18n/routing";
import { FileText } from "lucide-react";

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
    title: t.nav.downloads,
    description: t.home.heroSubtitle,
    path: "/downloads",
    keywords: ["G-Force Brochure", "Downloads", "Gorbel"],
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
        imageSrc={content.images.service}
        imageAlt={t.nav.downloads}
        eyebrow="WiMa"
        title={t.nav.downloads}
        subtitle={
          isDe
            ? "Broschüren und Unterlagen zu G-Force® und Easy Arm®."
            : isZh
              ? "G-Force® 与 Easy Arm® 相关资料与手册。"
              : "Brochures and documents for G-Force® and Easy Arm®."
        }
        compact
      />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-base leading-relaxed text-anthracite-600">
          {isDe
            ? "Benötigen Sie Unterlagen, Datenblätter oder eine Beratung zu G-Force® und Easy Arm®? Kontaktieren Sie uns – wir senden Ihnen die passenden Informationen zu."
            : isZh
              ? "需要 G-Force® 与 Easy Arm® 的资料、数据表或咨询？请联系我们，我们将发送相关信息。"
              : "Need documents, datasheets or advice on G-Force® and Easy Arm®? Contact us – we will send the right information."}
        </p>
        <ul className="mt-6 space-y-3">
          <li className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3.5">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-anthracite-900">
                G-Force® / Easy Arm®
              </p>
              <p className="mt-0.5 text-sm text-anthracite-500">
                {isDe
                  ? "Produktinformationen und technische Übersicht auf Anfrage."
                  : isZh
                    ? "产品信息与技术概览（可索取）。"
                    : "Product information and technical overview on request."}
              </p>
            </div>
          </li>
        </ul>
        <div className="mt-6">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center rounded-full bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover"
          >
            {t.nav.contact}
          </Link>
        </div>
      </section>
    </div>
  );
}
