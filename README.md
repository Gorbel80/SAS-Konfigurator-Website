# SAS × WiMa – Website & Konfigurator

This repository contains **two independent Next.js applications**:

| Folder | Purpose |
|--------|---------|
| [`website/`](./website) | Public multilingual marketing site (Home, Über uns, Kontakt, legal pages, CMS) |
| [`konfigurator/`](./konfigurator) | Standalone 3D G-Force configurator |

They do **not** share runtime code. You can deploy or upload each folder separately.

## Why two folders?

- Upload **only `website/`** to All-Inkl (or any host) without 3D dependencies
- Deploy **konfigurator/** as its own app when needed
- Clear ownership of code and dependencies

## Local development

### Website (port 3000)

```bash
cd website
npm install
npm run dev
```

### Configurator (port 3001)

```bash
cd konfigurator
npm install
npm run dev
```

## Vercel

Create two Vercel projects (or one for website only):

1. **Website** – Root Directory: `website`
2. **Konfigurator** – Root Directory: `konfigurator`  
   Set `NEXT_PUBLIC_WEBSITE_URL` to the live website URL.

## Partners

- **WiMa Industrie-Automation GmbH** — Wetter (58300)
- **SAS Sauer-Automation Sachsen** — Hohndorf (09394)
