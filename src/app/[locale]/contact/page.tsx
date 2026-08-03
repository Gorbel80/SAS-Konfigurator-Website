import { setRequestLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("title") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tf = await getTranslations({ locale, namespace: "footer" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-anthracite-900 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-anthracite-500">{t("subtitle")}</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <ContactForm />

        <div className="space-y-4">
          <a
            href="mailto:info@sas-mail.de"
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-accent"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent-muted text-accent">
              <Mail className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-anthracite-400">
                {t("email")}
              </p>
              <p className="font-semibold text-anthracite-900">
                info@sas-mail.de
              </p>
            </div>
          </a>

          <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-anthracite-400">
              {t("locations")}
            </p>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-anthracite-900">
                    {t("wimaCard")}
                  </p>
                  <p className="text-sm text-anthracite-500">
                    {tf("wima")} · {tf("locationWetter")}
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold text-anthracite-900">
                    {t("sasCard")}
                  </p>
                  <p className="text-sm text-anthracite-500">
                    {tf("sas")} · {tf("locationHohndorf")}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
