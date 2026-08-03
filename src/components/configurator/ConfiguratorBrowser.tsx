"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CategoryCard } from "./CategoryCard";
import { ProductCard } from "./ProductCard";
import { Input, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import type { Capacity, Category, Locale, Product, Series } from "@/lib/types";
import { t } from "@/lib/utils";
import { Search, Library } from "lucide-react";

const CAPACITIES: Capacity[] = [75, 150, 300, 600];

interface ConfiguratorBrowserProps {
  categories: Category[];
  products: Product[];
  series: Series[];
  /** Pre-selected category slug from deep link */
  activeCategorySlug?: string;
  /** Pre-selected series slug from query */
  initialSeriesSlug?: string;
  /** Pre-selected capacity from query */
  initialCapacity?: number;
  productCounts: Record<string, number>;
}

export function ConfiguratorBrowser({
  categories,
  products,
  series,
  activeCategorySlug,
  initialSeriesSlug,
  initialCapacity,
  productCounts,
}: ConfiguratorBrowserProps) {
  const locale = useLocale() as Locale;
  const tc = useTranslations("configurator");
  const [query, setQuery] = useState("");
  const [seriesFilter, setSeriesFilter] = useState(initialSeriesSlug ?? "all");
  const [capacityFilter, setCapacityFilter] = useState<string>(
    initialCapacity ? String(initialCapacity) : "all"
  );

  const activeCategory = activeCategorySlug
    ? categories.find((c) => c.slug === activeCategorySlug)
    : undefined;

  const categorySeries = useMemo(() => {
    if (!activeCategory) return [];
    return series
      .filter((s) => s.categoryId === activeCategory.id)
      .sort((a, b) => a.order - b.order);
  }, [activeCategory, series]);

  const filteredProducts = useMemo(() => {
    let list = activeCategory
      ? products.filter((p) => p.categoryId === activeCategory.id)
      : products;

    if (seriesFilter !== "all") {
      const s = series.find((x) => x.slug === seriesFilter);
      if (s) list = list.filter((p) => p.seriesId === s.id);
    }

    if (capacityFilter !== "all") {
      const cap = Number(capacityFilter);
      list = list.filter((p) => p.capacity === cap);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => {
        const hay = [
          p.id,
          p.slug,
          p.partNumber,
          p.name.de,
          p.name.en,
          p.name.zh,
          ...p.tags,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      });
    }

    return list;
  }, [
    activeCategory,
    products,
    seriesFilter,
    capacityFilter,
    query,
    series,
  ]);

  const legacySeriesIds = useMemo(
    () => new Set(series.filter((s) => s.status === "legacy").map((s) => s.id)),
    [series]
  );

  // Library overview (no category selected)
  if (!activeCategory) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <HeaderBlock
          title={tc("title")}
          subtitle={tc("subtitle")}
          hint={tc("deepLinkHint")}
        />

        <div className="mt-8">
          <div className="mb-4 flex items-center gap-2">
            <Library className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-anthracite-900">
              {tc("libraries")}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                locale={locale}
                productCount={productCounts[cat.id] ?? 0}
                ctaLabel={tc("openWorkshop")}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isOwn = activeCategory.id === "own-products";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-anthracite-500">
        <Link href="/configurator" className="hover:text-accent">
          {tc("breadcrumbHome")}
        </Link>
        <span>/</span>
        <span className="font-medium text-anthracite-800">
          {t(activeCategory.shortName, locale)}
        </span>
      </nav>

      <HeaderBlock
        title={t(activeCategory.name, locale)}
        subtitle={t(activeCategory.description, locale)}
      />

      {isOwn ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border-strong bg-surface p-10 text-center">
          <Badge tone="muted" className="mb-3">
            {tc("placeholder")}
          </Badge>
          <p className="text-anthracite-600">{tc("ownProductsNote")}</p>
          <Link
            href="/configurator"
            className="mt-6 inline-block text-sm font-semibold text-accent hover:underline"
          >
            ← {tc("allLibraries")}
          </Link>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="mt-8 grid gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-anthracite-400" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tc("searchPlaceholder")}
                className="pl-10"
              />
            </div>
            {categorySeries.length > 0 ? (
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-anthracite-400">
                  {tc("filterSeries")}
                </label>
                <Select
                  value={seriesFilter}
                  onChange={(e) => setSeriesFilter(e.target.value)}
                >
                  <option value="all">{tc("series")}</option>
                  {categorySeries.map((s) => (
                    <option key={s.id} value={s.slug}>
                      {t(s.name, locale)}
                      {s.status === "legacy" ? ` (${tc("legacy")})` : ""}
                    </option>
                  ))}
                </Select>
              </div>
            ) : (
              <div />
            )}
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-anthracite-400">
                {tc("capacity")}
              </label>
              <Select
                value={capacityFilter}
                onChange={(e) => setCapacityFilter(e.target.value)}
              >
                <option value="all">{tc("allCapacities")}</option>
                {CAPACITIES.map((c) => (
                  <option key={c} value={String(c)}>
                    {c} kg
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {/* Series chips (G-Force) */}
          {categorySeries.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSeriesFilter("all")}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                  seriesFilter === "all"
                    ? "bg-anthracite-900 text-white"
                    : "bg-anthracite-100 text-anthracite-600"
                }`}
              >
                {tc("allLibraries")}
              </button>
              {categorySeries.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSeriesFilter(s.slug)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    seriesFilter === s.slug
                      ? "bg-anthracite-900 text-white"
                      : "bg-anthracite-100 text-anthracite-600"
                  }`}
                >
                  {t(s.name, locale)}
                  {s.status === "legacy" ? (
                    <span className="ml-1 opacity-70">· {tc("legacy")}</span>
                  ) : null}
                </button>
              ))}
            </div>
          ) : null}

          <div className="mt-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-anthracite-900">
              {tc("products")}
            </h2>
            <span className="text-sm text-anthracite-400">
              {filteredProducts.length} {tc("items")}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="mt-8 rounded-xl border border-dashed border-border bg-surface p-8 text-center text-anthracite-500">
              {tc("noResults")}
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  openLabel={tc("openWorkshop")}
                  legacyLabel={tc("legacy")}
                  isLegacy={
                    product.seriesId
                      ? legacySeriesIds.has(product.seriesId)
                      : false
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function HeaderBlock({
  title,
  subtitle,
  hint,
}: {
  title: string;
  subtitle: string;
  hint?: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-anthracite-900 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-3xl text-base text-anthracite-500 sm:text-lg">
        {subtitle}
      </p>
      {hint ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-anthracite-400">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
