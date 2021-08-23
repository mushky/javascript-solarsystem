import * as THREE from 'three';

const marsTexture = new THREE.TextureLoader().load('images/mars.jpeg')
const marsNormalMap = new THREE.TextureLoader().load('images/mars-normal.jpeg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.5,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: marsNormalMap
  })
);

export default mars;