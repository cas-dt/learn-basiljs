#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

function draw() {
  var items = b.selections( b.layer( "output" ) );
  for ( var i = 0; i < items.length; i++ ) {
    b.blendMode( items[ i ], BlendMode.COLOR_BURN );
  }
}

b.go();
/*
BlendMode.NORMAL
BlendMode.MULTIPLY    multiplizieren
BlendMode.SCREEN      negativ multiplizieren
BlendMode.OVERLAY     ineinanderkopieren
BlendMode.SOFT_LIGHT  weiches licht
BlendMode.HARD_LIGHT  hartes licht
BlendMode.COLOR_DODGE farbig abwedeln
BlendMode.COLOR_BURN  farbig nachbelichten
BlendMode.DARKEN      abdunkeln
BlendMode.LIGHTEN     aufhellen
BlendMode.DIFFERENCE  differenz
BlendMode.EXCLUSION   ausschluss
BlendMode.HUE         farbton
BlendMode.SATURATION  sättigung
BlendMode.COLOR       farbe
BlendMode.LUMINOSITY  luminanz
*/
