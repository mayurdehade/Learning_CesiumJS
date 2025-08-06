Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YjU5NDgwZi03NmI4LTQwNzYtYTA1My1hZjA3YzA5MTI4ODUiLCJpZCI6MzI0MjI1LCJpYXQiOjE3NTMyNjA5MDV9.OpZzb_3kW4NYgeAO0qNrh_pgf8j8pjNAcVHPvehWprY';

const viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});    

viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(-104.9965, 39.74248, 4000)
});
const buildingTileset = await Cesium.createOsmBuildingsAsync();

viewer.scene.primitives.add(buildingTileset);   

async function addBuildingGeoJSON() {
  // Load the GeoJSON file from Cesium ion.
  const geoJSONURL = "./new_building_denver.geojson";
  // Create the geometry from the GeoJSON, and clamp it to the ground.
  const geoJSON = await Cesium.GeoJsonDataSource.load(geoJSONURL, { clampToGround: true });
  // Add it to the scene.
  const dataSource = await viewer.dataSources.add(geoJSON);
  // By default, polygons in CesiumJS will be draped over all 3D content in the scene.
  // Modify the polygons so that this draping only applies to the terrain, not 3D buildings.
  for (const entity of dataSource.entities.values) {
    entity.polygon.classificationType = Cesium.ClassificationType.TERRAIN;
  }
}
addBuildingGeoJSON();

//hide the existing 3D building on the site
buildingTileset.style = new Cesium.Cesium3DTileStyle({
  // Create a style rule to control each building's "show" property.
  show: {
    conditions : [
      // Any building that has this elementId will have `show = false`.
      ['${elementId} === 532245203', false],
      ['${elementId} === 332469316', false],
      ['${elementId} === 332469317', false],
      ['${elementId} === 235368665', false],
      ['${elementId} === 530288180', false],
      ['${elementId} === 530288179', false],
      // If a building does not have one of these elementIds, set `show = true`.
      [true, true]
    ]
  },
  // Set the default color style for this particular 3D Tileset.
  // For any building that has a `cesium#color` property, use that color, otherwise make it white.
  color: "Boolean(${feature['cesium#color']}) ? color(${feature['cesium#color']}) : color('#ffffff')"
});

const newBuildingTileset = await Cesium.Cesium3DTileset.fromIonAssetId(3607217);
viewer.scene.primitives.add(newBuildingTileset);
viewer.flyTo(newBuildingTileset);

document.querySelector('#toggle-building').onclick = function() {
  newBuildingTileset.show = !newBuildingTileset.show;
};