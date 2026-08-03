import { setRequestLocale, getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/Badge";
import { MapPin, CheckCircle2, Building2 } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("title") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });

  const competence = [
    t("competence1"),
    t("competence2"),
    t("competence3"),
    t("competence4"),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Badge tone="accent" className="mb-4">
        WiMa × SAS
      </Badge>
      <h1 className="text-3xl font-bold tracking-tight text-anthracite-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-3xl text-lg text-anthracite-500">{t("subtitle")}</p>
      <p className="mt-6 max-w-3xl text-base leading-relaxed text-anthracite-700">
        {t("intro")}
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <CompanyCard
          title={t("wimaTitle")}
          location={t("wimaLocation")}
          text={t("wimaText")}
        />
        <CompanyCard
          title={t("sasTitle")}
          location={t("sasLocation")}
          text={t("sasText")}
        />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-anthracite-900">
          {t("competenceTitle")}
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {competence.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span className="text-sm font-medium text-anthracite-800">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-2xl border border-border bg-anthracite-900 p-8 text-white sm:p-10">
        <h2 className="text-xl font-bold">{t("independenceTitle")}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-anthracite-300 sm:text-base">
          {t("independenceText")}
        </p>
      </section>
    </div>
  );
}

function CompanyCard({
  title,
  location,
  text,
}: {
  title: string;
  location: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-anthracite-900 text-accent">
        <Building2 className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-semibold text-anthracite-900">{title}</h2>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-anthracite-500">
        <MapPin className="h-4 w-4" />
        {location}
      </p>
      <p className="mt-4 text-sm leading-relaxed text-anthracite-600">{text}</p>
    </article>
  );
}
