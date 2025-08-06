import { accessToken } from "./js/CesiumConfig.js";
import { locations } from "./js/Location.js";
import { createSelectElement } from './js/DropDown.js';
import { flyToLocation } from "./js/CesiumViewer.js";

Cesium.Ion.defaultAccessToken = accessToken;

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {   
    terrain: Cesium.Terrain.fromWorldTerrain()
});

viewer.imageryLayers.addImageryProvider(
  new Cesium.OpenStreetMapImageryProvider({
    url: "https://a.tile.openstreetmap.org/"
  })
);


// Add Cesium OSM Buildings, a global 3D buildings layer.
const buildingTileset = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);   

const options = Object.keys(locations).map((key) => ({
    value: key,
    textContent: locations[key].cityName
}));

const dropDown = createSelectElement(options, "toolbar");

flyToLocation(viewer, locations[0].coordinate);

if(dropDown) {
    dropDown.addEventListener("change", (event) => {
        const selectIndex = event.target.value;
        const selectedLocation = Object.values(locations)[selectIndex].coordinate;
        flyToLocation(viewer, selectedLocation);
    })
}