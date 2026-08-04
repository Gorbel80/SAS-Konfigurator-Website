import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import type { LocaleContent, SiteContent } from "@/content/types";
import {
  AlertCircle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Wrench,
} from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

/** Pillars: G-Force & Easy Arm · Service · Ersatzteile (vision structure) */
const pillars = [
  {
    id: "g-force",
    key: "lifts" as const,
    image: "lifts" as const,
  },
  {
    id: "service",
    key: "service" as const,
    image: "service" as const,
  },
  {
    id: "ersatzteile",
    key: "parts" as const,
    image: "parts" as const,
  },
];

export function HomePage({ content, images }: Props) {
  const o = content.offerings;
  const h = content.home;

  return (
    <div className="flex-1 bg-background">
      <PageHeroBanner
        imageSrc={images.hero}
        imageAlt={h.heroTitle}
        eyebrow={h.eyebrow}
        title={h.heroTitle}
        subtitle={h.heroSubtitle}
        badge="G-Force®"
      >
        <ConfiguratorButton
          label={h.configuratorLabel}
          hint={h.configuratorHint}
          size="hero"
        />
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.07] px-5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/35 hover:bg-white/12 sm:h-12"
        >
          {h.contactCta}
          <ArrowRight className="h-4 w-4 opacity-90" />
        </Link>
      </PageHeroBanner>

      {/* Three strong content blocks */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="animate-fade-up mb-7 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              SAS × WiMa
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-anthracite-900 sm:text-2xl">
              {o.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-anthracite-500 sm:text-[0.9375rem]">
              {o.intro}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 sm:gap-4 lg:gap-5">
            {pillars.map((p, i) => {
              const block = o[p.key];
              return (
                <article
                  id={p.id}
                  key={p.id}
                  className={`animate-fade-up card-lift group scroll-mt-36 overflow-hidden rounded-2xl border border-border bg-background shadow-sm ${
                    i === 1
                      ? "animate-delay-1"
                      : i === 2
                        ? "animate-delay-2"
                        : ""
                  }`}
                >
                  <div className="img-zoom relative aspect-[16/10]">
                    <Image
                      src={images[p.image]}
                      alt={block.title}
                      fill
                      loading="lazy"
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={75}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-anthracite-950/85 via-anthracite-950/40 to-transparent px-4 pb-3 pt-10">
                      <h3 className="text-sm font-semibold tracking-wide text-white sm:text-[0.9375rem]">
                        {block.title}
                      </h3>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-sm leading-relaxed text-anthracite-500">
                      {block.body}
                    </p>
                    {p.key === "parts" ? (
                      <Link
                        href="/konfigurator"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
                      >
                        {h.configuratorLabel}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>

          <p className="animate-fade-up animate-delay-3 mt-6 rounded-xl border border-accent/15 bg-accent-muted/60 px-4 py-3 text-sm font-medium leading-relaxed text-anthracite-700">
            {o.journeyNote}
          </p>
        </div>
      </section>

      {/* Problem → Solution */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
          <div className="animate-fade-up mb-6 max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Europa
            </p>
            <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-anthracite-900 sm:text-2xl">
              {h.offerTitle}
            </h2>
          </div>

          <div className="animate-fade-up animate-delay-1 grid gap-3 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
            <div className="card-lift flex flex-col rounded-2xl border border-anthracite-200 bg-anthracite-50/90 px-5 py-5 shadow-sm lg:rounded-r-none lg:border-r-0">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-anthracite-200/90 text-anthracite-700">
                  <AlertCircle className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-anthracite-500">
                  {h.problemLabel}
                </span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-anthracite-700 sm:text-[0.9375rem]">
                {h.offerParts}
              </p>
            </div>

            <div
              className="flex shrink-0 items-center justify-center py-1 lg:w-12"
              aria-hidden
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-accent shadow-md">
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </span>
            </div>

            <div className="card-lift flex flex-col rounded-2xl border border-emerald-200/90 bg-emerald-50/60 px-5 py-5 shadow-sm lg:rounded-l-none lg:border-l-0">
              <div className="mb-3 flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
                  {h.solutionLabel}
                </span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-anthracite-800 sm:text-[0.9375rem]">
                {h.offerService}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service band + type-plate CTA */}
      <section className="border-b border-border bg-anthracite-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
          <div className="animate-fade-up">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Wrench className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                Service
              </span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {h.serviceBandTitle}
            </h2>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <Camera className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {h.serviceCtaTitle}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-anthracite-300">
                    {h.serviceCtaBody}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
                  >
                    {h.serviceCtaButton}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-fade-up animate-delay-1 grid grid-cols-2 gap-3">
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={images.service}
                alt={o.service.title}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={72}
              />
            </div>
            <div className="img-zoom relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
              <Image
                src={images.parts}
                alt={o.parts.title}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
                quality={72}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8">
          <h2 className="animate-fade-up max-w-xl text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
            {h.sloganPrimary}
          </h2>
          <p className="animate-fade-up animate-delay-1 max-w-lg text-sm text-anthracite-500">
            {h.sloganSecondary}
          </p>
          <div className="animate-fade-up animate-delay-2 mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-anthracite-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
            >
              {o.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <ConfiguratorButton
              label={h.configuratorLabel}
              hint={h.configuratorHint}
              size="hero"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
