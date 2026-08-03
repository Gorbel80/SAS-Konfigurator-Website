import { cn } from "@/lib/utils";
import { Cpu, Package, Wrench } from "lucide-react";

type Variant = "product" | "part" | "category";

interface ProductPlaceholderProps {
  title: string;
  subtitle?: string;
  hint?: string;
  variant?: Variant;
  className?: string;
  dark?: boolean;
}

const icons = {
  product: Cpu,
  part: Package,
  category: Wrench,
};

/**
 * Structured high-quality placeholder until real product photos are added.
 * Keep the same dimensions/API so swapping to next/image is trivial.
 */
export function ProductPlaceholder({
  title,
  subtitle,
  hint,
  variant = "product",
  className,
  dark = false,
}: ProductPlaceholderProps) {
  const Icon = icons[variant];

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl",
        dark
          ? "bg-anthracite-900 text-white"
          : "bg-gradient-to-br from-anthracite-100 via-anthracite-50 to-white text-anthracite-800",
        className
      )}
      data-image-hint={hint}
    >
      {/* Decorative industrial rings */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40",
          dark ? "bg-industrial-grid" : "bg-surface-grid"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border",
          dark ? "border-white/10" : "border-anthracite-200"
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-12 -left-8 h-48 w-48 rounded-full border",
          dark ? "border-white/10" : "border-anthracite-200"
        )}
      />
      <div
        className={cn(
          "relative z-10 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border",
          dark
            ? "border-white/15 bg-white/5 text-accent"
            : "border-anthracite-200 bg-white text-accent shadow-sm"
        )}
      >
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <p
        className={cn(
          "relative z-10 max-w-[90%] text-center text-sm font-semibold tracking-tight sm:text-base",
          dark ? "text-white" : "text-anthracite-900"
        )}
      >
        {title}
      </p>
      {subtitle ? (
        <p
          className={cn(
            "relative z-10 mt-1 max-w-[90%] text-center text-xs sm:text-sm",
            dark ? "text-anthracite-300" : "text-anthracite-500"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
