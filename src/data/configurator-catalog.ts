/**
 * Catalog for the 3D Configurator workshop (MVP).
 * Expand with real part photos under public/images/configurator/ as they become available.
 */

export type PartCategoryId =
  | "units"
  | "handles"
  | "wire-rope"
  | "hardware"
  | "electronics"
  | "kits";

export type CatalogPart = {
  id: string;
  partNumber: string;
  category: PartCategoryId;
  /** Optional image under /images/configurator/ */
  image?: string;
  name: { de: string; en: string; zh: string };
  description: { de: string; en: string; zh: string };
};

export type CatalogCategory = {
  id: PartCategoryId;
  name: { de: string; en: string; zh: string };
};

export const catalogCategories: CatalogCategory[] = [
  {
    id: "units",
    name: {
      de: "Geräte",
      en: "Units",
      zh: "整机",
    },
  },
  {
    id: "handles",
    name: {
      de: "Griffe",
      en: "Handles",
      zh: "手柄",
    },
  },
  {
    id: "wire-rope",
    name: {
      de: "Drahtseil",
      en: "Wire rope",
      zh: "钢丝绳",
    },
  },
  {
    id: "hardware",
    name: {
      de: "Hardware",
      en: "Hardware",
      zh: "五金件",
    },
  },
  {
    id: "electronics",
    name: {
      de: "Elektronik",
      en: "Electronics",
      zh: "电子",
    },
  },
  {
    id: "kits",
    name: {
      de: "Kits",
      en: "Kits",
      zh: "套件",
    },
  },
];

export const catalogParts: CatalogPart[] = [
  {
    id: "gf-q2-iq2-150",
    partNumber: "GF-Q2/iQ2-150",
    category: "units",
    image: "/images/configurator/machine.png",
    name: {
      de: "G-Force Q2 / iQ2 150 kg",
      en: "G-Force Q2 / iQ2 150 kg",
      zh: "G-Force Q2 / iQ2 150 kg",
    },
    description: {
      de: "Intelligentes Hebegerät 150 kg – Basisansicht im Workshop.",
      en: "Intelligent lifting unit 150 kg – base view in the workshop.",
      zh: "智能提升设备 150 kg——车间基础视图。",
    },
  },
  {
    id: "gf-unit-photo",
    partNumber: "GF-REF-UNIT",
    category: "units",
    image: "/images/configurator/g-force.jpg",
    name: {
      de: "G-Force Referenzgerät",
      en: "G-Force reference unit",
      zh: "G-Force 参考设备",
    },
    description: {
      de: "Fotoansicht eines G-Force Geräts zur Orientierung.",
      en: "Photo view of a G-Force unit for orientation.",
      zh: "G-Force 设备照片视图，便于识别。",
    },
  },
  {
    id: "gf-dvs",
    partNumber: "GF-DVS",
    category: "units",
    image: "/images/configurator/g-force-dvs.jpg",
    name: {
      de: "G-Force DVS Variante",
      en: "G-Force DVS variant",
      zh: "G-Force DVS 型号",
    },
    description: {
      de: "Weitere Geräteansicht für Identifikation und Abgleich.",
      en: "Additional unit view for identification and matching.",
      zh: "用于识别与对照的额外设备视图。",
    },
  },
  {
    id: "hdl-float",
    partNumber: "HDL-FLT-EU",
    category: "handles",
    name: {
      de: "Float-Mode Griff",
      en: "Float mode handle",
      zh: "悬浮模式手柄",
    },
    description: {
      de: "Ergonomischer Griff mit Float-Funktion – häufiges Austauschteil.",
      en: "Ergonomic handle with float function – common replacement part.",
      zh: "带悬浮功能的人体工学手柄——常见更换件。",
    },
  },
  {
    id: "hdl-std",
    partNumber: "HDL-STD-EU",
    category: "handles",
    name: {
      de: "Standard-Bediengriff",
      en: "Standard control handle",
      zh: "标准操作手柄",
    },
    description: {
      de: "Klassischer Zwei-Tasten-Griff für Auf/Ab.",
      en: "Classic two-button handle for up/down.",
      zh: "经典双按钮升/降手柄。",
    },
  },
  {
    id: "wra-150",
    partNumber: "WRA-150-EU",
    category: "wire-rope",
    name: {
      de: "Drahtseil-Baugruppe 150 kg",
      en: "Wire rope assembly 150 kg",
      zh: "钢丝绳总成 150 kg",
    },
    description: {
      de: "Verschleißteil – Seillänge am Gerät prüfen.",
      en: "Wear part – verify rope length on the unit.",
      zh: "易损件——请核对设备绳长。",
    },
  },
  {
    id: "wra-300",
    partNumber: "WRA-300-EU",
    category: "wire-rope",
    name: {
      de: "Drahtseil-Baugruppe 300 kg",
      en: "Wire rope assembly 300 kg",
      zh: "钢丝绳总成 300 kg",
    },
    description: {
      de: "Hochbelastbare Seilbaugruppe für 300 kg Geräte.",
      en: "Heavy-duty rope assembly for 300 kg units.",
      zh: "适用于 300 kg 设备的重载绳总成。",
    },
  },
  {
    id: "hw-kit",
    partNumber: "HWK-GEN-EU",
    category: "hardware",
    name: {
      de: "Hardware-Kit",
      en: "Hardware kit",
      zh: "五金件套件",
    },
    description: {
      de: "Schrauben, Ringe, Dichtungen für Wartung.",
      en: "Bolts, rings and seals for maintenance.",
      zh: "维护用螺栓、卡环与密封件。",
    },
  },
  {
    id: "swivel",
    partNumber: "SWK-GEN-EU",
    category: "hardware",
    name: {
      de: "Drehgelenk-Kit",
      en: "Swivel kit",
      zh: "旋转接头套件",
    },
    description: {
      de: "Reduziert Verdrillung von Seil und Kabel.",
      en: "Reduces twisting of rope and cable.",
      zh: "减少绳缆扭转。",
    },
  },
  {
    id: "mainboard-q2",
    partNumber: "PCB-Q2-MB",
    category: "electronics",
    image: "/images/configurator/part-mainboard.jpg",
    name: {
      de: "Mainboard Q2",
      en: "Q2 mainboard",
      zh: "Q2 主板",
    },
    description: {
      de: "Steuerplatine Q2 – Foto aus dem Servicebestand.",
      en: "Q2 control board – photo from service stock.",
      zh: "Q2 控制板——服务库存实拍。",
    },
  },
  {
    id: "coil-std",
    partNumber: "CC-STD-EU",
    category: "electronics",
    name: {
      de: "Spiralkabel Standard",
      en: "Coil cord standard",
      zh: "标准螺旋电缆",
    },
    description: {
      de: "Verbindung Griff – Steuerung.",
      en: "Handle-to-control connection.",
      zh: "手柄至控制连接。",
    },
  },
  {
    id: "kit-l1",
    partNumber: "KIT-L1-EU",
    category: "kits",
    name: {
      de: "Level 1 Wartungskit",
      en: "Level 1 maintenance kit",
      zh: "1 级维护套件",
    },
    description: {
      de: "Basis-Verschleißteile für planmäßige Inspektion.",
      en: "Basic wear parts for scheduled inspection.",
      zh: "计划巡检用基础易损件。",
    },
  },
  {
    id: "kit-l2",
    partNumber: "KIT-L2-EU",
    category: "kits",
    name: {
      de: "Level 2 Wartungskit",
      en: "Level 2 maintenance kit",
      zh: "2 级维护套件",
    },
    description: {
      de: "Erweitert: Seil, Hardware und ausgewählte Sensorik.",
      en: "Extended: rope, hardware and selected sensors.",
      zh: "扩展：绳索、五金与部分传感器。",
    },
  },
];

export function getPartById(id: string): CatalogPart | undefined {
  return catalogParts.find((p) => p.id === id);
}
