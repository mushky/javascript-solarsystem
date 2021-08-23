import * as THREE from 'three';

const saturnRingsTexture = new THREE.TextureLoader().load('images/saturn-ring.png')
const saturnRings = new THREE.Mesh(
  new THREE.TorusGeometry(9,0.5,32,100),
  new THREE.MeshStandardMaterial({
    map: saturnRingsTexture
  })
)

export default saturnRings;