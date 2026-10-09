/* Shared geometry helpers. Units: 1 unit = 1 foot.
   box(w,h,d, cx,yb,cz): yb = y-BOTTOM (matches the concept viewer's convention,
   so dims port 1:1). rbox() = same but with rounded edges for furniture. */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function box(parent, w, h, d, cx, yb, cz, mat) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(cx, yb + h / 2, cz);
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}

/* Rounded box for furniture/appliances. radius ~0.02-0.05 ft. */
export function rbox(parent, w, h, d, cx, yb, cz, mat, radius = 0.03) {
  const m = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 3, radius), mat);
  m.position.set(cx, yb + h / 2, cz);
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}

export function cyl(parent, rTop, rBot, h, cx, y, cz, mat, seg = 24) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat);
  m.position.set(cx, y, cz);
  m.castShadow = true; m.receiveShadow = true;
  parent.add(m);
  return m;
}

/* Canvas-sprite text label (ported from the concept viewer). */
export function makeLabel(text, h = 1.0) {
  const fs = 44, pad = 26;
  const meas = document.createElement('canvas').getContext('2d');
  meas.font = `bold ${fs}px 'Courier New', monospace`;
  const tw = meas.measureText(text).width;
  const c = document.createElement('canvas');
  c.width = Math.ceil(tw + pad * 2); c.height = 78;
  const g = c.getContext('2d');
  g.fillStyle = 'rgba(13,47,92,0.88)'; g.fillRect(0, 0, c.width, c.height);
  g.strokeStyle = '#fff'; g.lineWidth = 3; g.strokeRect(2, 2, c.width - 4, c.height - 4);
  g.font = `bold ${fs}px 'Courier New', monospace`;
  g.fillStyle = '#fff'; g.textBaseline = 'middle';
  g.fillText(text, pad, c.height / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  s.scale.set(h * c.width / c.height, h, 1);
  s.renderOrder = 999;
  return s;
}
