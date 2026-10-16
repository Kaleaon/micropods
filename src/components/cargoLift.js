/* Central Core Heavy-Duty Freight & Pod Rigging Lift.
   12'W × 14'D × 14'H structural hoistway frame with 10'×12' clear elevator cab,
   counterbalanced bi-parting vertical freight doors (8'W × 9'H clear), overhead
   cable sheaves, guide rails, and heavy-duty wheeled A-frame rigging dolly carrying
   a 5'×10' panelized pod cassette segment for rapid pod swap-out.
   Units: 1 world unit = 1 foot. */
import * as THREE from 'three';
import { box, rbox, cyl } from '../helpers.js';

export function buildCargoLift(parent, M, registry, offsetX = 36, offsetZ = -2) {
  const g = new THREE.Group();
  g.position.set(offsetX, 0, offsetZ);
  parent.add(g);

  // 1. Hoistway Structural Steel Frame (12'W × 14'D × 14'H)
  const H = 14;
  // 4 Corner Structural Steel Columns (W8x31 / 8" tube steel)
  const col = (x, z) => box(g, 0.6, H, 0.6, x, 0, z, M.steel);
  col(0.3, 0.3); col(11.7, 0.3);
  col(0.3, 13.7); col(11.7, 13.7);

  // Hoistway Tie Beams & Bracing (at y=0, y=7, y=13.6)
  [0.2, 7.0, 13.6].forEach(y => {
    box(g, 11.4, 0.5, 0.4, 6.0, y, 0.3, M.steel);       // Rear beam
    box(g, 0.4, 0.5, 13.4, 0.3, y, 7.0, M.steel);       // Left beam
    box(g, 0.4, 0.5, 13.4, 11.7, y, 7.0, M.steel);      // Right beam
    if (y > 10) box(g, 11.4, 0.5, 0.4, 6.0, y, 13.7, M.steel); // Front top beam
  });

  // Hoistway Perforated Steel Enclosure Mesh (Sides & Rear)
  box(g, 0.05, 13.0, 13.0, 0.3, 0.5, 7.0, M.appliance);  // Left mesh
  box(g, 0.05, 13.0, 13.0, 11.7, 0.5, 7.0, M.appliance); // Right mesh
  box(g, 11.0, 13.0, 0.05, 6.0, 0.5, 0.3, M.appliance);  // Rear mesh

  // Vertical Guide Rails (T-section steel rails along left and right centers)
  box(g, 0.2, H, 0.2, 0.45, 0, 7.0, M.steel);
  box(g, 0.2, H, 0.2, 11.55, 0, 7.0, M.steel);

  // Overhead Machine Sheaves & Traction Rigging (top y=13.2 to 14.5)
  cyl(g, 1.2, 1.2, 0.3, 4.0, 13.8, 7.0, M.steel, 20); // Sheave 1
  cyl(g, 1.2, 1.2, 0.3, 8.0, 13.8, 7.0, M.steel, 20); // Sheave 2
  // Hoisting Cables
  [-0.1, 0.1].forEach(dx => {
    cyl(g, 0.03, 0.03, 10.0, 4.0 + dx, 8.5, 7.0, M.steel, 8);
    cyl(g, 0.03, 0.03, 10.0, 8.0 + dx, 8.5, 7.0, M.steel, 8);
  });

  // 2. Heavy-Duty Elevator Cab (10'W × 12'D × 10'H inside clear)
  // Cab Platform / Floor (Heavy Diamond Plate Steel with Yellow Safety Perimeter)
  box(g, 10.6, 0.5, 12.6, 6.0, 0.1, 7.0, M.appliance); // Platform sub-frame
  box(g, 10.2, 0.08, 12.2, 6.0, 0.6, 7.0, M.steel);   // Steel deck
  // Yellow/Black Safety Striping along platform threshold
  box(g, 10.0, 0.02, 0.5, 6.0, 0.68, 13.0, M.coveled);

  // Cab Walls (Stainless / Galvanized Steel Panels with Timber Bumper Rails)
  box(g, 0.15, 9.5, 12.0, 1.1, 0.6, 7.0, M.steel);     // Cab left wall
  box(g, 0.15, 9.5, 12.0, 10.9, 0.6, 7.0, M.steel);    // Cab right wall
  box(g, 9.8, 9.5, 0.15, 6.0, 0.6, 1.1, M.steel);      // Cab back wall
  box(g, 10.0, 0.2, 12.0, 6.0, 10.1, 7.0, M.dark);     // Cab ceiling canopy

  // Timber Bumper Guard Rails inside cab (protects from heavy carts)
  [2.0, 4.0].forEach(by => {
    box(g, 0.15, 0.6, 11.8, 1.25, by, 7.0, M.wall);
    box(g, 0.15, 0.6, 11.8, 10.75, by, 7.0, M.wall);
    box(g, 9.6, 0.6, 0.15, 6.0, by, 1.25, M.wall);
  });

  // Industrial Recessed Fluorescent / LED Canopy Fixtures
  box(g, 1.2, 0.08, 8.0, 4.0, 10.05, 7.0, M.sky);
  box(g, 1.2, 0.08, 8.0, 8.0, 10.05, 7.0, M.sky);

  // 3. Bi-Parting Counterbalanced Freight Doors (Front: z=13.7)
  // Upper Door Leaf (telescopes up to clear 9' opening)
  box(g, 9.0, 4.5, 0.15, 6.0, 9.2, 13.65, M.steel);
  // Lower Door Leaf (telescopes down flush with threshold)
  box(g, 9.0, 0.6, 0.15, 6.0, 0.0, 13.65, M.steel);
  // Heavy Door Guide Channels
  box(g, 0.3, H, 0.3, 1.2, 0, 13.65, M.dark);
  box(g, 0.3, H, 0.3, 10.8, 0, 13.65, M.dark);

  // Class C-3 Freight Elevator Control Station (Keyed, Heavy-Duty Pushbuttons)
  box(g, 0.6, 1.4, 0.2, 10.7, 4.2, 12.0, M.appliance);
  box(g, 0.4, 0.8, 0.05, 10.7, 4.5, 12.0, M.screen);

  // 4. Wheeled Rigging A-Frame Cart & Panelized Cassette Demonstration
  // Sitting on the cab platform, ready to roll out into the concourse!
  const cartGroup = new THREE.Group();
  cartGroup.position.set(6.0, 0.68, 7.0);
  g.add(cartGroup);

  // Cart Chassis (6' long × 3.5' wide heavy steel tubing)
  box(cartGroup, 3.5, 0.3, 6.0, 0, 0.2, 0, M.steel);
  // 4 Heavy-Duty Swivel Polyurethane Casters
  const wheel = (wx, wz) => {
    cyl(cartGroup, 0.3, 0.3, 0.2, wx, 0.15, wz, M.appliance, 12);
    box(cartGroup, 0.1, 0.3, 0.2, wx, 0.25, wz, M.steel);
  };
  wheel(-1.5, -2.5); wheel(1.5, -2.5);
  wheel(-1.5, 2.5); wheel(1.5, 2.5);

  // A-Frame Vertical Uprights
  box(cartGroup, 0.2, 6.0, 0.2, 0, 0.5, -2.5, M.steel);
  box(cartGroup, 0.2, 6.0, 0.2, 0, 0.5, 2.5, M.steel);
  box(cartGroup, 0.2, 0.2, 5.2, 0, 6.4, 0, M.steel); // Top ridge beam

  // Prefabricated 5'×10' Panelized Wall Cassette (loaded on the cart!)
  // Shows layered cassette: CFS studs + acoustic mineral wool + pre-finished interior face
  const panel = box(cartGroup, 0.4, 5.0, 9.6, 0.35, 0.8, 0, M.wall);
  // Interlocking cam-lock structural edge detail
  box(cartGroup, 0.45, 0.15, 9.6, 0.35, 0.8, 0, M.steel);
  box(cartGroup, 0.45, 0.15, 9.6, 0.35, 5.65, 0, M.steel);

  return g;
}
