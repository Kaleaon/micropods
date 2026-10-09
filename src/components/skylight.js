/* Virtual skylight per pod: 3'×8' luminous slot in a 4'×9' coffer tray,
   24 reflector cups, 2700-6500K tunable (modeled as daylight here).
   Registers the emissive panel + RectAreaLight in the registry for day/night. */
import * as THREE from 'three';
import { box, cyl } from '../helpers.js';

export function buildSkylights(parent, M, registry) {
  const g = new THREE.Group();
  parent.add(g);
  [5, 15].forEach(px => {
    /* 4'×9' coffer frame, y 9.5-10, zone x px±2 / z 0.5-9.5 */
    box(g, 0.3, 0.5, 9, px - 1.85, 9.5, 5, M.frame);
    box(g, 0.3, 0.5, 9, px + 1.85, 9.5, 5, M.frame);
    box(g, 4, 0.5, 0.3, px, 9.5, 0.65, M.frame);
    box(g, 4, 0.5, 0.3, px, 9.5, 9.35, M.frame);
    /* 3'×8' luminous panel */
    const panel = box(g, 3, 0.07, 8, px, 9.55, 5, M.sky);
    panel.castShadow = false;
    registry.skylightPanels.push(panel);
    /* 24 parabolic reflector cups */
    for (let i = -1; i <= 1; i++) for (let j = -3.5; j <= 3.5; j++) {
      cyl(g, 0.42, 0.3, 0.12, px + i, 9.74, 5 + j, M.dark, 20);
    }
    /* cove accent strip inside the coffer */
    box(g, 0.06, 0.06, 8.4, px - 1.7, 9.44, 5, M.ledblue);
    box(g, 0.06, 0.06, 8.4, px + 1.7, 9.44, 5, M.ledblue);
    box(g, 3.4, 0.06, 0.06, px, 9.44, 0.95, M.ledblue);
    box(g, 3.4, 0.06, 0.06, px, 9.44, 9.05, M.ledblue);

    /* RectAreaLight: the skylight's actual illumination, aimed straight down */
    const ra = new THREE.RectAreaLight(0xd8ecff, 4.5, 3, 8);
    ra.position.set(px, 9.4, 5);
    ra.lookAt(px, 0, 5);
    g.add(ra);
    registry.skylightLights.push(ra);
  });
  return g;
}
