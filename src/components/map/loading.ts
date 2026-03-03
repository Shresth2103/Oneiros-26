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
