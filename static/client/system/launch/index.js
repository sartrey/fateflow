webpackJsonp([2],{31:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(u),f=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),a(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"wrapper"},c.default.createElement("div",{className:"header"},c.default.createElement("a",{className:"myself",href:"/events"},"TIMEAXIS"),c.default.createElement("a",{className:"github",href:"https://github.com/sartrey/timeaxis"},"github.com/sartrey/timeaxis")))}}]),t}(u.Component);t.default=f,function(){if("undefined"!=typeof window&&(window.epii||(window.epii={}),t)){var e=Object.keys(t);e.length>0?window.epii.entry=t.default||t[e[0]]:console.warn("settle loader :: undefined")}n(1)}()}},[31]);