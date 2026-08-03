import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight, Package, Wrench } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function HomePage({ content, images, companies }: Props) {
  return (
    <div className="bg-background">
      {/* Hero — short, one screen focus */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/90 to-anthracite-900/55" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {content.home.eyebrow}
          </p>
          <h1 className="animate-fade-up animate-delay-1 mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
            {content.home.heroTitle}
          </h1>
          <p className="animate-fade-up animate-delay-2 mt-4 max-w-2xl text-sm leading-relaxed text-anthracite-200 sm:text-base">
            {content.home.heroSubtitle}
          </p>

          <div className="animate-fade-up animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {/* Thick, eye-catching 3D configurator placeholder */}
            <button
              type="button"
              disabled
              title={content.home.configuratorHint}
              className="inline-flex h-14 min-w-[16rem] items-center justify-center gap-2 rounded-2xl bg-accent px-8 text-base font-bold tracking-wide text-white shadow-[0_8px_0_0_#9a3412] ring-4 ring-accent/30 transition-transform active:translate-y-1 active:shadow-none sm:h-16 sm:min-w-[18rem] sm:text-lg"
            >
              {content.home.configuratorLabel}
              <span className="rounded-md bg-white/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                {content.home.configuratorHint}
              </span>
            </button>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/15"
            >
              {content.home.contactCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Compact who + offer */}
      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-12">
        <div className="animate-fade-up">
          <h2 className="text-lg font-semibold text-anthracite-900 sm:text-xl">
            {content.home.whoTitle}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-500 sm:text-[0.95rem]">
            {content.home.whoBody}
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface px-3.5 py-3 text-sm">
              <p className="font-semibold text-anthracite-900">
                {companies.wima.name}
              </p>
              <p className="text-anthracite-500">
                {companies.wima.postal} {companies.wima.city}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface px-3.5 py-3 text-sm">
              <p className="font-semibold text-anthracite-900">
                {companies.sas.name}
              </p>
              <p className="text-anthracite-500">
                {companies.sas.postal} {companies.sas.city}
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fade-up animate-delay-1">
          <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-sm">
            <Image
              src={images.side}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <h2 className="text-lg font-semibold text-anthracite-900 sm:text-xl">
            {content.home.offerTitle}
          </h2>
          <ul className="mt-3 space-y-2.5">
            <li className="flex items-start gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-anthracite-700">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <Package className="h-4 w-4" />
              </span>
              <span className="font-medium leading-snug">
                {content.home.offerParts}
              </span>
            </li>
            <li className="flex items-start gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 text-sm text-anthracite-700">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-muted text-accent">
                <Wrench className="h-4 w-4" />
              </span>
              <span className="font-medium leading-snug">
                {content.home.offerService}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
