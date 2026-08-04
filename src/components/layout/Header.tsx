"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ConfiguratorButton } from "@/components/ui/ConfiguratorButton";
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
    { href: "/ueber-uns", label: nav.about },
    { href: "/contact", label: nav.contact },
  ] as const;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
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
        "sticky top-0 z-50 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled
          ? "border-border/90 bg-surface/92 shadow-[0_8px_30px_-12px_rgba(18,22,27,0.18)] backdrop-blur-md"
          : "border-border/60 bg-surface/88 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-[3.75rem] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold tracking-tight text-white shadow-sm transition-transform duration-300 group-hover:scale-[1.03]">
            S×W
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-anthracite-900">
            {brand}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-0.5 rounded-full border border-border/90 bg-anthracite-50/90 p-1 shadow-sm md:flex"
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
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
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

        <div className="hidden items-center gap-2.5 md:flex">
          <LanguageSwitcher align="right" />
          <ConfiguratorButton
            label={configuratorLabel}
            hint={configuratorHint}
            size="header"
          />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher align="right" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-anthracite-800 shadow-sm transition-colors hover:bg-anthracite-50"
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
          "md:hidden overflow-hidden border-t border-border bg-surface transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[80dvh] opacity-100" : "max-h-0 opacity-0 border-t-0",
        )}
      >
        <div className="space-y-2 px-4 py-4">
          {items.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  active
                    ? "bg-anthracite-900 text-white"
                    : "text-anthracite-800 hover:bg-anthracite-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <ConfiguratorButton
            label={configuratorLabel}
            hint={configuratorHint}
            size="mobile"
            onNavigate={() => setOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
