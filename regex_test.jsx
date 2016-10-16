#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var sel = b.selection();
  var bar =  b.words( sel );
   
  // sel.words is an array, containing objects
  // one of these objects is "contents", a string with the word

  for ( var c = 0; c < sel.words.length; c++ ) { // loop through all objects in sel.words
    var obj = sel.words[ c ];
    // b.println( "==========" );
    // b.println( "new object" );
    // for (var foo in obj ) {
    //   b.println( foo );
    // }
    b.println( "contents: " + obj.contents );
    
  }
  b.words( sel, function( word, i ) {
    var myRegex = /top/;

    if ( myRegex.test( word.contents ) ) {
      b.println( "found " + myRegex + " in " + word.contents );
      b.typo( word, "fillColor", b.color( 0, 100, 70, 0 ) );
    } else {
      b.println( "didn’t find " + myRegex + " in " + word.contents );
    }
  });


}

b.go();
