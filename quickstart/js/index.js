//CesiumJS Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YjU5NDgwZi03NmI4LTQwNzYtYTA1My1hZjA3YzA5MTI4ODUiLCJpZCI6MzI0MjI1LCJpYXQiOjE3NTMyNjA5MDV9.OpZzb_3kW4NYgeAO0qNrh_pgf8j8pjNAcVHPvehWprY';

//Viewer to setup the globe and cesium cantainer
const viewer = new Cesium.Viewer('cesiumContainer', {
    //terrain is used to define the surface of the earth globe
    terrain: Cesium.Terrain.fromWorldTerrain(),
});    

//camera angle: flyTo to navigate to the location on the globe
viewer.camera.flyTo({
    //location: convert it from Cartegraphic to cartesian
    destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    //control the direction of camera
    orientation: {
        heading: Cesium.Math.toRadians(0.0), //left right (North)
        pitch: Cesium.Math.toRadians(-15.0), //up down (look slightly downword)
    }
});

//load and display real-world building from the OpenStreetMap buildings dataset
//download 3D tileset of buildings from OpenStreetMap (OSM) returns cesium3DTileset object
const buildingTileset = await Cesium.createOsmBuildingsAsync();

//this adds the buildingtileset to the scene, so Cesium can render the building on the globe.
//primitives is the collection where all 3D objects are stored in cesium.
viewer.scene.primitives.add(buildingTileset);   