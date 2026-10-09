# Ventilation Calculation — Pod Type A
**ASHRAE 62.2-2022 (dwelling-unit basis) + IMC | Per pod | 2026-09-30 | Preliminary**

## Why This Matters

The pods are designed as sealed, conditioned boxes (8'×10'×10' = 800 cu ft).
Without mechanical ventilation, CO₂, cooking effluent, and moisture accumulate
rapidly. This is the highest-priority open HVAC item.

## ASHRAE 62.2 Whole-Dwelling Rate (per pod)

Q_total = 0.03 × A_floor + 7.5 × (N_bedrooms + 1)

- A_floor = 80 sq ft (8' × 10')
- N_bedrooms = 1

Q = 0.03 × 80 + 7.5 × 2 = 2.4 + 15 = **17.4 CFM continuous**

> This is the code minimum. It is very low because the pod is tiny. For comfort,
> moisture control, and odor, **design to 30–40 CFM continuous** per pod.

## Kitchen Exhaust (microwave / air fryer — no stovetop)

*2026-10-01: induction burner and range hood removed. Cooking is microwave /
air-fryer only (enclosed appliances, no open-flame or grease-laden vapor
per IMC 507). No dedicated kitchen exhaust required.*

Air-fryer odor: handled by the continuous general ventilation + the env
station's carbon filtration (40–120 CFM recirculating).

## Bath / Moisture

No toilet/shower in pod (basin only). No 62.2 bath exhaust required. However:
- Breathing + air-fryer use in 800 cu ft → recommend the continuous 30–40 CFM
  general rate above, which handles moisture.
- Env station includes condensing dehumidification — coordinate so the
  ventilation and dehumidification don't fight (don't exhaust dehumidified air).

## System Recommendation (per pod)

| Function | Rate | Equipment |
|---|---|---|
| Continuous general ventilation | 35 CFM | ERV or exhaust fan + passive inlet |

**Preferred: ERV (energy recovery ventilator)** at 35 CFM continuous.
- Recovers heat in winter (Peoria design temp ~5°F).
- Balanced (no negative pressure pulling hallway air/odor).
- The env station's 40–120 CFM airflow spec overlaps — **coordinate, don't duplicate**.
  Either the env station IS the ventilator (verify it meets 62.2), or it's
  supplemental filtration and a separate ERV handles ventilation.

## Heat-Treatment Mode Interaction

During 140°F heat treatment:
- Ventilation must be OFF or the heater can't reach setpoint (you'd be exhausting 140°F air and pulling in cold makeup).
- Interlock: ventilation OFF during heat-treatment, purge cycle AFTER cooldown (flush with outdoor air before re-occupancy).
- Verify the ERV/fan and ductwork survive 140°F (most residential ERVs are rated to ~120°F — may need a bypass damper or commercial unit).

## Code Path Note

If the AHJ classifies pods under **ASHRAE 62.1** (commercial / hotel):
- Hotel bedroom: 5 CFM/person + 0.06 CFM/sq ft = 5 + 4.8 = **9.8 CFM**/pod.
- Even lower than 62.2. The 35 CFM design recommendation stands regardless —
  it's driven by comfort and moisture, not the code minimum.

## Open Items

1. Confirm with AHJ: 62.1 vs 62.2 applicability.
2. Resolve env station vs. dedicated ERV (one device or two?).
3. 140°F rating of ventilation equipment.
5. Duct routing: pods are 10' deep — exhaust to the rear or roof? Coordinate with module stacking.
