#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

var arr = [];

function draw() {
  b.layer( "output" );
  b.clear( b.layer( "output" ) );
  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  var fieldNumX = 3;
  var fieldNumY = 5;
  var rasterW = b.width / fieldNumX;
  var rasterH = b.height / fieldNumY;
  var segments = 5;

  for ( var j = 0; j < fieldNumY ; j++ ) {
    for ( var i = 0; i < fieldNumX ; i++ ) {
      var posx = i * rasterW;
      var posy = j * rasterH;
      // arr.push( new Foo() );
      segments += 1;
    }
  }

  for ( var i = 0; i < arr.length; i++ ) {
    arr[ i ].display();
  }
}

b.go();

function Foo() { // if we need an object per rasterfield
}
