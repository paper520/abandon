!function(e){function t(t){for(var n,o,i=t[0],a=t[1],u=0,l=[];u<i.length;u++)o=i[u],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&l.push(r[o][0]),r[o]=0;for(n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n]);for(c&&c(t);l.length;)l.shift()()}var n={},r={0:0};function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var i=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=i);var a,u=document.createElement("script");u.charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.src=function(e){return o.p+"build/"+e+".main.js"}(e);var c=new Error;a=function(t){u.onerror=u.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;c.message="Loading chunk "+e+" failed.\n("+o+": "+i+")",c.name="ChunkLoadError",c.type=o,c.request=i,n[1](c)}r[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:u})}),12e4);u.onerror=u.onload=a,document.head.appendChild(u)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw e};var i=window.webpackJsonp=window.webpackJsonp||[],a=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var c=a;o(o.s=7)}([function(e,t,n){"use strict";t.a=function(e){var t=this.constructor;return this.then((function(n){return t.resolve(e()).then((function(){return n}))}),(function(n){return t.resolve(e()).then((function(){return t.reject(n)}))}))}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";(function(e){var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n="function"==typeof Symbol&&"symbol"===t(Symbol.iterator)?function(e){return void 0===e?"undefined":t(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":void 0===e?"undefined":t(e)};
/*!
* abandon v1.1.0
* (c) 2007-2019 心叶 git+https://github.com/yelloxing/abandon.git
* License: MIT
*/!function(){var t=Object.prototype.toString;function r(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":t.call(e)}function o(e){var t=void 0===e?"undefined":n(e);return null!=e&&("object"===t||"function"===t)}function i(e){if(!o(e))return!1;var t=r(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}var a=1;function u(e){if(null===e||"object"!==(void 0===e?"undefined":n(e))||"[object Object]"!=r(e))return!1;if(null===Object.getPrototypeOf(e))return!0;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function c(e){return null!==e&&"object"===(void 0===e?"undefined":n(e))&&(1===e.nodeType||9===e.nodeType||11===e.nodeType)&&!u(e)}function l(e,t,n){window.attachEvent?e.attachEvent("on"+t,n):e.addEventListener(t,n,!1)}function s(e){var t=void 0===e?"undefined":n(e);return"symbol"===t||"object"===t&&null!==e&&"[object Symbol]"===r(e)}function f(e,t){return Array.isArray(e)?e:function(e,t){if(Array.isArray(e))return!1;var r=void 0===e?"undefined":n(e);return!("number"!=r&&"boolean"!=r&&null!=e&&!s(e))||null!==t&&e in Object(t)||/^\w*$/.test(e)}(e,t)?[e]:function(e){return e.replace(/\[/g,".").replace(/\]/g,"").replace(/"/g,"").replace(/'/g,"").split(".")}(e)}var d,p=1/0;function h(e){if("string"==typeof e||s(e))return e;var t=""+e;return"0"==t&&1/e==-p?"-0":t}function m(e,t,n){var r=null==e?void 0:function(e,t){t=f(t,e);for(var n=0;n<t.length&&null!==e;n++)e=e[h(t[n])];return n&&n===t.length?e:void 0}(e,t);return void 0===r?n:r}function v(e,t,n){!function(e,t,n){"__proto__"==t?Object.defineProperty(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}(e,t,n)}function y(e,t,n,r){return r="function"==typeof r?r:void 0,null==e?e:function(e,t,n,r){if(!o(e))return e;t=f(t,e);for(var i=e,a=0;a<t.length;a++){var u=h(t[a]),c=n;if(a+1!=t.length){var l=i[u];o(l)?c=l:void 0===(c=r?r(l,u,i):void 0)&&(c={})}v(i,u,c),i=i[u]}return e}(e,t,n,r)}function b(e){var t=void 0===e?"undefined":n(e);return"string"===t||"object"===t&&null!=e&&!Array.isArray(e)&&"[object String]"===r(e)}function g(e,t,n){var r=document.createElement(e),o=[],i=[],a=[],u=[],c=[];if(/ui\-/.test(e.toLowerCase()))return{el:r,tagName:e.toLowerCase(),attrs:t,directive:[],textBind:[],event:[],component:[],dynamicComponent:[]};for(var l in"component"==e.toLowerCase()&&(n=[],c.push({el:r})),t=t||{})/^v-/.test(l)?o.push({el:r,name:l.replace("v-",""),value:t[l]}):/^@/.test(l)?i.push({el:r,name:l,value:t[l]}):r.setAttribute(l,t[l]);n=n||[];for(var s=0;s<n.length;s++){var f=n[s];if(b(f)){var d=f;f={el:document.createTextNode(d),text:d},/{{[^}]+}}/.test(d)&&a.push(f)}else{for(var p=0;p<f.directive.length;p++)o.push(f.directive[p]);for(var h=0;h<f.event.length;h++)i.push(f.event[h]);for(var m=0;m<f.component.length;m++)u.push(f.component[m]);for(var v=0;v<f.dynamicComponent.length;v++)c.push(f.dynamicComponent[v]);for(var y=0;y<f.textBind.length;y++)a.push(f.textBind[y])}f.tagName&&u.push(f),r.appendChild(f.el)}return{el:r,directive:o,textBind:a,event:i,component:u,dynamicComponent:c}}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n].text.replace(/{{[^}]+}}/g,(function(t){return m(e,t.replace("{{","").replace("}}",""))})),o=document.createTextNode(r);t[n].el.parentNode.replaceChild(o,t[n].el),t[n].el=o}}function _(e,t,n){for(var r=0;r<t.length;r++){var o=t[r],a=(o.name+":").split(":"),u=e.$directive[a[0]];if(!u)throw new Error("The directive is not registered:v-"+o.name);i(u[n])&&u[n].call(u,o.el,{value:m(e,o.value),arg:o.value,type:a[1],target:e})}}function T(e,t,n){for(var r=0;r<t.length;r++){var o=t[r];if(n||o.el._dynamic_component_!=o.el.getAttribute("is")){o.el._dynamic_component_=o.el.getAttribute("is"),o.el.innerHTML="<i></i>";var i=o.el.firstElementChild,a=e.$component[o.el._dynamic_component_];a.el=i,e._new(a)}}}function j(e){if(!(this instanceof j))throw new Error("Abandon is a constructor and should be called with the `new` keyword");this._lifecycle(e.beforeCreate),this._init(e),this._lifecycle("created"),c(this.el)&&(this._lifecycle("beforeMount"),this._mount(this.el),this._lifecycle("mounted"))}function x(e,t){t.value&&!b(t.value)&&(t.value=JSON.stringify(t.value)),""==t.type||"value"==t.type?e.value=e.textContent=t.value:e.setAttribute(t.type,t.value)}j.prototype._init=function(e){for(var t in this.$uid=a++,e=e||{}){if(/^[_$]/.test(t))throw new Error("The beginning of _and $is not allowed："+t);this[t]=e[t]}i(this.data)&&(this.data=this.data())},j.prototype._bind=function(e,t,n){var r=this,o=n.replace(/\([^)]{0,}\)/,""),i=n.replace(/[^(]{1,}\({0,1}([^)]{0,})\){0,1}/,"$1").split(",");l(e,t,(function(){r.methods[o].apply(r,i)}))},j.prototype._lifecycle=function(e){i(e)?e():-1<["created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed"].indexOf(e)&&i(this[e])&&this[e].call(this)},(d=j).prototype._mountComponent=function(e){var t=this.render(g),n=t.el;this.el.parentNode.replaceChild(n,this.el),this.el=n,this.$directiveE=t.directive,this.$textBindE=t.textBind,this.$dynamicComponent=t.dynamicComponent,w(this,this.$textBindE),_(this,this.$directiveE,"inserted"),T(this,this.$dynamicComponent,!0),function(e){function t(t){var n=m(e.data,t);Object.defineProperty(e.data,t,{get:function(){return n},set:function(t){e._lifecycle("beforeUpdate"),n=t,e._updateComponent(),e._lifecycle("updated")}})}for(var n in e.data)t(n)}(this);for(var r=0;r<t.event.length;r++)this._bind(t.event[r].el,t.event[r].name.replace(/^@/,""),t.event[r].value);t.tagName&&/^ui\-/.test(t.tagName)&&(t.component=[{el:t.el,tagName:t.tagName,attrs:t.attrs}]);for(var o=0;o<t.component.length;o++){var i=this.$component[t.component[o].tagName.replace(/^ui\-/,"")];if(!i)throw new Error("The component is not registered:"+t.component[o].tagName);if(i.el=t.component[o].el,Array.isArray(i.props)){for(var a={},u=0;u<i.props.length;u++)y(a,i.props[u],m(t.component[u].attrs,i.props[u]));i.props=a}this._new(i).$pid=this.$uid}},d.prototype._updateComponent=function(){w(this,this.$textBindE),_(this,this.$directiveE,"update"),T(this,this.$dynamicComponent)};var E,O={inserted:x,update:x},C={inserted:function(e,t){e.value=t.value,l(e,"input",(function(){y(t.target,t.arg,e.value)}))},update:function(e,t){e.value=t.value}};(E=j).prototype.$directive={},E.directive=function(e,t){if(E.prototype.$directive[e])throw new Error("The directive has already been defined:v-"+e);E.prototype.$directive[e]=t},E.prototype.$component={},E.component=function(e,t){if(E.prototype.$component[e])throw new Error("The component has already been defined:ui-"+e);E.prototype.$component[e]=t},E.prototype._new=function(e){return new E(e)},j.directive("bind",O),j.directive("model",C),j.prototype._mount=function(e){if(!i(this.render)){var t=this.template;t&&b(t)||(t=function(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}(e)),this.render=function(e){return function(t){return function e(t,r){for(var o,i=t.childNodes,a=[],l=0;l<i.length;l++)null===(o=i[l])||"object"!==(void 0===o?"undefined":n(o))||3!==o.nodeType||u(o)?c(i[l])&&a.push(e(i[l],r)):a.push(i[l].textContent);for(var s={},f=0;f<t.attributes.length;f++)s[t.attributes[f].nodeName]=t.attributes[f].nodeValue;return r(t.tagName,s,a)}(function(e){if(c(e))return e;var t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}(e),t)}}(t)}this._mountComponent(e)},"object"===n(e)&&"object"===n(e.exports)?e.exports=j:window.Abandon=j}()}).call(this,n(6)(e))},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=function(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}(r),i=r.sources.map((function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"}));return[n].concat(i).concat([o]).join("\n")}return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];null!=a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var r,o,i,a={},u=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),c=(i={},function(e,t){if("function"==typeof e)return e();if(void 0===i[e]){var n=function(e,t){return t?t.querySelector(e):document.querySelector(e)}.call(this,e,t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}i[e]=n}return i[e]}),l=null,s=0,f=[],d=n(15);function p(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=a[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(g(r.parts[i],t))}else{var u=[];for(i=0;i<r.parts.length;i++)u.push(g(r.parts[i],t));a[r.id]={id:r.id,refs:1,parts:u}}}}function h(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],u={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(u):n.push(r[a]={id:a,parts:[u]})}return n}function m(e,t){var n=c(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=f[f.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),f.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=c(e.insertAt.before,n);n.insertBefore(t,o)}}function v(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=f.indexOf(e);0<=t&&f.splice(t,1)}function y(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var r=n.nc;r&&(e.attrs.nonce=r)}return b(t,e.attrs),m(e,t),t}function b(e,t){Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])}))}function g(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i="function"==typeof t.transform?t.transform(e.css):t.transform.default(e.css)))return function(){};e.css=i}if(t.singleton){var a=s++;n=l=l||y(t),r=T.bind(null,n,a,!1),o=T.bind(null,n,a,!0)}else o=e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",b(t,e.attrs),m(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=d(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),u=e.href;e.href=URL.createObjectURL(a),u&&URL.revokeObjectURL(u)}.bind(null,n,t),function(){v(n),n.href&&URL.revokeObjectURL(n.href)}):(n=y(t),r=function(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),function(){v(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=u()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=h(e,t);return p(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var i=n[o];(u=a[i.id]).refs--,r.push(u)}for(e&&p(h(e,t),t),o=0;o<r.length;o++){var u;if(0===(u=r[o]).refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete a[u.id]}}}};var w,_=(w=[],function(e,t){return w[e]=t,w.filter(Boolean).join("\n")});function T(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=_(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},function(e,t,n){"use strict";(function(e){var r=n(0),o=setTimeout;function i(e){return Boolean(e&&void 0!==e.length)}function a(){}function u(e){if(!(this instanceof u))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],p(e,this)}function c(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,u._immediateFn((function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var r;try{r=n(e._value)}catch(n){return void s(t.promise,n)}l(t.promise,r)}else(1===e._state?l:s)(t.promise,e._value)}))):e._deferreds.push(t)}function l(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof u)return e._state=3,e._value=t,void f(e);if("function"==typeof n)return void p(function(e,t){return function(){e.apply(t,arguments)}}(n,t),e)}e._state=1,e._value=t,f(e)}catch(t){s(e,t)}}function s(e,t){e._state=2,e._value=t,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&u._immediateFn((function(){e._handled||u._unhandledRejectionFn(e._value)}));for(var t=0,n=e._deferreds.length;t<n;t++)c(e,e._deferreds[t]);e._deferreds=null}function d(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}function p(e,t){var n=!1;try{e((function(e){n||(n=!0,l(t,e))}),(function(e){n||(n=!0,s(t,e))}))}catch(e){if(n)return;n=!0,s(t,e)}}u.prototype.catch=function(e){return this.then(null,e)},u.prototype.then=function(e,t){var n=new this.constructor(a);return c(this,new d(e,t,n)),n},u.prototype.finally=r.a,u.all=function(e){return new u((function(t,n){if(!i(e))return n(new TypeError("Promise.all accepts an array"));var r=Array.prototype.slice.call(e);if(0===r.length)return t([]);var o=r.length;function a(e,i){try{if(i&&("object"==typeof i||"function"==typeof i)){var u=i.then;if("function"==typeof u)return void u.call(i,(function(t){a(e,t)}),n)}r[e]=i,0==--o&&t(r)}catch(i){n(i)}}for(var u=0;u<r.length;u++)a(u,r[u])}))},u.resolve=function(e){return e&&"object"==typeof e&&e.constructor===u?e:new u((function(t){t(e)}))},u.reject=function(e){return new u((function(t,n){n(e)}))},u.race=function(e){return new u((function(t,n){if(!i(e))return n(new TypeError("Promise.race accepts an array"));for(var r=0,o=e.length;r<o;r++)u.resolve(e[r]).then(t,n)}))},u._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){o(e,0)},u._unhandledRejectionFn=function(){"undefined"!=typeof console&&console},t.a=u}).call(this,n(10).setImmediate)},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,n){e.exports=n(8)},function(e,t,n){"use strict";var r,o=(r=n(2))&&r.__esModule?r:{default:r};n(9),n(13),n(16),n(18),new Promise((function(e){return function(e){return n.e(1).then(function(){var t=[n(21)];e.apply(null,t)}.bind(this)).catch(n.oe)}(e)})).then((function(e){return e.default("Abandon 用例")})),window.vm=new o.default({el:document.getElementById("root"),render:function(e){return e("ui-app")}})},function(e,t,n){"use strict";n.r(t),function(e){var t=n(5),r=n(0),o=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==e)return e;throw new Error("unable to locate global object")}();"Promise"in o?o.Promise.prototype.finally||(o.Promise.prototype.finally=r.a):o.Promise=t.a}.call(this,n(1))},function(e,t,n){(function(e){var r=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,r,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,r,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(r,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;0<=t&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(11),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(1))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var r,o,i,a,u=1,c={},l=!1,s=e.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(e);f=f&&f.setTimeout?f:e,r="[object process]"==={}.toString.call(e.process)?function(e){t.nextTick((function(){p(e)}))}:function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?(a="setImmediate$"+Math.random()+"$",e.addEventListener?e.addEventListener("message",h,!1):e.attachEvent("onmessage",h),function(t){e.postMessage(a+t,"*")}):e.MessageChannel?((i=new MessageChannel).port1.onmessage=function(e){p(e.data)},function(e){i.port2.postMessage(e)}):s&&"onreadystatechange"in s.createElement("script")?(o=s.documentElement,function(e){var t=s.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,o.removeChild(t),t=null},o.appendChild(t)}):function(e){setTimeout(p,0,e)},f.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var o={callback:e,args:t};return c[u]=o,r(u),u++},f.clearImmediate=d}function d(e){delete c[e]}function p(e){if(l)setTimeout(p,0,e);else{var t=c[e];if(t){l=!0;try{!function(e){var t=e.callback,r=e.args;switch(r.length){case 0:t();break;case 1:t(r[0]);break;case 2:t(r[0],r[1]);break;case 3:t(r[0],r[1],r[2]);break;default:t.apply(n,r)}}(t)}finally{d(e),l=!1}}}}function h(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(a)&&p(+t.data.slice(a.length))}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(1),n(12))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function u(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(e){r=a}}();var c,l=[],s=!1,f=-1;function d(){s&&c&&(s=!1,c.length?l=c.concat(l):f=-1,l.length&&p())}function p(){if(!s){var e=u(d);s=!0;for(var t=l.length;t;){for(c=l,l=[];++f<t;)c&&c[f].run();f=-1,t=l.length}c=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new h(e,t)),1!==l.length||s||u(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){var r=n(14);"string"==typeof r&&(r=[[e.i,r,""]]);n(4)(r,{hmr:!0,transform:void 0,insertInto:void 0}),r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,"/*!\n* 统一不同浏览器的基础样式\n* git+https://github.com/yelloxing/normalize.css.git\n*\n* @since v0.1.0 \n* @public\n* \n* 引入方式：\n* import '@yelloxing/normalize.css';\n*/html{-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;line-height:1.15}button,input{border:1px solid #b2b2bd}article,footer,header,nav,section{display:block}canvas,svg{display:inline-block}*{box-sizing:border-box}::-ms-clear,::-ms-reveal{display:none}img{display:inline-block}html{font-family:sans-serif}a{text-decoration:none}li{list-style-type:none}ul,ol,li,p,h1,h2,h3,h4,h5,h6{-webkit-margin-before:0;-webkit-margin-after:0;-webkit-padding-start:0;margin-block-end:0;margin-block-start:0;padding-inline-start:0;padding:0;margin:0}body{margin:0}table{border-collapse:collapse}\n",""])},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,(function(e,t){return t})).replace(/^'(.*)'$/,(function(e,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")}))}},function(e,t,n){var r=n(17);"string"==typeof r&&(r=[[e.i,r,""]]);n(4)(r,{hmr:!0,transform:void 0,insertInto:void 0}),r.locals&&(e.exports=r.locals)},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,"html{font-size:100px}body{font-size:.16rem}.AppView>header{line-height:.5rem;background-color:#43515a;border-color:#43515a;color:#fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:fixed;width:100vw;top:0;box-shadow:0px 4px 5px 0px #f6f6f6;padding:0 calc(50vw - 5rem)}.AppView>header>h2{display:inline-block}.AppView>header>ul{display:inline-block}.AppView>header>ul>li{display:inline-block;padding:0 15px;font-size:.12rem;cursor:pointer}.AppView>div{padding:0 calc(50vw - 5rem);padding-top:.7rem}\n",""])},function(e,t,n){"use strict";var r=a(n(2)),o=a(n(19)),i=a(n(20));function a(e){return e&&e.__esModule?e:{default:e}}r.default.component("page1",o.default),r.default.component("page2",i.default),r.default.component("app",{template:"<div class=\"AppView\">\n    <header>\n      <h2>演示用例</h2>\n      <ul>\n        <li @click='navTo(page1)'>简单的实例</li>\n        <li @click='navTo(page2)'>内置接口</li>\n      </ul>\n    </header>\n    <div>\n      <component v-bind:is=\"data.currentPage\" />\n    </div>\n  </div>",data:function(){return{currentPage:"page1"}},methods:{navTo:function(e){this.data.currentPage=e}}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={render:function(e){return e("div",{},[e("h2",{},"来自render函数"),e("hr"),e("p",{},"启动方式有二种，template或render,你可以试着注释掉render看看效果！"),e("a",{href:"javascript:void(0)","@click":"doIt"},"点击我试试")])},data:function(){return{message:"来自data的数据"}},methods:{doIt:function(){alert(this.data.message)}},beforeCreate:function(){},created:function(){},beforeMount:function(){},mounted:function(){},beforeUpdate:function(){},updated:function(){},beforeDestroy:function(){},destroyed:function(){}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={template:"<div>\n\n    <h4>数据绑定</h4>\n    <hr /><br />\n\n    <strong>【单向绑定】</strong>\n    <br />\n    <label>firstName:</label>\n    <span>{{data.firstName}}</span> \n    <br /> \n    <label>lastName:</label>\n    <span v-bind='data.lastName'></span> \n    <br /> <br />\n\n    <strong>【双向绑定】</strong>\n    <br />\n    <label>firstName:</label><input v-model='data.firstName'/>\n    <br />\n    <label>lastName:</label><input v-model='data.lastName'/>\n\n    \x3c!--============================================================================--\x3e\n    <br /><br /><br />\n\n    <h4>结点事件</h4>\n    <hr /><br />\n\n    <input type='button' value='点击' @click='doIt(\"点击\")'>\n    <input type='button' value='鼠标经过' @mouseover='doIt(\"鼠标经过\")'>\n    <input type='button' value='双击' @dblclick='doIt(\"双击\")'>\n\n    \x3c!--============================================================================--\x3e\n    <br /><br /><br />\n\n    <h4>v-bind扩展</h4>\n    <hr /><br />\n\n    <span v-bind:firstName='data.firstName'>请用F12查看运行后的DOM属性</span>\n\n    \x3c!--============================================================================--\x3e\n    <br /><br /><br />\n\n    <h4>扩展说明</h4>\n    <hr /><br />\n\n    <p>\n      除此之外，你还可以自定义组件或指令等！\n    </p>\n\n  </div>",data:function(){return{firstName:"心",lastName:"叶"}},methods:{doIt:function(e){alert(e)}}}}]);