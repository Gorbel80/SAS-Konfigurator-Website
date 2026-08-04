import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import type { LocaleContent, SiteContent } from "@/content/types";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  Cpu,
  Wrench,
} from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
};

const highlightIcons = [Wrench, Cpu, CheckCircle2] as const;

/** Dedicated service page – modern take on “Guter Service… ein Stück vom Produkt” */
export function ServicePage({ content, images }: Props) {
  const s = content.servicePage;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageHeroBanner
        imageSrc={images.service}
        imageAlt={s.heroTitle}
        eyebrow={s.heroEyebrow}
        title={s.heroTitle}
        subtitle={s.heroSubtitle}
        compact
      >
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
        >
          {s.contactCta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </PageHeroBanner>

      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <h2 className="text-lg font-semibold tracking-tight text-anthracite-900 sm:text-xl">
            {s.headline}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-600">
            {s.intro}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {s.highlights.map((item, i) => {
            const Icon = highlightIcons[i] ?? CheckCircle2;
            return (
              <article
                key={item.title}
                className={`animate-fade-up card-lift rounded-xl border border-border bg-surface p-4 shadow-sm ${
                  i === 1 ? "animate-delay-1" : i === 2 ? "animate-delay-2" : ""
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </span>
                <h3 className="mt-2.5 text-sm font-semibold tracking-tight text-anthracite-900">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-snug text-anthracite-500">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>

        <div className="animate-fade-up animate-delay-2 mt-5 grid gap-3 lg:grid-cols-2">
          <div className="img-zoom relative min-h-[180px] overflow-hidden rounded-xl border border-border shadow-sm sm:min-h-[220px]">
            <Image
              src={images.service}
              alt={s.highlights[0]?.title ?? s.heroTitle}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={78}
            />
          </div>
          <div className="img-zoom relative min-h-[180px] overflow-hidden rounded-xl border border-border shadow-sm sm:min-h-[220px]">
            <Image
              src={images.parts}
              alt={s.highlights[1]?.title ?? s.heroTitle}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={78}
            />
          </div>
        </div>

        <div className="animate-fade-up animate-delay-3 mt-5 overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-anthracite-900 via-anthracite-900 to-anthracite-800 text-white shadow-lg">
          <div className="grid items-center gap-4 p-4 sm:p-5 lg:grid-cols-[1fr_auto]">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-white shadow-md">
                <Camera className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-sky">
                  CTA
                </p>
                <h3 className="mt-0.5 text-base font-semibold tracking-tight sm:text-lg">
                  {s.ctaTitle}
                </h3>
                <p className="mt-1.5 max-w-2xl text-sm leading-snug text-anthracite-200">
                  {s.ctaBody}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                {s.ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/konfigurator"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {content.home.configuratorLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
