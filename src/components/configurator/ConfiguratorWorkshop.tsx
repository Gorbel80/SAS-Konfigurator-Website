"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ConfiguratorStage3D } from "@/components/configurator/ConfiguratorStage3D";
import {
  catalogProducts,
  type BomPart,
  type CatalogProduct,
} from "@/data/configurator-catalog";
import type { Locale, LocaleContent } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Box,
  Eye,
  Layers,
  Mail,
  Package,
  Trash2,
} from "lucide-react";

type Props = {
  locale: Locale;
  labels: LocaleContent["configuratorPage"];
};

export function ConfiguratorWorkshop({ locale, labels }: Props) {
  const [productId, setProductId] = useState(catalogProducts[0]?.id ?? "");
  const product = useMemo(
    () => catalogProducts.find((p) => p.id === productId) ?? catalogProducts[0],
    [productId],
  );

  const [partlist, setPartlist] = useState<BomPart[]>(
    () => product?.parts.map((p) => ({ ...p })) ?? [],
  );
  const [selectedPartId, setSelectedPartId] = useState<string | null>(
    product?.parts[0]?.id ?? null,
  );
  const [use3d, setUse3d] = useState(true);

  // Reset BOM when product changes
  useEffect(() => {
    if (!product) return;
    setPartlist(product.parts.map((p) => ({ ...p })));
    setSelectedPartId(product.parts[0]?.id ?? null);
  }, [product]);

  const selectedPart = useMemo(
    () => partlist.find((p) => p.id === selectedPartId) ?? null,
    [partlist, selectedPartId],
  );

  function removePart(id: string) {
    setPartlist((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (selectedPartId === id) {
        setSelectedPartId(next[0]?.id ?? null);
      }
      return next;
    });
  }

  function selectProduct(p: CatalogProduct) {
    setProductId(p.id);
  }

  const requestHref = `/contact?subject=${encodeURIComponent(
    `G-Force Konfigurator: ${product?.name[locale] ?? ""} – ${partlist
      .map((p) => p.partNumber)
      .join(", ")}`,
  )}`;

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-anthracite-950 text-anthracite-100">
      {/* Top header */}
      <header className="z-30 shrink-0 border-b border-white/10 bg-anthracite-900">
        <div className="flex h-14 items-center justify-between gap-3 px-3 sm:px-4 lg:px-5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-xs font-semibold text-anthracite-200 transition-colors hover:bg-white/10 hover:text-white"
              title={labels.backLabel}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{labels.backLabel}</span>
            </Link>
            <div className="hidden h-6 w-px bg-white/10 sm:block" />
            <h1 className="truncate text-sm font-semibold tracking-tight sm:text-base">
              <span className="text-white">G-Force</span>{" "}
              <span className="text-accent">{labels.titleWord}</span>
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Image
              src="/images/brand/sas-logo.svg"
              alt="SAS Sauer-Automation"
              width={150}
              height={36}
              className="h-8 w-auto sm:h-9"
              priority
            />
            <LanguageSwitcher className="[&_button]:border-white/15 [&_button]:bg-white/5 [&_button]:text-anthracite-100" />
          </div>
        </div>
      </header>

      {/* 3-column workspace */}
      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[240px_1fr_280px] xl:grid-cols-[260px_1fr_300px]">
        {/* Left – Parts Library */}
        <aside className="flex min-h-0 flex-col border-b border-white/10 bg-anthracite-900 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
            <Layers className="h-4 w-4 text-accent" />
            <p className="text-[11px] font-semibold uppercase tracking-wider text-anthracite-300">
              {labels.libraryTitle}
            </p>
          </div>
          <div className="custom-scroll flex gap-2 overflow-x-auto p-2.5 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">
            {catalogProducts.map((p) => {
              const active = p.id === productId;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProduct(p)}
                  className={cn(
                    "flex w-[11.5rem] shrink-0 flex-col overflow-hidden rounded-xl border text-left transition-all lg:w-full",
                    active
                      ? "border-accent bg-accent/10 ring-1 ring-accent/40"
                      : "border-white/10 bg-anthracite-950/70 hover:border-white/25 hover:bg-anthracite-800",
                  )}
                >
                  <div className="relative aspect-[16/10] w-full bg-anthracite-950">
                    <Image
                      src={p.image}
                      alt={p.name[locale]}
                      fill
                      className="object-contain p-1.5"
                      sizes="240px"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-[11px] font-semibold leading-snug text-white">
                      {p.name[locale]}
                    </p>
                    <p className="mt-1 text-[10px] font-medium text-anthracite-400">
                      {p.series} · {p.capacity}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center – stage */}
        <section className="relative flex min-h-[240px] flex-col bg-[radial-gradient(ellipse_at_center,_#252b34_0%,_#12161b_55%,_#0a0c0f_100%)] lg:min-h-0">
          <div className="flex items-center justify-between gap-2 border-b border-white/5 px-3 py-2">
            <p className="truncate text-xs font-medium text-anthracite-300">
              {product?.name[locale]}
            </p>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setUse3d(true)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
                  use3d
                    ? "bg-accent text-white"
                    : "bg-white/5 text-anthracite-400 hover:text-white",
                )}
              >
                3D
              </button>
              <button
                type="button"
                onClick={() => setUse3d(false)}
                className={cn(
                  "rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
                  !use3d
                    ? "bg-accent text-white"
                    : "bg-white/5 text-anthracite-400 hover:text-white",
                )}
              >
                {labels.viewImage}
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            {use3d ? (
              <ConfiguratorStage3D className="absolute inset-0 h-full w-full" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <div className="relative h-full w-full max-w-2xl">
                  <Image
                    src={product?.image ?? "/images/configurator/machine.png"}
                    alt={product?.name[locale] ?? "G-Force"}
                    fill
                    className="object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.5)]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            )}

            {selectedPart ? (
              <div className="absolute bottom-3 left-3 right-3 mx-auto max-w-md rounded-xl border border-white/10 bg-anthracite-950/85 px-3 py-2 backdrop-blur-sm sm:left-auto sm:right-3 sm:max-w-xs">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-anthracite-500">
                  {labels.selectedPart}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  {selectedPart.name[locale]}
                </p>
                <p className="font-mono text-xs text-accent">
                  {selectedPart.partNumber}
                </p>
              </div>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-white/10 px-3 py-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-anthracite-500">
              {labels.stageLabel}
            </p>
            <Link
              href={requestHref}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-accent px-3 text-[11px] font-semibold text-white hover:bg-accent-hover"
            >
              <Mail className="h-3.5 w-3.5" />
              {labels.requestLabel}
            </Link>
          </div>
        </section>

        {/* Right – Partlist */}
        <aside className="flex min-h-0 flex-col border-t border-white/10 bg-anthracite-900 lg:border-l lg:border-t-0">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5">
            <div className="flex items-center gap-2">
              <Box className="h-4 w-4 text-accent" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-anthracite-300">
                {labels.partlistTitle}
              </p>
            </div>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-anthracite-300">
              {partlist.length}
            </span>
          </div>

          <div className="custom-scroll min-h-0 flex-1 overflow-y-auto p-2">
            {partlist.length === 0 ? (
              <p className="px-2 py-8 text-center text-xs text-anthracite-500">
                {labels.emptyPartlist}
              </p>
            ) : (
              <ul className="space-y-1">
                {partlist.map((part) => {
                  const active = part.id === selectedPartId;
                  return (
                    <li key={part.id}>
                      <div
                        className={cn(
                          "group flex items-stretch gap-1 rounded-lg border transition-colors",
                          active
                            ? "border-accent/50 bg-accent/10"
                            : "border-transparent bg-black/20 hover:border-white/10 hover:bg-black/35",
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedPartId(part.id)}
                          className="flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-2 text-left"
                        >
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-anthracite-950">
                            {part.image ? (
                              <Image
                                src={part.image}
                                alt=""
                                width={32}
                                height={32}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-3.5 w-3.5 text-anthracite-500" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-anthracite-100">
                              {part.name[locale]}
                            </span>
                            <span className="block truncate font-mono text-[10px] text-anthracite-500">
                              {part.partNumber}
                            </span>
                          </span>
                          {active ? (
                            <Eye className="ml-auto h-3.5 w-3.5 shrink-0 text-accent" />
                          ) : null}
                        </button>
                        <button
                          type="button"
                          onClick={() => removePart(part.id)}
                          className="shrink-0 px-2.5 text-anthracite-500 transition-colors hover:text-red-400"
                          title={labels.deletePart}
                          aria-label={labels.deletePart}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {selectedPart ? (
            <div className="border-t border-white/10 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-anthracite-500">
                {labels.detailTitle}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {selectedPart.name[locale]}
              </p>
              <p className="mt-0.5 font-mono text-xs text-accent">
                {selectedPart.partNumber}
              </p>
              <button
                type="button"
                onClick={() => removePart(selectedPart.id)}
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-anthracite-200 transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {labels.deletePart}
              </button>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
