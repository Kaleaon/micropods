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

// NORTH TOWER (West Wing: x = 10 to 170)
// Exterior Sleeping Pods (North Perimeter, 10' deep)
for (let x = 15; x < 165; x += 20) {
  deck5.addRect('A-WALL-INTR', x, D - 10.83, 20, 10);
  // PDLC Smart-Glass Mirror-Window along exterior
  deck5.addLine('A-GLAZ', x + 2, D - 0.83, x + 18, D - 0.83);
  // Door to concourse
  deck5.addLine('A-DOOR', x + 2, D - 10.83, x + 5, D - 10.83);
  deck5.addArc('A-DOOR', x + 2, D - 10.83, 3.0, 270, 360);
  deck5.addText('A-ANNO-TEXT', x + 4, D - 6.5, 1.8, 'POD A (20\')');
}
// Exterior Sleeping Pods (South Perimeter, 10' deep)
for (let x = 15; x < 165; x += 20) {
  deck5.addRect('A-WALL-INTR', x, 0.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, 0.83, x + 18, 0.83);
  deck5.addLine('A-DOOR', x + 2, 10.83, x + 5, 10.83);
  deck5.addArc('A-DOOR', x + 2, 10.83, 3.0, 0, 90);
  deck5.addText('A-ANNO-TEXT', x + 4, 5.5, 1.8, 'POD A (20\')');
}

// 6'-0" Continuous Acoustic Concourse Hallways
deck5.addLine('A-WALL-INTR', 10, D - 16.83, 170, D - 16.83);
deck5.addLine('A-WALL-INTR', 10, 16.83, 170, 16.83);

// North Tower Central Core (Bathrooms, MEP & CL-1 Cargo Lift)
deck5.addRect('A-WALL-INTR', 20, 22.83, 140, D - 45.66);
// Twin Cargo Lift CL-1 (North Tower): 12'W x 14'D hoistway
deck5.addRect('A-ELEV-CARGO', 80, 50, 12, 14);
deck5.addRect('A-ELEV-CARGO', 81, 51, 10, 12);
deck5.addLine('A-ELEV-CARGO', 81, 51, 91, 63); // diagonal cross for elevator
deck5.addLine('A-ELEV-CARGO', 81, 63, 91, 51);
deck5.addText('A-ANNO-TEXT', 78, 45, 2.0, 'CL-1 CARGO LIFT (10,000 LB)');

// SOUTH TOWER (East Wing: x = 210 to 370)
for (let x = 215; x < 365; x += 20) {
  deck5.addRect('A-WALL-INTR', x, D - 10.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, D - 0.83, x + 18, D - 0.83);
  deck5.addText('A-ANNO-TEXT', x + 4, D - 6.5, 1.8, 'POD A (20\')');
}
for (let x = 215; x < 365; x += 20) {
  deck5.addRect('A-WALL-INTR', x, 0.83, 20, 10);
  deck5.addLine('A-GLAZ', x + 2, 0.83, x + 18, 0.83);
  deck5.addText('A-ANNO-TEXT', x + 4, 5.5, 1.8, 'POD A (20\')');
}
// South Tower Central Core w/ CL-2 Cargo Lift
deck5.addRect('A-WALL-INTR', 220, 22.83, 140, D - 45.66);
deck5.addRect('A-ELEV-CARGO', 280, 50, 12, 14);
deck5.addRect('A-ELEV-CARGO', 281, 51, 10, 12);
deck5.addLine('A-ELEV-CARGO', 281, 51, 291, 63);
deck5.addLine('A-ELEV-CARGO', 281, 63, 291, 51);
deck5.addText('A-ANNO-TEXT', 278, 45, 2.0, 'CL-2 CARGO LIFT (10,000 LB)');

// CENTRAL GLASS ROOF OVER DECK 3 SPA ATRIUM (x = 170 to 210)
deck5.addRect('A-GLAZ', 170, 15, 40, D - 30);
deck5.addText('A-ANNO-TEXT', 175, D / 2, 2.2, 'CENTRAL GLASS ATRIUM ROOF');
deck5.addText('A-ANNO-TEXT', 175, D / 2 - 4, 1.8, '(50\' SPA POOL BELOW)');

// Dimension Strings
deck5.addDimension('A-ANNO-DIMS', 0, D + 5, W, D + 5, '380\'-0" (OVERALL FRONTAGE)', 5.0);
deck5.addDimension('A-ANNO-DIMS', W + 5, 0, W + 5, D, '140\'-0" (BUILDING DEPTH)', 5.0);

// AIA Professional Title Block
const tbX = W - 100;
const tbY = -50;
deck5.addRect('A-ANNO-TTLB', tbX, tbY, 100, 35);
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 28, 2.8, '900 NE JEFFERSON AVE CAMPUS');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 22, 2.0, 'CITY OF PEORIA, IL 61603 | ZONED R-6 PUD');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 16, 2.2, 'SHEET A-102: DECK 5 RESIDENTIAL FLOOR PLAN');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 10, 1.8, 'SCALE: 1/8" = 1\'-0" | CAD LAYER SPEC: AIA NCS V6');
deck5.addText('A-ANNO-TTLB', tbX + 4, tbY + 4, 1.8, 'DATE: 2026-10-19 | TWIN 10K LB CARGO LIFTS');

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
