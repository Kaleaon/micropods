/* UI: view preset buttons + layer toggles, wired to the #ui div.
   Views: OVERVIEW / POD A (20' TWIN) / POD C (10' EXEC) / POD D (15' COUPLES) /
   POD E (20' FAMILY) / BATH (10') / CARGO LIFT (10K LB) / TOP PLAN.
   Toggles: PDLC GLASS (MIRROR <-> WINDOW) / PANEL SEGS (5-FT CASSETTES) /
   X-RAY / DAY-NIGHT / LABELS / WIRING. */
import * as THREE from 'three';
import { makeLabel } from './helpers.js';

const VIEWS = {
  iso:   { name: 'OVERVIEW',       p: [-5, 42, 60],    t: [-5, 4, 5] },
  podA:  { name: 'POD A (20\')',   p: [10, 16, 25],    t: [10, 4, 5] },
  podC:  { name: 'POD C (10\')',   p: [-9, 14, 18],    t: [-9, 4, 5] },
  podD:  { name: 'POD D (15\')',   p: [-24.5, 16, 22], t: [-24.5, 4, 5] },
  podE:  { name: 'POD E (20\')',   p: [-45, 18, 26],   t: [-45, 4, 5] },
  bath:  { name: 'BATH (10\')',    p: [29, 16, 21],    t: [29, 4, 5] },
  lift:  { name: 'CARGO LIFT',     p: [42, 18, 25],    t: [42, 5, 7] },
  top:   { name: 'TOP PLAN',       p: [-5, 80, 5.02],  t: [-5, 0, 5] },
};

export function buildLabels(parent, registry) {
  const defs = [
    // Pod Type E (Family Quad 20')
    ['POD TYPE E · 20\' FAMILY QUAD (4 BERTHS)', -45, 11.2, 5, 1.0],
    ['BUNK STACK 1-2', -51.5, 7.8, 5, 0.65],
    ['BUNK STACK 3-4', -38.5, 7.8, 5, 0.65],
    ['FAMILY LOUNGE', -45, 4.2, 5.2, 0.65],

    // Pod Type D (Couples Micro-Suite 15')
    ['POD TYPE D · 15\' COUPLES SUITE (150 SF)', -24.5, 11.2, 5, 1.0],
    ['QUEEN BED', -27.5, 5.0, 5.0, 0.65],
    ['BANQUETTE', -24.5, 4.0, 6.5, 0.65],
    ['WORK / VANITY', -21.5, 5.0, 8.6, 0.65],

    // Pod Type C (Executive Solo 10')
    ['POD TYPE C · 10\' EXEC SOLO (100 SF)', -9, 11.2, 5, 1.0],
    ['SOLO QUEEN BERTH', -11.3, 5.0, 5.0, 0.65],
    ['EXEC DESK / MONITOR', -6.5, 5.0, 8.6, 0.65],

    // Pod Type A (Standard Twin 20')
    ['POD TYPE A · 20\' TWIN STANDARD (200 SF)', 10, 11.2, 5, 1.0],
    ['SOLO POD A1', 5, 8.6, 5, 0.8],
    ['SOLO POD A2', 15, 8.6, 5, 0.8],
    ['INTERLOCKING BUNK SPINE', 10, 10.0, 5.5, 0.7],

    // Pod Type B (Twin Bathroom Core 10')
    ['POD TYPE B · 10\'×10\' TWIN BATH CORE', 29, 11.2, 5, 1.0],
    ['BATH B1 (PRIVATE)', 26.5, 8.6, 5, 0.65],
    ['BATH B2 (PRIVATE)', 31.5, 8.6, 5, 0.65],

    // Central Core Cargo Lift
    ['CENTRAL CARGO LIFT · 10,000 LB', 42, 14.8, 7, 1.0],
    ['POD CASSETTE SWAP HOISTWAY', 42, 13.5, 7, 0.7],
    ['WHEELED A-FRAME CASSETTE CART', 42, 3.2, 13.5, 0.65],

    // Concourse Hallway
    ['6\'-0" CONCOURSE HALLWAY & CASSETTE TRANSPORT TRACK', -5, 1.5, -3.0, 0.9],
  ];

  defs.forEach(([text, x, y, z, h]) => {
    const s = makeLabel(text, h);
    s.position.set(x, y, z);
    parent.add(s);
    registry.labels.push(s);
  });
}

export function buildWiring(parent, M, registry) {
  const wiring = new THREE.Group();
  wiring.visible = false;
  parent.add(wiring);
  registry.wiring = wiring;
  const wire = (pts, color) => {
    const g = new THREE.BufferGeometry().setFromPoints(pts.map(p => new THREE.Vector3(...p)));
    wiring.add(new THREE.Line(g, new THREE.LineBasicMaterial({ color })));
  };

  const C = { trunk: 0x999999, light: 0x5599ff, mw: 0xff5555, wtr: 0xffdd55, rcp: 0x55ff99, htr: 0xcc66ff };

  // Pod Type A wiring runs
  [5, 15].forEach(px => {
    const xc = px < 10 ? 1 : 19;
    const panelX = px < 10 ? px + 2.6 : px - 2.6;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.2), M.steel);
    panel.position.set(panelX, 7.4, 9.85); wiring.add(panel);
    wire([[panelX, 8.1, 9.8], [panelX, 9.5, 9.8], [xc, 9.5, 9.8], [xc, 9.5, 5]], C.trunk);
    wire([[xc, 9.5, 5], [xc, 8.1, 5]], C.wtr);
    wire([[xc, 9.5, 8], [xc, 4.8, 8]], C.mw);
    wire([[10, 9.5, 9.2], [10, 9.5, 5]], C.light);
    wire([[px + 1.9, 9.5, 1.2], [px + 1.9, 9.5, 0.5], [px + 1.9, 4.3, 0.5]], C.rcp);
    const hx = px < 10 ? 9.25 : 10.75;
    wire([[panelX, 9.5, 9.8], [10, 9.5, 9.0], [hx, 9.5, 4.5], [hx, 2.0, 4.5]], C.htr);
    wire([[px, 9.5, 6.5], [px, 9.68, 5]], C.light);
  });

  // Concourse Main Feeder Busway (overhead at z=-1.5, y=10.2)
  wire([[-55, 10.2, -1.5], [48, 10.2, -1.5]], C.trunk);
  wire([[-55, 10.4, -1.5], [48, 10.4, -1.5]], C.light);
}

export function buildUI(rig, M, registry, requestRender = () => {}) {
  const ui = document.getElementById('ui');
  const mk = (text, active) => {
    const b = document.createElement('button');
    b.textContent = text;
    if (active) b.classList.add('active');
    ui.appendChild(b);
    return b;
  };

  const setView = key => {
    const v = VIEWS[key];
    rig.camera.position.set(...v.p);
    rig.controls.target.set(...v.t);
    rig.controls.update();
    ui.querySelectorAll('button[data-view]').forEach(x => x.classList.toggle('active', x.dataset.view === key));
    requestRender();
  };

  Object.entries(VIEWS).forEach(([key, cfg]) => {
    const b = mk(cfg.name, key === 'iso');
    b.dataset.view = key;
    b.onclick = () => setView(key);
  });

  const toggle = (text, initial, fn) => {
    const b = mk(text, initial);
    let on = initial;
    b.onclick = () => { on = !on; b.classList.toggle('active', on); fn(on); requestRender(); };
    fn(initial);
    return b;
  };

  /* PDLC SMART GLASS Toggle: MIRROR (Privacy) <-> WINDOW (Peoria Panorama) */
  let isWindowMode = false;
  const pdlcBtn = mk('PDLC: MIRROR', false);
  pdlcBtn.onclick = () => {
    isWindowMode = !isWindowMode;
    pdlcBtn.textContent = isWindowMode ? 'PDLC: WINDOW' : 'PDLC: MIRROR';
    pdlcBtn.classList.toggle('active', isWindowMode);

    if (isWindowMode) {
      // Powered state: transparent panoramic smart glass looking out to Peoria skyline
      M.mirror.color.set(0xcae8ff);
      M.mirror.roughness = 0.04;
      M.mirror.metalness = 0.05;
      M.mirror.transparent = true;
      M.mirror.opacity = 0.22;
    } else {
      // Unpowered state: 100% private reflective dielectric mirror
      M.mirror.color.set(0xdfe8ee);
      M.mirror.roughness = 0.06;
      M.mirror.metalness = 1.0;
      M.mirror.transparent = false;
      M.mirror.opacity = 1.0;
    }
    M.mirror.needsUpdate = true;
    requestRender();
  };

  /* 5-Foot Modular Panelized Cassette Seams Toggle */
  toggle('PANEL SEGS', true, on => {
    if (registry.panelizedGroup) registry.panelizedGroup.visible = on;
  });

  /* X-ray: swap enclosure materials for ghost material */
  toggle('X-RAY', false, on => {
    registry.xray.forEach(m => {
      if (on) { m.userData._mat = m.material; m.material = M.xray; }
      else if (m.userData._mat) { m.material = m.userData._mat; }
    });
  });

  /* Day / Night circadian lighting toggle */
  const dayBtn = mk('DAY', true);
  let night = false;
  dayBtn.onclick = () => {
    night = !night;
    dayBtn.textContent = night ? 'NIGHT' : 'DAY';
    dayBtn.classList.toggle('active', !night);
    rig.setDayNight(M, registry, night);
    requestRender();
  };

  /* Labels toggle */
  toggle('LABELS', true, on => {
    registry.labels.forEach(s => s.visible = on);
  });

  /* Wiring & MEP toggle */
  toggle('WIRING', false, on => {
    if (registry.wiring) registry.wiring.visible = on;
  });

  setView('iso');
}
