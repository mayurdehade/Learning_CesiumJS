import { cesiumAccessToken, targetLocation, url } from './cesiumConfig.js'

//set default cesium ion access token
Cesium.Ion.defaultAccessToken = cesiumAccessToken;

//const viewer = new Cesium.Viewer('cesiumContainer');
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: await Cesium.createWorldTerrainAsync(),
    shouldAnimate: true
});

viewer.scene.globe.depthTestAgainstTerrain = true;

// Create a handler for screen space events
const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);

// Mouse Down: Left Click Pressed
handler.setInputAction(function (movement) {
    const cartesian = viewer.scene.pickPosition(movement.position);
    if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        const height = cartographic.height.toFixed(2);
        console.log(`🖱️ Mouse Down at: ${lon}, ${lat}, ${height}`);
    }
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

// Mouse Up: Left Click Released
handler.setInputAction(function (movement) {
    const cartesian = viewer.scene.pickPosition(movement.position);
    if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const lat = Cesium.Math.toDegrees(cartographic.latitude).toFixed(6);
        const lon = Cesium.Math.toDegrees(cartographic.longitude).toFixed(6);
        const height = cartographic.height.toFixed(2);
        console.log(`🖱️ Mouse Up at: ${lon}, ${lat}, ${height}`);
    }
}, Cesium.ScreenSpaceEventType.LEFT_UP);


//Events -> Right click, Left Click, Double click, Mouse move, Wheel scroll, Mouse down, Mouse Up, Touch Events

//RIGHT CLICK EVENT
handler.setInputAction(function (movement) {
  const pickedPosition = viewer.scene.pickPosition(movement.position);
  if(pickedPosition) {
    console.log("RIGHT CLICK AT POSITION: "+ pickedPosition);
  }
}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


//DOUBLE CLICK
// handler.setInputAction(function (movement) {
//   const pickedPosition = viewer.scene.pickPosition(movement.position);
//   //convert to degrees
//   const cartographic = Cesium.Cartographic.fromCartesian(pickedPosition);
//   const latitude = Cesium.Math.toDegrees(cartographic.latitude);
//   const longitude = Cesium.Math.toDegrees(cartographic.longitude);
//   const height = cartographic.height;
//   console.log(`Double clicked Position (${longitude}, ${latitude}, ${height})`);
//   if(pickedPosition) {
//     //console.log("DOUBLE CLICKED AT POSITION: "+ pickedPosition);
//   }
// }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);


//MOUSE MOVE
handler.setInputAction(function (movement) {
  const pickedPosition = viewer.scene.pickPosition(movement.endPosition);
  if(pickedPosition) {
    //console.log("Mouse moved to: "+ pickedPosition);
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// DOUBLE CLICK TO ZOOM IN
handler.setInputAction(function (movement) {
    const cartesian = viewer.scene.pickPosition(movement.position);
    if (cartesian) {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromElements(
                cartesian.x, cartesian.y, cartesian.z + 1000.0
            )
        });
    }
}, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);



// remove event
//handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

