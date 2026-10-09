/* Side-wall run per pod (side 0 = left x 0-2, side 1 = right x 18-20):
   4' shoji closet (z 0-4) + 2'×2' water column (z 4-6) + 4' shelving with
   microwave/air-fryer niche (z 6-10), L-leg wrapping onto the back wall.
   Simplified desk on the back wall: flat top, full-width mirror, no burner/sink.
   Dims ported 1:1 from pod_type_a_3d_v2.html. */
import * as THREE from 'three';
import { box, rbox, cyl } from '../helpers.js';

/* 2'w × 9'h shoji slider: paper panel + wood grid. */
function shojiPanel(parent, M, cx, cz) {
  const g = new THREE.Group();
  const p = box(g, 0.07, 9, 1.94, cx, 0.5, cz, M.shoji);
  p.castShadow = false;
  const bar = (w, h, d, x, yc, z) => box(g, w, h, d, x, yc - h / 2, z, M.frame); // yc = center y
  bar(0.09, 0.18, 1.98, cx, 0.55, cz); bar(0.09, 0.18, 1.98, cx, 9.45, cz);
  bar(0.09, 9, 0.14, cx, 5, cz - 0.93); bar(0.09, 9, 0.14, cx, 5, cz + 0.93);
  bar(0.09, 9, 0.1, cx, 5, cz);                       // center stile
  [2.75, 5, 7.25].forEach(y => bar(0.09, 0.1, 1.94, cx, y, cz)); // rails
  parent.add(g);
  return g;
}

function buildRun(parent, M, side, registry) {
  const g = new THREE.Group();
  parent.add(g);
  const x0 = side === 0 ? 0 : 18, xc = x0 + 1;
  const dir = side === 0 ? 1 : -1;            // room-facing x direction
  const wx = xc + dir * 0.95;                 // water unit inner face plane

  box(g, 2, 0.5, 10, xc, 9.5, 5, M.wall);      // run top
  box(g, 2, 0.4, 10, xc, 0, 5, M.dark);        // kick

  /* closet z 0-4 : two shoji sliders on the inner face */
  const fx = side === 0 ? 1.96 : 18.04;
  shojiPanel(g, M, fx, 1); shojiPanel(g, M, fx, 3);
  box(g, 0.12, 9.5, 0.12, fx, 0.25, 0.05, M.frame);
  box(g, 0.12, 9.5, 0.12, fx, 0.25, 3.95, M.frame);

  /* water unit z 4-6 : 28"H×24"W×8"D recessed appliance per SPEC-KLN-WD-2026 */
  rbox(g, 1.9, 2, 1.9, xc, 0, 5, M.dark, 0.04);          // plumbing base y0-2
  rbox(g, 1.9, 6, 1.9, xc, 2, 5, M.appliance, 0.04);     // black housing y2-8
  box(g, 1.9, 2, 1.9, xc, 8, 5, M.wall);                // crown y8-10
  box(g, 0.07, 0.9, 1.3, wx + dir * 0.035, 5.15, 5, M.screen);  // 10.1" touchscreen
  box(g, 0.34, 1.3, 1.1, wx - dir * 0.1, 3.5, 5, M.dark);       // dispenser alcove
  box(g, 0.12, 0.35, 0.12, wx + dir * 0.05, 4.35, 5, M.steel);  // spout
  box(g, 0.4, 0.07, 0.9, wx + dir * 0.12, 3.52, 5, M.steel);    // drip tray
  rbox(g, 1.2, 0.5, 1.0, wx + dir * 0.55, 2.75, 5, M.steel, 0.05); // handwash basin (top y=3.25)
  box(g, 0.1, 0.8, 0.1, wx + dir * 0.55, 2.0, 5, M.dark);       // basin drain tailpiece
  box(g, 0.07, 1.4, 1.5, wx + dir * 0.035, 0.9, 5, M.frame);     // filter bay door (oak)
  const port = cyl(g, 0.28, 0.28, 0.1, wx + dir * 0.08, 1.65, 5, M.steel);
  port.rotation.z = Math.PI / 2;
  const cart = cyl(g, 0.2, 0.2, 0.14, wx + dir * 0.09, 1.65, 5, M.mattress);
  cart.rotation.z = Math.PI / 2;
  box(g, 1.0, 1.5, 0.18, xc, 4.15, 3.96, M.mattress);   // slot-in air filter (closet side)
  box(g, 0.1, 1.7, 0.1, xc - 0.55, 4.05, 3.96, M.dark);
  box(g, 0.1, 1.7, 0.1, xc + 0.55, 4.05, 3.96, M.dark);
  box(g, 1.1, 0.08, 0.05, xc, 5.85, 3.98, M.ledblue);   // status LED

  /* shelves z 6-10 */
  const zc = 8;
  [6.1, 9.9].forEach(z => box(g, 1.9, 9.5, 0.12, xc, 0.25, z, M.wall));
  [1.2, 3.0, 4.8, 6.6, 8.4].forEach(y => box(g, 1.9, 0.12, 3.8, xc, y, zc, M.wall));
  /* microwave / air fryer niche y 3-5 */
  rbox(g, 1.5, 1.6, 1.7, xc, 3.1, zc, M.appliance, 0.03);
  box(g, 1.3, 1.2, 0.06, xc, 3.3, zc + (side === 0 ? 0.86 : -0.86), M.dark);
  /* L leg: back-wall shelves (3' wide × 2' deep), beside the desk */
  const xb = side === 0 ? 1.5 : 18.5;
  const xl0 = side === 0 ? 0 : 17, xl1 = side === 0 ? 3 : 20;
  [1.2, 3.0, 4.8, 6.6, 8.4].forEach(y => box(g, 3, 0.12, 1.9, xb, y, 9, M.wall));
  box(g, 0.12, 9.5, 1.9, xl0 + 0.06, 0.25, 9, M.wall);
  box(g, 0.12, 9.5, 1.9, xl1 - 0.06, 0.25, 9, M.wall);
  box(g, 3, 0.5, 1.9, xb, 9.5, 9, M.wall);
  box(g, 3, 0.4, 1.9, xb, 0, 9, M.dark);

  /* simplified desk on the back wall: flat top, full-width mirror, no burner/sink */
  const px = side === 0 ? 5 : 15;
  rbox(g, 4, 2.65, 2, px, 0, 9, M.wall, 0.03);          // base cabinet
  rbox(g, 4, 0.15, 2, px, 2.65, 9, M.wall, 0.02);       // flat desktop
  /* mirror: 4' wide, desktop (y2.8) to ceiling (y10), on the INTERIOR face
     of the back wall (wall interior face z=9.83; mirror 0.08 thick) */
  box(g, 4, 7.2, 0.08, px, 2.8, 9.79, M.mirror);
  return g;
}

export function buildSideRuns(parent, M, registry) {
  const g = new THREE.Group();
  parent.add(g);
  buildRun(g, M, 0, registry);
  buildRun(g, M, 1, registry);
  return g;
}
