#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

/*
 * Versuch, einen Raster zu definieren, über mehrere Felder zu zeichnen und dann den Rest aufzufüllen.
 *
 * To Do:
 * - es gibt nur ein grösseres Feld – was, wenn es mehrere wären?
 */

function draw() {
  b.units(b.PT);

  // basic grid field dimensions
  var rasterFieldWidth = 48;
  var rasterFieldHeight = 64;

  // number of fields in horizontal and vertical direction
  var fieldsH = Math.round( ( b.width - ( rasterFieldWidth / 2 ) ) / rasterFieldWidth );
  var fieldsV = Math.round( ( b.height - ( rasterFieldHeight / 2 ) ) / rasterFieldHeight );
  // b.println( "Number of fields, horizontally: " + fieldsH );
  // b.println( "Number of fields, vertically: " + fieldsV );

  // total number of fields
  var fieldsTotal = fieldsH * fieldsV;

  // total width and height of the basic grid
  var rasterWidth = fieldsH * rasterFieldWidth;
  var rasterHeight = fieldsV * rasterFieldHeight;
  b.println( rasterWidth );
  b.println( rasterHeight );

  // center on page (see b.translate below)
  var offsetH = ( b.width - rasterWidth ) / 2;
  var offsetV = ( b.height - rasterHeight ) / 2;

  // array to store the basic grid
  var raster1coords = [];

  // store vector for every field in basic grid
  for ( var y = 0; y < fieldsV; y++ ) {
    for ( var x = 0; x < fieldsH; x++ ) {
      raster1coords.push( new b.Vector( x, y ) );
    }
  }

  // multiply the vectors to actual size
  for ( var i = 0; i < raster1coords.length; i++ ) {
    raster1coords[ i ].x = raster1coords[ i ].x * rasterFieldWidth;
    raster1coords[ i ].y = raster1coords[ i ].y * rasterFieldHeight;
  }

  // define larger field that is painted on top of the basic grid
  var scaleFactor_h = 4;
  var scaleFactor_v = 6;
  var raster2fieldWidth = scaleFactor_h * rasterFieldWidth;
  var raster2fieldHeight = scaleFactor_v * rasterFieldHeight;

  // array to store larger field(s) in
  var raster2coords = [];

  // define point in basic grid where larger field will be drawn (see function indexOfBiggerField)
  indexOfBiggerField = indexOfSomewhere( raster1coords, scaleFactor_h, scaleFactor_v, fieldsH, fieldsV );

  // store origin of larger field in array (there might be more at some point)
  raster2coords.push( raster1coords[ indexOfBiggerField ] );

  // Find and store indexes that will be deleted in array (see function findCoveredFields below)
  var indexesToDelete = findCoveredFields( indexOfBiggerField, fieldsH, scaleFactor_h, scaleFactor_v );
  // b.println( "indexes to delete: " indexesToDelete );

  // All fields in the smaller raster that would be covered by the bigger field
  // need to be spliced from array that stores the basic grid.
  // Splicing needs to start from behind, otherwise the raster will turn all ahoo.
  for ( var i = indexesToDelete.length - 1; i >= 0; i-- ) {
    raster1coords.splice( indexesToDelete[ i ], 1 );
  }

  // b.textSize( rasterFieldHeight / 2 );
  b.textSize( 6 );
  b.textFont( "Input" );
  b.translate( offsetH, offsetV );

  // draw basic grid
  for ( var i = 0; i < raster1coords.length; i++ ) {
    // b.rect( raster1coords[ i ].x, raster1coords[ i ].y, rasterFieldWidth, rasterFieldHeight );
    b.text( i, raster1coords[ i ].x, raster1coords[ i ].y, rasterFieldWidth, rasterFieldHeight  )
  }

  // draw larger field
  for ( var i = 0; i < raster2coords.length; i++ ) {
    b.rect( raster2coords[ i ].x, raster2coords[ i ].y, raster2fieldWidth, raster2fieldHeight );
  }

}

// Find an arbitrary origin for the larger field we want to draw.
// It should not move out of the basic grid
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

  // b.println( "forbidden indexes:" );
  // b.println( forbiddenIndexes );
  // b.println( "allowed indexes:" );
  // b.println( allowedIndexes );

  var randIndex = Math.round( b.random( 0, allowedIndexes.length ) );
  allowedIndex = allowedIndexes[ randIndex ];
  return allowedIndex;
}

// Identify fields in basic grid that are covered by larger field
function findCoveredFields( ind, row, fact_x, fact_y ) {
  var arr = [];
  for ( var i = 0; i < fact_y; i++ ) {
    for ( var j = 0; j < fact_x; j++ ) {
      arr.push( ind + ( row * i ) + j );
    }
  }
  return arr;
}

b.go();
