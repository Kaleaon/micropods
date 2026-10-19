/* MicroPod Hotel — Multi-Suite Interactive 3D WebApp.
   Includes Pod Type A (20' Twin Solo), Pod Type C (10' Executive Solo),
   Pod Type D (15' Couples Micro-Suite), Pod Type E (20' Family Quad Bunk),
   Pod Type B (10' Twin Full Bathroom Core), Central Core 10,000 lb Cargo Lift,
   6' Concourse Hallway with 5-Foot Modular Panelization Seams, and switchable
   PDLC Smart Mirror-Windows with Peoria Skyline & River panorama.
   Units: 1 world unit = 1 foot. */
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
import { buildBathPod } from './components/bathPod.js';
import { buildExecutivePod } from './components/executivePod.js';
import { buildCouplesSuite } from './components/couplesSuite.js';
import { buildFamilySuite } from './components/familySuite.js';
import { buildCargoLift } from './components/cargoLift.js';
import { buildSkylineView } from './components/skylineView.js';
import { buildPanelizedSystem } from './components/panelizedSegments.js';
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
renderer.shadowMap.autoUpdate = false;
app.appendChild(renderer.domElement);

/* ---------- scene + materials ---------- */
const M = createMaterials();
const registry = createRegistry();
const rig = createScene(renderer);
const { scene } = rig;

/* ---------- build the modular campus lineup ---------- */
const world = new THREE.Group();
scene.add(world);

// 1. Pod Type A: 20' Standard Twin Module (x = 0 to 20)
buildShell(world, M, registry);
buildDoors(world, M);
buildSideRuns(world, M, registry);
buildBunkSpine(world, M, registry);
buildBerthAmenities(world, M);
buildSkylights(world, M, registry);
buildHeaters(world, M);

// 2. Pod Type C: 10' Executive Solo Suite (x = -14 to -4)
buildExecutivePod(world, M, registry, -14, 0);

// 3. Pod Type D: 15' Couples Micro-Suite (x = -32 to -17)
buildCouplesSuite(world, M, registry, -32, 0);

// 4. Pod Type E: 20' Family Quad Bunk Suite (x = -55 to -35)
buildFamilySuite(world, M, registry, -55, 0);

// 5. Pod Type B: 10' Twin Bathroom Core Module (x = 24 to 34)
const bathGroup = buildBathPod(world, M, 24, 0);
registry.bathPod = bathGroup;

// 6. Twin Tower Heavy-Duty Freight & Pod Rigging Lifts (CL-1 North & CL-2 South)
buildCargoLift(world, M, registry, 36, -2);   // North Tower Cargo Lift (CL-1)
buildCargoLift(world, M, registry, -72, -2);  // South Tower Cargo Lift (CL-2)

// 7. 6' Concourse Hallway & 5-Foot Modular Panelization Seams
buildPanelizedSystem(world, M, registry);

// 8. Peoria River & Skyline Panoramic Backdrop for PDLC Windows
buildSkylineView(world, M, registry);

// 9. Callout Badges & Wiring Systems
buildLabels(world, registry);
buildWiring(world, M, registry);
addContactShadows(scene);
renderer.shadowMap.needsUpdate = true;

/* ---------- UI Controls & Camera Presets ---------- */
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

renderer.setAnimationLoop(() => {
  rig.controls.update();
  if (needsRender) {
    needsRender = false;
    renderer.render(scene, rig.camera);
  }
});
requestRender();
