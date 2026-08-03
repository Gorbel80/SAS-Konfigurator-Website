import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale, LocalizedString } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function t(localized: LocalizedString, locale: Locale): string {
  return localized[locale] ?? localized.de ?? localized.en ?? "";
}

export function formatCapacity(kg: number, locale: Locale): string {
  if (locale === "zh") return `${kg} 公斤`;
  return `${kg} kg`;
}
