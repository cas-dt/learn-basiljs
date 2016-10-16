#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

/*
 * Versuch, einen Raster zu definieren, über mehrere Felder zu zeichnen und dann den Rest aufzufüllen.
 *
 * To Do:
 * - es gibt nur ein grösseres Feld – was, wenn es mehrere wären?
 * - alles ist links oben angeschlagen. es bräuchte eine verschiebung in x/y die der hälfte des übrigen platzes entspricht
 */



function draw() {
  b.units(b.PT);

  var rasterFieldWidth = 24;
  var rasterFieldHeight = 100;

  var fieldsH = Math.round( b.width / rasterFieldWidth );
  var fieldsV = Math.round( b.height / rasterFieldHeight );
  var fieldsTotal = fieldsH * fieldsV;

  var raster1coords = [];

  for ( var y = 0; y < b.height - rasterFieldHeight; y += rasterFieldHeight ) {
    for ( var x = 0; x < b.width - rasterFieldWidth; x += rasterFieldWidth ) {
      raster1coords.push( new b.Vector( x, y ) );
    }
  }

  var scaleFactor = 4;
  var raster2fieldWidth = scaleFactor * rasterFieldWidth;
  var raster2fieldHeight = scaleFactor * rasterFieldHeight;
  var raster2coords = [];

  function indexOfSomewhere( arr, fact, numX, numY ) { // array of smaller raster, scale factor of bigger raster, number of rasterfields horizontally and vertically
    var possibleX = numX - ( fact - 1 ); // enough space to draw bigger fields?
    var possibleY = numY - ( fact - 1 );
    var allowedIndexes = [];
    var forbiddenIndexes = [];
    var allowedIndex = -1;

    for ( var i = 0; i < numX * ( numY - ( fact - 1 ) ); i++ ) { // subtract ( fact - 1 ) to eclude bottom area where there’s not enough space
          allowedIndexes.push( i );
        }    

    /*---------------mistake zone--------------------------*/

    // allowed range: numX - ( fact - 1 )
    // HIER MAL NACHDENKEN!
    for ( var i = allowedIndexes.length - 1; i >= 0; i-- ) { // iterate through all fields
      if ( i % numX >= numX - ( fact - 1 ) ) {
          forbiddenIndexes.unshift( i );
          allowedIndexes.splice( i, 1 );
      }
    }

    /*---------------mistake zone--------------------------*/

    b.println( "forbidden indexes:" );
    b.println( forbiddenIndexes );
    b.println( "allowed indexes:" );
    b.println( allowedIndexes );
    
    var randIndex = Math.round( b.random( 0, allowedIndexes.length ) );
    allowedIndex = allowedIndexes[ randIndex ];
    return allowedIndex;
  }

  indexOfBiggerField = indexOfSomewhere( raster1coords, scaleFactor, fieldsH, fieldsV );
  raster2coords.push( raster1coords[ indexOfBiggerField ] );
  // we need to splice all fields in the smaller raster that would be covered by the bigger field
  // splice needs to start from behind otherwise the raster will turn all ahoo
  // we need to get rid of Math.sqrt( scaleFactor ) number of fields
  // we start at indexOfBiggerField + fieldsV * scaleFactor + scaleFactor (last Field to be spliced)
  var indexesToDelete = [];
  for ( var i = scaleFactor - 1; i >= 0; i-- ) {
    for ( var j = scaleFactor - 1; j >= 0; j-- ) {
    indexesToDelete.push( indexOfBiggerField + ( fieldsH * i ) + j );
    }
  }
  b.println( "indexes to delete:" );
  b.println( indexesToDelete );
  for ( var i = 0; i < indexesToDelete.length; i++ ) {
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
