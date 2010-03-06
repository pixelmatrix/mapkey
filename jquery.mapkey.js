/*

Map Key v0.5
Copyright © 2010 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.3 or newer

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Usage:

$("a#left").mapKey("left");

$.mapKey("left", function(){
  alert("you hit the left arrow!");
});

Enjoy!

*/

(function($) {
  $.mapKey = function(key, newfunc){
    var code = $.fn.mapKey.keys[key];
    $.fn.mapKey.bindings[code.toString()] = newfunc;
  }
  $.fn.mapKey = function(key, options) {
    //debug(this);
    // build main options before element iteration
    var opts = $.extend({}, $.fn.mapKey.defaults, options);
    // iterate and setup each matched element
    return this.each(function() {
      $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      var t = "";
      //start doing stuff
      $(document).bind("keyup", $.fn.mapKey.kpress);
      
      if($this.is("a")){
        var code = $.fn.mapKey.keys[key];
        $.fn.mapKey.bindings[code.toString()] = $this.attr("href");
      }
    });
  };
  //
  // define and expose our functions
  //
  $.fn.mapKey.kpress = function(e){
    //figure out the code of the key pressed
    var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
    
    //iterate through all the bindings to see if we pressed an assigned key
    $.each($.fn.mapKey.bindings, function(index, value){
      if(key == index){
        if(typeof value == "string"){
          //lets navigate to the href
          window.location = value;
        }else if(typeof value == "function"){
          //it's a function. let's execute it!
          value();
        }
      }
    });
    
    e.preventDefault();
  }
  //
  // plugin defaults
  //
  $.fn.mapKey.defaults = {};
  //
  // public variables
  //
  $.fn.mapKey.bindings = {};
  
  $.fn.mapKey.keys = {
    "back": 8,
    "tab": 9,
    "enter": 13,
    "shift": 16,
    "ctrl": 17,
    "alt": 18, 
    "opt": 18,
    "pause": 19,
    "caps": 20,
    "esc": 27,
    "space": 32,
    "pgup": 33,
    "pgdown": 34,
    "end": 35,
    "home": 36,
    "left": 37,
    "up": 38,
    "right": 39,
    "down": 40,
    "insert": 45,
    "del": 46,
    "0": 48,
    "1": 49,
    "2": 50,
    "3": 51,
    "4": 52,
    "5": 53,
    "6": 54,
    "7": 55,
    "8": 56,
    "9": 57,
    "a": 65,
    "b": 66,
    "c": 67,
    "d": 68,
    "e": 69,
    "f": 70,
    "g": 71,
    "h": 72,
    "i": 73,
    "j": 74,
    "k": 75,
    "l": 76,
    "m": 77,
    "n": 78,
    "o": 79,
    "p": 80,
    "q": 81,
    "r": 82,
    "s": 83,
    "t": 84,
    "u": 85,
    "v": 86,
    "w": 87,
    "x": 88,
    "y": 89,
    "z": 90,
    "lwindows": 91,
    "rwindows": 92,
    "windows": "91||92",
    "lcmd": 91,
    "rcmd": 92,
    "cmd": "91||92",
    "select": 93,
    "num0": 96,
    "num1": 97,
    "num2": 98,
    "num3": 99,
    "num4": 100,
    "num5": 101,
    "num6": 102,
    "num7": 103,
    "num8": 104,
    "num9": 105,
    "multiply": 106,
    "add": 107,
    "subtract": 109,
    "decimal point": 110,
    "divide":  111,
    "f1": 112,
    "f2": 113,
    "f3": 114,
    "f4": 115,
    "f5": 116,
    "f6": 117,
    "f7": 118,
    "f8": 119,
    "f9": 120,
    "f10": 121,
    "f11": 122,
    "f12": 123,
    "numlock": 144,
    "scrolllock": 145,
    ";": 186,
    "=": 187,
    ",": 188,
    "-": 189,
    ".": 190,
    "/": 191,
    "`": 192,
    "[": 219,
    "backslash": 220,
    "]": 221,
    "singlequote": 222
  };
})(jQuery);