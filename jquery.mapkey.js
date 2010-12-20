/*

Map Key v0.7
Copyright © 2010 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.3 or newer

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Usage:

$("a#left").mapKey("left");

$("a#left").mapKey(37); (use keycodes too!)

$.mapKey("left", function(){
  alert("you hit the left arrow!");
});

Parameters:
trigger: (function) - trigger a jQuery event
direction: "up"/"down" - use keydown or keyup event 

Enjoy!

*/

(function($) {
  $.mapKey = function(key, newfunc, options){
    //grab the opts
    var o = $.extend({}, $.fn.mapKey.defaults, options);
    //store a binding
    $.fn.mapKey.storeBinding(key, newfunc, o.direction);
  }
  $.fn.mapKey = function(key, options) {
    //debug(this);
    // build main options before element iteration
    var opts = $.extend({}, $.fn.mapKey.defaults, options);
    // iterate and setup each matched element
    return this.each(function() {
      var $this = $(this);
      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      var t = "";
      var action;
      
      //check for a trigger
      if (o.trigger) {
        action = function() { $this.trigger(o.trigger); };
      }else if($this.is("a[href]")){
        action = function() { window.location = $this.attr("href"); };
      }
      
      //store a binding
      $.fn.mapKey.storeBinding(key, action, o.direction);

    });
  };
  //
  // define and expose our functions
  //
  $.fn.mapKey.storeBinding = function(key, value, e){
    if(typeof key == "number"){
      //we have all we need already!
      if(e == "up"){
        $.fn.mapKey.bindings.up[key] = value;
      }else{
        $.fn.mapKey.bindings.down[key] = value;
      }
    }else{
      //get keycode from key database
      var code = $.fn.mapKey.keys[key];
      //see if we need to store one or more bindings
      if(typeof code == "number"){
        //add a single binding
        if(e == "up"){
          $.fn.mapKey.bindings.up[code.toString()] = value;
        }else{
          $.fn.mapKey.bindings.down[code.toString()] = value;
        }
      }else if(typeof code == "object"){
        //add multiple bindings for each version of the key
        $.each(code, function(i, v){
          if(e == "up"){
            $.fn.mapKey.bindings.up[v.toString()] = value;
          }else{
            $.fn.mapKey.bindings.down[v.toString()] = value;
          }
        });
      } 
    }
  }
  $.fn.mapKey.kdown = function(e){
    //if keyboard nav is enabled
    if($.fn.mapKey.enabled){
      //figure out the code of the key pressed
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      
      if(!$(e.target).is("input, textarea, select")){
        //check the bindings for the current pressed key
        var value = $.fn.mapKey.bindings.down[key];

        if (value) {
          if(typeof value == "string"){
            //lets navigate to the href
            window.location = value;
          }else if(typeof value == "function"){
            //it's a function. let's execute it!
            value();
          }
          e.preventDefault();
        }

        if($.fn.mapKey.bindings.up[key] != undefined){
          e.preventDefault();
        }
      }
    }
  }
  $.fn.mapKey.kup = function(e){
    //if keyboard nav is enabled
    if($.fn.mapKey.enabled){  
      //figure out the code of the key pressed
      
      if(!$(e.target).is("input, textarea, select")){ //check if you are in an input
        var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;

        //check the bindings for the current pressed key
        var value = $.fn.mapKey.bindings.up[key];

        if (value) {
          if(typeof value == "string"){
            //lets navigate to the href
            window.location = value;
          }else if(typeof value == "function"){
            //it's a function. let's execute it!
            value();
          }
          e.preventDefault();
        }
      }
    }
  }
  $.fn.mapKey.enable = function(){
    //enable mapKey
    $.fn.mapKey.enabled = true;
  }
  $.fn.mapKey.disable = function(){
    //disable mapKey
    $.fn.mapKey.enabled = false;
  }
  //
  // plugin defaults
  //
  $.fn.mapKey.defaults = {
    trigger: undefined, 
    direction: "up"
  };
  //
  // public variables
  //
  $.fn.mapKey.enabled = true;
  $.fn.mapKey.bindings = { up: {}, down: {}};
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
    "top0": 48,
    "top1": 49,
    "top2": 50,
    "top3": 51,
    "top4": 52,
    "top5": 53,
    "top6": 54,
    "top7": 55,
    "top8": 56,
    "top9": 57,
    "0": [48, 96],
    "1": [49, 97],
    "2": [50, 98],
    "3": [51, 99],
    "4": [52, 100],
    "5": [53, 101],
    "6": [54, 102],
    "7": [55, 103],
    "8": [56, 104],
    "9": [57, 105], 
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
    "windows": [91,92],
    "lcmd": 91,
    "rcmd": 92,
    "cmd": [91,92],
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
    "decimalpt": 110,
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
  
  //bind event listeners
  $(document).bind("keyup", $.fn.mapKey.kup);
  $(document).bind("keydown", $.fn.mapKey.kdown);
})(jQuery);