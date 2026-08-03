"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { LocaleContent } from "@/content/types";

type Props = {
  nav: LocaleContent["nav"];
  brand: string;
};

export function Header({ nav, brand }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = [
    { href: "/", label: nav.home },
    { href: "/about", label: nav.about },
    { href: "/service", label: nav.service },
    { href: "/contact", label: nav.contact },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold tracking-tight text-white">
            S×W
          </span>
          <span className="truncate text-sm font-semibold tracking-tight text-anthracite-900 sm:text-base">
            {brand}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-anthracite-100 text-anthracite-900"
                    : "text-anthracite-500 hover:text-anthracite-900 hover:bg-anthracite-50",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex h-10 items-center rounded-xl bg-accent px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            {nav.cta}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-anthracite-800 hover:bg-anthracite-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-accent px-4 text-sm font-semibold text-white"
            >
              {nav.cta}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
