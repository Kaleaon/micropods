import * as THREE from 'three';
/* Berth amenities per berth: 8" PoE touchpad (interior headboard wall), 12"×6"
   headboard shelf + lip, USB-A+C outlet, Qi2 pad, 32" TV opposite the berth,
   4-sided warm LED cove strip around the bunk ceiling. Dims from v2. */
import { box, rbox } from '../helpers.js';

export function buildBerthAmenities(parent, M) {
  const g = new THREE.Group();
  parent.add(g);

  /* LOWER berth → Pod A (mattress y 2.5-3.25, head at z~2.2) */
  box(g, 0.67, 0.42, 0.06, 8.5, 3.29, 2.1, M.screen);   // 8" touchpad
  rbox(g, 1, 0.08, 0.5, 10, 3.71, 2.325, M.wall, 0.02);   // shelf 12"×6"
  box(g, 1, 0.5, 0.04, 10, 3.71, 2.555, M.wall);          // shelf lip
  box(g, 0.15, 0.2, 0.06, 10, 3.3, 2.1, M.dark);          // USB-A+C outlet
  box(g, 0.3, 0.03, 0.3, 10, 3.79, 2.325, M.appliance);   // Qi2 pad
  rbox(g, 0.12, 1.31, 2.33, 11.86, 3.845, 5.5, M.screen, 0.02); // 32" TV, x=12 cavity wall
  const cy1 = 6.15;                                       // LED cove under upper platform
  box(g, 3.3, 0.06, 0.12, 10, cy1, 2.35, M.coveled);
  box(g, 3.3, 0.06, 0.12, 10, cy1, 8.65, M.coveled);
  box(g, 0.12, 0.06, 6.3, 8.35, cy1, 5.5, M.coveled);
  box(g, 0.12, 0.06, 6.3, 11.65, cy1, 5.5, M.coveled);

  /* UPPER berth → Pod B (mattress y 6.5-7.25) */
  box(g, 0.67, 0.42, 0.06, 11.5, 7.29, 2.1, M.screen);  // 8" touchpad
  rbox(g, 1, 0.08, 0.5, 10, 7.71, 2.325, M.wall, 0.02);   // shelf
  box(g, 1, 0.5, 0.04, 10, 7.71, 2.555, M.wall);          // lip
  box(g, 0.15, 0.2, 0.06, 10, 7.3, 2.1, M.dark);          // USB outlet
  box(g, 0.3, 0.03, 0.3, 10, 7.79, 2.325, M.appliance);   // Qi2 pad
  rbox(g, 0.12, 1.31, 2.33, 8.14, 7.345, 5.5, M.screen, 0.02); // 32" TV, x=8 cavity wall
  const cy2 = 9.65;                                       // LED cove under spine cap
  box(g, 3.3, 0.06, 0.12, 10, cy2, 2.35, M.coveled);
  box(g, 3.3, 0.06, 0.12, 10, cy2, 8.65, M.coveled);
  box(g, 0.12, 0.06, 6.3, 8.35, cy2, 5.5, M.coveled);
  box(g, 0.12, 0.06, 6.3, 11.65, cy2, 5.5, M.coveled);

  return g;
}
