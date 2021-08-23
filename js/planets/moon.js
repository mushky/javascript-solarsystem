import * as THREE from 'three';
// This is a normal texture that we're going to use for rocky worlds with no atmosphere like mercury and mars. 
// Normals are often used if we want to add some bumps or other effects to a regular flat texture.
const normalTexture = new THREE.TextureLoader().load('images/normal.jpeg')

const moonTexture = new THREE.TextureLoader().load('images/moon.jpeg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.6,32,32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

export default moon;