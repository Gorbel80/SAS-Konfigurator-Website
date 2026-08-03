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
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-white">SAS × WiMa</p>
          <p className="mt-2 max-w-md text-sm text-anthracite-400">
            {content.footer.tagline}
          </p>
          <p className="mt-3 text-xs text-anthracite-500">
            {companies.wima.city} · {companies.sas.city}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/" className="hover:text-white">
            {content.nav.home}
          </Link>
          <Link href="/contact" className="hover:text-white">
            {content.nav.contact}
          </Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-anthracite-500 sm:px-6 lg:px-8">
          © {year} WiMa · SAS. {content.footer.rights}
        </p>
      </div>
    </footer>
  );
}
