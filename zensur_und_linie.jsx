#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

/*
 * Absicht: Dokument mit Basil-Beschrieb für Rudolf etwas manipulieren
 */


function draw() {
  selItems = b.selections()[ 0 ];
  var myWords = b.words( selItems );
  var words_len = myWords.length;
  var point_x = 0;
  var point_y = 0;
  for ( var i = 0; i < words_len; i++ ) {
    var word = myWords[ i ];
    // b.typo( word, 'pointSize', b.random( 5, 14 ) );
    // b.typo( word, 'fillColor', b.color( b.random( 100, 255), b.random( 100, 255), b.random( 100, 255 ) ) );
    // b.println( word.contents );
    var my_regex = /(^the$|^a$|^in$)/;
    var cont = word.contents;
    if ( cont.match( my_regex ) ) {
      b.println( "FOUND!" );
      // myWords[ i ].contents = "us ss"; // interessanterweise kann man nicht mehr als 5 Zeichen einfügen. Zu testen wäre, ob die Anzahl Zeichen mit der ursprünglichen Länge des Wortes zusammenhängt, oder ob es andere Eigenschaften/Werte gibt, die zu ändern sind.
      var bounds = b.bounds( word );
      b.line ( point_x, point_y, bounds.left, bounds.top );
      point_x = bounds.right;
      point_y = bounds.bottom;
      b.rect( bounds.left, bounds.top, bounds.right - bounds.left, bounds.bottom - bounds.top )
    }
  }
  b.line ( point_x, point_y, b.width, b.height );
}

b.go();
