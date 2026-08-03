import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";

type Props = {
  content: LocaleContent;
  companies: SiteContent["companies"];
};

export function Footer({ content, companies }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-anthracite-950 text-anthracite-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-xs font-bold text-white">
              S×W
            </span>
            <span className="text-sm font-semibold text-white">
              SAS × WiMa Service
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-anthracite-400">
            {content.footer.tagline}
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-anthracite-500">
            {content.footer.links}
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                {content.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition-colors">
                {content.nav.about}
              </Link>
            </li>
            <li>
              <Link
                href="/service"
                className="hover:text-white transition-colors"
              >
                {content.nav.service}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors"
              >
                {content.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-anthracite-500">
            {content.footer.locations}
          </p>
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="font-medium text-white">{companies.wima.name}</p>
              <p>
                {companies.wima.postal} {companies.wima.city}
              </p>
            </div>
            <div>
              <p className="font-medium text-white">{companies.sas.name}</p>
              <p>
                {companies.sas.postal} {companies.sas.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-anthracite-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} WiMa Industrie-Automation · SAS Sauer-Automation Sachsen.{" "}
            {content.footer.rights}
          </p>
          <p className="text-anthracite-600">G-Force · Easy Arm Service EU</p>
        </div>
      </div>
    </footer>
  );
}
