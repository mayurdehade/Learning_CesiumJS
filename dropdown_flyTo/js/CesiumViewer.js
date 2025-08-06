export function flyToLocation(viewer, coordinates) {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(...coordinates),
        orientation: {
            heading: Cesium.Math.toRadians(90.0), // Looking South
            pitch: Cesium.Math.toRadians(-30.0),   // Looking down at 30°
            roll: 0.0,
        }
    });
}