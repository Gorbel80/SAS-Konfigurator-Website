/**
 * G-Force Configurator catalog.
 * Parts Library = categories (Profile, G-Force units).
 * Scene parts = either procedural G-Force BOM or loaded GLB profiles.
 */

export type Localized = { de: string; en: string; zh: string };

export type PartRole =
  | "housing"
  | "rear"
  | "wra"
  | "hdl"
  | "coil"
  | "swivel"
  | "hw"
  | "pcb"
  | "sensor"
  | "profile";

export type BomPart = {
  id: string;
  partNumber: string;
  name: Localized;
  role: PartRole;
  /** GLB path for CAD profiles */
  glbUrl?: string;
  /** Design length of the source GLB in millimetres */
  baseLengthMm?: number;
  /** Current instance length in millimetres (profiles) */
  lengthMm?: number;
};

export type CatalogProduct = {
  id: string;
  name: Localized;
  series: string;
  capacity: string;
  parts: BomPart[];
};

/** Library category shown in the collapsible Parts Library */
export type LibraryCategoryId = "profile" | "g-force";

export type LibraryCategory = {
  id: LibraryCategoryId;
  name: Localized;
};

export type LibraryProfileItem = {
  id: string;
  partNumber: string;
  name: Localized;
  description: Localized;
  glbUrl: string;
  baseLengthMm: number;
  minLengthMm: number;
  maxLengthMm: number;
  stepMm: number;
};

export const libraryCategories: LibraryCategory[] = [
  {
    id: "profile",
    name: { de: "Profile", en: "Profiles", zh: "型材" },
  },
  {
    id: "g-force",
    name: { de: "G-Force Geräte", en: "G-Force units", zh: "G-Force 设备" },
  },
];

/** CAD profiles available under Parts Library → Profile */
export const libraryProfiles: LibraryProfileItem[] = [
  {
    id: "lib-eap210503",
    partNumber: "EAP210503",
    name: {
      de: "Profil ALU 2 · 3000 mm",
      en: "ALU profile 2 · 3000 mm",
      zh: "铝型材 2 · 3000 mm",
    },
    description: {
      de: "34.02.00.03 EAP210503 Profil ALU 2 (Standardlänge 3000 mm)",
      en: "34.02.00.03 EAP210503 ALU profile 2 (standard length 3000 mm)",
      zh: "34.02.00.03 EAP210503 铝型材 2（标准长度 3000 mm）",
    },
    glbUrl: "/models/profiles/eap210503-profil-alu-2-3000.glb",
    baseLengthMm: 3000,
    minLengthMm: 200,
    maxLengthMm: 6000,
    stepMm: 10,
  },
];

function part(
  id: string,
  partNumber: string,
  role: PartRole,
  de: string,
  en: string,
  zh: string,
): BomPart {
  return {
    id,
    partNumber,
    role,
    name: { de, en, zh },
  };
}

function defaultBom(prefix: string): BomPart[] {
  return [
    part(`${prefix}-housing`, `${prefix}-HSG`, "housing", "Gehäuse (blau)", "Housing (blue)", "壳体（蓝）"),
    part(`${prefix}-rear`, `${prefix}-REAR`, "rear", "Gehäuse hinten (schwarz)", "Rear housing (black)", "后壳体（黑）"),
    part(`${prefix}-wra`, `${prefix}-WRA`, "wra", "Drahtseil-Baugruppe", "Wire rope assembly", "钢丝绳总成"),
    part(`${prefix}-hdl`, `${prefix}-HDL`, "hdl", "Bediengriff", "Control handle", "操作手柄"),
    part(`${prefix}-coil`, `${prefix}-CC`, "coil", "Spiralkabel", "Coil cord", "螺旋电缆"),
    part(`${prefix}-swivel`, `${prefix}-SWK`, "swivel", "Drehgelenk-Kit", "Swivel kit", "旋转接头套件"),
    part(`${prefix}-hw`, `${prefix}-HWK`, "hw", "Hardware-Kit", "Hardware kit", "五金件套件"),
    part(`${prefix}-pcb`, `${prefix}-PCB`, "pcb", "Steuerplatine / Mainboard", "Control board / mainboard", "控制主板"),
    part(`${prefix}-sensor`, `${prefix}-SEN`, "sensor", "Lastsensor", "Load sensor", "载荷传感器"),
  ];
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "gf-q-iq-75-150",
    series: "Q / iQ",
    capacity: "75–150 kg",
    name: {
      de: "G-Force Q/iQ 75–150 kg",
      en: "G-Force Q/iQ 75–150 kg",
      zh: "G-Force Q/iQ 75–150 kg",
    },
    parts: defaultBom("Q-IQ-150"),
  },
  {
    id: "gf-q-iq-300-600",
    series: "Q / iQ",
    capacity: "300–600 kg",
    name: {
      de: "G-Force Q/iQ 300–600 kg",
      en: "G-Force Q/iQ 300–600 kg",
      zh: "G-Force Q/iQ 300–600 kg",
    },
    parts: defaultBom("Q-IQ-600"),
  },
  {
    id: "gf-q2-iq2-75-150",
    series: "Q2 / iQ2",
    capacity: "75–150 kg",
    name: {
      de: "G-Force Q2/iQ2 75–150 kg",
      en: "G-Force Q2/iQ2 75–150 kg",
      zh: "G-Force Q2/iQ2 75–150 kg",
    },
    parts: defaultBom("Q2-IQ2-150"),
  },
  {
    id: "gf-q2-iq2-300-600",
    series: "Q2 / iQ2",
    capacity: "300–600 kg",
    name: {
      de: "G-Force Q2/iQ2 300–600 kg",
      en: "G-Force Q2/iQ2 300–600 kg",
      zh: "G-Force Q2/iQ2 300–600 kg",
    },
    parts: defaultBom("Q2-IQ2-600"),
  },
];

export function getProductById(id: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.id === id);
}

export function getLibraryProfile(id: string): LibraryProfileItem | undefined {
  return libraryProfiles.find((p) => p.id === id);
}

/** Create a scene/partlist instance from a library profile */
export function createProfileInstance(
  lib: LibraryProfileItem,
  lengthMm?: number,
): BomPart {
  const uid = `${lib.id}-${Date.now().toString(36)}`;
  const mm = lengthMm ?? lib.baseLengthMm;
  return {
    id: uid,
    partNumber: lib.partNumber,
    role: "profile",
    name: {
      de: `Profil ALU 2 · ${mm} mm`,
      en: `ALU profile 2 · ${mm} mm`,
      zh: `铝型材 2 · ${mm} mm`,
    },
    glbUrl: lib.glbUrl,
    baseLengthMm: lib.baseLengthMm,
    lengthMm: mm,
  };
}

export const defaultRolePositions: Record<PartRole, [number, number, number]> =
  {
    housing: [0.2, 0.25, 0],
    rear: [-0.85, 0.2, 0],
    wra: [-0.55, -0.55, 0],
    hdl: [0.35, -0.85, 0.55],
    coil: [0.15, -0.35, 0.55],
    swivel: [-0.55, -0.15, 0],
    hw: [0.75, 0.15, 0.45],
    pcb: [0.15, 0.55, 0.35],
    sensor: [-0.35, 0.55, 0.4],
    profile: [0, 0.05, 0],
  };

/** Partlist folder groups (mecabricks-style) */
export type PartlistFolderId =
  | "profiles"
  | "housing"
  | "drive"
  | "controls"
  | "electronics";

export type PartlistFolder = {
  id: PartlistFolderId;
  name: Localized;
  roles: PartRole[];
};

export const partlistFolders: PartlistFolder[] = [
  {
    id: "profiles",
    name: { de: "Profile", en: "Profiles", zh: "型材" },
    roles: ["profile"],
  },
  {
    id: "housing",
    name: { de: "Gehäuse", en: "Housing", zh: "壳体" },
    roles: ["housing", "rear"],
  },
  {
    id: "drive",
    name: { de: "Antrieb / Seil", en: "Drive / rope", zh: "驱动 / 绳" },
    roles: ["wra", "swivel"],
  },
  {
    id: "controls",
    name: { de: "Bedienung", en: "Controls", zh: "操作" },
    roles: ["hdl", "coil"],
  },
  {
    id: "electronics",
    name: { de: "Elektronik & Hardware", en: "Electronics & hardware", zh: "电子与五金" },
    roles: ["pcb", "sensor", "hw"],
  },
];

/** Nested G-Force series folders for the library tree */
export type GForceSeriesFolder = {
  id: string;
  series: string;
  name: Localized;
  productIds: string[];
};

export const gforceSeriesFolders: GForceSeriesFolder[] = [
  {
    id: "series-q-iq",
    series: "Q / iQ",
    name: {
      de: "G-Force Q / iQ",
      en: "G-Force Q / iQ",
      zh: "G-Force Q / iQ",
    },
    productIds: ["gf-q-iq-75-150", "gf-q-iq-300-600"],
  },
  {
    id: "series-q2-iq2",
    series: "Q2 / iQ2",
    name: {
      de: "G-Force Q2 / iQ2",
      en: "G-Force Q2 / iQ2",
      zh: "G-Force Q2 / iQ2",
    },
    productIds: ["gf-q2-iq2-75-150", "gf-q2-iq2-300-600"],
  },
];
