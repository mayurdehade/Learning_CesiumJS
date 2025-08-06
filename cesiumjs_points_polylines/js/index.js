// Import configurations and utility function
import { cesiumAccessToken, targetLocation, url } from './cesiumConfig.js';
import { createModel } from './CesiumFun.js';

// Set Cesium Ion access token to use Cesium's online assets
Cesium.Ion.defaultAccessToken = cesiumAccessToken;

// Initialize Cesium viewer in the container with id 'cesiumContainer'
const viewer = new Cesium.Viewer('cesiumContainer');

// --- Adding Points (Entities) on the Map ---

// Add a red point entity representing Mumbai City
viewer.entities.add({
  name: "Mumbai City",
  position: Cesium.Cartesian3.fromDegrees(72.8777, 19.0760), // longitude, latitude
  point: {
    pixelSize: 20, // size of the point
    color: Cesium.Color.RED // color of the point
  }
});

// Add a red point entity representing Pune City
viewer.entities.add({
  name: "Pune City",
  position: Cesium.Cartesian3.fromDegrees(73.8786, 18.5246),
  point: {
    pixelSize: 15,
    color: Cesium.Color.RED
  },
  label: {
    text: "Pune City",
    font: "20px sans-serif",
    fillColor: Cesium.Color.YELLOW,
    pixelOffset: new Cesium.Cartesian2(0, 30)
  }
});

// --- Adding Polyline (Line Between Points) ---

// Draw a blue line (polyline) from Mumbai to Pune
viewer.entities.add({
  polyline: {
    name: "Sample Path", // Note: name should be outside polyline block
    positions: Cesium.Cartesian3.fromDegreesArray([
      72.8777, 19.0760, // Mumbai
      73.8786, 18.5246, // Pune
    ]),
    width: 4, // line thickness
    material: Cesium.Color.BLUE // line color
  }
});

// --- Adding Polygon ---

// Add a semi-transparent yellow polygon around a rectangular area near Mumbai
viewer.entities.add({
  name: "Polygon Example",
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([
      72.87, 19.07,
      72.89, 19.07,
      72.89, 19.09,
      72.87, 19.09,
    ]),
    material: Cesium.Color.YELLOW.withAlpha(0.5), // semi-transparent fill
  }
});

// --- Adding 3D Model (Tree) ---

// Load a glTF model (tree) and place it on the map
const treeModel = viewer.entities.add({
  name: "Tree",
  position: Cesium.Cartesian3.fromDegrees(72.8777, 19.0760, 0),
  model: {
    uri: url.treeGlb, // Path to the tree model (GLB format)
    minimumPixelSize: 128, // Ensures model is visible at all zoom levels
  }
});

// --- Adding Label, Billboard, and Description ---

viewer.entities.add({
  id: "mumbai-pin",
  name: "Kalyan", // Entity name
  position: Cesium.Cartesian3.fromDegrees(72.9997, 19.0760),

  point: {
    pixelSize: 10,
    color: Cesium.Color.RED
  },

  billboard: {
    image: "./data/2322290.png", // Path to the image
    width: 60,
    height: 60,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM // Billboard is pinned from bottom
  },

  label: {
    text: "Mumbai Emblem",
    font: "20px sans-serif",
    fillColor: Cesium.Color.YELLOW,
    outlineColor: Cesium.Color.RED,
    outlineWidth: 2,
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
    pixelOffset: new Cesium.Cartesian2(0, 30) // Offset label above the billboard
  },

  description: `
    <h3>Mumbai</h3>
    <p>Municipal emblem of Greater Mumbai</p>
  `, // HTML content shown on clicking the entity

  // Orientation of the entity using quaternion (optional for billboard/label)
  orientation: Cesium.Transforms.headingPitchRollQuaternion(
    Cesium.Cartesian3.fromDegrees(72.9997, 19.0760),
    new Cesium.HeadingPitchRoll(
      Cesium.Math.toRadians(45), // heading (rotation around vertical axis)
      Cesium.Math.toRadians(0),  // pitch (tilt up/down)
      Cesium.Math.toRadians(0)   // roll (tilt side)
    )
  )
});

// --- Moving Point Entity (Animation) ---

let long = 72.99;
let lat = 19.07;

// Add a red point that moves by changing longitude every frame
const movingEntity = viewer.entities.add({
  id: "moving point",
  position: new Cesium.CallbackProperty(() => {
    long += 0.00001; // Increase longitude over time
    return Cesium.Cartesian3.fromDegrees(long, lat);
  }, false), // Callback property runs continuously
  point: {
    pixelSize: 10,
    color: Cesium.Color.RED
  }
});

// --- Remove Entity After Timeout ---

// Remove the tree model after 10 seconds
setTimeout(() => {
  viewer.entities.remove(treeModel); // Remove from scene
  alert("Tree Entity Model is Removed!!!"); // Show alert to user
}, 10000); // 10 seconds = 10000 milliseconds

// --- Access All Entities ---

// Get all entities currently added to the viewer
const allEntities = viewer.entities.values;
console.log(allEntities); // Log them to browser console

// --- Move Camera to Mumbai Emblem Pin ---

// Animate camera to focus on the "mumbai-pin" location from above
viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(72.9997, 19.0760, 100), // 100 meters height
  orientation: {
    heading: Cesium.Math.toRadians(0),   // face north
    pitch: Cesium.Math.toRadians(-90),   // look straight down
  }
});
