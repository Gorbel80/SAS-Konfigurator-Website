"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import {
  ConfiguratorStage3D,
  type PartPositions,
} from "@/components/configurator/ConfiguratorStage3D";
import {
  catalogProducts,
  createProfileInstance,
  defaultRolePositions,
  libraryCategories,
  libraryProfiles,
  type BomPart,
  type CatalogProduct,
  type LibraryCategoryId,
  type LibraryProfileItem,
} from "@/data/configurator-catalog";
import type { Locale, LocaleContent } from "@/content/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Box,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Eye,
  Layers,
  Mail,
  Minus,
  Move,
  Plus,
  RotateCcw,
  Trash2,
  ZoomIn,
} from "lucide-react";

type Props = {
  locale: Locale;
  labels: LocaleContent["configuratorPage"];
};

function buildInitialPositions(parts: BomPart[]): PartPositions {
  const map: PartPositions = {};
  for (const p of parts) {
    map[p.id] = [...defaultRolePositions[p.role]] as [number, number, number];
  }
  return map;
}

function clampLength(
  value: number,
  min: number,
  max: number,
  step: number,
): number {
  const clamped = Math.min(max, Math.max(min, value));
  return Math.round(clamped / step) * step;
}

export function ConfiguratorWorkshop({ locale, labels }: Props) {
  const [libraryOpen, setLibraryOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] =
    useState<LibraryCategoryId | null>("profile");

  const [partlist, setPartlist] = useState<BomPart[]>([]);
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [positions, setPositions] = useState<PartPositions>({});
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [sceneKey, setSceneKey] = useState(0);

  const selectedPart = useMemo(
    () => partlist.find((p) => p.id === selectedPartId) ?? null,
    [partlist, selectedPartId],
  );

  const selectedProfileMeta = useMemo(() => {
    if (!selectedPart || selectedPart.role !== "profile") return null;
    return (
      libraryProfiles.find((p) => p.partNumber === selectedPart.partNumber) ??
      libraryProfiles[0]
    );
  }, [selectedPart]);

  function removePart(id: string) {
    setPartlist((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (selectedPartId === id) {
        setSelectedPartId(next[0]?.id ?? null);
      }
      return next;
    });
    setPositions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function loadGForceProduct(p: CatalogProduct) {
    const next = p.parts.map((part) => ({ ...part }));
    setActiveProductId(p.id);
    setPartlist(next);
    setSelectedPartId(next[0]?.id ?? null);
    setPositions(buildInitialPositions(next));
    setSceneKey((k) => k + 1);
  }

  function addProfile(lib: LibraryProfileItem) {
    // If already have this profile type selected, just select first match
    const existing = partlist.find(
      (p) => p.role === "profile" && p.partNumber === lib.partNumber,
    );
    if (existing) {
      setSelectedPartId(existing.id);
      return;
    }

    const instance = createProfileInstance(lib);
    setPartlist((prev) => [...prev, instance]);
    setPositions((prev) => ({
      ...prev,
      [instance.id]: [...defaultRolePositions.profile] as [
        number,
        number,
        number,
      ],
    }));
    setSelectedPartId(instance.id);
    setActiveProductId(null);
  }

  function updateProfileLength(id: string, lengthMm: number) {
    setPartlist((prev) =>
      prev.map((p) =>
        p.id === id && p.role === "profile"
          ? {
              ...p,
              lengthMm,
              name: {
                de: `Profil ALU 2 · ${lengthMm} mm`,
                en: `ALU profile 2 · ${lengthMm} mm`,
                zh: `铝型材 2 · ${lengthMm} mm`,
              },
            }
          : p,
      ),
    );
  }

  function handlePositionChange(
    id: string,
    position: [number, number, number],
  ) {
    setPositions((prev) => ({ ...prev, [id]: position }));
  }

  function resetTransforms() {
    setPositions(buildInitialPositions(partlist));
    setSceneKey((k) => k + 1);
  }

  const requestHref = `/contact?subject=${encodeURIComponent(
    `G-Force Konfigurator: ${partlist
      .map((p) =>
        p.role === "profile"
          ? `${p.partNumber} (${p.lengthMm ?? p.baseLengthMm} mm)`
          : p.partNumber,
      )
      .join(", ") || "—"}`,
  )}`;

  const lengthValue = Number(
    selectedPart?.lengthMm ?? selectedPart?.baseLengthMm ?? 3000,
  );
  const lengthMin = selectedProfileMeta?.minLengthMm ?? 200;
  const lengthMax = selectedProfileMeta?.maxLengthMm ?? 6000;
  const lengthStep = selectedProfileMeta?.stepMm ?? 10;

  /** Local draft for mm input so typing stays smooth before commit */
  const [lengthDraft, setLengthDraft] = useState(String(lengthValue));
  useEffect(() => {
    setLengthDraft(String(lengthValue));
  }, [selectedPartId, lengthValue]);

  function commitLengthDraft() {
    if (!selectedPart || selectedPart.role !== "profile") return;
    const raw = Number(String(lengthDraft).replace(",", "."));
    if (Number.isNaN(raw)) {
      setLengthDraft(String(lengthValue));
      return;
    }
    const next = clampLength(raw, lengthMin, lengthMax, lengthStep);
    setLengthDraft(String(next));
    updateProfileLength(selectedPart.id, next);
  }

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-anthracite-950 text-anthracite-100">
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
              src="/images/brand/sas-logo.png"
              alt="SAS Sauer Automation Sachsen"
              width={200}
              height={32}
              className="h-7 w-auto sm:h-8"
              priority
            />
            <LanguageSwitcher className="[&_button]:border-white/15 [&_button]:bg-white/5 [&_button]:text-anthracite-100" />
          </div>
        </div>
      </header>

      <div className="relative grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px]">
        {/* Center */}
        <section className="relative flex min-h-[240px] flex-col bg-[radial-gradient(ellipse_at_center,_#252b34_0%,_#12161b_55%,_#0a0c0f_100%)] lg:min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 px-3 py-2">
            <p className="truncate text-xs font-medium text-anthracite-300">
              {selectedPart
                ? selectedPart.name[locale]
                : labels.stageLabel}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-anthracite-500">
              <span className="inline-flex items-center gap-1">
                <RotateCcw className="h-3 w-3" /> {labels.hintRotate}
              </span>
              <span className="inline-flex items-center gap-1">
                <ZoomIn className="h-3 w-3" /> {labels.hintZoom}
              </span>
              <span className="inline-flex items-center gap-1">
                <Move className="h-3 w-3" /> {labels.hintDrag}
              </span>
              <button
                type="button"
                onClick={resetTransforms}
                className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-semibold text-anthracite-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {labels.resetView}
              </button>
            </div>
          </div>

          <div className="relative min-h-0 flex-1">
            <ConfiguratorStage3D
              key={sceneKey}
              className="absolute inset-0 h-full w-full"
              parts={partlist}
              selectedPartId={selectedPartId}
              positions={positions}
              onSelectPart={setSelectedPartId}
              onPositionChange={handlePositionChange}
            />

            {/* Collapsible Parts Library */}
            <div className="absolute bottom-3 left-3 z-20 w-[min(19rem,calc(100%-1.5rem))] sm:w-80">
              <div className="overflow-hidden rounded-xl border border-white/15 bg-anthracite-900/95 shadow-2xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setLibraryOpen((v) => !v)}
                  className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors hover:bg-white/5"
                  aria-expanded={libraryOpen}
                >
                  <span className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-anthracite-200">
                      {labels.libraryTitle}
                    </span>
                  </span>
                  {libraryOpen ? (
                    <ChevronDown className="h-4 w-4 text-anthracite-400" />
                  ) : (
                    <ChevronUp className="h-4 w-4 text-anthracite-400" />
                  )}
                </button>

                <div
                  className={cn(
                    "overflow-hidden border-t border-white/10 transition-all duration-300 ease-out",
                    libraryOpen
                      ? "max-h-[22rem] opacity-100"
                      : "max-h-0 border-t-0 opacity-0",
                  )}
                >
                  <div className="custom-scroll max-h-[22rem] space-y-1 overflow-y-auto p-1.5">
                    {libraryCategories.map((cat) => {
                      const open = expandedCategory === cat.id;
                      return (
                        <div key={cat.id} className="rounded-lg bg-black/20">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedCategory((cur) =>
                                cur === cat.id ? null : cat.id,
                              )
                            }
                            className="flex w-full items-center gap-2 px-2.5 py-2 text-left text-xs font-semibold text-white hover:bg-white/5"
                          >
                            {open ? (
                              <ChevronDown className="h-3.5 w-3.5 text-accent" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5 text-anthracite-400" />
                            )}
                            {cat.name[locale]}
                          </button>

                          {open && cat.id === "profile" ? (
                            <ul className="space-y-0.5 border-t border-white/5 px-1.5 py-1.5">
                              {libraryProfiles.map((item) => (
                                <li key={item.id}>
                                  <button
                                    type="button"
                                    onClick={() => addProfile(item)}
                                    className="w-full rounded-md px-2.5 py-2 text-left transition-colors hover:bg-accent/15"
                                  >
                                    <span className="block text-xs font-semibold text-anthracite-100">
                                      {item.name[locale]}
                                    </span>
                                    <span className="mt-0.5 block font-mono text-[10px] text-accent">
                                      {item.partNumber}
                                    </span>
                                    <span className="mt-0.5 block text-[10px] leading-snug text-anthracite-500">
                                      {item.description[locale]}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : null}

                          {open && cat.id === "g-force" ? (
                            <ul className="space-y-0.5 border-t border-white/5 px-1.5 py-1.5">
                              {catalogProducts.map((p) => {
                                const active = p.id === activeProductId;
                                return (
                                  <li key={p.id}>
                                    <button
                                      type="button"
                                      onClick={() => loadGForceProduct(p)}
                                      className={cn(
                                        "w-full rounded-md px-2.5 py-2 text-left transition-colors",
                                        active
                                          ? "bg-accent/20 ring-1 ring-accent/40"
                                          : "hover:bg-white/5",
                                      )}
                                    >
                                      <span className="block text-xs font-semibold text-white">
                                        {p.name[locale]}
                                      </span>
                                      <span className="mt-0.5 block text-[10px] text-anthracite-400">
                                        {p.series} · {p.capacity}
                                      </span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-white/10 px-3 py-2">
            <Link
              href={requestHref}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-accent px-3 text-[11px] font-semibold text-white hover:bg-accent-hover"
            >
              <Mail className="h-3.5 w-3.5" />
              {labels.requestLabel}
            </Link>
          </div>
        </section>

        {/* Right – Partlist + length controls */}
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
                          <span className="min-w-0">
                            <span className="block truncate text-xs font-semibold text-anthracite-100">
                              {part.name[locale]}
                            </span>
                            <span className="block truncate font-mono text-[10px] text-anthracite-500">
                              {part.partNumber}
                              {part.role === "profile"
                                ? ` · ${part.lengthMm ?? part.baseLengthMm} mm`
                                : ""}
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

          {/* Profile length controls */}
          {selectedPart?.role === "profile" && selectedProfileMeta ? (
            <div className="border-t border-white/10 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-anthracite-500">
                {labels.lengthLabel}
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                {selectedPart.name[locale]}
              </p>
              <p className="mt-0.5 font-mono text-xs text-accent">
                {selectedPart.partNumber}
              </p>

              <div className="mt-3">
                <input
                  type="range"
                  min={lengthMin}
                  max={lengthMax}
                  step={lengthStep}
                  value={lengthValue}
                  onChange={(e) => {
                    const next = clampLength(
                      Number(e.target.value),
                      lengthMin,
                      lengthMax,
                      lengthStep,
                    );
                    setLengthDraft(String(next));
                    updateProfileLength(selectedPart.id, next);
                  }}
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-anthracite-700 accent-amber-500"
                  aria-label={labels.lengthLabel}
                />
                <div className="mt-1 flex justify-between text-[10px] text-anthracite-500">
                  <span>{lengthMin} mm</span>
                  <span className="font-mono font-semibold text-accent">
                    {lengthValue} mm
                  </span>
                  <span>{lengthMax} mm</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const next = clampLength(
                      lengthValue - lengthStep,
                      lengthMin,
                      lengthMax,
                      lengthStep,
                    );
                    setLengthDraft(String(next));
                    updateProfileLength(selectedPart.id, next);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                  aria-label={`-${lengthStep} mm`}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="relative flex-1">
                  <input
                    type="number"
                    min={lengthMin}
                    max={lengthMax}
                    step={lengthStep}
                    value={lengthDraft}
                    onChange={(e) => setLengthDraft(e.target.value)}
                    onBlur={commitLengthDraft}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    className="h-10 w-full rounded-lg border border-white/15 bg-anthracite-950 px-3 pr-10 text-center font-mono text-sm font-semibold text-white outline-none focus:border-accent focus:ring-1 focus:ring-accent/40"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-anthracite-500">
                    mm
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const next = clampLength(
                      lengthValue + lengthStep,
                      lengthMin,
                      lengthMax,
                      lengthStep,
                    );
                    setLengthDraft(String(next));
                    updateProfileLength(selectedPart.id, next);
                  }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10"
                  aria-label={`+${lengthStep} mm`}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removePart(selectedPart.id)}
                className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-anthracite-200 transition-colors hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {labels.deletePart}
              </button>
            </div>
          ) : selectedPart ? (
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
