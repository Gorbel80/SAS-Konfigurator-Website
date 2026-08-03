"use client";

import { Link } from "@/i18n/navigation";
import type { LocaleContent } from "@/content/types";
import { useEffect, useState } from "react";

const STORAGE_KEY = "sas_cookie_consent";

export type CookieChoice = "all" | "essential";

type Props = {
  cookies: LocaleContent["cookies"];
};

export function CookieBanner({ cookies }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: CookieChoice) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ choice: value, at: new Date().toISOString() }),
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
    // Dispatch for any future analytics hooks
    window.dispatchEvent(
      new CustomEvent("sas-cookie-consent", { detail: { choice: value } }),
    );
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-4 shadow-[0_16px_50px_-12px_rgba(18,22,27,0.35)] sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2
              id="cookie-title"
              className="text-sm font-semibold tracking-tight text-anthracite-900 sm:text-base"
            >
              {cookies.title}
            </h2>
            <p
              id="cookie-desc"
              className="mt-1.5 text-xs leading-relaxed text-anthracite-500 sm:text-sm"
            >
              {cookies.body}{" "}
              <Link
                href="/datenschutz"
                className="font-medium text-accent underline-offset-2 hover:underline"
              >
                {cookies.privacyLink}
              </Link>
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => choose("essential")}
              className="inline-flex h-10 items-center justify-center rounded-xl border border-border bg-background px-4 text-sm font-semibold text-anthracite-800 transition-colors hover:bg-anthracite-50"
            >
              {cookies.essentialOnly}
            </button>
            <button
              type="button"
              onClick={() => choose("all")}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-anthracite-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-anthracite-800"
            >
              {cookies.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
