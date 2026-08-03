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
  ImageIcon,
  Loader2,
  LogOut,
  Save,
  Type,
  Building2,
} from "lucide-react";

const LOCALES: Locale[] = ["de", "en", "zh"];
const LOCALE_LABELS: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
  zh: "中文",
};

const IMAGE_LABELS: Record<ImageKey, string> = {
  hero: "Startseite Hero",
  about: "Über uns",
  service: "Service",
  workshop: "Werkstatt",
  contact: "Kontakt",
  warehouse: "Lager / Logistik",
};

type Tab = "texts" | "images" | "companies";

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

  const load = useCallback(async () => {
    const session = await fetch("/api/admin/session").then((r) => r.json());
    setAuthenticated(Boolean(session.authenticated));
    setAuthChecked(true);
    if (session.authenticated) {
      const data = (await fetch("/api/content").then((r) => r.json())) as SiteContent;
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
    const data = (await fetch("/api/content").then((r) => r.json())) as SiteContent;
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
      setMessage("Gespeichert. Seite neu laden, um Änderungen öffentlich zu sehen.");
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
      setMessage(`Bild „${IMAGE_LABELS[key]}“ aktualisiert – bitte speichern.`);
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
        fields: stringFields(localeContent.home, [
          "trustItems",
          "values",
        ]),
        lists: {
          trustItems: localeContent.home.trustItems,
        },
        objectLists: {
          values: localeContent.home.values,
        },
      },
      {
        id: "about",
        title: "Über uns",
        fields: stringFields(localeContent.about, [
          "storyBody",
          "facts",
        ]),
        lists: {
          storyBody: localeContent.about.storyBody,
        },
        objectLists: {
          facts: localeContent.about.facts,
        },
      },
      {
        id: "service",
        title: "Service",
        fields: stringFields(localeContent.service, [
          "helpItems",
          "steps",
          "devices",
        ]),
        lists: {
          devices: localeContent.service.devices,
        },
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

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-anthracite-50">
        <Loader2 className="h-6 w-6 animate-spin text-anthracite-400" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-anthracite-950 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-anthracite-900">
            Inhaltsverwaltung
          </h1>
          <p className="mt-2 text-sm text-anthracite-500">
            Geschützter Bereich – nicht in der öffentlichen Navigation verlinkt.
          </p>
          <label className="mt-6 block text-sm">
            <span className="mb-1.5 block font-medium text-anthracite-700">
              Passwort
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border border-border px-3 outline-none focus:border-accent"
              autoFocus
              required
            />
          </label>
          {loginError ? (
            <p className="mt-2 text-sm text-danger">{loginError}</p>
          ) : null}
          <button
            type="submit"
            className="mt-5 flex h-11 w-full items-center justify-center rounded-xl bg-anthracite-900 text-sm font-semibold text-white hover:bg-anthracite-800"
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  if (!content || !localeContent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
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
      const sectionData = prev.locales[locale][section] as Record<string, unknown>;
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
      const sectionData = prev.locales[locale][section] as Record<string, unknown>;
      const list = [...(sectionData[key] as { title: string; body: string }[])];
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
    <div className="min-h-screen bg-anthracite-50">
      <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Admin
            </p>
            <h1 className="text-lg font-semibold text-anthracite-900">
              Website-Inhalte bearbeiten
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
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
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-3 text-sm font-medium text-anthracite-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6">
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

        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ["texts", "Texte", Type],
              ["images", "Bilder", ImageIcon],
              ["companies", "Firmen & Kontakt", Building2],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium ${
                tab === id
                  ? "bg-anthracite-900 text-white"
                  : "border border-border bg-white text-anthracite-600"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {tab === "texts" ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-white p-3">
              <span className="mr-2 self-center text-xs font-semibold uppercase tracking-wide text-anthracite-400">
                Sprache
              </span>
              {LOCALES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLocale(code)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    locale === code
                      ? "bg-accent text-white"
                      : "bg-anthracite-50 text-anthracite-600"
                  }`}
                >
                  {LOCALE_LABELS[code]}
                </button>
              ))}
            </div>

            {textSections.map((section) => (
              <section
                key={section.id}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <h2 className="text-base font-semibold text-anthracite-900">
                  {section.title}
                </h2>
                <div className="mt-4 grid gap-4">
                  {section.fields.map(([key, value]) => (
                    <label key={key} className="block text-sm">
                      <span className="mb-1 block font-medium text-anthracite-600">
                        {labelize(key)}
                      </span>
                      {value.length > 90 ? (
                        <textarea
                          value={value}
                          rows={3}
                          onChange={(e) =>
                            updateLocaleField(
                              section.id as keyof LocaleContent,
                              key,
                              e.target.value,
                            )
                          }
                          className="w-full rounded-xl border border-border px-3 py-2 outline-none focus:border-accent"
                        />
                      ) : (
                        <input
                          value={value}
                          onChange={(e) =>
                            updateLocaleField(
                              section.id as keyof LocaleContent,
                              key,
                              e.target.value,
                            )
                          }
                          className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:border-accent"
                        />
                      )}
                    </label>
                  ))}

                  {section.lists
                    ? Object.entries(section.lists).map(([listKey, items]) => (
                        <div key={listKey} className="rounded-xl bg-anthracite-50 p-4">
                          <p className="mb-3 text-sm font-semibold text-anthracite-700">
                            {labelize(listKey)}
                          </p>
                          <div className="space-y-2">
                            {(items as string[]).map((item: string, index: number) => (
                              <input
                                key={`${listKey}-${index}`}
                                value={item}
                                onChange={(e) =>
                                  updateStringList(
                                    section.id as "home" | "about" | "service",
                                    listKey,
                                    index,
                                    e.target.value,
                                  )
                                }
                                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm outline-none focus:border-accent"
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    : null}

                  {section.objectLists
                    ? Object.entries(section.objectLists).map(
                        ([listKey, items]) => (
                          <div
                            key={listKey}
                            className="rounded-xl bg-anthracite-50 p-4"
                          >
                            <p className="mb-3 text-sm font-semibold text-anthracite-700">
                              {labelize(listKey)}
                            </p>
                            <div className="space-y-4">
                              {(
                                items as { title: string; body: string }[]
                              ).map(
                                (
                                  item: { title: string; body: string },
                                  index: number,
                                ) => (
                                <div
                                  key={`${listKey}-${index}`}
                                  className="rounded-lg border border-border bg-white p-3"
                                >
                                  <input
                                    value={item.title}
                                    onChange={(e) =>
                                      updateObjectList(
                                        section.id as "home" | "about" | "service",
                                        listKey,
                                        index,
                                        "title",
                                        e.target.value,
                                      )
                                    }
                                    className="mb-2 h-10 w-full rounded-lg border border-border px-3 text-sm font-medium outline-none focus:border-accent"
                                    placeholder="Titel"
                                  />
                                  <textarea
                                    value={item.body}
                                    rows={2}
                                    onChange={(e) =>
                                      updateObjectList(
                                        section.id as "home" | "about" | "service",
                                        listKey,
                                        index,
                                        "body",
                                        e.target.value,
                                      )
                                    }
                                    className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                                    placeholder="Text"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        ),
                      )
                    : null}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {tab === "images" ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {(Object.keys(content.images) as ImageKey[]).map((key) => (
              <div
                key={key}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-anthracite-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.images[key]}
                    alt={IMAGE_LABELS[key]}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-anthracite-900">
                    {IMAGE_LABELS[key]}
                  </p>
                  <p className="mt-1 truncate text-xs text-anthracite-400">
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
                  <label className="mt-3 block text-xs text-anthracite-500">
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
                      className="mt-1 h-9 w-full rounded-lg border border-border px-2 text-sm outline-none focus:border-accent"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "companies" ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {(["wima", "sas"] as const).map((companyKey) => {
              const company = content.companies[companyKey];
              return (
                <section
                  key={companyKey}
                  className="rounded-2xl border border-border bg-white p-5 shadow-sm"
                >
                  <h2 className="text-base font-semibold uppercase tracking-wide text-accent">
                    {companyKey}
                  </h2>
                  <div className="mt-4 grid gap-3">
                    {(
                      Object.keys(company) as (keyof typeof company)[]
                    ).map((field) => (
                      <label key={field} className="block text-sm">
                        <span className="mb-1 block font-medium text-anthracite-600">
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
                          className="h-10 w-full rounded-xl border border-border px-3 outline-none focus:border-accent"
                        />
                      </label>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : null}

        <p className="mt-8 text-center text-xs text-anthracite-400">
          Tipp: Nach dem Speichern die Website neu laden. Für Vercel-Produktion
          Inhalte idealerweise lokal speichern und deployen (Dateisystem).
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
      ([key, value]) =>
        !skip.includes(key) && typeof value === "string",
    )
    .map(([key, value]) => [key, value as string]);
}

function labelize(key: string) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
