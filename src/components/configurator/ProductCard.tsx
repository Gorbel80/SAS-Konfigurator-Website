import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import type { Locale, Product } from "@/lib/types";
import { formatCapacity, t } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  locale: Locale;
  openLabel: string;
  legacyLabel?: string;
  isLegacy?: boolean;
}

export function ProductCard({
  product,
  locale,
  openLabel,
  legacyLabel,
  isLegacy,
}: ProductCardProps) {
  return (
    <Link
      href={`/configurator/workshop/${product.id}`}
      className="group card-lift flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
    >
      <div className="relative aspect-[4/3] w-full">
        <ProductPlaceholder
          title={t(product.name, locale)}
          subtitle={product.partNumber}
          hint={product.imageHint}
          variant="product"
          className="rounded-none"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="sky">{formatCapacity(product.capacity, locale)}</Badge>
          {isLegacy ? <Badge tone="legacy">{legacyLabel ?? "Legacy"}</Badge> : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-anthracite-900 sm:text-base">
          {t(product.name, locale)}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs text-anthracite-500 sm:text-sm">
          {t(product.description, locale)}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-anthracite-400">
          <span className="font-mono">{product.partNumber}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
            {openLabel}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
