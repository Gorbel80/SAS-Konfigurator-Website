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
    // Prefer fresh defaults when structure version changes
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
    images: { ...defaultContent.images, ...input.images },
    companies: {
      wima: { ...defaultContent.companies.wima, ...input.companies?.wima },
      sas: { ...defaultContent.companies.sas, ...input.companies?.sas },
    },
    locales: {
      de: { ...defaultContent.locales.de, ...input.locales?.de },
      en: { ...defaultContent.locales.en, ...input.locales?.en },
      zh: { ...defaultContent.locales.zh, ...input.locales?.zh },
    },
  };
}
