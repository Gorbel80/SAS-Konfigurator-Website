import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";

type Props = {
  content: LocaleContent;
  companies: SiteContent["companies"];
};

export function Footer({ content, companies }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-anthracite-950 text-anthracite-300">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-[10px] font-bold text-white">
              S×W
            </span>
            <p className="text-sm font-semibold tracking-tight text-white">
              SAS × WiMa
            </p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-anthracite-400">
            {content.footer.tagline}
          </p>
          <p className="mt-3 text-xs font-medium tracking-wide text-anthracite-500">
            {companies.wima.city} · {companies.sas.city}
          </p>
        </div>
        <div className="flex flex-col gap-2.5 text-sm">
          <Link
            href="/"
            className="w-fit text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.home}
          </Link>
          <Link
            href="/contact"
            className="w-fit text-anthracite-300 transition-colors hover:text-white"
          >
            {content.nav.contact}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/[0.07]">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-anthracite-500 sm:px-6 lg:px-8">
          © {year} WiMa · SAS. {content.footer.rights}
        </p>
      </div>
    </footer>
  );
}
