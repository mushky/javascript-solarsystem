import * as THREE from 'three';

// Includes the renderer as well

export const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio); // We can determine the pixel ratio by the window size of the user
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(130);
camera.position.setY(150);

