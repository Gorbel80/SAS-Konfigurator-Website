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
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    if (!parsed.version || parsed.version < defaultContent.version) {
      return structuredClone(defaultContent);
    }
    return mergeWithDefaults(parsed as SiteContent);
  } catch {
    return structuredClone(defaultContent);
  }
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  await ensureDataDir();
  const merged = mergeWithDefaults(content);
  merged.version = Math.max(merged.version || 1, defaultContent.version);
  await fs.writeFile(CONTENT_FILE, JSON.stringify(merged, null, 2), "utf8");
  return merged;
}

function mergeWithDefaults(input: SiteContent): SiteContent {
  return {
    ...defaultContent,
    ...input,
    version: input.version ?? defaultContent.version,
    siteOperator: input.siteOperator ?? defaultContent.siteOperator,
    images: { ...defaultContent.images, ...input.images },
    companies: {
      wima: { ...defaultContent.companies.wima, ...input.companies?.wima },
      sas: { ...defaultContent.companies.sas, ...input.companies?.sas },
    },
    locales: {
      de: deepLocale(defaultContent.locales.de, input.locales?.de),
      en: deepLocale(defaultContent.locales.en, input.locales?.en),
      zh: deepLocale(defaultContent.locales.zh, input.locales?.zh),
    },
  };
}

function deepLocale(
  base: SiteContent["locales"]["de"],
  override?: Partial<SiteContent["locales"]["de"]>,
) {
  if (!override) return structuredClone(base);
  return {
    ...base,
    ...override,
    meta: { ...base.meta, ...override.meta },
    nav: { ...base.nav, ...override.nav },
    home: { ...base.home, ...override.home },
    offerings: {
      ...base.offerings,
      ...override.offerings,
      service: {
        ...base.offerings.service,
        ...override.offerings?.service,
      },
      parts: { ...base.offerings.parts, ...override.offerings?.parts },
      lifts: { ...base.offerings.lifts, ...override.offerings?.lifts },
    },
    about: { ...base.about, ...override.about },
    contact: { ...base.contact, ...override.contact },
    configuratorPage: {
      ...base.configuratorPage,
      ...override.configuratorPage,
    },
    footer: { ...base.footer, ...override.footer },
    cookies: { ...base.cookies, ...override.cookies },
    impressum: { ...base.impressum, ...override.impressum },
    privacy: {
      ...base.privacy,
      ...override.privacy,
      sections: override.privacy?.sections ?? base.privacy.sections,
    },
  };
}
