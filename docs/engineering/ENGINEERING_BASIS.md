# Micro-Pod Hotel Module — Engineering Basis
**Pod Type A | 20'W × 10'D × 10'H | Two sleeping pods + center bunk spine**
**Date:** 2026-09-30 | **Status:** Preliminary — not for construction

This document establishes the design criteria, applicable codes, and system
summary for full engineering of the pod module. It is a working basis for
licensed professionals (PE/SE) to develop stamped construction documents.
Nothing here is a substitute for stamped engineering.

---

## 1. Module Description (Basis of Design)

| Item | Value |
|---|---|
| Overall shell | 20' W × 10' D × 10' H |
| Pod A / Pod B | 8' × 10' each, sleeps 1 |
| Bunk spine | 4' × 7' × 10' center (lower berth → Pod A, upper berth → Pod B) |
| Entry | 3'×7' inward-swing door per pod, 4' vestibule, keypad + frosted transom |
| Structure (prelim) | Multi-layer plywood shell (OEM basis); structural system TBD by SE |
| Occupancy | Sleeping (hotel/dormitory) |

## 2. Applicable Codes & Standards (Peoria, IL — verify with AHJ)

- **IBC 2021** (Illinois has not adopted a statewide commercial code; Peoria enforces IBC 2018/2021 — confirm)
- **NEC 2023** (NFPA 70)
- **IMC 2021** (mechanical / ventilation)
- **IPC 2021** (plumbing)
- **IFC 2021** (fire — detection, egress)
- **ASHRAE 62.2** (dwelling-unit ventilation) / **62.1** (common areas)
- **ASHRAE 90.1** (energy)
- **ADA / ICC A117.1** (accessible units — facility needs compliant units; 8'×10' pods are unlikely to qualify, plan accessible variants)
- Illinois Plumbing Code (state-specific amendments)

> **Egress flag:** One inward-swinging door per pod as the sole egress path needs
> IBC Chapter 10 review (sleeping occupancies, travel distance, emergency escape).
> This is the highest-risk code item. Resolve with the architect/AHJ early.

## 3. Structural Basis (by SE)

- Dead loads: plywood shell + finishes + fixed equipment (microwave, water unit, bunks)
- Live loads: sleeping occupancy (IBC Table 1607.1 — 40 psf for residential sleeping, verify)
- Bunk spine: concentrated berth loads + ladder; design as load-bearing partition
- Lateral: wind/seismic per IBC Ch. 16 (Peoria — low seismic, wind-governed)
- Floor loading: OEM ships at 1,000 kg/packaging unit — verify floor capacity for point loads (water unit, heater, bunks)
- Foundation/anchorage: TBD (transportable vs. permanent — drives the entire structural approach)

## 4. Electrical Basis (per pod, preliminary)

| Circuit | Load | Notes |
|---|---|---|
| Microwave / air-fryer | 20A / 120V | Dedicated, GFCI |
| Induction burner | 20A / 120V | 1800W, GFCI |
| Environmental / water station | 20A / 120V | 1500–2200W instant-hot + controls, GFCI |
| Heat-treatment heater | 30A / 240V | 5 kW forced-air, per room, keypad lockout |
| Lighting + virtual skylight | 15A / 120V | ~180W skylight + berth reading lights |

- Pod feeder: 60A+ planning basis — **proper NEC Art. 220 load calc required** (see electrical calc sheet)
- Subpanel per pod; branch wiring in color-coded layers (as modeled in 3D WIRING view)
- Heat-treatment mode: room locked out via keypad, 140°F × 3 hrs — verify 140°F rating of ALL in-room electronics, filters, mattress, adhesives, finishes

## 5. Plumbing Basis (per pod)

- Sink: 15"×15"×6" RV sink → 1.5" drain, P-trap, vent per IPC
- Environmental station: 1/4" or 3/8" PEX supply; 1/2" drain; leak pan + moisture sensor + auto shutoff (per spec sheet SPEC-KLN-WD-2026-REV-8.0)
- DWV routing: sink drain → spine chase → building DWV; coordinate vent tie-in
- Water heater: none in pod (instant-hot at point of use)

## 6. HVAC / Ventilation Basis (open design item)

- Sealed pods REQUIRE mechanical ventilation — ASHRAE 62.2 dwelling-unit rate
- Preliminary: 40–120 CFM per environmental station spec (verify against 62.2 calc)
- Heating/cooling loads: TBD (Manual J basis) — the 5 kW heaters are heat-treatment only, not comfort HVAC
- Condensing dehumidification is in the env station spec — coordinate with ventilation strategy (ERV vs. exhaust-only)
- Filtration: H13 (8"×6"×1.5") in env station

## 7. Fire & Life Safety

- Detection: smoke + CO per IFC/IBC per sleeping unit
- Plywood fire rating: verify flame-spread / smoke-developed indices (ASTM E84); treatment or alternate may be required
- Pod-to-pod separation: acoustic + fire + thermal (detail TBD)
- Heat-treatment protocol is an operational procedure — needs fire-department review (140°F sustained)

## 8. Open Engineering Items (priority order)

1. **Egress/code analysis** — single door per pod (architect + AHJ)
2. **Ventilation design** — sealed pods, ASHRAE 62.2 rates, ERV vs exhaust
3. **NEC Art. 220 load calc + feeder sizing** — replace 60A planning figure
4. **Structural system** — transportable vs permanent drives everything
5. **Plumbing DWV routing** — sink + env station drains, venting
6. **140°F material verification** — every in-room component rated
7. **Acoustic/fire separation detail** — pod-to-pod, pod-to-spine

---

*Next: detailed calculation sheets per discipline.*
