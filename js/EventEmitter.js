/*! EventEmitter - v1.0.0 - 2013-08-07
 * Author: Alberto La Rocca <alberto.larocca@canvace.com> (https://github.com/71104)
 * Released under the MIT license
 * Copyright (c) 2013 Canvace Srl */
function EventEmitter(){"use strict";var a=this,b={};this.bind=this.on=function(c,d,e){return b.hasOwnProperty(c)||(b[c]=[]),b[c].push(d.bind(e)),a},this.unbind=this.off=function(c,d){if(b.hasOwnProperty(c))for(var e in b[c])if(b[c].hasOwnProperty(e)&&b[c][e]===d){b.splice(e,1);break}return a},this.trigger=this.emit=function(c){if(b.hasOwnProperty(c)){for(var d=[],e=1;e<arguments.length;e++)d.push(arguments[e]);for(var f in b[c])b[c].hasOwnProperty(f)&&b[c][f].apply(null,d)}return a}}