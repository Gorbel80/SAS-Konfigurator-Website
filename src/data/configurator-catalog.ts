/**
 * G-Force Configurator catalog (MVP).
 * Left library = product families; right Partlist = BOM for the selected product.
 * Each part has a `role` that maps to a 3D mesh in the workshop.
 */

export type Localized = { de: string; en: string; zh: string };

/** Stable mesh role — used to build the procedural 3D assembly */
export type PartRole =
  | "housing"
  | "rear"
  | "wra"
  | "hdl"
  | "coil"
  | "swivel"
  | "hw"
  | "pcb"
  | "sensor";

export type BomPart = {
  id: string;
  partNumber: string;
  name: Localized;
  role: PartRole;
};

export type CatalogProduct = {
  id: string;
  name: Localized;
  series: string;
  capacity: string;
  parts: BomPart[];
};

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

/** Shared BOM structure for all series (numbers are placeholder EU codes). */
function defaultBom(prefix: string): BomPart[] {
  return [
    part(
      `${prefix}-housing`,
      `${prefix}-HSG`,
      "housing",
      "Gehäuse (blau)",
      "Housing (blue)",
      "壳体（蓝）",
    ),
    part(
      `${prefix}-rear`,
      `${prefix}-REAR`,
      "rear",
      "Gehäuse hinten (schwarz)",
      "Rear housing (black)",
      "后壳体（黑）",
    ),
    part(
      `${prefix}-wra`,
      `${prefix}-WRA`,
      "wra",
      "Drahtseil-Baugruppe",
      "Wire rope assembly",
      "钢丝绳总成",
    ),
    part(
      `${prefix}-hdl`,
      `${prefix}-HDL`,
      "hdl",
      "Bediengriff",
      "Control handle",
      "操作手柄",
    ),
    part(
      `${prefix}-coil`,
      `${prefix}-CC`,
      "coil",
      "Spiralkabel",
      "Coil cord",
      "螺旋电缆",
    ),
    part(
      `${prefix}-swivel`,
      `${prefix}-SWK`,
      "swivel",
      "Drehgelenk-Kit",
      "Swivel kit",
      "旋转接头套件",
    ),
    part(
      `${prefix}-hw`,
      `${prefix}-HWK`,
      "hw",
      "Hardware-Kit",
      "Hardware kit",
      "五金件套件",
    ),
    part(
      `${prefix}-pcb`,
      `${prefix}-PCB`,
      "pcb",
      "Steuerplatine / Mainboard",
      "Control board / mainboard",
      "控制主板",
    ),
    part(
      `${prefix}-sensor`,
      `${prefix}-SEN`,
      "sensor",
      "Lastsensor",
      "Load sensor",
      "载荷传感器",
    ),
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

/** Default local positions for each mesh role (G-Force-inspired assembly). */
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
  };
