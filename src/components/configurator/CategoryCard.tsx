import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import type { Category } from "@/lib/types";
import type { Locale } from "@/lib/types";
import { t } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const accentBorder: Record<string, string> = {
  sky: "hover:border-sky-400",
  cyan: "hover:border-cyan-400",
  indigo: "hover:border-indigo-400",
  amber: "hover:border-amber-400",
  emerald: "hover:border-emerald-400",
};

const accentBar: Record<string, string> = {
  sky: "from-sky-500 to-sky-600",
  cyan: "from-cyan-500 to-cyan-600",
  indigo: "from-indigo-500 to-indigo-600",
  amber: "from-amber-500 to-amber-600",
  emerald: "from-emerald-500 to-emerald-600",
};

interface CategoryCardProps {
  category: Category;
  locale: Locale;
  productCount?: number;
  ctaLabel: string;
}

export function CategoryCard({
  category,
  locale,
  productCount,
  ctaLabel,
}: CategoryCardProps) {
  const isPlaceholder = category.id === "own-products";

  return (
    <Link
      href={`/configurator/${category.slug}`}
      className={`group card-lift relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm ${accentBorder[category.accent] ?? ""}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <ProductPlaceholder
          title={t(category.shortName, locale)}
          subtitle={
            productCount !== undefined && !isPlaceholder
              ? `${productCount}`
              : undefined
          }
          hint={category.imageHint}
          variant="category"
          className="rounded-none"
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${accentBar[category.accent] ?? "from-anthracite-500 to-anthracite-600"}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold tracking-tight text-anthracite-900 sm:text-lg">
            {t(category.shortName, locale)}
          </h3>
          {isPlaceholder ? (
            <Badge tone="muted">…</Badge>
          ) : productCount !== undefined ? (
            <Badge tone="default">{productCount}</Badge>
          ) : null}
        </div>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-anthracite-500">
          {t(category.description, locale)}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
