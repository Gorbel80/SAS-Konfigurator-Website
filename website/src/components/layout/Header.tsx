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
};

/**
 * Clean single-bar navigation – WiMa / Gorbel marketing style.
 */
export function Header({ nav, brand }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const primary = [
    { href: "/", label: nav.home, match: "exact" as const },
    { href: "/g-force", label: nav.gforce, match: "prefix" as const },
    { href: "/service", label: nav.service, match: "prefix" as const },
    { href: "/contact", label: nav.parts, match: "prefix" as const, id: "parts" },
    { href: "/anwendungen", label: nav.applications, match: "prefix" as const },
  ];

  const secondary = [
    { href: "/downloads", label: nav.downloads, match: "prefix" as const },
    { href: "/ueber-uns", label: nav.about, match: "prefix" as const },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
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

  const isActive = (href: string, match: "exact" | "prefix") =>
    match === "exact" ? pathname === href : pathname.startsWith(href);

  const linkClass = (active: boolean) =>
    cn(
      "rounded-full px-2.5 py-1 text-[12.5px] font-semibold tracking-wide transition-colors duration-200 lg:px-3",
      active
        ? "bg-anthracite-800 text-white shadow-sm"
        : "text-anthracite-700 hover:bg-anthracite-100 hover:text-anthracite-950",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[box-shadow,background-color] duration-300",
        scrolled
          ? "border-border/90 bg-surface/95 shadow-[0_8px_28px_-14px_rgba(6,16,28,0.35)] backdrop-blur-md"
          : "border-border/70 bg-surface/95 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-1.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-0 shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-[11px] font-bold tracking-tight text-white shadow-sm transition-transform duration-300 group-hover:scale-[1.03]">
            WiMa
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-semibold tracking-tight text-anthracite-900">
              {brand}
            </span>
            <span className="block truncate text-[10px] font-medium uppercase tracking-[0.12em] text-anthracite-500">
              G-Force® Service
            </span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center gap-0.5 lg:flex"
          aria-label="Hauptnavigation"
        >
          {primary.map((item) => (
            <Link
              key={item.id ?? item.href}
              href={item.href}
              className={linkClass(isActive(item.href, item.match))}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {secondary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass(isActive(item.href, item.match))}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-2 border-l border-border pl-2">
            <LanguageSwitcher align="right" variant="light" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <LanguageSwitcher align="right" variant="light" />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-anthracite-800 transition-colors hover:bg-anthracite-50"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-surface transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[85dvh] opacity-100" : "max-h-0 opacity-0 border-t-0",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {[...primary, ...secondary].map((item) => {
            const active = isActive(item.href, item.match);
            return (
              <Link
                key={"id" in item && item.id ? item.id : item.href}
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
        </div>
      </div>
    </header>
  );
}
