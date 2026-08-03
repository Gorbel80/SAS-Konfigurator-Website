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

type AdminPage =
  | "home"
  | "about"
  | "service"
  | "contact"
  | "nav"
  | "companies";

const PAGES: { id: AdminPage; label: string; hint: string }[] = [
  { id: "home", label: "Startseite", hint: "Hero, Vorteile, Story, CTA" },
  { id: "about", label: "Über uns", hint: "Story, Partner, Fakten" },
  { id: "service", label: "Service", hint: "Leistungen, Ablauf, Geräte" },
  { id: "contact", label: "Kontakt", hint: "Standorte & Formulartexte" },
  { id: "nav", label: "Navigation & SEO", hint: "Menü, Meta, Footer" },
  { id: "companies", label: "Firmen & Standorte", hint: "Adressen, Telefon, E-Mail" },
];

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 text-sm text-anthracite-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

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
      const data = (await fetch("/api/content").then((r) =>
        r.json(),
      )) as SiteContent;
      setContent(data);
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
    const data = (await fetch("/api/content").then((r) =>
      r.json(),
    )) as SiteContent;
    setContent(data);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setContent(null);
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
      setMessage(
        "Gespeichert. Öffentliche Seite neu laden, um Änderungen zu sehen.",
      );
    } catch {
      setError("Netzwerkfehler beim Speichern.");
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
      setMessage("Bild aktualisiert – bitte speichern.");
    } catch {
      setError("Upload fehlgeschlagen.");
    } finally {
      setUploadingKey(null);
    }
  }

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-industrial-grid px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-anthracite-950 via-anthracite-900/95 to-anthracite-800/90" />
        <form
          onSubmit={handleLogin}
          className="relative w-full max-w-md rounded-2xl border border-white/10 bg-surface p-8 shadow-lg"
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold text-white">
              S×W
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Admin
              </p>
              <p className="text-sm font-semibold text-anthracite-900">
                SAS × WiMa · G-Force Service
              </p>
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-anthracite-900">
            Website bearbeiten
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
            Bearbeiten Sie die Seiten so, wie sie auf der Website erscheinen –
            Texte und Bilder zusammen.
          </p>
          <label className="mt-6 block text-sm">
            <span className="mb-1.5 block font-medium text-anthracite-700">
              Passwort
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-11 ${fieldClass}`}
              autoFocus
              required
            />
          </label>
          {loginError ? (
            <p className="mt-2 text-sm text-danger">{loginError}</p>
          ) : null}
          <button
            type="submit"
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white hover:bg-accent-hover"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  const t = content.locales[locale];

  function setLocaleField(
    section: keyof LocaleContent,
    key: string,
    value: string,
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        locales: {
          ...prev.locales,
          [locale]: {
            ...prev.locales[locale],
            [section]: {
              ...(prev.locales[locale][section] as object),
              [key]: value,
            },
          },
        },
      };
    });
  }

  function setStringList(
    section: "home" | "about" | "service",
    key: string,
    index: number,
    value: string,
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      const sectionData = prev.locales[locale][section] as Record<
        string,
        unknown
      >;
      const list = [...(sectionData[key] as string[])];
      list[index] = value;
      return {
        ...prev,
        locales: {
          ...prev.locales,
          [locale]: {
            ...prev.locales[locale],
            [section]: { ...sectionData, [key]: list },
          },
        },
      };
    });
  }

  function setObjectList(
    section: "home" | "about" | "service",
    key: string,
    index: number,
    field: "title" | "body",
    value: string,
  ) {
    setContent((prev) => {
      if (!prev) return prev;
      const sectionData = prev.locales[locale][section] as Record<
        string,
        unknown
      >;
      const list = [
        ...(sectionData[key] as { title: string; body: string }[]),
      ];
      list[index] = { ...list[index], [field]: value };
      return {
        ...prev,
        locales: {
          ...prev.locales,
          [locale]: {
            ...prev.locales[locale],
            [section]: { ...sectionData, [key]: list },
          },
        },
      };
    });
  }

  function setImageUrl(key: ImageKey, url: string) {
    setContent((prev) =>
      prev ? { ...prev, images: { ...prev.images, [key]: url } } : prev,
    );
  }

  const previewPath =
    page === "home"
      ? `/${locale}`
      : page === "about"
        ? `/${locale}/about`
        : page === "service"
          ? `/${locale}/service`
          : page === "contact"
            ? `/${locale}/contact`
            : `/${locale}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold text-white">
              S×W
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-anthracite-900">
                Website bearbeiten
              </p>
              <p className="hidden text-xs text-anthracite-400 sm:block">
                Wie auf der öffentlichen Seite
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="hidden items-center gap-1 rounded-full border border-border bg-anthracite-50 p-1 sm:flex">
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`min-w-9 rounded-full px-2.5 py-1.5 text-xs font-semibold ${
                    locale === code
                      ? "bg-anthracite-900 text-white"
                      : "text-anthracite-500 hover:text-anthracite-900"
                  }`}
                >
                  {LOCALE_LABELS[code]}
                </button>
              ))}
            </div>
            <a
              href={previewPath}
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-anthracite-700 hover:bg-anthracite-50 sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Vorschau
            </a>
            <button
              type="button"
              onClick={() => void handleSave()}
              disabled={saving}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Speichern
            </button>
            <button
              type="button"
              onClick={() => void handleLogout()}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-anthracite-700 hover:bg-anthracite-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-12 lg:px-8">
        <aside className="lg:col-span-3">
          <div className="sticky top-20 space-y-3">
            <div className="rounded-2xl border border-border bg-surface p-2 shadow-sm sm:hidden">
              <p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wide text-anthracite-400">
                Sprache
              </p>
              <div className="flex gap-1">
                {LOCALES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setLocale(code)}
                    className={`flex-1 rounded-lg py-2 text-xs font-semibold ${
                      locale === code
                        ? "bg-accent text-white"
                        : "bg-anthracite-50 text-anthracite-600"
                    }`}
                  >
                    {LOCALE_LABELS[code]}
                  </button>
                ))}
              </div>
            </div>

            <nav className="rounded-2xl border border-border bg-surface p-2 shadow-sm">
              <p className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-anthracite-400">
                Seiten (wie Website)
              </p>
              {PAGES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPage(p.id)}
                  className={`mb-0.5 w-full rounded-xl px-3 py-2.5 text-left transition-colors ${
                    page === p.id
                      ? "bg-anthracite-900 text-white"
                      : "text-anthracite-700 hover:bg-anthracite-50"
                  }`}
                >
                  <span className="block text-sm font-semibold">{p.label}</span>
                  <span
                    className={`block text-xs ${
                      page === p.id ? "text-anthracite-300" : "text-anthracite-400"
                    }`}
                  >
                    {p.hint}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 lg:col-span-9">
          {(message || error) && (
            <div
              className={`mb-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                error
                  ? "border-danger/30 bg-red-50 text-danger"
                  : "border-success/30 bg-emerald-50 text-success"
              }`}
            >
              {!error ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : null}
              <span>{error || message}</span>
            </div>
          )}

          {page === "home" && (
            <PageShell
              title="Startseite"
              subtitle="Reihenfolge wie auf der Live-Website: Hero → Vorteile → Story → Abschluss-CTA"
            >
              <Block title="1. Hero" tone="dark">
                <ImageEditor
                  label="Hintergrundbild Hero"
                  hint="Erscheint hinter dem Haupttext der Startseite"
                  src={content.images.hero}
                  uploading={uploadingKey === "hero"}
                  onUpload={(f) => void handleUpload("hero", f)}
                  onUrlChange={(url) => setImageUrl("hero", url)}
                />
                <div className="mt-4 grid gap-3">
                  <Field
                    label="Eyebrow (kleine Zeile oben)"
                    value={t.home.eyebrow}
                    onChange={(v) => setLocaleField("home", "eyebrow", v)}
                  />
                  <Field
                    label="Hauptüberschrift"
                    value={t.home.heroTitle}
                    onChange={(v) => setLocaleField("home", "heroTitle", v)}
                    multiline
                  />
                  <Field
                    label="Untertitel / Einleitung"
                    value={t.home.heroSubtitle}
                    onChange={(v) => setLocaleField("home", "heroSubtitle", v)}
                    multiline
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Button primär"
                      value={t.home.heroCtaPrimary}
                      onChange={(v) =>
                        setLocaleField("home", "heroCtaPrimary", v)
                      }
                    />
                    <Field
                      label="Button sekundär"
                      value={t.home.heroCtaSecondary}
                      onChange={(v) =>
                        setLocaleField("home", "heroCtaSecondary", v)
                      }
                    />
                  </div>
                  <Field
                    label="Vertrauensbox – Überschrift"
                    value={t.home.trustLabel}
                    onChange={(v) => setLocaleField("home", "trustLabel", v)}
                  />
                  <ListFields
                    label="Vertrauensbox – Punkte"
                    items={t.home.trustItems}
                    onChange={(i, v) =>
                      setStringList("home", "trustItems", i, v)
                    }
                  />
                </div>
              </Block>

              <Block title="2. Vorteile (drei Karten)">
                <Field
                  label="Bereichs-Überschrift"
                  value={t.home.valueTitle}
                  onChange={(v) => setLocaleField("home", "valueTitle", v)}
                />
                <Field
                  label="Bereichs-Untertitel"
                  value={t.home.valueSubtitle}
                  onChange={(v) => setLocaleField("home", "valueSubtitle", v)}
                  multiline
                />
                <ObjectListFields
                  label="Vorteils-Karten"
                  items={t.home.values}
                  onChange={(i, field, v) =>
                    setObjectList("home", "values", i, field, v)
                  }
                />
              </Block>

              <Block title="3. Story / Partner">
                <div className="grid gap-4 lg:grid-cols-2">
                  <ImageEditor
                    label="Story-Bild (links)"
                    hint="Neben dem Story-Text auf der Startseite"
                    src={content.images.warehouse}
                    uploading={uploadingKey === "warehouse"}
                    onUpload={(f) => void handleUpload("warehouse", f)}
                    onUrlChange={(url) => setImageUrl("warehouse", url)}
                  />
                  <div className="grid gap-3 content-start">
                    <Field
                      label="Story-Überschrift"
                      value={t.home.storyTitle}
                      onChange={(v) => setLocaleField("home", "storyTitle", v)}
                    />
                    <Field
                      label="Story-Text"
                      value={t.home.storyBody}
                      onChange={(v) => setLocaleField("home", "storyBody", v)}
                      multiline
                      rows={5}
                    />
                  </div>
                </div>
              </Block>

              <Block title="4. Abschluss-CTA">
                <Field
                  label="CTA-Überschrift"
                  value={t.home.ctaTitle}
                  onChange={(v) => setLocaleField("home", "ctaTitle", v)}
                />
                <Field
                  label="CTA-Text"
                  value={t.home.ctaBody}
                  onChange={(v) => setLocaleField("home", "ctaBody", v)}
                  multiline
                />
                <Field
                  label="CTA-Button"
                  value={t.home.ctaButton}
                  onChange={(v) => setLocaleField("home", "ctaButton", v)}
                />
              </Block>
            </PageShell>
          )}

          {page === "about" && (
            <PageShell
              title="Über uns"
              subtitle="Reihenfolge: Kopf → Bild + Story → Partner-Karten → Fakten"
            >
              <Block title="1. Seitenkopf">
                <Field
                  label="Eyebrow"
                  value={t.about.eyebrow}
                  onChange={(v) => setLocaleField("about", "eyebrow", v)}
                />
                <Field
                  label="Überschrift"
                  value={t.about.title}
                  onChange={(v) => setLocaleField("about", "title", v)}
                />
                <Field
                  label="Einleitung"
                  value={t.about.intro}
                  onChange={(v) => setLocaleField("about", "intro", v)}
                  multiline
                />
              </Block>

              <Block title="2. Bild + Geschichte">
                <div className="grid gap-4 lg:grid-cols-2">
                  <ImageEditor
                    label="Hauptbild (links)"
                    hint="Wie auf der Über-uns-Seite"
                    src={content.images.about}
                    uploading={uploadingKey === "about"}
                    onUpload={(f) => void handleUpload("about", f)}
                    onUrlChange={(url) => setImageUrl("about", url)}
                  />
                  <div className="grid gap-3 content-start">
                    <Field
                      label="Story-Überschrift"
                      value={t.about.storyTitle}
                      onChange={(v) => setLocaleField("about", "storyTitle", v)}
                    />
                    <ListFields
                      label="Story-Absätze"
                      items={t.about.storyBody}
                      onChange={(i, v) =>
                        setStringList("about", "storyBody", i, v)
                      }
                      multiline
                    />
                  </div>
                </div>
              </Block>

              <Block title="3. Partner-Karten (WiMa & SAS)">
                <Field
                  label="Bereichs-Überschrift"
                  value={t.about.companiesTitle}
                  onChange={(v) => setLocaleField("about", "companiesTitle", v)}
                />
                <Field
                  label="Bereichs-Untertitel"
                  value={t.about.companiesSubtitle}
                  onChange={(v) =>
                    setLocaleField("about", "companiesSubtitle", v)
                  }
                  multiline
                />
                <Field
                  label="Rolle WiMa (Kartentext)"
                  value={t.about.wimaRole}
                  onChange={(v) => setLocaleField("about", "wimaRole", v)}
                  multiline
                />
                <Field
                  label="Rolle SAS (Kartentext)"
                  value={t.about.sasRole}
                  onChange={(v) => setLocaleField("about", "sasRole", v)}
                  multiline
                />
              </Block>

              <Block title="4. Fakten">
                <Field
                  label="Fakten-Überschrift"
                  value={t.about.factsTitle}
                  onChange={(v) => setLocaleField("about", "factsTitle", v)}
                />
                <ObjectListFields
                  label="Fakten-Karten"
                  items={t.about.facts}
                  onChange={(i, field, v) =>
                    setObjectList("about", "facts", i, field, v)
                  }
                />
              </Block>
            </PageShell>
          )}

          {page === "service" && (
            <PageShell
              title="Service"
              subtitle="Reihenfolge: Kopf + Bild → Leistungen → Ablauf → Geräte/Werkstatt → CTA"
            >
              <Block title="1. Seitenkopf">
                <Field
                  label="Eyebrow"
                  value={t.service.eyebrow}
                  onChange={(v) => setLocaleField("service", "eyebrow", v)}
                />
                <Field
                  label="Überschrift"
                  value={t.service.title}
                  onChange={(v) => setLocaleField("service", "title", v)}
                />
                <Field
                  label="Einleitung"
                  value={t.service.intro}
                  onChange={(v) => setLocaleField("service", "intro", v)}
                  multiline
                />
                <ImageEditor
                  label="Kopfbild unter dem Text"
                  hint="Wie auf der Service-Seite unter der Einleitung"
                  src={content.images.service}
                  uploading={uploadingKey === "service"}
                  onUpload={(f) => void handleUpload("service", f)}
                  onUrlChange={(url) => setImageUrl("service", url)}
                />
              </Block>

              <Block title="2. Leistungen (Karten)">
                <Field
                  label="Bereichs-Überschrift"
                  value={t.service.helpTitle}
                  onChange={(v) => setLocaleField("service", "helpTitle", v)}
                />
                <Field
                  label="Bereichs-Einleitung"
                  value={t.service.helpIntro}
                  onChange={(v) => setLocaleField("service", "helpIntro", v)}
                  multiline
                />
                <ObjectListFields
                  label="Leistungs-Karten"
                  items={t.service.helpItems}
                  onChange={(i, field, v) =>
                    setObjectList("service", "helpItems", i, field, v)
                  }
                />
              </Block>

              <Block title="3. Ablauf (Schritte)">
                <Field
                  label="Ablauf-Überschrift"
                  value={t.service.processTitle}
                  onChange={(v) => setLocaleField("service", "processTitle", v)}
                />
                <Field
                  label="Ablauf-Untertitel"
                  value={t.service.processSubtitle}
                  onChange={(v) =>
                    setLocaleField("service", "processSubtitle", v)
                  }
                  multiline
                />
                <ObjectListFields
                  label="Schritte"
                  items={t.service.steps}
                  onChange={(i, field, v) =>
                    setObjectList("service", "steps", i, field, v)
                  }
                />
              </Block>

              <Block title="4. Geräte / Werkstatt" tone="dark">
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="grid gap-3 content-start">
                    <Field
                      label="Überschrift"
                      value={t.service.devicesTitle}
                      onChange={(v) =>
                        setLocaleField("service", "devicesTitle", v)
                      }
                    />
                    <Field
                      label="Beschreibung"
                      value={t.service.devicesBody}
                      onChange={(v) =>
                        setLocaleField("service", "devicesBody", v)
                      }
                      multiline
                    />
                    <ListFields
                      label="Geräte-Liste"
                      items={t.service.devices}
                      onChange={(i, v) =>
                        setStringList("service", "devices", i, v)
                      }
                    />
                  </div>
                  <ImageEditor
                    label="Werkstattbild (rechts)"
                    hint="Dunkler Bereich „Systeme im Fokus“"
                    src={content.images.workshop}
                    uploading={uploadingKey === "workshop"}
                    onUpload={(f) => void handleUpload("workshop", f)}
                    onUrlChange={(url) => setImageUrl("workshop", url)}
                  />
                </div>
              </Block>

              <Block title="5. Abschluss-CTA">
                <Field
                  label="CTA-Überschrift"
                  value={t.service.ctaTitle}
                  onChange={(v) => setLocaleField("service", "ctaTitle", v)}
                />
                <Field
                  label="CTA-Text"
                  value={t.service.ctaBody}
                  onChange={(v) => setLocaleField("service", "ctaBody", v)}
                  multiline
                />
                <Field
                  label="CTA-Button"
                  value={t.service.ctaButton}
                  onChange={(v) => setLocaleField("service", "ctaButton", v)}
                />
              </Block>
            </PageShell>
          )}

          {page === "contact" && (
            <PageShell
              title="Kontakt"
              subtitle="Reihenfolge: Kopf + Bild → Standorte (Texte) → Formulartexte"
            >
              <Block title="1. Seitenkopf">
                <Field
                  label="Eyebrow"
                  value={t.contact.eyebrow}
                  onChange={(v) => setLocaleField("contact", "eyebrow", v)}
                />
                <Field
                  label="Überschrift"
                  value={t.contact.title}
                  onChange={(v) => setLocaleField("contact", "title", v)}
                />
                <Field
                  label="Einleitung"
                  value={t.contact.intro}
                  onChange={(v) => setLocaleField("contact", "intro", v)}
                  multiline
                />
                <ImageEditor
                  label="Kopfbild"
                  hint="Unter dem Einleitungstext auf der Kontaktseite"
                  src={content.images.contact}
                  uploading={uploadingKey === "contact"}
                  onUpload={(f) => void handleUpload("contact", f)}
                  onUrlChange={(url) => setImageUrl("contact", url)}
                />
              </Block>

              <Block title="2. Standorte & Formular (Beschriftungen)">
                <Field
                  label="Überschrift Standorte"
                  value={t.contact.locationsTitle}
                  onChange={(v) =>
                    setLocaleField("contact", "locationsTitle", v)
                  }
                />
                <Field
                  label="Überschrift Formular"
                  value={t.contact.formTitle}
                  onChange={(v) => setLocaleField("contact", "formTitle", v)}
                />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Feld Name"
                    value={t.contact.formName}
                    onChange={(v) => setLocaleField("contact", "formName", v)}
                  />
                  <Field
                    label="Feld Unternehmen"
                    value={t.contact.formCompany}
                    onChange={(v) =>
                      setLocaleField("contact", "formCompany", v)
                    }
                  />
                  <Field
                    label="Feld E-Mail"
                    value={t.contact.formEmail}
                    onChange={(v) => setLocaleField("contact", "formEmail", v)}
                  />
                  <Field
                    label="Feld Telefon"
                    value={t.contact.formPhone}
                    onChange={(v) => setLocaleField("contact", "formPhone", v)}
                  />
                </div>
                <Field
                  label="Feld Nachricht"
                  value={t.contact.formMessage}
                  onChange={(v) => setLocaleField("contact", "formMessage", v)}
                />
                <Field
                  label="Button senden"
                  value={t.contact.formSubmit}
                  onChange={(v) => setLocaleField("contact", "formSubmit", v)}
                />
                <Field
                  label="Hinweis unter dem Formular"
                  value={t.contact.formHint}
                  onChange={(v) => setLocaleField("contact", "formHint", v)}
                  multiline
                />
                <Field
                  label="Erfolgsmeldung"
                  value={t.contact.formSuccess}
                  onChange={(v) => setLocaleField("contact", "formSuccess", v)}
                />
                <Field
                  label="Erreichbarkeit – Titel"
                  value={t.contact.hoursTitle}
                  onChange={(v) => setLocaleField("contact", "hoursTitle", v)}
                />
                <Field
                  label="Erreichbarkeit – Text"
                  value={t.contact.hoursBody}
                  onChange={(v) => setLocaleField("contact", "hoursBody", v)}
                  multiline
                />
              </Block>

              <p className="text-sm text-anthracite-500">
                Adressen, Telefon und E-Mail der Firmen bearbeiten Sie unter{" "}
                <button
                  type="button"
                  className="font-semibold text-accent underline-offset-2 hover:underline"
                  onClick={() => setPage("companies")}
                >
                  Firmen & Standorte
                </button>
                .
              </p>
            </PageShell>
          )}

          {page === "nav" && (
            <PageShell
              title="Navigation & SEO"
              subtitle="Menü, Browser-Titel und Footer – gilt seitenübergreifend"
            >
              <Block title="Navigation (Kopfzeile)">
                <div className="grid gap-3 sm:grid-cols-2">
                  {(
                    [
                      ["home", "Menüpunkt Start"],
                      ["about", "Menüpunkt Über uns"],
                      ["service", "Menüpunkt Service"],
                      ["contact", "Menüpunkt Kontakt"],
                      ["cta", "Button in der Navigation"],
                    ] as const
                  ).map(([key, label]) => (
                    <Field
                      key={key}
                      label={label}
                      value={t.nav[key]}
                      onChange={(v) => setLocaleField("nav", key, v)}
                    />
                  ))}
                </div>
              </Block>
              <Block title="SEO / Browser-Titel">
                <Field
                  label="Seitentitel (Browser-Tab)"
                  value={t.meta.title}
                  onChange={(v) => setLocaleField("meta", "title", v)}
                />
                <Field
                  label="Meta-Beschreibung"
                  value={t.meta.description}
                  onChange={(v) => setLocaleField("meta", "description", v)}
                  multiline
                />
              </Block>
              <Block title="Footer">
                <Field
                  label="Footer-Tagline"
                  value={t.footer.tagline}
                  onChange={(v) => setLocaleField("footer", "tagline", v)}
                  multiline
                />
                <div className="grid gap-3 sm:grid-cols-3">
                  <Field
                    label="Label Rechte"
                    value={t.footer.rights}
                    onChange={(v) => setLocaleField("footer", "rights", v)}
                  />
                  <Field
                    label="Label Standorte"
                    value={t.footer.locations}
                    onChange={(v) => setLocaleField("footer", "locations", v)}
                  />
                  <Field
                    label="Label Links"
                    value={t.footer.links}
                    onChange={(v) => setLocaleField("footer", "links", v)}
                  />
                </div>
              </Block>
            </PageShell>
          )}

          {page === "companies" && (
            <PageShell
              title="Firmen & Standorte"
              subtitle="Erscheinen auf Startseite, Über uns, Kontakt und im Footer"
            >
              <div className="grid gap-4 lg:grid-cols-2">
                {(["wima", "sas"] as const).map((companyKey) => {
                  const company = content.companies[companyKey];
                  return (
                    <Block
                      key={companyKey}
                      title={companyKey === "wima" ? "WiMa" : "SAS"}
                    >
                      {(
                        Object.keys(company) as (keyof typeof company)[]
                      ).map((field) => (
                        <Field
                          key={field}
                          label={labelize(field)}
                          value={company[field]}
                          onChange={(v) =>
                            setContent((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    companies: {
                                      ...prev.companies,
                                      [companyKey]: {
                                        ...prev.companies[companyKey],
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
                  );
                })}
              </div>
            </PageShell>
          )}
        </main>
      </div>
    </div>
  );
}

function PageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-border bg-surface px-5 py-4 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Seite bearbeiten
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-anthracite-900">
          {title}
        </h1>
        <p className="mt-1 text-sm text-anthracite-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Block({
  title,
  children,
  tone = "light",
}: {
  title: string;
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <section
      className={`rounded-2xl border p-5 shadow-sm md:p-6 ${
        tone === "dark"
          ? "border-anthracite-800 bg-anthracite-900 text-white"
          : "border-border bg-surface"
      }`}
    >
      <h2
        className={`mb-4 border-b pb-3 text-base font-semibold ${
          tone === "dark"
            ? "border-white/10 text-white"
            : "border-border text-anthracite-900"
        }`}
      >
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
  multiline = false,
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
      <span className="mb-1.5 block font-medium text-anthracite-600">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={`py-2.5 ${fieldClass}`}
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

function ListFields({
  label,
  items,
  onChange,
  multiline = false,
}: {
  label: string;
  items: string[];
  onChange: (index: number, value: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-anthracite-50/70 p-3">
      <p className="mb-2 text-sm font-semibold text-anthracite-800">{label}</p>
      <div className="space-y-2">
        {items.map((item, index) =>
          multiline ? (
            <textarea
              key={index}
              value={item}
              rows={3}
              onChange={(e) => onChange(index, e.target.value)}
              className={`py-2 ${fieldClass} bg-surface`}
            />
          ) : (
            <input
              key={index}
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className={`h-10 ${fieldClass} bg-surface`}
            />
          ),
        )}
      </div>
    </div>
  );
}

function ObjectListFields({
  label,
  items,
  onChange,
}: {
  label: string;
  items: { title: string; body: string }[];
  onChange: (
    index: number,
    field: "title" | "body",
    value: string,
  ) => void;
}) {
  return (
    <div className="rounded-xl border border-border bg-anthracite-50/70 p-3">
      <p className="mb-2 text-sm font-semibold text-anthracite-800">{label}</p>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-surface p-3"
          >
            <p className="mb-2 text-xs font-semibold text-accent">
              Eintrag {index + 1}
            </p>
            <input
              value={item.title}
              onChange={(e) => onChange(index, "title", e.target.value)}
              className={`mb-2 h-10 font-medium ${fieldClass}`}
              placeholder="Titel"
            />
            <textarea
              value={item.body}
              rows={2}
              onChange={(e) => onChange(index, "body", e.target.value)}
              className={`py-2 ${fieldClass}`}
              placeholder="Text"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageEditor({
  label,
  hint,
  src,
  uploading,
  onUpload,
  onUrlChange,
}: {
  label: string;
  hint: string;
  src: string;
  uploading: boolean;
  onUpload: (file: File) => void;
  onUrlChange: (url: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-anthracite-50/50">
      <div className="relative aspect-[16/9] bg-anthracite-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-2 p-3">
        <div>
          <p className="text-sm font-semibold text-anthracite-900">{label}</p>
          <p className="text-xs text-anthracite-500">{hint}</p>
        </div>
        <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-anthracite-800 hover:bg-anthracite-50">
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          Bild ersetzen
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
            }}
          />
        </label>
        <label className="block text-xs font-medium text-anthracite-500">
          Oder Bild-URL
          <input
            value={src}
            onChange={(e) => onUrlChange(e.target.value)}
            className={`mt-1 h-9 ${fieldClass} bg-surface`}
          />
        </label>
      </div>
    </div>
  );
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
