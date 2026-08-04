import { defineRouting } from "next-intl/routing";

export const locales = ["de", "en", "zh"] as const;
export type AppLocale = (typeof locales)[number];
export const defaultLocale: AppLocale = "de";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});
