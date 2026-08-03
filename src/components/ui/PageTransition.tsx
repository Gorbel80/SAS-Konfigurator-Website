"use client";

import { usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Soft fade-in when navigating between public pages */
export function PageTransition({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      className={cn(
        "animate-fade-in motion-reduce:animate-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
