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
    b.beginShape( b.CLOSE );
    for ( var i = 0; i < 2 * b.PI - 0.01; i+= b.PI / 3 ) { // subtract .01 from PI, otherwise it draws the last one over the first one.
      // draw points on circle, starting right, turning clockwise
      var circle_x = b.cos( i );
      var circle_y = b.sin( i );
      var pos = new b.Vector( circle_x, circle_y );
      // didn’t get the vector.mult function to run
      pos.x = pos.x * this.r * 0.75;
      pos.y = pos.y * this.r * 0.75;
      b.vertex( pos.x, pos.y )
      var myText = b.text( Math.floor( i ), pos.x, pos.y, 10, 10 );
      // for ( o in myText ) {
      //   b.println( o );
      // }
      // for ( s in myText.anchoredObjectSettings ) { b.println( s ); }
      b.println( "=================" )
      b.typo( myText, "pointSize", "32" );
      b.typo( myText, "alignToBaseline", false );
      b.typo( myText, "fillColor", b.color( 100, 100, 100, 100 ) );
      b.typo( myText, "pointSize", "32" );
      myText.fit( FitOptions.FRAME_TO_CONTENT );

    }
    b.endShape();
    b.popMatrix();
  };
}
