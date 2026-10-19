# Mission-Critical Data Center, Staff Amenities & Back-of-House Specification
**MicroPod Campus & Urban Wellness Club — 900 NE Jefferson Ave, Peoria, IL 61603**  
**Location:** Lower 3 (Deep Sub-Basement, El. 480.0') & Lower 2 (Upper Basement, El. 490.0')  
**Date:** 2026-10-16 | **Status:** Architectural, Mechanical & Electrical Engineering Basis  

---

## 1. 10-Level Building Section Hierarchy (Sub-Basement Integration)

Due to the deep subgrade excavation into the hillside bedrock, the campus expands from 9 to **10 structural levels** (3 subterranean logistics & technical levels + 7 above-grade levels):

```
====================================================================================================
10-LEVEL STRUCTURAL STACK (900 NE JEFFERSON AVE)
----------------------------------------------------------------------------------------------------
ROOFTOPS:        TWIN PRIVATE SKY DECKS (Above Deck 7 - El. 599.0')
                 - West Men's Sky Deck (Fire pits, calisthenics pergola, river overlook)
                 - East Women's Sky Deck (Private cabanas, yoga/pilates lawn, botanical garden)
----------------------------------------------------------------------------------------------------
DECKS 4 TO 7:    TWIN GENDER-SEPARATED RESIDENTIAL TOWERS (4 Floors - El. 559.0' to 599.0')
(Levels 4-7)     - West Tower: 144 Men's Pods + 72 Core Bathrooms + Floor Lounges
                 - East Tower: 144 Women's Pods + 72 Core Bathrooms + Floor Lounges
----------------------------------------------------------------------------------------------------
DECK 3:          THE GRAND THERMAL WELLNESS SPA (Full-Width Transfer Podium - El. 544.0')
(Level 3)        - Soaring Central Glass Atrium Roof over 50' Heated Lap Pool & Solarium
                 - West Men's Sento Bathhouse & Cedar Saunas | East Women's Sanctuary Spa
----------------------------------------------------------------------------------------------------
LEVEL 2:         ALL-GENDER, FAMILY & UNIVERSAL ACCESSIBLE DECK (El. 530.0')
(Level 2)        - 48 Beds (Pod Types C, D, E, F) + 20 Core Bathrooms (6 ADA Roll-In)
----------------------------------------------------------------------------------------------------
LEVEL 1:         STREET COMMERCIAL CONCOURSE (Sidewalk Grade - El. 514.0')
(Street Grade)   - Public Bodega (7,000 SF), Coffeeshop (3,000 SF), Hotel Lobby (8,000 SF)
====================================================================================================
LOWER 1:         BANKED WALKOUT LOGISTICS & PARKING (Rear Alley Grade - El. 500.0')
(Banked Level)   - 65 Covered Parking Stalls (20 EV L2 / 4 DC Fast Chargers)
                 - Enclosed Commercial Delivery Loading Dock w/ Dual 10,000 lb Cargo Lift Landings (CL-1 & CL-2)
                 - Automated Linen, Waste & Cardboard Compactor Rooms
----------------------------------------------------------------------------------------------------
LOWER 2:         UPPER SUBGRADE BASEMENT — STAFF HUB & FACILITIES (El. 490.0')
(Basement)       - Staff Recharge Breakroom, Commercial Kitchenette, Shift Nap Pods
                 - Men's & Women's Staff Locker Rooms w/ Private Full Shower Suites
                 - Housekeeping Operations Center, Chemical Dispensing, Uniform Dispatch
                 - Commercial In-House Linens Laundry Plant (Barrier washers & gas dryers)
                 - Bulk Food & Beverage Walk-In Freezers & Coolers (Bodega supply)
                 - Member Long-Term Storage Locker Bank (80 secured cages)
----------------------------------------------------------------------------------------------------
LOWER 3:         DEEP SUB-BASEMENT — DATA CENTER & HEAVY MEP VAULT (El. 480.0')
(Deep Subgrade)  - MISSION-CRITICAL INTERNAL SERVER ROOM / DATA CENTER (MDF):
                   * 8x 42U Server Cabinets (Room automation, PoE switches, smart locks, CCTV)
                   * N+1 In-Row CRAC Precision Air Conditioning & Hot-Aisle Containment
                   * 120 kVA 2N Online Double-Conversion UPS Battery Banks (60-min reserve)
                   * Novec 1230 / FM-200 Clean Agent Gaseous Fire Suppression (Zero Water)
                   * Biometric Man-Trap Vestibule & Dual Diverse Fiber Entry Demarcations
                 - HEAVY CENTRAL MEP INFRASTRUCTURE:
                   * 3000A 480V 3-Phase Main Service Switchgear & Automatic Transfer Switches (ATS)
                   * 250 kW Sound-Attenuated Emergency Diesel Generator with 48-hr belly tank
                   * Closed-Loop Commercial Heat Pump Water Heaters & 2,500-gal DHW Storage
                   * 45,000-Gallon Stormwater Retention Vault & Dual Dewatering Sump Basins
====================================================================================================
```

---

## 2. Mission-Critical Internal Server Room / Data Center (MDF)

Located in **Lower 3 (Room B3-100)**, the server room is cut 34 feet below NE Jefferson street grade into native limestone bedrock, providing complete acoustic isolation, zero electromagnetic interference, natural 55°F geothermal ground buffering, and maximum physical security.

### A. Architectural & Structural Parameters
* **Footprint:** **24'-0" Width × 30'-0" Length × 11'-0" Clear Ceiling Height** (720 SF).
* **Enclosure:** 8" solid grouted reinforced CMU walls with 2-hour fire-resistance rating (ASTM E119).
* **Raised Access Flooring:** 18" finished floor height (FFH) Tate ConCore heavy-duty access floor tiles (1,500 lb concentrated load rating) creating an under-floor cable management and air plenum.
* **Access Control & Man-Trap:**
  * Two-door biometric security man-trap vestibule (Room B3-101) preventing tailgating.
  * Dual-factor authentication: Iris/fingerprint biometric scanner + encrypted HID iCLASS SE smart card.
  * Zero perimeter windows or common-wall penetrations.
  * 24/7 high-definition 4K infrared IP cameras with 90-day off-site redundant NVR storage.

### B. Server Rack Layout & Equipment Density
The data center houses **eight (8) 42U standardized 19" EIA-310-D server cabinets** arranged in a **Hot-Aisle Containment (HAC)** configuration:

```
+-------------------------------------------------------------------------------+
|                       LOWER 3 DATA CENTER (MDF) - 720 SF                      |
|                                                                               |
|  [CRAC 1]   +-------+  +-------+  +-------+  +-------+   [PDU A - 60kVA]      |
|  (In-Row)   | RACK1 |  | RACK2 |  | RACK3 |  | RACK4 |   [UPS A - 60kVA]      |
|             | CORE  |  | PoE 1 |  | PoE 2 |  | SRV 1 |                        |
|             +-------+  +-------+  +-------+  +-------+                        |
|             |================ HOT AISLE =============| (Containment Roof)     |
|             +-------+  +-------+  +-------+  +-------+                        |
|  [CRAC 2]   | RACK5 |  | RACK6 |  | RACK7 |  | RACK8 |   [PDU B - 60kVA]      |
|  (In-Row)   | SRV 2 |  | ACCESS|  | CCTV  |  | TELCO |   [UPS B - 60kVA]      |
|             +-------+  +-------+  +-------+  +-------+                        |
|                                                                               |
|  [VESDA AIR SAMPLING]                 [MAN-TRAP BIOMETRIC VESTIBULE]          |
+-------------------------------------------------------------------------------+
```

* **Rack 1 (Core Routing & Firewall):** Redundant Fortinet 100G edge firewalls, Cisco Catalyst 9500 core switches, multi-gigabit WAN routers.
* **Racks 2 & 3 (Campus PoE Infrastructure):** High-density Cisco Catalyst 9300 PoE++ (90W per port) switches powering all 336 guest pod touchpanels, electronic door locks, circadian skylights, and Wi-Fi 6E/7 access points throughout the campus.
* **Racks 4 & 5 (Virtualization & Application Servers):** Dell PowerEdge R760 cluster running VMware vSphere / Proxmox for Property Management System (PMS), mobile key generation, thermal remediation scheduler, and energy management.
* **Rack 6 (Access Control & Security):** HID VertX access control controllers, elevator biometric portal controllers, turnstile interfaces.
* **Rack 7 (Surveillance NVR Storage):** 256-channel redundant SAN storage array recording all exterior, concourse, parking, and logistics cameras.
* **Rack 8 (Carrier Demarcation & Telco):** Diverse fiber optic splice trays connecting to external telecom vaults on NE Jefferson Ave and Hamilton Blvd.

### C. Electrical & UPS Power Architecture (2N Redundant)
* **Total Design IT Load:** 45 kW (with growth capacity to 70 kW).
* **Primary Utility Feed:** 480V 3-phase fed from main switchboard MSB-1 via dedicated isolation transformer.
* **Uninterruptible Power Supply (UPS):** Dual **60 kVA (Total 120 kVA) APC Symmetra PX online double-conversion UPS systems** in an $A+B$ dual-bus topology.
  - VRLA flame-retardant battery modules providing **60 minutes of full-load runtime**.
* **Emergency Standby Power:** Automatic Transfer Switch (ATS-EM) initiates the **250 kW Cummins diesel generator** within 10 seconds of utility power interruption.
* **Power Distribution Units (PDUs):** Overhead Starline track busway feeding dual vertical 30A 208V metered/switched rack PDUs per cabinet.

### D. Precision HVAC & Thermal Management (ASHRAE TC 9.9)
* **Thermal Envelope:** Maintained at **68.0°F to 72.0°F (20.0°C to 22.2°C)** with relative humidity controlled between **45% and 55%** (non-condensing).
* **Cooling Topology:** Two (2) **Schneider InRow RC chilled water / DX precision cooling units** (30 kW capacity each) operating in an $N+1$ configuration.
* **Airflow Management:** Fully enclosed hot-aisle containment ceiling panels and self-closing sliding end doors prevent mixing of hot server exhaust air with conditioned cold room air, cutting cooling energy consumption by 35%.

### E. Fire Detection & Clean Agent Gaseous Suppression
* **Zero Water Risk:** Water-based sprinklers are prohibited in the server room.
* **Clean Agent System:** **Novec 1230 / FM-200 clean agent total flooding gaseous suppression system** (NFPA 2001 compliant):
  - Extinguishes fires within 10 seconds without residue, electrically non-conductive, zero ozone depletion, completely safe for electronics and human occupants.
* **Early Detection:** **VESDA (Very Early Smoke Detection Apparatus)** laser air sampling system continuously monitors air for microscopic combustion particles hours before visible smoke or flame occurs.
* **Pre-Action Backup:** Double-interlock pre-action dry pipe sprinkler system as secondary code-mandated fail-safe, requiring both VESDA activation and heat sensor confirmation before pipe charges with water.

---

## 3. Staff Amenities & Facilities Hub (Lower 2)

Located in **Lower 2 (Upper Basement, El. 490.0')**, the staff hub provides dignified, comfortable, and highly functional back-of-house facilities for hospitality, culinary, maintenance, and wellness staff:

```
+-------------------------------------------------------------------------------+
|                 LOWER 2 STAFF AMENITIES & OPERATIONS HUB                      |
|                                                                               |
|  +------------------------+  +------------------------+  +-----------------+  |
|  | STAFF BREAKROOM &      |  | MEN'S STAFF LOCKERS    |  | HOUSEKEEPING    |  |
|  | RECHARGE LOUNGE        |  | - 30 Lockers           |  | DISPATCH CENTER |  |
|  | - Commercial Kitchen   |  | - 2 Private Showers    |  | - Uniform Carts |  |
|  | - Dining Seating (24)  |  | - Restroom Stalls      |  | - Linens Sorting|  |
|  | - Quiet Sleep Pods (4) |  +------------------------+  +-----------------+  |
|  +------------------------+  +------------------------+  +-----------------+  |
|  | STAFF BRIEFING ROOM    |  | WOMEN'S STAFF LOCKERS  |  | CHEMICAL / OSHA |  |
|  | - Training Table (16)  |  | - 30 Lockers           |  | DISPENSING ROOM |  |
|  | - AV Presentation      |  | - 2 Private Showers    |  | - Eye-Wash Stn  |  |
|  +------------------------+  | - Restroom Stalls      |  | - Spill Kits    |  |
|                              +------------------------+  +-----------------+  |
+-------------------------------------------------------------------------------+
```

### A. Staff Breakroom & 24/7 Recharge Lounge (Room B2-200)
* **Footprint:** **28'-0" Width × 36'-0" Length** (1,008 SF).
* **Occupancy:** Designed for up to 30 concurrent staff members.
* **Commercial Kitchenette:**
  - Dual commercial microwaves, commercial convection toaster ovens, high-capacity induction cooktops.
  - Two (2) full-height stainless steel commercial refrigerators (True T-49) and commercial ice maker.
  - Continuous bean-to-cup espresso and hot/cold sparkling water dispenser.
  - Commercial 3-minute high-temp sanitizing dishwasher.
* **Dining & Relaxation Seating:**
  - Community dining tables seating 20, plus ergonomic counter seating with USB-C 100W PD charging ports.
  - Comfortable lounge zone with soft acoustic seating, television, and high-speed Wi-Fi.
* **Night-Shift Recharge / Sleep Pods (4 Units):**
  - Four (4) dedicated acoustic nap pods (Pod Type C variant) featuring circadian black-out lighting, white noise generators, and sanitizable anti-microbial mattresses for shift workers and emergency overnight staff during severe Peoria winter blizzards.

### B. Staff Locker Rooms & Private Shower Suites (Rooms B2-210 & B2-220)
* **Men's Locker Room (550 SF):**
  - 30 heavy-gauge steel vented personal lockers with digital keypad combination locks.
  - Two (2) completely private full bathroom suites (walk-in shower, toilet, sink vanity) ensuring complete privacy.
  - Bench seating, grooming mirrors with hair dryers, and commercial laundry drops.
* **Women's Locker Room (550 SF):**
  - 30 heavy-gauge steel vented personal lockers with digital keypad combination locks.
  - Two (2) completely private full bathroom suites (walk-in shower, toilet, sink vanity).
  - Dedicated vanity counter with lighted mirrors, hair styling stations, and private lactation/nursing room (compliant with Illinois Fair Practices Act).

### C. Staff Briefing & Training Conference Room (Room B2-230)
* **Footprint:** **18'-0" Width × 24'-0" Length** (432 SF).
* **Capacity:** 16 seats around a central conference table.
* **Equipped with:** 75" commercial 4K interactive display for daily shift roll calls, hospitality training, guest service briefing, and OSHA/safety compliance meetings.

### D. Housekeeping & Operations Center (Room B2-240)
* **Direct Logistics Route:** Located immediately adjacent to the **Commercial Laundry Plant** with direct access to both **North Cargo Lift (CL-1)** and **South Cargo Lift (CL-2)**.
* **Features:**
  - Automated uniform dispatch conveyor system.
  - Staging zone for 12 motorized microfiber housekeeping carts.
  - **OSHA HAZCOM Chemical Dispensing Room (Room B2-245):** Closed-loop automated dilution dispensers for hospital-grade disinfectants, plumbed emergency eyewash station (ANSI Z358.1), floor drains with chemical neutralization traps, and 100 CFM direct exterior exhaust.

---

## 4. Mechanical, Electrical & Life Safety Standards

| System | Standard / Specification | Location |
|---|---|---|
| **Server Room Cooling** | Dual Schneider InRow RC Chilled Water/DX (N+1, 30 kW each) | Lower 3 (Room B3-100) |
| **Server Room Fire Suppression** | Novec 1230 Clean Agent Gas Flooding (Zero Residue) + VESDA | Lower 3 (Room B3-100) |
| **Emergency Power** | 250 kW Cummins Diesel Generator (48-hr belly tank) + 120 kVA UPS | Lower 3 (Room B3-150) |
| **Main Electrical Service** | 3000A 480V 3-Phase Main Switchgear (Square D Power-Style QED-2) | Lower 3 (Room B3-140) |
| **Domestic Hot Water** | 4x 120-gal Commercial Heat Pump Water Heaters + 2,500-gal storage | Lower 3 (Room B3-160) |
| **Staff Kitchenette Exhaust** | 300 CFM dedicated kitchen exhaust with grease hood & fire suppression | Lower 2 (Room B2-200) |
| **Staff Locker Ventilation** | 150 CFM continuous exhaust per shower/restroom core | Lower 2 (Rooms B2-210/220) |
| **Emergency Egress** | Two 2-hour fire-rated enclosed stairs directly to grade | East & West Core Stairwells |
| **Freight Vertical Transport** | Twin 10,000 lb Class C-3 Cargo Lifts (CL-1 North & CL-2 South) connecting Lower 3 through Deck 7 | North & South Tower Service Cores |
