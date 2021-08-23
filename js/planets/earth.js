import * as THREE from 'three';

const earthTexture = new THREE.TextureLoader().load('images/earth.jpeg')
const earthNormalTexture = new THREE.TextureLoader().load('images/earth-normal-map.tiff')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture
  })
);

export default earth;