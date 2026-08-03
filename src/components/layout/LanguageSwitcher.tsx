"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { locales, type AppLocale } from "@/i18n/routing";

const labels: Record<AppLocale, string> = {
  de: "DE",
  en: "EN",
  zh: "中文",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-surface p-0.5",
        className
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
            locale === l
              ? "bg-anthracite-900 text-white"
              : "text-anthracite-500 hover:text-anthracite-800"
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
