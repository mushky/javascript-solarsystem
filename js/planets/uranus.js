import * as THREE from 'three';

const uranusTexture = new THREE.TextureLoader().load('images/uranus.jpeg')
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);

export default uranus;