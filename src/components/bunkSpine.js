import * as THREE from 'three';
/* Center bunk spine (x 8-12, z 2-9, h 10). Lower berth platform at 2'6" AFF
   opens to Pod A (x=8 face, opening y 2.5-6); upper berth platform at 6'6" AFF
   opens to Pod B (x=12 face, opening y 6.5-9.5). Mattresses ~3'×6.6'.
   Dims ported 1:1 from pod_type_a_3d_v2.html. */
import { box, rbox } from '../helpers.js';

export function buildBunkSpine(parent, M, registry) {
  const g = new THREE.Group();
  parent.add(g);

  /* corner posts */
  [[8.125, 2.125], [11.875, 2.125], [8.125, 8.875], [11.875, 8.875]]
    .forEach(([px, pz]) => box(g, 0.25, 10, 0.25, px, 0, pz, M.frame));

  /* platforms + mattresses : lower 2.5' AFF, upper 6.5' AFF */
  box(g, 3.75, 0.25, 6.75, 10, 2.25, 5.5, M.dark);
  rbox(g, 3, 0.75, 6.6, 10, 2.5, 5.5, M.mattress, 0.06);
  /* folded throw blanket at the foot of the lower berth */
  rbox(g, 3.02, 0.18, 1.6, 10, 3.25, 7.6, M.bedding, 0.05);
  box(g, 3.75, 0.25, 6.75, 10, 6.25, 5.5, M.dark);
  rbox(g, 3, 0.75, 6.6, 10, 6.5, 5.5, M.mattress, 0.06);
  rbox(g, 3.02, 0.18, 1.6, 10, 7.25, 7.6, M.bedding, 0.05);

  /* x=8 face (Pod A side): opening y 2.5-6 for LOWER berth */
  box(g, 0.15, 2.5, 7, 8, 0, 5.5, M.wallIn);
  box(g, 0.15, 4, 7, 8, 6, 5.5, M.wallIn);
  /* x=12 face (Pod B side): opening y 6.5-9.5 for UPPER berth */
  box(g, 0.15, 6.5, 7, 12, 0, 5.5, M.wallIn);
  box(g, 0.15, 0.5, 7, 12, 9.5, 5.5, M.wallIn);
  /* front/back faces + cap */
  box(g, 4, 10, 0.15, 10, 0, 2, M.wallIn);
  box(g, 4, 10, 0.15, 10, 0, 9, M.wallIn);
  box(g, 4, 0.25, 7, 10, 9.75, 5.5, M.wallIn);

  /* privacy curtains over the berth openings */
  box(g, 0.06, 3.5, 7, 7.92, 2.5, 5.5, M.curtain);
  box(g, 0.06, 3.0, 7, 12.08, 6.5, 5.5, M.curtain);

  /* insulation overlays on the spine faces (between rooms) */
  [[8, 0.22], [12, 0.22]].forEach(([cx, w]) => {
    const m = box(g, w, 10, 7, cx, 0, 5.5, M.insul);
    registry.insul.push(m);
  });

  /* ladder — Pod B face, up to the upper berth */
  box(g, 0.09, 6.5, 0.09, 12.3, 0, 2.6, M.steel);
  box(g, 0.09, 6.5, 0.09, 12.3, 0, 3.4, M.steel);
  for (let y = 1; y <= 6; y++) box(g, 0.09, 0.09, 0.8, 12.3, y, 3.0, M.steel);

  return g;
}
