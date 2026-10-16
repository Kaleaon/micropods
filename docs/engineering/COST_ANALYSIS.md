# Cost Analysis & Bill of Materials — Pod Type A
**Kaleaon / MicroPods — 20'W × 10'D × 10'H Twin-Pod Module | 2026-10-16 | Preliminary**

This document details the cost estimation, materials breakdown, and trade-off analysis for the **Pod Type A** design (two 8'×10' sleeping pods sharing a 4'×7'×10' center bunk spine), based on the MEP, structural, AV, and architectural specs.

---

## 1. Cost Summary (Per 2-Pod Module)

| Subsystem | Direct Materials / Equipment | Labor / Factory Integration | Total Estimated Range |
|---|---|---|---|
| **Structural Shell & Base Chassis** | $10,400 – $16,500 | $2,600 – $4,200 | $13,000 – $20,700 |
| **Sunlight-Emulation Panels (Custom Coffer, 2 units)** | $3,700 – $5,400 | $800 – $1,400 | $4,500 – $6,800 |
| **Smart Touch Panels & AV Controls** | $3,170 – $4,950 | $600 – $1,000 | $3,770 – $5,950 |
| **Water / Air Column (2x SPEC-KLN-WD-2026)** | $4,100 – $6,300 | $1,200 – $2,200 | $5,300 – $8,500 |
| **Bed-Bug Thermal Remediation (2x 5 kW)** | $2,350 – $3,900 | $800 – $1,400 | $3,150 – $5,300 |
| **Interior Millwork, Bunks, Shoji, Doors & Desk** | $8,200 – $13,000 | $2,800 – $4,600 | $11,000 – $17,600 |
| **MEP Rough-in, ERV, Sprinklers & Breakers** | $6,700 – $10,500 | $2,200 – $3,800 | $8,900 – $14,300 |
| **Totals Per Module (Twin Pod)** | **$38,620 – $60,550** | **$11,000 – $18,600** | **$49,620 – $79,150** |
| **Cost Per Guest Pod (1/2 Module)** | **$19,310 – $30,275** | **$5,500 – $9,300** | **$24,810 – $39,575** |

*Note: In production runs (10+ modules), direct materials and labor realize a 25–35% economy of scale, yielding ~$34,000 – $48,000 per module ($17,000 – $24,000 per guest pod).*

---

## 2. Key Systems Setup & Component Selection

### A. Sunlight-Emulation Panel (Virtual Skylight)
As specified in `src/components/skylight.js` and blueprint item #18:
- **Design:** 4'×9' dropped coffer tray, recessed 3'×8' luminous aperture.
- **Optics & Luminaire:** 3×8 array of 24 parabolic reflector cups with high-CRI (95+) 5000–6500K daylight COB LEDs + 2700–6500K tunable white matrix behind an opal/sky-gradient prismatic diffuser. Edge-lit ambient blue cove wash inside the tray.
- **Power & Control:** 180W peak per pod; 0–10V / DALI dual-channel circadian dimming.
- **Cost:** ~$1,850 – $2,700 per pod (~$3,700 – $5,400 for module).
- **140°F Note:** The LED drivers are mounted in the unheated spine chase cavity, protecting driver capacitors from thermal breakdown during heat-treatment mode.

### B. Smart Panels & Bedside Controls
Governed by `docs/engineering/AV_CONTROLS.md`:
- **Bedside Touchpad:** 8" PoE industrial Android touch panel (Rockchip RK3566/RK3576) rated for -20°C to 70°C (-4°F to 158°F). Survives the 140°F heat treatment without removal. ~$320 – $480 each.
- **TV:** 32" Commercial Hospitality LED with quick-release VESA mount (~$415 incl. mount). Staff unclips and carts TVs out prior to thermal remediation.
- **Bedside Accessories:** Drop-in Qi2 wireless pad ($25–$40, popped out during treatment) and Leviton commercial USB-A/C PD duplex ($35–$55, treated as periodic consumable).
- **Spine Chase Backbone:** 8-port Gigabit PoE+ switch, commercial WiFi 6 AP, Cat6 cabling ($450–$750 per module).

### C. Environmental & Water Station (SPEC-KLN-WD-2026-REV-8.0)
- **Recessed Footprint:** 28"H × 24"W × 8"D in the 2'×2' wet chase.
- **Sub-assemblies:**
  - Beverage: 40mm burr grinder + motorized espresso group.
  - Water: 3-stage TEC cascade cooling + 1200W flash-heater + carbonation.
  - Ice: Continuous 8 lb/day compact nugget ice auger engine.
  - Air & Water Filtration: 0.5µm carbon block, PEM ozone, UV-C chamber; H13 HEPA air filter with 40–120 CFM blower, condensing dehumidifier & ultrasonic humidifier.
  - Controls: 10.1" touchscreen w/ Matter/Thread support, ultrasonic level sensor, scale.
- **Cost:** ~$2,050 – $3,150 per unit in integrated custom build (~$4,100 – $6,300 per module).

### D. Bed-Bug Thermal Remediation System
Governed by `docs/engineering/ELEC_LOAD_CALC.md`:
- **Heaters:** Two 5 kW @ 240V forced-air heaters mounted below the lower bunk.
- **Air Path:** Return grille high on spine face (y 8–9) → sheet-metal chase ducting → heater → discharge grille low (y 0.5–1.4).
- **Safety & Interlocks:** Dual contactor interlock to disconnect normal room loads while 240V heaters run; high-temp limit cutoff (165°F); 212°F rated fire sprinkler heads to prevent false trip during 140°F cycle.
- **Cost:** ~$2,350 – $3,900 per module.
