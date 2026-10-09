# Plumbing Basis — Pod Type A
**IPC 2021 + Illinois Plumbing Code amendments | Per pod | 2026-09-30 | Preliminary**

## Fixtures (per pod)

| Fixture | Supply | Drain | DFU | WSFU |
|---|---|---|---|---|
| Handwashing basin at water dispenser (wall-hung, 14"×12") | 1/2" PEX (via dispenser) | 1.5" + P-trap | 1 | 0.5 |
| Env station (supply + internal drain) | 1/4" or 3/8" PEX | 1/2" (ties to basin tailpiece) | — | 0.5 |

Per-pod totals: **1 DFU**, **~1 WSFU**. Per module (2 pods): **2 DFU**, **~2 WSFU**.

*Note 2026-10-01: 15" RV sink and induction cooktop removed. Handwashing folded
into the wall water dispenser via a wall-hung basin below the spout. The basin
drain (1.5") replaces the sink drain; the env station's 1/2" drain ties in as
indirect waste to the basin tailpiece.*

## Drainage (DWV)

- Basin: 1.5" trap arm → 2" branch (allows the env station 1/2" to tie in).
- Env station 1/2" drain: route as indirect waste to the basin tailpiece —
  **not directly to the stack** (it's a condensate-like drain; needs an air
  gap per IPC 802).
- Module main: 2" DWV for two pods (2 DFU — 2" handles 6 DFU, plenty of
  headroom). *Downsized from 3" after sink removal 2026-10-01.*
- Slope: 1/4" per foot for ≤3".
- Cleanouts: at the base of the stack and every 100' (module is 20' — one at the stack base suffices).

## Venting

- Sink: individual vent or wet-vent through the 2" branch (IPC 909).
- Vent tie-in: extend 2" vent up through the roof or tie to building vent stack.
- **Coordinate with module stacking** — if pods stack vertically, the vent must
  not be blocked by the unit above. Side-wall vent chase preferred.

## Water Supply

- Per-pod: 3/4" PEX main → 1/2" to sink, 3/8" to env station.
- Pressure: verify building supply (40–80 psi per IPC). If the module is at the
  end of a long run, check for pressure drop.
- Hot water: **none in pod** — the env station makes instant-hot at point of use
  (1500–2200W). The sink gets cold-only + the env station dispenser for hot.
  - *Design decision to confirm:* does Joe want hot at the sink faucet? If yes,
    add a 2–4 gallon point-of-use electric mini-tank under the sink (1440W @ 120V
    → needs its own 15A or share the 20A env circuit — verify load).
- Shutoffs: quarter-turn ball valve per pod at the chase entry.
- Env station leak protection: leak pan + moisture sensor + auto shutoff (per
  SPEC-KLN-WD-2026-REV-8.0) — plumb the pan drain to the indirect waste.

## Routing

- Preferred: vertical wet chase in the **bunk spine** (center, serves both pods).
  - Pod A sink drain → spine chase (short run through the back wall).
  - Pod B mirrored.
  - Supply riser + DWV stack in the same chase.
- Chase needs access panels (service the valves, traps, and env station connections).
- **Freeze protection:** if the module or chase sees unconditioned space, insulate
  + heat-trace the supply. (Peoria winter design ~5°F.)

## Open Items

1. Hot water at the sink? (Decision: cold-only vs. mini-tank.)
2. Chase location confirmed (spine vs. rear wall)?
3. Building DWV tie-in point and invert elevation.
4. Backflow prevention at the building service (RPZ per Illinois code).
