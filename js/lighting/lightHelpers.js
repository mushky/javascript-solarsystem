import * as THREE from 'three';

// Initialize cool helpers so we can see what we're doing better. 
// The grid helper gives us a grid so we can see if things are actually lined up.
// The light helper shows us where exactly our light source is coming from.
export const lightHelperNorth = new THREE.PointLightHelper(pointLightNorth)
export const lightHelperSouth = new THREE.PointLightHelper(pointLightSouth)
export const lightHelperWest = new THREE.PointLightHelper(pointLightWest)
export const lightHelperEast = new THREE.PointLightHelper(pointLightEast)
export const lightHelperNorthWest = new THREE.PointLightHelper(pointLightNorthWest)
export const lightHelperNorthEast = new THREE.PointLightHelper(pointLightNorthEast)
