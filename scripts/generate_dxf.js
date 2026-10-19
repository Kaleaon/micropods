/**
 * Standalone Architectural DXF Generator
 * Generates AutoCAD R12/2000 compliant DXF blueprints with standard AIA CAD layers
 * for the 900 NE Jefferson Micro-Pod Campus.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cadOutputDir = path.join(__dirname, '..', 'docs', 'cad');

if (!fs.existsSync(cadOutputDir)) {
  fs.mkdirSync(cadOutputDir, { recursive: true });
}

class DxfBuilder {
  constructor() {
    this.layers = [
      { name: '0', color: 7, linetype: 'CONTINUOUS' },
      { name: 'A-WALL-EXTR', color: 7, linetype: 'CONTINUOUS' }, // White/Black (heavy)
      { name: 'A-WALL-INTR', color: 2, linetype: 'CONTINUOUS' }, // Yellow (medium)
      { name: 'A-DOOR', color: 4, linetype: 'CONTINUOUS' },      // Cyan
      { name: 'A-GLAZ', color: 5, linetype: 'CONTINUOUS' },      // Blue
      { name: 'A-FLOR-FIXT', color: 3, linetype: 'CONTINUOUS' },  // Green
      { name: 'A-ELEV-CARGO', color: 1, linetype: 'CONTINUOUS' }, // Red (industrial)
      { name: 'A-GRID', color: 8, linetype: 'CENTER' },          // Gray
      { name: 'A-ANNO-DIMS', color: 6, linetype: 'CONTINUOUS' },  // Magenta
      { name: 'A-ANNO-TEXT', color: 7, linetype: 'CONTINUOUS' },  // White
      { name: 'A-ANNO-TTLB', color: 7, linetype: 'CONTINUOUS' },  // White
    ];
    this.entities = [];
  }

  addLine(layer, x1, y1, x2, y2) {
    this.entities.push(
      '0\nLINE\n8\n' + layer + '\n' +
      `10\n${x1.toFixed(3)}\n20\n${y1.toFixed(3)}\n30\n0.0\n` +
      `11\n${x2.toFixed(3)}\n21\n${y2.toFixed(3)}\n31\n0.0`
    );
  }

  addRect(layer, x, y, w, h) {
    this.addLine(layer, x, y, x + w, y);
    this.addLine(layer, x + w, y, x + w, y + h);
    this.addLine(layer, x + w, y + h, x, y + h);
    this.addLine(layer, x, y + h, x, y);
  }

  addCircle(layer, cx, cy, radius) {
    this.entities.push(
      '0\nCIRCLE\n8\n' + layer + '\n' +
      `10\n${cx.toFixed(3)}\n20\n${cy.toFixed(3)}\n30\n0.0\n` +
      `40\n${radius.toFixed(3)}`
    );
  }

  addArc(layer, cx, cy, radius, startAngle, endAngle) {
    this.entities.push(
      '0\nARC\n8\n' + layer + '\n' +
      `10\n${cx.toFixed(3)}\n20\n${cy.toFixed(3)}\n30\n0.0\n` +
      `40\n${radius.toFixed(3)}\n` +
      `50\n${startAngle.toFixed(1)}\n51\n${endAngle.toFixed(1)}`
    );
  }

  addText(layer, x, y, height, text, align = 0) {
    this.entities.push(
      '0\nTEXT\n8\n' + layer + '\n' +
      `10\n${x.toFixed(3)}\n20\n${y.toFixed(3)}\n30\n0.0\n` +
      `40\n${height.toFixed(3)}\n` +
      `1\n${text}\n` +
      `72\n${align}`
    );
  }

  addDimension(layer, x1, y1, x2, y2, text, offset = 3.0) {
    // Architectural dimension with 45-degree tick marks
    const isHorizontal = Math.abs(y1 - y2) < 0.001;
    if (isHorizontal) {
      const dy = y1 + offset;
      this.addLine(layer, x1, y1, x1, dy + 1.0);
      this.addLine(layer, x2, y2, x2, dy + 1.0);
      this.addLine(layer, x1, dy, x2, dy);
      // 45-degree ticks
      const tick = 0.6;
      this.addLine(layer, x1 - tick, dy - tick, x1 + tick, dy + tick);
      this.addLine(layer, x2 - tick, dy - tick, x2 + tick, dy + tick);
      // Dim text
      const midX = (x1 + x2) / 2;
      this.addText(layer, midX - 2.0, dy + 0.5, 1.2, text);
    } else {
      const dx = x1 + offset;
      this.addLine(layer, x1, y1, dx + 1.0, y1);
      this.addLine(layer, x2, y2, dx + 1.0, y2);
      this.addLine(layer, dx, y1, dx, y2);
      const tick = 0.6;
      this.addLine(layer, dx - tick, y1 - tick, dx + tick, y1 + tick);
      this.addLine(layer, dx - tick, y2 - tick, dx + tick, y2 + tick);
      const midY = (y1 + y2) / 2;
      this.addText(layer, dx + 0.8, midY - 0.6, 1.2, text);
    }
  }

  build() {
    let out = '0\nSECTION\n2\nHEADER\n9\n$ACADVER\n1\nAC1009\n0\nENDSEC\n';
    out += '0\nSECTION\n2\nTABLES\n0\nTABLE\n2\nLAYER\n';
    for (const l of this.layers) {
      out += `0\nLAYER\n2\n${l.name}\n70\n0\n62\n${l.color}\n6\n${l.linetype}\n`;
    }
    out += '0\nENDTAB\n0\nENDSEC\n';
    out += '0\nSECTION\n2\nENTITIES\n';
    out += this.entities.join('\n') + '\n';
    out += '0\nENDSEC\n0\nEOF\n';
    return out;
  }
}

// -------------------------------------------------------------
// 1. GENERATE DECK 5 RESIDENTIAL FLOOR PLAN (AUTOCAD DXF)
// -------------------------------------------------------------
console.log('Generating Deck 5 Residential AutoCAD DXF...');
const deck5 = new DxfBuilder();

// Campus Dimensions (Feet): 380' Frontage x 140' Building Depth
const W = 380.0;
const D = 140.0;

// Exterior Perimeter Concrete/Steel Walls (10" thick)
deck5.addRect('A-WALL-EXTR', 0, 0, W, D);
deck5.addRect('A-WALL-EXTR', 0.83, 0.83, W - 1.66, D - 1.66);

// Structural Column Grids (Lines 1 to 10 horizontally at 40' spacing; Lines A to D at 35' spacing)
for (let i = 0; i <= 9; i++) {
  const gx = 10 + i * 40;
  deck5.addLine('A-GRID', gx, -15, gx, D + 15);
  deck5.addCircle('A-GRID', gx, D + 22, 5.0);
  deck5.addText('A-ANNO-TEXT', gx - 1.2, D + 20.5, 3.0, `${i + 1}`);
}
['A', 'B', 'C', 'D'].forEach((letter, idx) => {
  const gy = 17.5 + idx * 35;
  deck5.addLine('A-GRID', -15, gy, W + 15, gy);
  deck5.addCircle('A-GRID', -22, gy, 5.0);
  deck5.addText('A-ANNO-TEXT', -23.5, gy - 1.5, 3.0, letter);
});

// =============================================================
// NORTH TOWER (West Wing: x = 0 to 160, y = 0 to 140)
// ALL 4 SIDES HAVE OUTWARD-FACING SLEEPING PODS & SMART GLASS
// =============================================================

// 1. North Façade Pods (y = 130 to 140, x = 10 to 150) — Facing North
for (let x = 10; x < 150; x += 20) {
  deck5.addRect('A-WALL-INTR', x, D - 10.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, D - 0.83, x + 18, D - 0.83); // Smart glass North
  deck5.addLine('A-DOOR', x + 2, D - 10.83, x + 5, D - 10.83);
  deck5.addArc('A-DOOR', x + 2, D - 10.83, 3.0, 270, 360);
  deck5.addText('A-ANNO-TEXT', x + 4, D - 6.5, 1.6, 'POD (NORTH)');
}

// 2. South Façade Pods (y = 0 to 10, x = 10 to 150) — Facing South
for (let x = 10; x < 150; x += 20) {
  deck5.addRect('A-WALL-INTR', x, 0.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, 0.83, x + 18, 0.83); // Smart glass South
  deck5.addLine('A-DOOR', x + 2, 10.83, x + 5, 10.83);
  deck5.addArc('A-DOOR', x + 2, 10.83, 3.0, 0, 90);
  deck5.addText('A-ANNO-TEXT', x + 4, 5.5, 1.6, 'POD (SOUTH)');
}

// 3. West Façade Pods (x = 0 to 10, y = 15 to 125) — Facing West (Downtown/Bluffs)
for (let y = 15; y < 125; y += 20) {
  deck5.addRect('A-WALL-INTR', 0.83, y, 10, 20);
  deck5.addLine('A-GLAZ', 0.83, y + 2, 0.83, y + 18); // Smart glass West
  deck5.addLine('A-DOOR', 10.83, y + 2, 10.83, y + 5);
  deck5.addArc('A-DOOR', 10.83, y + 2, 3.0, 90, 180);
  deck5.addText('A-ANNO-TEXT', 2.0, y + 9.0, 1.4, 'POD (WEST)');
}

// 4. East Façade Pods (x = 150 to 160, y = 15 to 125) — Facing East (Atrium/Garden)
for (let y = 15; y < 125; y += 20) {
  deck5.addRect('A-WALL-INTR', 149.17, y, 10, 20);
  deck5.addLine('A-GLAZ', 159.17, y + 2, 159.17, y + 18); // Smart glass East
  deck5.addLine('A-DOOR', 149.17, y + 2, 149.17, y + 5);
  deck5.addArc('A-DOOR', 149.17, y + 2, 3.0, 0, 90);
  deck5.addText('A-ANNO-TEXT', 151.0, y + 9.0, 1.4, 'POD (EAST)');
}

// 360° Continuous Concourse Hallway (6'-0" wide loop around North Core)
deck5.addRect('A-WALL-INTR', 16.83, 16.83, 126.34, D - 33.66);

// North Tower Central Core (Inside x = 16.83 to 143.17, y = 16.83 to 123.17)
// Standalone Bathrooms (Pod Type B) clustered in core
for (let bx = 25; bx < 135; bx += 25) {
  deck5.addRect('A-FLOR-FIXT', bx, 25, 20, 10);
  deck5.addText('A-ANNO-TEXT', bx + 2, 30, 1.4, 'BATH CORE B');
  deck5.addRect('A-FLOR-FIXT', bx, D - 35, 20, 10);
  deck5.addText('A-ANNO-TEXT', bx + 2, D - 30, 1.4, 'BATH CORE B');
}

// CL-1 Cargo Lift (North Tower Core): 12'W x 14'D Hoistway
deck5.addRect('A-ELEV-CARGO', 74, 55, 12, 14);
deck5.addRect('A-ELEV-CARGO', 75, 56, 10, 12);
deck5.addLine('A-ELEV-CARGO', 75, 56, 85, 68);
deck5.addLine('A-ELEV-CARGO', 75, 68, 85, 56);
deck5.addText('A-ANNO-TEXT', 70, 50, 1.8, 'CL-1 CARGO LIFT (10,000 LB)');

// Pressurized Fire Stairwell 1
deck5.addRect('A-WALL-INTR', 50, 55, 14, 20);
deck5.addText('A-ANNO-TEXT', 51, 64, 1.4, 'EXIT STAIR 1');

// Passenger Elevator Core
deck5.addRect('A-WALL-INTR', 96, 55, 14, 20);
deck5.addText('A-ANNO-TEXT', 97, 64, 1.4, 'PASSENGER LIFT');


// =============================================================
// SOUTH TOWER (East Wing: x = 220 to 380, y = 0 to 140)
// ALL 4 SIDES HAVE OUTWARD-FACING SLEEPING PODS & SMART GLASS
// =============================================================

// 1. North Façade Pods (y = 130 to 140, x = 230 to 370) — Facing North
for (let x = 230; x < 370; x += 20) {
  deck5.addRect('A-WALL-INTR', x, D - 10.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, D - 0.83, x + 18, D - 0.83);
  deck5.addLine('A-DOOR', x + 2, D - 10.83, x + 5, D - 10.83);
  deck5.addArc('A-DOOR', x + 2, D - 10.83, 3.0, 270, 360);
  deck5.addText('A-ANNO-TEXT', x + 4, D - 6.5, 1.6, 'POD (NORTH)');
}

// 2. South Façade Pods (y = 0 to 10, x = 230 to 370) — Facing South
for (let x = 230; x < 370; x += 20) {
  deck5.addRect('A-WALL-INTR', x, 0.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, 0.83, x + 18, 0.83);
  deck5.addLine('A-DOOR', x + 2, 10.83, x + 5, 10.83);
  deck5.addArc('A-DOOR', x + 2, 10.83, 3.0, 0, 90);
  deck5.addText('A-ANNO-TEXT', x + 4, 5.5, 1.6, 'POD (SOUTH)');
}

// 3. West Façade Pods (x = 220 to 230, y = 15 to 125) — Facing West (Atrium/Garden)
for (let y = 15; y < 125; y += 20) {
  deck5.addRect('A-WALL-INTR', 220.83, y, 10, 20);
  deck5.addLine('A-GLAZ', 220.83, y + 2, 220.83, y + 18);
  deck5.addLine('A-DOOR', 230.83, y + 2, 230.83, y + 5);
  deck5.addArc('A-DOOR', 230.83, y + 2, 3.0, 90, 180);
  deck5.addText('A-ANNO-TEXT', 222.0, y + 9.0, 1.4, 'POD (WEST)');
}

// 4. East Façade Pods (x = 370 to 380, y = 15 to 125) — Facing East (Evans St/Bluffs)
for (let y = 15; y < 125; y += 20) {
  deck5.addRect('A-WALL-INTR', 369.17, y, 10, 20);
  deck5.addLine('A-GLAZ', 379.17, y + 2, 379.17, y + 18);
  deck5.addLine('A-DOOR', 369.17, y + 2, 369.17, y + 5);
  deck5.addArc('A-DOOR', 369.17, y + 2, 3.0, 0, 90);
  deck5.addText('A-ANNO-TEXT', 371.0, y + 9.0, 1.4, 'POD (EAST)');
}

// 360° Continuous Concourse Hallway (6'-0" wide loop around South Core)
deck5.addRect('A-WALL-INTR', 236.83, 16.83, 126.34, D - 33.66);

// South Tower Central Core (Inside x = 236.83 to 363.17, y = 16.83 to 123.17)
for (let bx = 245; bx < 355; bx += 25) {
  deck5.addRect('A-FLOR-FIXT', bx, 25, 20, 10);
  deck5.addText('A-ANNO-TEXT', bx + 2, 30, 1.4, 'BATH CORE B');
  deck5.addRect('A-FLOR-FIXT', bx, D - 35, 20, 10);
  deck5.addText('A-ANNO-TEXT', bx + 2, D - 30, 1.4, 'BATH CORE B');
}

// CL-2 Cargo Lift (South Tower Core): 12'W x 14'D Hoistway
deck5.addRect('A-ELEV-CARGO', 294, 55, 12, 14);
deck5.addRect('A-ELEV-CARGO', 295, 56, 10, 12);
deck5.addLine('A-ELEV-CARGO', 295, 56, 305, 68);
deck5.addLine('A-ELEV-CARGO', 295, 68, 305, 56);
deck5.addText('A-ANNO-TEXT', 290, 50, 1.8, 'CL-2 CARGO LIFT (10,000 LB)');

// Pressurized Fire Stairwell 2
deck5.addRect('A-WALL-INTR', 270, 55, 14, 20);
deck5.addText('A-ANNO-TEXT', 271, 64, 1.4, 'EXIT STAIR 2');

// Passenger Elevator Core
deck5.addRect('A-WALL-INTR', 316, 55, 14, 20);
deck5.addText('A-ANNO-TEXT', 317, 64, 1.4, 'PASSENGER LIFT');

// CENTRAL GLASS ROOF OVER DECK 3 SPA ATRIUM (x = 160 to 220)
deck5.addRect('A-GLAZ', 160, 15, 60, D - 30);
deck5.addText('A-ANNO-TEXT', 165, D / 2 + 4, 2.2, 'CENTRAL GLASS ATRIUM SEPARATION');
deck5.addText('A-ANNO-TEXT', 165, D / 2, 1.8, '(50\' SPA LAP POOL BELOW)');
deck5.addText('A-ANNO-TEXT', 165, D / 2 - 4, 1.5, 'TOWERS SITED OPPOSING ACROSS 380\' AXIS');

// Dimension Strings — Opposing Placement Across Widest 380' Axis
deck5.addDimension('A-ANNO-DIMS', 0, D + 18, W, D + 18, '380\'-0" (WIDEST PARCEL AXIS - OVERALL FRONTAGE)', 5.0);
deck5.addDimension('A-ANNO-DIMS', 0, D + 6, 160, D + 6, '160\'-0" (NORTH/WEST TOWER ANCHOR)', 4.0);
deck5.addDimension('A-ANNO-DIMS', 160, D + 6, 220, D + 6, '60\'-0" (SOLARIUM SEPARATION)', 4.0);
deck5.addDimension('A-ANNO-DIMS', 220, D + 6, W, D + 6, '160\'-0" (SOUTH/EAST TOWER ANCHOR)', 4.0);
deck5.addDimension('A-ANNO-DIMS', W + 5, 0, W + 5, D, '140\'-0" (RECTANGULAR LOT DEPTH)', 5.0);

// Prominent Opposing Tower Headers
deck5.addText('A-ANNO-TEXT', 25, D - 22, 2.8, 'NORTH/WEST TOWER (WEST OPPOSING FLANK)');
deck5.addText('A-ANNO-TEXT', 245, D - 22, 2.8, 'SOUTH/EAST TOWER (EAST OPPOSING FLANK)');

// AIA Professional Title Block
const tbX = W - 100;
const tbY = -50;
deck5.addRect('A-ANNO-TTLB', tbX, tbY, 100, 35);
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 28, 2.8, '900 NE JEFFERSON AVE CAMPUS');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 22, 2.0, 'CITY OF PEORIA, IL 61603 | ZONED R-6 PUD');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 16, 2.2, 'SHEET A-102: DECK 5 RESIDENTIAL FLOOR PLAN');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 10, 1.8, 'TOWERS OPPOSING ACROSS 380\' WIDEST AXIS');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 4, 1.8, 'DATE: 2026-10-19 | AIA NCS V6 CAD SPEC');

const deck5Path = path.join(cadOutputDir, 'campus_deck5_residential_plan.dxf');
fs.writeFileSync(deck5Path, deck5.build(), 'utf8');
console.log(`Saved: ${deck5Path} (${(fs.statSync(deck5Path).size / 1024).toFixed(1)} KB)`);

// -------------------------------------------------------------
// 2. GENERATE 10-LEVEL LONGITUDINAL SECTION (AUTOCAD DXF)
// -------------------------------------------------------------
console.log('Generating 10-Level Section AutoCAD DXF...');
const sect = new DxfBuilder();

// Longitudinal Section: X = 0 to 380, Y = Elevations (480.0' to 615.0')
const groundL = 500.0; // Rear low grade
const groundH = 514.0; // Street high grade

// Grade line
sect.addLine('A-WALL-EXTR', -20, groundH, 180, groundH);
sect.addLine('A-WALL-EXTR', 180, groundH, 360, groundL);
sect.addLine('A-WALL-EXTR', 360, groundL, 400, groundL);
sect.addText('A-ANNO-TEXT', 20, groundH + 2, 2.2, 'NE JEFFERSON AVE SIDEWALK [EL. 514.0\']');
sect.addText('A-ANNO-TEXT', 350, groundL + 2, 2.2, 'REAR COMMERCIAL ALLEY [EL. 500.0\']');

// 10 Floor Slabs (8" Post-Tensioned Concrete)
const levels = [
  { name: 'LOWER 3 (MDF DATA CENTER & HEAVY MEP)', el: 480.0, h: 10.0 },
  { name: 'LOWER 2 (STAFF AMENITIES & COMMERCIAL LAUNDRY)', el: 490.0, h: 10.0 },
  { name: 'LOWER 1 (COVERED EV PARKING & DUAL LOADING BAY)', el: 500.0, h: 14.0 },
  { name: 'LEVEL 1 (BODEGA, COFFEE & HOTEL RECEPTION)', el: 514.0, h: 16.0 },
  { name: 'LEVEL 2 (ALL-GENDER / FAMILY PODS & ADA SUITES)', el: 530.0, h: 14.0 },
  { name: 'DECK 3 (GRAND THERMAL SPA & ATRIUM LAP POOL)', el: 544.0, h: 15.0 },
  { name: 'DECK 4 (RESIDENTIAL TIER 1 - TWIN TOWERS)', el: 559.0, h: 10.0 },
  { name: 'DECK 5 (RESIDENTIAL TIER 2 - TWIN TOWERS)', el: 569.0, h: 10.0 },
  { name: 'DECK 6 (RESIDENTIAL TIER 3 - TWIN TOWERS)', el: 579.0, h: 10.0 },
  { name: 'DECK 7 (RESIDENTIAL TIER 4 - TWIN TOWERS)', el: 589.0, h: 10.0 },
  { name: 'TWIN ROOFTOPS (SKY DECKS & SOLAR CANOPY)', el: 599.0, h: 12.0 },
];

levels.forEach((lvl, idx) => {
  sect.addLine('A-WALL-EXTR', 0, lvl.el, W, lvl.el);
  sect.addText('A-ANNO-TEXT', 5, lvl.el + 2, 2.0, `${lvl.name} — EL. ${lvl.el.toFixed(1)}'`);
  sect.addCircle('A-ANNO-DIMS', -10, lvl.el, 3.0);
  sect.addText('A-ANNO-TEXT', -11.5, lvl.el - 1.0, 1.8, `L${idx - 2}`);
});

// Twin Tower Vertical Hoistways: CL-1 (x=80 to 92) and CL-2 (x=280 to 292)
sect.addRect('A-ELEV-CARGO', 80, 480, 12, 119);
sect.addText('A-ANNO-TEXT', 78, 605, 2.0, 'CL-1 HOISTWAY');
sect.addRect('A-ELEV-CARGO', 280, 480, 12, 119);
sect.addText('A-ANNO-TEXT', 278, 605, 2.0, 'CL-2 HOISTWAY');

// Deck 3 Central Glass Atrium Roof (x = 170 to 210, peak at el=570)
sect.addLine('A-GLAZ', 170, 544, 190, 574);
sect.addLine('A-GLAZ', 190, 574, 210, 544);
sect.addText('A-ANNO-TEXT', 178, 578, 2.2, 'GLASS ATRIUM SKYLIGHT');

// Title Block
sect.addRect('A-ANNO-TTLB', tbX, 420, 100, 35);
sect.addText('A-ANNO-TTLB', tbX + 4, 448, 2.8, '900 NE JEFFERSON AVE CAMPUS');
sect.addText('A-ANNO-TTLB', tbX + 4, 442, 2.0, 'CITY OF PEORIA, IL 61603 | 1.49 ACRE SITE');
sect.addText('A-ANNO-TTLB', tbX + 4, 436, 2.2, 'SHEET A-101: 10-LEVEL SECTION & HILLSIDE ELEVATION');
sect.addText('A-ANNO-TTLB', tbX + 4, 430, 1.8, 'SCALE: 1/8" = 1\'-0" | VERTICAL DATUM: NAVD88');
sect.addText('A-ANNO-TTLB', tbX + 4, 424, 1.8, 'DATE: 2026-10-19 | MISSION-CRITICAL & TWIN LIFT BASES');

const sectPath = path.join(cadOutputDir, 'campus_10level_section.dxf');
fs.writeFileSync(sectPath, sect.build(), 'utf8');
console.log(`Saved: ${sectPath} (${(fs.statSync(sectPath).size / 1024).toFixed(1)} KB)`);

console.log('AutoCAD DXF generation complete!');
