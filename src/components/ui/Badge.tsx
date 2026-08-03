import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Tone = "default" | "accent" | "legacy" | "success" | "muted" | "sky";

const tones: Record<Tone, string> = {
  default: "bg-anthracite-100 text-anthracite-700",
  accent: "bg-accent-muted text-accent",
  legacy: "bg-amber-100 text-amber-800",
  success: "bg-emerald-100 text-emerald-800",
  muted: "bg-anthracite-50 text-anthracite-500 border border-border",
  sky: "bg-sky-100 text-sky-800",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
