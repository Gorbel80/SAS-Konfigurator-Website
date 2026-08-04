import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowRight } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
};

const blocks = [
  { key: "service" as const, image: "service" as const },
  { key: "parts" as const, image: "parts" as const },
  { key: "lifts" as const, image: "lifts" as const },
];

export function OfferingsPage({ content, images }: Props) {
  const o = content.offerings;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8">
        <header className="animate-fade-up mb-6 max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            SAS × WiMa
          </p>
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-anthracite-900 sm:text-[1.75rem]">
            {o.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
            {o.intro}
          </p>
          <p className="mt-2 rounded-lg border border-accent/20 bg-accent-muted/60 px-3 py-2 text-xs font-medium leading-relaxed text-anthracite-700 sm:text-sm">
            {o.journeyNote}
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-3 lg:gap-3.5">
          {blocks.map((b, i) => {
            const block = o[b.key];
            return (
              <article
                key={b.key}
                className={`animate-fade-up card-lift overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${
                  i === 1 ? "animate-delay-1" : i === 2 ? "animate-delay-2" : ""
                }`}
              >
                <div className="img-zoom relative aspect-[16/10] sm:aspect-[5/3]">
                  <Image
                    src={images[b.image]}
                    alt={block.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                    priority={i === 0}
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h2 className="text-[0.9375rem] font-semibold tracking-tight text-anthracite-900 sm:text-base">
                    {block.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                    {block.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="animate-fade-up animate-delay-3 mt-6 flex justify-center sm:mt-7">
          <Link
            href="/contact"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-anthracite-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
          >
            {o.ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
