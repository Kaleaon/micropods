/* 5-Foot Modular Panelization System & Concourse Transport Track.
   Illustrates how every pod breaks down into 5'×10' modular cassettes
   (cold-formed steel frames, pre-wired acoustic panels, cam-lock connectors)
   that easily fit within the Central Core Cargo Lift and navigate the 6'
   concourse hallway for fast 4-6 hour pod replacement without structural demo.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, cyl } from '../helpers.js';

export function buildPanelizedSystem(parent, M, registry) {
  const g = new THREE.Group();
  parent.add(g);
  registry.panelizedGroup = g;

  // 1. 6-Foot Wide Concourse Hallway (runs in front of pods: z = -6.0 to 0)
  // Concourse Floor (spanning from Family Suite x=-55 to Cargo Lift x=48)
  const hallLength = 106;
  const hallXCenter = -3.5;
  box(g, hallLength, 0.35, 6.0, hallXCenter, -0.05, -3.0, M.floor);

  // Concourse Wayfinding & Cargo Rigging Striping (Yellow/Slate perimeter lines)
  box(g, hallLength, 0.02, 0.3, hallXCenter, 0.31, -0.15, M.coveled);
  box(g, hallLength, 0.02, 0.3, hallXCenter, 0.31, -5.85, M.dark);

  // 2. Modular 5-Foot Grid Floor Cassette Seam Indicators
  // Marks the 5-foot boundaries along the entire floor plate
  const gridPositions = [
    // Family Suite (x = -55 to -35)
    -55, -50, -45, -40, -35,
    // Couples Suite (x = -32 to -17)
    -32, -27, -22, -17,
    // Executive Pod (x = -14 to -4)
    -14, -9, -4,
    // Twin Pod A (x = 0 to 20)
    0, 5, 10, 15, 20,
    // Bath Pod B (x = 24 to 34)
    24, 29, 34,
    // Cargo Lift (x = 36 to 48)
    36, 48
  ];

  const seamMat = new THREE.MeshBasicMaterial({ color: 0x4da3ff, transparent: true, opacity: 0.85 });
  const camMat = new THREE.MeshStandardMaterial({ color: 0xffd166, roughness: 0.3, metalness: 0.8 });

  gridPositions.forEach(x => {
    // Floor cassette joint seam line
    const seam = box(g, 0.06, 0.04, 10.0, x, 0.41, 5.0, seamMat);
    // Cam-lock structural perimeter connector plates
    [0.5, 5.0, 9.5].forEach(z => {
      cyl(g, 0.15, 0.15, 0.06, x, 0.42, z, camMat, 12);
      box(g, 0.4, 0.03, 0.25, x, 0.41, z, M.steel);
    });
  });

  // Concourse Transport Path Wayfinding Dashes (shows dolly path from Lift to Pods)
  for (let x = 38; x >= -52; x -= 3) {
    box(g, 1.5, 0.02, 0.15, x, 0.31, -3.0, M.sky);
  }

  return g;
}
