import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
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
      {/* Hero */}
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

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-[4.5rem]">
          <div className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(217,119,6,0.25)]" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              {content.home.eyebrow}
            </p>
          </div>

          <h1 className="animate-fade-up animate-delay-1 mt-5 max-w-3xl text-[1.85rem] font-semibold tracking-tight text-white text-balance sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
            {content.home.heroTitle}
          </h1>

          <p className="animate-fade-up animate-delay-2 mt-4 max-w-xl text-[0.95rem] leading-relaxed text-anthracite-200/95 sm:text-base sm:leading-relaxed">
            {content.home.heroSubtitle}
          </p>

          <div className="animate-fade-up animate-delay-3 mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center">
            <ConfiguratorButton
              label={content.home.configuratorLabel}
              hint={content.home.configuratorHint}
              size="hero"
            />

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/12"
            >
              {content.home.contactCta}
              <ArrowRight className="h-4 w-4 opacity-90 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Who + image (balanced columns) */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-10">
          <div className="animate-fade-up flex flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-anthracite-900 sm:text-[1.35rem]">
              {content.home.whoTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-anthracite-500 sm:text-[0.95rem] sm:leading-relaxed">
              {content.home.whoBody}
            </p>

            <div className="mt-6 grid flex-1 content-start gap-3 sm:grid-cols-2">
              {[companies.wima, companies.sas].map((c) => (
                <div
                  key={c.name}
                  className="card-lift rounded-2xl border border-border bg-surface px-4 py-3.5 shadow-sm"
                >
                  <p className="text-sm font-semibold tracking-tight text-anthracite-900">
                    {c.name}
                  </p>
                  <p className="mt-1 text-sm text-anthracite-500">
                    {c.postal} {c.city}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-up animate-delay-1 min-h-[14rem] lg:min-h-0">
            <div className="img-zoom relative h-full min-h-[14rem] overflow-hidden rounded-2xl border border-border shadow-[0_12px_40px_-16px_rgba(18,22,27,0.35)] lg:min-h-full">
              <Image
                src={images.side}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Problem / solution — side by side, fills width under image row */}
        <div className="animate-fade-up animate-delay-2 mt-10">
          <h2 className="text-xl font-semibold tracking-tight text-anthracite-900 sm:text-[1.35rem]">
            {content.home.offerTitle}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4">
            <li className="card-lift flex h-full items-start gap-3.5 rounded-2xl border border-border bg-surface px-4 py-4 shadow-sm">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-muted text-accent ring-1 ring-accent/10">
                <Package className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="text-sm font-medium leading-snug text-anthracite-800">
                {content.home.offerParts}
              </span>
            </li>
            <li className="card-lift flex h-full items-start gap-3.5 rounded-2xl border border-border bg-surface px-4 py-4 shadow-sm">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-muted text-accent ring-1 ring-accent/10">
                <Wrench className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="text-sm font-medium leading-snug text-anthracite-800">
                {content.home.offerService}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
