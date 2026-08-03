import { cn } from "@/lib/utils";
import { Box } from "lucide-react";

type Size = "hero" | "header" | "mobile";

const sizes: Record<
  Size,
  { btn: string; icon: string; badge: string }
> = {
  hero: {
    btn: "h-11 gap-2 rounded-full px-4 pl-3.5 text-sm sm:h-12 sm:px-5 sm:text-[0.9375rem]",
    icon: "h-4 w-4",
    badge: "px-2 py-0.5 text-[9px] tracking-[0.1em]",
  },
  header: {
    btn: "h-9 gap-1.5 rounded-full px-3 pl-2.5 text-xs sm:text-[13px]",
    icon: "h-3.5 w-3.5",
    badge: "px-1.5 py-px text-[8px] tracking-[0.08em]",
  },
  mobile: {
    btn: "h-11 w-full gap-2 rounded-full px-4 text-sm",
    icon: "h-4 w-4",
    badge: "px-2 py-0.5 text-[9px] tracking-[0.1em]",
  },
};

/**
 * Placeholder for the future 3D configurator — elegant, visible, professional.
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
  const s = sizes[size];

  return (
    <button
      type="button"
      disabled
      title={hint}
      aria-disabled="true"
      className={cn(
        "group relative inline-flex items-center justify-center",
        "font-semibold text-white",
        "bg-accent",
        "shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_4px_14px_-4px_rgba(180,83,9,0.45)]",
        "ring-1 ring-accent/30",
        "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "hover:bg-accent-hover hover:shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_6px_18px_-4px_rgba(180,83,9,0.5)]",
        "disabled:cursor-not-allowed",
        s.btn,
        className,
      )}
    >
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-full bg-white/15",
          size === "header" ? "h-6 w-6" : "h-7 w-7",
        )}
      >
        <Box className={cn(s.icon, "opacity-95")} strokeWidth={2} />
      </span>
      <span className="relative tracking-tight">{label}</span>
      <span
        className={cn(
          "relative rounded-full bg-white/15 font-semibold uppercase text-white/90",
          s.badge,
        )}
      >
        {hint}
      </span>
    </button>
  );
}
