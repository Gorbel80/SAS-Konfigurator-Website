# Technical & User Documentation

**SAS × WiMa Product Configurator Website**

This document is the full technical and operational manual for developers and content owners.

---

## 1. Goals & audience

### Business goal

Make European spare parts and service competence for intelligent lifting devices (G-Force / Easy Arm families) visible and usable. Industrial users (maintenance managers, production managers) must identify the right spare part quickly and request service or a quote.

### Independent positioning

- No official manufacturer logos or brand kits.
- Copy refers to product families and series generically.
- Footer and About pages state independent partner status.

### Primary user flow (MVP)

```
Home → Configurator libraries → Select G-Force unit
  → Workshop editor → Select sub-part → Service / quote request
```

---

## 2. Architecture

### High-level

```
┌─────────────────────────────────────────────────────────┐
│  Next.js App Router ([locale] segment)                  │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────────┐ │
│  │  Pages   │──│  Components  │──│  next-intl msgs   │ │
│  └────┬─────┘  └──────┬───────┘  └───────────────────┘ │
│       │               │                                  │
│  ┌────▼───────────────▼────┐                            │
│  │  Data layer (TS modules) │  ← database-ready models  │
│  │  categories / products /  │                            │
│  │  spare-parts              │                            │
│  └──────────────────────────┘                            │
└─────────────────────────────────────────────────────────┘
```

### Why TypeScript modules instead of a database?

For the MVP, catalog data lives in version-controlled TypeScript files under `src/data/`. Benefits:

- Instant deploys, full type safety, easy PR review
- No DB ops for early content
- Models are already shaped for a future Postgres / CMS import

### Key routes

| Route | Role |
|-------|------|
| `/[locale]` | Marketing home + CTA |
| `/[locale]/configurator` | Library overview / query deep links |
| `/[locale]/configurator/[category]` | Category library (series, capacity filters) |
| `/[locale]/configurator/workshop/[productId]` | Workshop editor |
| `/[locale]/about` | Companies & competence |
| `/[locale]/contact` | Contact form |
| `/[locale]/service-request` | Service form with optional product context |

### Middleware

`src/middleware.ts` uses `next-intl` to:

- Detect / enforce locale prefix (`de`, `en`, `zh`)
- Redirect `/` → default locale (`de`)

---

## 3. Design system

### Tokens (`src/app/globals.css`)

| Token | Role |
|-------|------|
| Anthracite scale (`--anthracite-*`) | Industrial dark surfaces & text |
| White / surface | Cards, forms, main canvas |
| Accent `#e85d04` | Trustworthy industrial orange CTAs |
| Sky | Capacity badges / secondary info |

### Typography

- **DM Sans** (Google Font) via `next/font`
- Strong hierarchy, large touch targets for factory tablets

### UI primitives

- `Button`, `Badge`, `Card`, `Input` / `Select` / `Textarea`
- `ProductPlaceholder` — structured visual stand-in until real photos exist (`data-image-hint` attribute for future asset mapping)

---

## 4. Product data model

### Types (`src/lib/types.ts`)

```ts
LocalizedString = { de, en, zh }

Category   // top-level library (g-force, easy-arm, …)
Series     // e.g. Vi/ViPlus, Q2/iQ2, Q/iQ
Product    // concrete unit at a capacity
SparePart  // component / kit
ProductHotspot // x/y % markers on workshop visual
```

### Capacities

Supported everywhere: **75 · 150 · 300 · 600 kg**.

### Categories (libraries)

1. `g-force` — Intelligent lifting devices  
2. `easy-arm` — Easy Arm  
3. `handles-controls` — Handles & controls  
4. `spare-parts` — Kits L1–L3 + showcase  
5. `own-products` — WiMa + SAS placeholder  

### Series (G-Force)

| ID | Status | Notes |
|----|--------|-------|
| `vi-viplus` | current | Newest generation |
| `q2-iq2` | current | Mid generation, wide install base |
| `q-iq` | legacy | Many units still in Europe |

### Product example

```ts
{
  id: "gf-viplus-300",
  slug: "g-force-viplus-300",
  categoryId: "g-force",
  seriesId: "vi-viplus",
  capacity: 300,
  partNumber: "GF-VIPLUS-300",
  sparePartIds: ["sp-wra-300", "sp-coil-std", …],
  hotspots: [{ sparePartId: "sp-wra-300", x: 48, y: 22, label: {…} }],
  …
}
```

### Spare part example

```ts
{
  id: "sp-wra-300",
  partNumber: "WRA-300-EU",
  category: "wire-rope",
  compatibleProductIds: ["gf-viplus-300", …],
  compatibleCapacities: [300],
  …
}
```

### Validation helper

`validateCatalog()` in `products.ts` checks that every product `sparePartId` / hotspot references an existing spare part.

---

## 5. How to add products & spare parts

### Add a spare part

1. Open `src/data/spare-parts.ts`.
2. Append a `SparePart` with a **stable** `id` (used in URLs and service context).
3. Provide `de` / `en` / `zh` strings.
4. Set `compatibleProductIds` (or update products later to include the new id).

### Add a G-Force capacity variant

1. Series generation is driven by `SERIES_DEFS` + `CAPACITIES` in `products.ts`.
2. To add a new series key, extend `SERIES_DEFS` and `partsForSeries()`.
3. Rebuild and smoke-test workshop deep links.

### Add a new library category

1. Add entry to `categories` in `categories.ts`.
2. Add products with matching `categoryId`.
3. Optional: series entries with `categoryId`.
4. Translations for UI chrome already use generic keys; product text is data-driven.

### Swap placeholders for real photos

1. Place assets under `public/images/products/` and `public/images/parts/`.
2. Extend `Product` / `SparePart` with e.g. `imageSrc?: string`.
3. Replace `ProductPlaceholder` usage with `next/image` when `imageSrc` is set (keep placeholder as fallback).
4. Use existing `imageHint` as a naming convention for asset files.

---

## 6. Configurator architecture

### Library browser (`ConfiguratorBrowser`)

- **Overview mode** — no category → grid of library cards  
- **Category mode** — filters: search, series chips, capacity  
- Deep-link inputs: `activeCategorySlug`, `initialSeriesSlug`, `initialCapacity`

### Deep-link map

| Pattern | Behavior |
|---------|----------|
| `/configurator` | All libraries |
| `/configurator/g-force` | G-Force products |
| `/configurator/g-force?series=vi-viplus&capacity=300` | Filtered |
| `/configurator?manufacturer=gorbel` | Treated as G-Force focus |
| `/configurator?category=easy-arm` | Easy Arm focus |

Landing pages for future “service portals” should prefer **path-based** category URLs for SEO and shareability.

---

## 7. Workshop / editor

### Layout

```
┌────────────────────────────────┬──────────────────┐
│  Toolbar (back, product, CTA)  │                  │
├────────────────────────────────┤  Detail panel    │
│  Visual stage + hotspots       │  (selected part) │
├────────────────────────────────┤                  │
│  Horizontal part card library  │  Quote / Service │
└────────────────────────────────┴──────────────────┘
```

### Interaction

1. User opens `/configurator/workshop/{productId}`.
2. Compatible spare parts load from data layer.
3. Clicking a **hotspot** or **part card** selects the part.
4. Detail panel shows description, part number, category, notes.
5. CTAs navigate to `/service-request` with query context:

```
?productId=gf-viplus-300&sparePartId=sp-wra-300&partNumber=WRA-300-EU
```

### Hotspots

Defined per product as percentage coordinates (`x`, `y` in 0–100) relative to the visual container. Adjust when real photos arrive so markers sit on the physical components.

---

## 8. Service request flow

1. Form fields: name, company, email, phone, urgency, message.
2. Sidebar shows product context when query params resolve to catalog entities.
3. Submit opens a **mailto:** to `info@sas-mail.de` with a structured body (MVP — no backend).

### Future: real backend

- `POST /api/service-request` → email (Resend/SendGrid) + CRM/ticket
- Persist requests in a database
- Optional file upload (photos of nameplates / damaged parts)

---

## 9. Internationalization

### Setup

- Plugin: `next-intl` via `next.config.ts` → `./src/i18n/request.ts`
- Locales: `de` (default), `en`, `zh`
- Messages: `src/messages/{locale}.json`
- Navigation helpers: `src/i18n/navigation.ts` (`Link`, `useRouter`, …)

### Content rules

| Content type | Where |
|--------------|--------|
| UI chrome (nav, buttons, labels) | `messages/*.json` |
| Catalog names/descriptions | `LocalizedString` on data objects |

### Adding a locale

1. Add code to `routing.ts` `locales`.
2. Add `src/messages/{code}.json`.
3. Translate all `LocalizedString` fields in data (or fall back carefully).
4. Test middleware redirects and language switcher.

---

## 10. Future extension points

| Area | Direction |
|------|-----------|
| **3D models** | Replace stage with Three.js / React Three Fiber; hotspots → mesh picks |
| **Database** | Move `src/data` to Postgres / Supabase; keep same TypeScript types as DTOs |
| **CMS** | Sanity / Payload for marketing pages; catalog can stay code or move to CMS |
| **Auth / dealer portal** | Role-based pricing, stock levels |
| **Stock API** | Show “available in European warehouse” badges |
| **PDF datasheets** | Attach per part number |
| **Analytics** | Track most-viewed series / parts for inventory planning |
| **Search** | Full-text (e.g. Typesense) across part numbers and translations |

---

## 11. Development conventions

- Prefer server components; mark `"use client"` only for interactive UI (workshop, forms, header menu).
- Stable IDs for products and spare parts — never reuse IDs for different real-world parts.
- Do not introduce manufacturer trademarks or logos without legal clearance.
- Keep industrial UX: large hit areas, clear part numbers, low visual noise.

---

## 12. Deployment checklist

1. `npm run build` passes  
2. Smoke paths: Home → Configurator → Workshop → Service request  
3. Locales DE / EN / ZH switch correctly  
4. Deep links for `g-force` + workshop product open correctly  
5. mailto service request includes context  
6. Push to GitHub → Vercel production deploy  

---

## 13. Contact

- **Email:** info@sas-mail.de  
- **WiMa:** Wetter (Ruhr)  
- **SAS:** Hohndorf  

Document version: MVP 1.0
