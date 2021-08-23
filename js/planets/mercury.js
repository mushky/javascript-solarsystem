import * as THREE from 'three';
// This is a normal texture that we're going to use for rocky worlds with no atmosphere like mercury and mars. 
// Normals are often used if we want to add some bumps or other effects to a regular flat texture.
const normalTexture = new THREE.TextureLoader().load('images/normal.jpeg')

const mercuryTexture = new THREE.TextureLoader().load('images/mercury.jpeg')
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    normalMap: normalTexture
  })
);

export default mercury;