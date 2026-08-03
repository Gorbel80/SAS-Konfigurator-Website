import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Mail, MapPin } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-anthracite-800 bg-anthracite-900 text-anthracite-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <p className="text-lg font-semibold text-white">
            SAS <span className="text-anthracite-500">×</span> WiMa
          </p>
          <p className="mt-3 text-sm leading-relaxed">{t("tagline")}</p>
          <a
            href={`mailto:${t("contactEmail")}`}
            className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:text-orange-300"
          >
            <Mail className="h-4 w-4" />
            {t("contactEmail")}
          </a>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("companies")}
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <span className="font-medium text-anthracite-100">
                {t("wima")}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-anthracite-400">
                <MapPin className="h-3.5 w-3.5" />
                {t("locationWetter")}
              </span>
            </li>
            <li>
              <span className="font-medium text-anthracite-100">
                {t("sas")}
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-anthracite-400">
                <MapPin className="h-3.5 w-3.5" />
                {t("locationHohndorf")}
              </span>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("quickLinks")}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/configurator" className="hover:text-white">
                Configurator
              </Link>
            </li>
            <li>
              <Link href="/service-request" className="hover:text-white">
                Service
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white">
            {t("legal")}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-anthracite-400">
            {t("disclaimer")}
          </p>
        </div>
      </div>

      <div className="border-t border-anthracite-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-anthracite-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} SAS Sauer-Automation Sachsen · WiMa Industrie-Automation
            GmbH. {t("rights")}
          </p>
          <p>info@sas-mail.de</p>
        </div>
      </div>
    </footer>
  );
}
