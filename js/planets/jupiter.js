import * as THREE from 'three';

const jupiterTexture = new THREE.TextureLoader().load('images/jupiter.jpeg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);

export default jupiter;