import * as THREE from 'three';

const saturnTexture = new THREE.TextureLoader().load('images/saturn.jpeg')
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);

export default saturn;