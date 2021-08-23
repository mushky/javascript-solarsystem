import * as THREE from 'three';

const neptuneTexture = new THREE.TextureLoader().load('images/neptune.jpeg')
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);

export default neptune;