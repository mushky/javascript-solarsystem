import './../style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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

// Create the main scene (this is where all the action is going to take place).
const scene = new THREE.Scene();

// Create a camera, for a user to actually see what's going on in the scene. Think of what we're doing as if we were creating a movie.
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initialize a renderer. This is what's going to handle all the graphics we're going to be throwing onto the scene.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// We can determine the pixel ratio by the window size of the user
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Set the initial camera positions
camera.position.setZ(130);
camera.position.setY(150);

// Use the initialized renderer we initialized earlier to add the scene and camera to the render pipeline.
renderer.render(scene,camera);

// Add Point lights
scene.add(
  pointLightNorth,pointLightSouth,pointLightWest,
  pointLightEast,pointLightNorthWest,pointLightNorthEast
);

const gridHelper = new THREE.GridHelper(2200,100)
scene.add(gridHelper)

// Initialize the Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
// How far you can orbit vertically, upper and lower limits.
// Range is 0 to Math.PI radians.
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI; // radians

// How far you can orbit horizontally, upper and lower limits.
// If set, must be a sub-interval of the interval [ - Math.PI, Math.PI ].
controls.minAzimuthAngle = - Infinity; // radians
controls.maxAzimuthAngle = Infinity; // radians
// Bring in our space texture for the background image of the entire scene.
const spaceTexture = new THREE.TextureLoader().load('images/milkywaybackground.jpeg')
scene.background = spaceTexture;

// This is the section where we add the sun and all of its planets. 
// As of now I have everything as a child of the sun.

// Sun
scene.add(sun)
sun.position.z = 1;

// Mercury
mercury.position.z = 1;
mercury.position.setX(-20);

// Venus
venus.position.z = 1;
venus.position.setX(-45);

// Earth
earth.position.z = 1;
earth.position.setX(-80);

// Earth Moon
moon.position.z = 1;
moon.position.setX(-6);
earth.add(moon)

// Mars
mars.position.z = 1;
mars.position.setX(-120);

// Asteroid Belt (Note: as of now the asteroid belt is a flat torus, but we'll fix that in due time)
//scene.add(asteroidBeltPlaceholder)

// Jupiter
jupiter.position.z = 1;
jupiter.position.setX(-260);

// Saturn (saturn has rings that are a child to saturn)
saturn.position.z = 1;
saturn.position.setX(-500);

// Saturn Rings
saturn.add(saturnRings)
saturnRings.rotateX( Math.PI / 2 );

// Uranus
uranus.position.z = 1;
uranus.position.setX(-870);

// Neptune
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