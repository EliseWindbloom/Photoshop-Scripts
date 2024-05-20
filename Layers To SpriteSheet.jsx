// Original Script by unknown author

// Save this file in Program Files\Adobe\Photoshop\Presets\Scripts\
// In PhotoShop CS5, run it by going menu File > SCripts > Browse > layersToSprite.js

if (documents.length > 0) {

    // Arrange layers into a sprite sheet. 
    var title = "Layers to Spritesheet";

    // Set up UI.
    var dlg = new Window('dialog', title, [100,100,320,155]);
    dlg.scTxt = dlg.add('statictext',[10,17,55,35],"Colums");
    dlg.RowCount = dlg.add('edittext',[55,15,77,35],'3');
    dlg.okayBtn = dlg.add('button', [155,17,215,35],'Okay', {name:'ok'});
    dlg.show();

     // Adjust this to the number of columns you want
	//leave -1 if you want it to calculate an optimal column value.
    var cols = parseInt(dlg.RowCount.text);
	//var cols = 3;//-1;
	
	var docRef = activeDocument;    
	var numLayers = docRef.artLayers.length; 	

	if (cols < 0) {
		var sqrt = Math.floor( Math.sqrt(numLayers));
		if (Math.sqrt(numLayers) % sqrt == 0) {
			cols = sqrt;
		}else {
			for (i = sqrt+1; i <= numLayers ; i++){
				if (numLayers % i == 0) {
					cols = i;
					break;
				}
			}	
		}
				
		if (cols < 0) {
			cols = numLayers;
		}
	}
	
	var rows = Math.ceil(numLayers/cols);
	
 	var spriteX = docRef.width;
 	var spriteY = docRef.height;	

	// resize the canvas
	app.preferences.rulerUnits = Units.PIXELS;
 	var newX = spriteX * cols;
 	var newY = spriteY * rows;
 	
 	docRef.resizeCanvas( newX, newY, AnchorPosition.TOPLEFT );
 	 	
	// move the layers to their their grid position
 	var rowi = 0;
 	var coli = 0;
 	
 	for (i=(numLayers - 1); i >= 0; i--) 
 	{ 	
 		docRef.artLayers[i].visible = 1;
 		
  		var movX = spriteX*coli;
  		var movY = spriteY*rowi;
  		
 		docRef.artLayers[i].translate(movX, movY);
 		
 		coli++;
 		if (coli > (cols - 1)) 
 		{
	 		rowi++;
	 		coli = 0;
 		}
 	}
}
