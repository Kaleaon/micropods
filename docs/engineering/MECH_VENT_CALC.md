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

## Deck 3 Glass Solarium Atrium & Lap Pool Natatorium HVAC

### 1. Design Conditions (ASHRAE HVAC Applications Ch. 6 & ASHRAE 62.1-2022)
- **Pool Dimensions:** 24'-0" Width × 50'-0" Length ($1,200 \text{ sq ft}$ water surface).
- **Wetted Deck Area:** $3,600 \text{ sq ft}$ tile deck & splash perimeter.
- **Atrium Volume:** Barrel vault skylight ($80'\text{W} \times 60'\text{L} \times 24'\text{H}_{\text{avg}}$) = $115,200 \text{ cu ft}$.
- **Design Water Temperature:** $84^\circ\text{F}$ ($28.9^\circ\text{C}$).
- **Design Air Temperature:** $86^\circ\text{F}$ ($30.0^\circ\text{C}$) — maintained $2^\circ\text{F}$ above water temp to suppress evaporation.
- **Design Relative Humidity:** $55\% \pm 5\%$ RH (Dew Point $68.5^\circ\text{F}$).

### 2. Moisture Evaporation Load (ASHRAE Formula)
$$w_p = A \times \frac{0.10 + 0.078 \times V}{Y} \times (p_w - p_a) \times F_a$$

Where:
- $A = 1,200 \text{ sq ft}$ (pool water surface)
- $V = 15 \text{ FPM}$ (low laminar air velocity over pool to avoid surface agitation)
- $Y = 1,045 \text{ BTU/lb}$ (latent heat of vaporization at $84^\circ\text{F}$)
- $p_w = 1.173 \text{ in. Hg}$ (saturation vapor pressure at $84^\circ\text{F}$ water)
- $p_a = 0.692 \text{ in. Hg}$ (air vapor pressure at $86^\circ\text{F}$ and $55\%$ RH)
- $F_a = 0.65$ (Activity Factor for lap swimming / fitness resort)

$$w_p = 1,200 \times \frac{0.10 + 0.078(15)}{1,045} \times (1.173 - 0.692) \times 0.65 = 1,200 \times 0.001215 \times 0.481 \times 0.65 = 45.6 \text{ lb/hr (pool)}$$

- **Deck & Splash Evaporation ($3,600 \text{ sq ft} \times 0.0125 \text{ lb/hr}\cdot\text{ft}^2$):** $45.0 \text{ lb/hr}$.
- **Spectator / Bather Occupant Moisture (60 occupants × 0.5 lb/hr):** $30.0 \text{ lb/hr}$.
- **Total Peak Dehumidification Load:** **$120.6 \text{ lb/hr}$** ($1,447 \text{ pints/day}$).

### 3. Equipment Selection & Heat Recovery
- **Unit Specified:** Dedicated Outdoor Air & Heat Recovery Natatorium Dehumidifier (Desert Aire / Seresco / PoolPak packaged roof/podium unit).
- **Rated Capacity:** **$140 \text{ lb/hr}$** moisture removal at $86^\circ\text{F} / 55\% \text{ RH}$ (16% safety margin).
- **Supply Airflow:** **$6,800 \text{ CFM}$** (equivalent to 3.54 air changes per hour, ACH).
- **Outdoor Air Intake (ASHRAE 62.1):**
  $$V_{ot} = A_{\text{pool}} \times 0.48 + A_{\text{deck}} \times 0.48 = (1,200 \times 0.48) + (3,600 \times 0.48) = 576 + 1,728 = 2,304 \text{ CFM}$$
- **Heat Reclaim Loop:** Sensible and latent heat captured by the refrigeration evaporator is directed into a titanium coaxial water heat exchanger, returning up to **$145,000 \text{ BTU/hr}$** directly into the pool water heating loop.

### 4. Chloramine Source Capture & Pressure Cascades
1. **Chloramine Chemistry ($NCl_3$ Vapor):** Trichloramine gas is heavier than air (molecular weight 120.4 g/mol vs air 28.9 g/mol; density $\approx 4.18 \text{ kg/m}^3$) and settles in a 12-to-18 inch vapor blanket directly above the water surface and deck drains.
2. **Low-Level Exhaust Plenum (Deck Edge Scuppers):**
   - 100% of minimum outdoor exhaust air (**$2,600 \text{ CFM}$**) is pulled from perimeter deck grilles located 4" above the pool coping.
   - Chloramines are exhausted directly outdoors through corrosion-resistant 316L stainless steel ducts without recirculating into the overhead atrium air supply.
3. **Negative Pressure Regime (Zero-Migration Envelope):**
   - Natatorium Supply: **$6,800 \text{ CFM}$**.
   - Natatorium Exhaust: **$7,800 \text{ CFM}$** ($2,600 \text{ CFM}$ chloramine deck exhaust + $5,200 \text{ CFM}$ high-level ceiling purge).
   - **Net Exhaust Excess:** **$-1,000 \text{ CFM}$** continuous deficit.
   - Operating Pressure: **$-0.06 \text{ in. w.g.} (-15.0 \text{ Pa})$** relative to adjacent corridors and tower concourses.
4. **Air-Lock Vestibules & Acoustic Air Curtains:**
   - Double-door sliding magnetic gasket vestibules with positive-pressure air curtains at all Deck 3 transition doors to West Tower and East Tower elevator lobbies.
   - Completely isolates pool humidity and chlorine odor from entering residential floors (Decks 4–7) or vertical cargo hoists (CL-1 & CL-2).

---

## Campus-Wide Cascaded Pressure Balancing Hierarchy

To guarantee acoustic tranquility, odor containment, and moisture isolation throughout the 10-level campus, building automation maintains a strict cascaded static pressure hierarchy:

| Zone / Space | Relative Pressure | Pressure Differential ($\Delta P$) | Airflow Directional Safeguard |
|---|---|---|---|
| **Sleeping Pods (Decks 2, 4–7)** | **Highest (+) Positive** | $+0.04 \text{ in. w.g.} (+10.0 \text{ Pa})$ | Positive outward flow into concourse; prevents corridor odors/vapors from entering sleeping chamber |
| **Concourse & Corridor Loops** | **Positive (+)** | $+0.02 \text{ in. w.g.} (+5.0 \text{ Pa})$ | Positive relative to stairwells, shafts, and core amenities |
| **Twin Cargo Shafts (CL-1 & CL-2)** | **Neutral to Slight (+)** | $+0.01 \text{ in. w.g.} (+2.5 \text{ Pa})$ | Shaft pressurization fan prevents stack-effect odor migration |
| **Private Core Bathrooms (Type B)** | **Negative (-)** | $-0.03 \text{ in. w.g.} (-7.5 \text{ Pa})$ | Continuous 75 CFM exhaust per booth; air sweeps inward from concourse |
| **Lower 3 Data Center (MDF)** | **Positive (+)** | $+0.05 \text{ in. w.g.} (+12.5 \text{ Pa})$ | ISO Class 8 cleanroom filtration; prevents dust ingress from parking/tunnels |
| **Deck 3 Atrium Natatorium** | **Negative (-)** | $-0.06 \text{ in. w.g.} (-15.0 \text{ Pa})$ | Prevents moisture, heat, and chloramines from escaping to towers |
| **Lower 2 Staff Laundry Plant** | **Negative (-)** | $-0.04 \text{ in. w.g.} (-10.0 \text{ Pa})$ | Dedicated lint and humidity exhaust to rooftop; no migration to staff breakroom |
| **Trash Chutes & Linen Drops** | **Strongest (-) Negative** | $-0.08 \text{ in. w.g.} (-20.0 \text{ Pa})$ | Continuous high-velocity induction fan on roof; 100% odor evacuation |

---

## Open Items & Verification Matrix

1. **AHJ Plan Review:** Confirm ASHRAE 62.1 commercial hotel classification with City of Peoria Inspections Department.
2. **Natatorium Dehumidifier Mechanical Room Location:** Co-located in Deck 3 East Mezzanine mechanical room directly adjacent to East Core MEP chase.
3. **140°F Thermal Bed-Bug Purge Interlock:** Automated motorized dampers isolate pod ERV branch during heat treatment; high-limit shutoff rated to 160°F.
4. **Duct Routing:** All pod supply/exhaust runs route through the 6'-0" acoustic drop ceiling of the 360° concourse loop into central core vertical MEP chases.
