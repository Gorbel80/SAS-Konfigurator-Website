"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Box,
  Camera,
  ChevronDown,
  FileOutput,
  FolderKanban,
  ListTree,
  Settings,
  Table2,
} from "lucide-react";

type Props = {
  titleWord: string;
  backLabel: string;
};

/** Visual-only toolbar control (placeholder for future actions) */
function ToolbarBtn({
  label,
  icon: Icon,
  hasMenu,
  className,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  hasMenu?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex h-7 items-center gap-1 rounded border border-white/10 bg-[#2a3038] px-2 text-[11px] font-medium text-anthracite-100 shadow-sm",
        "transition-colors hover:border-white/20 hover:bg-[#343b45] hover:text-white",
        className,
      )}
      title={label}
    >
      {Icon ? <Icon className="h-3.5 w-3.5 shrink-0 opacity-90" strokeWidth={1.75} /> : null}
      <span className="hidden whitespace-nowrap sm:inline">{label}</span>
      {hasMenu ? (
        <ChevronDown className="h-3 w-3 shrink-0 text-anthracite-400" />
      ) : null}
    </button>
  );
}

function IconOnlyBtn({
  label,
  icon: Icon,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <button
      type="button"
      title={label}
      className="inline-flex h-7 w-7 items-center justify-center rounded border border-white/10 bg-[#2a3038] text-anthracite-200 transition-colors hover:border-white/20 hover:bg-[#343b45] hover:text-white"
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
    </button>
  );
}

/**
 * Industrial configurator chrome matching the G-FORCE Konfigurator reference header.
 * Toolbar actions are visual placeholders for now.
 */
export function ConfiguratorHeader({ titleWord, backLabel }: Props) {
  return (
    <header className="z-30 shrink-0 border-b border-black/40 bg-[#0d0f12]">
      {/* Main brand bar */}
      <div className="relative flex h-12 items-center justify-between gap-3 px-2.5 sm:px-3 lg:px-4">
        {/* Left: KITO + ERIKKILA */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-anthracite-300 transition-colors hover:bg-white/10 hover:text-white"
            title={backLabel}
            aria-label={backLabel}
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="min-w-0">
            <Image
              src="/images/brand/kito-erikkila.png"
              alt="KITO ERIKKILA – Certified engineering partner"
              width={210}
              height={22}
              className="h-5 w-auto max-w-[min(210px,42vw)] object-contain object-left sm:h-[22px]"
              priority
            />
            <p className="mt-0.5 hidden text-[9px] font-medium tracking-wide text-[#e11d48] sm:block">
              Certified engineering partner
            </p>
          </div>
        </div>

        {/* Center title */}
        <div className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 md:block">
          <h1 className="text-[1.15rem] font-semibold tracking-tight sm:text-[1.25rem]">
            <span className="text-[#f5c518]">G-FORCE</span>{" "}
            <span className="text-white">{titleWord}</span>
          </h1>
        </div>

        {/* Right: SAS + language */}
        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <Image
            src="/images/brand/sas-logo.png"
            alt="SAS Sauer Automation Sachsen"
            width={200}
            height={40}
            className="h-8 w-auto max-w-[min(200px,40vw)] object-contain object-right sm:h-9"
            priority
          />
          <LanguageSwitcher className="[&_button]:border-white/15 [&_button]:bg-white/5 [&_button]:text-anthracite-100" />
        </div>
      </div>

      {/* Mobile title */}
      <div className="border-t border-white/5 px-3 py-1 text-center md:hidden">
        <h1 className="text-sm font-semibold tracking-tight">
          <span className="text-[#f5c518]">G-FORCE</span>{" "}
          <span className="text-white">{titleWord}</span>
        </h1>
      </div>

      {/* Toolbar row – visual controls from reference */}
      <div className="flex h-10 items-center gap-1.5 overflow-x-auto border-t border-white/5 bg-[#12151a] px-2.5 custom-scroll sm:px-3 lg:px-4">
        <ToolbarBtn label="Projects" icon={FolderKanban} hasMenu />
        <div className="mx-0.5 hidden h-5 w-px bg-white/10 sm:block" />
        <IconOnlyBtn label="New" icon={Box} />
        <IconOnlyBtn label="Open" icon={FolderKanban} />
        <IconOnlyBtn label="Save" icon={FileOutput} />
        <div className="mx-0.5 hidden h-5 w-px bg-white/10 sm:block" />
        <ToolbarBtn label="Quote" icon={Table2} hasMenu />
        <ToolbarBtn
          label="Output-CAD Formats"
          icon={FileOutput}
          className="hidden lg:inline-flex"
        />
        <ToolbarBtn
          label="CAD"
          icon={FileOutput}
          className="lg:hidden"
        />
        <ToolbarBtn label="BOM" icon={ListTree} hasMenu />
        <ToolbarBtn label="Settings" icon={Settings} hasMenu />
        <IconOnlyBtn label="Camera" icon={Camera} />

        <div className="ml-auto hidden text-[10px] font-medium uppercase tracking-wider text-anthracite-500 sm:block">
          Industrial 3D
        </div>
      </div>
    </header>
  );
}
