#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  // Objekt b verhindert Konflikte mit sonstwas
  // b.text( "Hello World!", 0, 0, 100, 100 );

  var sel = b.selection();

  b.characters( sel, function ( item, i ) {
    // item = each character
    // i = index of character (
    b.typo( item, "pointSize", b.noise(i*.1)*20 );
  });
}

b.go();
