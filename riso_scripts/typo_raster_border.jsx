#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// unten habe ich nur Stichprobenweise geprüft, ob es keine Redundanz gibt.
var glyphs = "AÀÁÂÃÄÅĀĂĄǺBCÇĆĈĊČDĎEÈÉÊËĒĔĖĘĚFGĜĞĠĢHĤIÌÍÎÏĨĪĬĮİJĴKĶLĹĻĽMNÑŃŅŇOÒÓÔÕÖŌŎŐPQRŔŖŘSŚŜŞŠȘTŢŤȚUÙÚÛÜŨŪŬŮŰŲVWŴẀẂẄXYÝŶŸỲZŹŻŽÆǼÐØǾÞĐĦĲĿŁŊŒŦΑΆΒΓΔΕΈΖΗΉΘΙΊΪΚΛΜΝΞΟΌΠΡΣΤΥΎΫΦΧΨΩΏΩЂЄЅІЇЈЉЊЋЏАБВГЃДЕЀЁЖЗИЍЙКЌЛМНОПРСТУЎФХЦЧШЩЪЫЬЭЮЯҐǻbcçćĉċčdďeèéêëēĕėęěfhĥjĵkķmnñńņňoòóôõöōŏőpqrŕŗřsśŝşšștţťțuùúûüũūŭůűųvwŵẁẃẅxyýÿŷỳzźżžªºßæǽðøǿþđħĸŉŋœŧſȷαάβγδεέζηήθιΐίϊκλμνξοόπρςστυΰϋύφχψωώбвгѓдеѐёжзийѝкќлмнопрстуўфхцчшщъыьэюяђєѕјљњћџґⁿ̧̨̦̀́̂̃̄̆̇̈̊̋̌̒0123456789¼½¾⅛⅜⅝⅞_-–—―()[]{}#%‰‘„ʻ’“”‛‚„‹›«»†‡.,:;…!¡‼?¿/\\⁄|¦@&§¶ℓ№·•·‗'\"‾+−±÷×=<>≤≥≈≠¬⎯←↑→↓↔∂∆∏∑µ√∞∟∩∫≡⌡$¢£¤¥₣₤₧€ƒ^~´`˝ˆˇ˘˜¯¨˙˚¸˛΄΅©®™°℅℗℮↕↨⌐─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟■□▪▫▲►▼◄◊○●◦☙♀♂♠♣♥♦♪✓❧🐛⚡₀₁₂₃₄₅₆₇₈₉¹²³⁰⁴⁵⁶⁷⁸⁹aàáâãäåāăągĝğġģаiìíîïĩīĭįıĳіїlĺļľŀł*{}0"

// Beware. 18 pt on A4 took 439 seconds.
var fontsize = 34;
// 72 pt on A4 looks good.

function draw() {

  /* Versuch, mit zufälligen Buchstaben einer Monotype Schrift eine Seite zu füllen.
   * Was ist die Schriftgrösse?
   * – InDesign macht den Textrahmen in Versalhöhe. d.h. Diakritische Zeichen und Unterlängen ragen darüber hinaus, darum der zusätzliche Durchschuss
   * Wie findet man alle Glyphen eines Fonts?
   * – das Skript dazu ist saulang, aber ich kenne (noch) keine Alternative
   */

  b.layer("color_" + 1);
  b.layer("color_" + 2);
  b.layer("color_" + 3);

  b.units(b.PT);
  b.canvasMode(b.MARGIN);
  b.blendMode( BlendMode.MULTIPLY );

  b.textFont("Input");
  // b.println( b.textFont() );
  b.textSize( fontsize );

  // get glyph
  var myGlyph = randomGlyph();

  // draw glyph in textfield
  var myText = b.text( myGlyph, 0, 0, b.width, b.height);

  // resize text field
  myText.fit(FitOptions.FRAME_TO_CONTENT);

  // get height & width of textfield
  var myTextWidth = myText.geometricBounds[ 3 ] - myText.geometricBounds[ 1 ];
  var myTextHeight = myText.geometricBounds[ 2 ] - myText.geometricBounds[ 0 ];

  // reset layers
  // b.clear(b.layer("color_1"));
  // b.clear(b.layer("color_2"));
  // b.clear(b.layer("color_3"));

  // add leading to compensate for descenders and diacritics
  var leading = fontsize / 2.5;
  var baseLineShift = myTextHeight + leading;

  // get number of fields per row / column
  // this is a very unsatisfying way of calculating, as there are cases, where the result is too small.
  var numX = Math.round( b.width / myTextWidth ) - 1;
  var numY = Math.round( b.height / ( myTextHeight + leading ) ) - 1;

  // center content on page
  var start_x = b.width % myTextWidth / 2;
  var start_y = b.height % baseLineShift / 2 + leading / 2;

  // draw all fields
  for ( var y = 0; y < numY; y++ ) {
    for ( var x = 0; x < numX; x++ ) {
      b.pushMatrix();
      // move pen into place
      b.translate( x * myTextWidth + start_x, y * ( myTextHeight + leading ) + start_y - leading / 2 )
      // draw a number for one of three layers
      var r = Math.floor( b.random( 1, 4 ) );
      b.layer( "color_" + r );

      // draw outline: ═, ║, ╔, ╗, ╚, ╝
      if ( y == 0 || x == 0 ) { // Are we on the top or lefthand border?
        if ( y == 0 && x == 0 ) { // Are we in the upper left corner?
          var myText = b.text( "╔", 0, 0, myTextWidth, myTextHeight );
        } else if ( y == 0 && x == numX - 1) { // Are we in the upper right corner?
          var myText = b.text( "╗", 0, 0, myTextWidth, myTextHeight );
        } else if ( y == 0 ) { // Are we on the top border?
          var myText = b.text( "═", 0, 0, myTextWidth, myTextHeight );
        } else { // Are on the lefthand border?
          if ( y == numY - 1 ) { // Are we in the lower left corner?
          var myText = b.text( "╚", 0, 0, myTextWidth, myTextHeight ); // 
          } else { // We are on the lefthand border indeed.
            var myText = b.text( "║", 0, 0, myTextWidth, myTextHeight );
          }
        }
      } else if ( y == numY - 1 || x == numX - 1 ) { // Are we on the bottom or righthand border?
        if ( y == numY - 1 && x == numX - 1 ) { // Are we in the lower right corner?
          var myText = b.text( "╝", 0, 0, myTextWidth, myTextHeight ); // 
        } else if ( x == numX - 1 ) { // Are we on the righthand border?
          var myText = b.text( "║", 0, 0, myTextWidth, myTextHeight );
        } else { // We are on the bottom border.
          var myText = b.text( "═", 0, 0, myTextWidth, myTextHeight );
        }
      } else { 
        // draw random glyph
        myGlyph = randomGlyph();
        var myText = b.text( myGlyph, 0, 0, myTextWidth, myTextHeight );
      }
      b.popMatrix();
    }
  }
}

b.go();

// get random glyph from string containing all gyphs in font
function randomGlyph() { 
  randIndex = Math.round( b.random( 0, glyphs.length - 1 ) );
  return glyphs[ randIndex ];
}
