import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { Mail, MapPin, Phone } from "lucide-react";

type Props = {
  content: LocaleContent;
  companies: SiteContent["companies"];
};

/**
 * Simple dark footer – WiMa contact + legal links.
 */
export function Footer({ content, companies }: Props) {
  const w = companies.wima;
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="border-t border-white/10 bg-anthracite-950 text-anthracite-300"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 sm:py-8 md:grid-cols-[1.4fr_1fr_1fr_auto] md:gap-8 lg:px-8">
        <div className="flex gap-3">
          <MapPin
            className="mt-0.5 h-5 w-5 shrink-0 text-sky"
            strokeWidth={1.75}
            aria-hidden
          />
          <div>
            <p className="text-sm font-semibold text-white">{w.legalName}</p>
            <p className="mt-1 text-sm leading-relaxed text-anthracite-400">
              {w.street}
              <br />
              {w.postal} {w.city}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Phone
            className="mt-0.5 h-5 w-5 shrink-0 text-sky"
            strokeWidth={1.75}
            aria-hidden
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-anthracite-500">
              {content.footer.callLabel}
            </p>
            <a
              href={`tel:${w.phone.replace(/[^\d+]/g, "")}`}
              className="mt-1 block text-sm text-anthracite-200 transition-colors hover:text-white"
            >
              Tel.: {w.phone}
            </a>
            {w.fax ? (
              <p className="mt-0.5 text-sm text-anthracite-400">Fax: {w.fax}</p>
            ) : null}
          </div>
        </div>

        <div className="flex gap-3">
          <Mail
            className="mt-0.5 h-5 w-5 shrink-0 text-sky"
            strokeWidth={1.75}
            aria-hidden
          />
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-anthracite-500">
              {content.footer.emailLabel}
            </p>
            <a
              href={`mailto:${w.email}`}
              className="mt-1 block text-sm text-anthracite-200 transition-colors hover:text-white"
            >
              {w.email}
            </a>
          </div>
        </div>

        <nav
          className="flex flex-col gap-2 text-sm md:items-end"
          aria-label="Legal"
        >
          <Link
            href="/impressum"
            className="text-anthracite-300 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            {content.footer.impressum}
          </Link>
          <Link
            href="/datenschutz"
            className="text-anthracite-300 underline-offset-2 transition-colors hover:text-white hover:underline"
          >
            {content.footer.privacy}
          </Link>
        </nav>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-xs text-anthracite-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {w.legalName}. {content.footer.rights}
          </p>
          <p className="text-anthracite-600">Gorbel® G-Force® · Easy Arm®</p>
        </div>
      </div>
    </footer>
  );
}
