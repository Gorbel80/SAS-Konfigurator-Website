import { cn } from "@/lib/utils";
import { Box } from "lucide-react";

type Size = "hero" | "header" | "mobile";

const sizes: Record<Size, string> = {
  hero: "h-[3.75rem] min-w-[17rem] gap-3 rounded-2xl px-7 text-[0.95rem] sm:h-16 sm:min-w-[19rem] sm:px-8 sm:text-base",
  header: "h-11 gap-2 rounded-xl px-4 text-sm",
  mobile: "h-12 w-full gap-2 rounded-xl px-4 text-sm",
};

/**
 * Visual placeholder for the future 3D configurator.
 * Disabled for now — refined but clearly primary.
 */
export function ConfiguratorButton({
  label,
  hint,
  size = "hero",
  className,
}: {
  label: string;
  hint: string;
  size?: Size;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled
      title={hint}
      aria-disabled="true"
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden",
        "font-semibold tracking-wide text-white",
        "bg-gradient-to-b from-[#f0a04b] via-accent to-[#b45309]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.25)_inset,0_10px_28px_-6px_rgba(180,83,9,0.55)]",
        "ring-1 ring-white/15",
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:brightness-[1.04] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.3)_inset,0_14px_32px_-6px_rgba(180,83,9,0.6)]",
        "disabled:cursor-not-allowed",
        sizes[size],
        className,
      )}
    >
      {/* Soft top sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-80"
      />
      <Box
        className={cn(
          "relative shrink-0 opacity-95",
          size === "hero" ? "h-5 w-5" : "h-4 w-4",
        )}
        strokeWidth={2.25}
      />
      <span className="relative">{label}</span>
      <span
        className={cn(
          "relative rounded-md border border-white/20 bg-anthracite-950/25 font-semibold uppercase tracking-[0.12em] text-white/95 backdrop-blur-[2px]",
          size === "hero"
            ? "px-2 py-1 text-[10px] sm:text-[11px]"
            : "px-1.5 py-0.5 text-[9px]",
        )}
      >
        {hint}
      </span>
    </button>
  );
}
