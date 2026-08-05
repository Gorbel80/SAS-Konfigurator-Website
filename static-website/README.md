# Static assets

Files here are copied as-is into the website root on build.

```
public/
  images/
    brand/     logos (configurator header)
    site/      hero, service, gforce, contact, about, parts photos
  models/
    profiles/  3D .glb files for the configurator
  favicon / other root files
```

## Replacing a photo

1. Put the new file in the right folder (e.g. `images/site/hero.webp`).  
2. Prefer WebP for size; keep the same filename if possible.  
3. If you change the filename, update the path in `src/content/default-content.ts` → `images`.  
4. Rebuild: `npm run export:static`.
