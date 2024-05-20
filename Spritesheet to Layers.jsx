// Original Script by unknown author

// Put this file in Program Files\Adobe\Photoshop\Presets\Scripts\
// In PhotoShop menu File > Automate > Scripts: layersToSprite.js

// Arrange layers into a sprite sheet. 

var title = "Spritesheet to Layers";

// Set up UI.
var dlg = new Window('dialog', title, [100,100,320,155]);
dlg.scTxt = dlg.add('statictext',[10,17,45,35],"Cells X");
dlg.CellX = dlg.add('edittext',[55,15,77,35],'7');
dlg.scTxt = dlg.add('statictext',[80,17,115,35],"Cells Y");
dlg.CellY = dlg.add('edittext',[125,15,147,35],'1');
dlg.okayBtn = dlg.add('button', [155,17,215,35],'Okay', {name:'ok'});
dlg.show();

var cellintx = parseInt(dlg.CellX.text);
var cellinty = parseInt(dlg.CellY.text);
var nextrow = parseInt(dlg.CellX.text);
var cellsizew = activeDocument.width/cellintx;
var cellsizeh =activeDocument.height/cellinty;

// Make Duplicate layers because Photoshop doesn't have paste over function.LOL
var dups = cellintx * cellinty;
for(var i = 1; i < dups; i++)
{
activeDocument.artLayers[0].duplicate();
};

// Rename layers
var lyrCount = activeDocument.layers.length
for(var i = lyrCount-1; i>=0;i--)
{
activeDocument.artLayers[i].name = 'Frame '+(lyrCount-i-1);
};

// Begin shifting the layers working from the top layer down. It moves the images so that the lower left cell becomes the top layer
// and the upper left cell becomes the bottom layer (frame 0). The outer loop determins the row and the inner loop determins the column
var cellmovex = cellintx -1;
var cellmovey = cellinty -1;
var columncount =0;
var columnshift = -cellsizew*cellmovex;
var rowshift = -cellsizeh*cellmovey;
for(var i=0; i<=cellinty-1; i++)
{
for(var subi =columncount ; subi <=nextrow-1; subi++)
{
activeDocument.artLayers[subi].translate(columnshift, rowshift);
columnshift = columnshift + cellsizew;
};

columncount += cellintx;
nextrow += cellintx;
columnshift = -cellsizew*cellmovex;
rowshift = rowshift +cellsizeh;
};

// Crop final image once all the layers are in place.
activeDocument.crop (new Array(0,0,cellsizew,cellsizeh)); 