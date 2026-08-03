import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

export function HomePage({ content, images, companies }: Props) {
  return (
    <div className="flex-1 bg-background">
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt=""
            fill
            priority
            className="object-cover scale-[1.01]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950 via-anthracite-950/92 to-anthracite-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/40 via-transparent to-anthracite-950/20" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(217,119,6,0.25)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {content.home.eyebrow}
            </p>
          </div>

          <h1 className="animate-fade-up animate-delay-1 mt-4 max-w-3xl text-[1.85rem] font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
            {content.home.heroTitle}
          </h1>

          <p className="animate-fade-up animate-delay-2 mt-3 max-w-xl text-[0.95rem] leading-relaxed text-anthracite-200/95 sm:text-base">
            {content.home.heroSubtitle}
          </p>

          <div className="animate-fade-up animate-delay-3 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <ConfiguratorButton
              label={content.home.configuratorLabel}
              hint={content.home.configuratorHint}
              size="hero"
            />
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/12"
            >
              {content.home.contactCta}
              <ArrowRight className="h-4 w-4 opacity-90" />
            </Link>
          </div>
        </div>
      </section>

      {/* Compact path into the two content pages */}
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/angebot"
            className="card-lift group rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {content.nav.products}
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-anthracite-900">
              {content.offerings.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-anthracite-500">
              {content.offerings.intro}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-anthracite-900 transition-colors group-hover:text-accent">
              {content.offerings.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/leistungen"
            className="card-lift group rounded-2xl border border-border bg-surface p-5 shadow-sm"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {content.nav.offerings}
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-anthracite-900">
              {content.home.whoTitle}
            </h2>
            <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-anthracite-500">
              {content.home.whoBody}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-anthracite-900 transition-colors group-hover:text-accent">
              {companies.wima.city} · {companies.sas.city}
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
