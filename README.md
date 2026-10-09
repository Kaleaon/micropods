# MicroPods — Pod Type A

20'W × 10'D × 10'H twin-pod micro-hotel unit. Two 8'×10' guest pods sharing a
center bunk spine (lower berth → Pod A, upper berth → Pod B).

## Webapp

Interactive 3D viewer with real-time PBR rendering (Three.js):

```bash
npm install
npm run dev      # local dev server
npm run build    # self-contained dist/index.html (single file, works offline)
```

Open `dist/index.html` directly — no server needed.

## Layout

- **Pod A / Pod B** (8'×10' each): entry door with frosted transom + keypad,
  4' shoji closet, 2'×2' water/air column, 4' shelving with microwave/air-fryer
  niche, flat 4'×2' desk with full-width mirror, virtual skylight
- **Bunk spine** (4'×7'×10'): lower + upper berths with privacy curtains,
  per-berth touchpad, 32" TV, headboard shelf with Qi2 + USB, LED cove lighting
- **Water column**: espresso / hot / cold / sparkling / nugget ice dispenser
  with handwashing basin below

## Docs

- `docs/blueprints/` — dimensioned plan sheets (HTML) + concept render
- `docs/engineering/` — preliminary MEP/structural/fire engineering basis
  (NOT for construction — requires licensed PE/ architect review)

## Status

Preliminary design. See `docs/engineering/ENGINEERING_BASIS.md` for
assumptions and open items.
