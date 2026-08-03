/** Shared domain types for the product catalog and configurator. */

export type Locale = "de" | "en" | "zh";

export type LocalizedString = Record<Locale, string>;

export type Capacity = 75 | 150 | 300 | 600;

export type SparePartCategory =
  | "wire-rope"
  | "coil-cord"
  | "handle"
  | "hardware"
  | "swivel"
  | "sensor"
  | "kit-l1"
  | "kit-l2"
  | "kit-l3"
  | "control"
  | "other";

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  /** Short label for library cards */
  shortName: LocalizedString;
  parentId?: string;
  order: number;
  /** Tailwind-friendly accent token for card visuals */
  accent: string;
  imageHint: string;
}

export interface Series {
  id: string;
  slug: string;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  /** e.g. "newest", "legacy" */
  status: "current" | "legacy" | "discontinued";
  order: number;
}

export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  seriesId?: string;
  name: LocalizedString;
  description: LocalizedString;
  capacity: Capacity;
  partNumber: string;
  /** IDs of spare parts compatible with this product */
  sparePartIds: string[];
  /** Hotspot markers for workshop visual (percentage positions) */
  hotspots?: ProductHotspot[];
  tags: string[];
  imageHint: string;
}

export interface ProductHotspot {
  sparePartId: string;
  /** 0–100 horizontal position on the product visual */
  x: number;
  /** 0–100 vertical position on the product visual */
  y: number;
  label: LocalizedString;
}

export interface SparePart {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  partNumber: string;
  category: SparePartCategory;
  compatibleProductIds: string[];
  compatibleCapacities?: Capacity[];
  level?: 1 | 2 | 3;
  imageHint: string;
  notes?: LocalizedString;
}

export interface ServiceRequestContext {
  productId?: string;
  productName?: string;
  sparePartId?: string;
  sparePartName?: string;
  partNumber?: string;
  capacity?: number;
  series?: string;
}
