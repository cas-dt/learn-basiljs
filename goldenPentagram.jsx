#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

var arr = [];

function draw() {
  b.layer( "output" );
  b.clear( b.layer( "output" ) );
  b.units( b.MM );
  b.canvasMode( b.MARGIN );

  var fieldNumX = 1;
  var fieldNumY = 1;
  // var fieldNumX = 5;
  // var fieldNumY = 9;
  var rasterW = b.width / fieldNumX;
  var rasterH = b.height / fieldNumY;

  for ( var j = 0; j < fieldNumY ; j++ ) {
    for ( var i = 0; i < fieldNumX ; i++ ) {
      var posx = i * rasterW;
      var posy = j * rasterH;
      arr.push( new Foo( posx, posy, rasterW, rasterH ) );
    }
  }

  for ( var i = 0; i < arr.length; i++ ) {
    arr[ i ].display();
  }

}

b.go();

function Foo( x, y, w, h ) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.r = this.w / 2;
  this.cx = this.x + this.w / 2;
  this.cy = this.y + this.h / 2;

  this.display = function() {
    b.noFill();
    b.pushMatrix();
    b.translate( this.cx, this.cy );

    // transforms anchorpoint but positioning still according to top left
    // might come in handy when transforming
    // app.activeWindow.transformReferencePoint = AnchorPoint.CENTER_ANCHOR;

    var f = 0; // factor to calculate cos/sin, will increment by 2/5 of 2*PI;

    b.beginShape();
    // for ( var i = 0; i < 2 * b.PI - 0.01; i+= b.PI / 2.5 ) {
    for ( var i = 1; i < this.r; i++ ) {

      // draw point at Vector
      // turn 2/5 of 2_PI
      // multiply vector by factor
      // check if inside boundary
      
      // draw points on circle, starting right, turning clockwise
      var circle_x = b.cos( f );
      var circle_y = b.sin( f );
      var pos = new b.Vector( circle_x, circle_y );
 
      // didn’t get the vector.mult function to run
      pos.x = pos.x * i;
      pos.y = pos.y * i;
      b.vertex( pos.x, pos.y )

      var myText = b.text( Math.floor( i ), pos.x, pos.y, 10, 10 );
      b.typo( myText, "fillColor", b.color( 100, 100, 100, 100 ) );
      myText.fit( FitOptions.FRAME_TO_CONTENT );

      f += b.TWO_PI / 2.5;

    }
    b.endShape();
    b.popMatrix();
  };
}
