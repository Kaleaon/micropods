/* Pod Type B — 10'W × 10'D × 10'H Twin-Suite Full Bathroom Module.
   Contains two independent 5'×10' private bathrooms (Suite B1 & Suite B2)
   with walk-in showers, commercial toilets, vanities, and rear MEP chase.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, rbox, cyl } from '../helpers.js';

export function buildBathPod(parent, M, offsetX = 0, offsetZ = 0) {
  const g = new THREE.Group();
  g.position.set(offsetX, 0, offsetZ);
  parent.add(g);

  // Exterior Base Skid & Floor (10' x 10')
  box(g, 10, 0.4, 10, 5, 0, 5, M.dark);
  box(g, 9.6, 0.1, 9.6, 5, 0.4, 5, M.floor);

  // Outer Walls (10' tall shell, front cut open/transparent for viewing)
  box(g, 0.25, 9.5, 10, 0.12, 0.4, 5, M.wall);      // Left outer wall
  box(g, 0.25, 9.5, 10, 9.88, 0.4, 5, M.wall);      // Right outer wall
  box(g, 10, 9.5, 0.25, 5, 0.4, 0.12, M.wall);       // Rear outer wall
  box(g, 10, 0.4, 10, 5, 9.6, 5, M.dark);           // Roof framing

  // Center Sound-Insulated Divider Partition (separates Suite 1 and Suite 2 at x = 5)
  box(g, 0.35, 9.2, 8.4, 5, 0.4, 5.6, M.wall);

  // Rear MEP Plumbing & Vent Chase (18" deep: z 0 to 1.5)
  box(g, 9.6, 9.2, 0.2, 5, 0.4, 1.6, M.dark);       // Chase front wall
  // 4" Main DWV Stack in Chase
  cyl(g, 0.18, 0.18, 9.2, 5, 5.0, 0.8, M.appliance, 16);
  // PEX Hot (red) and Cold (blue) risers
  cyl(g, 0.05, 0.05, 9.2, 4.5, 5.0, 0.8, M.ledblue, 12);
  cyl(g, 0.05, 0.05, 9.2, 5.5, 5.0, 0.8, M.coveled, 12);

  // Helper for single 5'x10' bathroom fitout (side: 0 = left x 0-5, 1 = right x 5-10)
  const buildSuite = (side) => {
    const xBase = side === 0 ? 0 : 5;
    const xCenter = xBase + 2.5;
    const isLeft = side === 0;

    // 1. Walk-in Shower (36"W x 42"D: z 1.8 to 5.3)
    const sx = isLeft ? 1.7 : 8.3;
    rbox(g, 3.0, 0.35, 3.5, sx, 0.4, 3.55, M.appliance, 0.02); // Shower pan
    box(g, 0.05, 7.5, 3.5, isLeft ? 3.2 : 6.8, 0.75, 3.55, M.glass); // Glass screen
    // Shower mixer column & head
    box(g, 0.3, 4.0, 0.1, sx, 3.5, 1.8, M.steel);
    box(g, 0.15, 0.15, 0.8, sx, 7.2, 2.1, M.steel); // Shower arm
    cyl(g, 0.35, 0.35, 0.05, sx, 7.15, 2.5, M.steel, 20); // Rain head

    // 2. Commercial Water Closet (Toilet: z 5.8 to 7.8 against center divider)
    const tx = isLeft ? 4.2 : 5.8;
    // Tank / Wall carrier
    box(g, 1.3, 2.4, 0.8, tx, 0.4, 6.0, M.wallIn);
    // Bowl
    rbox(g, 1.1, 1.3, 1.6, tx, 0.4, 6.9, M.mattress, 0.08);
    // Lid
    rbox(g, 1.15, 0.08, 1.65, tx, 1.7, 6.9, M.mattress, 0.02);
    // Flush button
    box(g, 0.04, 0.35, 0.6, isLeft ? 4.8 : 5.2, 2.6, 6.0, M.steel);

    // 3. 24" Vanity & Sink (z 7.8 to 9.6 on outer wall)
    const vx = isLeft ? 1.4 : 8.6;
    rbox(g, 2.0, 2.6, 1.6, vx, 0.4, 8.6, M.wall, 0.03); // Vanity cabinet
    box(g, 2.1, 0.1, 1.7, vx, 3.0, 8.6, M.mattress);      // Solid surface top
    cyl(g, 0.45, 0.35, 0.5, vx, 2.9, 8.6, M.mattress, 16); // Undermount sink
    // Faucet
    cyl(g, 0.04, 0.04, 0.5, vx, 3.25, 8.1, M.steel, 12);
    // Anti-fog backlit LED mirror
    box(g, 2.0, 3.5, 0.08, vx, 3.8, isLeft ? 0.3 : 9.7, M.mirror);
    box(g, 2.1, 3.6, 0.04, vx, 3.75, isLeft ? 0.28 : 9.72, M.ledblue);

    // 4. Exhaust register on ceiling
    box(g, 0.8, 0.05, 0.8, xCenter, 9.4, 5.0, M.steel);

    // 5. Entry Keypad Door (front z = 9.8)
    const dx = isLeft ? 3.5 : 6.5;
    box(g, 2.5, 7.0, 0.12, dx, 0.4, 9.8, M.frame);
    // Smart Keypad Lock
    box(g, 0.2, 0.6, 0.08, isLeft ? 2.4 : 7.6, 3.3, 9.88, M.screen);
  };

  buildSuite(0); // Left Bath B1
  buildSuite(1); // Right Bath B2

  return g;
}
