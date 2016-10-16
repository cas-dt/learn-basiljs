#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  // Objekt b verhindert Konflikte mit sonstwas
  // b.text( "Hello World!", 0, 0, 100, 100 );

  var col1arr =[];
  var col2arr =[];
  var uwArr =[];
  var sel = b.selection();
  var wordCount = sel.words.length;
  for ( var c = 0; c < wordCount; c++ ) {
    var col1 = Math.floor( b.random( 50, 100 ) );
    var col2 = Math.floor( b.random( 50, 100 ) );
    var uw = Math.floor( b.random( 3, 20 ) );
    col1arr.push( col1 );
    col2arr.push( col2 );
    uwArr.push( uw );
  }

  b.words( sel, function ( item, i ) {
    // b.typo( item, "baselineShift", b.random( -4, 4 ) );
    // b.typo( item, "pointSize", 10 + b.random( -4, 6 ) );
    b.typo( item, "underline", true );
    b.typo( item, "underlineWeight", uwArr[ i ] );
    // b.typo( item, "underlineColor", b.color( 0, col1arr[ i ], col2arr[ i ], 0 ) );
  });
}

b.go();
