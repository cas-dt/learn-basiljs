#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  selItems = b.selections()[ 0 ];
  var myWords = b.words( selItems );
  var words_len = myWords.length;
  for ( var i = 0; i < words_len; i++ ) {
    var word = myWords[ i ];
    content =  word.contents;
    tentnoc = "";
    for ( var c = content.length - 1; c >= 0; c-- ) { 
      tentnoc += content[ c ];
    }
    word.contents = tentnoc;
    b.println( word.contents );
    b.println( "===NEXT===" );
  }
}

b.go();
