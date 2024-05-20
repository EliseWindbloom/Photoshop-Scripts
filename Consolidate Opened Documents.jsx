// == Script by Elise Windbloom

// Function to unlock a layer if it's locked
function unlockLayer(layer) {
    if (layer.isBackgroundLayer) {
        // If it's a background layer, convert it to a normal layer
        layer.isBackgroundLayer = false;
    }
    layer.allLocked = false;
}

// Function to copy layer content
function copyLayerContent(layer, sourceDoc) {
    // Activate the source document
    app.activeDocument = sourceDoc;

    // Unlock the layer
    unlockLayer(layer);

    // Make the layer visible and select it
    layer.visible = true;
    layer.selected = true;

    // Copy the layer content
    app.activeDocument.selection.selectAll();
    app.activeDocument.selection.copy(true);
    app.activeDocument.selection.deselect();
}

// Get the first document as the target document
var targetDoc = app.documents[0];
var otherDocs = []; // Array to store other documents

// Loop through all open documents except the first one
for (var i = 1; i < app.documents.length; i++) {
    var currentDoc = app.documents[i];
    otherDocs.push(currentDoc); // Store other documents

    // Loop through all layers in the current document
    for (var j = 0; j < currentDoc.artLayers.length; j++) {
        var currentLayer = currentDoc.artLayers[j];
        // Call the function to copy layer content
        copyLayerContent(currentLayer, currentDoc);

        // Activate the target document and paste the content
        app.activeDocument = targetDoc;
        app.activeDocument.paste();
    }
}

// Close other documents without saving changes
for (var k = 0; k < otherDocs.length; k++) {
    otherDocs[k].close(SaveOptions.DONOTSAVECHANGES);
}
