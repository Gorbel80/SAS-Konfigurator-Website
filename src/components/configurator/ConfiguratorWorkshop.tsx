"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import {
  catalogCategories,
  catalogParts,
  type CatalogPart,
  type PartCategoryId,
} from "@/data/configurator-catalog";
import type { Locale, LocaleContent } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Box,
  Layers,
  Mail,
  Package,
  Search,
  X,
} from "lucide-react";

type Props = {
  locale: Locale;
  labels: LocaleContent["configuratorPage"];
};

const STAGE_IMAGE = "/images/configurator/machine.png";

export function ConfiguratorWorkshop({ locale, labels }: Props) {
  const [category, setCategory] = useState<PartCategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(
    catalogParts[0]?.id ?? null,
  );
  const [tray, setTray] = useState<string[]>([]);

  const selected = useMemo(
    () => catalogParts.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogParts.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (!q) return true;
      const hay = [
        p.partNumber,
        p.name.de,
        p.name.en,
        p.name.zh,
        p.description.de,
        p.description.en,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  function toggleTray(id: string) {
    setTray((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const trayParts = tray
    .map((id) => catalogParts.find((p) => p.id === id))
    .filter(Boolean) as CatalogPart[];

  const stageSrc =
    selected?.image && selected.category === "units"
      ? selected.image
      : STAGE_IMAGE;

  const serviceHref =
    trayParts.length > 0
      ? `/contact?subject=${encodeURIComponent(
          `Konfigurator: ${trayParts.map((p) => p.partNumber).join(", ")}`,
        )}`
      : selected
        ? `/contact?subject=${encodeURIComponent(
            `Konfigurator: ${selected.partNumber}`,
          )}`
        : "/contact";

  return (
    <div className="flex min-h-[calc(100vh-3.75rem)] flex-col bg-anthracite-950 text-anthracite-100">
      {/* Toolbar */}
      <div className="border-b border-white/10 bg-anthracite-900/95">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-3 px-3 py-2.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-semibold text-anthracite-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{labels.backLabel}</span>
            </Link>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-sm font-semibold tracking-tight text-white sm:text-base">
                  {labels.title}
                </h1>
                <span className="rounded-full border border-accent/30 bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                  {labels.badge}
                </span>
              </div>
              <p className="truncate text-[11px] text-anthracite-400 sm:text-xs">
                {labels.hint}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tray.length > 0 ? (
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-anthracite-200">
                {tray.length} {labels.trayLabel}
              </span>
            ) : null}
            <Link
              href={serviceHref}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-3.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
            >
              <Mail className="h-3.5 w-3.5" />
              {labels.requestLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Main workspace */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px]">
        <div className="flex min-h-0 flex-1 flex-col border-b border-white/10 lg:border-b-0 lg:border-r">
          {/* Stage */}
          <div className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_#2a323c_0%,_#12161b_55%,_#0a0c0f_100%)] sm:min-h-[360px]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="relative z-10 mx-auto w-full max-w-2xl px-4 py-8 sm:px-8">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={stageSrc}
                  alt={
                    selected
                      ? selected.name[locale]
                      : labels.stageLabel
                  }
                  fill
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={85}
                />
              </div>
              {selected && selected.category !== "units" && selected.image ? (
                <div className="absolute bottom-4 right-4 h-20 w-20 overflow-hidden rounded-xl border border-white/20 bg-anthracite-900/90 shadow-lg sm:h-24 sm:w-24">
                  <Image
                    src={selected.image}
                    alt={selected.name[locale]}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : null}
            </div>
            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-anthracite-300 backdrop-blur-sm">
              {labels.stageLabel}
            </p>
          </div>

          {/* Parts library */}
          <div className="border-t border-white/10 bg-anthracite-900">
            <div className="flex flex-col gap-2 border-b border-white/10 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-4">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wider text-anthracite-300">
                  {labels.libraryTitle}
                </p>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 sm:max-w-md sm:justify-end">
                <div className="relative min-w-0 flex-1 sm:max-w-xs">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-anthracite-500" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={labels.searchPlaceholder}
                    className="h-9 w-full rounded-lg border border-white/10 bg-anthracite-950/80 py-1 pl-8 pr-3 text-xs text-white placeholder:text-anthracite-500 outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto px-3 py-2 custom-scroll sm:px-4">
              <CatChip
                active={category === "all"}
                onClick={() => setCategory("all")}
                label={labels.allCategories}
              />
              {catalogCategories.map((c) => (
                <CatChip
                  key={c.id}
                  active={category === c.id}
                  onClick={() => setCategory(c.id)}
                  label={c.name[locale]}
                />
              ))}
            </div>

            <div className="custom-scroll flex gap-2.5 overflow-x-auto px-3 pb-3 pt-1 sm:px-4">
              {filtered.length === 0 ? (
                <p className="py-6 text-center text-sm text-anthracite-500 w-full">
                  {labels.emptyLibrary}
                </p>
              ) : (
                filtered.map((part) => (
                  <PartCard
                    key={part.id}
                    part={part}
                    locale={locale}
                    selected={selectedId === part.id}
                    inTray={tray.includes(part.id)}
                    onSelect={() => setSelectedId(part.id)}
                    placeholderLabel={labels.noImage}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <aside className="flex flex-col bg-anthracite-900/80">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-anthracite-400">
              {labels.detailTitle}
            </p>
          </div>

          {selected ? (
            <div className="flex flex-1 flex-col p-4">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-white/10 bg-anthracite-950">
                {selected.image ? (
                  <Image
                    src={selected.image}
                    alt={selected.name[locale]}
                    fill
                    className="object-contain p-2"
                    sizes="340px"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-anthracite-500">
                    <Package className="h-10 w-10 opacity-40" />
                    <span className="text-xs">{labels.noImage}</span>
                  </div>
                )}
              </div>

              <h2 className="mt-4 text-base font-semibold tracking-tight text-white">
                {selected.name[locale]}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-anthracite-400">
                {selected.description[locale]}
              </p>

              <dl className="mt-4 space-y-2.5 rounded-xl border border-white/10 bg-black/25 p-3.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-anthracite-500">{labels.partNumber}</dt>
                  <dd className="font-mono font-semibold text-accent">
                    {selected.partNumber}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-anthracite-500">{labels.categoryLabel}</dt>
                  <dd className="font-medium text-anthracite-200">
                    {catalogCategories.find((c) => c.id === selected.category)
                      ?.name[locale] ?? selected.category}
                  </dd>
                </div>
              </dl>

              <div className="mt-auto flex flex-col gap-2 pt-5">
                <button
                  type="button"
                  onClick={() => toggleTray(selected.id)}
                  className={cn(
                    "inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors",
                    tray.includes(selected.id)
                      ? "border border-white/20 bg-white/10 text-white hover:bg-white/15"
                      : "bg-accent text-white hover:bg-accent-hover",
                  )}
                >
                  <Box className="h-4 w-4" />
                  {tray.includes(selected.id)
                    ? labels.removeFromTray
                    : labels.addToTray}
                </button>
                <Link
                  href={`/contact?subject=${encodeURIComponent(
                    `Konfigurator: ${selected.partNumber} – ${selected.name[locale]}`,
                  )}`}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent text-sm font-semibold text-anthracite-100 transition-colors hover:bg-white/5"
                >
                  <Mail className="h-4 w-4" />
                  {labels.requestLabel}
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center text-anthracite-500">
              <Package className="h-10 w-10 opacity-30" />
              <p className="text-sm">{labels.selectHint}</p>
            </div>
          )}

          {trayParts.length > 0 ? (
            <div className="border-t border-white/10 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-anthracite-400">
                  {labels.trayLabel}
                </p>
                <button
                  type="button"
                  onClick={() => setTray([])}
                  className="text-[11px] font-medium text-anthracite-500 hover:text-white"
                >
                  {labels.clearTray}
                </button>
              </div>
              <ul className="max-h-28 space-y-1 overflow-y-auto custom-scroll">
                {trayParts.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center justify-between gap-2 rounded-lg bg-black/30 px-2.5 py-1.5 text-xs"
                  >
                    <span className="truncate font-medium text-anthracite-200">
                      {p.partNumber}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleTray(p.id)}
                      className="text-anthracite-500 hover:text-white"
                      aria-label="Remove"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function CatChip({
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
        "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors",
        active
          ? "bg-accent text-white"
          : "bg-white/5 text-anthracite-300 hover:bg-white/10 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}

function PartCard({
  part,
  locale,
  selected,
  inTray,
  onSelect,
  placeholderLabel,
}: {
  part: CatalogPart;
  locale: Locale;
  selected: boolean;
  inTray: boolean;
  onSelect: () => void;
  placeholderLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group flex w-[7.5rem] shrink-0 flex-col overflow-hidden rounded-xl border text-left transition-all sm:w-36",
        selected
          ? "border-accent ring-2 ring-accent/40 bg-anthracite-800"
          : "border-white/10 bg-anthracite-950/80 hover:border-white/25 hover:bg-anthracite-800",
      )}
    >
      <div className="relative aspect-[5/4] w-full bg-anthracite-900">
        {part.image ? (
          <Image
            src={part.image}
            alt={part.name[locale]}
            fill
            className="object-contain p-1.5"
            sizes="144px"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 text-anthracite-600">
            <Package className="h-6 w-6 opacity-50" />
            <span className="px-1 text-center text-[9px] leading-tight">
              {placeholderLabel}
            </span>
          </div>
        )}
        {inTray ? (
          <span className="absolute right-1 top-1 rounded bg-accent px-1 py-px text-[9px] font-bold text-white">
            ✓
          </span>
        ) : null}
      </div>
      <div className="p-2">
        <p className="line-clamp-2 text-[11px] font-semibold leading-snug text-anthracite-100">
          {part.name[locale]}
        </p>
        <p className="mt-1 truncate font-mono text-[10px] text-anthracite-500">
          {part.partNumber}
        </p>
      </div>
    </button>
  );
}
