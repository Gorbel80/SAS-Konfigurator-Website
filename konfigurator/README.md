# SAS × WiMa – G-Force 3D Configurator

Standalone 3D configurator app (Parts Library, unit view, partlist).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- next-intl (DE / EN / ZH)
- Three.js + React Three Fiber + Drei

## Routes

| Route | Description |
|-------|-------------|
| `/{locale}` | Fullscreen configurator workshop |

Locales: `de`, `en`, `zh`.

## Getting started

```bash
cd konfigurator
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (redirects to `/de`).

## Environment

Copy `.env.example` to `.env.local`:

```env
# Marketing website used for “back” and “request” CTAs
NEXT_PUBLIC_WEBSITE_URL=https://your-website.example
```

## Deploy notes

- **Vercel:** set project Root Directory to `konfigurator`
- Keep this app separate from the public website for lighter marketing deploys
