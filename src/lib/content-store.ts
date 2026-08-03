import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "@/content/types";
import { defaultContent } from "@/content/default-content";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

export async function readContent(): Promise<SiteContent> {
  try {
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    return mergeWithDefaults(parsed);
  } catch {
    return structuredClone(defaultContent);
  }
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  await ensureDataDir();
  const merged = mergeWithDefaults(content);
  merged.version = (merged.version || 1) + 1;
  await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}

export async function ensureContentFile() {
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await ensureDataDir();
    await fs.writeFile(
      CONTENT_FILE,
      JSON.stringify(defaultContent, null, 2),
      "utf8",
    );
  }
}

function mergeWithDefaults(input: SiteContent): SiteContent {
  return {
    ...defaultContent,
    ...input,
    images: { ...defaultContent.images, ...input.images },
    companies: {
      wima: { ...defaultContent.companies.wima, ...input.companies?.wima },
      sas: { ...defaultContent.companies.sas, ...input.companies?.sas },
    },
    locales: {
      de: deepMergeLocale(defaultContent.locales.de, input.locales?.de),
      en: deepMergeLocale(defaultContent.locales.en, input.locales?.en),
      zh: deepMergeLocale(defaultContent.locales.zh, input.locales?.zh),
    },
  };
}

function deepMergeLocale(
  base: SiteContent["locales"]["de"],
  override?: Partial<SiteContent["locales"]["de"]>,
) {
  if (!override) return structuredClone(base);
  return {
    ...base,
    ...override,
    meta: { ...base.meta, ...override.meta },
    nav: { ...base.nav, ...override.nav },
    home: {
      ...base.home,
      ...override.home,
      trustItems: override.home?.trustItems ?? base.home.trustItems,
      values: override.home?.values ?? base.home.values,
    },
    about: {
      ...base.about,
      ...override.about,
      storyBody: override.about?.storyBody ?? base.about.storyBody,
      facts: override.about?.facts ?? base.about.facts,
    },
    service: {
      ...base.service,
      ...override.service,
      helpItems: override.service?.helpItems ?? base.service.helpItems,
      steps: override.service?.steps ?? base.service.steps,
      devices: override.service?.devices ?? base.service.devices,
    },
    contact: { ...base.contact, ...override.contact },
    footer: { ...base.footer, ...override.footer },
  };
}
