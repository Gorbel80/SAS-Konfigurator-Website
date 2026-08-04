import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
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
    title: `${t.privacy.title} | SAS × WiMa`,
    description: t.privacy.intro.slice(0, 160),
    path: "/datenschutz",
  });
}

export default async function DatenschutzPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const t = content.locales[locale as Locale].privacy;

  return (
    <LegalPageShell title={t.title} intro={t.intro} meta={t.lastUpdated}>
      {t.sections.map((section) => (
        <LegalSection key={section.heading} title={section.heading}>
          <p>{section.body}</p>
        </LegalSection>
      ))}
    </LegalPageShell>
  );
}
