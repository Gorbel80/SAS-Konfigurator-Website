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
    title: `${t.impressum.title} | SAS × WiMa`,
    description: t.impressum.intro.slice(0, 160),
    path: "/impressum",
  });
}

export default async function ImpressumPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = await readContent();
  const t = content.locales[locale as Locale].impressum;
  const operator =
    content.siteOperator === "sas"
      ? content.companies.sas
      : content.companies.wima;
  const { wima, sas } = content.companies;

  return (
    <LegalPageShell title={t.title} intro={t.intro}>
      <LegalSection title={`${t.sectionCompany} – Website`}>
        <p className="font-medium text-anthracite-900">{operator.legalName}</p>
        <p>
          {operator.street}
          <br />
          {operator.postal} {operator.city}
          <br />
          {operator.country}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionContact}>
        <p>
          Tel.: {operator.phone}
          <br />
          E-Mail:{" "}
          <a
            href={`mailto:${operator.email}`}
            className="text-accent hover:underline"
          >
            {operator.email}
          </a>
        </p>
      </LegalSection>

      <LegalSection title={t.sectionRegister}>
        <p>
          {t.managingDirectorLabel}: {operator.managingDirector}
          <br />
          {t.registerLabel}: {operator.registerCourt},{" "}
          {operator.registerNumber}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionVat}>
        <p>
          {t.vatLabel}: {operator.vatId}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionResponsible}>
        <p>
          {t.responsibleLabel}:
          <br />
          {operator.managingDirector}
          <br />
          {operator.legalName}
          <br />
          {operator.postal} {operator.city}
        </p>
      </LegalSection>

      <LegalSection title="WiMa">
        <p className="font-medium text-anthracite-900">{wima.legalName}</p>
        <p>
          {wima.street}, {wima.postal} {wima.city}
          <br />
          {t.managingDirectorLabel}: {wima.managingDirector}
          <br />
          {t.registerLabel}: {wima.registerCourt}, {wima.registerNumber}
          <br />
          {t.vatLabel}: {wima.vatId}
          <br />
          {wima.phone} · {wima.email}
        </p>
      </LegalSection>

      <LegalSection title="SAS">
        <p className="font-medium text-anthracite-900">{sas.legalName}</p>
        <p>
          {sas.street}, {sas.postal} {sas.city}
          <br />
          {t.managingDirectorLabel}: {sas.managingDirector}
          <br />
          {t.registerLabel}: {sas.registerCourt}, {sas.registerNumber}
          <br />
          {t.vatLabel}: {sas.vatId}
          <br />
          {sas.phone} · {sas.email}
        </p>
      </LegalSection>

      <LegalSection title={t.sectionNote}>
        <p>{t.noteBody}</p>
      </LegalSection>
    </LegalPageShell>
  );
}
