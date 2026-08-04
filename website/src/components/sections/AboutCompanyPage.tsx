import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import type { LocaleContent, SiteContent } from "@/content/types";
import { AlertCircle, ArrowRight, CheckCircle2, MapPin } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

/** Über uns – who WiMa & SAS are */
export function AboutCompanyPage({ content, images, companies }: Props) {
  const about = content.about;
  const h = content.home;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageHeroBanner
        imageSrc={images.side}
        imageAlt={about.heroTitle}
        eyebrow={about.heroEyebrow}
        title={about.heroTitle}
        subtitle={about.heroSubtitle}
        compact
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="animate-fade-up">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight text-anthracite-900">
              {h.whoTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
              {h.whoBody}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[companies.wima, companies.sas].map((c) => (
                <div
                  key={c.name}
                  className="card-lift rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-sm"
                >
                  <p className="text-sm font-semibold tracking-tight text-anthracite-900">
                    {c.name}
                  </p>
                  <p className="mt-2 flex items-start gap-1.5 text-sm text-anthracite-500">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>
                      {c.postal} {c.city}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-anthracite-400">
                    {c.legalName}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up animate-delay-1">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-anthracite-100 shadow-[0_12px_40px_-16px_rgba(18,22,27,0.35)] sm:aspect-[5/4]">
              <Image
                src={images.hero}
                alt="Gorbel G-Force® Hebesysteme in der Industrie"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={80}
              />
            </div>
          </div>
        </div>

        {/* Problem / solution on about too — core messaging */}
        <div className="animate-fade-up animate-delay-2 mt-10">
          <h2 className="text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
            {h.offerTitle}
          </h2>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-0">
            <div className="card-lift flex min-w-0 flex-1 flex-col rounded-2xl border border-anthracite-200 bg-anthracite-50/80 px-4 py-4 shadow-sm sm:rounded-r-none sm:border-r-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-anthracite-200/80 text-anthracite-700">
                  <AlertCircle className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-anthracite-500">
                  {h.problemLabel}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-anthracite-700">
                {h.offerParts}
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
            <div className="card-lift flex min-w-0 flex-1 flex-col rounded-2xl border border-emerald-200/80 bg-emerald-50/50 px-4 py-4 shadow-sm sm:rounded-l-none sm:border-l-0">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                  {h.solutionLabel}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug text-anthracite-800">
                {h.offerService}
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-3 mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-anthracite-900 transition-colors hover:border-anthracite-300"
          >
            {content.nav.home}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-anthracite-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
          >
            {h.contactCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
