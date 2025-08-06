Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YjU5NDgwZi03NmI4LTQwNzYtYTA1My1hZjA3YzA5MTI4ODUiLCJpZCI6MzI0MjI1LCJpYXQiOjE3NTMyNjA5MDV9.OpZzb_3kW4NYgeAO0qNrh_pgf8j8pjNAcVHPvehWprY';

const viewer = new Cesium.Viewer('cesiumContainer', {
    terrain: Cesium.Terrain.fromWorldTerrain(),
});    

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
    }
});

const buildingTileset = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(buildingTileset);   