#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.units( b.MM );
  var numPages = 10;

  for ( var j = 0; j < numPages; j++ ) {
    
    for ( var i = 0; i < 10; i++ ) {
      b.layer( "lines_" + 1 );
      b.stroke( b.random( 125 ) + 75 );
      b.strokeWeight( b.random( 4, 32 ) );
      b.line( 10 + b.random( 100 ), 10 + b.random( 150 ), ( b.width - 110 ) + b.random( 90 ), ( b.height - 120 ) + b.random( 100 ) );
    }
    b.addPage();
    }
  b.removePage(); // remove extra page
  b.savePDF( b.timestamp() + ".pdf"); 
}

b.go();
