"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  ImageKey,
  Locale,
  LocaleContent,
  SiteContent,
} from "@/content/types";
import {
  Check,
  ExternalLink,
  ImageIcon,
  Loader2,
  LogOut,
  Save,
  Type,
  Building2,
} from "lucide-react";

const LOCALES: Locale[] = ["de", "en", "zh"];
const LOCALE_LABELS: Record<Locale, string> = {
  de: "DE",
  en: "EN",
  zh: "中文",
};

/** Images mapped to public pages/sections for clear admin context */
const IMAGE_FIELDS: {
  key: ImageKey;
  page: string;
  section: string;
  title: string;
  description: string;
}[] = [
  {
    key: "hero",
    page: "Startseite",
    section: "Hero-Hintergrund",
    title: "Startseite – Hero",
    description:
      "Großes Hintergrundbild im Hero der Startseite (hinter dem Haupttext).",
  },
  {
    key: "warehouse",
    page: "Startseite",
    section: "Story / Partner-Bereich",
    title: "Startseite – Story-Bild",
    description:
      "Bild neben dem Story-Text (europäisches Lager / Service-Story).",
  },
  {
    key: "about",
    page: "Über uns",
    section: "Hauptbild",
    title: "Über uns – Hauptbild",
    description: "Bild im oberen Bereich der Seite „Über uns“.",
  },
  {
    key: "service",
    page: "Service",
    section: "Seitenkopf",
    title: "Service – Kopfbild",
    description: "Kompaktes Bild im Service-Seitenkopf unter dem Einleitungstext.",
  },
  {
    key: "workshop",
    page: "Service",
    section: "Geräte / Werkstatt",
    title: "Service – Werkstattbild",
    description: "Bild im dunklen Bereich „Systeme im Fokus“ auf der Service-Seite.",
  },
  {
    key: "contact",
    page: "Kontakt",
    section: "Seitenkopf",
    title: "Kontakt – Kopfbild",
    description: "Bild im Kopfbereich der Kontaktseite unter dem Einleitungstext.",
  },
];

type Tab = "texts" | "images" | "companies";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-3 text-sm text-anthracite-900 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

export function AdminApp() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [locale, setLocale] = useState<Locale>("de");
  const [tab, setTab] = useState<Tab>("texts");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<ImageKey | null>(null);
  const [textSectionId, setTextSectionId] = useState("home");

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
          ? {
              ...prev,
              images: { ...prev.images, [key]: data.url as string },
            }
          : prev,
      );
      const meta = IMAGE_FIELDS.find((f) => f.key === key);
      setMessage(
        `Bild „${meta?.title ?? key}“ aktualisiert – bitte speichern.`,
      );
    } catch {
      setError("Upload fehlgeschlagen.");
    } finally {
      setUploadingKey(null);
    }
  }

  const localeContent = content?.locales[locale];

  const textSections = useMemo(() => {
    if (!localeContent) return [];
    return [
      { id: "meta", title: "SEO / Meta", fields: stringFields(localeContent.meta) },
      { id: "nav", title: "Navigation", fields: stringFields(localeContent.nav) },
      {
        id: "home",
        title: "Startseite",
        fields: stringFields(localeContent.home, ["trustItems", "values"]),
        lists: { trustItems: localeContent.home.trustItems },
        objectLists: { values: localeContent.home.values },
      },
      {
        id: "about",
        title: "Über uns",
        fields: stringFields(localeContent.about, ["storyBody", "facts"]),
        lists: { storyBody: localeContent.about.storyBody },
        objectLists: { facts: localeContent.about.facts },
      },
      {
        id: "service",
        title: "Service",
        fields: stringFields(localeContent.service, [
          "helpItems",
          "steps",
          "devices",
        ]),
        lists: { devices: localeContent.service.devices },
        objectLists: {
          helpItems: localeContent.service.helpItems,
          steps: localeContent.service.steps,
        },
      },
      {
        id: "contact",
        title: "Kontakt",
        fields: stringFields(localeContent.contact),
      },
      {
        id: "footer",
        title: "Footer",
        fields: stringFields(localeContent.footer),
      },
    ];
  }, [localeContent]);

  const activeTextSection =
    textSections.find((s) => s.id === textSectionId) ?? textSections[0];

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
            Inhaltsverwaltung
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-anthracite-500">
            Geschützter Bereich – nicht in der öffentlichen Navigation
            verlinkt. Texte und Bilder der Website bearbeiten.
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
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  if (!content || !localeContent || !activeTextSection) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  function updateLocaleField(
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

  function updateStringList(
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

  function updateObjectList(
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Same sticky industrial header language as public site */}
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-anthracite-900 text-xs font-bold text-white">
              S×W
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-anthracite-900">
                Admin · G-Force Website
              </p>
              <p className="hidden text-xs text-anthracite-400 sm:block">
                Texte & Bilder bearbeiten
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/de"
              target="_blank"
              rel="noreferrer"
              className="hidden h-10 items-center gap-1.5 rounded-xl border border-border bg-surface px-3 text-sm font-medium text-anthracite-700 hover:bg-anthracite-50 sm:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Website
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
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
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

        {/* Pill nav — mirrors public header style */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <nav className="inline-flex flex-wrap items-center gap-0.5 rounded-full border border-border bg-anthracite-50/80 p-1">
            {(
              [
                ["texts", "Texte", Type],
                ["images", "Bilder", ImageIcon],
                ["companies", "Firmen", Building2],
              ] as const
            ).map(([id, label, Icon]) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3.5 text-sm font-medium transition-colors ${
                  tab === id
                    ? "bg-anthracite-900 text-white shadow-sm"
                    : "text-anthracite-600 hover:bg-white hover:text-anthracite-900"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {tab === "texts" ? (
          <div className="grid gap-5 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="sticky top-20 space-y-4">
                <div className="rounded-2xl border border-border bg-surface p-3 shadow-sm">
                  <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-[0.12em] text-anthracite-400">
                    Sprache
                  </p>
                  <div className="flex gap-1">
                    {LOCALES.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setLocale(code)}
                        className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                          locale === code
                            ? "bg-accent text-white"
                            : "bg-anthracite-50 text-anthracite-600 hover:bg-anthracite-100"
                        }`}
                      >
                        {LOCALE_LABELS[code]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-2 shadow-sm">
                  <p className="mb-1 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-anthracite-400">
                    Bereich
                  </p>
                  <nav className="flex flex-col gap-0.5">
                    {textSections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setTextSectionId(section.id)}
                        className={`rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                          activeTextSection.id === section.id
                            ? "bg-anthracite-900 text-white"
                            : "text-anthracite-600 hover:bg-anthracite-50 hover:text-anthracite-900"
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-6">
                <div className="mb-5 border-b border-border pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {LOCALE_LABELS[locale]} · Texte
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-anthracite-900">
                    {activeTextSection.title}
                  </h2>
                </div>
                <div className="grid gap-4">
                  {activeTextSection.fields.map(([key, value]) => (
                    <label key={key} className="block text-sm">
                      <span className="mb-1.5 block font-medium text-anthracite-600">
                        {labelize(key)}
                      </span>
                      {value.length > 90 ? (
                        <textarea
                          value={value}
                          rows={3}
                          onChange={(e) =>
                            updateLocaleField(
                              activeTextSection.id as keyof LocaleContent,
                              key,
                              e.target.value,
                            )
                          }
                          className={`py-2.5 ${fieldClass}`}
                        />
                      ) : (
                        <input
                          value={value}
                          onChange={(e) =>
                            updateLocaleField(
                              activeTextSection.id as keyof LocaleContent,
                              key,
                              e.target.value,
                            )
                          }
                          className={`h-10 ${fieldClass}`}
                        />
                      )}
                    </label>
                  ))}

                  {activeTextSection.lists
                    ? Object.entries(activeTextSection.lists).map(
                        ([listKey, items]) => (
                          <div
                            key={listKey}
                            className="rounded-xl border border-border bg-anthracite-50/80 p-4"
                          >
                            <p className="mb-3 text-sm font-semibold text-anthracite-800">
                              {labelize(listKey)}
                            </p>
                            <div className="space-y-2">
                              {(items as string[]).map(
                                (item: string, index: number) => (
                                  <input
                                    key={`${listKey}-${index}`}
                                    value={item}
                                    onChange={(e) =>
                                      updateStringList(
                                        activeTextSection.id as
                                          | "home"
                                          | "about"
                                          | "service",
                                        listKey,
                                        index,
                                        e.target.value,
                                      )
                                    }
                                    className={`h-10 bg-surface ${fieldClass}`}
                                  />
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )
                    : null}

                  {activeTextSection.objectLists
                    ? Object.entries(activeTextSection.objectLists).map(
                        ([listKey, items]) => (
                          <div
                            key={listKey}
                            className="rounded-xl border border-border bg-anthracite-50/80 p-4"
                          >
                            <p className="mb-3 text-sm font-semibold text-anthracite-800">
                              {labelize(listKey)}
                            </p>
                            <div className="space-y-3">
                              {(
                                items as { title: string; body: string }[]
                              ).map(
                                (
                                  item: { title: string; body: string },
                                  index: number,
                                ) => (
                                  <div
                                    key={`${listKey}-${index}`}
                                    className="rounded-xl border border-border bg-surface p-3"
                                  >
                                    <input
                                      value={item.title}
                                      onChange={(e) =>
                                        updateObjectList(
                                          activeTextSection.id as
                                            | "home"
                                            | "about"
                                            | "service",
                                          listKey,
                                          index,
                                          "title",
                                          e.target.value,
                                        )
                                      }
                                      className={`mb-2 h-10 font-medium ${fieldClass}`}
                                      placeholder="Titel"
                                    />
                                    <textarea
                                      value={item.body}
                                      rows={2}
                                      onChange={(e) =>
                                        updateObjectList(
                                          activeTextSection.id as
                                            | "home"
                                            | "about"
                                            | "service",
                                          listKey,
                                          index,
                                          "body",
                                          e.target.value,
                                        )
                                      }
                                      className={`py-2 ${fieldClass}`}
                                      placeholder="Text"
                                    />
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ),
                      )
                    : null}
                </div>
              </section>
            </div>
          </div>
        ) : null}

        {tab === "images" ? (
          <div className="space-y-8">
            <p className="text-sm text-anthracite-500">
              Jedes Bild ist fest einer Seite und einem Abschnitt zugeordnet.
              Ersetzen Sie nur das passende Feld – die Website zeigt es dort
              automatisch.
            </p>
            {(
              [
                "Startseite",
                "Über uns",
                "Service",
                "Kontakt",
              ] as const
            ).map((page) => {
              const fields = IMAGE_FIELDS.filter((f) => f.page === page);
              if (!fields.length) return null;
              return (
                <section key={page}>
                  <div className="mb-3 flex items-end justify-between gap-3 border-b border-border pb-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                        Seite
                      </p>
                      <h2 className="text-lg font-semibold text-anthracite-900">
                        {page}
                      </h2>
                    </div>
                    <p className="text-xs text-anthracite-400">
                      {fields.length} Bild{fields.length === 1 ? "" : "er"}
                    </p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.map((meta) => {
                      const key = meta.key;
                      return (
                        <div
                          key={key}
                          className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
                        >
                          <div className="relative aspect-[16/10] bg-anthracite-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={content.images[key]}
                              alt={meta.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                              {meta.section}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-anthracite-900">
                              {meta.title}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-anthracite-500">
                              {meta.description}
                            </p>
                            <p className="mt-2 truncate text-[11px] text-anthracite-400">
                              Feld: <code className="text-anthracite-600">{key}</code>
                              {" · "}
                              {content.images[key]}
                            </p>
                            <label className="mt-3 inline-flex h-10 cursor-pointer items-center rounded-xl border border-border bg-anthracite-50 px-4 text-sm font-medium text-anthracite-800 hover:bg-anthracite-100">
                              {uploadingKey === key ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : null}
                              Bild ersetzen
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) void handleUpload(key, file);
                                }}
                              />
                            </label>
                            <label className="mt-3 block text-xs font-medium text-anthracite-500">
                              Oder Bild-URL
                              <input
                                value={content.images[key]}
                                onChange={(e) =>
                                  setContent((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          images: {
                                            ...prev.images,
                                            [key]: e.target.value,
                                          },
                                        }
                                      : prev,
                                  )
                                }
                                className={`mt-1 h-9 ${fieldClass}`}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}

        {tab === "companies" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {(["wima", "sas"] as const).map((companyKey) => {
              const company = content.companies[companyKey];
              return (
                <section
                  key={companyKey}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {companyKey}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-anthracite-900">
                    {company.legalName || company.name}
                  </h2>
                  <div className="mt-4 grid gap-3">
                    {(Object.keys(company) as (keyof typeof company)[]).map(
                      (field) => (
                        <label key={field} className="block text-sm">
                          <span className="mb-1.5 block font-medium text-anthracite-600">
                            {labelize(field)}
                          </span>
                          <input
                            value={company[field]}
                            onChange={(e) =>
                              setContent((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      companies: {
                                        ...prev.companies,
                                        [companyKey]: {
                                          ...prev.companies[companyKey],
                                          [field]: e.target.value,
                                        },
                                      },
                                    }
                                  : prev,
                              )
                            }
                            className={`h-10 ${fieldClass}`}
                          />
                        </label>
                      ),
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}

        <p className="mt-8 text-center text-xs text-anthracite-400">
          Design-System wie die öffentliche Website · Admin nur unter /admin
        </p>
      </div>
    </div>
  );
}

function stringFields(
  obj: object,
  skip: string[] = [],
): [string, string][] {
  return Object.entries(obj as Record<string, unknown>)
    .filter(
      ([key, value]) => !skip.includes(key) && typeof value === "string",
    )
    .map(([key, value]) => [key, value as string]);
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
