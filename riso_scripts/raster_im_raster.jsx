#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

/*
 * Versuch, einen Raster zu definieren, über mehrere Felder zu zeichnen und dann den Rest aufzufüllen.
 *
 * To Do:
 * - es gibt nur ein grösseres Feld – was, wenn es mehrere wären?
 * - alles ist links oben angeschlagen. es bräuchte eine verschiebung in x/y die der hälfte des übrigen platzes entspricht
 *
 * Fehlerquelle: Als hauptsächliche Fehlerquelle haben sich Zeile 23f erwiesen: Bei berechnen der Anzahl Felder auf einer Zeile gab es immer wieder Fälle, wo die errechnete Anzahl nicht mit der gezeichneten Anzahl übereinstimmte.
 * Durch den Abzug der Hälfte eines Feldes von der Gesamtbreite/-höhe scheint das Problem vorerst zu verschwinden.
 * Besser wäre es, der Diskrepanz auf den Grund zu gehen: Loop Zeile 32 ist nicht kongruent mit Zeile 25f.
 * Es wöre besser, den Loop mit ganzen Zahlen zu durchlaufen und auf den Variablen fieldsH und fieldsV aufzubauen.
 * Der Vektor müsste beim Zeichnen jeweils mit den Dimensionen der Felder mutlipliziert werden.
 */



function draw() {
  b.units(b.PT);

  var rasterFieldWidth = 36;
  var rasterFieldHeight = 24;

  // how can the number of fileds be calculated without mistake?
  var fieldsH = Math.round( ( b.width - ( rasterFieldWidth / 2 ) ) / rasterFieldWidth );
  b.println( fieldsH );
  var fieldsV = Math.round( ( b.height - ( rasterFieldHeight / 2 ) ) / rasterFieldHeight );
  var fieldsTotal = fieldsH * fieldsV;

  var raster1coords = [];

  for ( var y = 0; y < b.height - rasterFieldHeight; y += rasterFieldHeight ) {
    for ( var x = 0; x < b.width - rasterFieldWidth; x += rasterFieldWidth ) {
      raster1coords.push( new b.Vector( x, y ) );
    }
  }

  var scaleFactor_h = 3;
  var scaleFactor_v = 4;
  var raster2fieldWidth = scaleFactor_h * rasterFieldWidth;
  var raster2fieldHeight = scaleFactor_v * rasterFieldHeight;
  var raster2coords = [];

  function indexOfSomewhere( arr, fact_x, fact_y, numX, numY ) { // array of smaller raster, scale factor of bigger raster, number of rasterfields horizontally and vertically
    var possibleX = numX - ( fact_x - 1 ); // enough space to draw bigger fields?
    var possibleY = numY - ( fact_y - 1 );
    var allowedIndexes = [];
    var forbiddenIndexes = [];
    var allowedIndex = -1;

    for ( var i = 0; i < numX * ( possibleY ); i++ ) { // subtract ( fact - 1 ) to eclude bottom area where there’s not enough space
          allowedIndexes.push( i );
        }    

    // allowed range: numX - ( fact - 1 )
    for ( var i = allowedIndexes.length - 1; i >= 0; i-- ) { // iterate through all fields
      if ( i % numX >= numX - ( fact_x - 1 ) ) {
          forbiddenIndexes.unshift( i );
          allowedIndexes.splice( i, 1 );
      }
    }

    b.println( "forbidden indexes:" );
    b.println( forbiddenIndexes );
    // b.println( "allowed indexes:" );
    // b.println( allowedIndexes );
    
    var randIndex = Math.round( b.random( 0, allowedIndexes.length ) );
    allowedIndex = allowedIndexes[ randIndex ];
    return allowedIndex;
  }

  indexOfBiggerField = indexOfSomewhere( raster1coords, scaleFactor_h, scaleFactor_v, fieldsH, fieldsV );
  raster2coords.push( raster1coords[ indexOfBiggerField ] );
  // we need to splice all fields in the smaller raster that would be covered by the bigger field
  // splice needs to start from behind otherwise the raster will turn all ahoo
  // we need to get rid of Math.sqrt( scaleFactor ) number of fields
  // we start at indexOfBiggerField + fieldsV * scaleFactor + scaleFactor (last Field to be spliced)

  function findCoveredFields( ind, row, fact_x, fact_y ) {
    var arr = [];
    for ( var i = 0; i < fact_y; i++ ) {
      for ( var j = 0; j < fact_x; j++ ) {
        arr.push( ind + ( row * i ) + j );
      }
    }
    return arr;
  }

  var indexesToDelete = findCoveredFields( indexOfBiggerField, fieldsH, scaleFactor_h, scaleFactor_v );

  b.println( "indexes to delete:" );
  b.println( indexesToDelete );

  for ( var i = indexesToDelete.length - 1; i >= 0; i-- ) {
    raster1coords.splice( indexesToDelete[ i ], 1 );
  }

  // b.textSize( rasterFieldHeight / 2 );
  b.textSize( 6 );
  b.textFont( "Input" );
  for ( var i = 0; i < raster1coords.length; i++ ) {
    // b.rect( raster1coords[ i ].x, raster1coords[ i ].y, rasterFieldWidth, rasterFieldHeight );
    b.text( i, raster1coords[ i ].x, raster1coords[ i ].y, rasterFieldWidth, rasterFieldHeight  )
  }
  
  for ( var i = 0; i < raster2coords.length; i++ ) {
    b.rect( raster2coords[ i ].x, raster2coords[ i ].y, raster2fieldWidth, raster2fieldHeight );
  }

}

b.go();
