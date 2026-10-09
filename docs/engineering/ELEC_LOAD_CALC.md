# Electrical Load Calculation — Pod Type A
**NEC 2023 (NFPA 70) | Per-pod + module feeder | 2026-09-30 | Preliminary**

## Design Loads (per pod, from basis)

| Load | Volts | Watts | Breaker |
|---|---|---|---|
| Microwave / air-fryer (dedicated) | 120 | 1,500 | 20A GFCI |
| Environmental / water station (dedicated) | 120 | 2,200 | 20A GFCI |
| Lighting + skylight + bunk LED + USB | 120 | 300 | 15A |
| TV (32" commercial LED) | 120 | 100 | 15A (dedicated rec.) |
| Heat-treatment heater (dedicated) | 240 | 5,000 | 30A |

## Key Operating Principle

**Heat-treatment mode and occupied mode are mutually exclusive** (room locked out
via keypad during 140°F cycle). The feeder is sized for the larger of the two
modes, not the sum.

## Mode 1 — Normal Occupancy (per pod)

| Load | VA |
|---|---|
| Lighting (300W: skylight + bunk LED cove + USB) | 300 |
| TV (100W, intermittent) | 100 |
| Microwave / air-fryer (intermittent) | 1,500 |
| Env station instant-hot (intermittent) | 2,200 |
| **Connected total** | **4,100** |

All 120V. Worst-case single-leg: 4,100 ÷ 120 = **34.2A**.
Balanced across 120/240V legs: ~17A/leg.

*Note: induction cooktop removed 2026-10-01 (cooking via microwave/air fryer only).
Sink removed — handwashing at wall water dispenser basin.*

No demand factor applied (conservative — hotel-room-like occupancy, no NEC
dwelling-unit demand permitted). All loads non-continuous (< 3 hrs).

## Mode 2 — Heat Treatment (per pod, unoccupied)

| Load | VA |
|---|---|
| 5 kW heater @ 240V (continuous, 3-hr hold) | 5,000 |
| Controls (keypad, sensors) | 50 |
| **Total** | **5,050** |

Heater current: 5,000 ÷ 240 = **20.8A**.
Continuous → 20.8 × 1.25 = **26.0A** → 30A breaker ✓ (as specified).

## Module Feeder (both pods, 120/240V 1Ø)

| Mode | Calculation | Amps @ 240V |
|---|---|---|
| Normal (both pods) | 2 × 4,100 VA ÷ 240V | 34.2A |
| Heat-treat (both pods) | 2 × 5,050 VA ÷ 240V | 42.1A |

**Governing: 42.1A (heat-treat mode).**

Feeder: **60A / 240V** (14.4 kVA capacity).
- Provides 42% headroom over calculated 42.1A.
- 60A feeder retained for future-proofing (could downsize to 50A — 42.1×1.25=52.6A > 50A, so 60A stays).
- Feeder conductors: 6 AWG Cu THHN (60A @ 75°C) or 4 AWG Al; verify with voltage drop for run length.
- Feeder breaker: 60A 2-pole.

## Panel Schedule (per pod subpanel)

| Ckt | Description | Breaker | Wire |
|---|---|---|---|
| 1 | Microwave / air-fryer | 20A 1P GFCI | 12 AWG |
| 2 | Env / water station | 20A 1P GFCI | 12 AWG |
| 3 | Lighting + skylight + bunk LED + USB | 15A 1P | 14 AWG |
| 4 | TV receptacle | 15A 1P | 14 AWG |
| 5 | Heat-treatment heater | 30A 2P | 10 AWG |

Subpanel: 100A main-lug, 12-space minimum (allows spare capacity).

## Notes & Flags

1. **GFCI**: All 120V kitchen-area receptacles require GFCI (NEC 210.8). The pod is effectively a kitchen + sleeping area — GFCI everything 120V.
2. **AFCI**: Sleeping rooms require AFCI (NEC 210.12). Combination AFCI/GFCI breakers for ckts 1–4.
3. **Interlock**: Heat-treatment lockout must be HARDWIRED or listed-control interlocked, not just procedural — the 5 kW heater must not be energizable while normal-mode loads are available (or size feeder for sum: 89.6A → 100A feeder). Recommend a listed interlock relay.
4. **140°F rating**: Verify every device in the room (receptacles, breakers in subpanel if in-room, env station electronics, LED drivers, **touchpad, TV, PoE switch**) is rated for 140°F ambient. Standard devices are 60–75°C rated (140–167°F) — marginal. Consumer electronics (tablet 35°C, TV 40°C) **fail** — see [AV_CONTROLS.md](AV_CONTROLS.md) for the 140°F strategy. This needs a component-by-component review.
5. **Voltage drop**: Run the VD calc once feeder length is known (keep < 3% branch, < 5% total).
