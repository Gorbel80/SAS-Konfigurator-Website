import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PageHeroBanner } from "@/components/layout/PageHeroBanner";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight, Gauge, Hand, Move3d } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
};

const cardMeta = [
  { key: "balancers" as const, image: "lifts" as const, icon: Gauge },
  { key: "controls" as const, image: "service" as const, icon: Hand },
  { key: "easyArm" as const, image: "side" as const, icon: Move3d },
];

/** Product page: G-Force balancers, controls, Easy Arm — dense layout */
export function GForcePage({ content, images }: Props) {
  const p = content.gforcePage;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <PageHeroBanner
        imageSrc={images.hero}
        imageAlt={p.heroTitle}
        eyebrow={p.heroEyebrow}
        title={p.heroTitle}
        subtitle={p.heroSubtitle}
        compact
        dense
      >
        <ConfiguratorButton label="3D Konfigurator" hint="Öffnen" size="hero" />
        <Link
          href="/contact"
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/[0.07] px-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/35 hover:bg-white/12"
        >
          {p.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </PageHeroBanner>

      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <p className="animate-fade-up mx-auto max-w-3xl text-center text-sm leading-snug text-anthracite-600">
          {p.intro}
        </p>

        {/* Product cards — short images, tight copy */}
        <div className="mt-3.5 grid gap-2.5 sm:grid-cols-3">
          {cardMeta.map((meta, i) => {
            const card = p[meta.key];
            const Icon = meta.icon;
            return (
              <article
                key={meta.key}
                className={`animate-fade-up card-lift overflow-hidden rounded-lg border border-border bg-surface shadow-sm ${
                  i === 1 ? "animate-delay-1" : i === 2 ? "animate-delay-2" : ""
                }`}
              >
                <div className="img-zoom relative aspect-[2.2/1] bg-anthracite-50 sm:aspect-[2/1]">
                  <Image
                    src={images[meta.image]}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                  />
                </div>
                <div className="border-t border-border px-3 py-2.5">
                  <div className="mb-1 flex items-center gap-1.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10 text-accent">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    <h2 className="text-[13px] font-semibold tracking-tight text-anthracite-900">
                      {card.title}
                    </h2>
                  </div>
                  <p className="text-xs leading-snug text-anthracite-500 line-clamp-2 sm:text-[13px] sm:line-clamp-3">
                    {card.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Body + side image — compact split */}
        <div className="animate-fade-up animate-delay-2 mt-3.5 overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-3.5 sm:p-4">
              <h2 className="text-sm font-semibold tracking-tight text-anthracite-900 sm:text-base">
                {p.heroTitle}
              </h2>
              <p className="mt-1.5 text-xs leading-snug text-anthracite-600 sm:text-sm sm:leading-relaxed">
                {p.body}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/contact"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full bg-anthracite-900 px-3 text-xs font-semibold text-white transition-colors hover:bg-anthracite-800 sm:text-sm"
                >
                  {p.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/service"
                  className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-anthracite-800 transition-colors hover:bg-anthracite-50 sm:text-sm"
                >
                  {content.nav.service}
                </Link>
              </div>
            </div>
            <div className="relative min-h-[120px] border-t border-border bg-anthracite-50 lg:min-h-0 lg:border-l lg:border-t-0">
              <Image
                src={images.lifts}
                alt={p.heroTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 35vw"
                quality={75}
              />
            </div>
          </div>
        </div>

        {/* Specs — compact table */}
        <div className="animate-fade-up animate-delay-3 mt-3.5">
          <h2 className="text-sm font-semibold tracking-tight text-anthracite-900 sm:text-base">
            {p.specsTitle}
          </h2>
          <div className="mt-2 overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
            <table className="w-full min-w-[480px] border-collapse text-left text-xs sm:text-[13px]">
              <thead>
                <tr className="border-b border-border bg-anthracite-900 text-white">
                  {p.specsHeaders.map((h) => (
                    <th
                      key={h}
                      className="px-2.5 py-1.5 font-semibold first:rounded-tl-lg last:rounded-tr-lg sm:px-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {p.specs.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i % 2 === 0 ? "bg-surface" : "bg-anthracite-50/70"
                    }
                  >
                    <th className="px-2.5 py-1.5 font-medium text-anthracite-800 sm:px-3">
                      {row.label}
                    </th>
                    {row.values.map((v) => (
                      <td
                        key={`${row.label}-${v}`}
                        className="px-2.5 py-1.5 tabular-nums text-anthracite-600 sm:px-3"
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
