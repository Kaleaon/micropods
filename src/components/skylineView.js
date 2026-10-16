/* Scenic Peoria Skyline & River Backdrop for the PDLC Smart Window.
   Positioned behind the exterior pod wall (z ~ 12 to 16) so that when PDLC
   smart glass switches from reflective mirror to transparent window, guests
   experience panoramic Peoria bluff & river views.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, cyl } from '../helpers.js';

export function buildSkylineView(parent, M, registry) {
  const g = new THREE.Group();
  g.position.set(0, 0, 16);
  parent.add(g);

  // Curved Horizon Panoramic Backdrop (120' wide × 30' high)
  const geom = new THREE.CylinderGeometry(80, 80, 32, 48, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
  
  // Procedural Peoria Sky & River Canvas Texture
  const S = 1024;
  const c = document.createElement('canvas'); c.width = S; c.height = 512;
  const ctx = c.getContext('2d');

  // Sky Gradient (dawn/day atmosphere)
  const skyGrad = ctx.createLinearGradient(0, 0, 0, 360);
  skyGrad.addColorStop(0, '#1a3b6b');
  skyGrad.addColorStop(0.5, '#4f8bc9');
  skyGrad.addColorStop(0.85, '#dbeaff');
  skyGrad.addColorStop(1, '#ffeed4');
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, S, 360);

  // Distant Bluffs (Illinois River Valley)
  ctx.fillStyle = '#2b4d3a';
  ctx.beginPath();
  ctx.moveTo(0, 360);
  for (let x = 0; x <= S; x += 32) {
    const y = 300 + Math.sin(x * 0.012) * 25 + Math.cos(x * 0.028) * 12;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(S, 360);
  ctx.closePath();
  ctx.fill();

  // Illinois River (reflective blue-gray water)
  const riverGrad = ctx.createLinearGradient(0, 360, 0, 512);
  riverGrad.addColorStop(0, '#3a6688');
  riverGrad.addColorStop(0.4, '#5482a4');
  riverGrad.addColorStop(1, '#23445d');
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, 360, S, 152);

  // Peoria Skyline Silhouettes (Murray Baker Bridge, downtown towers, OSF campus)
  ctx.fillStyle = '#1c2e42';
  // Downtown buildings
  const bldgs = [
    [180, 80, 35], [225, 110, 45], [280, 140, 55], [345, 95, 40],
    [400, 165, 60], [470, 120, 50], [530, 85, 35], [620, 130, 48],
    [680, 175, 65], [755, 90, 40], [820, 115, 45]
  ];
  bldgs.forEach(([x, h, w]) => {
    ctx.fillRect(x, 320 - h, w, h);
    // Window grid dots
    ctx.fillStyle = 'rgba(255, 240, 180, 0.45)';
    for (let wx = x + 4; wx < x + w - 4; wx += 6) {
      for (let wy = 320 - h + 6; wy < 315; wy += 8) {
        if (Math.random() > 0.3) ctx.fillRect(wx, wy, 2, 3);
      }
    }
    ctx.fillStyle = '#1c2e42';
  });

  // Murray Baker Bridge Truss Silhouette (x 50 to 170)
  ctx.strokeStyle = '#182736';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 320);
  ctx.lineTo(90, 260); ctx.lineTo(150, 320);
  ctx.lineTo(200, 265); ctx.lineTo(250, 320);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    side: THREE.BackSide,
    toneMapped: false
  });

  const skyMesh = new THREE.Mesh(geom, mat);
  skyMesh.position.set(-15, 12, -60);
  skyMesh.rotation.y = Math.PI;
  g.add(skyMesh);

  return g;
}
