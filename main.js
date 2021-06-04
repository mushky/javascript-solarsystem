import './style.css'

// Import the THREE.js library
import * as THREE from 'three';
// Import OrbitControls which allow users to easily pan and zoom through a scene
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Create the main scene (this is where all the action is going to take place).
const scene = new THREE.Scene();

// Create a camera, for a user to actually see what's going on in the scene. Think of what we're doing as if we were creating a movie.
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initialize a renderer. This is what's going to handle all the graphics we're going to be throwing onto the scene.
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// We can determine the pixel ratio by the window size of the user
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Set the initial camera positions
camera.position.setZ(30);
camera.position.setY(50);

// Use the initialized renderer we initialized earlier to add the scene and camera to the render pipeline.
renderer.render(scene,camera);

// Create a pointlight (this is exactly what it sounds like)
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0,0,0)

// Create an ambient light (this is a light that basically shows up on the entire scene)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Initialize cool helpers so we can see what we're doing better. 
// The grid helper gives us a grid so we can see if things are actually lined up.
// The light helper shows us where exactly our light source is coming from.
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(3000,100)
scene.add(gridHelper, lightHelper)

// Initialize the Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Bring in our space texture for the background image of the entire scene.
const spaceTexture = new THREE.TextureLoader().load('images/milkywaybackground.jpeg')
scene.background = spaceTexture;

// This is a normal texture that we're going to use for rocky worlds with no atmosphere like mercury and mars. 
// Normals are often used if we want to add some bumps or other effects to a regular flat texture.
const normalTexture = new THREE.TextureLoader().load('images/normal.jpeg')

// This is the section where we add the sun and all of its planets. 
// As of now I have everything as a child of the sun.

// Sun
const sunTexture = new THREE.TextureLoader().load('images/sun.jpeg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
scene.add(sun)
sun.position.z = 1;

// Mercury
const mercuryTexture = new THREE.TextureLoader().load('images/mercury.jpeg')
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(2,32,32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture,
    normalMap: normalTexture
  }
  )
);
mercury.position.z = 1;
mercury.position.setX(-20);

// Venus
const venusTexture = new THREE.TextureLoader().load('images/venus.jpeg')
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: venusTexture,
  }
  )
);
venus.position.z = 1;
venus.position.setX(-35);

// Earth
const earthTexture = new THREE.TextureLoader().load('images/earth.jpeg')
const earthNormalTexture = new THREE.TextureLoader().load('images/earth-normal-map.tiff')
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture
  })
);
earth.position.z = 1;
earth.position.setX(-50);

// Mars
const marsTexture = new THREE.TextureLoader().load('images/mars.jpeg')
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(2.5,32,32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture
  })
);
mars.position.z = 1;
mars.position.setX(-80);

// Asteroid Belt (Note: as of now the asteroid belt is a flat torus, but we'll fix that in due time)
const asteroidBeltPlaceholder = new THREE.Mesh(
  new THREE.TorusGeometry(150,2,2,100),
  new THREE.MeshBasicMaterial( { color: 0xffff00, wireFrame: true  })
)
asteroidBeltPlaceholder.position.z = 1;
asteroidBeltPlaceholder.position.setX(0)
asteroidBeltPlaceholder.rotateX( Math.PI / 2 );
scene.add(asteroidBeltPlaceholder)

// Jupiter
const jupiterTexture = new THREE.TextureLoader().load('images/jupiter.jpeg')
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(5,32,32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture,
  })
);
jupiter.position.z = 1;
jupiter.position.setX(-260);

// Saturn (saturn has rings that are a child to saturn)
const saturnTexture = new THREE.TextureLoader().load('images/saturn.jpeg')
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture,
  })
);

saturn.position.z = 1;
saturn.position.setX(-500);

// Saturn Rings
const saturnRingsTexture = new THREE.TextureLoader().load('images/saturn-ring.png')
const saturnRings = new THREE.Mesh(
  new THREE.TorusGeometry(9,0.5,32,100),
  new THREE.MeshStandardMaterial({
    map: saturnRingsTexture
  })
)
saturn.add(saturnRings)
saturnRings.rotateX(240);

// Uranus
const uranusTexture = new THREE.TextureLoader().load('images/uranus.jpeg')
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture,
  })
);
uranus.position.z = 1;
uranus.position.setX(-970);

// Neptune
const neptuneTexture = new THREE.TextureLoader().load('images/neptune.jpeg')
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({
    map: neptuneTexture,
  })
);
neptune.position.z = 1;
neptune.position.setX(-1940);

// Add Each planet as a child to the sun
sun.add(mercury)
sun.add(venus)
sun.add(earth)
sun.add(mars)
sun.add(jupiter)
sun.add(saturn)
sun.add(uranus)
sun.add(neptune)

// Game Loop (this is the main function where everything takes place)
function animate() {
  requestAnimationFrame(animate);

  // Set rotation speed of each planetary object
  sun.rotation.y += 0.002;
  mercury.rotation.y += 0.005;
  venus.rotation.y += 0.001;
  earth.rotation.y += 0.01;
  mars.rotation.y += 0.01;
  jupiter.rotation.y += 0.05;
  saturn.rotation.y += 0.03;
  uranus.rotation.y += 0.03;
  neptune.rotation.y += 0.03;

  // rotateAboutPoint makes an object rotate on a designated pivot point
  rotateAboutPoint(mercury, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .9, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(venus, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, -.319, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(earth, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .194, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(mars, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .129, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(jupiter, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .09, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(saturn, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .03, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(uranus, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .05, 0), THREE.Math.degToRad(1), true)
  rotateAboutPoint(neptune, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .01, 0), THREE.Math.degToRad(1), true)

  // update the Orbit Controls on each frame
  controls.update();
  // Render every update to the scene and camera
  renderer.render(scene,camera);
}

// Now call the animate function to set everything in motion
animate();

// obj - your object (THREE.Object3D or derived)
// point - the point of rotation (THREE.Vector3)
// axis - the axis of rotation (normalized THREE.Vector3)
// theta - radian value of rotation
// pointIsWorld - boolean indicating the point is in world coordinates (default = false)
// Example Call: rotateAboutPoint(mercury, new THREE.Vector3(sun.x, sun.y, sun.z), new THREE.Vector3(0, .1, 0), THREE.Math.degToRad(1), true)
function rotateAboutPoint(obj, point, axis, theta, pointIsWorld){
  pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

  if(pointIsWorld){
    obj.parent.localToWorld(obj.position); // compensate for world coordinate
  }

  obj.position.sub(point); // remove the offset
  obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
  obj.position.add(point); // re-add the offset

  if(pointIsWorld){
      obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
  }

  //obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,10,10);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star);
}

//Array(200).fill().forEach(addStar);

// function moveCamera() {

//   const t = document.body.getBoundingClientRect().top;

//   //mercury.rotation.y += 0.075;
//   //mercury.rotation.z += 0.05;

//   camera.position.z = t * -0.01;
//   camera.position.x = t * -0.0002;
//   camera.position.y = t * -0.002;

// }

//document.body.onscroll = moveCamera