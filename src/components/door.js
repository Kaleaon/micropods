import * as THREE from 'three';
/* Entry doors: one centered 3'×7' inward-swing door per pod with a frosted
   transom above (y 7-8.5) and a keypad beside it. Dims from v2. */
import { box } from '../helpers.js';

export function buildDoors(parent, M) {
  const g = new THREE.Group();
  parent.add(g);
  [5, 15].forEach(px => {
    box(g, 3, 1.5, 0.1, px, 7, 0, M.glass);            // frosted transom y 7-8.5
    box(g, 3, 7, 0.18, px, 0, 0, M.dark);              // door slab
    const kx = px < 10 ? px - 1.85 : px + 1.85;        // keypad beside door
    box(g, 0.35, 0.6, 0.15, kx, 3.4, -0.05, M.appliance);
  });
  return g;
}
