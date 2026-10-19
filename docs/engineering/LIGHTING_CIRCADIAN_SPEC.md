# 3-Layer Lighting, Circadian & Acoustic Engineering Specification
**900 NE Jefferson Ave Campus | Peoria, IL 61603**  
**Standards:** IESNA Lighting Handbook (10th Ed.), WELL Building Standard v2 (Light & Sound), ASHRAE 90.1-2022, TIA-942 Data Center Standard  
**Date:** 2026-10-19 | **Status:** Architectural Lighting, Photometrics & Acoustic Engineering Schedule  

---

## 1. Executive Summary & Design Methodology

Following the advanced lighting and acoustic architectural algorithms derived from `architecture-mcp`, this specification establishes a rigorous **3-Layer Lighting System** (Ambient, Task, and Accent) coupled with **dynamic circadian Kelvin tuning** and **high-isolation acoustic envelopes** across all 10 campus levels.

```
====================================================================================================
                        3-LAYER ARCHITECTURAL LIGHTING HIERARCHY
----------------------------------------------------------------------------------------------------
  [LAYER 1: AMBIENT]       --> General illumination, soft diffused washes, indirect cove bounce.
                               (100 - 300 Lux, uniform distribution, no direct diode glare).
  [LAYER 2: TASK]          --> High-precision directional task lighting for work, reading, grooming.
                               (300 - 500 Lux, high CRI > 92, focused 35° beam angles).
  [LAYER 3: ACCENT/BIOPHILIC] --> Architectural grazing, toe-kick night paths, fiber-optic starfields,
                               smart-glass backlighting, and spa water illumination.
====================================================================================================
```

---

## 2. Photometric Sizing & Lux Calculations (By Campus Zone)

Calculated using the standard architectural lumen method:
$$\text{Lumens Required} = \frac{\text{Target Lux} \times \text{Area } (m^2)}{\text{Utilization Factor } (UF = 0.50) \times \text{Light Loss Factor } (LLF = 0.85)}$$

| Campus Space | Floor / Deck | Target Ambient Lux | Target Task Lux | Target Accent Lux | CCT Range (Kelvin) | Color Rendering (CRI) | Target LPD ($W/ft^2$) | Primary Fixture Type |
|---|---|---|---|---|---|---|---|---|
| **Sleeping Pods (Types A, C, D, E)** | Decks 2, 4–7 | 120 Lux | 450 Lux (Desk/Berth) | 30 Lux (Floor Path) | 2200K – 4500K | Ra > 94 (R9 > 70) | 0.38 | 24V Tunable White Micro-Linear Cove + 3W Gooseneck Task |
| **Core Bathrooms (Pod Type B)** | Core 2, 4–7 | 200 Lux | 400 Lux (Vanity Mirror) | 50 Lux (Shower Niche) | 3000K – 4000K | Ra > 95 (R9 > 85) | 0.52 | Backlit LED Vanity Perimeter + IP65 Recessed Downlights |
| **Grand Spa (Men's Sento & Women's Spa)** | Deck 3 | 100 Lux | 150 Lux (Grooming) | 250 Lux (Water Grazing) | 2200K – 2700K | Ra > 90 | 0.42 | Indirect Cedar Sconce + IP68 Submersible Warm White + Fiber Optic |
| **Central Glass Atrium & 50' Pool** | Deck 3 | 250 Lux (Night) | 300 Lux (Deck Path) | 400 Lux (Water Glow) | 3000K – 5000K | Ra > 90 | 0.60 | High-bay Indirect Architectural Uplights + In-Grade Step Lights |
| **Street Bodega (Micro-Grocery)** | Level 1 | 500 Lux | 750 Lux (Deli Counter) | 800 Lux (Produce Spot) | 3500K – 4000K | Ra > 92 | 0.75 | Continuous High-Efficiency Suspended Track System (45° Optics) |
| **Specialty Coffeeshop & Bakery** | Level 1 | 200 Lux | 500 Lux (Espresso Bar) | 350 Lux (Menu Board) | 2700K – 3000K | Ra > 92 | 0.58 | Architectural Fluted Pendants + Warm Counter Task Linear |
| **Lobby & Member Concourse** | Level 1 | 250 Lux | 400 Lux (Check-In Desk) | 300 Lux (Art Grazers) | 2700K – 3500K | Ra > 94 | 0.48 | Recessed Regressed Architectural Downlights + Linear Perimeter Wash |
| **Staff Breakroom & Recharge Lounge** | Lower 2 | 250 Lux | 450 Lux (Kitchenette) | 80 Lux (Nap Pods) | 2700K – 4000K | Ra > 90 | 0.45 | Soft Edge-Lit Diffusers + Low-Glare Nap Pod Dimmers |
| **Commercial Laundry & Housekeeping** | Lower 2 | 400 Lux | 500 Lux (Sorting Tables) | — | 4000K | Ra > 85 | 0.65 | Sealed Vapor-Tight Industrial LED Strips |
| **Mission-Critical Server Room (MDF)** | Lower 3 | 500 Lux | 500 Lux (Cold Aisle) | — | 5000K | Ra > 80 | 0.60 | Overhead Hot/Cold Aisle Suspended Linear LED (TIA-942) |
| **Covered EV Parking & Loading Bay** | Lower 1 | 150 Lux | 300 Lux (Loading Dock) | — | 4000K | Ra > 80 | 0.28 | Motion-Sensor Bi-Level LED Garage Fixtures (100%/20% dim) |

---

## 3. Circadian Kelvin Tuning Protocol

To support natural melatonin suppression during daytime focus and promote restorative deep sleep cycles for shift workers and medical travelers, all guest sleeping pods feature automated circadian Kelvin curve automation via central BACnet/IP / DALI-2 gateway:

```
====================================================================================================
                        24-HOUR CIRCADIAN KELVIN & LUX AUTOMATION CURVE
----------------------------------------------------------------------------------------------------
Time of Day     Kelvin (CCT)    Ambient Lux     Mode Name            Biological Function
----------------------------------------------------------------------------------------------------
06:30 - 08:30   2700K -> 4000K  50 -> 250 Lux   Dawn Simulation      Gentle cortisol ramp; wake-up
08:30 - 16:30   4000K - 4500K   250 Lux (Task)  Daylight Focus       Peak alertness & cognitive clarity
16:30 - 19:30   3500K -> 3000K  180 Lux         Golden Transition    Pre-dinner unwinding
19:30 - 22:30   2700K -> 2200K  80 Lux          Evening Melatonin    Melatonin trigger; screen eye-strain relief
22:30 - 06:30   2200K (Amber)   5 Lux (Path)    Deep Sleep Mode      Zero blue-light; floor pathway guidance
====================================================================================================
```

### Pod Guest Manual Override:
* **Capacitive Touch Wall Panel:** 4 presets: `Focus / Work` (4500K @ 100%), `Relax` (2700K @ 40%), `Cinema / Mirror` (2200K @ 15%), and `Sleep` (0% main, 2200K 5-lux floor guide active upon foot sensor detection).
* **Virtual Skylight Synchronicity:** The RGBW ceiling cove dynamically mimics sky dome Kelvin conditions outside.

---

## 4. PDLC Smart-Glass Mirror-Window Optical Specifications

The exterior wall of each pod features an electrically switchable Polymer Dispersed Liquid Crystal (PDLC) double-glazed architectural glass panel:

* **Unpowered State (Off - 0V AC):**
  - Liquid crystal droplets are randomly scattered, creating **100% optical opacity** with a mirrored reflective exterior and interior surface.
  - Visual Light Transmittance (VLT): **< 1.0%** (Absolute visual privacy).
  - Ultraviolet Protection: **99.5% UV rejection**.
* **Powered State (On - 48V AC Low-Voltage):**
  - Liquid crystal molecules align with the electric field, transitioning into **91% optically transparent panoramic glass**.
  - Total Haze Index: **< 2.8%** (ultra-clear glass clarity).
  - Switching Speed: **< 80 milliseconds** (instantaneous transition).
* **Acoustic Dampening:** Laminated glass construction provides an individual acoustic rating of **STC 41**.

---

## 5. Architectural Acoustics & Sound Transmission Class (STC) Schedule

To ensure absolute hotel privacy and undisturbed restorative sleep across all pods, rigorous acoustic partitioning is engineered per ASTM E90 / ASTM E413:

```
====================================================================================================
                             ACOUSTIC ISOLATION HIERARCHY
----------------------------------------------------------------------------------------------------
Assembly                      Target STC    Target NRC    Construction Specification
----------------------------------------------------------------------------------------------------
Pod-to-Pod Demising Wall      STC 58        NRC 0.85      Double cold-formed steel stud (2x 2.5"), 
                                                          1" air gap, double 5/8" Type X drywall each side 
                                                          w/ Green Glue viscoelastic damping + mineral wool.
Pod-to-Hallway Corridor Wall  STC 55        NRC 0.80      Solid-core sound-gasketed sliding entry door 
                                                          (STC 44) + acoustic labyrinth door seals.
Core Bathroom to Hallway      STC 56        NRC 0.70      Heavy-gauge studs w/ resilient channels (RC-1), 
                                                          cast-iron acoustic pipe wraps on all DWV drops.
Deck 3 Spa to Guest Towers    STC 64        NRC 0.90      8" post-tensioned reinforced concrete deck + 
                                                          2" acoustic floating floor underlayment.
Lower 3 MDF to Subgrade       STC 60        NRC 0.75      10" reinforced concrete vault walls, isolated slab.
====================================================================================================
```

### Noise Criteria (NC) Targets:
- **Sleeping Pod Interior:** **NC 25 – NC 28** (Whisper-quiet; Silenced continuous ERV duct attenuation).
- **Core Bathrooms:** **NC 35** (Exhaust ventilation fan noise masked by acoustic baffle).
- **Deck 3 Grand Spa:** **NC 30** (Gentle ambient water sounds, mechanical HVAC fully baffled).
- **Lower 3 Data Center:** **NC 55** (Contained inside MDF hot-aisle acoustic envelope).

---

## 6. Digital Control Architecture (DALI-2 / BACnet)

1. **Digital Addressable Lighting Interface (DALI-2):**
   - Every pod luminaire and cove driver is independently addressable over a DALI-2 bus, allowing smooth 0.1% to 100% logarithmic dimming without flicker (IEEE 1789 compliant).
2. **Central BMS Integration:**
   - Central Siemens Desigo / Niagara BACnet gateway links hotel check-in status directly to lighting scenes:
     - *Vacant Pod:* Low-power eco standby (0 Lux, PDLC mirrored).
     - *Checked-In Welcome:* Welcoming 2700K ambient wash at 60% upon guest keycard entry.
     - *Housekeeping Mode:* Instant 5000K 100% white illumination for rapid turnover cleaning and inspection.
