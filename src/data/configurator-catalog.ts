/**
 * G-Force Configurator catalog (MVP).
 * Left library = product families; right Partlist = BOM for the selected product.
 */

export type Localized = { de: string; en: string; zh: string };

export type BomPart = {
  id: string;
  partNumber: string;
  name: Localized;
  /** Optional thumbnail */
  image?: string;
};

export type CatalogProduct = {
  id: string;
  /** Shown in Parts Library */
  name: Localized;
  series: string;
  capacity: string;
  image: string;
  /** Default bill of materials when product is opened */
  parts: BomPart[];
};

function part(
  id: string,
  partNumber: string,
  de: string,
  en: string,
  zh: string,
  image?: string,
): BomPart {
  return {
    id,
    partNumber,
    name: { de, en, zh },
    image,
  };
}

/** Shared BOM structure for all series (numbers are placeholder EU codes). */
function defaultBom(prefix: string): BomPart[] {
  return [
    part(
      `${prefix}-housing`,
      `${prefix}-HSG`,
      "Gehäuse / Housing",
      "Housing assembly",
      "壳体总成",
      "/images/configurator/machine.png",
    ),
    part(
      `${prefix}-wra`,
      `${prefix}-WRA`,
      "Drahtseil-Baugruppe",
      "Wire rope assembly",
      "钢丝绳总成",
    ),
    part(
      `${prefix}-hdl`,
      `${prefix}-HDL`,
      "Bediengriff",
      "Control handle",
      "操作手柄",
    ),
    part(
      `${prefix}-coil`,
      `${prefix}-CC`,
      "Spiralkabel",
      "Coil cord",
      "螺旋电缆",
    ),
    part(
      `${prefix}-swivel`,
      `${prefix}-SWK`,
      "Drehgelenk-Kit",
      "Swivel kit",
      "旋转接头套件",
    ),
    part(
      `${prefix}-hw`,
      `${prefix}-HWK`,
      "Hardware-Kit",
      "Hardware kit",
      "五金件套件",
    ),
    part(
      `${prefix}-pcb`,
      `${prefix}-PCB`,
      "Steuerplatine / Mainboard",
      "Control board / mainboard",
      "控制主板",
      "/images/configurator/part-mainboard.jpg",
    ),
    part(
      `${prefix}-sensor`,
      `${prefix}-SEN`,
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
    image: "/images/configurator/machine.png",
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
    image: "/images/configurator/g-force.jpg",
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
    image: "/images/configurator/machine.png",
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
    image: "/images/configurator/g-force-dvs.jpg",
    parts: defaultBom("Q2-IQ2-600"),
  },
];

export function getProductById(id: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.id === id);
}
