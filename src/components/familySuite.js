/* Pod Type E — 20'W × 10'D × 10'H Family Quad Bunk Suite.
   Strict 5-foot modular footprint (4 modules wide × 2 modules deep / 200 SF).
   Features dual 2-tier bunk stacks (4 private sleeping berths with acoustic curtains),
   central family dining / board game table, 4 lockable luggage lockers, water bar,
   and dual switchable PDLC smart mirror-windows on the rear exterior wall.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, rbox, cyl } from '../helpers.js';

export function buildFamilySuite(parent, M, registry, offsetX = -55, offsetZ = 0) {
  const g = new THREE.Group();
  g.position.set(offsetX, 0, offsetZ);
  parent.add(g);

  // Structural Skid Floor (20' x 10' module)
  const flr = box(g, 20, 0.4, 10, 10, 0, 5, M.floor);
  registry.xray.push(flr);

  // Exterior Enclosure Walls (10' tall, 4" thick panels)
  const wL = box(g, 0.33, 9.6, 10, 0.16, 0.4, 5, M.shellWall);   // Left wall
  const wR = box(g, 0.33, 9.6, 10, 19.84, 0.4, 5, M.shellWall);  // Right wall
  const wRoof = box(g, 20, 0.33, 10, 10, 9.67, 5, M.shellRoof);  // Roof cassette
  registry.xray.push(wL, wR, wRoof);

  // Front Wall (z=0) with central 3'×7' entry door at x 8.5 to 11.5
  const fwL = box(g, 8.5, 9.6, 0.33, 4.25, 0.4, 0.16, M.shellWall);
  const fwR = box(g, 8.5, 9.6, 0.33, 15.75, 0.4, 0.16, M.shellWall);
  const fwHeader = box(g, 3.0, 2.6, 0.33, 10.0, 7.4, 0.16, M.shellWall);
  const fwTransom = box(g, 2.8, 1.2, 0.1, 10.0, 7.6, 0.16, M.glass);
  registry.xray.push(fwL, fwR, fwHeader);

  // Front Entry Door (3'x7' acoustic slab with smart lock)
  box(g, 2.9, 7.0, 0.15, 10.0, 0.4, 0.16, M.frame);
  box(g, 0.25, 0.7, 0.08, 8.8, 3.5, 0.26, M.screen);

  // Rear Exterior Wall (z=10) with Dual 4'×7.2' Smart Windows at x 6.5 and x 13.5
  box(g, 4.5, 9.6, 0.33, 2.25, 0.4, 9.84, M.shellWall);
  box(g, 3.0, 9.6, 0.33, 10.0, 0.4, 9.84, M.shellWall);          // Center mullion
  box(g, 4.5, 9.6, 0.33, 17.75, 0.4, 9.84, M.shellWall);
  box(g, 4.0, 2.4, 0.33, 6.5, 0.4, 9.84, M.shellWall);           // Under window L
  box(g, 4.0, 2.4, 0.33, 13.5, 0.4, 9.84, M.shellWall);          // Under window R
  box(g, 4.0, 0.4, 0.33, 6.5, 9.6, 9.84, M.shellWall);           // Over window L
  box(g, 4.0, 0.4, 0.33, 13.5, 9.6, 9.84, M.shellWall);          // Over window R

  // Dual PDLC Switchable Smart Mirror-Windows (4'W × 7.2'H each)
  const pdlcL = box(g, 4.0, 7.2, 0.08, 6.5, 2.8, 9.83, M.mirror);
  const pdlcR = box(g, 4.0, 7.2, 0.08, 13.5, 2.8, 9.83, M.mirror);
  registry.pdlcPanels = registry.pdlcPanels || [];
  registry.pdlcPanels.push(pdlcL, pdlcR);

  // Helper for a 2-Tier Bunk Stack (width 3.5', length 6.8', height 9.2')
  const buildBunkStack = (xBase, isLeft) => {
    const xc = isLeft ? xBase + 1.85 : xBase - 1.85;
    // Bunk structural corner posts
    box(g, 0.25, 9.2, 0.25, isLeft ? 0.5 : 19.5, 0.4, 1.5, M.frame);
    box(g, 0.25, 9.2, 0.25, isLeft ? 3.8 : 16.2, 0.4, 1.5, M.frame);
    box(g, 0.25, 9.2, 0.25, isLeft ? 0.5 : 19.5, 0.4, 8.3, M.frame);
    box(g, 0.25, 9.2, 0.25, isLeft ? 3.8 : 16.2, 0.4, 8.3, M.frame);

    // LOWER BERTH (y=0.4 to 4.5)
    rbox(g, 3.4, 0.8, 6.6, xc, 0.4, 4.9, M.wall, 0.03);          // Lower base
    rbox(g, 3.2, 0.7, 6.4, xc, 1.2, 4.9, M.mattress, 0.05);      // Lower mattress
    rbox(g, 3.2, 0.15, 4.5, xc, 1.9, 4.0, M.bedding, 0.03);      // Duvet
    rbox(g, 1.8, 0.35, 1.2, xc, 1.9, 7.5, M.mattress, 0.05);     // Pillow
    box(g, 0.4, 0.3, 0.04, isLeft ? 0.45 : 19.55, 2.4, 7.0, M.screen); // Lower PoE touch

    // UPPER BERTH (y=5.0 to 9.2)
    rbox(g, 3.4, 0.5, 6.6, xc, 5.0, 4.9, M.wall, 0.03);          // Upper bunk platform
    rbox(g, 3.2, 0.7, 6.4, xc, 5.5, 4.9, M.mattress, 0.05);      // Upper mattress
    rbox(g, 3.2, 0.15, 4.5, xc, 6.2, 4.0, M.bedding, 0.03);      // Duvet
    rbox(g, 1.8, 0.35, 1.2, xc, 6.2, 7.5, M.mattress, 0.05);     // Pillow
    box(g, 0.4, 0.3, 0.04, isLeft ? 0.45 : 19.55, 6.8, 7.0, M.screen); // Upper PoE touch

    // Upper Guard Railing
    box(g, 0.1, 1.3, 6.8, isLeft ? 3.8 : 16.2, 5.5, 4.9, M.frame);

    // Access Ladder (at z=1.8)
    const lx = isLeft ? 3.85 : 16.15;
    cyl(g, 0.04, 0.04, 8.8, lx, 4.8, 1.8, M.steel, 12);
    cyl(g, 0.04, 0.04, 8.8, lx, 4.8, 2.8, M.steel, 12);
    [1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5].forEach(ly => {
      box(g, 0.06, 0.06, 1.0, lx, ly, 2.3, M.steel);
    });

    // Privacy Curtains (retracted / semi-drawn)
    box(g, 0.04, 3.2, 2.5, isLeft ? 3.75 : 16.25, 1.4, 7.0, M.curtain);
    box(g, 0.04, 3.2, 2.5, isLeft ? 3.75 : 16.25, 5.5, 7.0, M.curtain);
  };

  buildBunkStack(0.33, true);   // Left Bunk Stack (Berths 1 & 2)
  buildBunkStack(19.67, false); // Right Bunk Stack (Berths 3 & 4)

  // CENTER FAMILY LOUNGE & DINING (x 5.0 to 15.0)
  // Drop-leaf dining / game table (4'W × 3.5'D at x=10, z=5.2)
  rbox(g, 4.2, 0.15, 3.6, 10.0, 2.5, 5.2, M.wall, 0.03);       // Tabletop
  rbox(g, 0.25, 2.3, 2.0, 10.0, 0.4, 5.2, M.frame, 0.02);      // Central pedestal base
  // Bench Seating (front & back of table)
  rbox(g, 4.0, 1.4, 1.2, 10.0, 0.4, 3.0, M.dark, 0.04);        // Front bench
  rbox(g, 4.0, 1.4, 1.2, 10.0, 0.4, 7.4, M.dark, 0.04);        // Back bench

  // Center Back Wall Media & Hospitality Console (x 8.5 to 11.5, z 8.8 to 9.8)
  rbox(g, 3.0, 2.4, 1.0, 10.0, 0.4, 9.3, M.wall, 0.03);        // Low credenza
  box(g, 2.8, 1.6, 0.08, 10.0, 3.2, 9.75, M.screen);           // 43" Smart TV / Family Display

  // Lockers & Hospitality Stations (along center front corners)
  // 4 Lockable Luggage Cubbies (x 4.2 to 5.6 and x 14.4 to 15.8 at front wall)
  box(g, 1.4, 6.5, 1.4, 4.9, 0.4, 1.1, M.dark);                // Lockers 1 & 2
  box(g, 1.4, 6.5, 1.4, 15.1, 0.4, 1.1, M.dark);               // Lockers 3 & 4
  box(g, 0.05, 0.2, 0.15, 5.65, 3.5, 1.1, M.screen);           // Digital RFID lock L
  box(g, 0.05, 0.2, 0.15, 14.35, 3.5, 1.1, M.screen);          // Digital RFID lock R

  // Dual Virtual Circadian Skylights in Ceiling (4' x 3' each)
  const skyL = box(g, 4.0, 0.08, 3.0, 6.5, 9.55, 5.0, M.sky);
  const skyR = box(g, 4.0, 0.08, 3.0, 13.5, 9.55, 5.0, M.sky);
  registry.skylightPanels.push(skyL, skyR);
  box(g, 4.2, 0.12, 3.2, 6.5, 9.5, 5.0, M.frame);
  box(g, 4.2, 0.12, 3.2, 13.5, 9.5, 5.0, M.frame);

  return g;
}
