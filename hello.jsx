#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {

  b.doc();
  b.text("Hello World", 100, 100, 200, 50);

  b.println( "width " + b.width );
  b.println( "height " + b.height );
  b.rect(0,0,b.width,b.height);
}

b.go();
// hello
// world
