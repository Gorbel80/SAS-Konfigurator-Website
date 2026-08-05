import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPageShell, LegalSection } from "@/components/legal/LegalPageShell";
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
  const t = content.locales[locale as Locale];

  return buildPageMetadata({
    locale,
    title: t.impressum.title,
    description: t.impressum.intro.slice(0, 160),
    path: "/impressum",
  });
}

/**
 * Impressum is always Wima Industrie Automation GmbH only
 * (no SAS company block – see wima-automation.com Impressum).
 */
export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const t = content.locales[locale as Locale].impressum;
  const wima = content.companies.wima;

  return (
    <LegalPageShell title={t.title} intro={t.intro}>
      <LegalSection title={t.sectionCompany}>
        <p className="font-medium text-anthracite-900">{wima.legalName}</p>
        <p>
          {wima.street}
          <br />
          {wima.postal} {wima.city}
          <br />
          {wima.country}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionContact}>
        <p>
          {t.phoneLabel}: {wima.phone}
          {wima.fax ? (
            <>
              <br />
              {t.faxLabel}: {wima.fax}
            </>
          ) : null}
          <br />
          {t.emailLabel}:{" "}
          <a
            href={`mailto:${wima.email}`}
            className="text-accent hover:underline"
          >
            {wima.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t.sectionRegister}>
        <p>
          {t.managingDirectorLabel}: {wima.managingDirector}
          <br />
          {t.registerLabel}: {wima.registerCourt}, {wima.registerNumber}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionVat}>
        <p>
          {t.vatLabel}: {wima.vatId}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionResponsible}>
        <p>
          {t.responsibleLabel}:
          <br />
          {wima.managingDirector}
          <br />
          {wima.legalName}
          <br />
          {wima.street}
          <br />
          {wima.postal} {wima.city}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionDispute}>
        <p>{t.disputeBody}</p>
      </LegalSection>

      <LegalSection title={t.sectionLiabilityContent}>
        <p>{t.liabilityContentBody}</p>
      </LegalSection>

      <LegalSection title={t.sectionLiabilityLinks}>
        <p>{t.liabilityLinksBody}</p>
      </LegalSection>

      <LegalSection title={t.sectionCopyright}>
        <p>{t.copyrightBody}</p>
      </LegalSection>
    </LegalPageShell>
  );
}
