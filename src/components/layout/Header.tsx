"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { LocaleContent } from "@/content/types";

type Props = {
  nav: LocaleContent["nav"];
  brand: string;
  configuratorLabel: string;
  configuratorHint: string;
};

export function Header({
  nav,
  brand,
  configuratorLabel,
  configuratorHint,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = [
    { href: "/", label: nav.home },
    { href: "/contact", label: nav.contact },
  ] as const;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-200",
        scrolled
          ? "border-border bg-surface/95 shadow-sm backdrop-blur-md"
          : "border-border/70 bg-surface/90 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold tracking-tight text-white">
            S×W
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-anthracite-900">
            {brand}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border bg-anthracite-50/80 p-1 md:flex"
          aria-label="Hauptnavigation"
        >
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-anthracite-900 text-white shadow-sm"
                    : "text-anthracite-600 hover:bg-white hover:text-anthracite-900",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher align="right" />
          <button
            type="button"
            disabled
            title={configuratorHint}
            className="inline-flex h-11 items-center rounded-xl bg-accent px-4 text-sm font-bold text-white shadow-[0_4px_0_0_#9a3412] ring-2 ring-accent/25"
          >
            {configuratorLabel}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher align="right" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-anthracite-800"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden overflow-hidden border-t border-border bg-surface transition-[max-height,opacity] duration-300",
          open ? "max-h-[80dvh] opacity-100" : "max-h-0 opacity-0 border-t-0",
        )}
      >
        <div className="space-y-2 px-4 py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-base font-medium text-anthracite-800 hover:bg-anthracite-50"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            disabled
            className="flex h-12 w-full items-center justify-center rounded-xl bg-accent text-sm font-bold text-white"
          >
            {configuratorLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
