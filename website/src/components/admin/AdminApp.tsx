"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import type {
  ImageKey,
  Locale,
  LocaleContent,
  SiteContent,
} from "@/content/types";
import { cn } from "@/lib/utils";
import {
  Building2,
  Check,
  ChevronDown,
  ExternalLink,
  Home,
  Loader2,
  LogOut,
  Mail,
  Save,
  Upload,
} from "lucide-react";

const LOCALES: Locale[] = ["de", "en", "zh"];

const fullLabels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  zh: "中文",
};

const shortLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  zh: "中文",
};

type AdminPage = "home" | "contact" | "companies";

const NAV_ITEMS: {
  id: AdminPage;
  label: string;
  description: string;
  icon: typeof Home;
}[] = [
  {
    id: "home",
    label: "Startseite",
    description: "Hero, Angebot, Texte",
    icon: Home,
  },
  {
    id: "contact",
    label: "Kontakt",
    description: "Formular & Texte",
    icon: Mail,
  },
  {
    id: "companies",
    label: "Firmen",
    description: "WiMa & SAS",
    icon: Building2,
  },
];

const fieldClass =
  "w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-anthracite-900 outline-none transition-colors placeholder:text-anthracite-400 focus:border-accent focus:ring-2 focus:ring-accent/20";

export function AdminApp() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [locale, setLocale] = useState<Locale>("de");
  const [page, setPage] = useState<AdminPage>("home");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<ImageKey | null>(null);

  const load = useCallback(async () => {
    const session = await fetch("/api/admin/session").then((r) => r.json());
    setAuthenticated(Boolean(session.authenticated));
    setAuthChecked(true);
    if (session.authenticated) {
      setContent(
        (await fetch("/api/content").then((r) => r.json())) as SiteContent,
      );
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Falsches Passwort.");
      return;
    }
    setPassword("");
    setAuthenticated(true);
    setContent(
      (await fetch("/api/content").then((r) => r.json())) as SiteContent,
    );
  }

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Speichern fehlgeschlagen.");
        return;
      }
      setContent(data as SiteContent);
      setMessage("Gespeichert.");
    } catch {
      setError("Netzwerkfehler.");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpload(key: ImageKey, file: File) {
    setUploadingKey(key);
    setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload fehlgeschlagen.");
        return;
      }
      setContent((prev) =>
        prev
          ? { ...prev, images: { ...prev.images, [key]: data.url as string } }
          : prev,
      );
      setMessage("Bild aktualisiert – speichern nicht vergessen.");
    } finally {
      setUploadingKey(null);
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-accent" />
          <p className="text-sm text-anthracite-500">Admin wird geladen…</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-anthracite-950 px-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(217,119,6,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px]" />

        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-surface p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)]"
        >
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-anthracite-900 text-xs font-bold tracking-tight text-white shadow-sm">
              S×W
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                Admin
              </p>
              <h1 className="text-lg font-semibold tracking-tight text-anthracite-900">
                Website bearbeiten
              </h1>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-anthracite-500">
            Melden Sie sich an, um Texte und Bilder der öffentlichen Website zu
            pflegen.
          </p>
          <label className="mt-6 block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-anthracite-500">
              Passwort
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-11 ${fieldClass}`}
              placeholder="••••••••"
              required
              autoFocus
            />
          </label>
          {loginError ? (
            <p className="mt-2 text-sm font-medium text-danger">{loginError}</p>
          ) : null}
          <button
            type="submit"
            className="mt-5 h-11 w-full rounded-xl bg-accent text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  if (!content) return null;
  const t = content.locales[locale];

  function setHome(key: keyof LocaleContent["home"], value: string) {
    setContent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        locales: {
          ...prev.locales,
          [locale]: {
            ...prev.locales[locale],
            home: { ...prev.locales[locale].home, [key]: value },
          },
        },
      };
    });
  }

  function setContact(key: keyof LocaleContent["contact"], value: string) {
    setContent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        locales: {
          ...prev.locales,
          [locale]: {
            ...prev.locales[locale],
            contact: { ...prev.locales[locale].contact, [key]: value },
          },
        },
      };
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/90 bg-surface/92 shadow-[0_8px_30px_-12px_rgba(18,22,27,0.12)] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold tracking-tight text-white shadow-sm">
              S×W
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-tight text-anthracite-900">
                Admin
              </p>
              <p className="truncate text-[11px] text-anthracite-500">
                SAS × WiMa · Inhalte pflegen
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <AdminLocaleSwitcher locale={locale} onChange={setLocale} />
            <a
              href={`/${locale}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-xs font-semibold text-anthracite-700 shadow-sm transition-colors hover:border-anthracite-300 hover:bg-anthracite-50"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Vorschau</span>
            </a>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent px-3.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              Speichern
            </button>
            <button
              type="button"
              onClick={() =>
                void fetch("/api/admin/logout", { method: "POST" }).then(() => {
                  setAuthenticated(false);
                  setContent(null);
                })
              }
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-anthracite-600 shadow-sm transition-colors hover:border-anthracite-300 hover:bg-anthracite-50"
              aria-label="Abmelden"
              title="Abmelden"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:gap-7 lg:px-8 lg:py-8">
        <nav className="lg:col-span-3">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = page === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPage(item.id)}
                  className={cn(
                    "flex min-w-[9.5rem] items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all sm:min-w-0",
                    active
                      ? "border-anthracite-900 bg-anthracite-900 text-white shadow-sm"
                      : "border-border bg-surface text-anthracite-800 shadow-sm hover:border-anthracite-300 hover:bg-anthracite-50",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                      active
                        ? "bg-white/10 text-accent"
                        : "bg-anthracite-50 text-anthracite-600",
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold tracking-tight">
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[11px]",
                        active ? "text-anthracite-300" : "text-anthracite-500",
                      )}
                    >
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 hidden rounded-2xl border border-border bg-surface p-4 text-xs leading-relaxed text-anthracite-500 shadow-sm lg:block">
            <p className="font-semibold text-anthracite-800">Hinweis</p>
            <p className="mt-1.5">
              Sprache oben wählt die Text-Variante (DE / EN / ZH). Nach Bild-
              oder Textänderungen auf{" "}
              <span className="font-semibold text-accent">Speichern</span>{" "}
              klicken.
            </p>
          </div>
        </nav>

        <main className="space-y-4 lg:col-span-9">
          {(message || error) && (
            <div
              className={cn(
                "flex items-start gap-2 rounded-2xl border px-4 py-3 text-sm shadow-sm",
                error
                  ? "border-danger/25 bg-red-50 text-danger"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800",
              )}
            >
              {!error ? (
                <Check className="mt-0.5 h-4 w-4 shrink-0" />
              ) : null}
              <span>{error || message}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                Bearbeiten
              </p>
              <h2 className="text-lg font-semibold tracking-tight text-anthracite-900">
                {NAV_ITEMS.find((n) => n.id === page)?.label}
              </h2>
            </div>
            <p className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-anthracite-500 shadow-sm">
              Sprache:{" "}
              <span className="font-semibold text-anthracite-800">
                {fullLabels[locale]}
              </span>
            </p>
          </div>

          {page === "home" && (
            <>
              <Block title="Hero" subtitle="Startseite – Kopfbereich">
                <ImageEditor
                  label="Hero-Bild"
                  src={content.images.hero}
                  uploading={uploadingKey === "hero"}
                  onUpload={(f) => void handleUpload("hero", f)}
                  onUrl={(u) =>
                    setContent((p) =>
                      p ? { ...p, images: { ...p.images, hero: u } } : p,
                    )
                  }
                />
                <Field
                  label="Eyebrow"
                  value={t.home.eyebrow}
                  onChange={(v) => setHome("eyebrow", v)}
                />
                <Field
                  label="Hauptüberschrift (Kernbotschaft)"
                  value={t.home.heroTitle}
                  onChange={(v) => setHome("heroTitle", v)}
                  multiline
                />
                <Field
                  label="Untertitel"
                  value={t.home.heroSubtitle}
                  onChange={(v) => setHome("heroSubtitle", v)}
                  multiline
                />
                <Field
                  label="Kontakt-Button"
                  value={t.home.contactCta}
                  onChange={(v) => setHome("contactCta", v)}
                />
              </Block>
              <Block
                title="Wer wir sind / Angebot"
                subtitle="Texte und Bild für Über-uns-Inhalte auf der Startseite"
              >
                <ImageEditor
                  label="Seitenbild (Messestand / Booth)"
                  src={content.images.side}
                  uploading={uploadingKey === "side"}
                  onUpload={(f) => void handleUpload("side", f)}
                  onUrl={(u) =>
                    setContent((p) =>
                      p ? { ...p, images: { ...p.images, side: u } } : p,
                    )
                  }
                />
                <Field
                  label="Wer wir sind – Titel"
                  value={t.home.whoTitle}
                  onChange={(v) => setHome("whoTitle", v)}
                />
                <Field
                  label="Wer wir sind – Text"
                  value={t.home.whoBody}
                  onChange={(v) => setHome("whoBody", v)}
                  multiline
                  rows={4}
                />
                <Field
                  label="Problem/Lösung – Überschrift"
                  value={t.home.offerTitle}
                  onChange={(v) => setHome("offerTitle", v)}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Label Problem"
                    value={t.home.problemLabel}
                    onChange={(v) => setHome("problemLabel", v)}
                  />
                  <Field
                    label="Label Lösung"
                    value={t.home.solutionLabel}
                    onChange={(v) => setHome("solutionLabel", v)}
                  />
                </div>
                <Field
                  label="Text Problem"
                  value={t.home.offerParts}
                  onChange={(v) => setHome("offerParts", v)}
                  multiline
                />
                <Field
                  label="Text Lösung"
                  value={t.home.offerService}
                  onChange={(v) => setHome("offerService", v)}
                  multiline
                />
              </Block>
            </>
          )}

          {page === "contact" && (
            <Block title="Kontaktseite" subtitle="Texte und Bild">
              <ImageEditor
                label="Kontakt-Bild"
                src={content.images.contact}
                uploading={uploadingKey === "contact"}
                onUpload={(f) => void handleUpload("contact", f)}
                onUrl={(u) =>
                  setContent((p) =>
                    p ? { ...p, images: { ...p.images, contact: u } } : p,
                  )
                }
              />
              {(
                Object.keys(t.contact) as (keyof LocaleContent["contact"])[]
              ).map((key) => (
                <Field
                  key={key}
                  label={key}
                  value={t.contact[key]}
                  onChange={(v) => setContact(key, v)}
                  multiline={
                    key === "intro" ||
                    key === "formHint" ||
                    key === "formMessage"
                  }
                />
              ))}
            </Block>
          )}

          {page === "companies" && (
            <div className="grid gap-4 md:grid-cols-2">
              {(["wima", "sas"] as const).map((ck) => (
                <Block
                  key={ck}
                  title={ck === "wima" ? "WiMa" : "SAS"}
                  subtitle={
                    ck === "wima"
                      ? "WiMa Industrie-Automation"
                      : "SAS Sauer-Automation Sachsen"
                  }
                >
                  {(
                    Object.keys(
                      content.companies[ck],
                    ) as (keyof SiteContent["companies"]["wima"])[]
                  ).map((field) => (
                    <Field
                      key={field}
                      label={field}
                      value={content.companies[ck][field]}
                      onChange={(v) =>
                        setContent((prev) =>
                          prev
                            ? {
                                ...prev,
                                companies: {
                                  ...prev.companies,
                                  [ck]: {
                                    ...prev.companies[ck],
                                    [field]: v,
                                  },
                                },
                              }
                            : prev,
                        )
                      }
                    />
                  ))}
                </Block>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function AdminLocaleSwitcher({
  locale,
  onChange,
}: {
  locale: Locale;
  onChange: (code: Locale) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("touchstart", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("touchstart", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface/95 px-2.5 text-xs font-semibold text-anthracite-800 shadow-sm",
          "transition-all duration-200 ease-out",
          "hover:border-anthracite-300 hover:bg-white hover:shadow",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
          open && "border-anthracite-300 bg-white shadow",
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`Content language: ${fullLabels[locale]}`}
      >
        <Flag locale={locale} />
        <span className="min-w-[1.5rem]">{shortLabels[locale]}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-anthracite-400 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        id={listId}
        role="listbox"
        aria-label="Inhaltssprache wählen"
        className={cn(
          "absolute right-0 top-[calc(100%+0.4rem)] z-50 min-w-[10.5rem] origin-top overflow-hidden rounded-xl border border-border bg-surface shadow-lg",
          "transition-all duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <ul className="p-1">
          {LOCALES.map((code) => {
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onChange(code);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors duration-150",
                    active
                      ? "bg-anthracite-900 text-white"
                      : "text-anthracite-700 hover:bg-anthracite-50",
                  )}
                >
                  <Flag locale={code} />
                  <span className="flex-1 font-medium">{fullLabels[code]}</span>
                  <span
                    className={cn(
                      "text-[11px] font-semibold",
                      active ? "text-anthracite-300" : "text-anthracite-400",
                    )}
                  >
                    {shortLabels[code]}
                  </span>
                  {active ? (
                    <Check className="h-3.5 w-3.5 shrink-0 opacity-90" />
                  ) : (
                    <span className="w-3.5" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  if (locale === "de") {
    return (
      <svg
        viewBox="0 0 24 16"
        className={cn(
          "h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10",
          className,
        )}
        aria-hidden
      >
        <rect width="24" height="5.33" y="0" fill="#000" />
        <rect width="24" height="5.33" y="5.33" fill="#D00" />
        <rect width="24" height="5.34" y="10.66" fill="#FFCE00" />
      </svg>
    );
  }
  if (locale === "en") {
    return (
      <svg
        viewBox="0 0 24 16"
        className={cn(
          "h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10",
          className,
        )}
        aria-hidden
      >
        <rect width="24" height="16" fill="#012169" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#fff" strokeWidth="3" />
        <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.5" />
        <path d="M12 0 V16 M0 8 H24" stroke="#fff" strokeWidth="5" />
        <path d="M12 0 V16 M0 8 H24" stroke="#C8102E" strokeWidth="2.5" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn(
        "h-3.5 w-5 rounded-[2px] shadow-sm ring-1 ring-black/10",
        className,
      )}
      aria-hidden
    >
      <rect width="24" height="16" fill="#DE2910" />
      <polygon
        fill="#FFDE00"
        points="4.2,2.4 4.9,4.5 7.1,4.5 5.35,5.8 6,7.9 4.2,6.55 2.4,7.9 3.05,5.8 1.3,4.5 3.5,4.5"
      />
    </svg>
  );
}

function Block({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-anthracite-50/60 px-4 py-3.5 sm:px-5">
        <h2 className="text-sm font-semibold tracking-tight text-anthracite-900">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 text-xs text-anthracite-500">{subtitle}</p>
        ) : null}
      </div>
      <div className="space-y-3.5 p-4 sm:p-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-anthracite-500">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[5.5rem] py-2.5 ${fieldClass}`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-11 ${fieldClass}`}
        />
      )}
    </label>
  );
}

function ImageEditor({
  label,
  src,
  uploading,
  onUpload,
  onUrl,
}: {
  label: string;
  src: string;
  uploading: boolean;
  onUpload: (f: File) => void;
  onUrl: (u: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-anthracite-50/40">
      <div className="relative aspect-[16/9] bg-anthracite-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-full w-full object-cover" />
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-anthracite-950/40 backdrop-blur-[1px]">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>
        ) : null}
      </div>
      <div className="space-y-2.5 p-3.5 sm:p-4">
        <p className="text-sm font-semibold text-anthracite-900">{label}</p>
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3.5 text-xs font-semibold text-anthracite-800 shadow-sm transition-colors hover:border-anthracite-300 hover:bg-anthracite-50">
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Upload className="h-3.5 w-3.5" />
            )}
            Ersetzen
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
              }}
            />
          </label>
        </div>
        <input
          value={src}
          onChange={(e) => onUrl(e.target.value)}
          className={`h-10 font-mono text-xs ${fieldClass}`}
          spellCheck={false}
        />
      </div>
    </div>
  );
}
