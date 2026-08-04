import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { LocaleContent, SiteContent } from "@/content/types";
import { ArrowLeft, Box } from "lucide-react";

type Props = {
  content: LocaleContent;
  images: SiteContent["images"];
};

export function ConfiguratorComingSoonPage({ content, images }: Props) {
  const c = content.configuratorPage;

  return (
    <div className="flex flex-1 flex-col bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
          <div className="relative aspect-[16/10] bg-anthracite-100">
            <Image
              src={images.configurator}
              alt={c.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              quality={75}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/70 via-anthracite-950/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur-sm">
                <Box className="h-3.5 w-3.5 text-accent" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  {c.badge}
                </span>
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {c.title}
              </h1>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-anthracite-200 sm:text-base">
                {c.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <p className="text-sm text-anthracite-500">{c.hint}</p>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-anthracite-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {c.backLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
