import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";

type Props = {
  content: LocaleContent;
  companies: SiteContent["companies"];
};

export function Footer({ content, companies }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="border-t border-white/10 bg-anthracite-950 text-anthracite-300"
    >
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:px-8 lg:py-9">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-[10px] font-bold text-white">
              S×W
            </span>
            <div>
              <p className="text-sm font-semibold tracking-tight text-white">
                SAS × WiMa
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-anthracite-500">
                G-Force® Service Europa
              </p>
            </div>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-anthracite-400">
            {content.footer.tagline}
          </p>
          <p className="mt-3 text-xs text-anthracite-500">
            {content.home.sloganPrimary}
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between lg:justify-end lg:gap-12">
          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-anthracite-500">
              Navigation
            </p>
            <Link
              href="/"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.nav.home}
            </Link>
            <Link
              href="/#g-force"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.nav.gforce}
            </Link>
            <Link
              href="/#service"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.nav.service}
            </Link>
            <Link
              href="/#ersatzteile"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.nav.parts}
            </Link>
            <Link
              href="/ueber-uns"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.nav.about}
            </Link>
            <Link
              href="/contact"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.nav.contact}
            </Link>
          </nav>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Legal">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-anthracite-500">
              Legal
            </p>
            <Link
              href="/impressum"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.footer.impressum}
            </Link>
            <Link
              href="/datenschutz"
              className="text-anthracite-300 transition-colors hover:text-white"
            >
              {content.footer.privacy}
            </Link>
            <Link
              href="/konfigurator"
              className="text-accent transition-colors hover:text-amber-300"
            >
              {content.home.configuratorLabel}
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-xs text-anthracite-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} WiMa · SAS. {content.footer.rights}
          </p>
          <p className="text-anthracite-600">
            {companies.wima.city} · {companies.sas.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
