"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import type {
  ImageKey,
  Locale,
  LocaleContent,
  SiteContent,
} from "@/content/types";
import {
  Check,
  ExternalLink,
  Loader2,
  LogOut,
  Save,
  Upload,
} from "lucide-react";

const LOCALES: Locale[] = ["de", "en", "zh"];
const LOCALE_LABELS: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  zh: "中文",
};

type AdminPage = "home" | "contact" | "companies";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 text-sm text-anthracite-900 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

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
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-anthracite-950 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-surface p-8 shadow-lg"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            Admin
          </p>
          <h1 className="mt-2 text-xl font-semibold">Website bearbeiten</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-6 h-11 ${fieldClass}`}
            placeholder="Passwort"
            required
            autoFocus
          />
          {loginError ? (
            <p className="mt-2 text-sm text-danger">{loginError}</p>
          ) : null}
          <button
            type="submit"
            className="mt-4 h-11 w-full rounded-xl bg-accent font-semibold text-white"
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
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <p className="text-sm font-semibold">Admin · kurze Website</p>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-full border border-border p-1">
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                    locale === code
                      ? "bg-anthracite-900 text-white"
                      : "text-anthracite-500"
                  }`}
                >
                  {LOCALE_LABELS[code]}
                </button>
              ))}
            </div>
            <a
              href={`/${locale}`}
              target="_blank"
              rel="noreferrer"
              className="hidden h-9 items-center gap-1 rounded-lg border px-2 text-xs sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Vorschau
            </a>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex h-9 items-center gap-1 rounded-lg bg-accent px-3 text-xs font-semibold text-white"
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
              onClick={() => void fetch("/api/admin/logout", { method: "POST" }).then(() => {
                setAuthenticated(false);
                setContent(null);
              })}
              className="h-9 rounded-lg border px-2"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6 lg:grid-cols-12">
        <nav className="flex gap-2 lg:col-span-3 lg:flex-col">
          {(
            [
              ["home", "Startseite"],
              ["contact", "Kontakt"],
              ["companies", "Firmen"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setPage(id)}
              className={`rounded-xl px-3 py-2.5 text-left text-sm font-semibold ${
                page === id
                  ? "bg-anthracite-900 text-white"
                  : "border border-border bg-surface"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <main className="space-y-4 lg:col-span-9">
          {(message || error) && (
            <div
              className={`rounded-xl border px-3 py-2 text-sm ${
                error
                  ? "border-danger/30 bg-red-50 text-danger"
                  : "border-success/30 bg-emerald-50 text-success"
              }`}
            >
              {!error ? <Check className="mr-1 inline h-4 w-4" /> : null}
              {error || message}
            </div>
          )}

          {page === "home" && (
            <>
              <Block title="Hero">
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
                  label="3D-Konfigurator Button"
                  value={t.home.configuratorLabel}
                  onChange={(v) => setHome("configuratorLabel", v)}
                />
                <Field
                  label="3D-Hinweis (z. B. Bald verfügbar)"
                  value={t.home.configuratorHint}
                  onChange={(v) => setHome("configuratorHint", v)}
                />
                <Field
                  label="Kontakt-Button"
                  value={t.home.contactCta}
                  onChange={(v) => setHome("contactCta", v)}
                />
              </Block>
              <Block title="Wer wir sind / Angebot">
                <ImageEditor
                  label="Seitenbild"
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
                <Field
                  label="Label Problem"
                  value={t.home.problemLabel}
                  onChange={(v) => setHome("problemLabel", v)}
                />
                <Field
                  label="Text Problem"
                  value={t.home.offerParts}
                  onChange={(v) => setHome("offerParts", v)}
                  multiline
                />
                <Field
                  label="Label Lösung"
                  value={t.home.solutionLabel}
                  onChange={(v) => setHome("solutionLabel", v)}
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
            <Block title="Kontaktseite">
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
                    key === "intro" || key === "formHint" || key === "formMessage"
                  }
                />
              ))}
            </Block>
          )}

          {page === "companies" && (
            <div className="grid gap-4 md:grid-cols-2">
              {(["wima", "sas"] as const).map((ck) => (
                <Block key={ck} title={ck.toUpperCase()}>
                  {(
                    Object.keys(content.companies[ck]) as (keyof SiteContent["companies"]["wima"])[]
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

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-4 shadow-sm">
      <h2 className="mb-3 border-b border-border pb-2 text-sm font-semibold">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
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
      <span className="mb-1 block font-medium text-anthracite-600">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`py-2 ${fieldClass}`}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-10 ${fieldClass}`}
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
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="relative aspect-[16/9] bg-anthracite-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-2 p-3">
        <p className="text-sm font-semibold">{label}</p>
        <label className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
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
        <input
          value={src}
          onChange={(e) => onUrl(e.target.value)}
          className={`h-9 ${fieldClass}`}
        />
      </div>
    </div>
  );
}
