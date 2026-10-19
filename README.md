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
  - **Twin Tower Cargo Lifts & Rigging Shafts** (Two 12'W × 14'D hoistways): Dedicated 10,000 lb Class C-3 freight elevators in each tower (CL-1 North & CL-2 South; 10'×12' cab, 8' bi-parting doors) connecting Lower 1 delivery docks to all levels for 4-to-6 hour pod swap-outs with zero cross-atrium traffic.
  - **Panelized Cassette Prefabrication**: All pods break down into 5'×10' flat-pack wall, floor, and ceiling cassettes (cold-formed steel frames, cam-lock fasteners, quick-disconnect Wago/PEX harnesses) transported on wheeled A-frame carts down the 6' concourse.
  - **PDLC Smart-Glass Mirror-Windows**: Unpowered = 100% private reflective mirror; powered (12V) = transparent panoramic window overlooking the Peoria river bluffs and skyline.
- **900 NE Jefferson Campus** (1.49-Acre Sloped Site, Peoria, IL 61603):
  - **Zoned R-6 Multi-Family High-Density** with full block (380'-0") of NE Jefferson Avenue frontage, 0.58 miles from OSF Saint Francis Medical Center.
  - **100% Cleared Shovel-Ready Lots** ready for immediate construction with zero demolition delays.
  - **5 Municipal Water Supplies & 5 Sanitary Sewer Outfalls** for dedicated zoning load segregation (Residential West, Residential East, Commercial Laundry/BOH, Spa/Pool, and Retail/NFPA 13 Fire Riser) saving ~$200k in off-site municipal extension fees.
  - **10-Level Hillside Program** (3 subgrade levels: Lower 3 Data Center/Heavy MEP, Lower 2 Staff Amenities Hub/Laundry Plant, Lower 1 Parking/Loading Bay + 7 levels above grade), Men's Sento Bathhouse, Women's Sanctuary Spa, Central Glass-Roof Lap Pool Atrium, Street Bodega & Coffeeshop, and Twin Rooftop Sky Decks.

## Docs

- `docs/blueprints/` — dimensioned architectural plan sheets & 3D viewers (HTML/SVG/WebGL):
  - `cad_blueprint_suite.html` — **ARCH D (36"×24") Architectural CAD Blueprint Suite** (Pan/Zoom, Caliper Distance Measure Tool, AIA Layer Manager, Blueprint/Blackline Toggle, Vector Print, and Direct AutoCAD DXF Export)
  - `campus_rendering_3d.html` — **Interactive 3D Architectural Exterior & Site Rendering** (Sloped 1.49-acre campus, retail glass, central atrium pool, twin towers, sky decks, day/night, zoning planes)
  - `campus_master_plan.html` — **Complete 9-Sheet Architectural Blueprint Set** (Civil, 10-Level Section, Plans, Core, Matrix, Lift, Sheet A-8 Subgrade Data Center & Staff Hub, Sheet R-1 Rendering Perspective & Code Matrix)
  - `pod_type_b_bath.html` — 10'×10' Full Bathroom Pod blueprints
  - `pod_type_a.html` — Twin Sleeping Pod blueprints & MEP notes
  - `pod_type_a_iso.html` — Standalone SVG isometric dollhouse cutaways
- `docs/cad/` — **AutoCAD R12/2000 DXF Vector CAD Files (AIA Layer Standard)**:
  - `campus_deck5_residential_plan.dxf` — 1:1 AutoCAD vector drawing with layers (`A-WALL`, `A-DOOR`, `A-GLAZ`, `A-ELEV-CARGO`, `A-GRID`, `A-DIMS`, `A-TEXT`)
  - `campus_10level_section.dxf` — 1:1 AutoCAD vector drawing with 10 floor elevations (NAVD88), twin hoistways & atrium
- `docs/engineering/` — engineering, structural, MEP, statutory zoning & cost basis:
  - `LIGHTING_CIRCADIAN_SPEC.md` — **3-Layer Lighting (Ambient/Task/Accent), Lux Calculations, 24-Hour Circadian Kelvin Curve & STC Acoustics**
  - `CONTRACTOR_SPEC_SCHEDULE.md` — **CSI MasterFormat Contractor Specification Schedule, Room-by-Room Finishes, MEP Drops & GC Phasing**
  - `DATA_CENTER_STAFF_FACILITIES.md` — **Mission-Critical Server Room / MDF (8x 42U Racks, N+1 CRAC, 120 kVA UPS, Novec 1230 gas, Biometric Man-Trap) & Staff Amenities Hub (Breakroom w/ kitchenette, nap pods, locker rooms w/ showers)**
  - `ZONING_CODE_COMPLIANCE.md` — **Peoria UDC PUD, IBC 2021 (510.2 Podium), Illinois Accessibility Code (ADA), NFPA 101/13 Basis**
  - `SUITE_VARIETY_SPEC.md` — 5-Foot Modular Grid, Suite Profiles, Cargo Lift & Panelized Prefabrication
  - `CAMPUS_MASTER_PLAN.md` — Civil, slope engineering, 10-level stack, cargo lift & swap-out protocol
  - `COST_ANALYSIS.md` — Detailed bill of materials, trade breakdown & ROI models
  - `BATH_POD_BASIS.md` — Plumbing DFU/WSFU, 140°F elastomeric seals & ventilation
  - `ENGINEERING_BASIS.md` — Primary MEP/structural assumptions

## Status

Preliminary design, 3D modeling, and master planning complete. Stamped engineering and PE/SE review required for construction documents.
