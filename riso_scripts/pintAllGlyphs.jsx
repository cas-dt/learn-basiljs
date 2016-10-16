#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

var t = app.activeDocument.pages[0].textFrames.add({geometricBounds:[0,0,210,148] });
var myFont = 'Input\tBold'; // 'Times New Roman\tRegular'; 'Minion Pro\tRegular'
var glyphCounter = 2555;
var s = t.parentStory;
var c = fillStory( s, glyphCounter );

app.findGlyphPreferences = app.changeGlyphPreferences = NothingEnum.nothing; 
app.findGlyphPreferences.glyphID = 3; // glyphID of space 
app.findGlyphPreferences.appliedFont = app.changeGlyphPreferences.appliedFont = myFont;

for ( i = 1; i < c.length; i++ ) {
 app.changeGlyphPreferences.glyphID = i ;
 try { c[i].changeGlyph(); }
 catch(e) { errorExit( 'Stopped with glyph no. ' + i )}
}

function errorExit( aMessage ) {
  alert( aMessage );
  exit();
}

function fillStory( aStory, aCounter ) {
 aStory.contents = '';
 for ( i = 0; i < aCounter; i++ )
  aStory.insertionPoints[-1].contents = ' ';
 aStory.texts[0].appliedFont = myFont;
 return aStory.characters;
}
