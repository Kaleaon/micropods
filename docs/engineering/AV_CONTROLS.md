# AV / Room Controls — Pod Type A
**Per-berth touchpad + TV | 2026-10-01 | Preliminary**

## Requirement (Joe, 2026-10-01)
Each room gets a **built-in touchpad by the bed** for watching TV (and room control).

## System Architecture (per module — 2 pods)

| Device | Qty | Location | Power | Data |
|---|---|---|---|---|
| Touchpad (8" PoE touchscreen) | 2 (1 per berth) | Flush in spine wall by berth opening, ~3' AFF, reachable from bed | PoE 802.3af (~13W) | Cat6 to PoE switch |
| TV (32" LED) | 2 (1 per pod) | Wall-mounted on pod outer wall opposite berth, screen center ~4' AFF, tilted down | 120V receptacle (~60–100W) | WiFi or Cat6 |
| PoE switch (8-port) | 1 | Spine chase / data closet | 120V (~50W) | Uplink to building network |
| WiFi AP | 1 | Ceiling, center spine | PoE or 120V | — |

## Touchpad Specification

- **Size:** 8" diagonal (large enough for TV UI + room controls, small enough for bedside).
- **Mounting:** Flush in-wall. Standard 2-gang back box + 3/4" conduit to the spine chase. Bezel matches room aesthetic (dark bronze/black).
- **Power:** PoE 802.3af (no 120V at the bedside — cleaner, safer).
- **Functions:**
  - TV: power, volume, channel/input, streaming app launch
  - Room: lighting scenes, skylight CCT/dimming, climate setpoint, privacy curtain
  - House: checkout, housekeeping request, heat-treatment status (read-only)
- **Platform:** Android-based (flexible, cheap). Custom kiosk app or web UI.
- **Fallback:** If the touchpad fails, TV must still work via IR remote (provide one in the room).

## TV Specification

- **Size:** 32" (viewing distance from berth to far wall ~8–10' — 32" is the sweet spot; 43" if Joe wants cinematic).
- **Type:** Commercial-grade LED (not consumer). Reasons:
  - RS-232 / IP control (integrates with touchpad — no IR flakiness)
  - Better thermal tolerance (see below)
  - Lockdown mode (guest can't change inputs, access settings)
  - Pro:Idiom / hospitality DRM for casting
- **Mount:** Fixed tilt wall mount, VESA. Security screws.
- **Audio:** TV speakers are fine at this distance. Optional: Bluetooth to guest's headphones (privacy in a pod hotel).
- **Content:** Casting (Chromecast / AirPlay) + preloaded streaming apps. No cable box.

## Network

- The water station already specs **Cat6** — extend the data rough-in:
  - 1× Cat6 to each touchpad (PoE)
  - 1× Cat6 to each TV (or rely on WiFi — wired is more reliable)
  - 1× Cat6 to WiFi AP
  - All home-run to the PoE switch in the spine chase.
- **VLANs:** Guest devices (TV, touchpad, guest WiFi) on an isolated VLAN. Building management on a separate VLAN. This is a security requirement, not optional.
- **Bandwidth:** Budget 25 Mbps per pod (4K streaming + touchpad). Module uplink: 100 Mbps minimum.

## Electrical Updates

Per-pod additions to [ELEC_LOAD_CALC.md](ELEC_LOAD_CALC.md):
- TV receptacle: 100W @ 120V (add to lighting/receptacle circuit or dedicated 15A — recommend dedicated to avoid nuisance trips).
- Touchpad: powered via PoE (no branch circuit needed at the device).
- Module-level: PoE switch 50W @ 120V (add to module feeder — negligible, +0.2A).

Updated per-pod normal-mode: 5,700W → **5,800W** (+100W TV). Feeder: 47.5A → **48.3A**. Still under 60A. ✓

## THE 140°F PROBLEM

This is the biggest issue with adding built-in electronics.

140°F = **60°C**. Typical ratings:
| Device | Operating max | Storage max | 60°C verdict |
|---|---|---|---|
| Consumer tablet | 35°C (95°F) | 45°C (113°F) | **FAILS** — battery swelling, screen damage |
| Consumer TV (LCD) | 40°C (104°F) | 60°C (140°F) | **FAILS operating** — at the absolute storage limit |
| Commercial display | 40–50°C | 60°C | **Marginal** — better, but not guaranteed |
| PoE switch | 40–45°C | 70°C | **FAILS** if in the heated room |

**Options:**

**A. Industrial-temp components** (operating to 70°C / 158°F)
- Pros: No operational hassle. Treatment runs with everything in place.
- Cons: Expensive (2–3× consumer). Limited selection for touchpads. Commercial displays with 70°C rating exist but are niche.
- Best for: the touchpad (small, critical path).

**B. Quick-remove mounts** (recommended for TV)
- TV on a quick-release VESA mount. Staff removes 2 TVs per module before treatment, reinstalls after.
- Pros: Use standard commercial TVs (cheap, replaceable).
- Cons: Operational step. Staff must not forget. 10 minutes per module.
- Mitigate with a checklist interlock: keypad won't start heat treatment until TVs are checked out (RFID tag on the mount?).

**C. Insulated protective covers**
- Custom-fitted insulated cover placed over the TV/touchpad during treatment.
- Pros: Nothing to remove.
- Cons: Custom fabrication. Must actually work (needs testing). Adds a step anyway.

**Recommendation:** 
- Touchpad → **Option A** (industrial-temp, e.g., -20 to 70°C rated Android panel). It's small, always needed, and the control path for the room.
- TV → **Option B** (quick-release mount + operational procedure). TVs are cheap enough to be semi-consumable, and removal is fast.
- PoE switch → mount in the **spine chase** (not in the heated pod air path), or verify the chase stays below 50°C during treatment. If the chase gets hot, move the switch to a common area.

## Coordination with 3D Model

Add to `pod_type_a_3d.html` / `pod_type_a_3d_v2.html`:
- Touchpad: small dark rectangle flush in spine wall by each berth (8"×5", ~3' AFF).
- TV: 32" thin rectangle on each pod's outer wall (~4' AFF center).
- These are placeholders for now — exact models TBD.

---

## Berth Amenities (Joe, 2026-10-01)

Each berth gets a built-in bedside package:

### 1. Headboard Shelf
- **Location:** Spine wall at the head of each berth, ~6" above mattress.
- **Size:** 12"W × 6"D — fits glasses, phone, book, water bottle.
- **Detail:** 3/4" plywood with a 1/2" raised lip on three sides (nothing slides off in the night). Bullnose front edge.
- **Millwork, no power.** The Qi pad and USB live on/near it (below).

### 2. Wireless Charging Pad (Qi)
- **Type:** 15W Qi pad, **drop-in accessory** (not hardwired) — sits in a shallow routed recess in the shelf, plugs into the USB-C port below via a short cable.
- **Why drop-in:** During 140°F heat treatment, staff pops it out with the TV. No hardwired electronics to cook. If it dies, it's a $20 replacement, not a service call.
- **Standard:** Qi2 (magnetic alignment — phone snaps into place, no fumbling in the dark).

### 3. USB Outlets
- **Type:** Duplex 120V receptacle with integrated USB-A + USB-C (e.g., Leviton T5632 or equiv.), 30W+ USB-C PD.
- **Location:** In the spine wall just below the shelf, ~4" above mattress — reachable without sitting up.
- **Circuit:** On the 15A lighting circuit (minimal load, bedside function).
- **140°F note:** Standard USB receptacles are rated for normal indoor temps. The internal AC/DC converter is the weak point at 60°C. They're cheap and in a standard box — flag for the component review, but plan for periodic replacement rather than industrial-temp units.

### 4. LED Cove Strip — Bunk Ceiling Border (the nice one)
- **Location:** Recessed channel around the perimeter of each bunk's ceiling (underside of the berth above for the lower bunk; top panel for the upper bunk).
- **Effect:** Indirect cove wash — no visible diodes, just a warm glow outlining the bunk. Hospitality feel, doubles as a nightlight.
- **Strip:** 24V, 2700K–3000K warm white, ~4.5W/ft, 95+ CRI. Perimeter per bunk ≈ 19' (3'×6.6') → **~86W per berth**.
- **Channel:** Aluminum extrusion, recessed flush into the bunk frame. Frosted diffuser.
- **Driver:** 100W 24V dimmable, **mounted in the spine chase** (outside the heated air path — electrolytic capacitors die fast at 60°C). 
- **Control:** Dimmable from the touchpad (0-10V or Zigbee driver tied to the room controller). Presets: "Reading" (100%), "Relax" (40%), "Sleep" (10% warm), "Off."
- **Strip 140°F note:** The strip itself is in the hot zone. Standard strip survives occasional 60°C but the adhesive fails and phosphor degrades faster. Specify **high-temp adhesive + 105°C-rated wire**, and budget the strip as a 3–5 year consumable. Or go industrial-temp strip (to 70°C) if the budget allows.
- **Wiring:** 14 AWG from driver in chase to strip. Class 2 (24V) — no conduit required, but protect in the wall cavity.

### Electrical Impact (updates [ELEC_LOAD_CALC.md](ELEC_LOAD_CALC.md))

Per pod (1 berth):
| Load | Watts |
|---|---|
| Bunk LED cove (86W + driver loss) | 95 |
| Bedside USB (phone charging) | 5 |
| Qi pad (via USB) | included above |
| **Per-pod addition** | **~100** |

- Circuit 4 (Lighting) becomes: **Lighting + skylight + bunk LED cove + bedside USB** — 200 + 95 + 5 = 300W on 15A. Fine.
- Updated per-pod normal-mode: 5,800W → **5,900W**.
- Module feeder: 48.3A → **49.2A @ 240V**. Still under 60A. ✓ (22% headroom)

### 140°F Summary (all berth electronics)

| Device | Strategy |
|---|---|
| Touchpad | Industrial-temp (-20 to 70°C) |
| TV | Quick-release mount, remove before treatment |
| Qi pad | Drop-in accessory, remove before treatment |
| USB outlet | Standard, plan as consumable |
| LED driver | In the chase (cool zone) |
| LED strip | High-temp adhesive/wire, 3–5 yr consumable (or industrial-temp strip) |
| PoE switch | In the chase (cool zone) |

## Open Items

1. TV size: 32" or 43"? (Joe's call — 32" is practical, 43" is wow.)
2. Touchpad platform: Android kiosk vs. Crestron/Control4 (budget decision — 10× cost difference).
3. 140°F strategy confirmed (recommend A for touchpad, B for TV).
4. Content: casting-only, or cable/satellite too?
5. ADA: touchpad height and reach range for accessible units.
