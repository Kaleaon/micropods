/* Pod Type C — 10'W × 10'D × 10'H Executive Solo / Long-Stay Resident Pod.
   Strict 5-foot modular footprint (1 module wide × 2 modules deep / 100 SF).
   Features solo queen-width berth, 5' ergonomic executive desk, recessed
   hospitality tower (water bar, espresso, fridge, wardrobe), and 4'×7.2'
   switchable PDLC smart mirror-window on the rear exterior wall.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, rbox, cyl } from '../helpers.js';

export function buildExecutivePod(parent, M, registry, offsetX = -14, offsetZ = 0) {
  const g = new THREE.Group();
  g.position.set(offsetX, 0, offsetZ);
  parent.add(g);

  // Structural Skid Floor (10' x 10' module)
  const flr = box(g, 10, 0.4, 10, 5, 0, 5, M.floor);
  registry.xray.push(flr);

  // Exterior Enclosure Walls (10' tall, 4" thick panels)
  const wL = box(g, 0.33, 9.6, 10, 0.16, 0.4, 5, M.shellWall);   // Left wall
  const wR = box(g, 0.33, 9.6, 10, 9.84, 0.4, 5, M.shellWall);   // Right wall
  const wRoof = box(g, 10, 0.33, 10, 5, 9.67, 5, M.shellRoof);   // Roof cassette
  registry.xray.push(wL, wR, wRoof);

  // Front Wall (z=0) with 3'×7' entry door at x 6.5 to 9.5
  const fw1 = box(g, 6.5, 9.6, 0.33, 3.25, 0.4, 0.16, M.shellWall);
  const fwHeader = box(g, 3.0, 2.6, 0.33, 8.0, 7.4, 0.16, M.shellWall);
  const fwTransom = box(g, 2.8, 1.2, 0.1, 8.0, 7.6, 0.16, M.glass);
  registry.xray.push(fw1, fwHeader);

  // Front Entry Door (3'x7' acoustic slab with smart lock)
  box(g, 2.9, 7.0, 0.15, 8.0, 0.4, 0.16, M.frame);
  box(g, 0.25, 0.7, 0.08, 6.8, 3.5, 0.26, M.screen); // RFID/Touch lock

  // Rear Exterior Wall (z=10) with 4'×7.2' Smart Window Cutout
  const rwL = box(g, 3.0, 9.6, 0.33, 1.5, 0.4, 9.84, M.shellWall);
  const rwR = box(g, 3.0, 9.6, 0.33, 8.5, 0.4, 9.84, M.shellWall);
  const rwBot = box(g, 4.0, 2.4, 0.33, 5.0, 0.4, 9.84, M.shellWall);
  const rwTop = box(g, 4.0, 0.4, 0.33, 5.0, 9.6, 9.84, M.shellWall);
  registry.xray.push(rwL, rwR, rwBot, rwTop);

  // PDLC Switchable Smart Mirror-Window (4'W × 7.2'H at x=5, z=9.83)
  const pdlc = box(g, 4.0, 7.2, 0.08, 5.0, 2.8, 9.83, M.mirror);
  registry.pdlcPanels = registry.pdlcPanels || [];
  registry.pdlcPanels.push(pdlc);

  // Exterior Window Frame Trim
  box(g, 4.1, 0.1, 0.15, 5.0, 2.75, 9.83, M.dark);
  box(g, 4.1, 0.1, 0.15, 5.0, 9.95, 9.83, M.dark);
  box(g, 0.1, 7.2, 0.15, 2.95, 2.8, 9.83, M.dark);
  box(g, 0.1, 7.2, 0.15, 7.05, 2.8, 9.83, M.dark);

  // Left Sleeping Alcove: 5'W × 6.8'L Queen-width Berth (x 0.33 to 5.33, z 1.5 to 8.3)
  rbox(g, 4.8, 1.6, 6.8, 2.73, 0.4, 5.0, M.wall, 0.04);       // Platform base w/ drawers
  rbox(g, 4.6, 0.9, 6.6, 2.73, 2.0, 5.0, M.mattress, 0.05);   // Premium mattress
  rbox(g, 4.6, 0.2, 4.5, 2.73, 2.9, 4.0, M.bedding, 0.03);    // Duvet
  rbox(g, 1.8, 0.4, 1.2, 1.8, 2.9, 7.5, M.mattress, 0.05);    // Pillow 1
  rbox(g, 1.8, 0.4, 1.2, 3.7, 2.9, 7.5, M.mattress, 0.05);    // Pillow 2

  // Bedside Upholstered Headboard & Acoustic Wall Panels
  box(g, 4.8, 4.0, 0.15, 2.73, 2.9, 8.3, M.bedding);
  // Bedside Nook & PoE Touch Control Screen (8" industrial panel)
  box(g, 0.8, 1.2, 0.1, 0.4, 3.6, 6.5, M.dark);
  box(g, 0.6, 0.4, 0.04, 0.46, 3.8, 6.5, M.screen);
  cyl(g, 0.08, 0.08, 0.25, 0.45, 4.6, 6.5, M.coveled, 12);     // Bedside reading light

  // Right Side Workstation & Hospitality Run (x 5.33 to 9.67)
  // 1. Executive Desk on Back Wall (4.2'W × 2.2'D)
  rbox(g, 4.2, 0.15, 2.2, 7.5, 2.7, 8.6, M.wall, 0.02);       // Desktop
  rbox(g, 0.15, 2.3, 2.2, 9.5, 0.4, 8.6, M.frame, 0.02);      // Right leg
  rbox(g, 0.15, 2.3, 2.2, 5.5, 0.4, 8.6, M.frame, 0.02);      // Left leg
  rbox(g, 1.5, 1.8, 1.5, 7.5, 0.4, 7.0, M.dark, 0.05);        // Ergonomic office chair
  box(g, 1.8, 1.1, 0.1, 7.5, 3.5, 9.6, M.screen);             // 27" Ultra-wide monitor

  // 2. Hospitality / Water Bar Tower along Right Wall (x 8.0 to 9.67, z 2.0 to 6.5)
  rbox(g, 1.6, 2.8, 4.5, 8.8, 0.4, 4.25, M.wall, 0.03);       // Credenza base
  // Under-counter quiet drawer fridge
  box(g, 1.5, 1.8, 1.8, 8.8, 0.6, 3.2, M.appliance);
  // Water Bar & Espresso Dispenser Niche
  rbox(g, 1.5, 2.4, 2.0, 8.8, 3.2, 5.0, M.appliance, 0.04);
  box(g, 0.3, 0.5, 0.8, 8.3, 4.2, 5.0, M.steel);              // Dispenser spout
  box(g, 0.05, 0.6, 0.8, 8.05, 4.8, 5.0, M.screen);           // Touch interface
  // Wardrobe Closet (z 1.0 to 2.5) with Shoji Sliding Door
  box(g, 1.6, 6.5, 1.8, 8.8, 3.2, 2.0, M.wall);
  box(g, 0.06, 6.2, 1.7, 8.0, 3.3, 2.0, M.shoji);

  // Virtual Circadian Skylight in Ceiling (4' x 3')
  const sky = box(g, 4.0, 0.08, 3.0, 4.0, 9.55, 5.0, M.sky);
  registry.skylightPanels.push(sky);
  box(g, 4.2, 0.12, 3.2, 4.0, 9.5, 5.0, M.frame);

  return g;
}
