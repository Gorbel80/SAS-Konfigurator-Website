"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const fullLabels: Record<AppLocale, string> = {
  de: "Deutsch",
  en: "English",
  zh: "中文",
};

const shortLabels: Record<AppLocale, string> = {
  de: "DE",
  en: "EN",
  zh: "中文",
};

function Flag({ locale, className }: { locale: AppLocale; className?: string }) {
  if (locale === "de") {
    return (
      <svg
        viewBox="0 0 24 16"
        className={cn("h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10", className)}
        aria-hidden
      >
        <rect width="24" height="5.33" y="0" fill="#000" />
        <rect width="24" height="5.33" y="5.33" fill="#D00" />
        <rect width="24" height="5.34" y="10.66" fill="#FFCE00" />
      </svg>
    );
  }
  if (locale === "en") {
    // Simplified UK flag for compact control
    return (
      <svg
        viewBox="0 0 24 16"
        className={cn("h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10", className)}
        aria-hidden
      >
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5" />
        <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.5" />
      </svg>
    );
  }
  // China
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn("h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10", className)}
      aria-hidden
    >
      <rect width="24" height="16" fill="#DE2910" />
      <polygon
        fill="#FFDE00"
        points="4.2,2.4 4.9,4.5 7.1,4.5 5.35,5.8 6,7.9 4.2,6.55 2.4,7.9 3.05,5.8 1.3,4.5 3.5,4.5"
      />
    </svg>
  );
}

export function LanguageSwitcher({
  className,
  align = "right",
}: {
  className?: string;
  align?: "left" | "right";
}) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(code: AppLocale) {
    setOpen(false);
    if (code === locale) return;
    router.replace(pathname, { locale: code });
  }

  return (
    <div ref={rootRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface/95 px-2.5 text-xs font-semibold text-anthracite-800 shadow-sm backdrop-blur",
          "transition-all duration-200 ease-out",
          "hover:border-anthracite-300 hover:bg-white hover:shadow",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          open && "border-anthracite-300 bg-white shadow",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Language: ${fullLabels[locale]}`}
      >
        <Flag locale={locale} />
        <span className="min-w-[1.5rem]">{shortLabels[locale]}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-anthracite-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={listId}
        role="listbox"
        aria-label="Select language"
        className={cn(
          "absolute top-[calc(100%+0.4rem)] z-50 min-w-[10.5rem] origin-top overflow-hidden rounded-xl border border-border bg-surface shadow-lg",
          "transition-all duration-200 ease-out",
          align === "right" ? "right-0" : "left-0",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <ul className="p-1">
          {locales.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => select(code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors duration-150",
                    active
                      ? "bg-anthracite-900 text-white"
                      : "text-anthracite-700 hover:bg-anthracite-50",
                  )}
                >
                  <Flag locale={code} />
                  <span className="flex-1 font-medium">{fullLabels[code]}</span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      active ? "text-anthracite-300" : "text-anthracite-400",
                    )}
                  >
                    {shortLabels[code]}
                  </span>
                  {active ? (
                    <Check className="h-3.5 w-3.5 shrink-0 opacity-90" />
                  ) : (
                    <span className="w-3.5" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
