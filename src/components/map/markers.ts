import * as THREE from 'three';
import type { MarkerDef } from './config';

export type MarkerRuntime = {
  page: string;
  label: string;
  pos: THREE.Vector3;
  color: number;
  group: THREE.Group;
  ring: THREE.Mesh;
  pillar: THREE.Mesh;
  glow: THREE.PointLight;
  baseY: number;
};

export const createMarkerPrompt = () => {
  const markerPrompt = document.createElement('div');
  markerPrompt.id = 'marker-prompt';
  markerPrompt.style.cssText = `
      position: fixed;
      bottom: 120px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 45;
      padding: 12px 28px;
      border-radius: 14px;
      background: rgba(0,0,0,0.72);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255,255,255,0.18);
      color: #fff;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 15px;
      letter-spacing: 0.4px;
      text-align: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
      white-space: nowrap;
    `;
  document.body.appendChild(markerPrompt);
  return markerPrompt;
};

export const setMarkerPromptState = (
  markerPrompt: HTMLDivElement,
  marker: MarkerRuntime | null,
  canActivate: boolean,
) => {
  if (!marker) {
    markerPrompt.style.opacity = '0';
    markerPrompt.style.pointerEvents = 'none';
    return;
  }

  markerPrompt.style.color = '#' + new THREE.Color(marker.color).getHexString();
  markerPrompt.textContent = canActivate
    ? `${marker.label} — Press E or tap here`
    : `${marker.label} — get closer to interact`;
  markerPrompt.style.opacity = '1';
  markerPrompt.style.pointerEvents = canActivate ? 'auto' : 'none';
};

export const createSceneMarkers = (
  scene: THREE.Scene,
  defs: MarkerDef[],
) => {
  const markers: MarkerRuntime[] = [];
  const ringGeo = new THREE.TorusGeometry(1.2, 0.08, 16, 48);
  const pillarGeo = new THREE.CylinderGeometry(0.06, 0.06, 4, 8);

  for (const def of defs) {
    const col = new THREE.Color(def.color);
    const group = new THREE.Group();
    group.position.set(def.pos[0], def.pos[1], def.pos[2]);

    const pillarMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.45 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.y = 2;
    group.add(pillar);

    const ringMat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 3.5;
    group.add(ring);

    const glow = new THREE.PointLight(def.color, 2, 12);
    glow.position.y = 2.5;
    group.add(glow);

    scene.add(group);

    markers.push({
      page: def.page,
      label: def.label,
      pos: new THREE.Vector3(def.pos[0], def.pos[1], def.pos[2]),
      color: def.color,
      group,
      ring,
      pillar,
      glow,
      baseY: def.pos[1],
    });
  }

  return { markers, ringGeo, pillarGeo };
};
