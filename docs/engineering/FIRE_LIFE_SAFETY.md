# Fire & Life Safety Analysis — Pod Type A
**IBC 2021 / IFC 2021 | 2026-09-30 | Preliminary — architect + AHJ review required**

## Occupancy Classification

Likely **R-1 (transient hotel)** or **R-2 (dormitory)** depending on length of stay.
- R-1: more stringent (sprinklers, alarms).
- Classification drives egress, detection, and sprinkler requirements.
- **Confirm with architect/AHJ.**

## Egress — HIGHEST RISK ITEM

Current design: **one 3'×7' inward-swinging door per pod** as the sole egress.

| IBC Check | Status |
|---|---|
| Sleeping room with one exit | Permitted IF: travel distance OK, occupant load ≤ 10, common path limits met (IBC 1006.2.1) |
| Occupant load per pod | 1 (sleeps 1) — well under limits |
| Emergency escape/rescue opening | **IBC 1031** — sleeping rooms below 4th story need an operable window/door for rescue. The entry door MAY satisfy this if it opens directly to a public way/exit court. If pods open to an interior corridor, a rescue window is likely required. |
| Inward swing | IBC 1010.1.2.1 — doors in low-occupant rooms may swing inward. OK for 1 occupant. |
| Keypad lock | Must be **fail-safe** (unlocks on power loss AND on fire alarm). IFC 1010.2. Failure here is a life-safety violation. |

**Action:** Architect to confirm egress path (door-to-corridor vs. door-to-exterior) and whether IBC 1031 rescue openings are needed. If interior-corridor, budget for operable egress windows in each pod.

## Detection & Alarm

| Requirement | Design |
|---|---|
| Smoke alarms | Per IBC 907.2.11 — in each sleeping room, outside each sleeping area, on each level. **One per pod minimum**, hardwired + battery backup, interconnected. |
| CO alarms | Required if fuel-burning appliances or attached garage. All-electric pod → verify, but recommend anyway (cheap). |
| Fire alarm system | R-1: manual + automatic (IBC 907.2.8). R-2: depends on occupant load. Coordinate with building system. |
| Heat-treatment interlock | Fire alarm activation MUST abort the 140°F cycle and unlock the door. |

## Suppression

- **NFPA 13R or 13D sprinklers** likely required (R-1/R-2).
  - One sprinkler head per pod + one in the bunk spine area.
  - Coordinate with 10' ceiling and the skylight tray (obstruction rules).
  - **140°F heat treatment vs. sprinkler activation:** standard sprinklers activate at 155–165°F. A 140°F room is uncomfortably close — use **high-temp heads (212°F)** in pods, or interlock to shut water... no, never shut sprinklers. High-temp heads it is.
- Portable extinguisher: 2.5 lb ABC per pod (IFC 906).

## Plywood Fire Performance

- Multi-layer plywood: verify **ASTM E84** flame-spread ≤ 200 / smoke-developed ≤ 450 (IBC 803).
- If untreated plywood doesn't meet Class C minimum, options: fire-retardant-treated (FRT) plywood, intumescent coating, or noncombustible lining in key areas.
- **Get the E84 test report from the panel supplier.** No report = assume it fails.

## Pod-to-Pod Separation

- Fire partition between Pod A / spine / Pod B: **1-hour minimum** recommended (even if code allows less — the heat-treatment mode justifies it).
- Detail: double-layer 5/8" Type X gypsum on the spine faces, or equivalent.
- Penetrations (wiring, plumbing chase): firestop per IBC 714.

## Heat-Treatment Protocol — Fire Department Review

- 140°F × 3 hrs in an occupied-building context WILL get the fire marshal's attention.
- Prepare: written protocol, high-temp sprinkler heads, interlocked ventilation shutdown + post-cycle purge, 140°F-rated detection (heat detectors, not smokes, during treatment — or smokedetector bypass with fire watch).
- **Do not run the first treatment without AHJ sign-off.**

## Open Items (priority)

1. R-1 vs R-2 classification (architect).
2. Egress path + IBC 1031 rescue openings (architect + AHJ).
3. Keypad fail-safe verification (hardware spec).
4. Sprinkler design (fire protection engineer) — including high-temp heads.
5. Plywood E84 report (procurement).
6. Fire marshal review of heat-treatment protocol.
