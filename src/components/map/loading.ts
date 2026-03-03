import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export type LoadedGLTF = {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
};

export const loadGLB = (loader: GLTFLoader, url: string) =>
  new Promise<LoadedGLTF>((res, rej) => loader.load(url, res, undefined, rej));

export const enableMeshShadows = (root: THREE.Object3D) => {
  root.traverse((node: THREE.Object3D) => {
    if (node instanceof THREE.Mesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
};

export const fixMapMaterials = (gltfScene: THREE.Object3D) => {
  gltfScene.traverse((node: THREE.Object3D) => {
    if (!(node instanceof THREE.Mesh)) return;

    const name = node.name.toLowerCase();
    if (name === 'sphere' || name.includes('sky')) {
      node.visible = false;
      return;
    }

    if (name === 'building' || name === 'plane.002') {
      const mats: THREE.Material[] = Array.isArray(node.material)
        ? node.material
        : [node.material];
      mats.forEach((mat) => {
        mat.side = THREE.DoubleSide;
      });
      node.castShadow = true;
      node.receiveShadow = true;
      return;
    }

    if (name === 'floor' || name === 'plane.003') {
      node.visible = false;
      return;
    }

    node.castShadow = true;
    node.receiveShadow = true;
  });
};

export const applyLowQualityModelTuning = (root: THREE.Object3D) => {
  root.traverse((node: THREE.Object3D) => {
    if (!(node instanceof THREE.Mesh)) return;

    node.castShadow = false;
    node.receiveShadow = false;
    node.frustumCulled = true;

    const geometry = node.geometry;
    if (!geometry) return;
    geometry.computeBoundingSphere();

    const positionAttr = geometry.getAttribute('position');
    if (positionAttr && positionAttr.count > 60000) {
      geometry.setDrawRange(0, Math.floor(positionAttr.count * 0.7));
    }
  });
};
