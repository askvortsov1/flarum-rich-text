module.exports=function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=89)}({24:function(t,e){app.initializers.add("askvortsov/flarum-rich-text",(function(){app.extensionData.for("askvortsov-rich-text").registerSetting({setting:"askvortsov-rich-text.toggle_on_editor",type:"boolean",label:app.translator.trans("askvortsov-rich-text.admin.settings.toggle_on_editor")})}))},89:function(t,e,r){"use strict";r.r(e);var n=r(24);for(var o in n)["default"].indexOf(o)<0&&function(t){r.d(e,t,(function(){return n[t]}))}(o)}});
//# sourceMappingURL=admin.js.map