#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var f = Font;
  for each ( var foo in f ){
  b.println( foo );}
}

b.go();
