const cesiumAccessToken = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YjU5NDgwZi03NmI4LTQwNzYtYTA1My1hZjA3YzA5MTI4ODUiLCJpZCI6MzI0MjI1LCJpYXQiOjE3NTMyNjA5MDV9.OpZzb_3kW4NYgeAO0qNrh_pgf8j8pjNAcVHPvehWprY';

const targetLocation = {
  destination: Cesium.Cartesian3.fromDegrees(9.043497160808972, 48.833765400419828, 0),
  orientation: {
    heading: Cesium.Math.toRadians(0.0),
    pitch: Cesium.Math.toRadians(-15.0),
  },
};

const url = {
    'treeGlb' : './glbData/tree.glb'
}

export { cesiumAccessToken, targetLocation, url }; 