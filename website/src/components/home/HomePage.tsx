import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
  companies: SiteContent["companies"];
};

/** Three pillars only – matches clean Gorbel start layout */
const pillars = [
  {
    id: "g-force",
    key: "lifts" as const,
    image: "lifts" as const,
    href: "/g-force",
  },
  {
    id: "service",
    key: "service" as const,
    image: "service" as const,
    href: "/service",
  },
  {
    id: "ersatzteile",
    key: "parts" as const,
    image: "parts" as const,
    href: "/contact",
  },
];

/**
 * Start page: hero + three cards. No extra sections.
 */
export function HomePage({ content, images }: Props) {
  const o = content.offerings;
  const h = content.home;

  return (
    <div className="flex-1 bg-white">
      {/* Full-width industrial hero */}
      <section className="relative min-h-[min(52vh,28rem)] overflow-hidden sm:min-h-[min(58vh,34rem)] lg:min-h-[min(62vh,38rem)]">
        <Image
          src={images.hero}
          alt={h.heroTitle}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={82}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950/80 via-anthracite-950/55 to-anthracite-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/50 via-transparent to-anthracite-950/20" />

        <div className="relative mx-auto flex min-h-[inherit] max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="animate-fade-up text-[1.65rem] font-semibold tracking-tight text-white text-balance sm:text-3xl lg:text-[2.35rem] lg:leading-[1.15]">
              {h.heroTitle}
            </h1>
            <p className="animate-fade-up animate-delay-1 mt-3 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {h.heroSubtitle}
            </p>

            <div className="animate-fade-up animate-delay-2 mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/konfigurator"
                className="inline-flex h-11 items-center justify-center rounded-full bg-sky px-6 text-sm font-semibold text-white shadow-[0_6px_20px_-6px_rgba(26,140,255,0.65)] transition-all duration-300 hover:bg-[#0f7ae6] hover:shadow-[0_8px_24px_-6px_rgba(26,140,255,0.75)] sm:h-12 sm:px-7 sm:text-[0.9375rem]"
              >
                {h.configuratorCta}
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center rounded-full bg-amber-400 px-6 text-sm font-semibold text-anthracite-950 shadow-[0_6px_20px_-6px_rgba(251,191,36,0.55)] transition-all duration-300 hover:bg-amber-300 hover:shadow-[0_8px_24px_-6px_rgba(251,191,36,0.65)] sm:h-12 sm:px-7 sm:text-[0.9375rem]"
              >
                {h.contactCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Three cards */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="grid gap-5 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {pillars.map((p, i) => {
              const block = o[p.key];
              return (
                <Link
                  id={p.id}
                  key={p.id}
                  href={p.href}
                  className={`animate-fade-up group flex flex-col overflow-hidden rounded-sm border border-anthracite-200/90 bg-white shadow-[0_2px_12px_-4px_rgba(6,16,28,0.12)] outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(6,16,28,0.2)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                    i === 1
                      ? "animate-delay-1"
                      : i === 2
                        ? "animate-delay-2"
                        : ""
                  }`}
                >
                  <div className="bg-accent px-3.5 py-2.5">
                    <h2 className="flex items-center justify-between gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-white sm:text-sm">
                      <span>{block.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 opacity-80 transition-transform group-hover:translate-x-0.5" />
                    </h2>
                  </div>
                  <div className="relative aspect-[16/11] bg-anthracite-50">
                    <Image
                      src={images[p.image]}
                      alt={block.title}
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, 33vw"
                      quality={78}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-4.5">
                    <p className="text-sm leading-relaxed text-anthracite-600">
                      {block.body}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
