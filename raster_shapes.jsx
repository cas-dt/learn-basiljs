#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

var arr = [];

function draw() {
  b.layer( "output" );
  // b.clear( b.layer( "output" ) );
  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  var fieldNumX = 5;
  var fieldNumY = 7;
  var rasterW = b.width / fieldNumX;
  var rasterH = b.height / fieldNumY;
  var segments = 5;

  for ( var j = 0; j < fieldNumY ; j++ ) {
    for ( var i = 0; i < fieldNumX ; i++ ) {
      var posx = i * rasterW;
      var posy = j * rasterH;
      arr.push( new Shape( posx, posy, rasterW, rasterH ) );
      segments += 1;
    }
  }

  // b.beginShape( b.CLOSE );
  for ( var i = 0; i < arr.length; i++ ) {
    arr[ i ].display();
    // b.pushMatrix();
    // b.strokeWeight( 10 );
    // b.vertex( arr[ i ].cx, arr[ i ].cy );
    // b.popMatrix();
  }
  // b.endShape();
}

// Select everything and set blend mode
var items = b.items( b.layer( "output" ) );
for ( var i = 0; i < items.length; i++ ) {
  b.blendMode( items[ i ], BlendMode.OVERLAY );
}


b.go();

function Shape( x, y, w, h ) { // if we need an object per rasterfield
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.r = this.w / 2;
  this.cx = this.x + this.w / 2;
  this.cy = this.y + this.h / 2;
  this.corners = Math.round( b.random( 3, 7 ) );

  this.display = function() {
    // b.noFill();
    // b.stroke( 0, 0, 0, 100 );
    // b.strokeWeight( 3 );
    b.noStroke();
    b.pushMatrix();
    b.translate( this.cx, this.cy );
    var col1 = b.color( 0, b.random( 50, 100 ), b.random( 50, 100 ), 0 );
    var col2 = b.color( b.random( 50, 100 ), 0, b.random( 50, 100 ), 0 );

    // b.beginShape( b.CLOSE );

    for ( var i = 0; i < 2 * b.PI - 0.01; i+= b.TWO_PI / this.corners ) {

      // draw points on circle, starting right, turning clockwise
      var circle_x = b.cos( i );
      var circle_y = b.sin( i );
      var pos = new b.Vector( circle_x, circle_y );
 
      // didn’t get the vector.mult function to run
      pos.x = pos.x * this.r * .5;
      pos.y = pos.y * this.r * .5;
      var randRad = b.random( 3, 20 );
      b.fill( col1 );
      b.ellipse( pos.x, pos.y, randRad, randRad );
      b.fill( col2 );
      b.rect( pos.x-randRad/2, pos.y-randRad/2, randRad, randRad );
      // b.vertex( pos.x, pos.y );
    }
    // b.endShape();
    b.popMatrix();
  };
}
