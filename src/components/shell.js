/* Shell: 20'W × 10'D × 10'H enclosure. Front wall (z=0) has two 3'×7' door
   openings (x 3.5-6.5 Pod A, x 13.5-16.5 Pod B) with frosted transoms above.
   Insulated divider stubs at x=10 (front z 0-2, back z 9-10) separate the pods.
   Dims ported 1:1 from pod_type_a_3d_v2.html. Wall thickness T = 1/3 ft. */
import * as THREE from 'three';
import { box } from '../helpers.js';

const T = 1 / 3, H = 10;

export function buildShell(parent, M, registry) {
  const g = new THREE.Group();
  parent.add(g);
  const shell = (w, h, d, cx, yb, cz, mat) => {
    const m = box(g, w, h, d, cx, yb, cz, mat);
    registry.xray.push(m);   // enclosure fades in X-ray mode
    return m;
  };

  shell(20, 0.5, 10, 10, -0.5, 5, M.floor);          // floor slab (top at y=0)
  /* front wall z=0 : segments around the two door openings */
  shell(3.5, H, T, 1.75, 0, 0, M.shellWall);
  shell(7,   H, T, 10,   0, 0, M.shellWall);
  shell(3.5, H, T, 18.25, 0, 0, M.shellWall);
  shell(3, 1.5, T, 5,  8.5, 0, M.shellWall);          // headers above doors
  shell(3, 1.5, T, 15, 8.5, 0, M.shellWall);
  shell(20, H, T, 10, 0, 10, M.shellWall);           // back wall
  shell(T, H, 10, 0,  0, 5, M.shellWall);            // left wall
  shell(T, H, 10, 20, 0, 5, M.shellWall);           // right wall
  const roof = shell(20.7, T, 10.7, 10, H, 5, M.shellRoof);
  registry.roof = roof;

  /* insulated divider stubs (x=10): skin-core-skin, pink core = insulation */
  const insulatedWall = (cx, yb, cz, w, h, d) => {
    const grp = new THREE.Group();
    const skin = 0.12, core = w - skin * 2;
    const s1 = box(grp, skin, h, d, cx - (skin + core) / 2, yb, cz, M.wallIn);
    const s2 = box(grp, skin, h, d, cx + (skin + core) / 2, yb, cz, M.wallIn);
    const c = box(grp, core, h, d, cx, yb, cz, M.insul);
    g.add(grp);
    registry.insul.push(c);
    return grp;
  };
  insulatedWall(10, 0, 1, 0.5, H, 2);    // front stub
  insulatedWall(10, 0, 9.5, 0.5, H, 1);  // back stub
  return g;
}
