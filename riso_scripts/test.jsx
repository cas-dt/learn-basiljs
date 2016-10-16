#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  b.layer( "color_1" );
  b.layer( "color_2" );
  b.clear( b.layer( "color_1" ) );
  b.clear( b.layer( "color_2" ) );
  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  var p1 = new b.Vector( 20, 40 );
  var p2 = new b.Vector( 40, 60 );
  var p3 = new b.Vector( 20, 90 );

  // b.noStroke();
  // b.fill( 0, 0, 0, 100 );
  b.strokeWeight( 20 );

  b.layer( "color_1" );
  b.line( p1.x, p1.y, p2.x, p2.y );
  b.layer( "color_2" );
  b.line( p2.x, p2.y, p3.x, p3.y );

  // set blendmode
  var items = b.items( b.layer( "color_1" ) );
  for ( var i = 0; i < items.length; i++ ) {
    b.blendMode( items[ i ], BlendMode.MULTIPLY );
  }
  // set blendmode
  var items = b.items( b.layer( "color_2" ) );
  for ( var i = 0; i < items.length; i++ ) {
    b.blendMode( items[ i ], BlendMode.MULTIPLY );
  }

}

b.go();
