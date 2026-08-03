import type { Category, Series } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "g-force",
    slug: "g-force",
    name: {
      de: "G-Force Intelligent Lifting Devices",
      en: "G-Force Intelligent Lifting Devices",
      zh: "G-Force 智能起重设备",
    },
    shortName: {
      de: "G-Force",
      en: "G-Force",
      zh: "G-Force",
    },
    description: {
      de: "Intelligente Hebezeuge der G-Force-Serie – von aktueller Vi/ViPlus bis Legacy Q/iQ. Europäisches Ersatzteillager und qualifizierter Service.",
      en: "G-Force intelligent lifting devices – from current Vi/ViPlus to legacy Q/iQ. European spare parts stock and qualified service.",
      zh: "G-Force 智能起重设备——从最新 Vi/ViPlus 到旧款 Q/iQ。欧洲备件库存与专业服务。",
    },
    order: 1,
    accent: "sky",
    imageHint: "intelligent lifting hoist industrial",
  },
  {
    id: "easy-arm",
    slug: "easy-arm",
    name: {
      de: "Easy Arm",
      en: "Easy Arm",
      zh: "Easy Arm 机械臂",
    },
    shortName: {
      de: "Easy Arm",
      en: "Easy Arm",
      zh: "Easy Arm",
    },
    description: {
      de: "Easy Arm Gelenkarme und zugehörige Komponenten – präzises Handling bei reduzierter Belastung.",
      en: "Easy Arm articulating arms and related components – precise handling with reduced strain.",
      zh: "Easy Arm 关节臂及相关组件——精准搬运，降低负荷。",
    },
    order: 2,
    accent: "cyan",
    imageHint: "articulated arm industrial handling",
  },
  {
    id: "handles-controls",
    slug: "handles-controls",
    name: {
      de: "Handles & Controls",
      en: "Handles & Controls",
      zh: "手柄与控制系统",
    },
    shortName: {
      de: "Handles",
      en: "Handles",
      zh: "手柄",
    },
    description: {
      de: "Bedienelemente, Griffe und Steuerungen für G-Force und Easy Arm Systeme.",
      en: "Handles, grips and control units for G-Force and Easy Arm systems.",
      zh: "G-Force 与 Easy Arm 系统的手柄、握把与控制单元。",
    },
    order: 3,
    accent: "indigo",
    imageHint: "industrial control handle",
  },
  {
    id: "spare-parts",
    slug: "spare-parts",
    name: {
      de: "Spare Parts & Kits",
      en: "Spare Parts & Kits",
      zh: "备件与套件",
    },
    shortName: {
      de: "Ersatzteile",
      en: "Spare Parts",
      zh: "备件",
    },
    description: {
      de: "Level 1–3 Wartungskits und Einzelkomponenten. Schnell verfügbar aus dem europäischen Zentrallager.",
      en: "Level 1–3 maintenance kits and individual components. Fast availability from the European central warehouse.",
      zh: "1–3 级维护套件与单件组件。欧洲中心仓库快速供货。",
    },
    order: 4,
    accent: "amber",
    imageHint: "industrial spare parts kit",
  },
  {
    id: "own-products",
    slug: "own-products",
    name: {
      de: "Eigenprodukte (WiMa + SAS)",
      en: "Own Products (WiMa + SAS)",
      zh: "自有产品（WiMa + SAS）",
    },
    shortName: {
      de: "Eigenprodukte",
      en: "Own Products",
      zh: "自有产品",
    },
    description: {
      de: "Eigene Lösungen und Erweiterungen von WiMa und SAS – Inhalt folgt.",
      en: "Proprietary solutions and extensions by WiMa and SAS – content coming soon.",
      zh: "WiMa 与 SAS 自有方案与扩展——内容即将上线。",
    },
    order: 5,
    accent: "emerald",
    imageHint: "custom industrial automation",
  },
];

export const series: Series[] = [
  {
    id: "vi-viplus",
    slug: "vi-viplus",
    categoryId: "g-force",
    name: {
      de: "Vi / ViPlus",
      en: "Vi / ViPlus",
      zh: "Vi / ViPlus",
    },
    description: {
      de: "Aktuelle Generation – höchste Präzision und erweiterte Steuerung.",
      en: "Current generation – highest precision and advanced control.",
      zh: "当前一代——最高精度与先进控制。",
    },
    status: "current",
    order: 1,
  },
  {
    id: "q2-iq2",
    slug: "q2-iq2",
    categoryId: "g-force",
    name: {
      de: "Q2 / iQ2",
      en: "Q2 / iQ2",
      zh: "Q2 / iQ2",
    },
    description: {
      de: "Bewährte Mittelgeneration – weit verbreitet in europäischen Anlagen.",
      en: "Proven mid-generation – widely installed across European plants.",
      zh: "成熟中期型号——在欧洲工厂广泛使用。",
    },
    status: "current",
    order: 2,
  },
  {
    id: "q-iq",
    slug: "q-iq",
    categoryId: "g-force",
    name: {
      de: "Q / iQ (Legacy)",
      en: "Q / iQ (Legacy)",
      zh: "Q / iQ（旧款）",
    },
    description: {
      de: "Legacy-Serie – weiterhin viele Einheiten in Europa im Einsatz. Ersatzteile verfügbar.",
      en: "Legacy series – many units still operating in Europe. Spare parts available.",
      zh: "旧款系列——欧洲仍有大量设备在用。备件可用。",
    },
    status: "legacy",
    order: 3,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSeriesByCategory(categoryId: string): Series[] {
  return series
    .filter((s) => s.categoryId === categoryId)
    .sort((a, b) => a.order - b.order);
}

export function getSeriesBySlug(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}
