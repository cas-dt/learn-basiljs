#includepath "~/Documents/;%USERPROFILE%Documents";
#include "basiljs/bundle/basil.js";

// unten habe ich nur Stichprobenweise geprüft, ob es keine Redundanz gibt.
var glyphs = "AÀÁÂÃÄÅĀĂĄǺBCÇĆĈĊČDĎEÈÉÊËĒĔĖĘĚFGĜĞĠĢHĤIÌÍÎÏĨĪĬĮİJĴKĶLĹĻĽMNÑŃŅŇOÒÓÔÕÖŌŎŐPQRŔŖŘSŚŜŞŠȘTŢŤȚUÙÚÛÜŨŪŬŮŰŲVWŴẀẂẄXYÝŶŸỲZŹŻŽÆǼÐØǾÞĐĦĲĿŁŊŒŦΑΆΒΓΔΕΈΖΗΉΘΙΊΪΚΛΜΝΞΟΌΠΡΣΤΥΎΫΦΧΨΩΏΩЂЄЅІЇЈЉЊЋЏАБВГЃДЕЀЁЖЗИЍЙКЌЛМНОПРСТУЎФХЦЧШЩЪЫЬЭЮЯҐǻbcçćĉċčdďeèéêëēĕėęěfhĥjĵkķmnñńņňoòóôõöōŏőpqrŕŗřsśŝşšștţťțuùúûüũūŭůűųvwŵẁẃẅxyýÿŷỳzźżžªºßæǽðøǿþđħĸŉŋœŧſȷαάβγδεέζηήθιΐίϊκλμνξοόπρςστυΰϋύφχψωώбвгѓдеѐёжзийѝкќлмнопрстуўфхцчшщъыьэюяђєѕјљњћџґⁿ̧̨̦̀́̂̃̄̆̇̈̊̋̌̒0123456789¼½¾⅛⅜⅝⅞_-–—―()[]{}#%‰‘„ʻ’“”‛‚„‹›«»†‡.,:;…!¡‼?¿/\\⁄|¦@&§¶ℓ№·•·‗'\"‾+−±÷×=<>≤≥≈≠¬⎯←↑→↓↔∂∆∏∑µ√∞∟∩∫≡⌡$¢£¤¥₣₤₧€ƒ^~´`˝ˆˇ˘˜¯¨˙˚¸˛΄΅©®™°℅℗℮↕↨⌐─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟■□▪▫▲►▼◄◊○●◦☙♀♂♠♣♥♦♪✓❧🐛⚡₀₁₂₃₄₅₆₇₈₉¹²³⁰⁴⁵⁶⁷⁸⁹aàáâãäåāăągĝğġģаiìíîïĩīĭįıĳіїlĺļľŀł0*{}0"
var fontsize = 24;

function draw() {

  /* Versuch, mit zufälligen Buchstaben einer Monotype Schrift eine Seite zu füllen.
   * Was ist die Schriftgrösse?
   * – InDesign macht den Textrahmen in Versalhöhe. d.h. Diakritische Zeichen und Unterlängen ragen darüber hinaus, darum der zusätzliche Durchschuss
   * Wie findet man alle Glyphen eines Fonts?
   * – das Skript dazu ist saulang, aber ich kenne (noch) keine Alternative
   */

  b.layer("color_" + 1);
  b.units(b.PT);
  b.canvasMode(b.MARGIN);
  b.blendMode( BlendMode.MULTIPLY );

  b.textFont("Input");
  b.textSize( fontsize );

  // get measurements

  var myText = b.text( randomGlyph(), 0, 0, b.width, b.height);
  myText.fit(FitOptions.FRAME_TO_CONTENT);
  var myTextWidth = myText.geometricBounds[ 3 ] - myText.geometricBounds[ 1 ];
  var myTextHeight = myText.geometricBounds[ 2 ] - myText.geometricBounds[ 0 ];

  // reset layer
  b.clear(b.layer("color_1"));

  b.layer("color_" + 2);
  b.layer("color_" + 3);

  var leading = fontsize / 2.5; // es braucht durchschuss, wir haben nur die Versalhöhe :-/
  var baseLineShift = myTextHeight + leading;

  var start_x = b.width % myTextWidth / 2;
  var start_y = b.height % baseLineShift / 2 + leading / 2;

  for ( var y = start_y; y < b.height - myTextHeight; y += myTextHeight + leading ) {
    for ( var x = start_x; x < b.width - myTextWidth; x += myTextWidth ) {
      var r = Math.floor( b.random( 1, 4 ) );
      b.layer( "color_" + r );
      var myText = b.text( randomGlyph(), x, y, myTextWidth, myTextHeight );
    }
  }

}

b.go();

function randomGlyph() { 
  randIndex = Math.round( b.random( 0, glyphs.length - 1 ) );
  return glyphs[ randIndex ];
}
