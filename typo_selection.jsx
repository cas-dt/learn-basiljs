#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  selItems = b.selections()[ 0 ];
  var myWords = b.words( selItems );
  var words_len = myWords.length;
  for ( var i = 0; i < words_len; i++ ) {
    b.typo( myWords[ i ], 'pointSize', b.random( 5, 14 ) );
    b.typo( myWords[ i ], 'fillColor', b.color( b.random( 100, 255), b.random( 100, 255), b.random( 100, 255 ) ) );
    // b.println( myWords[ i ].contents );
    myWords[ i ].contents = "asdf";
    // b.println( myWords[ i ].contents );
    // b.println( "=============" );

  }
}

b.go();
