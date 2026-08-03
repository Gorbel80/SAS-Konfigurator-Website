import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

/** „Leistungen“ nav target – what WiMa & SAS do */
export function AboutCompanyPage({ content, images, companies }: Props) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="mx-auto w-full max-w-5xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <header className="animate-fade-up mb-6 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            SAS × WiMa
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-anthracite-900 sm:text-[1.75rem]">
            {content.home.whoTitle}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
            {content.home.whoBody}
          </p>
        </header>

        <div className="grid gap-7 lg:grid-cols-2 lg:items-stretch lg:gap-9">
          <div className="animate-fade-up order-2 lg:order-1">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {[companies.wima, companies.sas].map((c) => (
                <div
                  key={c.name}
                  className="card-lift rounded-2xl border border-border bg-surface px-3.5 py-3 shadow-sm"
                >
                  <p className="text-sm font-semibold tracking-tight text-anthracite-900">
                    {c.name}
                  </p>
                  <p className="mt-1 text-sm text-anthracite-500">
                    {c.postal} {c.city}
                  </p>
                  <p className="mt-1 text-xs text-anthracite-400">{c.legalName}</p>
                </div>
              ))}
            </div>

            {/* Problem → Solution */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold tracking-tight text-anthracite-900">
                {content.home.offerTitle}
              </h2>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                <div className="card-lift flex min-w-0 flex-1 flex-col rounded-2xl border border-anthracite-200 bg-anthracite-50/80 px-4 py-3.5 shadow-sm sm:rounded-r-none sm:border-r-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-anthracite-200/80 text-anthracite-700">
                      <AlertCircle className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-anthracite-500">
                      {content.home.problemLabel}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-anthracite-700">
                    {content.home.offerParts}
                  </p>
                </div>
                <div
                  className="flex shrink-0 items-center justify-center sm:w-10"
                  aria-hidden
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-sm">
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
                <div className="card-lift flex min-w-0 flex-1 flex-col rounded-2xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-3.5 shadow-sm sm:rounded-l-none sm:border-l-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                      {content.home.solutionLabel}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-snug text-anthracite-800">
                    {content.home.offerService}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-1 order-1 min-h-[12rem] lg:order-2 lg:min-h-0">
            <div className="img-zoom relative h-full min-h-[12rem] overflow-hidden rounded-2xl border border-border shadow-[0_12px_40px_-16px_rgba(18,22,27,0.35)] lg:min-h-full">
              <Image
                src={images.side}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-2 mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/angebot"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-anthracite-900 transition-colors hover:border-anthracite-300"
          >
            {content.nav.products}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-anthracite-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
          >
            {content.home.contactCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
