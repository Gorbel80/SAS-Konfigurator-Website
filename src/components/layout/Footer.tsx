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
        <div className="flex shrink-0 items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.home}
          </Link>
          <Link
            href="/contact"
            className="text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.contact}
          </Link>
          <span className="hidden text-xs text-anthracite-500 sm:inline">
            {companies.wima.city} · {companies.sas.city}
          </span>
        </div>
      </div>
      <div className="border-t border-white/[0.07]">
        <p className="mx-auto max-w-5xl px-4 py-2.5 text-xs text-anthracite-500 sm:px-6 lg:px-8">
          © {year} WiMa · SAS. {content.footer.rights}
        </p>
      </div>
    </footer>
  );
}
