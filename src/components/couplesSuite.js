/* Pod Type D — 15'W × 10'D × 10'H Couples Micro-Suite.
   Strict 5-foot modular footprint (3 modules wide × 2 modules deep / 150 SF).
   Features dedicated Queen bed, dual nightstands, loveseat lounge / breakfast banquette,
   executive desk/vanity, full hospitality credenza, wardrobe, and double-wide 5'×7.2'
   switchable PDLC smart mirror-window on the rear exterior wall.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, rbox, cyl } from '../helpers.js';

export function buildCouplesSuite(parent, M, registry, offsetX = -32, offsetZ = 0) {
  const g = new THREE.Group();
  g.position.set(offsetX, 0, offsetZ);
  parent.add(g);

  // Structural Skid Floor (15' x 10' module)
  const flr = box(g, 15, 0.4, 10, 7.5, 0, 5, M.floor);
  registry.xray.push(flr);

  // Exterior Enclosure Walls (10' tall, 4" thick panels)
  const wL = box(g, 0.33, 9.6, 10, 0.16, 0.4, 5, M.shellWall);   // Left wall
  const wR = box(g, 0.33, 9.6, 10, 14.84, 0.4, 5, M.shellWall);  // Right wall
  const wRoof = box(g, 15, 0.33, 10, 7.5, 9.67, 5, M.shellRoof);  // Roof cassette
  registry.xray.push(wL, wR, wRoof);

  // Front Wall (z=0) with 3'×7' entry door at x 6.5 to 9.5
  const fw1 = box(g, 6.5, 9.6, 0.33, 3.25, 0.4, 0.16, M.shellWall);
  const fw2 = box(g, 5.5, 9.6, 0.33, 12.25, 0.4, 0.16, M.shellWall);
  const fwHeader = box(g, 3.0, 2.6, 0.33, 8.0, 7.4, 0.16, M.shellWall);
  const fwTransom = box(g, 2.8, 1.2, 0.1, 8.0, 7.6, 0.16, M.glass);
  registry.xray.push(fw1, fw2, fwHeader);

  // Front Entry Door (3'x7' acoustic slab with smart lock)
  box(g, 2.9, 7.0, 0.15, 8.0, 0.4, 0.16, M.frame);
  box(g, 0.25, 0.7, 0.08, 6.8, 3.5, 0.26, M.screen); // RFID/Touch lock

  // Rear Exterior Wall (z=10) with 5'×7.2' Smart Window Cutout
  const rwL = box(g, 5.0, 9.6, 0.33, 2.5, 0.4, 9.84, M.shellWall);
  const rwR = box(g, 5.0, 9.6, 0.33, 12.5, 0.4, 9.84, M.shellWall);
  const rwBot = box(g, 5.0, 2.4, 0.33, 7.5, 0.4, 9.84, M.shellWall);
  const rwTop = box(g, 5.0, 0.4, 0.33, 7.5, 9.6, 9.84, M.shellWall);
  registry.xray.push(rwL, rwR, rwBot, rwTop);

  // PDLC Switchable Smart Mirror-Window (5'W × 7.2'H at x=7.5, z=9.83)
  const pdlc = box(g, 5.0, 7.2, 0.08, 7.5, 2.8, 9.83, M.mirror);
  registry.pdlcPanels = registry.pdlcPanels || [];
  registry.pdlcPanels.push(pdlc);

  // Exterior Window Frame Trim
  box(g, 5.1, 0.1, 0.15, 7.5, 2.75, 9.83, M.dark);
  box(g, 5.1, 0.1, 0.15, 7.5, 9.95, 9.83, M.dark);
  box(g, 0.1, 7.2, 0.15, 4.95, 2.8, 9.83, M.dark);
  box(g, 0.1, 7.2, 0.15, 10.05, 2.8, 9.83, M.dark);

  // Left Sleeping Zone: Queen Bed (5'W × 6.8'L: x 0.5 to 5.5, z 1.5 to 8.3)
  rbox(g, 5.2, 1.4, 6.8, 3.0, 0.4, 5.0, M.wall, 0.04);        // Wood platform base
  rbox(g, 5.0, 0.9, 6.6, 3.0, 1.8, 5.0, M.mattress, 0.06);    // Queen mattress
  rbox(g, 5.0, 0.2, 4.6, 3.0, 2.7, 4.0, M.bedding, 0.04);     // Linen duvet
  rbox(g, 2.0, 0.4, 1.2, 1.8, 2.7, 7.5, M.mattress, 0.05);    // Pillow L
  rbox(g, 2.0, 0.4, 1.2, 4.2, 2.7, 7.5, M.mattress, 0.05);    // Pillow R

  // Upholstered Wall Headboard & LED Sconce
  box(g, 5.2, 4.5, 0.15, 3.0, 2.7, 8.3, M.bedding);
  box(g, 5.2, 0.1, 0.2, 3.0, 7.2, 8.3, M.coveled); // Warm cove LED

  // Dual Bedside Nightstands with PoE Touchpads
  rbox(g, 0.8, 1.8, 1.5, 0.6, 0.4, 7.4, M.dark, 0.03);        // Left nightstand
  box(g, 0.5, 0.35, 0.04, 0.6, 2.3, 7.4, M.screen);           // Left touchpad
  rbox(g, 0.8, 1.8, 1.5, 5.4, 0.4, 7.4, M.dark, 0.03);        // Right nightstand
  box(g, 0.5, 0.35, 0.04, 5.4, 2.3, 7.4, M.screen);           // Right touchpad

  // Center Zone: Loveseat Lounge / Banquette (x 6.0 to 9.0, z 5.5 to 8.5)
  rbox(g, 4.2, 1.4, 2.2, 7.5, 0.4, 6.5, M.dark, 0.05);        // Loveseat seat
  rbox(g, 4.2, 1.6, 0.5, 7.5, 1.8, 7.4, M.mattress, 0.05);    // Backrest
  rbox(g, 2.8, 1.3, 1.6, 7.5, 0.4, 4.5, M.wall, 0.04);        // Low coffee table

  // Right Zone: Hospitality Credenza & Workstation (x 10.0 to 14.67)
  // 1. Executive Workstation Desk (x 10.5 to 14.5, z 7.5 to 9.5)
  rbox(g, 4.0, 0.15, 2.0, 12.5, 2.7, 8.6, M.wall, 0.02);
  rbox(g, 0.15, 2.3, 2.0, 14.4, 0.4, 8.6, M.frame, 0.02);
  rbox(g, 0.15, 2.3, 2.0, 10.6, 0.4, 8.6, M.frame, 0.02);
  rbox(g, 1.5, 1.8, 1.5, 12.5, 0.4, 7.0, M.dark, 0.05);       // Chair
  box(g, 2.2, 1.3, 0.08, 12.5, 3.6, 9.6, M.screen);            // 34" curved display

  // 2. Hospitality Bar & Refrigerator Credenza (x 13.0 to 14.67, z 2.0 to 6.5)
  rbox(g, 1.6, 2.8, 4.5, 13.8, 0.4, 4.25, M.wall, 0.03);
  box(g, 1.5, 1.8, 1.8, 13.8, 0.6, 3.2, M.appliance);          // Mini fridge
  rbox(g, 1.5, 2.2, 2.0, 13.8, 3.2, 5.0, M.appliance, 0.04);  // Water / coffee unit
  box(g, 0.05, 0.6, 0.8, 13.05, 4.8, 5.0, M.screen);          // Touchscreen

  // 3. Shoji Wardrobe Closet (x 13.0 to 14.67, z 0.5 to 2.0)
  box(g, 1.6, 6.5, 1.5, 13.8, 3.2, 1.25, M.wall);
  box(g, 0.06, 6.2, 1.4, 13.0, 3.3, 1.25, M.shoji);

  // Virtual Circadian Skylight in Ceiling (6' x 3')
  const sky = box(g, 6.0, 0.08, 3.0, 7.5, 9.55, 5.0, M.sky);
  registry.skylightPanels.push(sky);
  box(g, 6.2, 0.12, 3.2, 7.5, 9.5, 5.0, M.frame);

  return g;
}
