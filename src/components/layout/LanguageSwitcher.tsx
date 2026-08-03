"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const labels: Record<AppLocale, string> = {
  de: "DE",
  en: "EN",
  zh: "中文",
};

const fullLabels: Record<AppLocale, string> = {
  de: "Deutsch",
  en: "English",
  zh: "中文",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface/90 p-1 shadow-sm backdrop-blur",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      <span className="pl-2 pr-1 text-anthracite-400" aria-hidden>
        <Globe className="h-3.5 w-3.5" />
      </span>
      {locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            title={fullLabels[code]}
            onClick={() => router.replace(pathname, { locale: code })}
            className={cn(
              "min-w-9 rounded-full px-2.5 py-1.5 text-xs font-semibold transition-all",
              active
                ? "bg-anthracite-900 text-white shadow-sm"
                : "text-anthracite-500 hover:text-anthracite-900 hover:bg-anthracite-50",
            )}
            aria-pressed={active}
          >
            {labels[code]}
          </button>
        );
      })}
    </div>
  );
}
