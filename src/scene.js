/* Scene assembly: camera, OrbitControls, the full lighting rig, and IBL.
   Physical light units (three r155+): directional intensity is unitless,
   point/spot intensity is candela — interior points need single/double digits.
   Registry collects handles components expose for the UI toggles. */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';

export function createRegistry() {
  return {
    xray: [], insul: [], roof: null, skylightPanels: [],
    skylightLights: [], labels: [], berthLights: [], bathPod: null,
    pdlcPanels: [], panelizedGroup: null
  };
}

export function createScene(renderer) {
  RectAreaLightUniformsLib.init();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0e13);
  scene.fog = new THREE.Fog(0x0b0e13, 90, 240);

  const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 800);
  camera.position.set(-5, 42, 60);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(-5, 4.0, 5);
  controls.maxPolarAngle = Math.PI * 0.495;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  /* IBL: real room environment via PMREM — gives every PBR material (and the
     physical mirror) true ambient reflections. */
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.45;
  pmrem.dispose();

  /* key sun: warm, shadow-casting */
  scene.add(new THREE.HemisphereLight(0xdfeaff, 0x2a2018, 0.5));
  const sun = new THREE.DirectionalLight(0xfff1dd, 2.6);
  sun.position.set(0, 48, 35);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -70; sun.shadow.camera.right = 60;
  sun.shadow.camera.top = 40; sun.shadow.camera.bottom = -40;
  sun.shadow.camera.near = 1; sun.shadow.camera.far = 140;
  sun.shadow.bias = -0.0005;
  sun.shadow.normalBias = 0.02;
  scene.add(sun);
  /* cool fill from the opposite side */
  const fill = new THREE.DirectionalLight(0x9fc3e8, 0.6);
  fill.position.set(-30, 20, -25);
  scene.add(fill);

  /* warm interior accents per pod + cool spine accent (kept dim; IBL carries ambient) */
  const podGlowA = new THREE.PointLight(0xffd9a8, 6, 20, 2);
  podGlowA.position.set(5, 8.2, 5); scene.add(podGlowA);
  const podGlowB = new THREE.PointLight(0xffd9a8, 6, 20, 2);
  podGlowB.position.set(15, 8.2, 5); scene.add(podGlowB);
  const spineGlow = new THREE.PointLight(0x9fc3e8, 4, 14, 2);
  spineGlow.position.set(10, 8.2, 5); scene.add(spineGlow);

  /* berth reading lights: one warm point per berth, no shadows */
  const berthLights = [];
  [[10, 5.4, 5.5], [10, 8.9, 5.5]].forEach(([x, y, z]) => {
    const p = new THREE.PointLight(0xffd9a8, 5, 9, 2);
    p.position.set(x, y, z);
    scene.add(p);
    berthLights.push(p);
  });

  /* expansive ground plane under the campus concourse modules */
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 100),
    new THREE.MeshStandardMaterial({ color: 0x11151c, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(-5, -0.52, 5);
  ground.receiveShadow = true;
  scene.add(ground);
  // Grid helper with 5-foot divisions (160' x 160' / 32 = 5-foot cells)
  const grid = new THREE.GridHelper(160, 32, 0x2a5f9e, 0x16283f);
  grid.position.set(-5, -0.5, 5);
  scene.add(grid);

  const rig = { scene, camera, controls, sun, fill, podGlowA, podGlowB, spineGlow, berthLights };

  /* Day/night: day = skylight-driven daylight; night = skylight off, warm
     berth + cove lighting takes over. Materials passed in from main. */
  rig.setDayNight = (M, registry, night) => {
    if (!night) {
      sun.intensity = 2.6; fill.intensity = 0.6;
      scene.environmentIntensity = 0.45;
      scene.background.set(0x0b0e13); scene.fog.color.set(0x0b0e13);
      podGlowA.intensity = podGlowB.intensity = 6; spineGlow.intensity = 4;
      berthLights.forEach(p => p.intensity = 5);
      registry.skylightLights.forEach(l => { l.intensity = 4.5; l.color.set(0xd8ecff); });
      M.sky.emissive.set(0xd6ecff); M.sky.emissiveIntensity = 2.4;
      M.coveled.emissiveIntensity = 1.6;
    } else {
      sun.intensity = 0.12; fill.intensity = 0.08;
      scene.environmentIntensity = 0.08;
      scene.background.set(0x05070c); scene.fog.color.set(0x05070c);
      podGlowA.intensity = podGlowB.intensity = 2; spineGlow.intensity = 1;
      berthLights.forEach(p => p.intensity = 11);
      registry.skylightLights.forEach(l => { l.intensity = 0.25; l.color.set(0xffd9a8); });
      M.sky.emissive.set(0x1a2233); M.sky.emissiveIntensity = 0.12;
      M.coveled.emissiveIntensity = 3.2;
    }
  };

  return rig;
}

/* Contact shadows: soft radial dark planes under the big masses, multiply
   blending — grounds the furniture beyond what the shadow map gives. */
export function addContactShadows(scene) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const rg = g.createRadialGradient(64, 64, 6, 64, 64, 62);
  rg.addColorStop(0, 'rgb(150,150,150)');
  rg.addColorStop(0.55, 'rgb(200,200,200)');
  rg.addColorStop(1, 'rgb(255,255,255)');
  g.fillStyle = rg; g.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  const mat = new THREE.MeshBasicMaterial({ map: tex, blending: THREE.MultiplyBlending, depthWrite: false, toneMapped: false });
  const put = (w, d, x, z, y = 0.02) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, y, z);
    m.renderOrder = 5;
    scene.add(m);
  };
  put(4.8, 7.8, 10, 5.5);        // bunk spine Pod A
  put(10, 10, -9, 5);            // Pod C (Executive 10')
  put(15, 10, -24.5, 5);         // Pod D (Couples 15')
  put(20, 10, -45, 5);           // Pod E (Family 20')
  put(10.5, 10.5, 29, 5);        // 10x10 bath pod
  put(12.5, 14.5, 42, 5);        // Central Core Cargo Lift
}
