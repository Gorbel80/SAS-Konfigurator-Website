"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PartCard } from "./PartCard";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import type { Locale, Product, SparePart, SparePartCategory } from "@/lib/types";
import { cn, formatCapacity, t } from "@/lib/utils";
import {
  ArrowLeft,
  Crosshair,
  FileText,
  Info,
  Wrench,
} from "lucide-react";

interface WorkshopProps {
  product: Product;
  parts: SparePart[];
  seriesName?: string;
  isLegacy?: boolean;
}

export function Workshop({
  product,
  parts,
  seriesName,
  isLegacy,
}: WorkshopProps) {
  const locale = useLocale() as Locale;
  const tw = useTranslations("workshop");
  const tCat = useTranslations("partCategories");
  const [selectedId, setSelectedId] = useState<string | null>(
    parts[0]?.id ?? null
  );
  const [filter, setFilter] = useState<SparePartCategory | "all">("all");

  const selected = useMemo(
    () => parts.find((p) => p.id === selectedId) ?? null,
    [parts, selectedId]
  );

  const categories = useMemo(() => {
    const set = new Set(parts.map((p) => p.category));
    return Array.from(set);
  }, [parts]);

  const filtered = useMemo(() => {
    if (filter === "all") return parts;
    return parts.filter((p) => p.category === filter);
  }, [parts, filter]);

  const serviceHref = selected
    ? `/service-request?productId=${encodeURIComponent(product.id)}&sparePartId=${encodeURIComponent(selected.id)}&partNumber=${encodeURIComponent(selected.partNumber)}`
    : `/service-request?productId=${encodeURIComponent(product.id)}`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Toolbar */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              href={`/configurator/${product.categoryId}`}
              className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 text-sm font-medium text-anthracite-600 hover:bg-anthracite-50"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{tw("back")}</span>
            </Link>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-base font-semibold text-anthracite-900 sm:text-lg">
                  {t(product.name, locale)}
                </h1>
                <Badge tone="sky">
                  {formatCapacity(product.capacity, locale)}
                </Badge>
                {isLegacy ? (
                  <Badge tone="legacy">{tw("series")} · Legacy</Badge>
                ) : null}
              </div>
              <p className="truncate font-mono text-xs text-anthracite-400">
                {product.partNumber}
                {seriesName ? ` · ${seriesName}` : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href={serviceHref}>
              <Button size="sm" variant="outline">
                <FileText className="h-4 w-4" />
                {tw("requestQuote")}
              </Button>
            </Link>
            <Link href={serviceHref}>
              <Button size="sm">
                <Wrench className="h-4 w-4" />
                {tw("requestService")}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main workspace */}
      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-0 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
        {/* Visual stage */}
        <div className="flex flex-col border-b border-border lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-border bg-anthracite-50/80 px-4 py-2 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-anthracite-500">
              {tw("visualArea")}
            </p>
            <p className="hidden items-center gap-1.5 text-xs text-anthracite-400 sm:inline-flex">
              <Crosshair className="h-3.5 w-3.5" />
              {tw("hotspotHint")}
            </p>
          </div>

          <div className="relative flex flex-1 items-center justify-center bg-industrial-grid p-4 sm:p-8 min-h-[320px] sm:min-h-[420px]">
            <div className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-anthracite-800 shadow-lg">
              <ProductPlaceholder
                title={t(product.name, locale)}
                subtitle={tw("placeholderImage")}
                hint={product.imageHint}
                variant="product"
                dark
                className="rounded-2xl"
              />

              {/* Hotspots */}
              {(product.hotspots ?? []).map((h) => {
                const active = selectedId === h.sparePartId;
                return (
                  <button
                    key={`${h.sparePartId}-${h.x}-${h.y}`}
                    type="button"
                    onClick={() => setSelectedId(h.sparePartId)}
                    className={cn(
                      "absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-transform",
                      active
                        ? "scale-125 border-white bg-accent text-white hotspot-pulse"
                        : "border-white/80 bg-anthracite-900/80 text-accent hover:scale-110"
                    )}
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                    title={t(h.label, locale)}
                    aria-label={t(h.label, locale)}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Parts library strip */}
          <div className="border-t border-border bg-surface">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-anthracite-500">
                {tw("partsLibrary")}
              </p>
              <div className="flex max-w-full gap-1.5 overflow-x-auto custom-scroll pb-0.5">
                <FilterChip
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  label={tw("allParts")}
                />
                {categories.map((c) => (
                  <FilterChip
                    key={c}
                    active={filter === c}
                    onClick={() => setFilter(c)}
                    label={tCat(c)}
                  />
                ))}
              </div>
            </div>
            <div className="custom-scroll flex gap-3 overflow-x-auto px-4 pb-4 sm:px-6">
              {filtered.map((part) => (
                <div key={part.id} className="w-44 shrink-0 sm:w-48">
                  <PartCard
                    part={part}
                    locale={locale}
                    selected={selectedId === part.id}
                    onSelect={(p) => setSelectedId(p.id)}
                    categoryLabel={tCat(part.category)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <aside className="flex flex-col bg-surface">
          <div className="border-b border-border px-5 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-anthracite-500">
              {tw("selectedPart")}
            </p>
          </div>

          {selected ? (
            <div className="flex flex-1 flex-col p-5">
              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-border">
                <ProductPlaceholder
                  title={t(selected.name, locale)}
                  subtitle={selected.partNumber}
                  hint={selected.imageHint}
                  variant="part"
                />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-anthracite-900">
                {t(selected.name, locale)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
                {t(selected.description, locale)}
              </p>

              <dl className="mt-5 space-y-3 rounded-xl border border-border bg-anthracite-50/80 p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-anthracite-500">{tw("partNumber")}</dt>
                  <dd className="font-mono font-semibold text-anthracite-900">
                    {selected.partNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-anthracite-500">{tw("category")}</dt>
                  <dd>
                    <Badge tone="default">{tCat(selected.category)}</Badge>
                  </dd>
                </div>
                {selected.level ? (
                  <div className="flex justify-between gap-3">
                    <dt className="text-anthracite-500">{tw("level")}</dt>
                    <dd className="font-semibold text-anthracite-900">
                      {selected.level}
                    </dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-3">
                  <dt className="text-anthracite-500">{tw("capacity")}</dt>
                  <dd className="font-semibold text-anthracite-900">
                    {formatCapacity(product.capacity, locale)}
                  </dd>
                </div>
              </dl>

              {selected.notes ? (
                <div className="mt-4 flex gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>{t(selected.notes, locale)}</p>
                </div>
              ) : null}

              <div className="mt-auto flex flex-col gap-2 pt-6">
                <Link href={serviceHref} className="w-full">
                  <Button className="w-full" size="lg">
                    <Wrench className="h-4 w-4" />
                    {tw("addToRequest")}
                  </Button>
                </Link>
                <Link href={serviceHref} className="w-full">
                  <Button className="w-full" variant="outline" size="lg">
                    <FileText className="h-4 w-4" />
                    {tw("requestQuote")}
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-anthracite-400">
              <Crosshair className="h-10 w-10 opacity-40" />
              <p className="text-sm">{tw("noSelection")}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        active
          ? "bg-anthracite-900 text-white"
          : "bg-anthracite-100 text-anthracite-600 hover:bg-anthracite-200"
      )}
    >
      {label}
    </button>
  );
}
