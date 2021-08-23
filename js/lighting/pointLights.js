import * as THREE from 'three';

// Create point lights (this is exactly what it sounds like)
export const pointLightNorth = new THREE.PointLight(0xdfffff,0.9);
pointLightNorth.position.set(0,50,0)

export const pointLightSouth = new THREE.PointLight(0xdfffff,0.9);
pointLightSouth.position.set(0,-50,0)

export const pointLightWest = new THREE.PointLight(0xdfffff,0.9);
pointLightWest.position.set(-50,0,0)

export const pointLightEast = new THREE.PointLight(0xdfffff,0.9);
pointLightEast.position.set(50,0,0)

export const pointLightNorthWest = new THREE.PointLight(0xdfffff,0.9);
pointLightNorthWest.position.set(0,0,50)

export const pointLightNorthEast = new THREE.PointLight(0xdfffff,0.9);
pointLightNorthEast.position.set(-0,0,-50)

