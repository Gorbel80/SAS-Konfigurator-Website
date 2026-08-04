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
  sloganPrimary: string;
  sloganSecondary: string;
};

export function Header({
  nav,
  brand,
  sloganPrimary,
  sloganSecondary,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /** Primary nav – no Über uns; Kontakt is far right */
  const items = [
    { href: "/", label: nav.home, match: "exact" as const },
    { href: "/g-force", label: nav.gforce, match: "prefix" as const },
    { href: "/service", label: nav.service, match: "prefix" as const },
  ];

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

  const contactActive = pathname.startsWith("/contact");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[box-shadow,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        scrolled ? "shadow-[0_10px_40px_-16px_rgba(6,16,28,0.4)]" : "",
      )}
    >
      {/* Top brand bar — slogans + languages */}
      <div className="border-b border-white/10 bg-anthracite-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-1.5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex min-w-0 shrink-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-[11px] font-bold tracking-tight text-white shadow-sm transition-transform duration-300 group-hover:scale-[1.03]">
              S×W
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block truncate text-sm font-semibold tracking-tight text-white">
                {brand}
              </span>
              <span className="block truncate text-[10px] font-medium uppercase tracking-[0.12em] text-anthracite-400">
                G-Force® Service
              </span>
            </span>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-center gap-6 px-4 lg:flex xl:gap-10">
            <p className="max-w-[18rem] text-center text-[11px] font-medium leading-snug text-anthracite-200 xl:max-w-xs xl:text-xs">
              {sloganPrimary}
            </p>
            <span className="h-8 w-px shrink-0 bg-white/15" aria-hidden />
            <p className="max-w-[18rem] text-center text-[11px] font-medium leading-snug text-anthracite-300 xl:max-w-xs xl:text-xs">
              {sloganSecondary}
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher align="right" variant="dark" />
            <div className="hidden md:block">
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div
        className={cn(
          "border-b backdrop-blur-md transition-colors duration-300",
          scrolled
            ? "border-border/90 bg-surface/95"
            : "border-border/70 bg-surface/92",
        )}
      >
        <div className="mx-auto hidden max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:px-6 md:flex lg:px-8">
          <nav
            className="flex flex-wrap items-center gap-0.5"
            aria-label="Hauptnavigation"
          >
            {items.map((item) => {
              const active =
                item.match === "exact"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-anthracite-900 text-white shadow-sm"
                      : "text-anthracite-600 hover:bg-anthracite-50 hover:text-anthracite-900",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/contact"
            className={cn(
              "inline-flex h-8 items-center rounded-full px-3.5 text-xs font-semibold transition-colors",
              contactActive
                ? "bg-accent text-white"
                : "bg-anthracite-900 text-white hover:bg-anthracite-800",
            )}
          >
            {nav.contact}
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden border-b border-border bg-surface transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[85dvh] opacity-100" : "max-h-0 opacity-0 border-b-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          <p className="mb-3 rounded-lg border border-border bg-anthracite-50 px-3 py-2 text-xs leading-relaxed text-anthracite-600">
            {sloganPrimary}
          </p>
          {items.map((item) => {
            const active =
              item.match === "exact"
                ? pathname === item.href
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
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(
              "block rounded-xl px-4 py-3 text-base font-semibold transition-colors",
              contactActive
                ? "bg-accent text-white"
                : "bg-anthracite-900 text-white hover:bg-anthracite-800",
            )}
          >
            {nav.contact}
          </Link>
        </div>
      </div>
    </header>
  );
}
