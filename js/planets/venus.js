import * as THREE from 'three';

const venusTexture = new THREE.TextureLoader().load('images/venus.jpeg')
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  }
  )
);

export default venus;