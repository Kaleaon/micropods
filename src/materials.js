/* MicroPod Hotel — PBR materials + procedural canvas textures.
   Units: 1 world unit = 1 foot. All textures generated at runtime (no external
   requests), so the single-file vite build stays fully self-contained. */
import * as THREE from 'three';

/* Richer procedural wood: per-plank tone variation, fine grain, knots.
   variant 'frame' = darker walnut for millwork/frames. Ported from the v2
   concept viewer, upgraded to 512px with anisotropy. */
function woodTexture(variant) {
  const dark = variant === 'frame';
  const S = 512, planks = 6, ph = S / planks;
  const c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  const base = dark ? [88, 58, 34] : [140, 100, 62];
  for (let p = 0; p < planks; p++) {
    const v = (Math.random() - 0.5) * 26;                       // plank-to-plank variation
    const r0 = base[0] + v | 0, g0 = base[1] + v * 0.72 | 0, b0 = base[2] + v * 0.5 | 0;
    g.fillStyle = `rgb(${r0},${g0},${b0})`;
    g.fillRect(0, p * ph, S, ph + 1);
    for (let i = 0; i < 22; i++) {                              // fine grain lines
      const r = base[0] * 0.62 + Math.random() * 16 | 0, gg = base[1] * 0.58 + Math.random() * 11 | 0;
      g.strokeStyle = `rgba(${r},${gg},18,${0.05 + Math.random() * 0.12})`;
      g.lineWidth = 0.5 + Math.random() * 1.1;
      const y = p * ph + Math.random() * ph;
      g.beginPath(); g.moveTo(0, y);
      for (let x = 0; x <= S; x += 16) g.lineTo(x, y + Math.sin(x * 0.028 + i * 1.93) * 3.2 + (Math.random() - 0.5) * 4);
      g.stroke();
    }
    if (Math.random() < 0.75) {                                 // knot
      const kx = 30 + Math.random() * (S - 60), ky = p * ph + ph * (0.3 + Math.random() * 0.4);
      const kr = 5 + Math.random() * 8;
      const rg = g.createRadialGradient(kx, ky, 1, kx, ky, kr * 2.4);
      rg.addColorStop(0, 'rgba(28,16,7,0.6)');
      rg.addColorStop(0.45, 'rgba(50,30,13,0.3)');
      rg.addColorStop(1, 'rgba(50,30,13,0)');
      g.fillStyle = rg;
      g.beginPath(); g.ellipse(kx, ky, kr * 2.4, kr * 1.5, 0.3, 0, Math.PI * 2); g.fill();
    }
    g.fillStyle = 'rgba(18,10,5,0.6)'; g.fillRect(0, p * ph, S, 2);        // plank gap
    g.fillStyle = 'rgba(255,232,196,0.10)'; g.fillRect(0, p * ph + 2, S, 1); // top highlight
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/* Warm shoji paper: soft fiber noise on a cream base. */
function shojiTexture() {
  const S = 256;
  const c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  g.fillStyle = '#e8d9b8'; g.fillRect(0, 0, S, S);
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * S, y = Math.random() * S, l = 3 + Math.random() * 9;
    g.strokeStyle = `rgba(120,95,60,${0.04 + Math.random() * 0.08})`;
    g.lineWidth = 0.7;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + l, y + (Math.random() - 0.5) * 3); g.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* Subtle woven fabric for mattress/bedding. */
function fabricTexture() {
  const S = 256;
  const c = document.createElement('canvas'); c.width = c.height = S;
  const g = c.getContext('2d');
  g.fillStyle = '#e8e2d4'; g.fillRect(0, 0, S, S);
  for (let y = 0; y < S; y += 3) {
    g.fillStyle = y % 6 ? 'rgba(160,150,130,0.16)' : 'rgba(255,255,250,0.12)';
    g.fillRect(0, y, S, 1);
  }
  for (let x = 0; x < S; x += 3) {
    g.fillStyle = x % 6 ? 'rgba(160,150,130,0.10)' : 'rgba(255,255,250,0.08)';
    g.fillRect(x, 0, 1, S);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(3, 3);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export function createMaterials() {
  const woodMap = woodTexture('wall');
  const frameMap = woodTexture('frame');

  const M = {
    /* shell (separate instances so X-ray mode can fade the enclosure only) */
    shellWall: new THREE.MeshStandardMaterial({ map: woodMap, color: 0xffffff, roughness: 0.62 }),
    shellRoof: new THREE.MeshStandardMaterial({ map: woodMap, color: 0xf0e2cc, roughness: 0.7 }),
    floor:     new THREE.MeshStandardMaterial({ map: woodMap, color: 0xd8c0a0, roughness: 0.55 }),
    /* interior millwork */
    wall:   new THREE.MeshStandardMaterial({ map: woodMap, color: 0xffffff, roughness: 0.6 }),
    wallIn: new THREE.MeshStandardMaterial({ color: 0xd9bd8a, roughness: 0.85 }),
    dark:   new THREE.MeshStandardMaterial({ map: frameMap, color: 0xf2e4d0, roughness: 0.72, envMapIntensity: 0.2 }),
    frame:  new THREE.MeshStandardMaterial({ map: frameMap, color: 0xffffff, roughness: 0.6, envMapIntensity: 0.4 }),
    appliance: new THREE.MeshStandardMaterial({ color: 0x2b2b2e, roughness: 0.45, metalness: 0.35, envMapIntensity: 0.5 }),
    mattress: new THREE.MeshStandardMaterial({ map: fabricTexture(), color: 0xf2ede0, roughness: 0.95 }),
    bedding:  new THREE.MeshStandardMaterial({ map: fabricTexture(), color: 0x9db4c8, roughness: 0.95 }),
    shoji:  new THREE.MeshStandardMaterial({ map: shojiTexture(), color: 0xf0e2c4, roughness: 0.55, transparent: true, opacity: 0.88 }),
    glass:  new THREE.MeshPhysicalMaterial({ color: 0xd8e4f0, roughness: 0.55, metalness: 0, transparent: true, opacity: 0.78 }),
    curtain: new THREE.MeshStandardMaterial({ map: fabricTexture(), color: 0x9a9a9a, roughness: 0.95, transparent: true, opacity: 0.55, side: THREE.DoubleSide }),
    insul:  new THREE.MeshStandardMaterial({ color: 0xf4a7c3, roughness: 0.9, transparent: true, opacity: 0.7 }),
    steel:  new THREE.MeshStandardMaterial({ color: 0x84878c, roughness: 0.38, metalness: 0.85 }),
    mirror: new THREE.MeshPhysicalMaterial({ color: 0xdfe8ee, roughness: 0.06, metalness: 1.0, envMapIntensity: 0.25 }),
    screen: new THREE.MeshStandardMaterial({ color: 0x0a1622, roughness: 0.18, metalness: 0.3, emissive: 0x1e5a7a, emissiveIntensity: 0.7 }),
    ledblue: new THREE.MeshStandardMaterial({ color: 0x2266ff, emissive: 0x2266ff, emissiveIntensity: 2.2 }),
    /* skylight luminous panel — emissive driven by day/night */
    sky: new THREE.MeshStandardMaterial({ color: 0x223344, roughness: 0.4, emissive: 0xd6ecff, emissiveIntensity: 2.4 }),
    /* warm LED cove strips — emissive driven by day/night */
    coveled: new THREE.MeshStandardMaterial({ color: 0x554422, roughness: 0.5, emissive: 0xffdf9e, emissiveIntensity: 1.6 }),
    /* x-ray ghost material (swapped in, not shared) */
    xray: new THREE.MeshStandardMaterial({ color: 0x7fb4ff, roughness: 0.9, transparent: true, opacity: 0.1, depthWrite: false }),
  };
  return M;
}
