/* UI: view preset buttons + layer toggles, wired to the #ui div.
   Views: ISO / POD A / POD B / TOP / FRONT. Toggles: X-RAY / LABELS /
   DAY-NIGHT / INSULATION / WIRING. Labels + wiring ported from the v2 viewer
   ('FLIP-UP DESK' renamed 'DESK'; induction circuit run dropped — no burner). */
import * as THREE from 'three';
import { makeLabel, box } from './helpers.js';

const VIEWS = {
  iso:   { p: [27, 21, 27], t: [10, 3.5, 5] },
  podA:  { p: [6.8, 5.8, 1.2],  t: [1.8, 3.0, 7.5] },
  podB:  { p: [13.2, 5.8, 1.2], t: [18.2, 3.0, 7.5] },
  top:   { p: [10, 46, 5.02], t: [10, 0, 5] },
  front: { p: [10, 7, 33],    t: [10, 4.5, 5] },
};

export function buildLabels(parent, registry) {
  const defs = [
    ['POD A', 5, 8.6, 5, 1.1], ['POD B', 15, 8.6, 5, 1.1],
    ['BUNK SPINE', 10, 11.2, 5.5, 1.0],
    ['LOWER → A', 6.4, 4.4, 5.5, 0.7], ['UPPER → B', 13.6, 8.2, 5.5, 0.7],
    ['CLOSET · SHOJI', 1, 10.6, 2, 0.7], ['WATER UNIT', 1, 10.6, 5, 0.7],
    ['SHELVES + MW/AF', 1, 10.6, 8, 0.7],
    ['CLOSET · SHOJI', 19, 10.6, 2, 0.7], ['WATER UNIT', 19, 10.6, 5, 0.7],
    ['SHELVES + MW/AF', 19, 10.6, 8, 0.7],
    ['DESK', 5, 1.5, 7.9, 0.7], ['DESK', 15, 1.5, 7.9, 0.7],
    ['SUPPLY', 7.55, 1.7, 4.5, 0.55], ['RETURN', 7.55, 9.3, 8.1, 0.55],
    ['SUPPLY', 12.45, 1.7, 4.5, 0.55], ['RETURN', 12.45, 9.3, 8.1, 0.55],
    ['SKYLIGHT', 5, 10.35, 5, 0.6], ['SKYLIGHT', 15, 10.35, 5, 0.6],
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
  [5, 15].forEach(px => {
    const xc = px < 10 ? 1 : 19;
    const panelX = px < 10 ? px + 2.6 : px - 2.6;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.2), M.steel);
    panel.position.set(panelX, 7.4, 9.85); wiring.add(panel);
    const C = { trunk: 0x999999, light: 0x5599ff, mw: 0xff5555, wtr: 0xffdd55, rcp: 0x55ff99, htr: 0xcc66ff };
    wire([[panelX, 8.1, 9.8], [panelX, 9.5, 9.8], [xc, 9.5, 9.8], [xc, 9.5, 5]], C.trunk);
    wire([[xc, 9.5, 5], [xc, 8.1, 5]], C.wtr);                    // water unit 20A
    wire([[xc, 9.5, 8], [xc, 4.8, 8]], C.mw);                     // microwave 20A
    wire([[10, 9.5, 9.2], [10, 9.5, 5]], C.light);                // berth lighting 15A
    wire([[px + 1.9, 9.5, 1.2], [px + 1.9, 9.5, 0.5], [px + 1.9, 4.3, 0.5]], C.rcp); // door/keypad
    const hx = px < 10 ? 9.25 : 10.75;
    wire([[panelX, 9.5, 9.8], [10, 9.5, 9.0], [hx, 9.5, 4.5], [hx, 2.0, 4.5]], C.htr); // heater 30A/240V
    wire([[px, 9.5, 6.5], [px, 9.68, 5]], C.light);               // skylight feed
  });
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
  const setView = name => {
    const v = VIEWS[name];
    rig.camera.position.set(...v.p);
    rig.controls.target.set(...v.t);
    rig.controls.update();
    ui.querySelectorAll('button[data-view]').forEach(x => x.classList.toggle('active', x.dataset.view === name));
    // interior close-ups: hide labels (they'd fill the frame); restore on exterior views
    if (name === 'podA' || name === 'podB') applyLabels(false);
    else applyLabels();
    requestRender();
  };
  Object.keys(VIEWS).forEach(name => {
    const b = mk(name === 'podA' ? 'POD A' : name === 'podB' ? 'POD B' : name.toUpperCase(), name === 'iso');
    b.dataset.view = name;
    b.onclick = () => setView(name);
  });

  const toggle = (text, initial, fn) => {
    const b = mk(text, initial);
    let on = initial;
    b.onclick = () => { on = !on; b.classList.toggle('active', on); fn(on); requestRender(); };
    fn(initial);
  };

  /* X-ray: swap the enclosure's materials for a ghost material */
  toggle('X-RAY', false, on => {
    registry.xray.forEach(m => {
      if (on) { m.userData._mat = m.material; m.material = M.xray; }
      else if (m.userData._mat) { m.material = m.userData._mat; }
    });
  });
  /* Labels toggle — interior views (podA/podB) auto-hide labels since
     the sprites sit inside the room and block the camera. */
  let labelsOn = true;
  const labelBtn = mk('LABELS', true);
  const applyLabels = force => {
    const show = force !== undefined ? force : labelsOn;
    registry.labels.forEach(s => s.visible = show);
    labelBtn.classList.toggle('active', show);
  };
  labelBtn.onclick = () => { labelsOn = !labelsOn; applyLabels(); };
  /* day/night: button shows the mode you are IN */
  const dayBtn = mk('DAY', true);
  let night = false;
  dayBtn.onclick = () => {
    night = !night;
    dayBtn.textContent = night ? 'NIGHT' : 'DAY';
    dayBtn.classList.toggle('active', !night);
    rig.setDayNight(M, registry, night);
    requestRender();
  };
  toggle('INSULATION', true, on => registry.insul.forEach(m => m.visible = on));
  toggle('WIRING', false, on => { if (registry.wiring) registry.wiring.visible = on; });

  setView('iso');
}
