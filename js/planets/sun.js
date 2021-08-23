import * as THREE from 'three';

const sunTexture = new THREE.TextureLoader().load('images/sun.jpeg')
const sunMap = new THREE.TextureLoader().load('images/sunmap.jpeg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    normalMap: sunMap
  })
);

export default sun;