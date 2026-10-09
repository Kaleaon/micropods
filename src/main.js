/* MicroPod Hotel — Pod Type A interactive 3D webapp.
   Entry: renderer, render loop, resize. Scene/lighting in scene.js,
   geometry in components/, controls in ui.js. Fully self-contained after
   `vite build` (three.js bundled via vite-plugin-singlefile). */
import * as THREE from 'three';
import { createMaterials } from './materials.js';
import { createScene, createRegistry, addContactShadows } from './scene.js';
import { buildShell } from './components/shell.js';
import { buildDoors } from './components/door.js';
import { buildSideRuns } from './components/sideRun.js';
import { buildBunkSpine } from './components/bunkSpine.js';
import { buildBerthAmenities } from './components/berthAmenities.js';
import { buildSkylights } from './components/skylight.js';
import { buildHeaters } from './components/heater.js';
import { buildLabels, buildWiring, buildUI } from './ui.js';

const app = document.getElementById('app');

/* ---------- renderer: ACES, soft shadows ---------- */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
/* The scene is static (no animations): bake the shadow map once instead of
   re-rendering it every frame. Light intensity changes (day/night) don't
   invalidate it — only geometry or light position would. */
renderer.shadowMap.autoUpdate = false;
app.appendChild(renderer.domElement);

/* ---------- scene + materials ---------- */
const M = createMaterials();
const registry = createRegistry();
const rig = createScene(renderer);
const { scene } = rig;

/* ---------- build the pod ---------- */
const world = new THREE.Group();
scene.add(world);
buildShell(world, M, registry);
buildDoors(world, M);
buildSideRuns(world, M, registry);
buildBunkSpine(world, M, registry);
buildBerthAmenities(world, M);
buildSkylights(world, M, registry);
buildHeaters(world, M);
buildLabels(world, registry);
buildWiring(world, M, registry);
addContactShadows(scene);
renderer.shadowMap.needsUpdate = true;   // bake shadows on the first render

/* ---------- UI ---------- */
let needsRender = true;
const requestRender = () => { needsRender = true; };
rig.controls.addEventListener('change', requestRender);
buildUI(rig, M, registry, requestRender);

/* ---------- loop + resize ---------- */
addEventListener('resize', () => {
  rig.camera.aspect = innerWidth / innerHeight;
  rig.camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  requestRender();
});

/* Render on demand: the scene never animates, so skip the render entirely
   when the camera is still and no UI state changed. OrbitControls damping
   keeps firing 'change' while easing, so interaction stays smooth. */
renderer.setAnimationLoop(() => {
  rig.controls.update();
  if (needsRender) {
    needsRender = false;
    renderer.render(scene, rig.camera);
  }
});
requestRender();
