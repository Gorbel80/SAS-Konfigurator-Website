"use client";

import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, FileBox, Folder, FolderOpen } from "lucide-react";
import type { ReactNode } from "react";

/** Mecabricks-inspired collapsible folder row */
export function FolderRow({
  label,
  open,
  onToggle,
  count,
  depth = 0,
  active,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  count?: number;
  depth?: number;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left text-[12px] font-medium transition-colors",
        active
          ? "bg-white/10 text-white"
          : "text-anthracite-200 hover:bg-white/[0.06] hover:text-white",
      )}
      style={{ paddingLeft: 8 + depth * 12 }}
      aria-expanded={open}
    >
      {open ? (
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-anthracite-400" />
      ) : (
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-anthracite-500" />
      )}
      {open ? (
        <FolderOpen className="h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={1.75} />
      ) : (
        <Folder className="h-3.5 w-3.5 shrink-0 text-amber-500/90" strokeWidth={1.75} />
      )}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {typeof count === "number" ? (
        <span className="shrink-0 rounded bg-white/10 px-1.5 py-px text-[10px] font-semibold tabular-nums text-anthracite-400">
          {count}
        </span>
      ) : null}
    </button>
  );
}

/** Leaf item inside a folder (part / product) */
export function FolderItem({
  label,
  meta,
  active,
  depth = 1,
  onClick,
  trailing,
}: {
  label: string;
  meta?: string;
  active?: boolean;
  depth?: number;
  onClick: () => void;
  trailing?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "group flex items-stretch gap-0.5 rounded-md transition-colors",
        active ? "bg-accent/15 ring-1 ring-inset ring-accent/40" : "hover:bg-white/[0.05]",
      )}
      style={{ marginLeft: 8 + depth * 12, marginRight: 4 }}
    >
      <button
        type="button"
        onClick={onClick}
        className="flex min-w-0 flex-1 items-start gap-1.5 py-1.5 pl-1 pr-1.5 text-left"
      >
        <FileBox
          className={cn(
            "mt-0.5 h-3.5 w-3.5 shrink-0",
            active ? "text-accent" : "text-anthracite-500",
          )}
          strokeWidth={1.75}
        />
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block truncate text-[12px] font-medium leading-snug",
              active ? "text-white" : "text-anthracite-100",
            )}
          >
            {label}
          </span>
          {meta ? (
            <span className="mt-0.5 block truncate font-mono text-[10px] text-anthracite-500">
              {meta}
            </span>
          ) : null}
        </span>
      </button>
      {trailing}
    </div>
  );
}

export function FolderPanel({
  title,
  icon,
  count,
  children,
  className,
}: {
  title: string;
  icon?: ReactNode;
  count?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex min-h-0 flex-col", className)}>
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          {icon}
          <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-anthracite-300">
            {title}
          </p>
        </div>
        {typeof count === "number" ? (
          <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tabular-nums text-anthracite-300">
            {count}
          </span>
        ) : null}
      </div>
      <div className="custom-scroll min-h-0 flex-1 overflow-y-auto py-1.5">
        {children}
      </div>
    </div>
  );
}
