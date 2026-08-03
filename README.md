# SAS × WiMa – Service & Spare Parts Website

Modern industrial B2B website for **European service and spare parts expertise** for G-Force / Easy Arm intelligent lifting devices.

**Operators**

- **WiMa Industrie-Automation GmbH** (Wetter, Germany)
- **SAS Sauer-Automation Sachsen** (Hohndorf, Germany)

They operate the complete European spare parts warehouse and provide qualified service. This site is an **independent** spare parts and service presentation — it does **not** use manufacturer logos or official brand assets.

Contact: **info@sas-mail.de**

---

## Project overview

The heart of the product is a **Product Configurator** (inspired by mecabricks-style part libraries):

1. Browse categorized product libraries (G-Force series, Easy Arm, Handles, Spare Parts & Kits, Own Products)
2. Select a unit (e.g. G-Force ViPlus 300 kg)
3. Open the **Workshop editor** — large visual stage + hotspots + spare-part cards
4. Select a sub-component and start a **service / quote request** with pre-filled context

### Stack

| Layer | Technology |
|--------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | next-intl (DE default, EN, ZH) |
| Icons | lucide-react |
| Deploy | Vercel |

---

## Install & run locally

**Requirements:** Node.js 20+ and npm.

```bash
# Install dependencies
npm install

# Development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

Default locale is German. Open e.g.:

- http://localhost:3000/de
- http://localhost:3000/en/configurator
- http://localhost:3000/de/configurator/g-force
- http://localhost:3000/de/configurator/workshop/gf-viplus-300

---

## Project structure

```
src/
  app/
    [locale]/                 # Locale-prefixed routes
      page.tsx                 # Home
      configurator/            # Library browser
      configurator/[category]/
      configurator/workshop/[productId]/
      about/
      contact/
      service-request/
    layout.tsx
    globals.css                # Design tokens
  components/
    configurator/              # Category/Product/Part cards, Workshop
    home/
    layout/                    # Header, Footer, LanguageSwitcher
    service/
    contact/
    ui/                        # Button, Badge, Input, placeholders
  data/
    categories.ts              # Libraries + series
    products.ts                # Units (G-Force, Easy Arm, …)
    spare-parts.ts             # Components & kits
  i18n/                        # next-intl routing & config
  messages/                    # de.json, en.json, zh.json
  lib/                         # types, utils
docs/
  DOCUMENTATION.md             # Full technical manual
```

---

## Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |

---

## Deep linking

External landing pages can open the configurator already focused:

| URL | Effect |
|-----|--------|
| `/de/configurator` | All libraries |
| `/de/configurator/g-force` | G-Force library |
| `/de/configurator/g-force?series=vi-viplus` | Filter Vi / ViPlus |
| `/de/configurator/g-force?capacity=300` | Filter 300 kg |
| `/de/configurator?manufacturer=gorbel` | Maps to G-Force focus |
| `/de/configurator/workshop/gf-viplus-300` | Workshop for ViPlus 300 kg |
| `/de/service-request?productId=gf-viplus-300&sparePartId=sp-wra-300` | Pre-filled service form |

---

## Deploy

### Vercel (recommended)

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com) (Framework preset: Next.js).
3. Deploy — no extra env vars required for the MVP.
4. Optional: connect custom domain for SAS / WiMa.

### Manual

```bash
npm run build
npm start
```

---

## Ownership & contact

| | |
|--|--|
| **Companies** | WiMa Industrie-Automation GmbH · SAS Sauer-Automation Sachsen |
| **Email** | info@sas-mail.de |
| **Locations** | Wetter (Ruhr) · Hohndorf |

For full architecture, data model, and how to extend the catalog, see **[docs/DOCUMENTATION.md](./docs/DOCUMENTATION.md)**.

---

## License & branding note

Internal project for WiMa / SAS. Independent service marketing only — do not add third-party manufacturer trademarks or logos without written permission.
