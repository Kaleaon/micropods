import * as THREE from 'three';
/* Heat-treatment: one preliminary 5kW/240V forced-air heater per pod, mounted
   under the lower bunk. Discharge grilles low on the spine faces, return ducts
   high. Dims ported 1:1 from pod_type_a_3d_v2.html. */
import { box, cyl, rbox } from '../helpers.js';

export function buildHeaters(parent, M) {
  const g = new THREE.Group();
  parent.add(g);

  /* heater boxes under the lower bunk (one per room) */
  rbox(g, 1.5, 1.5, 3, 9.25, 0.3, 4.5, M.appliance, 0.04);   // heater A → Pod A
  rbox(g, 1.5, 1.5, 3, 10.75, 0.3, 4.5, M.appliance, 0.04);  // heater B → Pod B
  [[9.25], [10.75]].forEach(([hx]) => {
    const fan = cyl(g, 0.45, 0.45, 0.1, hx, 1.05, 6.05, M.steel);
    fan.rotation.x = Math.PI / 2;
  });
  /* discharge grilles low on the spine faces */
  box(g, 0.1, 0.9, 2.2, 7.9, 0.45, 4.5, M.dark);
  box(g, 0.1, 0.9, 2.2, 12.1, 0.45, 4.5, M.dark);
  /* return ducts high on the spine faces (draw from the top of the room) */
  box(g, 0.3, 8.7, 1.2, 7.85, 0.3, 8.1, M.dark);
  box(g, 0.3, 8.7, 1.2, 12.15, 0.3, 8.1, M.dark);
  box(g, 0.12, 1.2, 1.4, 7.82, 7.8, 8.1, M.steel);
  box(g, 0.12, 1.2, 1.4, 12.18, 7.8, 8.1, M.steel);
  return g;
}
