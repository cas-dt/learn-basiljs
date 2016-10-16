#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  // Objekt b verhindert Konflikte mit sonstwas
  // b.text( "Hello World!", 0, 0, 100, 100 );

  var sel = b.selection();

  b.words( sel, function ( item, i ) {
    var c = b.random( 40, 100 );
    var m = b.random( 40, 100 );
    var y = b.random( 40, 100 );
    b.typo( item, "fillColor", b.color( c, m, y, 0 ) );
    b.typo( item, "characterRotation", b.random( -7, 7 ) );
    b.typo( item, "pointSize", 10 + b.random( -1, 1 ) );
  });
}

b.go();
