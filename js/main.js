import './../style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { camera, renderer } from './camera/mainCamera'; 
import gridHelper from './helpers/gridHelper';

import { 
  pointLightNorth, pointLightSouth, pointLightWest, 
  pointLightEast, pointLightNorthWest, pointLightNorthEast} 
from './lighting/pointLights';

import sun from './planets/sun';
import mercury from './planets/mercury';
import venus from './planets/venus';
import earth from './planets/earth';
import moon from './planets/moon';
import mars from './planets/mars';
import jupiter from './planets/jupiter';
import saturn from './planets/saturn';
import saturnRings from './planets/saturnRings';
import uranus from './planets/uranus';
import neptune from './planets/neptune';

import rotateAboutPoint from './utilities/rotateAboutPoint';

// The scene is where everything takes place
const scene = new THREE.Scene();

// Camera and Renderer are found in mainCamera.js
renderer.render(scene,camera);

// Add Point lights
scene.add(
  pointLightNorth,pointLightSouth,pointLightWest,
  pointLightEast,pointLightNorthWest,pointLightNorthEast
);

// Grid Helper creates a cool 2d grid on the scene
scene.add(gridHelper)

// Initialize Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// How far you can orbit vertically, upper and lower limits. 
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI; // radians

// How far you can orbit horizontally, upper and lower limits.
// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
controls.minAzimuthAngle = -Infinity; // radians
controls.maxAzimuthAngle = Infinity; // radians

const spaceTexture = new THREE.TextureLoader().load('images/milkywaybackground.jpeg')
scene.background = spaceTexture;

/* 
  Add the sun and all of its planets. 
  Everything is a child of the sun.
*/
scene.add(sun)
sun.position.z = 1;

mercury.position.z = 1;
mercury.position.setX(-20);

venus.position.z = 1;
venus.position.setX(-45);

earth.position.z = 1;
earth.position.setX(-80);

moon.position.z = 1;
moon.position.setX(-6);
earth.add(moon)

mars.position.z = 1;
mars.position.setX(-120);

jupiter.position.z = 1;
jupiter.position.setX(-260);

saturn.position.z = 1;
saturn.position.setX(-500);

saturn.add(saturnRings)
saturnRings.rotateX( Math.PI / 2 );

uranus.position.z = 1;
uranus.position.setX(-870);

neptune.position.z = 1;
neptune.position.setX(-1140);

// Add Each planet as a child to the sun
scene.add(mercury)
scene.add(venus)
scene.add(earth)
scene.add(mars)
scene.add(jupiter)
scene.add(saturn)
scene.add(uranus)
scene.add(neptune)

// Game Loop (this is the main function where everything takes place)
const animate = () => {
  requestAnimationFrame(animate);

  // Set rotation speed of each planetary object
  sun.rotation.y += 0.002;
  mercury.rotation.y += 0.005;
  venus.rotation.y += 0.001;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.01;
  jupiter.rotation.y += 0.001;
  saturn.rotation.y += 0.03;
  uranus.rotation.y += 0.03;
  neptune.rotation.y += 0.03;

  // rotateAboutPoint makes an object rotate on a designated pivot point
  rotateAboutPoint(mercury, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .9, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(venus, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, -.319, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(earth, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .194, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(mars, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .129, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(jupiter, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .09, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(saturn, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .03, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(uranus, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .05, 0), THREE.Math.degToRad(1), false)
  rotateAboutPoint(neptune, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .01, 0), THREE.Math.degToRad(1), false)

  // update the Orbit Controls on each frame
  controls.update();
  // Render every update to the scene and camera
  renderer.render(scene,camera);
}

// Now call the animate function to set everything in motion
animate();