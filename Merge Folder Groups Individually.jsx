// == Script by Elise Windbloom

// Function to merge each folder group into a layer
function mergeFolderGroupsToLayers() {
  var doc = app.activeDocument;
  var layers = doc.layers;

  var folderGroups = [];
  var mergedLayers = [];
  
  //selects only the first layer
  selectFirstLayer();

  // Collect all top-level folder groups
  for (var i = 0; i < layers.length; i++) {
    var layer = layers[i];
    if (layer.typename === 'LayerSet') {
      folderGroups.push(layer);
    }
  }

  // Merge each folder group into a single layer
  for (var i = 0; i < folderGroups.length; i++) {
    var folderGroup = folderGroups[i];
    folderGroup.merge();
    var mergedLayer = doc.activeLayer;
    mergedLayers.push(mergedLayer);
  }

  // Set the visibility of the merged layers
  for (var i = 0; i < mergedLayers.length; i++) {
    mergedLayers[i].visible = true;
  }

  // Alert the user if no folder group is found
  if (folderGroups.length === 0) {
    alert("No folder groups found in the document.");
  }
}

function selectFirstLayer() {
    // select the first layer
    if (app.documents.length == 0)
    {
      var docRef = app.documents.add();
    }
    else
    {
      var docRef = app.activeDocument;
    }

    if (docRef.layers.length < 2)
    {
      docRef.artLayers.add();
    }

    var activeLayerName = docRef.activeLayer.name;
    var setLayerName = "";
    if (docRef.activeLayer.name != app.activeDocument.layers[docRef.layers.length - 1].name)
    {
      docRef.activeLayer = docRef.layers[docRef.layers.length - 1];
      docRef.activeLayer = docRef.layers[0];
    }
    else
    {
      docRef.activeLayer = docRef.layers[0];
    }
    docRef = null;
}

// Run the function
mergeFolderGroupsToLayers();
