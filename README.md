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

## Layout & Modules

- **Universal 5-Foot Modular Grid**: All modules are built on strict 10', 15', and 20' exterior widths × 10' depth × 10' height:
  - **Pod Type A** (20'W × 10'D × 10'H Twin Standard): Two solo guest pods sharing an interlocking center bunk spine, virtual skylights, shoji closets, and dual PDLC smart mirror-windows.
  - **Pod Type B** (10'W × 10'D × 10'H Twin-Suite Bath Core): Two independent 5'×10' private full bathrooms located in the central building core.
  - **Pod Type C** (10'W × 10'D × 10'H Executive Solo): Solo queen-width berth, 5' executive workstation desk, mini-fridge/espresso tower, and 4'×7.2' PDLC smart mirror-window.
  - **Pod Type D** (15'W × 10'D × 10'H Couples Micro-Suite): Dedicated Queen bed, loveseat breakfast banquette, vanity/desk, full hospitality credenza, and 5'×7.2' PDLC smart mirror-window.
  - **Pod Type E** (20'W × 10'D × 10'H Family Quad Bunk): Dual 2-tier bunk stacks (4 private sleeping berths with acoustic curtains), drop-leaf dining/game table, 4 lockable family lockers, and dual smart mirror-windows.
  - **Central Core Cargo Lift & Rigging Shaft** (12'W × 14'D hoistway): 10,000 lb Class C-3 freight elevator (10'×12' cab, 8' bi-parting doors) connecting Lower 1 delivery dock to all levels for 4-to-6 hour pod swap-outs.
  - **Panelized Cassette Prefabrication**: All pods break down into 5'×10' flat-pack wall, floor, and ceiling cassettes (cold-formed steel frames, cam-lock fasteners, quick-disconnect Wago/PEX harnesses) transported on wheeled A-frame carts down the 6' concourse.
  - **PDLC Smart-Glass Mirror-Windows**: Unpowered = 100% private reflective mirror; powered (12V) = transparent panoramic window overlooking the Peoria river bluffs and skyline.
- **900 NE Jefferson Campus** (1.49-Acre Sloped Site): 9-level campus (2 banked lower levels + 7 above grade), Men's Sento Bathhouse, Women's Sanctuary Spa, Central Glass-Roof Lap Pool Atrium, Street Bodega & Coffeeshop, and Twin Rooftop Sky Decks.

## Docs

- `docs/blueprints/` — dimensioned architectural plan sheets & 3D viewers (HTML/SVG/WebGL):
  - `campus_rendering_3d.html` — **Interactive 3D Architectural Exterior & Site Rendering** (Sloped 1.49-acre campus, retail glass, central atrium pool, twin towers, sky decks, day/night, zoning planes)
  - `campus_master_plan.html` — Complete 8-sheet architectural blueprint set (Civil, Section, Plans, Core, Matrix, Lift, Sheet R-1 Rendering Perspective & Code Matrix)
  - `pod_type_b_bath.html` — 10'×10' Full Bathroom Pod blueprints
  - `pod_type_a.html` — Twin Sleeping Pod blueprints & MEP notes
  - `pod_type_a_iso.html` — Standalone SVG isometric dollhouse cutaways
- `docs/engineering/` — engineering, structural, MEP, statutory zoning & cost basis:
  - `ZONING_CODE_COMPLIANCE.md` — **Peoria UDC PUD, IBC 2021 (510.2 Podium), Illinois Accessibility Code (ADA), NFPA 101/13 Basis**
  - `SUITE_VARIETY_SPEC.md` — 5-Foot Modular Grid, Suite Profiles, Cargo Lift & Panelized Prefabrication
  - `CAMPUS_MASTER_PLAN.md` — Civil, slope engineering, 9-level stack, cargo lift & swap-out protocol
  - `COST_ANALYSIS.md` — Detailed bill of materials, trade breakdown & ROI models
  - `BATH_POD_BASIS.md` — Plumbing DFU/WSFU, 140°F elastomeric seals & ventilation
  - `ENGINEERING_BASIS.md` — Primary MEP/structural assumptions

## Status

Preliminary design, 3D modeling, and master planning complete. Stamped engineering and PE/SE review required for construction documents.
