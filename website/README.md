# SAS × WiMa – Public Website

Standalone marketing website for European service expertise around **Gorbel G-Force®** and **Easy Arm®**.

This folder is **independent** of the 3D configurator and can be uploaded or deployed on its own (e.g. All-Inkl, Vercel).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (DE default, EN, ZH)
- Optional file-based CMS (`data/content.json`) + `/admin`

## Pages

| Route | Description |
|-------|-------------|
| `/{locale}` | Home – hero & offerings |
| `/{locale}/ueber-uns` | About WiMa × SAS |
| `/{locale}/contact` | Contact |
| `/{locale}/impressum` | Legal notice |
| `/{locale}/datenschutz` | Privacy |
| `/admin` | Hidden CMS (not in public nav) |

Locales: `de`, `en`, `zh`.

## Getting started

```bash
cd website
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/de`).

```bash
npm run build
npm start
```

## Environment

Copy `.env.example` to `.env.local`:

```env
ADMIN_PASSWORD=choose-a-strong-password
ADMIN_SECRET=random-long-string-for-session-signing
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Deploy notes

- **Vercel:** set project Root Directory to `website`
- **All-Inkl / Node host:** upload only this `website` folder, run `npm install && npm run build && npm start`
