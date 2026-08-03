import type { Capacity, LocalizedString, Product, ProductHotspot } from "@/lib/types";
import { spareParts } from "./spare-parts";

const CAPACITIES: Capacity[] = [75, 150, 300, 600];

function l(
  de: string,
  en: string,
  zh: string
): LocalizedString {
  return { de, en, zh };
}

function defaultHotspots(capacity: Capacity): ProductHotspot[] {
  const ropeId =
    capacity === 75
      ? "sp-wra-75"
      : capacity === 150
        ? "sp-wra-150"
        : capacity === 300
          ? "sp-wra-300"
          : "sp-wra-600";

  return [
    {
      sparePartId: ropeId,
      x: 48,
      y: 22,
      label: l("Drahtseil", "Wire Rope", "钢丝绳"),
    },
    {
      sparePartId: "sp-coil-std",
      x: 62,
      y: 48,
      label: l("Spiralkabel", "Coil Cord", "螺旋电缆"),
    },
    {
      sparePartId: "sp-handle-float",
      x: 52,
      y: 78,
      label: l("Griff", "Handle", "手柄"),
    },
    {
      sparePartId: "sp-swivel",
      x: 48,
      y: 58,
      label: l("Drehgelenk", "Swivel", "旋转接头"),
    },
    {
      sparePartId: "sp-sensor-load",
      x: 38,
      y: 35,
      label: l("Lastsensor", "Load Sensor", "载荷传感器"),
    },
    {
      sparePartId: "sp-hw-kit",
      x: 28,
      y: 50,
      label: l("Hardware", "Hardware", "五金件"),
    },
  ];
}

function partsForSeries(
  series: "viplus" | "vi" | "q2" | "iq2" | "q" | "iq",
  capacity: Capacity
): string[] {
  const rope =
    capacity === 75
      ? "sp-wra-75"
      : capacity === 150
        ? "sp-wra-150"
        : capacity === 300
          ? "sp-wra-300"
          : "sp-wra-600";

  const base = [rope, "sp-coil-std", "sp-hw-kit", "sp-sensor-limit", "sp-kit-l1"];

  if (series === "viplus" || series === "vi") {
    return [
      ...base,
      "sp-coil-ext",
      "sp-handle-float",
      "sp-handle-inline",
      "sp-handle-std",
      "sp-swivel",
      "sp-sensor-load",
      "sp-kit-l2",
      "sp-kit-l3",
    ];
  }
  if (series === "iq2" || series === "iq") {
    return [
      ...base,
      "sp-handle-float",
      "sp-swivel",
      "sp-sensor-load",
      "sp-kit-l2",
      "sp-kit-l3",
    ];
  }
  // q2 / q
  return [
    ...base,
    "sp-handle-std",
    "sp-ctrl-pendant",
    "sp-swivel",
    "sp-kit-l2",
  ];
}

type SeriesDef = {
  key: "viplus" | "vi" | "q2" | "iq2" | "q" | "iq";
  seriesId: string;
  code: string;
  name: LocalizedString;
  description: LocalizedString;
  tags: string[];
};

const SERIES_DEFS: SeriesDef[] = [
  {
    key: "viplus",
    seriesId: "vi-viplus",
    code: "ViPlus",
    name: l("G-Force ViPlus", "G-Force ViPlus", "G-Force ViPlus"),
    description: l(
      "Neueste ViPlus-Generation – maximale Präzision, erweiterte Sensorik und Float-Mode.",
      "Latest ViPlus generation – maximum precision, advanced sensing and float mode.",
      "最新 ViPlus 一代——最高精度、先进传感与悬浮模式。"
    ),
    tags: ["g-force", "viplus", "current"],
  },
  {
    key: "vi",
    seriesId: "vi-viplus",
    code: "Vi",
    name: l("G-Force Vi", "G-Force Vi", "G-Force Vi"),
    description: l(
      "Vi-Serie – aktuelle Generation mit hoher Regelgüte und erweiterter Ergonomie.",
      "Vi series – current generation with high control quality and advanced ergonomics.",
      "Vi 系列——当前一代，高控制品质与先进人机工程。"
    ),
    tags: ["g-force", "vi", "current"],
  },
  {
    key: "q2",
    seriesId: "q2-iq2",
    code: "Q2",
    name: l("G-Force Q2", "G-Force Q2", "G-Force Q2"),
    description: l(
      "Q2-Serie – bewährte Mittelgeneration, weit verbreitet in der Fertigung.",
      "Q2 series – proven mid-generation, widely used in manufacturing.",
      "Q2 系列——成熟中期型号，制造业广泛使用。"
    ),
    tags: ["g-force", "q2"],
  },
  {
    key: "iq2",
    seriesId: "q2-iq2",
    code: "iQ2",
    name: l("G-Force iQ2", "G-Force iQ2", "G-Force iQ2"),
    description: l(
      "iQ2-Serie – intelligente Steuerung der Q2-Generation mit Float-Fähigkeit.",
      "iQ2 series – intelligent control of the Q2 generation with float capability.",
      "iQ2 系列——Q2 一代智能控制，具备悬浮能力。"
    ),
    tags: ["g-force", "iq2"],
  },
  {
    key: "q",
    seriesId: "q-iq",
    code: "Q",
    name: l("G-Force Q (Legacy)", "G-Force Q (Legacy)", "G-Force Q（旧款）"),
    description: l(
      "Legacy Q-Serie – weiterhin viele Einheiten in Europa. Ersatzteile und Service verfügbar.",
      "Legacy Q series – many units still in Europe. Spare parts and service available.",
      "旧款 Q 系列——欧洲仍有大量设备。备件与服务可用。"
    ),
    tags: ["g-force", "q", "legacy"],
  },
  {
    key: "iq",
    seriesId: "q-iq",
    code: "iQ",
    name: l("G-Force iQ (Legacy)", "G-Force iQ (Legacy)", "G-Force iQ（旧款）"),
    description: l(
      "Legacy iQ-Serie – intelligente Vorgänger-Generation mit breiter Installationsbasis.",
      "Legacy iQ series – intelligent predecessor generation with a large installed base.",
      "旧款 iQ 系列——智能前代型号，安装基数大。"
    ),
    tags: ["g-force", "iq", "legacy"],
  },
];

function buildGForceProducts(): Product[] {
  const products: Product[] = [];

  for (const s of SERIES_DEFS) {
    for (const capacity of CAPACITIES) {
      const id = `gf-${s.key}-${capacity}`;
      const slug = `g-force-${s.key}-${capacity}`;
      products.push({
        id,
        slug,
        categoryId: "g-force",
        seriesId: s.seriesId,
        name: {
          de: `${s.name.de} ${capacity} kg`,
          en: `${s.name.en} ${capacity} kg`,
          zh: `${s.name.zh} ${capacity} kg`,
        },
        description: s.description,
        capacity,
        partNumber: `GF-${s.code.toUpperCase().replace(/\s/g, "")}-${capacity}`,
        sparePartIds: partsForSeries(s.key, capacity),
        hotspots: defaultHotspots(capacity).map((h) => {
          // Legacy series prefer standard handle hotspot
          if (
            (s.key === "q" || s.key === "q2") &&
            h.sparePartId === "sp-handle-float"
          ) {
            return {
              ...h,
              sparePartId: "sp-handle-std",
              label: l("Griff", "Handle", "手柄"),
            };
          }
          return h;
        }),
        tags: [...s.tags, `${capacity}kg`],
        imageHint: `industrial intelligent lifting device ${s.code} ${capacity}kg`,
      });
    }
  }

  return products;
}

const easyArmProducts: Product[] = [
  {
    id: "ea-standard-150",
    slug: "easy-arm-150",
    categoryId: "easy-arm",
    name: l("Easy Arm 150 kg", "Easy Arm 150 kg", "Easy Arm 150 kg"),
    description: l(
      "Easy Arm Gelenkarm 150 kg – präzises Handling mit intelligenter Unterstützung.",
      "Easy Arm articulating arm 150 kg – precise handling with intelligent assist.",
      "Easy Arm 关节臂 150 kg——智能助力精准搬运。"
    ),
    capacity: 150,
    partNumber: "EA-STD-150",
    sparePartIds: [
      "sp-wra-150",
      "sp-coil-std",
      "sp-handle-inline",
      "sp-hw-kit",
      "sp-ctrl-pendant",
      "sp-kit-l1",
    ],
    hotspots: [
      {
        sparePartId: "sp-wra-150",
        x: 45,
        y: 30,
        label: l("Drahtseil", "Wire Rope", "钢丝绳"),
      },
      {
        sparePartId: "sp-handle-inline",
        x: 55,
        y: 75,
        label: l("Inline-Griff", "Inline Handle", "直列手柄"),
      },
      {
        sparePartId: "sp-hw-kit",
        x: 30,
        y: 45,
        label: l("Hardware", "Hardware", "五金件"),
      },
      {
        sparePartId: "sp-ctrl-pendant",
        x: 68,
        y: 60,
        label: l("Steuerung", "Control", "控制"),
      },
    ],
    tags: ["easy-arm", "150kg"],
    imageHint: "industrial articulated arm 150kg",
  },
  {
    id: "ea-standard-300",
    slug: "easy-arm-300",
    categoryId: "easy-arm",
    name: l("Easy Arm 300 kg", "Easy Arm 300 kg", "Easy Arm 300 kg"),
    description: l(
      "Easy Arm Gelenkarm 300 kg – für schwerere Bauteile in der Montage.",
      "Easy Arm articulating arm 300 kg – for heavier components in assembly.",
      "Easy Arm 关节臂 300 kg——适用于装配中较重部件。"
    ),
    capacity: 300,
    partNumber: "EA-STD-300",
    sparePartIds: [
      "sp-wra-300",
      "sp-coil-std",
      "sp-handle-inline",
      "sp-hw-kit",
      "sp-ctrl-pendant",
      "sp-kit-l1",
      "sp-kit-l2",
    ],
    hotspots: [
      {
        sparePartId: "sp-wra-300",
        x: 45,
        y: 28,
        label: l("Drahtseil", "Wire Rope", "钢丝绳"),
      },
      {
        sparePartId: "sp-handle-inline",
        x: 55,
        y: 75,
        label: l("Inline-Griff", "Inline Handle", "直列手柄"),
      },
      {
        sparePartId: "sp-hw-kit",
        x: 30,
        y: 45,
        label: l("Hardware", "Hardware", "五金件"),
      },
      {
        sparePartId: "sp-ctrl-pendant",
        x: 68,
        y: 60,
        label: l("Steuerung", "Control", "控制"),
      },
    ],
    tags: ["easy-arm", "300kg"],
    imageHint: "industrial articulated arm 300kg",
  },
];

/** Standalone handle products for Handles & Controls library */
const handleProducts: Product[] = [
  {
    id: "hdl-float",
    slug: "handle-float-mode-unit",
    categoryId: "handles-controls",
    name: l("Float-Mode Griff", "Float Mode Handle", "悬浮模式手柄"),
    description: l(
      "Eigenständiger Float-Mode Griff als Ersatz- oder Upgrade-Komponente.",
      "Standalone float mode handle as replacement or upgrade component.",
      "独立悬浮模式手柄，作为更换或升级组件。"
    ),
    capacity: 300,
    partNumber: "HDL-FLT-EU",
    sparePartIds: ["sp-handle-float", "sp-coil-std", "sp-hw-kit"],
    tags: ["handle", "float"],
    imageHint: "ergonomic float mode handle",
  },
  {
    id: "hdl-std",
    slug: "handle-standard-unit",
    categoryId: "handles-controls",
    name: l("Standard-Bediengriff", "Standard Control Handle", "标准操作手柄"),
    description: l(
      "Klassischer Zwei-Tasten-Bediengriff.",
      "Classic two-button control handle.",
      "经典双按钮操作手柄。"
    ),
    capacity: 300,
    partNumber: "HDL-STD-EU",
    sparePartIds: ["sp-handle-std", "sp-coil-std", "sp-hw-kit"],
    tags: ["handle", "standard"],
    imageHint: "standard control handle",
  },
  {
    id: "hdl-inline",
    slug: "handle-inline-unit",
    categoryId: "handles-controls",
    name: l("Inline-Griff", "Inline Handle", "直列式手柄"),
    description: l(
      "Inline-Griff für kompakte Arbeitsplätze.",
      "Inline handle for compact workstations.",
      "适用于紧凑工位的直列式手柄。"
    ),
    capacity: 150,
    partNumber: "HDL-INL-EU",
    sparePartIds: ["sp-handle-inline", "sp-coil-std", "sp-hw-kit"],
    tags: ["handle", "inline"],
    imageHint: "inline industrial handle",
  },
];

/** Kit showcase products for Spare Parts library */
const kitProducts: Product[] = [
  {
    id: "kit-l1-show",
    slug: "level-1-maintenance-kit",
    categoryId: "spare-parts",
    name: l("Level 1 Wartungskit", "Level 1 Maintenance Kit", "1 级维护套件"),
    description: l(
      "Basis-Wartungspaket für planmäßige Inspektionen.",
      "Basic maintenance package for scheduled inspections.",
      "计划巡检用基础维护包。"
    ),
    capacity: 300,
    partNumber: "KIT-L1-EU",
    sparePartIds: ["sp-kit-l1", "sp-hw-kit", "sp-coil-std"],
    tags: ["kit", "level-1"],
    imageHint: "level 1 maintenance kit",
  },
  {
    id: "kit-l2-show",
    slug: "level-2-maintenance-kit",
    categoryId: "spare-parts",
    name: l("Level 2 Wartungskit", "Level 2 Maintenance Kit", "2 级维护套件"),
    description: l(
      "Erweitertes Wartungspaket inkl. Seil und Sensorik.",
      "Extended maintenance package including rope and sensors.",
      "含绳索与传感器的扩展维护包。"
    ),
    capacity: 300,
    partNumber: "KIT-L2-EU",
    sparePartIds: ["sp-kit-l2", "sp-wra-300", "sp-sensor-load", "sp-hw-kit"],
    tags: ["kit", "level-2"],
    imageHint: "level 2 maintenance kit",
  },
  {
    id: "kit-l3-show",
    slug: "level-3-overhaul-kit",
    categoryId: "spare-parts",
    name: l("Level 3 Überholungskit", "Level 3 Overhaul Kit", "3 级大修套件"),
    description: l(
      "Vollständiges Überholungspaket für Generalüberholung.",
      "Complete overhaul package for major rebuilds.",
      "全面大修用完整大修包。"
    ),
    capacity: 300,
    partNumber: "KIT-L3-EU",
    sparePartIds: [
      "sp-kit-l3",
      "sp-wra-300",
      "sp-coil-std",
      "sp-handle-float",
      "sp-swivel",
      "sp-sensor-load",
      "sp-hw-kit",
    ],
    tags: ["kit", "level-3"],
    imageHint: "level 3 overhaul kit",
  },
];

export const products: Product[] = [
  ...buildGForceProducts(),
  ...easyArmProducts,
  ...handleProducts,
  ...kitProducts,
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductsBySeries(seriesId: string): Product[] {
  return products.filter((p) => p.seriesId === seriesId);
}

export function getProductsByCapacity(capacity: Capacity): Product[] {
  return products.filter((p) => p.capacity === capacity);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter((p) => {
    const hay = [
      p.id,
      p.slug,
      p.partNumber,
      p.name.de,
      p.name.en,
      p.name.zh,
      ...p.tags,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

/** Validate that every product sparePartId exists (dev helper). */
export function validateCatalog(): string[] {
  const issues: string[] = [];
  const partIds = new Set(spareParts.map((s) => s.id));
  for (const p of products) {
    for (const sid of p.sparePartIds) {
      if (!partIds.has(sid)) {
        issues.push(`Product ${p.id} references missing spare part ${sid}`);
      }
    }
    for (const h of p.hotspots ?? []) {
      if (!partIds.has(h.sparePartId)) {
        issues.push(
          `Product ${p.id} hotspot references missing spare part ${h.sparePartId}`
        );
      }
    }
  }
  return issues;
}
