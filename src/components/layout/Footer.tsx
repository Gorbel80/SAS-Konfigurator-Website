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
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-[10px] font-bold text-white">
              S×W
            </span>
            <p className="text-sm font-semibold tracking-tight text-white">
              SAS × WiMa
            </p>
          </div>
          <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-anthracite-400 sm:text-sm">
            {content.footer.tagline}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <Link
            href="/"
            className="text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.home}
          </Link>
          <Link
            href="/leistungen"
            className="text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.offerings}
          </Link>
          <Link
            href="/contact"
            className="text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.contact}
          </Link>
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
        </div>
      </div>
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-2.5 text-xs text-anthracite-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
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
