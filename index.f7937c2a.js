!function(){function e(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},i={},o=n.parcelRequire0252;function s(e,t,n,r,i,o,s){try{var a=e[o](s),l=a.value}catch(e){return void n(e)}a.done?t(l):Promise.resolve(l).then(r,i)}function a(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var o=e.apply(t,n);function a(e){s(o,r,i,a,l,"next",e)}function l(e){s(o,r,i,a,l,"throw",e)}a(void 0)}))}}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){l(e,t,n[t])}))}return e}function c(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var n={id:e,exports:{}};return r[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){i[e]=t},n.parcelRequire0252=o),o.register("gXOAl",(function(t,n){var r,i;e(t.exports,"register",(function(){return r}),(function(e){return r=e})),e(t.exports,"resolve",(function(){return i}),(function(e){return i=e}));var o={};r=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)o[t[n]]=e[t[n]]},i=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),o("gXOAl").register(JSON.parse('{"gkeC9":"index.f7937c2a.js","9PRGL":"remove.23d3a24d.png","l6uDG":"plus.8161bf0d.png","bjAlN":"minus.20274651.png","k5Uho":"check.41cbe688.png","gKWDN":"micro.4379e5ca.png","hrIWC":"index.fdb4fd53.css"}'));var h={},f=function(e){var t,n=Object.prototype,r=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",s=i.asyncIterator||"@@asyncIterator",a=i.toStringTag||"@@toStringTag";function l(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(e){l=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var i=t&&t.prototype instanceof g?t:g,o=Object.create(i.prototype),s=new _(r||[]);return o._invoke=function(e,t,n){var r=h;return function(i,o){if(r===d)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw o;return A()}for(n.method=i,n.arg=o;;){var s=n.delegate;if(s){var a=I(s,n);if(a){if(a===m)continue;return a}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var l=c(e,t,n);if("normal"===l.type){if(r=n.done?p:f,l.arg===m)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r=p,n.method="throw",n.arg=l.arg)}}}(e,n,s),o}function c(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=u;var h="suspendedStart",f="suspendedYield",d="executing",p="completed",m={};function g(){}function y(){}function v(){}var w={};l(w,o,(function(){return this}));var b=Object.getPrototypeOf,E=b&&b(b(N([])));E&&E!==n&&r.call(E,o)&&(w=E);var S=v.prototype=g.prototype=Object.create(w);function k(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function T(e,t){function n(i,o,s,a){var l=c(e[i],e,o);if("throw"!==l.type){var u=l.arg,h=u.value;return h&&"object"==typeof h&&r.call(h,"__await")?t.resolve(h.__await).then((function(e){n("next",e,s,a)}),(function(e){n("throw",e,s,a)})):t.resolve(h).then((function(e){u.value=e,s(u)}),(function(e){return n("throw",e,s,a)}))}a(l.arg)}var i;this._invoke=function(e,r){function o(){return new t((function(t,i){n(e,r,t,i)}))}return i=i?i.then(o,o):o()}}function I(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator.return&&(n.method="return",n.arg=t,I(e,n),"throw"===n.method))return m;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var i=c(r,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,m;var o=i.arg;return o?o.done?(n[e.resultName]=o.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,m):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,m)}function x(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function C(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(x,this),this.reset(!0)}function N(e){if(e){var n=e[o];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var i=-1,s=function n(){for(;++i<e.length;)if(r.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return s.next=s}}return{next:A}}function A(){return{value:t,done:!0}}return y.prototype=v,l(S,"constructor",v),l(v,"constructor",y),y.displayName=l(v,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===y||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,v):(e.__proto__=v,l(e,a,"GeneratorFunction")),e.prototype=Object.create(S),e},e.awrap=function(e){return{__await:e}},k(T.prototype),l(T.prototype,s,(function(){return this})),e.AsyncIterator=T,e.async=function(t,n,r,i,o){void 0===o&&(o=Promise);var s=new T(u(t,n,r,i),o);return e.isGeneratorFunction(n)?s:s.next().then((function(e){return e.done?e.value:s.next()}))},k(S),l(S,a,"Generator"),l(S,o,(function(){return this})),l(S,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=N,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(C),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function i(r,i){return a.type="throw",a.arg=e,n.next=r,i&&(n.method="next",n.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var s=this.tryEntries[o],a=s.completion;if("root"===s.tryLoc)return i("end");if(s.tryLoc<=this.prev){var l=r.call(s,"catchLoc"),u=r.call(s,"finallyLoc");if(l&&u){if(this.prev<s.catchLoc)return i(s.catchLoc,!0);if(this.prev<s.finallyLoc)return i(s.finallyLoc)}else if(l){if(this.prev<s.catchLoc)return i(s.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<s.finallyLoc)return i(s.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var s=o?o.completion:{};return s.type=e,s.arg=t,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(s)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),m},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),C(n),m}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;C(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:N(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),m}},e}(h);try{regeneratorRuntime=f}catch(e){"object"==typeof globalThis?globalThis.regeneratorRuntime=f:Function("r","regeneratorRuntime = r")(f)}var d;o.register("5c8n0",(function(t,n){var r,i,s;e(t.exports,"Fragment",(function(){return r}),(function(e){return r=e})),e(t.exports,"jsx",(function(){return i}),(function(e){return i=e})),e(t.exports,"jsxs",(function(){return s}),(function(e){return s=e})),o("kqcF6");var a=o("lhfsu"),l=60103;if(r=60107,"function"==typeof Symbol&&Symbol.for){var u=Symbol.for;l=u("react.element"),r=u("react.fragment")}var c=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h=Object.prototype.hasOwnProperty,f={key:!0,ref:!0,__self:!0,__source:!0};function d(e,t,n){var r,i={},o=null,s=null;for(r in void 0!==n&&(o=""+n),void 0!==t.key&&(o=""+t.key),void 0!==t.ref&&(s=t.ref),t)h.call(t,r)&&!f.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps)void 0===i[r]&&(i[r]=t[r]);return{$$typeof:l,type:e,key:o,ref:s,props:i,_owner:c.current}}i=d,s=d})),o.register("kqcF6",(function(e,t){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
"use strict";var n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function o(e){if(null==e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}e.exports=function(){try{if(!Object.assign)return!1;if("abc"[5]="de","5"===Object.getOwnPropertyNames("abc")[0])return!1;for(var e={},t=0;t<10;t++)e["_"+String.fromCharCode(t)]=t;if("0123456789"!==Object.getOwnPropertyNames(e).map((function(t){return e[t]})).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach((function(e){n[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(e){return!1}}()?Object.assign:function(e,t){for(var s,a,l=o(e),u=1;u<arguments.length;u++){for(var c in s=Object(arguments[u]))r.call(s,c)&&(l[c]=s[c]);if(n){a=n(s);for(var h=0;h<a.length;h++)i.call(s,a[h])&&(l[a[h]]=s[a[h]])}}return l}})),o.register("lhfsu",(function(e,t){"use strict";e.exports=o("aZxle")})),o.register("aZxle",(function(t,n){var r,i,s,a,l,u,c,h,f,d,p,m,g,y,v,w,b,E,S,k,T,I,x,C,_,N,A,D;e(t.exports,"Fragment",(function(){return r}),(function(e){return r=e})),e(t.exports,"StrictMode",(function(){return i}),(function(e){return i=e})),e(t.exports,"Profiler",(function(){return s}),(function(e){return s=e})),e(t.exports,"Suspense",(function(){return a}),(function(e){return a=e})),e(t.exports,"Children",(function(){return l}),(function(e){return l=e})),e(t.exports,"Component",(function(){return u}),(function(e){return u=e})),e(t.exports,"PureComponent",(function(){return c}),(function(e){return c=e})),e(t.exports,"__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",(function(){return h}),(function(e){return h=e})),e(t.exports,"cloneElement",(function(){return f}),(function(e){return f=e})),e(t.exports,"createContext",(function(){return d}),(function(e){return d=e})),e(t.exports,"createElement",(function(){return p}),(function(e){return p=e})),e(t.exports,"createFactory",(function(){return m}),(function(e){return m=e})),e(t.exports,"createRef",(function(){return g}),(function(e){return g=e})),e(t.exports,"forwardRef",(function(){return y}),(function(e){return y=e})),e(t.exports,"isValidElement",(function(){return v}),(function(e){return v=e})),e(t.exports,"lazy",(function(){return w}),(function(e){return w=e})),e(t.exports,"memo",(function(){return b}),(function(e){return b=e})),e(t.exports,"useCallback",(function(){return E}),(function(e){return E=e})),e(t.exports,"useContext",(function(){return S}),(function(e){return S=e})),e(t.exports,"useDebugValue",(function(){return k}),(function(e){return k=e})),e(t.exports,"useEffect",(function(){return T}),(function(e){return T=e})),e(t.exports,"useImperativeHandle",(function(){return I}),(function(e){return I=e})),e(t.exports,"useLayoutEffect",(function(){return x}),(function(e){return x=e})),e(t.exports,"useMemo",(function(){return C}),(function(e){return C=e})),e(t.exports,"useReducer",(function(){return _}),(function(e){return _=e})),e(t.exports,"useRef",(function(){return N}),(function(e){return N=e})),e(t.exports,"useState",(function(){return A}),(function(e){return A=e})),e(t.exports,"version",(function(){return D}),(function(e){return D=e}));var L=o("kqcF6"),P=60103,O=60106;r=60107,i=60108,s=60114;var R=60109,M=60110,F=60112;a=60113;var U=60115,V=60116;if("function"==typeof Symbol&&Symbol.for){var j=Symbol.for;P=j("react.element"),O=j("react.portal"),r=j("react.fragment"),i=j("react.strict_mode"),s=j("react.profiler"),R=j("react.provider"),M=j("react.context"),F=j("react.forward_ref"),a=j("react.suspense"),U=j("react.memo"),V=j("react.lazy")}var z="function"==typeof Symbol&&Symbol.iterator;function B(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},H={};function $(e,t,n){this.props=e,this.context=t,this.refs=H,this.updater=n||q}function K(){}function G(e,t,n){this.props=e,this.context=t,this.refs=H,this.updater=n||q}$.prototype.isReactComponent={},$.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(B(85));this.updater.enqueueSetState(this,e,t,"setState")},$.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},K.prototype=$.prototype;var W=G.prototype=new K;W.constructor=G,L(W,$.prototype),W.isPureReactComponent=!0;var Q={current:null},X=Object.prototype.hasOwnProperty,Y={key:!0,ref:!0,__self:!0,__source:!0};function J(e,t,n){var r,i={},o=null,s=null;if(null!=t)for(r in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(o=""+t.key),t)X.call(t,r)&&!Y.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(1===a)i.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];i.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps)void 0===i[r]&&(i[r]=a[r]);return{$$typeof:P,type:e,key:o,ref:s,props:i,_owner:Q.current}}function Z(e){return"object"==typeof e&&null!==e&&e.$$typeof===P}var ee=/\/+/g;function te(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function ne(e,t,n,r,i){var o=typeof e;"undefined"!==o&&"boolean"!==o||(e=null);var s=!1;if(null===e)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case P:case O:s=!0}}if(s)return i=i(s=e),e=""===r?"."+te(s,0):r,Array.isArray(i)?(n="",null!=e&&(n=e.replace(ee,"$&/")+"/"),ne(i,t,n,"",(function(e){return e}))):null!=i&&(Z(i)&&(i=function(e,t){return{$$typeof:P,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,n+(!i.key||s&&s.key===i.key?"":(""+i.key).replace(ee,"$&/")+"/")+e)),t.push(i)),1;if(s=0,r=""===r?".":r+":",Array.isArray(e))for(var a=0;a<e.length;a++){var l=r+te(o=e[a],a);s+=ne(o,t,n,l,i)}else if(l=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=z&&e[z]||e["@@iterator"])?e:null}(e),"function"==typeof l)for(e=l.call(e),a=0;!(o=e.next()).done;)s+=ne(o=o.value,t,n,l=r+te(o,a++),i);else if("object"===o)throw t=""+e,Error(B(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return s}function re(e,t,n){if(null==e)return e;var r=[],i=0;return ne(e,r,"","",(function(e){return t.call(n,e,i++)})),r}function ie(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var oe={current:null};function se(){var e=oe.current;if(null===e)throw Error(B(321));return e}l={map:re,forEach:function(e,t,n){re(e,(function(){t.apply(this,arguments)}),n)},count:function(e){var t=0;return re(e,(function(){t++})),t},toArray:function(e){return re(e,(function(e){return e}))||[]},only:function(e){if(!Z(e))throw Error(B(143));return e}},u=$,c=G,h={ReactCurrentDispatcher:oe,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:Q,IsSomeRendererActing:{current:!1},assign:L},f=function(e,t,n){if(null==e)throw Error(B(267,e));var r=L({},e.props),i=e.key,o=e.ref,s=e._owner;if(null!=t){if(void 0!==t.ref&&(o=t.ref,s=Q.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)X.call(t,l)&&!Y.hasOwnProperty(l)&&(r[l]=void 0===t[l]&&void 0!==a?a[l]:t[l])}var l=arguments.length-2;if(1===l)r.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:P,type:e.type,key:i,ref:o,props:r,_owner:s}},d=function(e,t){return void 0===t&&(t=null),(e={$$typeof:M,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:R,_context:e},e.Consumer=e},p=J,m=function(e){var t=J.bind(null,e);return t.type=e,t},g=function(){return{current:null}},y=function(e){return{$$typeof:F,render:e}},v=Z,w=function(e){return{$$typeof:V,_payload:{_status:-1,_result:e},_init:ie}},b=function(e,t){return{$$typeof:U,type:e,compare:void 0===t?null:t}},E=function(e,t){return se().useCallback(e,t)},S=function(e,t){return se().useContext(e,t)},k=function(){},T=function(e,t){return se().useEffect(e,t)},I=function(e,t,n){return se().useImperativeHandle(e,t,n)},x=function(e,t){return se().useLayoutEffect(e,t)},C=function(e,t){return se().useMemo(e,t)},_=function(e,t,n){return se().useReducer(e,t,n)},N=function(e){return se().useRef(e)},A=function(e){return se().useState(e)},D="17.0.2"})),d=o("5c8n0");var p,m=o("lhfsu");!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),o.register("aniPj",(function(t,n){var r,i,s,a,l,u,c,h,f,d,p;e(t.exports,"__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",(function(){return r}),(function(e){return r=e})),e(t.exports,"createPortal",(function(){return i}),(function(e){return i=e})),e(t.exports,"findDOMNode",(function(){return s}),(function(e){return s=e})),e(t.exports,"flushSync",(function(){return a}),(function(e){return a=e})),e(t.exports,"hydrate",(function(){return l}),(function(e){return l=e})),e(t.exports,"render",(function(){return u}),(function(e){return u=e})),e(t.exports,"unmountComponentAtNode",(function(){return c}),(function(e){return c=e})),e(t.exports,"unstable_batchedUpdates",(function(){return h}),(function(e){return h=e})),e(t.exports,"unstable_createPortal",(function(){return f}),(function(e){return f=e})),e(t.exports,"unstable_renderSubtreeIntoContainer",(function(){return d}),(function(e){return d=e})),e(t.exports,"version",(function(){return p}),(function(e){return p=e}));var m=o("lhfsu"),g=o("kqcF6"),y=o("j5AGC");function v(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!m)throw Error(v(227));var w=new Set,b={};function E(e,t){S(e,t),S(e+"Capture",t)}function S(e,t){for(b[e]=t,e=0;e<t.length;e++)w.add(t[e])}var k=!("undefined"==typeof window||void 0===window.document||void 0===window.document.createElement),T=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,I=Object.prototype.hasOwnProperty,x={},C={};function _(e,t,n,r,i,o,s){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=o,this.removeEmptyString=s}var N={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach((function(e){N[e]=new _(e,0,!1,e,null,!1,!1)})),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach((function(e){var t=e[0];N[t]=new _(t,1,!1,e[1],null,!1,!1)})),["contentEditable","draggable","spellCheck","value"].forEach((function(e){N[e]=new _(e,2,!1,e.toLowerCase(),null,!1,!1)})),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach((function(e){N[e]=new _(e,2,!1,e,null,!1,!1)})),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach((function(e){N[e]=new _(e,3,!1,e.toLowerCase(),null,!1,!1)})),["checked","multiple","muted","selected"].forEach((function(e){N[e]=new _(e,3,!0,e,null,!1,!1)})),["capture","download"].forEach((function(e){N[e]=new _(e,4,!1,e,null,!1,!1)})),["cols","rows","size","span"].forEach((function(e){N[e]=new _(e,6,!1,e,null,!1,!1)})),["rowSpan","start"].forEach((function(e){N[e]=new _(e,5,!1,e.toLowerCase(),null,!1,!1)}));var A=/[\-:]([a-z])/g;function D(e){return e[1].toUpperCase()}function L(e,t,n,r){var i=N.hasOwnProperty(t)?N[t]:null;(null!==i?0===i.type:!r&&(2<t.length&&("o"===t[0]||"O"===t[0])&&("n"===t[1]||"N"===t[1])))||(function(e,t,n,r){if(null==t||function(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return!r&&(null!==n?!n.acceptsBooleans:"data-"!==(e=e.toLowerCase().slice(0,5))&&"aria-"!==e);default:return!1}}(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}(t,n,i,r)&&(n=null),r||null===i?function(e){return!!I.call(C,e)||!I.call(x,e)&&(T.test(e)?C[e]=!0:(x[e]=!0,!1))}(t)&&(null===n?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=null===n?3!==i.type&&"":n:(t=i.attributeName,r=i.attributeNamespace,null===n?e.removeAttribute(t):(n=3===(i=i.type)||4===i&&!0===n?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach((function(e){var t=e.replace(A,D);N[t]=new _(t,1,!1,e,null,!1,!1)})),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach((function(e){var t=e.replace(A,D);N[t]=new _(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)})),["xml:base","xml:lang","xml:space"].forEach((function(e){var t=e.replace(A,D);N[t]=new _(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)})),["tabIndex","crossOrigin"].forEach((function(e){N[e]=new _(e,1,!1,e.toLowerCase(),null,!1,!1)})),N.xlinkHref=new _("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach((function(e){N[e]=new _(e,1,!1,e.toLowerCase(),null,!0,!0)}));var P=m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,O=60103,R=60106,M=60107,F=60108,U=60114,V=60109,j=60110,z=60112,B=60113,q=60120,H=60115,$=60116,K=60121,G=60128,W=60129,Q=60130,X=60131;if("function"==typeof Symbol&&Symbol.for){var Y=Symbol.for;O=Y("react.element"),R=Y("react.portal"),M=Y("react.fragment"),F=Y("react.strict_mode"),U=Y("react.profiler"),V=Y("react.provider"),j=Y("react.context"),z=Y("react.forward_ref"),B=Y("react.suspense"),q=Y("react.suspense_list"),H=Y("react.memo"),$=Y("react.lazy"),K=Y("react.block"),Y("react.scope"),G=Y("react.opaque.id"),W=Y("react.debug_trace_mode"),Q=Y("react.offscreen"),X=Y("react.legacy_hidden")}var J,Z="function"==typeof Symbol&&Symbol.iterator;function ee(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=Z&&e[Z]||e["@@iterator"])?e:null}function te(e){if(void 0===J)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);J=t&&t[1]||""}return"\n"+J+e}var ne=!1;function re(e,t){if(!e||ne)return"";ne=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),"object"==typeof Reflect&&Reflect.construct){try{Reflect.construct(t,[])}catch(e){var r=e}Reflect.construct(e,[],t)}else{try{t.call()}catch(e){r=e}e.call(t.prototype)}else{try{throw Error()}catch(e){r=e}e()}}catch(e){if(e&&r&&"string"==typeof e.stack){for(var i=e.stack.split("\n"),o=r.stack.split("\n"),s=i.length-1,a=o.length-1;1<=s&&0<=a&&i[s]!==o[a];)a--;for(;1<=s&&0<=a;s--,a--)if(i[s]!==o[a]){if(1!==s||1!==a)do{if(s--,0>--a||i[s]!==o[a])return"\n"+i[s].replace(" at new "," at ")}while(1<=s&&0<=a);break}}}finally{ne=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?te(e):""}function ie(e){switch(e.tag){case 5:return te(e.type);case 16:return te("Lazy");case 13:return te("Suspense");case 19:return te("SuspenseList");case 0:case 2:case 15:return e=re(e.type,!1);case 11:return e=re(e.type.render,!1);case 22:return e=re(e.type._render,!1);case 1:return e=re(e.type,!0);default:return""}}function oe(e){if(null==e)return null;if("function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case M:return"Fragment";case R:return"Portal";case U:return"Profiler";case F:return"StrictMode";case B:return"Suspense";case q:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case j:return(e.displayName||"Context")+".Consumer";case V:return(e._context.displayName||"Context")+".Provider";case z:var t=e.render;return t=t.displayName||t.name||"",e.displayName||(""!==t?"ForwardRef("+t+")":"ForwardRef");case H:return oe(e.type);case K:return oe(e._render);case $:t=e._payload,e=e._init;try{return oe(e(t))}catch(e){}}return null}function se(e){switch(typeof e){case"boolean":case"number":case"object":case"string":case"undefined":return e;default:return""}}function ae(e){var t=e.type;return(e=e.nodeName)&&"input"===e.toLowerCase()&&("checkbox"===t||"radio"===t)}function le(e){e._valueTracker||(e._valueTracker=function(e){var t=ae(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var i=n.get,o=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){r=""+e,o.call(this,e)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function ue(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=ae(e)?e.checked?"true":"false":e.value),(e=r)!==n&&(t.setValue(e),!0)}function ce(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}function he(e,t){var n=t.checked;return g({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function fe(e,t){var n=null==t.defaultValue?"":t.defaultValue,r=null!=t.checked?t.checked:t.defaultChecked;n=se(null!=t.value?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:"checkbox"===t.type||"radio"===t.type?null!=t.checked:null!=t.value}}function de(e,t){null!=(t=t.checked)&&L(e,"checked",t,!1)}function pe(e,t){de(e,t);var n=se(t.value),r=t.type;if(null!=n)"number"===r?(0===n&&""===e.value||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if("submit"===r||"reset"===r)return void e.removeAttribute("value");t.hasOwnProperty("value")?ge(e,t.type,n):t.hasOwnProperty("defaultValue")&&ge(e,t.type,se(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function me(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!("submit"!==r&&"reset"!==r||void 0!==t.value&&null!==t.value))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}""!==(n=e.name)&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,""!==n&&(e.name=n)}function ge(e,t,n){"number"===t&&ce(e.ownerDocument)===e||(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}function ye(e,t){return e=g({children:void 0},t),(t=function(e){var t="";return m.Children.forEach(e,(function(e){null!=e&&(t+=e)})),t}(t.children))&&(e.children=t),e}function ve(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+se(n),t=null,i=0;i<e.length;i++){if(e[i].value===n)return e[i].selected=!0,void(r&&(e[i].defaultSelected=!0));null!==t||e[i].disabled||(t=e[i])}null!==t&&(t.selected=!0)}}function we(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error(v(91));return g({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function be(e,t){var n=t.value;if(null==n){if(n=t.children,t=t.defaultValue,null!=n){if(null!=t)throw Error(v(92));if(Array.isArray(n)){if(!(1>=n.length))throw Error(v(93));n=n[0]}t=n}null==t&&(t=""),n=t}e._wrapperState={initialValue:se(n)}}function Ee(e,t){var n=se(t.value),r=se(t.defaultValue);null!=n&&((n=""+n)!==e.value&&(e.value=n),null==t.defaultValue&&e.defaultValue!==n&&(e.defaultValue=n)),null!=r&&(e.defaultValue=""+r)}function Se(e){var t=e.textContent;t===e._wrapperState.initialValue&&""!==t&&null!==t&&(e.value=t)}var ke="http://www.w3.org/1999/xhtml",Te="http://www.w3.org/2000/svg";function Ie(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function xe(e,t){return null==e||"http://www.w3.org/1999/xhtml"===e?Ie(t):"http://www.w3.org/2000/svg"===e&&"foreignObject"===t?"http://www.w3.org/1999/xhtml":e}var Ce,_e,Ne=(_e=function(e,t){if(e.namespaceURI!==Te||"innerHTML"in e)e.innerHTML=t;else{for((Ce=Ce||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Ce.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(e,t,n,r){MSApp.execUnsafeLocalFunction((function(){return _e(e,t)}))}:_e);function Ae(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType)return void(n.nodeValue=t)}e.textContent=t}var De={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Le=["Webkit","ms","Moz","O"];function Pe(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||De.hasOwnProperty(e)&&De[e]?(""+t).trim():t+"px"}function Oe(e,t){for(var n in e=e.style,t)if(t.hasOwnProperty(n)){var r=0===n.indexOf("--"),i=Pe(n,t[n],r);"float"===n&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}Object.keys(De).forEach((function(e){Le.forEach((function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),De[t]=De[e]}))}));var Re=g({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Me(e,t){if(t){if(Re[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(v(137,e));if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error(v(60));if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error(v(61))}if(null!=t.style&&"object"!=typeof t.style)throw Error(v(62))}}function Fe(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}function Ue(e){return(e=e.target||e.srcElement||window).correspondingUseElement&&(e=e.correspondingUseElement),3===e.nodeType?e.parentNode:e}var Ve=null,je=null,ze=null;function Be(e){if(e=mi(e)){if("function"!=typeof Ve)throw Error(v(280));var t=e.stateNode;t&&(t=yi(t),Ve(e.stateNode,e.type,t))}}function qe(e){je?ze?ze.push(e):ze=[e]:je=e}function He(){if(je){var e=je,t=ze;if(ze=je=null,Be(e),t)for(e=0;e<t.length;e++)Be(t[e])}}function $e(e,t){return e(t)}function Ke(e,t,n,r,i){return e(t,n,r,i)}function Ge(){}var We=$e,Qe=!1,Xe=!1;function Ye(){null===je&&null===ze||(Ge(),He())}function Je(e,t){var n=e.stateNode;if(null===n)return null;var r=yi(n);if(null===r)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(r=!("button"===(e=e.type)||"input"===e||"select"===e||"textarea"===e)),e=!r;break e;default:e=!1}if(e)return null;if(n&&"function"!=typeof n)throw Error(v(231,t,typeof n));return n}var Ze=!1;if(k)try{var et={};Object.defineProperty(et,"passive",{get:function(){Ze=!0}}),window.addEventListener("test",et,et),window.removeEventListener("test",et,et)}catch(_e){Ze=!1}function tt(e,t,n,r,i,o,s,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(e){this.onError(e)}}var nt=!1,rt=null,it=!1,ot=null,st={onError:function(e){nt=!0,rt=e}};function at(e,t,n,r,i,o,s,a,l){nt=!1,rt=null,tt.apply(st,arguments)}function lt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do{0!=(1026&(t=e).flags)&&(n=t.return),e=t.return}while(e)}return 3===t.tag?n:null}function ut(e){if(13===e.tag){var t=e.memoizedState;if(null===t&&(null!==(e=e.alternate)&&(t=e.memoizedState)),null!==t)return t.dehydrated}return null}function ct(e){if(lt(e)!==e)throw Error(v(188))}function ht(e){if(e=function(e){var t=e.alternate;if(!t){if(null===(t=lt(e)))throw Error(v(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(null===i)break;var o=i.alternate;if(null===o){if(null!==(r=i.return)){n=r;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return ct(i),e;if(o===r)return ct(i),t;o=o.sibling}throw Error(v(188))}if(n.return!==r.return)n=i,r=o;else{for(var s=!1,a=i.child;a;){if(a===n){s=!0,n=i,r=o;break}if(a===r){s=!0,r=i,n=o;break}a=a.sibling}if(!s){for(a=o.child;a;){if(a===n){s=!0,n=o,r=i;break}if(a===r){s=!0,r=o,n=i;break}a=a.sibling}if(!s)throw Error(v(189))}}if(n.alternate!==r)throw Error(v(190))}if(3!==n.tag)throw Error(v(188));return n.stateNode.current===n?e:t}(e),!e)return null;for(var t=e;;){if(5===t.tag||6===t.tag)return t;if(t.child)t.child.return=t,t=t.child;else{if(t===e)break;for(;!t.sibling;){if(!t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}}return null}function ft(e,t){for(var n=e.alternate;null!==t;){if(t===e||t===n)return!0;t=t.return}return!1}var dt,pt,mt,gt,yt=!1,vt=[],wt=null,bt=null,Et=null,St=new Map,kt=new Map,Tt=[],It="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function xt(e,t,n,r,i){return{blockedOn:e,domEventName:t,eventSystemFlags:16|n,nativeEvent:i,targetContainers:[r]}}function Ct(e,t){switch(e){case"focusin":case"focusout":wt=null;break;case"dragenter":case"dragleave":bt=null;break;case"mouseover":case"mouseout":Et=null;break;case"pointerover":case"pointerout":St.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":kt.delete(t.pointerId)}}function _t(e,t,n,r,i,o){return null===e||e.nativeEvent!==o?(e=xt(t,n,r,i,o),null!==t&&(null!==(t=mi(t))&&pt(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,null!==i&&-1===t.indexOf(i)&&t.push(i),e)}function Nt(e){var t=pi(e.target);if(null!==t){var n=lt(t);if(null!==n)if(13===(t=n.tag)){if(null!==(t=ut(n)))return e.blockedOn=t,void gt(e.lanePriority,(function(){y.unstable_runWithPriority(e.priority,(function(){mt(n)}))}))}else if(3===t&&n.stateNode.hydrate)return void(e.blockedOn=3===n.tag?n.stateNode.containerInfo:null)}e.blockedOn=null}function At(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;0<t.length;){var n=fn(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n)return null!==(t=mi(n))&&pt(t),e.blockedOn=n,!1;t.shift()}return!0}function Dt(e,t,n){At(e)&&n.delete(t)}function Lt(){for(yt=!1;0<vt.length;){var e=vt[0];if(null!==e.blockedOn){null!==(e=mi(e.blockedOn))&&dt(e);break}for(var t=e.targetContainers;0<t.length;){var n=fn(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(null!==n){e.blockedOn=n;break}t.shift()}null===e.blockedOn&&vt.shift()}null!==wt&&At(wt)&&(wt=null),null!==bt&&At(bt)&&(bt=null),null!==Et&&At(Et)&&(Et=null),St.forEach(Dt),kt.forEach(Dt)}function Pt(e,t){e.blockedOn===t&&(e.blockedOn=null,yt||(yt=!0,y.unstable_scheduleCallback(y.unstable_NormalPriority,Lt)))}function Ot(e){function t(t){return Pt(t,e)}if(0<vt.length){Pt(vt[0],e);for(var n=1;n<vt.length;n++){var r=vt[n];r.blockedOn===e&&(r.blockedOn=null)}}for(null!==wt&&Pt(wt,e),null!==bt&&Pt(bt,e),null!==Et&&Pt(Et,e),St.forEach(t),kt.forEach(t),n=0;n<Tt.length;n++)(r=Tt[n]).blockedOn===e&&(r.blockedOn=null);for(;0<Tt.length&&null===(n=Tt[0]).blockedOn;)Nt(n),null===n.blockedOn&&Tt.shift()}function Rt(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Mt={animationend:Rt("Animation","AnimationEnd"),animationiteration:Rt("Animation","AnimationIteration"),animationstart:Rt("Animation","AnimationStart"),transitionend:Rt("Transition","TransitionEnd")},Ft={},Ut={};function Vt(e){if(Ft[e])return Ft[e];if(!Mt[e])return e;var t,n=Mt[e];for(t in n)if(n.hasOwnProperty(t)&&t in Ut)return Ft[e]=n[t];return e}k&&(Ut=document.createElement("div").style,"AnimationEvent"in window||(delete Mt.animationend.animation,delete Mt.animationiteration.animation,delete Mt.animationstart.animation),"TransitionEvent"in window||delete Mt.transitionend.transition);var jt=Vt("animationend"),zt=Vt("animationiteration"),Bt=Vt("animationstart"),qt=Vt("transitionend"),Ht=new Map,$t=new Map,Kt=["abort","abort",jt,"animationEnd",zt,"animationIteration",Bt,"animationStart","canplay","canPlay","canplaythrough","canPlayThrough","durationchange","durationChange","emptied","emptied","encrypted","encrypted","ended","ended","error","error","gotpointercapture","gotPointerCapture","load","load","loadeddata","loadedData","loadedmetadata","loadedMetadata","loadstart","loadStart","lostpointercapture","lostPointerCapture","playing","playing","progress","progress","seeking","seeking","stalled","stalled","suspend","suspend","timeupdate","timeUpdate",qt,"transitionEnd","waiting","waiting"];function Gt(e,t){for(var n=0;n<e.length;n+=2){var r=e[n],i=e[n+1];i="on"+(i[0].toUpperCase()+i.slice(1)),$t.set(r,t),Ht.set(r,i),E(i,[r])}}(0,y.unstable_now)();var Wt=8;function Qt(e){if(0!=(1&e))return Wt=15,1;if(0!=(2&e))return Wt=14,2;if(0!=(4&e))return Wt=13,4;var t=24&e;return 0!==t?(Wt=12,t):0!=(32&e)?(Wt=11,32):0!==(t=192&e)?(Wt=10,t):0!=(256&e)?(Wt=9,256):0!==(t=3584&e)?(Wt=8,t):0!=(4096&e)?(Wt=7,4096):0!==(t=4186112&e)?(Wt=6,t):0!==(t=62914560&e)?(Wt=5,t):67108864&e?(Wt=4,67108864):0!=(134217728&e)?(Wt=3,134217728):0!==(t=805306368&e)?(Wt=2,t):0!=(1073741824&e)?(Wt=1,1073741824):(Wt=8,e)}function Xt(e,t){var n=e.pendingLanes;if(0===n)return Wt=0;var r=0,i=0,o=e.expiredLanes,s=e.suspendedLanes,a=e.pingedLanes;if(0!==o)r=o,i=Wt=15;else if(0!==(o=134217727&n)){var l=o&~s;0!==l?(r=Qt(l),i=Wt):0!==(a&=o)&&(r=Qt(a),i=Wt)}else 0!==(o=n&~s)?(r=Qt(o),i=Wt):0!==a&&(r=Qt(a),i=Wt);if(0===r)return 0;if(r=n&((0>(r=31-nn(r))?0:1<<r)<<1)-1,0!==t&&t!==r&&0==(t&s)){if(Qt(t),i<=Wt)return t;Wt=i}if(0!==(t=e.entangledLanes))for(e=e.entanglements,t&=r;0<t;)i=1<<(n=31-nn(t)),r|=e[n],t&=~i;return r}function Yt(e){return 0!==(e=-1073741825&e.pendingLanes)?e:1073741824&e?1073741824:0}function Jt(e,t){switch(e){case 15:return 1;case 14:return 2;case 12:return 0===(e=Zt(24&~t))?Jt(10,t):e;case 10:return 0===(e=Zt(192&~t))?Jt(8,t):e;case 8:return 0===(e=Zt(3584&~t))&&(0===(e=Zt(4186112&~t))&&(e=512)),e;case 2:return 0===(t=Zt(805306368&~t))&&(t=268435456),t}throw Error(v(358,e))}function Zt(e){return e&-e}function en(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tn(e,t,n){e.pendingLanes|=t;var r=t-1;e.suspendedLanes&=r,e.pingedLanes&=r,(e=e.eventTimes)[t=31-nn(t)]=n}var nn=Math.clz32?Math.clz32:function(e){return 0===e?32:31-(rn(e)/on|0)|0},rn=Math.log,on=Math.LN2;var sn=y.unstable_UserBlockingPriority,an=y.unstable_runWithPriority,ln=!0;function un(e,t,n,r){Qe||Ge();var i=hn,o=Qe;Qe=!0;try{Ke(i,e,t,n,r)}finally{(Qe=o)||Ye()}}function cn(e,t,n,r){an(sn,hn.bind(null,e,t,n,r))}function hn(e,t,n,r){var i;if(ln)if((i=0==(4&t))&&0<vt.length&&-1<It.indexOf(e))e=xt(null,e,t,n,r),vt.push(e);else{var o=fn(e,t,n,r);if(null===o)i&&Ct(e,r);else{if(i){if(-1<It.indexOf(e))return e=xt(o,e,t,n,r),void vt.push(e);if(function(e,t,n,r,i){switch(t){case"focusin":return wt=_t(wt,e,t,n,r,i),!0;case"dragenter":return bt=_t(bt,e,t,n,r,i),!0;case"mouseover":return Et=_t(Et,e,t,n,r,i),!0;case"pointerover":var o=i.pointerId;return St.set(o,_t(St.get(o)||null,e,t,n,r,i)),!0;case"gotpointercapture":return o=i.pointerId,kt.set(o,_t(kt.get(o)||null,e,t,n,r,i)),!0}return!1}(o,e,t,n,r))return;Ct(e,r)}Gr(e,t,r,null,n)}}}function fn(e,t,n,r){var i=Ue(r);if(null!==(i=pi(i))){var o=lt(i);if(null===o)i=null;else{var s=o.tag;if(13===s){if(null!==(i=ut(o)))return i;i=null}else if(3===s){if(o.stateNode.hydrate)return 3===o.tag?o.stateNode.containerInfo:null;i=null}else o!==i&&(i=null)}}return Gr(e,t,r,i,n),null}var dn=null,pn=null,mn=null;function gn(){if(mn)return mn;var e,t,n=pn,r=n.length,i="value"in dn?dn.value:dn.textContent,o=i.length;for(e=0;e<r&&n[e]===i[e];e++);var s=r-e;for(t=1;t<=s&&n[r-t]===i[o-t];t++);return mn=i.slice(e,1<t?1-t:void 0)}function yn(e){var t=e.keyCode;return"charCode"in e?0===(e=e.charCode)&&13===t&&(e=13):e=t,10===e&&(e=13),32<=e||13===e?e:0}function vn(){return!0}function wn(){return!1}function bn(e){function t(t,n,r,i,o){for(var s in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=o,this.currentTarget=null,e)e.hasOwnProperty(s)&&(t=e[s],this[s]=t?t(i):i[s]);return this.isDefaultPrevented=(null!=i.defaultPrevented?i.defaultPrevented:!1===i.returnValue)?vn:wn,this.isPropagationStopped=wn,this}return g(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=vn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&(e.cancelBubble=!0),this.isPropagationStopped=vn)},persist:function(){},isPersistent:vn}),t}var En,Sn,kn,Tn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},In=bn(Tn),xn=g({},Tn,{view:0,detail:0}),Cn=bn(xn),_n=g({},xn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:jn,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==kn&&(kn&&"mousemove"===e.type?(En=e.screenX-kn.screenX,Sn=e.screenY-kn.screenY):Sn=En=0,kn=e),En)},movementY:function(e){return"movementY"in e?e.movementY:Sn}}),Nn=bn(_n),An=bn(g({},_n,{dataTransfer:0})),Dn=bn(g({},xn,{relatedTarget:0})),Ln=bn(g({},Tn,{animationName:0,elapsedTime:0,pseudoElement:0})),Pn=g({},Tn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),On=bn(Pn),Rn=bn(g({},Tn,{data:0})),Mn={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Fn={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Un={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Vn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):!!(e=Un[e])&&!!t[e]}function jn(){return Vn}var zn=g({},xn,{key:function(e){if(e.key){var t=Mn[e.key]||e.key;if("Unidentified"!==t)return t}return"keypress"===e.type?13===(e=yn(e))?"Enter":String.fromCharCode(e):"keydown"===e.type||"keyup"===e.type?Fn[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:jn,charCode:function(e){return"keypress"===e.type?yn(e):0},keyCode:function(e){return"keydown"===e.type||"keyup"===e.type?e.keyCode:0},which:function(e){return"keypress"===e.type?yn(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0}}),Bn=bn(zn),qn=bn(g({},_n,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Hn=bn(g({},xn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:jn})),$n=bn(g({},Tn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Kn=g({},_n,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Gn=bn(Kn),Wn=[9,13,27,32],Qn=k&&"CompositionEvent"in window,Xn=null;k&&"documentMode"in document&&(Xn=document.documentMode);var Yn=k&&"TextEvent"in window&&!Xn,Jn=k&&(!Qn||Xn&&8<Xn&&11>=Xn),Zn=String.fromCharCode(32),er=!1;function tr(e,t){switch(e){case"keyup":return-1!==Wn.indexOf(t.keyCode);case"keydown":return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function nr(e){return"object"==typeof(e=e.detail)&&"data"in e?e.data:null}var rr=!1;var ir={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function or(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!ir[e.type]:"textarea"===t}function sr(e,t,n,r){qe(r),0<(t=Qr(t,"onChange")).length&&(n=new In("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var ar=null,lr=null;function ur(e){zr(e,0)}function cr(e){if(ue(gi(e)))return e}function hr(e,t){if("change"===e)return t}var fr=!1;if(k){var dr;if(k){var pr="oninput"in document;if(!pr){var mr=document.createElement("div");mr.setAttribute("oninput","return;"),pr="function"==typeof mr.oninput}dr=pr}else dr=!1;fr=dr&&(!document.documentMode||9<document.documentMode)}function gr(){ar&&(ar.detachEvent("onpropertychange",yr),lr=ar=null)}function yr(e){if("value"===e.propertyName&&cr(lr)){var t=[];if(sr(t,lr,e,Ue(e)),e=ur,Qe)e(t);else{Qe=!0;try{$e(e,t)}finally{Qe=!1,Ye()}}}}function vr(e,t,n){"focusin"===e?(gr(),lr=n,(ar=t).attachEvent("onpropertychange",yr)):"focusout"===e&&gr()}function wr(e){if("selectionchange"===e||"keyup"===e||"keydown"===e)return cr(lr)}function br(e,t){if("click"===e)return cr(t)}function Er(e,t){if("input"===e||"change"===e)return cr(t)}var Sr="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},kr=Object.prototype.hasOwnProperty;function Tr(e,t){if(Sr(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++)if(!kr.call(t,n[r])||!Sr(e[n[r]],t[n[r]]))return!1;return!0}function Ir(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function xr(e,t){var n,r=Ir(e);for(e=0;r;){if(3===r.nodeType){if(n=e+r.textContent.length,e<=t&&n>=t)return{node:r,offset:t-e};e=n}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Ir(r)}}function Cr(e,t){return!(!e||!t)&&(e===t||(!e||3!==e.nodeType)&&(t&&3===t.nodeType?Cr(e,t.parentNode):"contains"in e?e.contains(t):!!e.compareDocumentPosition&&!!(16&e.compareDocumentPosition(t))))}function _r(){for(var e=window,t=ce();t instanceof e.HTMLIFrameElement;){try{var n="string"==typeof t.contentWindow.location.href}catch(e){n=!1}if(!n)break;t=ce((e=t.contentWindow).document)}return t}function Nr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var Ar=k&&"documentMode"in document&&11>=document.documentMode,Dr=null,Lr=null,Pr=null,Or=!1;function Rr(e,t,n){var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;Or||null==Dr||Dr!==ce(r)||("selectionStart"in(r=Dr)&&Nr(r)?r={start:r.selectionStart,end:r.selectionEnd}:r={anchorNode:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection()).anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset},Pr&&Tr(Pr,r)||(Pr=r,0<(r=Qr(Lr,"onSelect")).length&&(t=new In("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Dr)))}Gt("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "),0),Gt("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "),1),Gt(Kt,2);for(var Mr="change selectionchange textInput compositionstart compositionend compositionupdate".split(" "),Fr=0;Fr<Mr.length;Fr++)$t.set(Mr[Fr],0);S("onMouseEnter",["mouseout","mouseover"]),S("onMouseLeave",["mouseout","mouseover"]),S("onPointerEnter",["pointerout","pointerover"]),S("onPointerLeave",["pointerout","pointerover"]),E("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),E("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),E("onBeforeInput",["compositionend","keypress","textInput","paste"]),E("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),E("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),E("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ur="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Vr=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ur));function jr(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,function(e,t,n,r,i,o,s,a,l){if(at.apply(this,arguments),nt){if(!nt)throw Error(v(198));var u=rt;nt=!1,rt=null,it||(it=!0,ot=u)}}(r,t,void 0,e),e.currentTarget=null}function zr(e,t){t=0!=(4&t);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var o=void 0;if(t)for(var s=r.length-1;0<=s;s--){var a=r[s],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==o&&i.isPropagationStopped())break e;jr(i,a,u),o=l}else for(s=0;s<r.length;s++){if(l=(a=r[s]).instance,u=a.currentTarget,a=a.listener,l!==o&&i.isPropagationStopped())break e;jr(i,a,u),o=l}}}if(it)throw e=ot,it=!1,ot=null,e}function Br(e,t){var n=vi(t),r=e+"__bubble";n.has(r)||(Kr(t,e,2,!1),n.add(r))}var qr="_reactListening"+Math.random().toString(36).slice(2);function Hr(e){e[qr]||(e[qr]=!0,w.forEach((function(t){Vr.has(t)||$r(t,!1,e,null),$r(t,!0,e,null)})))}function $r(e,t,n,r){var i=4<arguments.length&&void 0!==arguments[4]?arguments[4]:0,o=n;if("selectionchange"===e&&9!==n.nodeType&&(o=n.ownerDocument),null!==r&&!t&&Vr.has(e)){if("scroll"!==e)return;i|=2,o=r}var s=vi(o),a=e+"__"+(t?"capture":"bubble");s.has(a)||(t&&(i|=4),Kr(o,e,i,t),s.add(a))}function Kr(e,t,n,r){var i=$t.get(t);switch(void 0===i?2:i){case 0:i=un;break;case 1:i=cn;break;default:i=hn}n=i.bind(null,t,n,e),i=void 0,!Ze||"touchstart"!==t&&"touchmove"!==t&&"wheel"!==t||(i=!0),r?void 0!==i?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):void 0!==i?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Gr(e,t,n,r,i){var o=r;if(0==(1&t)&&0==(2&t)&&null!==r)e:for(;;){if(null===r)return;var s=r.tag;if(3===s||4===s){var a=r.stateNode.containerInfo;if(a===i||8===a.nodeType&&a.parentNode===i)break;if(4===s)for(s=r.return;null!==s;){var l=s.tag;if((3===l||4===l)&&((l=s.stateNode.containerInfo)===i||8===l.nodeType&&l.parentNode===i))return;s=s.return}for(;null!==a;){if(null===(s=pi(a)))return;if(5===(l=s.tag)||6===l){r=o=s;continue e}a=a.parentNode}}r=r.return}!function(e,t,n){if(Xe)return e(t,n);Xe=!0;try{We(e,t,n)}finally{Xe=!1,Ye()}}((function(){var r=o,i=Ue(n),s=[];e:{var a=Ht.get(e);if(void 0!==a){var l=In,u=e;switch(e){case"keypress":if(0===yn(n))break e;case"keydown":case"keyup":l=Bn;break;case"focusin":u="focus",l=Dn;break;case"focusout":u="blur",l=Dn;break;case"beforeblur":case"afterblur":l=Dn;break;case"click":if(2===n.button)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":l=Nn;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=An;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=Hn;break;case jt:case zt:case Bt:l=Ln;break;case qt:l=$n;break;case"scroll":l=Cn;break;case"wheel":l=Gn;break;case"copy":case"cut":case"paste":l=On;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=qn}var c=0!=(4&t),h=!c&&"scroll"===e,f=c?null!==a?a+"Capture":null:a;c=[];for(var d,p=r;null!==p;){var m=(d=p).stateNode;if(5===d.tag&&null!==m&&(d=m,null!==f&&(null!=(m=Je(p,f))&&c.push(Wr(p,m,d)))),h)break;p=p.return}0<c.length&&(a=new l(a,u,null,n,i),s.push({event:a,listeners:c}))}}if(0==(7&t)){if(l="mouseout"===e||"pointerout"===e,(!(a="mouseover"===e||"pointerover"===e)||0!=(16&t)||!(u=n.relatedTarget||n.fromElement)||!pi(u)&&!u[fi])&&(l||a)&&(a=i.window===i?i:(a=i.ownerDocument)?a.defaultView||a.parentWindow:window,l?(l=r,null!==(u=(u=n.relatedTarget||n.toElement)?pi(u):null)&&(u!==(h=lt(u))||5!==u.tag&&6!==u.tag)&&(u=null)):(l=null,u=r),l!==u)){if(c=Nn,m="onMouseLeave",f="onMouseEnter",p="mouse","pointerout"!==e&&"pointerover"!==e||(c=qn,m="onPointerLeave",f="onPointerEnter",p="pointer"),h=null==l?a:gi(l),d=null==u?a:gi(u),(a=new c(m,p+"leave",l,n,i)).target=h,a.relatedTarget=d,m=null,pi(i)===r&&((c=new c(f,p+"enter",u,n,i)).target=d,c.relatedTarget=h,m=c),h=m,l&&u)e:{for(f=u,p=0,d=c=l;d;d=Xr(d))p++;for(d=0,m=f;m;m=Xr(m))d++;for(;0<p-d;)c=Xr(c),p--;for(;0<d-p;)f=Xr(f),d--;for(;p--;){if(c===f||null!==f&&c===f.alternate)break e;c=Xr(c),f=Xr(f)}c=null}else c=null;null!==l&&Yr(s,a,l,c,!1),null!==u&&null!==h&&Yr(s,h,u,c,!0)}if("select"===(l=(a=r?gi(r):window).nodeName&&a.nodeName.toLowerCase())||"input"===l&&"file"===a.type)var g=hr;else if(or(a))if(fr)g=Er;else{g=wr;var y=vr}else(l=a.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===a.type||"radio"===a.type)&&(g=br);switch(g&&(g=g(e,r))?sr(s,g,n,i):(y&&y(e,a,r),"focusout"===e&&(y=a._wrapperState)&&y.controlled&&"number"===a.type&&ge(a,"number",a.value)),y=r?gi(r):window,e){case"focusin":(or(y)||"true"===y.contentEditable)&&(Dr=y,Lr=r,Pr=null);break;case"focusout":Pr=Lr=Dr=null;break;case"mousedown":Or=!0;break;case"contextmenu":case"mouseup":case"dragend":Or=!1,Rr(s,n,i);break;case"selectionchange":if(Ar)break;case"keydown":case"keyup":Rr(s,n,i)}var v;if(Qn)e:{switch(e){case"compositionstart":var w="onCompositionStart";break e;case"compositionend":w="onCompositionEnd";break e;case"compositionupdate":w="onCompositionUpdate";break e}w=void 0}else rr?tr(e,n)&&(w="onCompositionEnd"):"keydown"===e&&229===n.keyCode&&(w="onCompositionStart");w&&(Jn&&"ko"!==n.locale&&(rr||"onCompositionStart"!==w?"onCompositionEnd"===w&&rr&&(v=gn()):(pn="value"in(dn=i)?dn.value:dn.textContent,rr=!0)),0<(y=Qr(r,w)).length&&(w=new Rn(w,e,null,n,i),s.push({event:w,listeners:y}),v?w.data=v:null!==(v=nr(n))&&(w.data=v))),(v=Yn?function(e,t){switch(e){case"compositionend":return nr(t);case"keypress":return 32!==t.which?null:(er=!0,Zn);case"textInput":return(e=t.data)===Zn&&er?null:e;default:return null}}(e,n):function(e,t){if(rr)return"compositionend"===e||!Qn&&tr(e,t)?(e=gn(),mn=pn=dn=null,rr=!1,e):null;switch(e){default:return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Jn&&"ko"!==t.locale?null:t.data}}(e,n))&&(0<(r=Qr(r,"onBeforeInput")).length&&(i=new Rn("onBeforeInput","beforeinput",null,n,i),s.push({event:i,listeners:r}),i.data=v))}zr(s,t)}))}function Wr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qr(e,t){for(var n=t+"Capture",r=[];null!==e;){var i=e,o=i.stateNode;5===i.tag&&null!==o&&(i=o,null!=(o=Je(e,n))&&r.unshift(Wr(e,o,i)),null!=(o=Je(e,t))&&r.push(Wr(e,o,i))),e=e.return}return r}function Xr(e){if(null===e)return null;do{e=e.return}while(e&&5!==e.tag);return e||null}function Yr(e,t,n,r,i){for(var o=t._reactName,s=[];null!==n&&n!==r;){var a=n,l=a.alternate,u=a.stateNode;if(null!==l&&l===r)break;5===a.tag&&null!==u&&(a=u,i?null!=(l=Je(n,o))&&s.unshift(Wr(n,l,a)):i||null!=(l=Je(n,o))&&s.push(Wr(n,l,a))),n=n.return}0!==s.length&&e.push({event:t,listeners:s})}function Jr(){}var Zr=null,ei=null;function ti(e,t){switch(e){case"button":case"input":case"select":case"textarea":return!!t.autoFocus}return!1}function ni(e,t){return"textarea"===e||"option"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}var ri="function"==typeof setTimeout?setTimeout:void 0,ii="function"==typeof clearTimeout?clearTimeout:void 0;function oi(e){1===e.nodeType?e.textContent="":9===e.nodeType&&(null!=(e=e.body)&&(e.textContent=""))}function si(e){for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break}return e}function ai(e){e=e.previousSibling;for(var t=0;e;){if(8===e.nodeType){var n=e.data;if("$"===n||"$!"===n||"$?"===n){if(0===t)return e;t--}else"/$"===n&&t++}e=e.previousSibling}return null}var li=0;var ui=Math.random().toString(36).slice(2),ci="__reactFiber$"+ui,hi="__reactProps$"+ui,fi="__reactContainer$"+ui,di="__reactEvents$"+ui;function pi(e){var t=e[ci];if(t)return t;for(var n=e.parentNode;n;){if(t=n[fi]||n[ci]){if(n=t.alternate,null!==t.child||null!==n&&null!==n.child)for(e=ai(e);null!==e;){if(n=e[ci])return n;e=ai(e)}return t}n=(e=n).parentNode}return null}function mi(e){return!(e=e[ci]||e[fi])||5!==e.tag&&6!==e.tag&&13!==e.tag&&3!==e.tag?null:e}function gi(e){if(5===e.tag||6===e.tag)return e.stateNode;throw Error(v(33))}function yi(e){return e[hi]||null}function vi(e){var t=e[di];return void 0===t&&(t=e[di]=new Set),t}var wi=[],bi=-1;function Ei(e){return{current:e}}function Si(e){0>bi||(e.current=wi[bi],wi[bi]=null,bi--)}function ki(e,t){bi++,wi[bi]=e.current,e.current=t}var Ti={},Ii=Ei(Ti),xi=Ei(!1),Ci=Ti;function _i(e,t){var n=e.type.contextTypes;if(!n)return Ti;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i,o={};for(i in n)o[i]=t[i];return r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Ni(e){return null!=(e=e.childContextTypes)}function Ai(){Si(xi),Si(Ii)}function Di(e,t,n){if(Ii.current!==Ti)throw Error(v(168));ki(Ii,t),ki(xi,n)}function Li(e,t,n){var r=e.stateNode;if(e=t.childContextTypes,"function"!=typeof r.getChildContext)return n;for(var i in r=r.getChildContext())if(!(i in e))throw Error(v(108,oe(t)||"Unknown",i));return g({},n,r)}function Pi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ti,Ci=Ii.current,ki(Ii,e),ki(xi,xi.current),!0}function Oi(e,t,n){var r=e.stateNode;if(!r)throw Error(v(169));n?(e=Li(e,t,Ci),r.__reactInternalMemoizedMergedChildContext=e,Si(xi),Si(Ii),ki(Ii,e)):Si(xi),ki(xi,n)}var Ri=null,Mi=null,Fi=y.unstable_runWithPriority,Ui=y.unstable_scheduleCallback,Vi=y.unstable_cancelCallback,ji=y.unstable_shouldYield,zi=y.unstable_requestPaint,Bi=y.unstable_now,qi=y.unstable_getCurrentPriorityLevel,Hi=y.unstable_ImmediatePriority,$i=y.unstable_UserBlockingPriority,Ki=y.unstable_NormalPriority,Gi=y.unstable_LowPriority,Wi=y.unstable_IdlePriority,Qi={},Xi=void 0!==zi?zi:function(){},Yi=null,Ji=null,Zi=!1,eo=Bi(),to=1e4>eo?Bi:function(){return Bi()-eo};function no(){switch(qi()){case Hi:return 99;case $i:return 98;case Ki:return 97;case Gi:return 96;case Wi:return 95;default:throw Error(v(332))}}function ro(e){switch(e){case 99:return Hi;case 98:return $i;case 97:return Ki;case 96:return Gi;case 95:return Wi;default:throw Error(v(332))}}function io(e,t){return e=ro(e),Fi(e,t)}function oo(e,t,n){return e=ro(e),Ui(e,t,n)}function so(){if(null!==Ji){var e=Ji;Ji=null,Vi(e)}ao()}function ao(){if(!Zi&&null!==Yi){Zi=!0;var e=0;try{var t=Yi;io(99,(function(){for(;e<t.length;e++){var n=t[e];do{n=n(!0)}while(null!==n)}})),Yi=null}catch(t){throw null!==Yi&&(Yi=Yi.slice(e+1)),Ui(Hi,so),t}finally{Zi=!1}}}var lo=P.ReactCurrentBatchConfig;function uo(e,t){if(e&&e.defaultProps){for(var n in t=g({},t),e=e.defaultProps)void 0===t[n]&&(t[n]=e[n]);return t}return t}var co=Ei(null),ho=null,fo=null,po=null;function mo(){po=fo=ho=null}function go(e){var t=co.current;Si(co),e.type._context._currentValue=t}function yo(e,t){for(;null!==e;){var n=e.alternate;if((e.childLanes&t)===t){if(null===n||(n.childLanes&t)===t)break;n.childLanes|=t}else e.childLanes|=t,null!==n&&(n.childLanes|=t);e=e.return}}function vo(e,t){ho=e,po=fo=null,null!==(e=e.dependencies)&&null!==e.firstContext&&(0!=(e.lanes&t)&&(Qs=!0),e.firstContext=null)}function wo(e,t){if(po!==e&&!1!==t&&0!==t)if("number"==typeof t&&1073741823!==t||(po=e,t=1073741823),t={context:e,observedBits:t,next:null},null===fo){if(null===ho)throw Error(v(308));fo=t,ho.dependencies={lanes:0,firstContext:t,responders:null}}else fo=fo.next=t;return e._currentValue}var bo=!1;function Eo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null},effects:null}}function So(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ko(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function To(e,t){if(null!==(e=e.updateQueue)){var n=(e=e.shared).pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}}function Io(e,t){var n=e.updateQueue,r=e.alternate;if(null!==r&&n===(r=r.updateQueue)){var i=null,o=null;if(null!==(n=n.firstBaseUpdate)){do{var s={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};null===o?i=o=s:o=o.next=s,n=n.next}while(null!==n);null===o?i=o=t:o=o.next=t}else i=o=t;return n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:r.shared,effects:r.effects},void(e.updateQueue=n)}null===(e=n.lastBaseUpdate)?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function xo(e,t,n,r){var i=e.updateQueue;bo=!1;var o=i.firstBaseUpdate,s=i.lastBaseUpdate,a=i.shared.pending;if(null!==a){i.shared.pending=null;var l=a,u=l.next;l.next=null,null===s?o=u:s.next=u,s=l;var c=e.alternate;if(null!==c){var h=(c=c.updateQueue).lastBaseUpdate;h!==s&&(null===h?c.firstBaseUpdate=u:h.next=u,c.lastBaseUpdate=l)}}if(null!==o){for(h=i.baseState,s=0,c=u=l=null;;){a=o.lane;var f=o.eventTime;if((r&a)===a){null!==c&&(c=c.next={eventTime:f,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var d=e,p=o;switch(a=t,f=n,p.tag){case 1:if("function"==typeof(d=p.payload)){h=d.call(f,h,a);break e}h=d;break e;case 3:d.flags=-4097&d.flags|64;case 0:if(null==(a="function"==typeof(d=p.payload)?d.call(f,h,a):d))break e;h=g({},h,a);break e;case 2:bo=!0}}null!==o.callback&&(e.flags|=32,null===(a=i.effects)?i.effects=[o]:a.push(o))}else f={eventTime:f,lane:a,tag:o.tag,payload:o.payload,callback:o.callback,next:null},null===c?(u=c=f,l=h):c=c.next=f,s|=a;if(null===(o=o.next)){if(null===(a=i.shared.pending))break;o=a.next,a.next=null,i.lastBaseUpdate=a,i.shared.pending=null}}null===c&&(l=h),i.baseState=l,i.firstBaseUpdate=u,i.lastBaseUpdate=c,Za|=s,e.lanes=s,e.memoizedState=h}}function Co(e,t,n){if(e=t.effects,t.effects=null,null!==e)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(null!==i){if(r.callback=null,r=n,"function"!=typeof i)throw Error(v(191,i));i.call(r)}}}var _o=(new m.Component).refs;function No(e,t,n,r){n=null==(n=n(r,t=e.memoizedState))?t:g({},t,n),e.memoizedState=n,0===e.lanes&&(e.updateQueue.baseState=n)}var Ao={isMounted:function(e){return!!(e=e._reactInternals)&&lt(e)===e},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Tl(),i=Il(e),o=ko(r,i);o.payload=t,null!=n&&(o.callback=n),To(e,o),xl(e,i,r)},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Tl(),i=Il(e),o=ko(r,i);o.tag=1,o.payload=t,null!=n&&(o.callback=n),To(e,o),xl(e,i,r)},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Tl(),r=Il(e),i=ko(n,r);i.tag=2,null!=t&&(i.callback=t),To(e,i),xl(e,r,n)}};function Do(e,t,n,r,i,o,s){return"function"==typeof(e=e.stateNode).shouldComponentUpdate?e.shouldComponentUpdate(r,o,s):!t.prototype||!t.prototype.isPureReactComponent||(!Tr(n,r)||!Tr(i,o))}function Lo(e,t,n){var r=!1,i=Ti,o=t.contextType;return"object"==typeof o&&null!==o?o=wo(o):(i=Ni(t)?Ci:Ii.current,o=(r=null!=(r=t.contextTypes))?_i(e,i):Ti),t=new t(n,o),e.memoizedState=null!==t.state&&void 0!==t.state?t.state:null,t.updater=Ao,e.stateNode=t,t._reactInternals=e,r&&((e=e.stateNode).__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=o),t}function Po(e,t,n,r){e=t.state,"function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&Ao.enqueueReplaceState(t,t.state,null)}function Oo(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs=_o,Eo(e);var o=t.contextType;"object"==typeof o&&null!==o?i.context=wo(o):(o=Ni(t)?Ci:Ii.current,i.context=_i(e,o)),xo(e,n,i,r),i.state=e.memoizedState,"function"==typeof(o=t.getDerivedStateFromProps)&&(No(e,t,o,n),i.state=e.memoizedState),"function"==typeof t.getDerivedStateFromProps||"function"==typeof i.getSnapshotBeforeUpdate||"function"!=typeof i.UNSAFE_componentWillMount&&"function"!=typeof i.componentWillMount||(t=i.state,"function"==typeof i.componentWillMount&&i.componentWillMount(),"function"==typeof i.UNSAFE_componentWillMount&&i.UNSAFE_componentWillMount(),t!==i.state&&Ao.enqueueReplaceState(i,i.state,null),xo(e,n,i,r),i.state=e.memoizedState),"function"==typeof i.componentDidMount&&(e.flags|=4)}var Ro=Array.isArray;function Mo(e,t,n){if(null!==(e=n.ref)&&"function"!=typeof e&&"object"!=typeof e){if(n._owner){if(n=n._owner){if(1!==n.tag)throw Error(v(309));var r=n.stateNode}if(!r)throw Error(v(147,e));var i=""+e;return null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===i?t.ref:(t=function(e){var t=r.refs;t===_o&&(t=r.refs={}),null===e?delete t[i]:t[i]=e},t._stringRef=i,t)}if("string"!=typeof e)throw Error(v(284));if(!n._owner)throw Error(v(290,e))}return e}function Fo(e,t){if("textarea"!==e.type)throw Error(v(31,"[object Object]"===Object.prototype.toString.call(t)?"object with keys {"+Object.keys(t).join(", ")+"}":t))}function Uo(e){function t(t,n){if(e){var r=t.lastEffect;null!==r?(r.nextEffect=n,t.lastEffect=n):t.firstEffect=t.lastEffect=n,n.nextEffect=null,n.flags=8}}function n(n,r){if(!e)return null;for(;null!==r;)t(n,r),r=r.sibling;return null}function r(e,t){for(e=new Map;null!==t;)null!==t.key?e.set(t.key,t):e.set(t.index,t),t=t.sibling;return e}function i(e,t){return(e=iu(e,t)).index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?null!==(r=t.alternate)?(r=r.index)<n?(t.flags=2,n):r:(t.flags=2,n):n}function s(t){return e&&null===t.alternate&&(t.flags=2),t}function a(e,t,n,r){return null===t||6!==t.tag?((t=lu(n,e.mode,r)).return=e,t):((t=i(t,n)).return=e,t)}function l(e,t,n,r){return null!==t&&t.elementType===n.type?((r=i(t,n.props)).ref=Mo(e,t,n),r.return=e,r):((r=ou(n.type,n.key,n.props,null,e.mode,r)).ref=Mo(e,t,n),r.return=e,r)}function u(e,t,n,r){return null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?((t=uu(n,e.mode,r)).return=e,t):((t=i(t,n.children||[])).return=e,t)}function c(e,t,n,r,o){return null===t||7!==t.tag?((t=su(n,e.mode,r,o)).return=e,t):((t=i(t,n)).return=e,t)}function h(e,t,n){if("string"==typeof t||"number"==typeof t)return(t=lu(""+t,e.mode,n)).return=e,t;if("object"==typeof t&&null!==t){switch(t.$$typeof){case O:return(n=ou(t.type,t.key,t.props,null,e.mode,n)).ref=Mo(e,null,t),n.return=e,n;case R:return(t=uu(t,e.mode,n)).return=e,t}if(Ro(t)||ee(t))return(t=su(t,e.mode,n,null)).return=e,t;Fo(e,t)}return null}function f(e,t,n,r){var i=null!==t?t.key:null;if("string"==typeof n||"number"==typeof n)return null!==i?null:a(e,t,""+n,r);if("object"==typeof n&&null!==n){switch(n.$$typeof){case O:return n.key===i?n.type===M?c(e,t,n.props.children,r,i):l(e,t,n,r):null;case R:return n.key===i?u(e,t,n,r):null}if(Ro(n)||ee(n))return null!==i?null:c(e,t,n,r,null);Fo(e,n)}return null}function d(e,t,n,r,i){if("string"==typeof r||"number"==typeof r)return a(t,e=e.get(n)||null,""+r,i);if("object"==typeof r&&null!==r){switch(r.$$typeof){case O:return e=e.get(null===r.key?n:r.key)||null,r.type===M?c(t,e,r.props.children,i,r.key):l(t,e,r,i);case R:return u(t,e=e.get(null===r.key?n:r.key)||null,r,i)}if(Ro(r)||ee(r))return c(t,e=e.get(n)||null,r,i,null);Fo(t,r)}return null}function p(i,s,a,l){for(var u=null,c=null,p=s,m=s=0,g=null;null!==p&&m<a.length;m++){p.index>m?(g=p,p=null):g=p.sibling;var y=f(i,p,a[m],l);if(null===y){null===p&&(p=g);break}e&&p&&null===y.alternate&&t(i,p),s=o(y,s,m),null===c?u=y:c.sibling=y,c=y,p=g}if(m===a.length)return n(i,p),u;if(null===p){for(;m<a.length;m++)null!==(p=h(i,a[m],l))&&(s=o(p,s,m),null===c?u=p:c.sibling=p,c=p);return u}for(p=r(i,p);m<a.length;m++)null!==(g=d(p,i,m,a[m],l))&&(e&&null!==g.alternate&&p.delete(null===g.key?m:g.key),s=o(g,s,m),null===c?u=g:c.sibling=g,c=g);return e&&p.forEach((function(e){return t(i,e)})),u}function m(i,s,a,l){var u=ee(a);if("function"!=typeof u)throw Error(v(150));if(null==(a=u.call(a)))throw Error(v(151));for(var c=u=null,p=s,m=s=0,g=null,y=a.next();null!==p&&!y.done;m++,y=a.next()){p.index>m?(g=p,p=null):g=p.sibling;var w=f(i,p,y.value,l);if(null===w){null===p&&(p=g);break}e&&p&&null===w.alternate&&t(i,p),s=o(w,s,m),null===c?u=w:c.sibling=w,c=w,p=g}if(y.done)return n(i,p),u;if(null===p){for(;!y.done;m++,y=a.next())null!==(y=h(i,y.value,l))&&(s=o(y,s,m),null===c?u=y:c.sibling=y,c=y);return u}for(p=r(i,p);!y.done;m++,y=a.next())null!==(y=d(p,i,m,y.value,l))&&(e&&null!==y.alternate&&p.delete(null===y.key?m:y.key),s=o(y,s,m),null===c?u=y:c.sibling=y,c=y);return e&&p.forEach((function(e){return t(i,e)})),u}return function(e,r,o,a){var l="object"==typeof o&&null!==o&&o.type===M&&null===o.key;l&&(o=o.props.children);var u="object"==typeof o&&null!==o;if(u)switch(o.$$typeof){case O:e:{for(u=o.key,l=r;null!==l;){if(l.key===u){if(7===l.tag){if(o.type===M){n(e,l.sibling),(r=i(l,o.props.children)).return=e,e=r;break e}}else if(l.elementType===o.type){n(e,l.sibling),(r=i(l,o.props)).ref=Mo(e,l,o),r.return=e,e=r;break e}n(e,l);break}t(e,l),l=l.sibling}o.type===M?((r=su(o.props.children,e.mode,a,o.key)).return=e,e=r):((a=ou(o.type,o.key,o.props,null,e.mode,a)).ref=Mo(e,r,o),a.return=e,e=a)}return s(e);case R:e:{for(l=o.key;null!==r;){if(r.key===l){if(4===r.tag&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),(r=i(r,o.children||[])).return=e,e=r;break e}n(e,r);break}t(e,r),r=r.sibling}(r=uu(o,e.mode,a)).return=e,e=r}return s(e)}if("string"==typeof o||"number"==typeof o)return o=""+o,null!==r&&6===r.tag?(n(e,r.sibling),(r=i(r,o)).return=e,e=r):(n(e,r),(r=lu(o,e.mode,a)).return=e,e=r),s(e);if(Ro(o))return p(e,r,o,a);if(ee(o))return m(e,r,o,a);if(u&&Fo(e,o),void 0===o&&!l)switch(e.tag){case 1:case 22:case 0:case 11:case 15:throw Error(v(152,oe(e.type)||"Component"))}return n(e,r)}}var Vo=Uo(!0),jo=Uo(!1),zo={},Bo=Ei(zo),qo=Ei(zo),Ho=Ei(zo);function $o(e){if(e===zo)throw Error(v(174));return e}function Ko(e,t){switch(ki(Ho,t),ki(qo,e),ki(Bo,zo),e=t.nodeType){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:xe(null,"");break;default:t=xe(t=(e=8===e?t.parentNode:t).namespaceURI||null,e=e.tagName)}Si(Bo),ki(Bo,t)}function Go(){Si(Bo),Si(qo),Si(Ho)}function Wo(e){$o(Ho.current);var t=$o(Bo.current),n=xe(t,e.type);t!==n&&(ki(qo,e),ki(Bo,n))}function Qo(e){qo.current===e&&(Si(Bo),Si(qo))}var Xo=Ei(0);function Yo(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n&&(null===(n=n.dehydrated)||"$?"===n.data||"$!"===n.data))return t}else if(19===t.tag&&void 0!==t.memoizedProps.revealOrder){if(0!=(64&t.flags))return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Jo=null,Zo=null,es=!1;function ts(e,t){var n=nu(5,null,null,0);n.elementType="DELETED",n.type="DELETED",n.stateNode=t,n.return=e,n.flags=8,null!==e.lastEffect?(e.lastEffect.nextEffect=n,e.lastEffect=n):e.firstEffect=e.lastEffect=n}function ns(e,t){switch(e.tag){case 5:var n=e.type;return null!==(t=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t)&&(e.stateNode=t,!0);case 6:return null!==(t=""===e.pendingProps||3!==t.nodeType?null:t)&&(e.stateNode=t,!0);default:return!1}}function rs(e){if(es){var t=Zo;if(t){var n=t;if(!ns(e,t)){if(!(t=si(n.nextSibling))||!ns(e,t))return e.flags=-1025&e.flags|2,es=!1,void(Jo=e);ts(Jo,n)}Jo=e,Zo=si(t.firstChild)}else e.flags=-1025&e.flags|2,es=!1,Jo=e}}function is(e){for(e=e.return;null!==e&&5!==e.tag&&3!==e.tag&&13!==e.tag;)e=e.return;Jo=e}function os(e){if(e!==Jo)return!1;if(!es)return is(e),es=!0,!1;var t=e.type;if(5!==e.tag||"head"!==t&&"body"!==t&&!ni(t,e.memoizedProps))for(t=Zo;t;)ts(e,t),t=si(t.nextSibling);if(is(e),13===e.tag){if(!(e=null!==(e=e.memoizedState)?e.dehydrated:null))throw Error(v(317));e:{for(e=e.nextSibling,t=0;e;){if(8===e.nodeType){var n=e.data;if("/$"===n){if(0===t){Zo=si(e.nextSibling);break e}t--}else"$"!==n&&"$!"!==n&&"$?"!==n||t++}e=e.nextSibling}Zo=null}}else Zo=Jo?si(e.stateNode.nextSibling):null;return!0}function ss(){Zo=Jo=null,es=!1}var as=[];function ls(){for(var e=0;e<as.length;e++)as[e]._workInProgressVersionPrimary=null;as.length=0}var us=P.ReactCurrentDispatcher,cs=P.ReactCurrentBatchConfig,hs=0,fs=null,ds=null,ps=null,ms=!1,gs=!1;function ys(){throw Error(v(321))}function vs(e,t){if(null===t)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Sr(e[n],t[n]))return!1;return!0}function ws(e,t,n,r,i,o){if(hs=o,fs=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,us.current=null===e||null===e.memoizedState?$s:Ks,e=n(r,i),gs){o=0;do{if(gs=!1,!(25>o))throw Error(v(301));o+=1,ps=ds=null,t.updateQueue=null,us.current=Gs,e=n(r,i)}while(gs)}if(us.current=Hs,t=null!==ds&&null!==ds.next,hs=0,ps=ds=fs=null,ms=!1,t)throw Error(v(300));return e}function bs(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===ps?fs.memoizedState=ps=e:ps=ps.next=e,ps}function Es(){if(null===ds){var e=fs.alternate;e=null!==e?e.memoizedState:null}else e=ds.next;var t=null===ps?fs.memoizedState:ps.next;if(null!==t)ps=t,ds=e;else{if(null===e)throw Error(v(310));e={memoizedState:(ds=e).memoizedState,baseState:ds.baseState,baseQueue:ds.baseQueue,queue:ds.queue,next:null},null===ps?fs.memoizedState=ps=e:ps=ps.next=e}return ps}function Ss(e,t){return"function"==typeof t?t(e):t}function ks(e){var t=Es(),n=t.queue;if(null===n)throw Error(v(311));n.lastRenderedReducer=e;var r=ds,i=r.baseQueue,o=n.pending;if(null!==o){if(null!==i){var s=i.next;i.next=o.next,o.next=s}r.baseQueue=i=o,n.pending=null}if(null!==i){i=i.next,r=r.baseState;var a=s=o=null,l=i;do{var u=l.lane;if((hs&u)===u)null!==a&&(a=a.next={lane:0,action:l.action,eagerReducer:l.eagerReducer,eagerState:l.eagerState,next:null}),r=l.eagerReducer===e?l.eagerState:e(r,l.action);else{var c={lane:u,action:l.action,eagerReducer:l.eagerReducer,eagerState:l.eagerState,next:null};null===a?(s=a=c,o=r):a=a.next=c,fs.lanes|=u,Za|=u}l=l.next}while(null!==l&&l!==i);null===a?o=r:a.next=s,Sr(r,t.memoizedState)||(Qs=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=a,n.lastRenderedState=r}return[t.memoizedState,n.dispatch]}function Ts(e){var t=Es(),n=t.queue;if(null===n)throw Error(v(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,o=t.memoizedState;if(null!==i){n.pending=null;var s=i=i.next;do{o=e(o,s.action),s=s.next}while(s!==i);Sr(o,t.memoizedState)||(Qs=!0),t.memoizedState=o,null===t.baseQueue&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function Is(e,t,n){var r=t._getVersion;r=r(t._source);var i=t._workInProgressVersionPrimary;if(null!==i?e=i===r:(e=e.mutableReadLanes,(e=(hs&e)===e)&&(t._workInProgressVersionPrimary=r,as.push(t))),e)return n(t._source);throw as.push(t),Error(v(350))}function xs(e,t,n,r){var i=$a;if(null===i)throw Error(v(349));var o=t._getVersion,s=o(t._source),a=us.current,l=a.useState((function(){return Is(i,t,n)})),u=l[1],c=l[0];l=ps;var h=e.memoizedState,f=h.refs,d=f.getSnapshot,p=h.source;h=h.subscribe;var m=fs;return e.memoizedState={refs:f,source:t,subscribe:r},a.useEffect((function(){f.getSnapshot=n,f.setSnapshot=u;var e=o(t._source);if(!Sr(s,e)){e=n(t._source),Sr(c,e)||(u(e),e=Il(m),i.mutableReadLanes|=e&i.pendingLanes),e=i.mutableReadLanes,i.entangledLanes|=e;for(var r=i.entanglements,a=e;0<a;){var l=31-nn(a),h=1<<l;r[l]|=e,a&=~h}}}),[n,t,r]),a.useEffect((function(){return r(t._source,(function(){var e=f.getSnapshot,n=f.setSnapshot;try{n(e(t._source));var r=Il(m);i.mutableReadLanes|=r&i.pendingLanes}catch(e){n((function(){throw e}))}}))}),[t,r]),Sr(d,n)&&Sr(p,t)&&Sr(h,r)||((e={pending:null,dispatch:null,lastRenderedReducer:Ss,lastRenderedState:c}).dispatch=u=qs.bind(null,fs,e),l.queue=e,l.baseQueue=null,c=Is(i,t,n),l.memoizedState=l.baseState=c),c}function Cs(e,t,n){return xs(Es(),e,t,n)}function _s(e){var t=bs();return"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e,e=(e=t.queue={pending:null,dispatch:null,lastRenderedReducer:Ss,lastRenderedState:e}).dispatch=qs.bind(null,fs,e),[t.memoizedState,e]}function Ns(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},null===(t=fs.updateQueue)?(t={lastEffect:null},fs.updateQueue=t,t.lastEffect=e.next=e):null===(n=t.lastEffect)?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function As(e){return e={current:e},bs().memoizedState=e}function Ds(){return Es().memoizedState}function Ls(e,t,n,r){var i=bs();fs.flags|=e,i.memoizedState=Ns(1|t,n,void 0,void 0===r?null:r)}function Ps(e,t,n,r){var i=Es();r=void 0===r?null:r;var o=void 0;if(null!==ds){var s=ds.memoizedState;if(o=s.destroy,null!==r&&vs(r,s.deps))return void Ns(t,n,o,r)}fs.flags|=e,i.memoizedState=Ns(1|t,n,o,r)}function Os(e,t){return Ls(516,4,e,t)}function Rs(e,t){return Ps(516,4,e,t)}function Ms(e,t){return Ps(4,2,e,t)}function Fs(e,t){return"function"==typeof t?(e=e(),t(e),function(){t(null)}):null!=t?(e=e(),t.current=e,function(){t.current=null}):void 0}function Us(e,t,n){return n=null!=n?n.concat([e]):null,Ps(4,2,Fs.bind(null,t,e),n)}function Vs(){}function js(e,t){var n=Es();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&vs(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function zs(e,t){var n=Es();t=void 0===t?null:t;var r=n.memoizedState;return null!==r&&null!==t&&vs(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Bs(e,t){var n=no();io(98>n?98:n,(function(){e(!0)})),io(97<n?97:n,(function(){var n=cs.transition;cs.transition=1;try{e(!1),t()}finally{cs.transition=n}}))}function qs(e,t,n){var r=Tl(),i=Il(e),o={lane:i,action:n,eagerReducer:null,eagerState:null,next:null},s=t.pending;if(null===s?o.next=o:(o.next=s.next,s.next=o),t.pending=o,s=e.alternate,e===fs||null!==s&&s===fs)gs=ms=!0;else{if(0===e.lanes&&(null===s||0===s.lanes)&&null!==(s=t.lastRenderedReducer))try{var a=t.lastRenderedState,l=s(a,n);if(o.eagerReducer=s,o.eagerState=l,Sr(l,a))return}catch(e){}xl(e,i,r)}}var Hs={readContext:wo,useCallback:ys,useContext:ys,useEffect:ys,useImperativeHandle:ys,useLayoutEffect:ys,useMemo:ys,useReducer:ys,useRef:ys,useState:ys,useDebugValue:ys,useDeferredValue:ys,useTransition:ys,useMutableSource:ys,useOpaqueIdentifier:ys,unstable_isNewReconciler:!1},$s={readContext:wo,useCallback:function(e,t){return bs().memoizedState=[e,void 0===t?null:t],e},useContext:wo,useEffect:Os,useImperativeHandle:function(e,t,n){return n=null!=n?n.concat([e]):null,Ls(4,2,Fs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ls(4,2,e,t)},useMemo:function(e,t){var n=bs();return t=void 0===t?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=bs();return t=void 0!==n?n(t):t,r.memoizedState=r.baseState=t,e=(e=r.queue={pending:null,dispatch:null,lastRenderedReducer:e,lastRenderedState:t}).dispatch=qs.bind(null,fs,e),[r.memoizedState,e]},useRef:As,useState:_s,useDebugValue:Vs,useDeferredValue:function(e){var t=_s(e),n=t[0],r=t[1];return Os((function(){var t=cs.transition;cs.transition=1;try{r(e)}finally{cs.transition=t}}),[e]),n},useTransition:function(){var e=_s(!1),t=e[0];return As(e=Bs.bind(null,e[1])),[e,t]},useMutableSource:function(e,t,n){var r=bs();return r.memoizedState={refs:{getSnapshot:t,setSnapshot:null},source:e,subscribe:n},xs(r,e,t,n)},useOpaqueIdentifier:function(){if(es){var e=!1,t=function(e){return{$$typeof:G,toString:e,valueOf:e}}((function(){throw e||(e=!0,n("r:"+(li++).toString(36))),Error(v(355))})),n=_s(t)[1];return 0==(2&fs.mode)&&(fs.flags|=516,Ns(5,(function(){n("r:"+(li++).toString(36))}),void 0,null)),t}return _s(t="r:"+(li++).toString(36)),t},unstable_isNewReconciler:!1},Ks={readContext:wo,useCallback:js,useContext:wo,useEffect:Rs,useImperativeHandle:Us,useLayoutEffect:Ms,useMemo:zs,useReducer:ks,useRef:Ds,useState:function(){return ks(Ss)},useDebugValue:Vs,useDeferredValue:function(e){var t=ks(Ss),n=t[0],r=t[1];return Rs((function(){var t=cs.transition;cs.transition=1;try{r(e)}finally{cs.transition=t}}),[e]),n},useTransition:function(){var e=ks(Ss)[0];return[Ds().current,e]},useMutableSource:Cs,useOpaqueIdentifier:function(){return ks(Ss)[0]},unstable_isNewReconciler:!1},Gs={readContext:wo,useCallback:js,useContext:wo,useEffect:Rs,useImperativeHandle:Us,useLayoutEffect:Ms,useMemo:zs,useReducer:Ts,useRef:Ds,useState:function(){return Ts(Ss)},useDebugValue:Vs,useDeferredValue:function(e){var t=Ts(Ss),n=t[0],r=t[1];return Rs((function(){var t=cs.transition;cs.transition=1;try{r(e)}finally{cs.transition=t}}),[e]),n},useTransition:function(){var e=Ts(Ss)[0];return[Ds().current,e]},useMutableSource:Cs,useOpaqueIdentifier:function(){return Ts(Ss)[0]},unstable_isNewReconciler:!1},Ws=P.ReactCurrentOwner,Qs=!1;function Xs(e,t,n,r){t.child=null===e?jo(t,null,n,r):Vo(t,e.child,n,r)}function Ys(e,t,n,r,i){n=n.render;var o=t.ref;return vo(t,i),r=ws(e,t,n,r,o,i),null===e||Qs?(t.flags|=1,Xs(e,t,r,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~i,ya(e,t,i))}function Js(e,t,n,r,i,o){if(null===e){var s=n.type;return"function"!=typeof s||ru(s)||void 0!==s.defaultProps||null!==n.compare||void 0!==n.defaultProps?((e=ou(n.type,null,r,t,t.mode,o)).ref=t.ref,e.return=t,t.child=e):(t.tag=15,t.type=s,Zs(e,t,s,r,i,o))}return s=e.child,0==(i&o)&&(i=s.memoizedProps,(n=null!==(n=n.compare)?n:Tr)(i,r)&&e.ref===t.ref)?ya(e,t,o):(t.flags|=1,(e=iu(s,r)).ref=t.ref,e.return=t,t.child=e)}function Zs(e,t,n,r,i,o){if(null!==e&&Tr(e.memoizedProps,r)&&e.ref===t.ref){if(Qs=!1,0==(o&i))return t.lanes=e.lanes,ya(e,t,o);0!=(16384&e.flags)&&(Qs=!0)}return na(e,t,n,r,o)}function ea(e,t,n){var r=t.pendingProps,i=r.children,o=null!==e?e.memoizedState:null;if("hidden"===r.mode||"unstable-defer-without-hiding"===r.mode)if(0==(4&t.mode))t.memoizedState={baseLanes:0},Ol(t,n);else{if(0==(1073741824&n))return e=null!==o?o.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e},Ol(t,e),null;t.memoizedState={baseLanes:0},Ol(t,null!==o?o.baseLanes:n)}else null!==o?(r=o.baseLanes|n,t.memoizedState=null):r=n,Ol(t,r);return Xs(e,t,i,n),t.child}function ta(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(t.flags|=128)}function na(e,t,n,r,i){var o=Ni(n)?Ci:Ii.current;return o=_i(t,o),vo(t,i),n=ws(e,t,n,r,o,i),null===e||Qs?(t.flags|=1,Xs(e,t,n,i),t.child):(t.updateQueue=e.updateQueue,t.flags&=-517,e.lanes&=~i,ya(e,t,i))}function ra(e,t,n,r,i){if(Ni(n)){var o=!0;Pi(t)}else o=!1;if(vo(t,i),null===t.stateNode)null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),Lo(t,n,r),Oo(t,n,r,i),r=!0;else if(null===e){var s=t.stateNode,a=t.memoizedProps;s.props=a;var l=s.context,u=n.contextType;"object"==typeof u&&null!==u?u=wo(u):u=_i(t,u=Ni(n)?Ci:Ii.current);var c=n.getDerivedStateFromProps,h="function"==typeof c||"function"==typeof s.getSnapshotBeforeUpdate;h||"function"!=typeof s.UNSAFE_componentWillReceiveProps&&"function"!=typeof s.componentWillReceiveProps||(a!==r||l!==u)&&Po(t,s,r,u),bo=!1;var f=t.memoizedState;s.state=f,xo(t,r,s,i),l=t.memoizedState,a!==r||f!==l||xi.current||bo?("function"==typeof c&&(No(t,n,c,r),l=t.memoizedState),(a=bo||Do(t,n,a,r,f,l,u))?(h||"function"!=typeof s.UNSAFE_componentWillMount&&"function"!=typeof s.componentWillMount||("function"==typeof s.componentWillMount&&s.componentWillMount(),"function"==typeof s.UNSAFE_componentWillMount&&s.UNSAFE_componentWillMount()),"function"==typeof s.componentDidMount&&(t.flags|=4)):("function"==typeof s.componentDidMount&&(t.flags|=4),t.memoizedProps=r,t.memoizedState=l),s.props=r,s.state=l,s.context=u,r=a):("function"==typeof s.componentDidMount&&(t.flags|=4),r=!1)}else{s=t.stateNode,So(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:uo(t.type,a),s.props=u,h=t.pendingProps,f=s.context,"object"==typeof(l=n.contextType)&&null!==l?l=wo(l):l=_i(t,l=Ni(n)?Ci:Ii.current);var d=n.getDerivedStateFromProps;(c="function"==typeof d||"function"==typeof s.getSnapshotBeforeUpdate)||"function"!=typeof s.UNSAFE_componentWillReceiveProps&&"function"!=typeof s.componentWillReceiveProps||(a!==h||f!==l)&&Po(t,s,r,l),bo=!1,f=t.memoizedState,s.state=f,xo(t,r,s,i);var p=t.memoizedState;a!==h||f!==p||xi.current||bo?("function"==typeof d&&(No(t,n,d,r),p=t.memoizedState),(u=bo||Do(t,n,u,r,f,p,l))?(c||"function"!=typeof s.UNSAFE_componentWillUpdate&&"function"!=typeof s.componentWillUpdate||("function"==typeof s.componentWillUpdate&&s.componentWillUpdate(r,p,l),"function"==typeof s.UNSAFE_componentWillUpdate&&s.UNSAFE_componentWillUpdate(r,p,l)),"function"==typeof s.componentDidUpdate&&(t.flags|=4),"function"==typeof s.getSnapshotBeforeUpdate&&(t.flags|=256)):("function"!=typeof s.componentDidUpdate||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!=typeof s.getSnapshotBeforeUpdate||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=256),t.memoizedProps=r,t.memoizedState=p),s.props=r,s.state=p,s.context=l,r=u):("function"!=typeof s.componentDidUpdate||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),"function"!=typeof s.getSnapshotBeforeUpdate||a===e.memoizedProps&&f===e.memoizedState||(t.flags|=256),r=!1)}return ia(e,t,n,r,o,i)}function ia(e,t,n,r,i,o){ta(e,t);var s=0!=(64&t.flags);if(!r&&!s)return i&&Oi(t,n,!1),ya(e,t,o);r=t.stateNode,Ws.current=t;var a=s&&"function"!=typeof n.getDerivedStateFromError?null:r.render();return t.flags|=1,null!==e&&s?(t.child=Vo(t,e.child,null,o),t.child=Vo(t,null,a,o)):Xs(e,t,a,o),t.memoizedState=r.state,i&&Oi(t,n,!0),t.child}function oa(e){var t=e.stateNode;t.pendingContext?Di(0,t.pendingContext,t.pendingContext!==t.context):t.context&&Di(0,t.context,!1),Ko(e,t.containerInfo)}var sa,aa,la,ua={dehydrated:null,retryLane:0};function ca(e,t,n){var r,i=t.pendingProps,o=Xo.current,s=!1;return(r=0!=(64&t.flags))||(r=(null===e||null!==e.memoizedState)&&0!=(2&o)),r?(s=!0,t.flags&=-65):null!==e&&null===e.memoizedState||void 0===i.fallback||!0===i.unstable_avoidThisFallback||(o|=1),ki(Xo,1&o),null===e?(void 0!==i.fallback&&rs(t),e=i.children,o=i.fallback,s?(e=ha(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=ua,e):"number"==typeof i.unstable_expectedLoadTime?(e=ha(t,e,o,n),t.child.memoizedState={baseLanes:n},t.memoizedState=ua,t.lanes=33554432,e):((n=au({mode:"visible",children:e},t.mode,n,null)).return=t,t.child=n)):(e.memoizedState,s?(i=da(e,t,i.children,i.fallback,n),s=t.child,o=e.child.memoizedState,s.memoizedState=null===o?{baseLanes:n}:{baseLanes:o.baseLanes|n},s.childLanes=e.childLanes&~n,t.memoizedState=ua,i):(n=fa(e,t,i.children,n),t.memoizedState=null,n))}function ha(e,t,n,r){var i=e.mode,o=e.child;return t={mode:"hidden",children:t},0==(2&i)&&null!==o?(o.childLanes=0,o.pendingProps=t):o=au(t,i,0,null),n=su(n,i,r,null),o.return=e,n.return=e,o.sibling=n,e.child=o,n}function fa(e,t,n,r){var i=e.child;return e=i.sibling,n=iu(i,{mode:"visible",children:n}),0==(2&t.mode)&&(n.lanes=r),n.return=t,n.sibling=null,null!==e&&(e.nextEffect=null,e.flags=8,t.firstEffect=t.lastEffect=e),t.child=n}function da(e,t,n,r,i){var o=t.mode,s=e.child;e=s.sibling;var a={mode:"hidden",children:n};return 0==(2&o)&&t.child!==s?((n=t.child).childLanes=0,n.pendingProps=a,null!==(s=n.lastEffect)?(t.firstEffect=n.firstEffect,t.lastEffect=s,s.nextEffect=null):t.firstEffect=t.lastEffect=null):n=iu(s,a),null!==e?r=iu(e,r):(r=su(r,o,i,null)).flags|=2,r.return=t,n.return=t,n.sibling=r,t.child=n,r}function pa(e,t){e.lanes|=t;var n=e.alternate;null!==n&&(n.lanes|=t),yo(e.return,t)}function ma(e,t,n,r,i,o){var s=e.memoizedState;null===s?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,lastEffect:o}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i,s.lastEffect=o)}function ga(e,t,n){var r=t.pendingProps,i=r.revealOrder,o=r.tail;if(Xs(e,t,r.children,n),0!=(2&(r=Xo.current)))r=1&r|2,t.flags|=64;else{if(null!==e&&0!=(64&e.flags))e:for(e=t.child;null!==e;){if(13===e.tag)null!==e.memoizedState&&pa(e,n);else if(19===e.tag)pa(e,n);else if(null!==e.child){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;null===e.sibling;){if(null===e.return||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ki(Xo,r),0==(2&t.mode))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;null!==n;)null!==(e=n.alternate)&&null===Yo(e)&&(i=n),n=n.sibling;null===(n=i)?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),ma(t,!1,i,n,o,t.lastEffect);break;case"backwards":for(n=null,i=t.child,t.child=null;null!==i;){if(null!==(e=i.alternate)&&null===Yo(e)){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}ma(t,!0,n,null,o,t.lastEffect);break;case"together":ma(t,!1,null,null,void 0,t.lastEffect);break;default:t.memoizedState=null}return t.child}function ya(e,t,n){if(null!==e&&(t.dependencies=e.dependencies),Za|=t.lanes,0!=(n&t.childLanes)){if(null!==e&&t.child!==e.child)throw Error(v(153));if(null!==t.child){for(n=iu(e=t.child,e.pendingProps),t.child=n,n.return=t;null!==e.sibling;)e=e.sibling,(n=n.sibling=iu(e,e.pendingProps)).return=t;n.sibling=null}return t.child}return null}function va(e,t){if(!es)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;null!==t;)null!==t.alternate&&(n=t),t=t.sibling;null===n?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;null===r?t||null===e.tail?e.tail=null:e.tail.sibling=null:r.sibling=null}}function wa(e,t,n){var r=t.pendingProps;switch(t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return null;case 1:case 17:return Ni(t.type)&&Ai(),null;case 3:return Go(),Si(xi),Si(Ii),ls(),(r=t.stateNode).pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),null!==e&&null!==e.child||(os(t)?t.flags|=4:r.hydrate||(t.flags|=256)),null;case 5:Qo(t);var i=$o(Ho.current);if(n=t.type,null!==e&&null!=t.stateNode)aa(e,t,n,r),e.ref!==t.ref&&(t.flags|=128);else{if(!r){if(null===t.stateNode)throw Error(v(166));return null}if(e=$o(Bo.current),os(t)){r=t.stateNode,n=t.type;var o=t.memoizedProps;switch(r[ci]=t,r[hi]=o,n){case"dialog":Br("cancel",r),Br("close",r);break;case"iframe":case"object":case"embed":Br("load",r);break;case"video":case"audio":for(e=0;e<Ur.length;e++)Br(Ur[e],r);break;case"source":Br("error",r);break;case"img":case"image":case"link":Br("error",r),Br("load",r);break;case"details":Br("toggle",r);break;case"input":fe(r,o),Br("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!o.multiple},Br("invalid",r);break;case"textarea":be(r,o),Br("invalid",r)}for(var s in Me(n,o),e=null,o)o.hasOwnProperty(s)&&(i=o[s],"children"===s?"string"==typeof i?r.textContent!==i&&(e=["children",i]):"number"==typeof i&&r.textContent!==""+i&&(e=["children",""+i]):b.hasOwnProperty(s)&&null!=i&&"onScroll"===s&&Br("scroll",r));switch(n){case"input":le(r),me(r,o,!0);break;case"textarea":le(r),Se(r);break;case"select":case"option":break;default:"function"==typeof o.onClick&&(r.onclick=Jr)}r=e,t.updateQueue=r,null!==r&&(t.flags|=4)}else{switch(s=9===i.nodeType?i:i.ownerDocument,e===ke&&(e=Ie(n)),e===ke?"script"===n?((e=s.createElement("div")).innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):"string"==typeof r.is?e=s.createElement(n,{is:r.is}):(e=s.createElement(n),"select"===n&&(s=e,r.multiple?s.multiple=!0:r.size&&(s.size=r.size))):e=s.createElementNS(e,n),e[ci]=t,e[hi]=r,sa(e,t),t.stateNode=e,s=Fe(n,r),n){case"dialog":Br("cancel",e),Br("close",e),i=r;break;case"iframe":case"object":case"embed":Br("load",e),i=r;break;case"video":case"audio":for(i=0;i<Ur.length;i++)Br(Ur[i],e);i=r;break;case"source":Br("error",e),i=r;break;case"img":case"image":case"link":Br("error",e),Br("load",e),i=r;break;case"details":Br("toggle",e),i=r;break;case"input":fe(e,r),i=he(e,r),Br("invalid",e);break;case"option":i=ye(e,r);break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=g({},r,{value:void 0}),Br("invalid",e);break;case"textarea":be(e,r),i=we(e,r),Br("invalid",e);break;default:i=r}Me(n,i);var a=i;for(o in a)if(a.hasOwnProperty(o)){var l=a[o];"style"===o?Oe(e,l):"dangerouslySetInnerHTML"===o?null!=(l=l?l.__html:void 0)&&Ne(e,l):"children"===o?"string"==typeof l?("textarea"!==n||""!==l)&&Ae(e,l):"number"==typeof l&&Ae(e,""+l):"suppressContentEditableWarning"!==o&&"suppressHydrationWarning"!==o&&"autoFocus"!==o&&(b.hasOwnProperty(o)?null!=l&&"onScroll"===o&&Br("scroll",e):null!=l&&L(e,o,l,s))}switch(n){case"input":le(e),me(e,r,!1);break;case"textarea":le(e),Se(e);break;case"option":null!=r.value&&e.setAttribute("value",""+se(r.value));break;case"select":e.multiple=!!r.multiple,null!=(o=r.value)?ve(e,!!r.multiple,o,!1):null!=r.defaultValue&&ve(e,!!r.multiple,r.defaultValue,!0);break;default:"function"==typeof i.onClick&&(e.onclick=Jr)}ti(n,r)&&(t.flags|=4)}null!==t.ref&&(t.flags|=128)}return null;case 6:if(e&&null!=t.stateNode)la(0,t,e.memoizedProps,r);else{if("string"!=typeof r&&null===t.stateNode)throw Error(v(166));n=$o(Ho.current),$o(Bo.current),os(t)?(r=t.stateNode,n=t.memoizedProps,r[ci]=t,r.nodeValue!==n&&(t.flags|=4)):((r=(9===n.nodeType?n:n.ownerDocument).createTextNode(r))[ci]=t,t.stateNode=r)}return null;case 13:return Si(Xo),r=t.memoizedState,0!=(64&t.flags)?(t.lanes=n,t):(r=null!==r,n=!1,null===e?void 0!==t.memoizedProps.fallback&&os(t):n=null!==e.memoizedState,r&&!n&&0!=(2&t.mode)&&(null===e&&!0!==t.memoizedProps.unstable_avoidThisFallback||0!=(1&Xo.current)?0===Xa&&(Xa=3):(0!==Xa&&3!==Xa||(Xa=4),null===$a||0==(134217727&Za)&&0==(134217727&el)||Al($a,Ga))),(r||n)&&(t.flags|=4),null);case 4:return Go(),null===e&&Hr(t.stateNode.containerInfo),null;case 10:return go(t),null;case 19:if(Si(Xo),null===(r=t.memoizedState))return null;if(o=0!=(64&t.flags),null===(s=r.rendering))if(o)va(r,!1);else{if(0!==Xa||null!==e&&0!=(64&e.flags))for(e=t.child;null!==e;){if(null!==(s=Yo(e))){for(t.flags|=64,va(r,!1),null!==(o=s.updateQueue)&&(t.updateQueue=o,t.flags|=4),null===r.lastEffect&&(t.firstEffect=null),t.lastEffect=r.lastEffect,r=n,n=t.child;null!==n;)e=r,(o=n).flags&=2,o.nextEffect=null,o.firstEffect=null,o.lastEffect=null,null===(s=o.alternate)?(o.childLanes=0,o.lanes=e,o.child=null,o.memoizedProps=null,o.memoizedState=null,o.updateQueue=null,o.dependencies=null,o.stateNode=null):(o.childLanes=s.childLanes,o.lanes=s.lanes,o.child=s.child,o.memoizedProps=s.memoizedProps,o.memoizedState=s.memoizedState,o.updateQueue=s.updateQueue,o.type=s.type,e=s.dependencies,o.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ki(Xo,1&Xo.current|2),t.child}e=e.sibling}null!==r.tail&&to()>il&&(t.flags|=64,o=!0,va(r,!1),t.lanes=33554432)}else{if(!o)if(null!==(e=Yo(s))){if(t.flags|=64,o=!0,null!==(n=e.updateQueue)&&(t.updateQueue=n,t.flags|=4),va(r,!0),null===r.tail&&"hidden"===r.tailMode&&!s.alternate&&!es)return null!==(t=t.lastEffect=r.lastEffect)&&(t.nextEffect=null),null}else 2*to()-r.renderingStartTime>il&&1073741824!==n&&(t.flags|=64,o=!0,va(r,!1),t.lanes=33554432);r.isBackwards?(s.sibling=t.child,t.child=s):(null!==(n=r.last)?n.sibling=s:t.child=s,r.last=s)}return null!==r.tail?(n=r.tail,r.rendering=n,r.tail=n.sibling,r.lastEffect=t.lastEffect,r.renderingStartTime=to(),n.sibling=null,t=Xo.current,ki(Xo,o?1&t|2:1&t),n):null;case 23:case 24:return Rl(),null!==e&&null!==e.memoizedState!=(null!==t.memoizedState)&&"unstable-defer-without-hiding"!==r.mode&&(t.flags|=4),null}throw Error(v(156,t.tag))}function ba(e){switch(e.tag){case 1:Ni(e.type)&&Ai();var t=e.flags;return 4096&t?(e.flags=-4097&t|64,e):null;case 3:if(Go(),Si(xi),Si(Ii),ls(),0!=(64&(t=e.flags)))throw Error(v(285));return e.flags=-4097&t|64,e;case 5:return Qo(e),null;case 13:return Si(Xo),4096&(t=e.flags)?(e.flags=-4097&t|64,e):null;case 19:return Si(Xo),null;case 4:return Go(),null;case 10:return go(e),null;case 23:case 24:return Rl(),null;default:return null}}function Ea(e,t){try{var n="",r=t;do{n+=ie(r),r=r.return}while(r);var i=n}catch(e){i="\nError generating stack: "+e.message+"\n"+e.stack}return{value:e,source:t,stack:i}}function Sa(e,t){try{console.error(t.value)}catch(e){setTimeout((function(){throw e}))}}sa=function(e,t){for(var n=t.child;null!==n;){if(5===n.tag||6===n.tag)e.appendChild(n.stateNode);else if(4!==n.tag&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===t)break;for(;null===n.sibling;){if(null===n.return||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},aa=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,$o(Bo.current);var o,s=null;switch(n){case"input":i=he(e,i),r=he(e,r),s=[];break;case"option":i=ye(e,i),r=ye(e,r),s=[];break;case"select":i=g({},i,{value:void 0}),r=g({},r,{value:void 0}),s=[];break;case"textarea":i=we(e,i),r=we(e,r),s=[];break;default:"function"!=typeof i.onClick&&"function"==typeof r.onClick&&(e.onclick=Jr)}for(u in Me(n,r),n=null,i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&null!=i[u])if("style"===u){var a=i[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else"dangerouslySetInnerHTML"!==u&&"children"!==u&&"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&"autoFocus"!==u&&(b.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var l=r[u];if(a=null!=i?i[u]:void 0,r.hasOwnProperty(u)&&l!==a&&(null!=l||null!=a))if("style"===u)if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else"dangerouslySetInnerHTML"===u?(l=l?l.__html:void 0,a=a?a.__html:void 0,null!=l&&a!==l&&(s=s||[]).push(u,l)):"children"===u?"string"!=typeof l&&"number"!=typeof l||(s=s||[]).push(u,""+l):"suppressContentEditableWarning"!==u&&"suppressHydrationWarning"!==u&&(b.hasOwnProperty(u)?(null!=l&&"onScroll"===u&&Br("scroll",e),s||a===l||(s=[])):"object"==typeof l&&null!==l&&l.$$typeof===G?l.toString():(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}},la=function(e,t,n,r){n!==r&&(t.flags|=4)};var ka="function"==typeof WeakMap?WeakMap:Map;function Ta(e,t,n){(n=ko(-1,n)).tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ll||(ll=!0,ul=r),Sa(0,t)},n}function Ia(e,t,n){(n=ko(-1,n)).tag=3;var r=e.type.getDerivedStateFromError;if("function"==typeof r){var i=t.value;n.payload=function(){return Sa(0,t),r(i)}}var o=e.stateNode;return null!==o&&"function"==typeof o.componentDidCatch&&(n.callback=function(){"function"!=typeof r&&(null===cl?cl=new Set([this]):cl.add(this),Sa(0,t));var e=t.stack;this.componentDidCatch(t.value,{componentStack:null!==e?e:""})}),n}var xa="function"==typeof WeakSet?WeakSet:Set;function Ca(e){var t=e.ref;if(null!==t)if("function"==typeof t)try{t(null)}catch(t){Jl(e,t)}else t.current=null}function _a(e,t){switch(t.tag){case 0:case 11:case 15:case 22:case 5:case 6:case 4:case 17:return;case 1:if(256&t.flags&&null!==e){var n=e.memoizedProps,r=e.memoizedState;t=(e=t.stateNode).getSnapshotBeforeUpdate(t.elementType===t.type?n:uo(t.type,n),r),e.__reactInternalSnapshotBeforeUpdate=t}return;case 3:return void(256&t.flags&&oi(t.stateNode.containerInfo))}throw Error(v(163))}function Na(e,t,n){switch(n.tag){case 0:case 11:case 15:case 22:if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{if(3==(3&e.tag)){var r=e.create;e.destroy=r()}e=e.next}while(e!==t)}if(null!==(t=null!==(t=n.updateQueue)?t.lastEffect:null)){e=t=t.next;do{var i=e;r=i.next,0!=(4&(i=i.tag))&&0!=(1&i)&&(Ql(n,e),Wl(n,e)),e=r}while(e!==t)}return;case 1:return e=n.stateNode,4&n.flags&&(null===t?e.componentDidMount():(r=n.elementType===n.type?t.memoizedProps:uo(n.type,t.memoizedProps),e.componentDidUpdate(r,t.memoizedState,e.__reactInternalSnapshotBeforeUpdate))),void(null!==(t=n.updateQueue)&&Co(n,t,e));case 3:if(null!==(t=n.updateQueue)){if(e=null,null!==n.child)switch(n.child.tag){case 5:case 1:e=n.child.stateNode}Co(n,t,e)}return;case 5:return e=n.stateNode,void(null===t&&4&n.flags&&ti(n.type,n.memoizedProps)&&e.focus());case 6:case 4:case 12:case 19:case 17:case 20:case 21:case 23:case 24:return;case 13:return void(null===n.memoizedState&&(n=n.alternate,null!==n&&(n=n.memoizedState,null!==n&&(n=n.dehydrated,null!==n&&Ot(n)))))}throw Error(v(163))}function Aa(e,t){for(var n=e;;){if(5===n.tag){var r=n.stateNode;if(t)"function"==typeof(r=r.style).setProperty?r.setProperty("display","none","important"):r.display="none";else{r=n.stateNode;var i=n.memoizedProps.style;i=null!=i&&i.hasOwnProperty("display")?i.display:null,r.style.display=Pe("display",i)}}else if(6===n.tag)n.stateNode.nodeValue=t?"":n.memoizedProps;else if((23!==n.tag&&24!==n.tag||null===n.memoizedState||n===e)&&null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)break;for(;null===n.sibling;){if(null===n.return||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}}function Da(e,t){if(Mi&&"function"==typeof Mi.onCommitFiberUnmount)try{Mi.onCommitFiberUnmount(Ri,t)}catch(e){}switch(t.tag){case 0:case 11:case 14:case 15:case 22:if(null!==(e=t.updateQueue)&&null!==(e=e.lastEffect)){var n=e=e.next;do{var r=n,i=r.destroy;if(r=r.tag,void 0!==i)if(0!=(4&r))Ql(t,n);else{r=t;try{i()}catch(e){Jl(r,e)}}n=n.next}while(n!==e)}break;case 1:if(Ca(t),"function"==typeof(e=t.stateNode).componentWillUnmount)try{e.props=t.memoizedProps,e.state=t.memoizedState,e.componentWillUnmount()}catch(e){Jl(t,e)}break;case 5:Ca(t);break;case 4:Fa(e,t)}}function La(e){e.alternate=null,e.child=null,e.dependencies=null,e.firstEffect=null,e.lastEffect=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.return=null,e.updateQueue=null}function Pa(e){return 5===e.tag||3===e.tag||4===e.tag}function Oa(e){e:{for(var t=e.return;null!==t;){if(Pa(t))break e;t=t.return}throw Error(v(160))}var n=t;switch(t=n.stateNode,n.tag){case 5:var r=!1;break;case 3:case 4:t=t.containerInfo,r=!0;break;default:throw Error(v(161))}16&n.flags&&(Ae(t,""),n.flags&=-17);e:t:for(n=e;;){for(;null===n.sibling;){if(null===n.return||Pa(n.return)){n=null;break e}n=n.return}for(n.sibling.return=n.return,n=n.sibling;5!==n.tag&&6!==n.tag&&18!==n.tag;){if(2&n.flags)continue t;if(null===n.child||4===n.tag)continue t;n.child.return=n,n=n.child}if(!(2&n.flags)){n=n.stateNode;break e}}r?Ra(e,n,t):Ma(e,n,t)}function Ra(e,t,n){var r=e.tag,i=5===r||6===r;if(i)e=i?e.stateNode:e.stateNode.instance,t?8===n.nodeType?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(8===n.nodeType?(t=n.parentNode).insertBefore(e,n):(t=n).appendChild(e),null!=(n=n._reactRootContainer)||null!==t.onclick||(t.onclick=Jr));else if(4!==r&&null!==(e=e.child))for(Ra(e,t,n),e=e.sibling;null!==e;)Ra(e,t,n),e=e.sibling}function Ma(e,t,n){var r=e.tag,i=5===r||6===r;if(i)e=i?e.stateNode:e.stateNode.instance,t?n.insertBefore(e,t):n.appendChild(e);else if(4!==r&&null!==(e=e.child))for(Ma(e,t,n),e=e.sibling;null!==e;)Ma(e,t,n),e=e.sibling}function Fa(e,t){for(var n,r,i=t,o=!1;;){if(!o){o=i.return;e:for(;;){if(null===o)throw Error(v(160));switch(n=o.stateNode,o.tag){case 5:r=!1;break e;case 3:case 4:n=n.containerInfo,r=!0;break e}o=o.return}o=!0}if(5===i.tag||6===i.tag){e:for(var s=e,a=i,l=a;;)if(Da(s,l),null!==l.child&&4!==l.tag)l.child.return=l,l=l.child;else{if(l===a)break e;for(;null===l.sibling;){if(null===l.return||l.return===a)break e;l=l.return}l.sibling.return=l.return,l=l.sibling}r?(s=n,a=i.stateNode,8===s.nodeType?s.parentNode.removeChild(a):s.removeChild(a)):n.removeChild(i.stateNode)}else if(4===i.tag){if(null!==i.child){n=i.stateNode.containerInfo,r=!0,i.child.return=i,i=i.child;continue}}else if(Da(e,i),null!==i.child){i.child.return=i,i=i.child;continue}if(i===t)break;for(;null===i.sibling;){if(null===i.return||i.return===t)return;4===(i=i.return).tag&&(o=!1)}i.sibling.return=i.return,i=i.sibling}}function Ua(e,t){switch(t.tag){case 0:case 11:case 14:case 15:case 22:var n=t.updateQueue;if(null!==(n=null!==n?n.lastEffect:null)){var r=n=n.next;do{3==(3&r.tag)&&(e=r.destroy,r.destroy=void 0,void 0!==e&&e()),r=r.next}while(r!==n)}return;case 1:case 12:case 17:return;case 5:if(null!=(n=t.stateNode)){r=t.memoizedProps;var i=null!==e?e.memoizedProps:r;e=t.type;var o=t.updateQueue;if(t.updateQueue=null,null!==o){for(n[hi]=r,"input"===e&&"radio"===r.type&&null!=r.name&&de(n,r),Fe(e,i),t=Fe(e,r),i=0;i<o.length;i+=2){var s=o[i],a=o[i+1];"style"===s?Oe(n,a):"dangerouslySetInnerHTML"===s?Ne(n,a):"children"===s?Ae(n,a):L(n,s,a,t)}switch(e){case"input":pe(n,r);break;case"textarea":Ee(n,r);break;case"select":e=n._wrapperState.wasMultiple,n._wrapperState.wasMultiple=!!r.multiple,null!=(o=r.value)?ve(n,!!r.multiple,o,!1):e!==!!r.multiple&&(null!=r.defaultValue?ve(n,!!r.multiple,r.defaultValue,!0):ve(n,!!r.multiple,r.multiple?[]:"",!1))}}}return;case 6:if(null===t.stateNode)throw Error(v(162));return void(t.stateNode.nodeValue=t.memoizedProps);case 3:return void((n=t.stateNode).hydrate&&(n.hydrate=!1,Ot(n.containerInfo)));case 13:return null!==t.memoizedState&&(rl=to(),Aa(t.child,!0)),void Va(t);case 19:return void Va(t);case 23:case 24:return void Aa(t,null!==t.memoizedState)}throw Error(v(163))}function Va(e){var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new xa),t.forEach((function(t){var r=eu.bind(null,e,t);n.has(t)||(n.add(t),t.then(r,r))}))}}function ja(e,t){return null!==e&&(null===(e=e.memoizedState)||null!==e.dehydrated)&&(null!==(t=t.memoizedState)&&null===t.dehydrated)}var za=Math.ceil,Ba=P.ReactCurrentDispatcher,qa=P.ReactCurrentOwner,Ha=0,$a=null,Ka=null,Ga=0,Wa=0,Qa=Ei(0),Xa=0,Ya=null,Ja=0,Za=0,el=0,tl=0,nl=null,rl=0,il=1/0;function ol(){il=to()+500}var sl,al=null,ll=!1,ul=null,cl=null,hl=!1,fl=null,dl=90,pl=[],ml=[],gl=null,yl=0,vl=null,wl=-1,bl=0,El=0,Sl=null,kl=!1;function Tl(){return 0!=(48&Ha)?to():-1!==wl?wl:wl=to()}function Il(e){if(0==(2&(e=e.mode)))return 1;if(0==(4&e))return 99===no()?1:2;if(0===bl&&(bl=Ja),0!==lo.transition){0!==El&&(El=null!==nl?nl.pendingLanes:0),e=bl;var t=4186112&~El;return 0===(t&=-t)&&(0===(t=(e=4186112&~e)&-e)&&(t=8192)),t}return e=no(),0!=(4&Ha)&&98===e?e=Jt(12,bl):e=Jt(e=function(e){switch(e){case 99:return 15;case 98:return 10;case 97:case 96:return 8;case 95:return 2;default:return 0}}(e),bl),e}function xl(e,t,n){if(50<yl)throw yl=0,vl=null,Error(v(185));if(null===(e=Cl(e,t)))return null;tn(e,t,n),e===$a&&(el|=t,4===Xa&&Al(e,Ga));var r=no();1===t?0!=(8&Ha)&&0==(48&Ha)?Dl(e):(_l(e,n),0===Ha&&(ol(),so())):(0==(4&Ha)||98!==r&&99!==r||(null===gl?gl=new Set([e]):gl.add(e)),_l(e,n)),nl=e}function Cl(e,t){e.lanes|=t;var n=e.alternate;for(null!==n&&(n.lanes|=t),n=e,e=e.return;null!==e;)e.childLanes|=t,null!==(n=e.alternate)&&(n.childLanes|=t),n=e,e=e.return;return 3===n.tag?n.stateNode:null}function _l(e,t){for(var n=e.callbackNode,r=e.suspendedLanes,i=e.pingedLanes,o=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-nn(s),l=1<<a,u=o[a];if(-1===u){if(0==(l&r)||0!=(l&i)){u=t,Qt(l);var c=Wt;o[a]=10<=c?u+250:6<=c?u+5e3:-1}}else u<=t&&(e.expiredLanes|=l);s&=~l}if(r=Xt(e,e===$a?Ga:0),t=Wt,0===r)null!==n&&(n!==Qi&&Vi(n),e.callbackNode=null,e.callbackPriority=0);else{if(null!==n){if(e.callbackPriority===t)return;n!==Qi&&Vi(n)}15===t?(n=Dl.bind(null,e),null===Yi?(Yi=[n],Ji=Ui(Hi,ao)):Yi.push(n),n=Qi):14===t?n=oo(99,Dl.bind(null,e)):(n=function(e){switch(e){case 15:case 14:return 99;case 13:case 12:case 11:case 10:return 98;case 9:case 8:case 7:case 6:case 4:case 5:return 97;case 3:case 2:case 1:return 95;case 0:return 90;default:throw Error(v(358,e))}}(t),n=oo(n,Nl.bind(null,e))),e.callbackPriority=t,e.callbackNode=n}}function Nl(e){if(wl=-1,El=bl=0,0!=(48&Ha))throw Error(v(327));var t=e.callbackNode;if(Gl()&&e.callbackNode!==t)return null;var n=Xt(e,e===$a?Ga:0);if(0===n)return null;var r=n,i=Ha;Ha|=16;var o=Ul();for($a===e&&Ga===r||(ol(),Ml(e,r));;)try{zl();break}catch(t){Fl(e,t)}if(mo(),Ba.current=o,Ha=i,null!==Ka?r=0:($a=null,Ga=0,r=Xa),0!=(Ja&el))Ml(e,0);else if(0!==r){if(2===r&&(Ha|=64,e.hydrate&&(e.hydrate=!1,oi(e.containerInfo)),0!==(n=Yt(e))&&(r=Vl(e,n))),1===r)throw t=Ya,Ml(e,0),Al(e,n),_l(e,to()),t;switch(e.finishedWork=e.current.alternate,e.finishedLanes=n,r){case 0:case 1:throw Error(v(345));case 2:case 5:Hl(e);break;case 3:if(Al(e,n),(62914560&n)===n&&10<(r=rl+500-to())){if(0!==Xt(e,0))break;if(((i=e.suspendedLanes)&n)!==n){Tl(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ri(Hl.bind(null,e),r);break}Hl(e);break;case 4:if(Al(e,n),(4186112&n)===n)break;for(r=e.eventTimes,i=-1;0<n;){var s=31-nn(n);o=1<<s,(s=r[s])>i&&(i=s),n&=~o}if(n=i,10<(n=(120>(n=to()-n)?120:480>n?480:1080>n?1080:1920>n?1920:3e3>n?3e3:4320>n?4320:1960*za(n/1960))-n)){e.timeoutHandle=ri(Hl.bind(null,e),n);break}Hl(e);break;default:throw Error(v(329))}}return _l(e,to()),e.callbackNode===t?Nl.bind(null,e):null}function Al(e,t){for(t&=~tl,t&=~el,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-nn(t),r=1<<n;e[n]=-1,t&=~r}}function Dl(e){if(0!=(48&Ha))throw Error(v(327));if(Gl(),e===$a&&0!=(e.expiredLanes&Ga)){var t=Ga,n=Vl(e,t);0!=(Ja&el)&&(n=Vl(e,t=Xt(e,t)))}else n=Vl(e,t=Xt(e,0));if(0!==e.tag&&2===n&&(Ha|=64,e.hydrate&&(e.hydrate=!1,oi(e.containerInfo)),0!==(t=Yt(e))&&(n=Vl(e,t))),1===n)throw n=Ya,Ml(e,0),Al(e,t),_l(e,to()),n;return e.finishedWork=e.current.alternate,e.finishedLanes=t,Hl(e),_l(e,to()),null}function Ll(e,t){var n=Ha;Ha|=1;try{return e(t)}finally{0===(Ha=n)&&(ol(),so())}}function Pl(e,t){var n=Ha;Ha&=-2,Ha|=8;try{return e(t)}finally{0===(Ha=n)&&(ol(),so())}}function Ol(e,t){ki(Qa,Wa),Wa|=t,Ja|=t}function Rl(){Wa=Qa.current,Si(Qa)}function Ml(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(e.timeoutHandle=-1,ii(n)),null!==Ka)for(n=Ka.return;null!==n;){var r=n;switch(r.tag){case 1:null!=(r=r.type.childContextTypes)&&Ai();break;case 3:Go(),Si(xi),Si(Ii),ls();break;case 5:Qo(r);break;case 4:Go();break;case 13:case 19:Si(Xo);break;case 10:go(r);break;case 23:case 24:Rl()}n=n.return}$a=e,Ka=iu(e.current,null),Ga=Wa=Ja=t,Xa=0,Ya=null,tl=el=Za=0}function Fl(e,t){for(;;){var n=Ka;try{if(mo(),us.current=Hs,ms){for(var r=fs.memoizedState;null!==r;){var i=r.queue;null!==i&&(i.pending=null),r=r.next}ms=!1}if(hs=0,ps=ds=fs=null,gs=!1,qa.current=null,null===n||null===n.return){Xa=1,Ya=t,Ka=null;break}e:{var o=e,s=n.return,a=n,l=t;if(t=Ga,a.flags|=2048,a.firstEffect=a.lastEffect=null,null!==l&&"object"==typeof l&&"function"==typeof l.then){var u=l;if(0==(2&a.mode)){var c=a.alternate;c?(a.updateQueue=c.updateQueue,a.memoizedState=c.memoizedState,a.lanes=c.lanes):(a.updateQueue=null,a.memoizedState=null)}var h=0!=(1&Xo.current),f=s;do{var d;if(d=13===f.tag){var p=f.memoizedState;if(null!==p)d=null!==p.dehydrated;else{var m=f.memoizedProps;d=void 0!==m.fallback&&(!0!==m.unstable_avoidThisFallback||!h)}}if(d){var g=f.updateQueue;if(null===g){var y=new Set;y.add(u),f.updateQueue=y}else g.add(u);if(0==(2&f.mode)){if(f.flags|=64,a.flags|=16384,a.flags&=-2981,1===a.tag)if(null===a.alternate)a.tag=17;else{var v=ko(-1,1);v.tag=2,To(a,v)}a.lanes|=1;break e}l=void 0,a=t;var w=o.pingCache;if(null===w?(w=o.pingCache=new ka,l=new Set,w.set(u,l)):void 0===(l=w.get(u))&&(l=new Set,w.set(u,l)),!l.has(a)){l.add(a);var b=Zl.bind(null,o,u,a);u.then(b,b)}f.flags|=4096,f.lanes=t;break e}f=f.return}while(null!==f);l=Error((oe(a.type)||"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.")}5!==Xa&&(Xa=2),l=Ea(l,a),f=s;do{switch(f.tag){case 3:o=l,f.flags|=4096,t&=-t,f.lanes|=t,Io(f,Ta(0,o,t));break e;case 1:o=l;var E=f.type,S=f.stateNode;if(0==(64&f.flags)&&("function"==typeof E.getDerivedStateFromError||null!==S&&"function"==typeof S.componentDidCatch&&(null===cl||!cl.has(S)))){f.flags|=4096,t&=-t,f.lanes|=t,Io(f,Ia(f,o,t));break e}}f=f.return}while(null!==f)}ql(n)}catch(e){t=e,Ka===n&&null!==n&&(Ka=n=n.return);continue}break}}function Ul(){var e=Ba.current;return Ba.current=Hs,null===e?Hs:e}function Vl(e,t){var n=Ha;Ha|=16;var r=Ul();for($a===e&&Ga===t||Ml(e,t);;)try{jl();break}catch(t){Fl(e,t)}if(mo(),Ha=n,Ba.current=r,null!==Ka)throw Error(v(261));return $a=null,Ga=0,Xa}function jl(){for(;null!==Ka;)Bl(Ka)}function zl(){for(;null!==Ka&&!ji();)Bl(Ka)}function Bl(e){var t=sl(e.alternate,e,Wa);e.memoizedProps=e.pendingProps,null===t?ql(e):Ka=t,qa.current=null}function ql(e){var t=e;do{var n=t.alternate;if(e=t.return,0==(2048&t.flags)){if(null!==(n=wa(n,t,Wa)))return void(Ka=n);if(24!==(n=t).tag&&23!==n.tag||null===n.memoizedState||0!=(1073741824&Wa)||0==(4&n.mode)){for(var r=0,i=n.child;null!==i;)r|=i.lanes|i.childLanes,i=i.sibling;n.childLanes=r}null!==e&&0==(2048&e.flags)&&(null===e.firstEffect&&(e.firstEffect=t.firstEffect),null!==t.lastEffect&&(null!==e.lastEffect&&(e.lastEffect.nextEffect=t.firstEffect),e.lastEffect=t.lastEffect),1<t.flags&&(null!==e.lastEffect?e.lastEffect.nextEffect=t:e.firstEffect=t,e.lastEffect=t))}else{if(null!==(n=ba(t)))return n.flags&=2047,void(Ka=n);null!==e&&(e.firstEffect=e.lastEffect=null,e.flags|=2048)}if(null!==(t=t.sibling))return void(Ka=t);Ka=t=e}while(null!==t);0===Xa&&(Xa=5)}function Hl(e){var t=no();return io(99,$l.bind(null,e,t)),null}function $l(e,t){do{Gl()}while(null!==fl);if(0!=(48&Ha))throw Error(v(327));var n=e.finishedWork;if(null===n)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(v(177));e.callbackNode=null;var r=n.lanes|n.childLanes,i=r,o=e.pendingLanes&~i;e.pendingLanes=i,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=i,e.mutableReadLanes&=i,e.entangledLanes&=i,i=e.entanglements;for(var s=e.eventTimes,a=e.expirationTimes;0<o;){var l=31-nn(o),u=1<<l;i[l]=0,s[l]=-1,a[l]=-1,o&=~u}if(null!==gl&&0==(24&r)&&gl.has(e)&&gl.delete(e),e===$a&&(Ka=$a=null,Ga=0),1<n.flags?null!==n.lastEffect?(n.lastEffect.nextEffect=n,r=n.firstEffect):r=n:r=n.firstEffect,null!==r){if(i=Ha,Ha|=32,qa.current=null,Zr=ln,Nr(s=_r())){if("selectionStart"in s)a={start:s.selectionStart,end:s.selectionEnd};else e:if(a=(a=s.ownerDocument)&&a.defaultView||window,(u=a.getSelection&&a.getSelection())&&0!==u.rangeCount){a=u.anchorNode,o=u.anchorOffset,l=u.focusNode,u=u.focusOffset;try{a.nodeType,l.nodeType}catch(e){a=null;break e}var c=0,h=-1,f=-1,d=0,p=0,m=s,g=null;t:for(;;){for(var y;m!==a||0!==o&&3!==m.nodeType||(h=c+o),m!==l||0!==u&&3!==m.nodeType||(f=c+u),3===m.nodeType&&(c+=m.nodeValue.length),null!==(y=m.firstChild);)g=m,m=y;for(;;){if(m===s)break t;if(g===a&&++d===o&&(h=c),g===l&&++p===u&&(f=c),null!==(y=m.nextSibling))break;g=(m=g).parentNode}m=y}a=-1===h||-1===f?null:{start:h,end:f}}else a=null;a=a||{start:0,end:0}}else a=null;ei={focusedElem:s,selectionRange:a},ln=!1,Sl=null,kl=!1,al=r;do{try{Kl()}catch(e){if(null===al)throw Error(v(330));Jl(al,e),al=al.nextEffect}}while(null!==al);Sl=null,al=r;do{try{for(s=e;null!==al;){var w=al.flags;if(16&w&&Ae(al.stateNode,""),128&w){var b=al.alternate;if(null!==b){var E=b.ref;null!==E&&("function"==typeof E?E(null):E.current=null)}}switch(1038&w){case 2:Oa(al),al.flags&=-3;break;case 6:Oa(al),al.flags&=-3,Ua(al.alternate,al);break;case 1024:al.flags&=-1025;break;case 1028:al.flags&=-1025,Ua(al.alternate,al);break;case 4:Ua(al.alternate,al);break;case 8:Fa(s,a=al);var S=a.alternate;La(a),null!==S&&La(S)}al=al.nextEffect}}catch(e){if(null===al)throw Error(v(330));Jl(al,e),al=al.nextEffect}}while(null!==al);if(E=ei,b=_r(),w=E.focusedElem,s=E.selectionRange,b!==w&&w&&w.ownerDocument&&Cr(w.ownerDocument.documentElement,w)){null!==s&&Nr(w)&&(b=s.start,void 0===(E=s.end)&&(E=b),"selectionStart"in w?(w.selectionStart=b,w.selectionEnd=Math.min(E,w.value.length)):(E=(b=w.ownerDocument||document)&&b.defaultView||window).getSelection&&(E=E.getSelection(),a=w.textContent.length,S=Math.min(s.start,a),s=void 0===s.end?S:Math.min(s.end,a),!E.extend&&S>s&&(a=s,s=S,S=a),a=xr(w,S),o=xr(w,s),a&&o&&(1!==E.rangeCount||E.anchorNode!==a.node||E.anchorOffset!==a.offset||E.focusNode!==o.node||E.focusOffset!==o.offset)&&((b=b.createRange()).setStart(a.node,a.offset),E.removeAllRanges(),S>s?(E.addRange(b),E.extend(o.node,o.offset)):(b.setEnd(o.node,o.offset),E.addRange(b))))),b=[];for(E=w;E=E.parentNode;)1===E.nodeType&&b.push({element:E,left:E.scrollLeft,top:E.scrollTop});for("function"==typeof w.focus&&w.focus(),w=0;w<b.length;w++)(E=b[w]).element.scrollLeft=E.left,E.element.scrollTop=E.top}ln=!!Zr,ei=Zr=null,e.current=n,al=r;do{try{for(w=e;null!==al;){var k=al.flags;if(36&k&&Na(w,al.alternate,al),128&k){b=void 0;var T=al.ref;if(null!==T){var I=al.stateNode;al.tag,b=I,"function"==typeof T?T(b):T.current=b}}al=al.nextEffect}}catch(e){if(null===al)throw Error(v(330));Jl(al,e),al=al.nextEffect}}while(null!==al);al=null,Xi(),Ha=i}else e.current=n;if(hl)hl=!1,fl=e,dl=t;else for(al=r;null!==al;)t=al.nextEffect,al.nextEffect=null,8&al.flags&&((k=al).sibling=null,k.stateNode=null),al=t;if(0===(r=e.pendingLanes)&&(cl=null),1===r?e===vl?yl++:(yl=0,vl=e):yl=0,n=n.stateNode,Mi&&"function"==typeof Mi.onCommitFiberRoot)try{Mi.onCommitFiberRoot(Ri,n,void 0,64==(64&n.current.flags))}catch(e){}if(_l(e,to()),ll)throw ll=!1,e=ul,ul=null,e;return 0!=(8&Ha)||so(),null}function Kl(){for(;null!==al;){var e=al.alternate;kl||null===Sl||(0!=(8&al.flags)?ft(al,Sl)&&(kl=!0):13===al.tag&&ja(e,al)&&ft(al,Sl)&&(kl=!0));var t=al.flags;0!=(256&t)&&_a(e,al),0==(512&t)||hl||(hl=!0,oo(97,(function(){return Gl(),null}))),al=al.nextEffect}}function Gl(){if(90!==dl){var e=97<dl?97:dl;return dl=90,io(e,Xl)}return!1}function Wl(e,t){pl.push(t,e),hl||(hl=!0,oo(97,(function(){return Gl(),null})))}function Ql(e,t){ml.push(t,e),hl||(hl=!0,oo(97,(function(){return Gl(),null})))}function Xl(){if(null===fl)return!1;var e=fl;if(fl=null,0!=(48&Ha))throw Error(v(331));var t=Ha;Ha|=32;var n=ml;ml=[];for(var r=0;r<n.length;r+=2){var i=n[r],o=n[r+1],s=i.destroy;if(i.destroy=void 0,"function"==typeof s)try{s()}catch(e){if(null===o)throw Error(v(330));Jl(o,e)}}for(n=pl,pl=[],r=0;r<n.length;r+=2){i=n[r],o=n[r+1];try{var a=i.create;i.destroy=a()}catch(e){if(null===o)throw Error(v(330));Jl(o,e)}}for(a=e.current.firstEffect;null!==a;)e=a.nextEffect,a.nextEffect=null,8&a.flags&&(a.sibling=null,a.stateNode=null),a=e;return Ha=t,so(),!0}function Yl(e,t,n){To(e,t=Ta(0,t=Ea(n,t),1)),t=Tl(),null!==(e=Cl(e,1))&&(tn(e,1,t),_l(e,t))}function Jl(e,t){if(3===e.tag)Yl(e,e,t);else for(var n=e.return;null!==n;){if(3===n.tag){Yl(n,e,t);break}if(1===n.tag){var r=n.stateNode;if("function"==typeof n.type.getDerivedStateFromError||"function"==typeof r.componentDidCatch&&(null===cl||!cl.has(r))){var i=Ia(n,e=Ea(t,e),1);if(To(n,i),i=Tl(),null!==(n=Cl(n,1)))tn(n,1,i),_l(n,i);else if("function"==typeof r.componentDidCatch&&(null===cl||!cl.has(r)))try{r.componentDidCatch(t,e)}catch(e){}break}}n=n.return}}function Zl(e,t,n){var r=e.pingCache;null!==r&&r.delete(t),t=Tl(),e.pingedLanes|=e.suspendedLanes&n,$a===e&&(Ga&n)===n&&(4===Xa||3===Xa&&(62914560&Ga)===Ga&&500>to()-rl?Ml(e,0):tl|=n),_l(e,t)}function eu(e,t){var n=e.stateNode;null!==n&&n.delete(t),0===(t=0)&&(0==(2&(t=e.mode))?t=1:0==(4&t)?t=99===no()?1:2:(0===bl&&(bl=Ja),0===(t=Zt(62914560&~bl))&&(t=4194304))),n=Tl(),null!==(e=Cl(e,t))&&(tn(e,t,n),_l(e,n))}function tu(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.flags=0,this.lastEffect=this.firstEffect=this.nextEffect=null,this.childLanes=this.lanes=0,this.alternate=null}function nu(e,t,n,r){return new tu(e,t,n,r)}function ru(e){return!(!(e=e.prototype)||!e.isReactComponent)}function iu(e,t){var n=e.alternate;return null===n?((n=nu(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.nextEffect=null,n.firstEffect=null,n.lastEffect=null),n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=null===t?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function ou(e,t,n,r,i,o){var s=2;if(r=e,"function"==typeof e)ru(e)&&(s=1);else if("string"==typeof e)s=5;else e:switch(e){case M:return su(n.children,i,o,t);case W:s=8,i|=16;break;case F:s=8,i|=1;break;case U:return(e=nu(12,n,t,8|i)).elementType=U,e.type=U,e.lanes=o,e;case B:return(e=nu(13,n,t,i)).type=B,e.elementType=B,e.lanes=o,e;case q:return(e=nu(19,n,t,i)).elementType=q,e.lanes=o,e;case Q:return au(n,i,o,t);case X:return(e=nu(24,n,t,i)).elementType=X,e.lanes=o,e;default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case V:s=10;break e;case j:s=9;break e;case z:s=11;break e;case H:s=14;break e;case $:s=16,r=null;break e;case K:s=22;break e}throw Error(v(130,null==e?e:typeof e,""))}return(t=nu(s,n,t,i)).elementType=e,t.type=r,t.lanes=o,t}function su(e,t,n,r){return(e=nu(7,e,r,t)).lanes=n,e}function au(e,t,n,r){return(e=nu(23,e,r,t)).elementType=Q,e.lanes=n,e}function lu(e,t,n){return(e=nu(6,e,null,t)).lanes=n,e}function uu(e,t,n){return(t=nu(4,null!==e.children?e.children:[],e.key,t)).lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function cu(e,t,n){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.pendingContext=this.context=null,this.hydrate=n,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=en(0),this.expirationTimes=en(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=en(0),this.mutableSourceEagerHydrationData=null}function hu(e,t,n){var r=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:R,key:null==r?null:""+r,children:e,containerInfo:t,implementation:n}}function fu(e,t,n,r){var i=t.current,o=Tl(),s=Il(i);e:if(n){t:{if(lt(n=n._reactInternals)!==n||1!==n.tag)throw Error(v(170));var a=n;do{switch(a.tag){case 3:a=a.stateNode.context;break t;case 1:if(Ni(a.type)){a=a.stateNode.__reactInternalMemoizedMergedChildContext;break t}}a=a.return}while(null!==a);throw Error(v(171))}if(1===n.tag){var l=n.type;if(Ni(l)){n=Li(n,l,a);break e}}n=a}else n=Ti;return null===t.context?t.context=n:t.pendingContext=n,(t=ko(o,s)).payload={element:e},null!==(r=void 0===r?null:r)&&(t.callback=r),To(i,t),xl(i,s,o),s}function du(e){return(e=e.current).child?(e.child.tag,e.child.stateNode):null}function pu(e,t){if(null!==(e=e.memoizedState)&&null!==e.dehydrated){var n=e.retryLane;e.retryLane=0!==n&&n<t?n:t}}function mu(e,t){pu(e,t),(e=e.alternate)&&pu(e,t)}function gu(e,t,n){var r=null!=n&&null!=n.hydrationOptions&&n.hydrationOptions.mutableSources||null;if(n=new cu(e,t,null!=n&&!0===n.hydrate),t=nu(3,null,null,2===t?7:1===t?3:0),n.current=t,t.stateNode=n,Eo(t),e[fi]=n.current,Hr(8===e.nodeType?e.parentNode:e),r)for(e=0;e<r.length;e++){var i=(t=r[e])._getVersion;i=i(t._source),null==n.mutableSourceEagerHydrationData?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i)}this._internalRoot=n}function yu(e){return!(!e||1!==e.nodeType&&9!==e.nodeType&&11!==e.nodeType&&(8!==e.nodeType||" react-mount-point-unstable "!==e.nodeValue))}function vu(e,t,n,r,i){var o=n._reactRootContainer;if(o){var s=o._internalRoot;if("function"==typeof i){var a=i;i=function(){var e=du(s);a.call(e)}}fu(t,s,e,i)}else{if(o=n._reactRootContainer=function(e,t){if(t||(t=!(!(t=e?9===e.nodeType?e.documentElement:e.firstChild:null)||1!==t.nodeType||!t.hasAttribute("data-reactroot"))),!t)for(var n;n=e.lastChild;)e.removeChild(n);return new gu(e,0,t?{hydrate:!0}:void 0)}(n,r),s=o._internalRoot,"function"==typeof i){var l=i;i=function(){var e=du(s);l.call(e)}}Pl((function(){fu(t,s,e,i)}))}return du(s)}function wu(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!yu(t))throw Error(v(200));return hu(e,t,null,n)}sl=function(e,t,n){var r=t.lanes;if(null!==e)if(e.memoizedProps!==t.pendingProps||xi.current)Qs=!0;else{if(0==(n&r)){switch(Qs=!1,t.tag){case 3:oa(t),ss();break;case 5:Wo(t);break;case 1:Ni(t.type)&&Pi(t);break;case 4:Ko(t,t.stateNode.containerInfo);break;case 10:r=t.memoizedProps.value;var i=t.type._context;ki(co,i._currentValue),i._currentValue=r;break;case 13:if(null!==t.memoizedState)return 0!=(n&t.child.childLanes)?ca(e,t,n):(ki(Xo,1&Xo.current),null!==(t=ya(e,t,n))?t.sibling:null);ki(Xo,1&Xo.current);break;case 19:if(r=0!=(n&t.childLanes),0!=(64&e.flags)){if(r)return ga(e,t,n);t.flags|=64}if(null!==(i=t.memoizedState)&&(i.rendering=null,i.tail=null,i.lastEffect=null),ki(Xo,Xo.current),r)break;return null;case 23:case 24:return t.lanes=0,ea(e,t,n)}return ya(e,t,n)}Qs=0!=(16384&e.flags)}else Qs=!1;switch(t.lanes=0,t.tag){case 2:if(r=t.type,null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,i=_i(t,Ii.current),vo(t,n),i=ws(null,t,r,e,i,n),t.flags|=1,"object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){if(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ni(r)){var o=!0;Pi(t)}else o=!1;t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,Eo(t);var s=r.getDerivedStateFromProps;"function"==typeof s&&No(t,r,s,e),i.updater=Ao,t.stateNode=i,i._reactInternals=t,Oo(t,r,e,n),t=ia(null,t,r,!0,o,n)}else t.tag=0,Xs(null,t,i,n),t=t.child;return t;case 16:i=t.elementType;e:{switch(null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),e=t.pendingProps,i=(o=i._init)(i._payload),t.type=i,o=t.tag=function(e){if("function"==typeof e)return ru(e)?1:0;if(null!=e){if((e=e.$$typeof)===z)return 11;if(e===H)return 14}return 2}(i),e=uo(i,e),o){case 0:t=na(null,t,i,e,n);break e;case 1:t=ra(null,t,i,e,n);break e;case 11:t=Ys(null,t,i,e,n);break e;case 14:t=Js(null,t,i,uo(i.type,e),r,n);break e}throw Error(v(306,i,""))}return t;case 0:return r=t.type,i=t.pendingProps,na(e,t,r,i=t.elementType===r?i:uo(r,i),n);case 1:return r=t.type,i=t.pendingProps,ra(e,t,r,i=t.elementType===r?i:uo(r,i),n);case 3:if(oa(t),r=t.updateQueue,null===e||null===r)throw Error(v(282));if(r=t.pendingProps,i=null!==(i=t.memoizedState)?i.element:null,So(e,t),xo(t,r,null,n),(r=t.memoizedState.element)===i)ss(),t=ya(e,t,n);else{if((o=(i=t.stateNode).hydrate)&&(Zo=si(t.stateNode.containerInfo.firstChild),Jo=t,o=es=!0),o){if(null!=(e=i.mutableSourceEagerHydrationData))for(i=0;i<e.length;i+=2)(o=e[i])._workInProgressVersionPrimary=e[i+1],as.push(o);for(n=jo(t,null,r,n),t.child=n;n;)n.flags=-3&n.flags|1024,n=n.sibling}else Xs(e,t,r,n),ss();t=t.child}return t;case 5:return Wo(t),null===e&&rs(t),r=t.type,i=t.pendingProps,o=null!==e?e.memoizedProps:null,s=i.children,ni(r,i)?s=null:null!==o&&ni(r,o)&&(t.flags|=16),ta(e,t),Xs(e,t,s,n),t.child;case 6:return null===e&&rs(t),null;case 13:return ca(e,t,n);case 4:return Ko(t,t.stateNode.containerInfo),r=t.pendingProps,null===e?t.child=Vo(t,null,r,n):Xs(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,Ys(e,t,r,i=t.elementType===r?i:uo(r,i),n);case 7:return Xs(e,t,t.pendingProps,n),t.child;case 8:case 12:return Xs(e,t,t.pendingProps.children,n),t.child;case 10:e:{r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value;var a=t.type._context;if(ki(co,a._currentValue),a._currentValue=o,null!==s)if(a=s.value,0===(o=Sr(a,o)?0:0|("function"==typeof r._calculateChangedBits?r._calculateChangedBits(a,o):1073741823))){if(s.children===i.children&&!xi.current){t=ya(e,t,n);break e}}else for(null!==(a=t.child)&&(a.return=t);null!==a;){var l=a.dependencies;if(null!==l){s=a.child;for(var u=l.firstContext;null!==u;){if(u.context===r&&0!=(u.observedBits&o)){1===a.tag&&((u=ko(-1,n&-n)).tag=2,To(a,u)),a.lanes|=n,null!==(u=a.alternate)&&(u.lanes|=n),yo(a.return,n),l.lanes|=n;break}u=u.next}}else s=10===a.tag&&a.type===t.type?null:a.child;if(null!==s)s.return=a;else for(s=a;null!==s;){if(s===t){s=null;break}if(null!==(a=s.sibling)){a.return=s.return,s=a;break}s=s.return}a=s}Xs(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=(o=t.pendingProps).children,vo(t,n),r=r(i=wo(i,o.unstable_observedBits)),t.flags|=1,Xs(e,t,r,n),t.child;case 14:return o=uo(i=t.type,t.pendingProps),Js(e,t,i,o=uo(i.type,o),r,n);case 15:return Zs(e,t,t.type,t.pendingProps,r,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:uo(r,i),null!==e&&(e.alternate=null,t.alternate=null,t.flags|=2),t.tag=1,Ni(r)?(e=!0,Pi(t)):e=!1,vo(t,n),Lo(t,r,i),Oo(t,r,i,n),ia(null,t,r,!0,e,n);case 19:return ga(e,t,n);case 23:case 24:return ea(e,t,n)}throw Error(v(156,t.tag))},gu.prototype.render=function(e){fu(e,this._internalRoot,null,null)},gu.prototype.unmount=function(){var e=this._internalRoot,t=e.containerInfo;fu(null,e,null,(function(){t[fi]=null}))},dt=function(e){13===e.tag&&(xl(e,4,Tl()),mu(e,4))},pt=function(e){13===e.tag&&(xl(e,67108864,Tl()),mu(e,67108864))},mt=function(e){if(13===e.tag){var t=Tl(),n=Il(e);xl(e,n,t),mu(e,n)}},gt=function(e,t){return t()},Ve=function(e,t,n){switch(t){case"input":if(pe(e,n),t=n.name,"radio"===n.type&&null!=t){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=yi(r);if(!i)throw Error(v(90));ue(r),pe(r,i)}}}break;case"textarea":Ee(e,n);break;case"select":null!=(t=n.value)&&ve(e,!!n.multiple,t,!1)}},$e=Ll,Ke=function(e,t,n,r,i){var o=Ha;Ha|=4;try{return io(98,e.bind(null,t,n,r,i))}finally{0===(Ha=o)&&(ol(),so())}},Ge=function(){0==(49&Ha)&&(function(){if(null!==gl){var e=gl;gl=null,e.forEach((function(e){e.expiredLanes|=24&e.pendingLanes,_l(e,to())}))}so()}(),Gl())},We=function(e,t){var n=Ha;Ha|=2;try{return e(t)}finally{0===(Ha=n)&&(ol(),so())}};var bu={Events:[mi,gi,yi,qe,He,Gl,{current:!1}]},Eu={findFiberByHostInstance:pi,bundleType:0,version:"17.0.2",rendererPackageName:"react-dom"},Su={bundleType:Eu.bundleType,version:Eu.version,rendererPackageName:Eu.rendererPackageName,rendererConfig:Eu.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:P.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return null===(e=ht(e))?null:e.stateNode},findFiberByHostInstance:Eu.findFiberByHostInstance||function(){return null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null};if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var ku=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ku.isDisabled&&ku.supportsFiber)try{Ri=ku.inject(Su),Mi=ku}catch(_e){}}r=bu,i=wu,s=function(e){if(null==e)return null;if(1===e.nodeType)return e;var t=e._reactInternals;if(void 0===t){if("function"==typeof e.render)throw Error(v(188));throw Error(v(268,Object.keys(e)))}return e=null===(e=ht(t))?null:e.stateNode},a=function(e,t){var n=Ha;if(0!=(48&n))return e(t);Ha|=1;try{if(e)return io(99,e.bind(null,t))}finally{Ha=n,so()}},l=function(e,t,n){if(!yu(t))throw Error(v(200));return vu(null,e,t,!0,n)},u=function(e,t,n){if(!yu(t))throw Error(v(200));return vu(null,e,t,!1,n)},c=function(e){if(!yu(e))throw Error(v(40));return!!e._reactRootContainer&&(Pl((function(){vu(null,null,e,!1,(function(){e._reactRootContainer=null,e[fi]=null}))})),!0)},h=Ll,f=function(e,t){return wu(e,t,2<arguments.length&&void 0!==arguments[2]?arguments[2]:null)},d=function(e,t,n,r){if(!yu(n))throw Error(v(200));if(null==e||void 0===e._reactInternals)throw Error(v(38));return vu(e,t,n,!1,r)},p="17.0.2"})),o.register("j5AGC",(function(e,t){"use strict";e.exports=o("hoBT9")})),o.register("hoBT9",(function(t,n){var r,i,o,s,a,l,u,c,h,f,d,p,m,g,y,v,w,b,E,S,k,T,I;if(e(t.exports,"unstable_now",(function(){return r}),(function(e){return r=e})),e(t.exports,"unstable_shouldYield",(function(){return i}),(function(e){return i=e})),e(t.exports,"unstable_forceFrameRate",(function(){return o}),(function(e){return o=e})),e(t.exports,"unstable_IdlePriority",(function(){return s}),(function(e){return s=e})),e(t.exports,"unstable_ImmediatePriority",(function(){return a}),(function(e){return a=e})),e(t.exports,"unstable_LowPriority",(function(){return l}),(function(e){return l=e})),e(t.exports,"unstable_NormalPriority",(function(){return u}),(function(e){return u=e})),e(t.exports,"unstable_Profiling",(function(){return c}),(function(e){return c=e})),e(t.exports,"unstable_UserBlockingPriority",(function(){return h}),(function(e){return h=e})),e(t.exports,"unstable_cancelCallback",(function(){return f}),(function(e){return f=e})),e(t.exports,"unstable_continueExecution",(function(){return d}),(function(e){return d=e})),e(t.exports,"unstable_getCurrentPriorityLevel",(function(){return p}),(function(e){return p=e})),e(t.exports,"unstable_getFirstCallbackNode",(function(){return m}),(function(e){return m=e})),e(t.exports,"unstable_next",(function(){return g}),(function(e){return g=e})),e(t.exports,"unstable_pauseExecution",(function(){return y}),(function(e){return y=e})),e(t.exports,"unstable_requestPaint",(function(){return v}),(function(e){return v=e})),e(t.exports,"unstable_runWithPriority",(function(){return w}),(function(e){return w=e})),e(t.exports,"unstable_scheduleCallback",(function(){return b}),(function(e){return b=e})),e(t.exports,"unstable_wrapCallback",(function(){return E}),(function(e){return E=e})),"object"==typeof performance&&"function"==typeof performance.now){var x=performance;r=function(){return x.now()}}else{var C=Date,_=C.now();r=function(){return C.now()-_}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var N=null,A=null,D=function(){if(null!==N)try{var e=r();N(!0,e),N=null}catch(e){throw setTimeout(D,0),e}};S=function(e){null!==N?setTimeout(S,0,e):(N=e,setTimeout(D,0))},k=function(e,t){A=setTimeout(e,t)},T=function(){clearTimeout(A)},i=function(){return!1},I=o=function(){}}else{var L=window.setTimeout,P=window.clearTimeout;if("undefined"!=typeof console){var O=window.cancelAnimationFrame;"function"!=typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof O&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var R=!1,M=null,F=-1,U=5,V=0;i=function(){return r()>=V},I=function(){},o=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):U=0<e?Math.floor(1e3/e):5};var j=new MessageChannel,z=j.port2;j.port1.onmessage=function(){if(null!==M){var e=r();V=e+U;try{M(!0,e)?z.postMessage(null):(R=!1,M=null)}catch(e){throw z.postMessage(null),e}}else R=!1},S=function(e){M=e,R||(R=!0,z.postMessage(null))},k=function(e,t){F=L((function(){e(r())}),t)},T=function(){P(F),F=-1}}function B(e,t){var n=e.length;e.push(t);e:for(;;){var r=n-1>>>1,i=e[r];if(!(void 0!==i&&0<$(i,t)))break e;e[r]=t,e[n]=i,n=r}}function q(e){return void 0===(e=e[0])?null:e}function H(e){var t=e[0];if(void 0!==t){var n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,i=e.length;r<i;){var o=2*(r+1)-1,s=e[o],a=o+1,l=e[a];if(void 0!==s&&0>$(s,n))void 0!==l&&0>$(l,s)?(e[r]=l,e[a]=n,r=a):(e[r]=s,e[o]=n,r=o);else{if(!(void 0!==l&&0>$(l,n)))break e;e[r]=l,e[a]=n,r=a}}}return t}return null}function $(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}var K=[],G=[],W=1,Q=null,X=3,Y=!1,J=!1,Z=!1;function ee(e){for(var t=q(G);null!==t;){if(null===t.callback)H(G);else{if(!(t.startTime<=e))break;H(G),t.sortIndex=t.expirationTime,B(K,t)}t=q(G)}}function te(e){if(Z=!1,ee(e),!J)if(null!==q(K))J=!0,S(ne);else{var t=q(G);null!==t&&k(te,t.startTime-e)}}function ne(e,t){J=!1,Z&&(Z=!1,T()),Y=!0;var n=X;try{for(ee(t),Q=q(K);null!==Q&&(!(Q.expirationTime>t)||e&&!i());){var o=Q.callback;if("function"==typeof o){Q.callback=null,X=Q.priorityLevel;var s=o(Q.expirationTime<=t);t=r(),"function"==typeof s?Q.callback=s:Q===q(K)&&H(K),ee(t)}else H(K);Q=q(K)}if(null!==Q)var a=!0;else{var l=q(G);null!==l&&k(te,l.startTime-t),a=!1}return a}finally{Q=null,X=n,Y=!1}}s=5,a=1,l=4,u=3,c=null,h=2,f=function(e){e.callback=null},d=function(){J||Y||(J=!0,S(ne))},p=function(){return X},m=function(){return q(K)},g=function(e){switch(X){case 1:case 2:case 3:var t=3;break;default:t=X}var n=X;X=t;try{return e()}finally{X=n}},y=function(){},v=I,w=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=X;X=e;try{return t()}finally{X=n}},b=function(e,t,n){var i=r();switch("object"==typeof n&&null!==n?n="number"==typeof(n=n.delay)&&0<n?i+n:i:n=i,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return e={id:W++,callback:t,priorityLevel:e,startTime:n,expirationTime:o=n+o,sortIndex:-1},n>i?(e.sortIndex=n,B(G,e),null===q(K)&&e===q(G)&&(Z?T():Z=!0,k(te,n-i))):(e.sortIndex=o,B(K,e),J||Y||(J=!0,S(ne))),e},E=function(e){var t=X;return function(){var n=X;X=t;try{return e.apply(this,arguments)}finally{X=n}}}})),p=o("aniPj");var g;m=o("lhfsu");o.register("3qTPU",(function(t,n){var r;e(t.exports,"getBundleURL",(function(){return r}),(function(e){return r=e}));var i={};function o(e){return(""+e).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}r=function(e){var t=i[e];return t||(t=function(){try{throw new Error}catch(t){var e=(""+t.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return o(e[2])}return"/"}(),i[e]=t),t}})),g=o("3qTPU").getBundleURL("gkeC9")+o("gXOAl").resolve("9PRGL");var y;y=o("3qTPU").getBundleURL("gkeC9")+o("gXOAl").resolve("l6uDG");var v;v=o("3qTPU").getBundleURL("gkeC9")+o("gXOAl").resolve("bjAlN");var w;function b(e){var t=e.state,n=e.count,r=e.showModal,i=e.addOneState,o=document.querySelectorAll("[id=editor-wrapper]").length,s=c(m.useState({item:void 0,colv:void 0})),a=s[0],l=s[1];function u(e){var t=document.createElement("div");t.id="editor-wrapper",t.className="editor-elem flex flex-col justify-center items-center w-full mt-4 p-2 border-t transform scale-0 new";var r=document.createElement("div");r.className="w-2/3 h-full flex flex-row justify-around items-center p-2";var i=document.createElement("img");i.src=g,i.className="w-10 rounded-full h-max border-2 border-blue-300 transition-transform transform duration-300 ease-in-out hover:rotate-180 cursor-pointer",i.onclick=function(e){h(e,"editor")};var s=document.createElement("span");s.className="w-max h-max flex justify-center items-center text-lg border border-dashed rounded p-2",s.innerText="№ "+(null==o?Object.keys(n).length+1:o),r.append(i),r.append(s);var a=document.createElement("label");a.innerText="Название: ",a.className="w-max h-max mb-4 ";var l=document.createElement("input");l.className="list-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300",l.value=e.item,a.append(l);var u=document.createElement("div");u.className="w-10/12 md:w-4/12 h-max flex flex-row justify-around items-center";var c=document.createElement("div");c.className="w-2/6 flex flex-row justify-around";var f=document.createElement("input");f.className="list-count shadow appearance-none border rounded w-11 h-max py-2 px-3 text-gray-800 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-300",f.value=e.colv;var d=document.createElement("span");d.className="flex justify-center items-center",d.innerText=" шт.",c.append(f),c.append(d);var p=document.createElement("button");p.innerHTML='<img class="w-9 h-max" src="'.concat(y,'">'),p.addEventListener("click",(function(e){e.path[2].childNodes[1].childNodes[0].value++,console.log(e),e.target.classList.add("transition-transform","transform","duration-100","scale-110","animPlusMinus"),setTimeout((function(){document.getElementsByClassName("animPlusMinus")[0].classList.remove("transition-transform","transform","duration-100","scale-110","animPlusMinus")}),100)}));var m=document.createElement("button");return m.innerHTML='<img class="w-8 h-max" src="'.concat(v,'">'),m.addEventListener("click",(function(e){+e.path[2].childNodes[1].childNodes[0].value<=1?e.path[2].childNodes[1].childNodes[0].value=1:e.path[2].childNodes[1].childNodes[0].value--,e.target.classList.add("transition-transform","transform","duration-100","scale-110","animPlusMinus"),setTimeout((function(){document.getElementsByClassName("animPlusMinus")[0].classList.remove("transition-transform","transform","duration-100","scale-110","animPlusMinus")}),100)})),u.append(m),u.append(c),u.append(p),t.append(r),t.append(a),t.append(u),setTimeout((function(){var e=document.getElementsByClassName("new")[0];e.classList.remove("new"),e.classList.add("transition","duration-300","ease-out","scale-100","new1"),window.scrollTo(0,document.body.scrollHeight+document.getElementById("addOrEdit").scrollHeight),setTimeout((function(){document.getElementsByClassName("new1")[0].classList.remove("transition","duration-300","ease-out","scale-100","transform","scale-0","new1")}),300)}),1),o+=1,t}function h(e,t){if("editor"===t)for(var n=function(e){if(document.querySelectorAll("[id=editor-wrapper]")[e]==r)return document.querySelectorAll("[id=editor-wrapper]")[e].classList.add("transition","duration-300","ease-out","transform","scale-0"),setTimeout((function(){document.querySelectorAll("[id=editor-wrapper]")[e].remove(),o=document.querySelectorAll("[id=editor-wrapper]").length;for(var t=1;t<=o;t++){document.querySelectorAll("[id=editor-wrapper]")[t-1].childNodes[0].childNodes[1].innerHTML="№ "+t}}),300),"break"},r=e.path[2],i=0;i<document.querySelectorAll("[id=editor-wrapper]").length;i++){if("break"===n(i))break}else if("viewer"===t)e.srcElement.src===window.location.href?e.srcElement.src=w:e.srcElement.src=" ",e.path[1].childNodes[1].classList.toggle("bg-gray-300"),e.path[1].childNodes[1].childNodes.forEach((function(e){e.classList.toggle("line-through")}));else if("modal"===t){var s=document.getElementById("list");s.childNodes[s.childNodes.length-1].remove()}}function f(e,r){var i=document.getElementById("list");if("one"==e){var s=u(r);return i.append(s),0}for(o=1;o<Object.keys(t).length;){var a=u({item:t[o],colv:n[o]});i.append(a)}o-=1}return m.useEffect((function(){a=i,document.getElementById("list").innerHTML="","editor"===t[0]?(document.getElementById("voice-button-wrapper").classList.remove("hidden"),f(),setTimeout((function(){window.scrollTo(0,0)}),3)):(document.getElementById("voice-button-wrapper").classList.add("hidden"),function(){var e=document.getElementById("list");e.className="w-screen flex flex-col justify-center items-center";for(var r=Object.keys(t).length,i=1;i<r;i++){var o=document.createElement("div");o.className="w-full md:w-1/2 h-max flex flex-row justify-around items-center p-3 mt-6 ";var s=document.createElement("img");s.src=" ",s.className="w-8 h-8 rounded-full border-2 border-blue-300",s.onclick=function(e){h(e,"viewer")};var a=document.createElement("div");a.className="w-10/12 h-12 flex items-center justify-center divide-x border rounded shadow-sm text-lg",a.innerHTML='<span class="w-5/6 pl-4">'.concat(t[i],'</span><span class="w-2/6 text-center">').concat(n[i]," шт.</span>"),o.append(s),o.append(a),e.append(o)}}())}),[t]),m.useEffect((function(){i.item===a.item&&""!==i.item||(o+=1,"Отмена"===i.item?h(0,"modal"):(f("one",i),l(i)))}),[i]),d.jsxs("div",{className:"w-11/12 md:w-3/6 h-auto md:h-3/6 flex flex-col justify-center items-center m-2 p-2",children:[d.jsx("div",{id:"voice-button-wrapper",className:"w-full h-max flex justify-center items-center p-2",children:d.jsx("button",{className:"w-max h-14 border flex justify-center items-center p-7 rounded text-xl transition-shadow shadow-md hover:shadow-xl transform transition-transform hover:scale-105 ",onClick:function(){return r({state:"on",content:"voice"})},children:"Голосовое управление"})}),d.jsx("div",{className:"w-full h-full flex flex-col justify-center",id:"list"})]})}w=o("3qTPU").getBundleURL("gkeC9")+o("gXOAl").resolve("k5Uho");var E;m=o("lhfsu");function S(e){var t=e.modal,n=e.closeModal,r=e.addOneToggle;function i(){n({state:"off",content:"closed"})}function o(){var e=document.createElement("button");return e.className="px-6 py-4 bg-green-500 text-white text-base font-medium rounded-md mx-auto mb-10 w-max h-max shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300",e.id="close-modal-button",e.innerText="Закрыть окно",e.addEventListener("click",i),e}return m.useEffect((function(){"on"===t.state?(document.getElementById("modal").classList.remove("hidden"),document.getElementById("modal-main").innerHTML="","voice"==t.content?function(){var e=document.getElementById("modal-main"),t=document.createElement("div");t.className="w-full md:w-2/3 h-auto mx-auto mt-10 text-center shadow-md flex flex-col justify-center items-center",t.innerHTML='Нажмите на кнопку и начните говорить\n\t\t\t<p>Команды:<br>\n\t\t\t<ul class="list-disc w-10/12 md:w-2/3 m-3">\n\t\t\t<li>"Название продукта" - добавить один продукт</li>\n\t\t\t<li>"Название продукта" + "цифра количества" - добавить несколько<br> Пример: "Банан три"</li>\n\t\t\t<li>"Отмена" - убрать последний элемент</li>\n\t\t\t<li>"Конец" или "Всё" - закончить ввод</li>\n\t\t\t</ul>';var i=document.createElement("div");i.className="w-max h-max mx-auto my-8 px-4 py-4 border rounded-full hover:shadow-lg",i.innerHTML='<img class="w-19" src="'.concat(E,'"/>'),i.onclick=function(e){!function(){var e,t=["Один","Два","Три","Четыре","Пять","Шесть","Семь","Восемь","Девять","Десять","Одиннадцать","Двенадцать","Тринадцать","Четырнадцать","Пятнадцать","Cемнадцать","Восемнадцать","Девятнадцать","Двадцать"];try{e=new webkitSpeechRecognition}catch(t){e=new SpeechRecognition}e.lang="ru-RU",e.interimResults=!1,e.continuous=!0,e.maxAlternatives=1,e.start(),document.getElementById("modal-background").addEventListener("click",(function(){e.stop()})),document.getElementById("close-modal-button").addEventListener("click",(function(){e.stop()})),console.log("Ready to receive a command."),e.onaudiostart=function(){},e.onspeechend=function(){n({state:"off",content:"closed"})},e.onresult=function(i){var o=i.results.length-1,s=i.results[o][0].transcript.trim().split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)}));console.log("res: ",s);for(var a=0;a<s.length;a++)console.log(s[a]),"Конец"==s[a]||"Стоп"==s[a]||"Всё"==s[a]?(e.stop(),console.log("recognition stopped"),n({state:"off",content:"closed"})):t.includes(s[a+1])||Number.isInteger(+s[a+1])?(Number.isInteger(+s[a+1])?r({item:s[a],colv:+s[a+1]}):r({item:s[a],colv:t.indexOf(s[a+1])+1}),a++):r({item:s[a],colv:1})}}()};var s=o();e.append(t),e.append(i),e.append(s)}():"copy"==t.content&&function(e){var t=window.location.origin+window.location.pathname+"?"+e;navigator.clipboard.writeText(t);var n=document.getElementById("modal-main"),r=document.createElement("div");r.className="flex flex-col items-center w-full h-full";var i=document.createElement("div");i.className="flex flex-col justify-center items-center w-full m-10",i.innerHTML='\n\t\t<div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-green-100">\n\t\t\t<svg\n\t\t\tclass="h-9 w-9 text-green-600"\n\t\t\tfill="none"\n\t\t\tstroke="currentColor"\n\t\t\tviewBox="0 0 24 24"\n\t\t\txmlns="http://www.w3.org/2000/svg"\n\t\t\t>\n\t\t\t\t<path\n\t\t\t\t\tstroke-linecap="round"\n\t\t\t\t\tstroke-linejoin="round"\n\t\t\t\t\tstroke-width="2"\n\t\t\t\t\td="M5 13l4 4L19 7"\n\t\t\t\t></path>\n\t\t\t</svg>\n\t\t</div>\n\t\t<h3 class="text-lg leading-6 font-medium text-gray-900 mt-4">Ссылка скопирована!</h3>';var s=document.createElement("input");s.type="text",s.disabled=!0,s.className="w-11/12 md:w-1/2 h-max mt-2 mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-green-500",s.value=t;var a=o();a.classList.add("mt-5"),r.append(i),r.append(s),r.append(a),n.append(r),document.getElementById("modal-background").addEventListener("click",(function(){window.location.href=t})),document.getElementById("close-modal-button").addEventListener("click",(function(){window.location.href=t}))}(t.val)):document.getElementById("modal").classList.add("hidden")})),d.jsxs("div",{className:"absolute flex justify-center hidden inset-0 h-full w-full z-20 ",id:"modal",children:[d.jsx("div",{className:"fixed bg-gray-600 bg-opacity-50 h-full w-full",id:"modal-background",onClick:i}),d.jsx("div",{className:"fixed flex flex-col bg-white w-10/12 md:w-6/12 h-max my-16 md:my-2",id:"modal-main",children:"hello from modal!"})]})}E=o("3qTPU").getBundleURL("gkeC9")+o("gXOAl").resolve("gKWDN");m=o("lhfsu");function k(e){var t=e.state;return m.useEffect((function(){"editor"===t[0]?document.getElementById("head").innerHTML="Редактор листа покупок":document.getElementById("head").innerHTML="Ваш лист покупок"})),d.jsx("header",{children:d.jsx("h1",{id:"head",className:"w-10/12 md:w-max font-medium font-mono text-3xl m-5 text-center",children:"Редактор листа покупок"})})}m=o("lhfsu");function T(e){var t=e.state,n=e.onChange,r=e.onShare,i=e.addOneToggle;m.useEffect((function(){"editor"===t[0]?(document.getElementById("addOrEdit").innerHTML="Добавить продукты",document.getElementById("doneOrShare").innerHTML="Готово"):(document.getElementById("addOrEdit").innerHTML="Редактировать",document.getElementById("doneOrShare").innerHTML="Поделиться",window.scrollTo(0,0))}),[t]);var o="border bg-blue-100 transition-colors hover:bg-blue-300 hover:text-white text-blue-900 text-center py-2 px-4 rounded transition-shadow shadow-md hover:shadow-xl transform transition-transform hover:scale-105";return d.jsxs("div",{className:"w-full md:w-3/6 h-max flex flex-row justify-around items-center m-5",children:[d.jsx("button",{className:o,onClick:function(){if("viewer"===t[0]){var e=t;e[0]="editor",n(u({},e))}else i({item:"",colv:1})},id:"addOrEdit",children:"Добавить продукты"}),d.jsx("button",{className:o,onClick:function(){if("editor"===t[0]){var e={},i={};e[0]="viewer";for(var o=document.getElementsByClassName("list-field"),s=document.getElementsByClassName("list-count"),a=1,l=0;l<o.length;l++){var c=o[l].value,h=+s[l].value;""!=c&&0!=c.length&&(e[a]=c,Number.isInteger(h)&&!Number.isNaN(h)||(h=1),i[a]=h,a+=1)}n(u({},e),u({},i))}else r()},id:"doneOrShare",children:"Сохранить"})]})}
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function I(e,t,n,r){return new(n||(n=Promise))((function(i,o){function s(e){try{l(r.next(e))}catch(e){o(e)}}function a(e){try{l(r.throw(e))}catch(e){o(e)}}function l(e){var t;e.done?i(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}l((r=r.apply(e,t||[])).next())}))}function x(e,t){var n,r,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};function a(o){return function(a){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,r=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o}Object.create;function C(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function _(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=o.next()).done;)s.push(r.value)}catch(e){i={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(i)throw i.error}}return s}function N(e,t,n){if(n||2===arguments.length)for(var r,i=0,o=t.length;i<o;i++)!r&&i in t||(r||(r=Array.prototype.slice.call(t,0,i)),r[i]=t[i]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const A=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=63&i|128):55296==(64512&i)&&r+1<e.length&&56320==(64512&e.charCodeAt(r+1))?(i=65536+((1023&i)<<10)+(1023&e.charCodeAt(++r)),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=63&i|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=63&i|128)}return t};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class D{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),"function"==typeof e&&(this.promise.catch((()=>{})),1===e.length?e(t):e(t,n))}}}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function L(){return"undefined"!=typeof navigator&&"string"==typeof navigator.userAgent?navigator.userAgent:""}function P(){const e="object"==typeof chrome?chrome.runtime:"object"==typeof browser?browser.runtime:void 0;return"object"==typeof e&&void 0!==e.id}function O(){return"object"==typeof indexedDB}function R(){return new Promise(((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var e;t((null===(e=i.error)||void 0===e?void 0:e.message)||"")}}catch(e){t(e)}}))}function M(){return!("undefined"==typeof navigator||!navigator.cookieEnabled)}class F extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name="FirebaseError",Object.setPrototypeOf(this,F.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,U.prototype.create)}}class U{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?function(e,t){return e.replace(V,((e,n)=>{const r=t[n];return null!=r?String(r):`<${n}?>`}))}(i,n):"Error",s=`${this.serviceName}: ${o} (${r}).`;return new F(r,s,n)}}const V=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const n=e[i],o=t[i];if(z(n)&&z(o)){if(!j(n,o))return!1}else if(n!==o)return!1}for(const e of r)if(!n.includes(e))return!1;return!0}function z(e){return null!==e&&"object"==typeof e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(e,t=1e3,n=2){const r=t*Math.pow(n,e),i=Math.round(.5*r*(Math.random()-.5)*2);return Math.min(144e5,r+i)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function q(e){return e&&e._delegate?e._delegate:e}var H=function(){function e(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}return e.prototype.setInstantiationMode=function(e){return this.instantiationMode=e,this},e.prototype.setMultipleInstances=function(e){return this.multipleInstances=e,this},e.prototype.setServiceProps=function(e){return this.serviceProps=e,this},e.prototype.setInstanceCreatedCallback=function(e){return this.onInstanceCreated=e,this},e}(),$="[DEFAULT]",K=function(){function e(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}return e.prototype.get=function(e){var t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){var n=new D;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{var r=this.getOrInitializeService({instanceIdentifier:t});r&&n.resolve(r)}catch(e){}}return this.instancesDeferred.get(t).promise},e.prototype.getImmediate=function(e){var t,n=this.normalizeInstanceIdentifier(null==e?void 0:e.identifier),r=null!==(t=null==e?void 0:e.optional)&&void 0!==t&&t;if(!this.isInitialized(n)&&!this.shouldAutoInitialize()){if(r)return null;throw Error("Service "+this.name+" is not available")}try{return this.getOrInitializeService({instanceIdentifier:n})}catch(e){if(r)return null;throw e}},e.prototype.getComponent=function(){return this.component},e.prototype.setComponent=function(e){var t,n;if(e.name!==this.name)throw Error("Mismatching Component "+e.name+" for Provider "+this.name+".");if(this.component)throw Error("Component for "+this.name+" has already been provided");if(this.component=e,this.shouldAutoInitialize()){if(function(e){return"EAGER"===e.instantiationMode}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e))try{this.getOrInitializeService({instanceIdentifier:$})}catch(e){}try{for(var r=C(this.instancesDeferred.entries()),i=r.next();!i.done;i=r.next()){var o=_(i.value,2),s=o[0],a=o[1],l=this.normalizeInstanceIdentifier(s);try{var u=this.getOrInitializeService({instanceIdentifier:l});a.resolve(u)}catch(e){}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}}},e.prototype.clearInstance=function(e){void 0===e&&(e=$),this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)},e.prototype.delete=function(){return I(this,void 0,void 0,(function(){var e;return x(this,(function(t){switch(t.label){case 0:return e=Array.from(this.instances.values()),[4,Promise.all(N(N([],_(e.filter((function(e){return"INTERNAL"in e})).map((function(e){return e.INTERNAL.delete()})))),_(e.filter((function(e){return"_delete"in e})).map((function(e){return e._delete()})))))];case 1:return t.sent(),[2]}}))}))},e.prototype.isComponentSet=function(){return null!=this.component},e.prototype.isInitialized=function(e){return void 0===e&&(e=$),this.instances.has(e)},e.prototype.getOptions=function(e){return void 0===e&&(e=$),this.instancesOptions.get(e)||{}},e.prototype.initialize=function(e){var t,n;void 0===e&&(e={});var r=e.options,i=void 0===r?{}:r,o=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(o))throw Error(this.name+"("+o+") has already been initialized");if(!this.isComponentSet())throw Error("Component "+this.name+" has not been registered yet");var s=this.getOrInitializeService({instanceIdentifier:o,options:i});try{for(var a=C(this.instancesDeferred.entries()),l=a.next();!l.done;l=a.next()){var u=_(l.value,2),c=u[0],h=u[1];o===this.normalizeInstanceIdentifier(c)&&h.resolve(s)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=a.return)&&n.call(a)}finally{if(t)throw t.error}}return s},e.prototype.onInit=function(e,t){var n,r=this.normalizeInstanceIdentifier(t),i=null!==(n=this.onInitCallbacks.get(r))&&void 0!==n?n:new Set;i.add(e),this.onInitCallbacks.set(r,i);var o=this.instances.get(r);return o&&e(o,r),function(){i.delete(e)}},e.prototype.invokeOnInitCallbacks=function(e,t){var n,r,i=this.onInitCallbacks.get(t);if(i)try{for(var o=C(i),s=o.next();!s.done;s=o.next()){var a=s.value;try{a(e,t)}catch(e){}}}catch(e){n={error:e}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}},e.prototype.getOrInitializeService=function(e){var t,n=e.instanceIdentifier,r=e.options,i=void 0===r?{}:r,o=this.instances.get(n);if(!o&&this.component&&(o=this.component.instanceFactory(this.container,{instanceIdentifier:(t=n,t===$?void 0:t),options:i}),this.instances.set(n,o),this.instancesOptions.set(n,i),this.invokeOnInitCallbacks(o,n),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,n,o)}catch(e){}return o||null},e.prototype.normalizeInstanceIdentifier=function(e){return void 0===e&&(e=$),this.component?this.component.multipleInstances?e:$:e},e.prototype.shouldAutoInitialize=function(){return!!this.component&&"EXPLICIT"!==this.component.instantiationMode},e}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var G=function(){function e(e){this.name=e,this.providers=new Map}return e.prototype.addComponent=function(e){var t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component "+e.name+" has already been registered with "+this.name);t.setComponent(e)},e.prototype.addOrOverwriteComponent=function(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)},e.prototype.getProvider=function(e){if(this.providers.has(e))return this.providers.get(e);var t=new K(e,this);return this.providers.set(e,t),t},e.prototype.getProviders=function(){return Array.from(this.providers.values())},e}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W=[];var Q,X;(X=Q||(Q={}))[X.DEBUG=0]="DEBUG",X[X.VERBOSE=1]="VERBOSE",X[X.INFO=2]="INFO",X[X.WARN=3]="WARN",X[X.ERROR=4]="ERROR",X[X.SILENT=5]="SILENT";const Y={debug:Q.DEBUG,verbose:Q.VERBOSE,info:Q.INFO,warn:Q.WARN,error:Q.ERROR,silent:Q.SILENT},J=Q.INFO,Z={[Q.DEBUG]:"log",[Q.VERBOSE]:"log",[Q.INFO]:"info",[Q.WARN]:"warn",[Q.ERROR]:"error"},ee=(e,t,...n)=>{if(t<e.logLevel)return;const r=(new Date).toISOString(),i=Z[t];if(!i)throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`);console[i](`[${r}]  ${e.name}:`,...n)};class te{constructor(e){this.name=e,this._logLevel=J,this._logHandler=ee,this._userLogHandler=null,W.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Q))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel="string"==typeof e?Y[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if("function"!=typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Q.DEBUG,...e),this._logHandler(this,Q.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Q.VERBOSE,...e),this._logHandler(this,Q.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Q.INFO,...e),this._logHandler(this,Q.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Q.WARN,...e),this._logHandler(this,Q.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Q.ERROR,...e),this._logHandler(this,Q.ERROR,...e)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ne{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map((e=>{if(function(e){const t=e.getComponent();return"VERSION"===(null==t?void 0:t.type)}(e)){const t=e.getImmediate();return`${t.library}/${t.version}`}return null})).filter((e=>e)).join(" ")}}const re="@firebase/app",ie="0.7.4",oe=new te("@firebase/app"),se="[DEFAULT]",ae={[re]:"fire-core","@firebase/app-compat":"fire-core-compat","@firebase/analytics":"fire-analytics","@firebase/analytics-compat":"fire-analytics-compat","@firebase/app-check":"fire-app-check","@firebase/app-check-compat":"fire-app-check-compat","@firebase/auth":"fire-auth","@firebase/auth-compat":"fire-auth-compat","@firebase/database":"fire-rtdb","@firebase/database-compat":"fire-rtdb-compat","@firebase/functions":"fire-fn","@firebase/functions-compat":"fire-fn-compat","@firebase/installations":"fire-iid","@firebase/installations-compat":"fire-iid-compat","@firebase/messaging":"fire-fcm","@firebase/messaging-compat":"fire-fcm-compat","@firebase/performance":"fire-perf","@firebase/performance-compat":"fire-perf-compat","@firebase/remote-config":"fire-rc","@firebase/remote-config-compat":"fire-rc-compat","@firebase/storage":"fire-gcs","@firebase/storage-compat":"fire-gcs-compat","@firebase/firestore":"fire-fst","@firebase/firestore-compat":"fire-fst-compat","fire-js":"fire-js",firebase:"fire-js-all"},le=new Map,ue=new Map;function ce(e,t){try{e.container.addComponent(t)}catch(n){oe.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function he(e){const t=e.name;if(ue.has(t))return oe.debug(`There were multiple attempts to register component ${t}.`),!1;ue.set(t,e);for(const t of le.values())ce(t,e);return!0}function fe(e,t){return e.container.getProvider(t)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const de=new U("app","Firebase",{"no-app":"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function."});
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pe{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new H("app",(()=>this),"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw de.create("app-deleted",{appName:this._name})}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(e="[DEFAULT]"){const t=le.get(e);if(!t)throw de.create("no-app",{appName:e});return t}function ge(e,t,n){var r;let i=null!==(r=ae[e])&&void 0!==r?r:e;n&&(i+=`-${n}`);const o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){const e=[`Unable to register library "${i}" with version "${t}":`];return o&&e.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&e.push("and"),s&&e.push(`version name "${t}" contains illegal characters (whitespace or "/")`),void oe.warn(e.join(" "))}he(new H(`${i}-version`,(()=>({library:i,version:t})),"VERSION"))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var ye;ye="",he(new H("platform-logger",(e=>new ne(e)),"PRIVATE")),ge(re,ie,ye),ge(re,ie,"esm2017"),ge("fire-js","");
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
ge("firebase","9.1.3","app");var ve={};!function(e,t){"object"==typeof ve?t(ve):"function"==typeof define&&define.amd?define(["exports"],t):t((e=e||self).idb={})}(ve,(function(e){"use strict";function t(e){return Array.prototype.slice.call(e)}function n(e){return new Promise((function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function r(e,t,r){var i,o=new Promise((function(o,s){n(i=e[t].apply(e,r)).then(o,s)}));return o.request=i,o}function i(e,t,n){var i=r(e,t,n);return i.then((function(e){if(e)return new c(e,i.request)}))}function o(e,t,n){n.forEach((function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})}))}function s(e,t,n,i){i.forEach((function(i){i in n.prototype&&(e.prototype[i]=function(){return r(this[t],i,arguments)})}))}function a(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return this[t][r].apply(this[t],arguments)})}))}function l(e,t,n,r){r.forEach((function(r){r in n.prototype&&(e.prototype[r]=function(){return i(this[t],r,arguments)})}))}function u(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function h(e){this._store=e}function f(e){this._tx=e,this.complete=new Promise((function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}}))}function d(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new f(n)}function p(e){this._db=e}o(u,"_index",["name","keyPath","multiEntry","unique"]),s(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),l(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),o(c,"_cursor",["direction","key","primaryKey","value"]),s(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach((function(e){e in IDBCursor.prototype&&(c.prototype[e]=function(){var t=this,r=arguments;return Promise.resolve().then((function(){return t._cursor[e].apply(t._cursor,r),n(t._request).then((function(e){if(e)return new c(e,t._request)}))}))})})),h.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},h.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},o(h,"_store",["name","keyPath","indexNames","autoIncrement"]),s(h,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),l(h,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),a(h,"_store",IDBObjectStore,["deleteIndex"]),f.prototype.objectStore=function(){return new h(this._tx.objectStore.apply(this._tx,arguments))},o(f,"_tx",["objectStoreNames","mode"]),a(f,"_tx",IDBTransaction,["abort"]),d.prototype.createObjectStore=function(){return new h(this._db.createObjectStore.apply(this._db,arguments))},o(d,"_db",["name","version","objectStoreNames"]),a(d,"_db",IDBDatabase,["deleteObjectStore","close"]),p.prototype.transaction=function(){return new f(this._db.transaction.apply(this._db,arguments))},o(p,"_db",["name","version","objectStoreNames"]),a(p,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach((function(e){[h,u].forEach((function(n){e in n.prototype&&(n.prototype[e.replace("open","iterate")]=function(){var n=t(arguments),r=n[n.length-1],i=this._store||this._index,o=i[e].apply(i,n.slice(0,-1));o.onsuccess=function(){r(o.result)}})}))})),[u,h].forEach((function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,r=[];return new Promise((function(i){n.iterateCursor(e,(function(e){e?(r.push(e.value),void 0===t||r.length!=t?e.continue():i(r)):i(r)}))}))})})),e.openDb=function(e,t,n){var i=r(indexedDB,"open",[e,t]),o=i.request;return o&&(o.onupgradeneeded=function(e){n&&n(new d(o.result,e.oldVersion,o.transaction))}),i.then((function(e){return new p(e)}))},e.deleteDb=function(e){return r(indexedDB,"deleteDatabase",[e])},Object.defineProperty(e,"__esModule",{value:!0})}));const we="@firebase/installations",be="0.5.2",Ee=1e4,Se="w:0.5.2",ke="FIS_v2",Te=36e5,Ie=new U("installations","Installations",{"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."});function xe(e){return e instanceof F&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ce({projectId:e}){return`https://firebaseinstallations.googleapis.com/v1/projects/${e}/installations`}function _e(e){return{token:e.token,requestStatus:2,expiresIn:(t=e.expiresIn,Number(t.replace("s","000"))),creationTime:Date.now()};var t}async function Ne(e,t){const n=(await t.json()).error;return Ie.create("request-failed",{requestName:e,serverCode:n.code,serverMessage:n.message,serverStatus:n.status})}function Ae({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function De(e,{refreshToken:t}){const n=Ae(e);return n.append("Authorization",function(e){return`FIS_v2 ${e}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t)),n}async function Le(e){const t=await e();return t.status>=500&&t.status<600?e():t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(e){return new Promise((t=>{setTimeout(t,e)}))}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Oe=/^[cdef][\w-]{21}$/;function Re(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const t=function(e){return(t=e,btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")).substr(0,22);var t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e);return Oe.test(t)?t:""}catch(e){return""}}function Me(e){return`${e.appName}!${e.appId}`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fe=new Map;function Ue(e,t){const n=Me(e);Ve(n,t),function(e,t){const n=ze();n&&n.postMessage({key:e,fid:t});Be()}(n,t)}function Ve(e,t){const n=Fe.get(e);if(n)for(const e of n)e(t)}let je=null;function ze(){return!je&&"BroadcastChannel"in self&&(je=new BroadcastChannel("[Firebase] FID Change"),je.onmessage=e=>{Ve(e.data.key,e.data.fid)}),je}function Be(){0===Fe.size&&je&&(je.close(),je=null)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qe="firebase-installations-store";let He=null;function $e(){return He||(He=ve.openDb("firebase-installations-database",1,(e=>{if(0===e.oldVersion)e.createObjectStore(qe)}))),He}async function Ke(e,t){const n=Me(e),r=(await $e()).transaction(qe,"readwrite"),i=r.objectStore(qe),o=await i.get(n);return await i.put(t,n),await r.complete,o&&o.fid===t.fid||Ue(e,t.fid),t}async function Ge(e){const t=Me(e),n=(await $e()).transaction(qe,"readwrite");await n.objectStore(qe).delete(t),await n.complete}async function We(e,t){const n=Me(e),r=(await $e()).transaction(qe,"readwrite"),i=r.objectStore(qe),o=await i.get(n),s=t(o);return void 0===s?await i.delete(n):await i.put(s,n),await r.complete,!s||o&&o.fid===s.fid||Ue(e,s.fid),s}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qe(e){let t;const n=await We(e,(n=>{const r=function(e){return Je(e||{fid:Re(),registrationStatus:0})}(n),i=function(e,t){if(0===t.registrationStatus){if(!navigator.onLine){return{installationEntry:t,registrationPromise:Promise.reject(Ie.create("app-offline"))}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=async function(e,t){try{const n=await async function(e,{fid:t}){const n=Ce(e),r=Ae(e),i={fid:t,authVersion:ke,appId:e.appId,sdkVersion:Se},o={method:"POST",headers:r,body:JSON.stringify(i)},s=await Le((()=>fetch(n,o)));if(s.ok){const e=await s.json();return{fid:e.fid||t,registrationStatus:2,refreshToken:e.refreshToken,authToken:_e(e.authToken)}}throw await Ne("Create Installation",s)}(e,t);return Ke(e,n)}catch(n){throw xe(n)&&409===n.customData.serverCode?await Ge(e):await Ke(e,{fid:t.fid,registrationStatus:0}),n}}(e,n);return{installationEntry:n,registrationPromise:r}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:Xe(e)}:{installationEntry:t}}(e,r);return t=i.registrationPromise,i.installationEntry}));return""===n.fid?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}async function Xe(e){let t=await Ye(e);for(;1===t.registrationStatus;)await Pe(100),t=await Ye(e);if(0===t.registrationStatus){const{installationEntry:t,registrationPromise:n}=await Qe(e);return n||t}return t}function Ye(e){return We(e,(e=>{if(!e)throw Ie.create("installation-not-found");return Je(e)}))}function Je(e){return 1===(t=e).registrationStatus&&t.registrationTime+Ee<Date.now()?{fid:e.fid,registrationStatus:0}:e;var t;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}async function Ze({appConfig:e,platformLoggerProvider:t},n){const r=function(e,{fid:t}){return`${Ce(e)}/${t}/authTokens:generate`}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(e,n),i=De(e,n),o=t.getImmediate({optional:!0});o&&i.append("x-firebase-client",o.getPlatformInfoString());const s={installation:{sdkVersion:Se}},a={method:"POST",headers:i,body:JSON.stringify(s)},l=await Le((()=>fetch(r,a)));if(l.ok){return _e(await l.json())}throw await Ne("Generate Auth Token",l)}async function et(e,t=!1){let n;const r=await We(e.appConfig,(r=>{if(!nt(r))throw Ie.create("not-registered");const i=r.authToken;if(!t&&function(e){return 2===e.requestStatus&&!function(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Te}(e)}(i))return r;if(1===i.requestStatus)return n=async function(e,t){let n=await tt(e.appConfig);for(;1===n.authToken.requestStatus;)await Pe(100),n=await tt(e.appConfig);const r=n.authToken;return 0===r.requestStatus?et(e,t):r}(e,t),r;{if(!navigator.onLine)throw Ie.create("app-offline");const t=function(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}(r);return n=async function(e,t){try{const n=await Ze(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await Ke(e.appConfig,r),n}catch(n){if(!xe(n)||401!==n.customData.serverCode&&404!==n.customData.serverCode){const n=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await Ke(e.appConfig,n)}else await Ge(e.appConfig);throw n}}(e,t),t}}));return n?await n:r.authToken}function tt(e){return We(e,(e=>{if(!nt(e))throw Ie.create("not-registered");const t=e.authToken;return 1===(n=t).requestStatus&&n.requestTime+Ee<Date.now()?Object.assign(Object.assign({},e),{authToken:{requestStatus:0}}):e;var n;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}))}function nt(e){return void 0!==e&&2===e.registrationStatus}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function rt(e,t=!1){const n=e;await async function(e){const{registrationPromise:t}=await Qe(e);t&&await t}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(n.appConfig);return(await et(n,t)).token}function it(e){return Ie.create("missing-app-config-values",{valueName:e})}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ot="installations",st=e=>{const t=fe(e.getProvider("app").getImmediate(),ot).getImmediate();return{getId:()=>async function(e){const t=e,{installationEntry:n,registrationPromise:r}=await Qe(t.appConfig);return r?r.catch(console.error):et(t).catch(console.error),n.fid}(t),getToken:e=>rt(t,e)}};he(new H(ot,(e=>{const t=e.getProvider("app").getImmediate(),n=
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function(e){if(!e||!e.options)throw it("App Configuration");if(!e.name)throw it("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw it(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}(t);return{app:t,appConfig:n,platformLoggerProvider:fe(t,"platform-logger"),_delete:()=>Promise.resolve()}}),"PUBLIC")),he(new H("installations-internal",st,"PRIVATE")),ge(we,be),ge(we,be,"esm2017");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const at="analytics",lt="https://www.googletagmanager.com/gtag/js",ut=new te("@firebase/analytics");
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ct(e){return Promise.all(e.map((e=>e.catch((e=>e)))))}function ht(e,t,n,r){return async function(i,o,s){try{"event"===i?await async function(e,t,n,r,i){try{let o=[];if(i&&i.send_to){let e=i.send_to;Array.isArray(e)||(e=[e]);const r=await ct(n);for(const n of e){const e=r.find((e=>e.measurementId===n)),i=e&&t[e.appId];if(!i){o=[];break}o.push(i)}}0===o.length&&(o=Object.values(t)),await Promise.all(o),e("event",r,i||{})}catch(e){ut.error(e)}}(e,t,n,o,s):"config"===i?await async function(e,t,n,r,i,o){const s=r[i];try{if(s)await t[s];else{const e=(await ct(n)).find((e=>e.measurementId===i));e&&await t[e.appId]}}catch(e){ut.error(e)}e("config",i,o)}(e,t,n,r,o,s):e("set",o)}catch(e){ut.error(e)}}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ft=new U("analytics","Analytics",{"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-intialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.'});const dt=new class{constructor(e={},t=1e3){this.throttleMetadata=e,this.intervalMillis=t}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,t){this.throttleMetadata[e]=t}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}};function pt(e){return new Headers({Accept:"application/json","x-goog-api-key":e})}async function mt(e,t=dt,n){const{appId:r,apiKey:i,measurementId:o}=e.options;if(!r)throw ft.create("no-app-id");if(!i){if(o)return{measurementId:o,appId:r};throw ft.create("no-api-key")}const s=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},a=new yt;return setTimeout((async()=>{a.abort()}),void 0!==n?n:6e4),gt({appId:r,apiKey:i,measurementId:o},s,a,t)}async function gt(e,{throttleEndTimeMillis:t,backoffCount:n},r,i=dt){const{appId:o,measurementId:s}=e;try{await function(e,t){return new Promise(((n,r)=>{const i=Math.max(t-Date.now(),0),o=setTimeout(n,i);e.addEventListener((()=>{clearTimeout(o),r(ft.create("fetch-throttle",{throttleEndTimeMillis:t}))}))}))}(r,t)}catch(e){if(s)return ut.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${e.message}]`),{appId:o,measurementId:s};throw e}try{const t=await async function(e){var t;const{appId:n,apiKey:r}=e,i={method:"GET",headers:pt(r)},o="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}",n),s=await fetch(o,i);if(200!==s.status&&304!==s.status){let e="";try{const n=await s.json();(null===(t=n.error)||void 0===t?void 0:t.message)&&(e=n.error.message)}catch(e){}throw ft.create("config-fetch-failed",{httpStatus:s.status,responseMessage:e})}return s.json()}(e);return i.deleteThrottleMetadata(o),t}catch(t){if(!function(e){if(!(e instanceof F&&e.customData))return!1;const t=Number(e.customData.httpStatus);return 429===t||500===t||503===t||504===t}(t)){if(i.deleteThrottleMetadata(o),s)return ut.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${s} provided in the "measurementId" field in the local Firebase config. [${t.message}]`),{appId:o,measurementId:s};throw t}const a=503===Number(t.customData.httpStatus)?B(n,i.intervalMillis,30):B(n,i.intervalMillis),l={throttleEndTimeMillis:Date.now()+a,backoffCount:n+1};return i.setThrottleMetadata(o,l),ut.debug(`Calling attemptFetch again in ${a} millis`),gt(e,l,r,i)}}class yt{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vt(e,t,n,r,i,o,s){var a;const l=mt(e);l.then((t=>{n[t.measurementId]=t.appId,e.options.measurementId&&t.measurementId!==e.options.measurementId&&ut.warn(`The measurement ID in the local Firebase config (${e.options.measurementId}) does not match the measurement ID fetched from the server (${t.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)})).catch((e=>ut.error(e))),t.push(l);const u=async function(){if(!O())return ut.warn(ft.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;try{await R()}catch(e){return ut.warn(ft.create("indexeddb-unavailable",{errorInfo:e}).message),!1}return!0}().then((e=>e?r.getId():void 0)),[c,h]=await Promise.all([l,u]);(function(){const e=window.document.getElementsByTagName("script");for(const t of Object.values(e))if(t.src&&t.src.includes(lt))return t;return null})()||function(e,t){const n=document.createElement("script");n.src=`${lt}?l=${e}&id=${t}`,n.async=!0,document.head.appendChild(n)}(o,c.measurementId),i("js",new Date);const f=null!==(a=null==s?void 0:s.config)&&void 0!==a?a:{};return f.origin="firebase",f.update=!0,null!=h&&(f.firebase_id=h),i("config",c.measurementId,f),c.measurementId}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e){this.app=e}_delete(){return delete bt[this.app.options.appId],Promise.resolve()}}let bt={},Et=[];const St={};let kt,Tt,It="dataLayer",xt="gtag",Ct=!1;function _t(e,t,n){!function(){const e=[];if(P()&&e.push("This is a browser extension environment."),M()||e.push("Cookies are not available."),e.length>0){const t=e.map(((e,t)=>`(${t+1}) ${e}`)).join(" "),n=ft.create("invalid-analytics-context",{errorInfo:t});ut.warn(n.message)}}();const r=e.options.appId;if(!r)throw ft.create("no-app-id");if(!e.options.apiKey){if(!e.options.measurementId)throw ft.create("no-api-key");ut.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${e.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)}if(null!=bt[r])throw ft.create("already-exists",{id:r});if(!Ct){!function(e){let t=[];Array.isArray(window[e])?t=window[e]:window[e]=t}(It);const{wrappedGtag:e,gtagCore:t}=function(e,t,n,r,i){let o=function(...e){window[r].push(arguments)};return window[i]&&"function"==typeof window[i]&&(o=window[i]),window[i]=ht(o,e,t,n),{gtagCore:o,wrappedGtag:window[i]}}(bt,Et,St,It,xt);Tt=e,kt=t,Ct=!0}bt[r]=vt(e,Et,St,t,kt,It,n);return new wt(e)}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nt(e,t,n,r){e=q(e),async function(e,t,n,r,i){if(i&&i.global)e("event",n,r);else{const i=await t;e("event",n,Object.assign(Object.assign({},r),{send_to:i}))}}(Tt,bt[e.app.options.appId],t,n,r).catch((e=>ut.error(e)))}const At="@firebase/analytics",Dt="0.7.2";he(new H(at,((e,{options:t})=>_t(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),t)),"PUBLIC")),he(new H("analytics-internal",(function(e){try{const t=e.getProvider(at).getImmediate();return{logEvent:(e,n,r)=>Nt(t,e,n,r)}}catch(e){throw ft.create("interop-component-reg-failed",{reason:e})}}),"PRIVATE")),ge(At,Dt),ge(At,Dt,"esm2017");var Lt,Pt="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n?n:"undefined"!=typeof self?self:{},Ot={},Rt=Rt||{},Mt=Pt||self;function Ft(){}function Ut(e){var t=typeof e;return"array"==(t="object"!=t?t:e?Array.isArray(e)?"array":t:"null")||"object"==t&&"number"==typeof e.length}function Vt(e){var t=typeof e;return"object"==t&&null!=e||"function"==t}var jt="closure_uid_"+(1e9*Math.random()>>>0),zt=0;function Bt(e,t,n){return e.call.apply(e.bind,arguments)}function qt(e,t,n){if(!e)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var n=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(n,r),e.apply(t,n)}}return function(){return e.apply(t,arguments)}}function Ht(e,t,n){return(Ht=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?Bt:qt).apply(null,arguments)}function $t(e,t){var n=Array.prototype.slice.call(arguments,1);return function(){var t=n.slice();return t.push.apply(t,arguments),e.apply(this,t)}}function Kt(e,t){function n(){}n.prototype=t.prototype,e.Z=t.prototype,e.prototype=new n,e.prototype.constructor=e,e.Vb=function(e,n,r){for(var i=Array(arguments.length-2),o=2;o<arguments.length;o++)i[o-2]=arguments[o];return t.prototype[n].apply(e,i)}}function Gt(){this.s=this.s,this.o=this.o}var Wt={};Gt.prototype.s=!1,Gt.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),0)){var e=function(e){return Object.prototype.hasOwnProperty.call(e,jt)&&e[jt]||(e[jt]=++zt)}(this);delete Wt[e]}},Gt.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Qt=Array.prototype.indexOf?function(e,t){return Array.prototype.indexOf.call(e,t,void 0)}:function(e,t){if("string"==typeof e)return"string"!=typeof t||1!=t.length?-1:e.indexOf(t,0);for(let n=0;n<e.length;n++)if(n in e&&e[n]===t)return n;return-1},Xt=Array.prototype.forEach?function(e,t,n){Array.prototype.forEach.call(e,t,n)}:function(e,t,n){const r=e.length,i="string"==typeof e?e.split(""):e;for(let o=0;o<r;o++)o in i&&t.call(n,i[o],o,e)};function Yt(e){return Array.prototype.concat.apply([],arguments)}function Jt(e){const t=e.length;if(0<t){const n=Array(t);for(let r=0;r<t;r++)n[r]=e[r];return n}return[]}function Zt(e){return/^[\s\xa0]*$/.test(e)}var en,tn=String.prototype.trim?function(e){return e.trim()}:function(e){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(e)[1]};function nn(e,t){return-1!=e.indexOf(t)}function rn(e,t){return e<t?-1:e>t?1:0}e:{var on=Mt.navigator;if(on){var sn=on.userAgent;if(sn){en=sn;break e}}en=""}function an(e,t,n){for(const r in e)t.call(n,e[r],r,e)}function ln(e){const t={};for(const n in e)t[n]=e[n];return t}var un="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function cn(e,t){let n,r;for(let t=1;t<arguments.length;t++){for(n in r=arguments[t],r)e[n]=r[n];for(let t=0;t<un.length;t++)n=un[t],Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}}function hn(e){return hn[" "](e),e}hn[" "]=Ft;var fn,dn,pn=nn(en,"Opera"),mn=nn(en,"Trident")||nn(en,"MSIE"),gn=nn(en,"Edge"),yn=gn||mn,vn=nn(en,"Gecko")&&!(nn(en.toLowerCase(),"webkit")&&!nn(en,"Edge"))&&!(nn(en,"Trident")||nn(en,"MSIE"))&&!nn(en,"Edge"),wn=nn(en.toLowerCase(),"webkit")&&!nn(en,"Edge");function bn(){var e=Mt.document;return e?e.documentMode:void 0}e:{var En="",Sn=(dn=en,vn?/rv:([^\);]+)(\)|;)/.exec(dn):gn?/Edge\/([\d\.]+)/.exec(dn):mn?/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(dn):wn?/WebKit\/(\S+)/.exec(dn):pn?/(?:Version)[ \/]?(\S+)/.exec(dn):void 0);if(Sn&&(En=Sn?Sn[1]:""),mn){var kn=bn();if(null!=kn&&kn>parseFloat(En)){fn=String(kn);break e}}fn=En}var Tn,In={};function xn(){return function(e){var t=In;return Object.prototype.hasOwnProperty.call(t,9)?t[9]:t[9]=e(9)}((function(){let e=0;const t=tn(String(fn)).split("."),n=tn("9").split("."),r=Math.max(t.length,n.length);for(let s=0;0==e&&s<r;s++){var i=t[s]||"",o=n[s]||"";do{if(i=/(\d*)(\D*)(.*)/.exec(i)||["","","",""],o=/(\d*)(\D*)(.*)/.exec(o)||["","","",""],0==i[0].length&&0==o[0].length)break;e=rn(0==i[1].length?0:parseInt(i[1],10),0==o[1].length?0:parseInt(o[1],10))||rn(0==i[2].length,0==o[2].length)||rn(i[2],o[2]),i=i[3],o=o[3]}while(0==e)}return 0<=e}))}if(Mt.document&&mn){var Cn=bn();Tn=Cn||(parseInt(fn,10)||void 0)}else Tn=void 0;var _n=Tn,Nn=function(){if(!Mt.addEventListener||!Object.defineProperty)return!1;var e=!1,t=Object.defineProperty({},"passive",{get:function(){e=!0}});try{Mt.addEventListener("test",Ft,t),Mt.removeEventListener("test",Ft,t)}catch(e){}return e}();function An(e,t){this.type=e,this.g=this.target=t,this.defaultPrevented=!1}function Dn(e,t){if(An.call(this,e?e.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,e){var n=this.type=e.type,r=e.changedTouches&&e.changedTouches.length?e.changedTouches[0]:null;if(this.target=e.target||e.srcElement,this.g=t,t=e.relatedTarget){if(vn){e:{try{hn(t.nodeName);var i=!0;break e}catch(e){}i=!1}i||(t=null)}}else"mouseover"==n?t=e.fromElement:"mouseout"==n&&(t=e.toElement);this.relatedTarget=t,r?(this.clientX=void 0!==r.clientX?r.clientX:r.pageX,this.clientY=void 0!==r.clientY?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0),this.button=e.button,this.key=e.key||"",this.ctrlKey=e.ctrlKey,this.altKey=e.altKey,this.shiftKey=e.shiftKey,this.metaKey=e.metaKey,this.pointerId=e.pointerId||0,this.pointerType="string"==typeof e.pointerType?e.pointerType:Ln[e.pointerType]||"",this.state=e.state,this.i=e,e.defaultPrevented&&Dn.Z.h.call(this)}}An.prototype.h=function(){this.defaultPrevented=!0},Kt(Dn,An);var Ln={2:"touch",3:"pen",4:"mouse"};Dn.prototype.h=function(){Dn.Z.h.call(this);var e=this.i;e.preventDefault?e.preventDefault():e.returnValue=!1};var Pn="closure_listenable_"+(1e6*Math.random()|0),On=0;function Rn(e,t,n,r,i){this.listener=e,this.proxy=null,this.src=t,this.type=n,this.capture=!!r,this.ia=i,this.key=++On,this.ca=this.fa=!1}function Mn(e){e.ca=!0,e.listener=null,e.proxy=null,e.src=null,e.ia=null}function Fn(e){this.src=e,this.g={},this.h=0}function Un(e,t){var n=t.type;if(n in e.g){var r,i=e.g[n],o=Qt(i,t);(r=0<=o)&&Array.prototype.splice.call(i,o,1),r&&(Mn(t),0==e.g[n].length&&(delete e.g[n],e.h--))}}function Vn(e,t,n,r){for(var i=0;i<e.length;++i){var o=e[i];if(!o.ca&&o.listener==t&&o.capture==!!n&&o.ia==r)return i}return-1}Fn.prototype.add=function(e,t,n,r,i){var o=e.toString();(e=this.g[o])||(e=this.g[o]=[],this.h++);var s=Vn(e,t,r,i);return-1<s?(t=e[s],n||(t.fa=!1)):((t=new Rn(t,this.src,o,!!r,i)).fa=n,e.push(t)),t};var jn="closure_lm_"+(1e6*Math.random()|0),zn={};function Bn(e,t,n,r,i){if(r&&r.once)return Hn(e,t,n,r,i);if(Array.isArray(t)){for(var o=0;o<t.length;o++)Bn(e,t[o],n,r,i);return null}return n=Yn(n),e&&e[Pn]?e.N(t,n,Vt(r)?!!r.capture:!!r,i):qn(e,t,n,!1,r,i)}function qn(e,t,n,r,i,o){if(!t)throw Error("Invalid event type");var s=Vt(i)?!!i.capture:!!i,a=Qn(e);if(a||(e[jn]=a=new Fn(e)),(n=a.add(t,n,r,s,o)).proxy)return n;if(r=function(){function e(n){return t.call(e.src,e.listener,n)}var t=Wn;return e}(),n.proxy=r,r.src=e,r.listener=n,e.addEventListener)Nn||(i=s),void 0===i&&(i=!1),e.addEventListener(t.toString(),r,i);else if(e.attachEvent)e.attachEvent(Gn(t.toString()),r);else{if(!e.addListener||!e.removeListener)throw Error("addEventListener and attachEvent are unavailable.");e.addListener(r)}return n}function Hn(e,t,n,r,i){if(Array.isArray(t)){for(var o=0;o<t.length;o++)Hn(e,t[o],n,r,i);return null}return n=Yn(n),e&&e[Pn]?e.O(t,n,Vt(r)?!!r.capture:!!r,i):qn(e,t,n,!0,r,i)}function $n(e,t,n,r,i){if(Array.isArray(t))for(var o=0;o<t.length;o++)$n(e,t[o],n,r,i);else r=Vt(r)?!!r.capture:!!r,n=Yn(n),e&&e[Pn]?(e=e.i,(t=String(t).toString())in e.g&&(-1<(n=Vn(o=e.g[t],n,r,i))&&(Mn(o[n]),Array.prototype.splice.call(o,n,1),0==o.length&&(delete e.g[t],e.h--)))):e&&(e=Qn(e))&&(t=e.g[t.toString()],e=-1,t&&(e=Vn(t,n,r,i)),(n=-1<e?t[e]:null)&&Kn(n))}function Kn(e){if("number"!=typeof e&&e&&!e.ca){var t=e.src;if(t&&t[Pn])Un(t.i,e);else{var n=e.type,r=e.proxy;t.removeEventListener?t.removeEventListener(n,r,e.capture):t.detachEvent?t.detachEvent(Gn(n),r):t.addListener&&t.removeListener&&t.removeListener(r),(n=Qn(t))?(Un(n,e),0==n.h&&(n.src=null,t[jn]=null)):Mn(e)}}}function Gn(e){return e in zn?zn[e]:zn[e]="on"+e}function Wn(e,t){if(e.ca)e=!0;else{t=new Dn(t,this);var n=e.listener,r=e.ia||e.src;e.fa&&Kn(e),e=n.call(r,t)}return e}function Qn(e){return(e=e[jn])instanceof Fn?e:null}var Xn="__closure_events_fn_"+(1e9*Math.random()>>>0);function Yn(e){return"function"==typeof e?e:(e[Xn]||(e[Xn]=function(t){return e.handleEvent(t)}),e[Xn])}function Jn(){Gt.call(this),this.i=new Fn(this),this.P=this,this.I=null}function Zn(e,t){var n,r=e.I;if(r)for(n=[];r;r=r.I)n.push(r);if(e=e.P,r=t.type||t,"string"==typeof t)t=new An(t,e);else if(t instanceof An)t.target=t.target||e;else{var i=t;cn(t=new An(r,e),i)}if(i=!0,n)for(var o=n.length-1;0<=o;o--){var s=t.g=n[o];i=er(s,r,!0,t)&&i}if(i=er(s=t.g=e,r,!0,t)&&i,i=er(s,r,!1,t)&&i,n)for(o=0;o<n.length;o++)i=er(s=t.g=n[o],r,!1,t)&&i}function er(e,t,n,r){if(!(t=e.i.g[String(t)]))return!0;t=t.concat();for(var i=!0,o=0;o<t.length;++o){var s=t[o];if(s&&!s.ca&&s.capture==n){var a=s.listener,l=s.ia||s.src;s.fa&&Un(e.i,s),i=!1!==a.call(l,r)&&i}}return i&&!r.defaultPrevented}Kt(Jn,Gt),Jn.prototype[Pn]=!0,Jn.prototype.removeEventListener=function(e,t,n,r){$n(this,e,t,n,r)},Jn.prototype.M=function(){if(Jn.Z.M.call(this),this.i){var e,t=this.i;for(e in t.g){for(var n=t.g[e],r=0;r<n.length;r++)Mn(n[r]);delete t.g[e],t.h--}}this.I=null},Jn.prototype.N=function(e,t,n,r){return this.i.add(String(e),t,!1,n,r)},Jn.prototype.O=function(e,t,n,r){return this.i.add(String(e),t,!0,n,r)};var tr=Mt.JSON.stringify;function nr(){var e=ur;let t=null;return e.g&&(t=e.g,e.g=e.g.next,e.g||(e.h=null),t.next=null),t}var rr,ir=new class{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}((()=>new or),(e=>e.reset()));class or{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function sr(e){Mt.setTimeout((()=>{throw e}),0)}function ar(e,t){rr||function(){var e=Mt.Promise.resolve(void 0);rr=function(){e.then(cr)}}(),lr||(rr(),lr=!0),ur.add(e,t)}var lr=!1,ur=new class{constructor(){this.h=this.g=null}add(e,t){const n=ir.get();n.set(e,t),this.h?this.h.next=n:this.g=n,this.h=n}};function cr(){for(var e;e=nr();){try{e.h.call(e.g)}catch(e){sr(e)}var t=ir;t.j(e),100>t.h&&(t.h++,e.next=t.g,t.g=e)}lr=!1}function hr(e,t){Jn.call(this),this.h=e||1,this.g=t||Mt,this.j=Ht(this.kb,this),this.l=Date.now()}function fr(e){e.da=!1,e.S&&(e.g.clearTimeout(e.S),e.S=null)}function dr(e,t,n){if("function"==typeof e)n&&(e=Ht(e,n));else{if(!e||"function"!=typeof e.handleEvent)throw Error("Invalid listener argument");e=Ht(e.handleEvent,e)}return 2147483647<Number(t)?-1:Mt.setTimeout(e,t||0)}function pr(e){e.g=dr((()=>{e.g=null,e.i&&(e.i=!1,pr(e))}),e.j);const t=e.h;e.h=null,e.m.apply(null,t)}Kt(hr,Jn),(Lt=hr.prototype).da=!1,Lt.S=null,Lt.kb=function(){if(this.da){var e=Date.now()-this.l;0<e&&e<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-e):(this.S&&(this.g.clearTimeout(this.S),this.S=null),Zn(this,"tick"),this.da&&(fr(this),this.start()))}},Lt.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())},Lt.M=function(){hr.Z.M.call(this),fr(this),delete this.g};class mr extends Gt{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:pr(this)}M(){super.M(),this.g&&(Mt.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function gr(e){Gt.call(this),this.h=e,this.g={}}Kt(gr,Gt);var yr=[];function vr(e,t,n,r){Array.isArray(n)||(n&&(yr[0]=n.toString()),n=yr);for(var i=0;i<n.length;i++){var o=Bn(t,n[i],r||e.handleEvent,!1,e.h||e);if(!o)break;e.g[o.key]=o}}function wr(e){an(e.g,(function(e,t){this.g.hasOwnProperty(t)&&Kn(e)}),e),e.g={}}function br(){this.g=!0}function Er(e,t,n,r){e.info((function(){return"XMLHTTP TEXT ("+t+"): "+function(e,t){if(!e.g)return t;if(!t)return null;try{var n=JSON.parse(t);if(n)for(e=0;e<n.length;e++)if(Array.isArray(n[e])){var r=n[e];if(!(2>r.length)){var i=r[1];if(Array.isArray(i)&&!(1>i.length)){var o=i[0];if("noop"!=o&&"stop"!=o&&"close"!=o)for(var s=1;s<i.length;s++)i[s]=""}}}return tr(n)}catch(e){return t}}(e,n)+(r?" "+r:"")}))}gr.prototype.M=function(){gr.Z.M.call(this),wr(this)},gr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")},br.prototype.Aa=function(){this.g=!1},br.prototype.info=function(){};var Sr={},kr=null;function Tr(){return kr=kr||new Jn}function Ir(e){An.call(this,Sr.Ma,e)}function xr(e){const t=Tr();Zn(t,new Ir(t,e))}function Cr(e,t){An.call(this,Sr.STAT_EVENT,e),this.stat=t}function _r(e){const t=Tr();Zn(t,new Cr(t,e))}function Nr(e,t){An.call(this,Sr.Na,e),this.size=t}function Ar(e,t){if("function"!=typeof e)throw Error("Fn must not be null and must be a function");return Mt.setTimeout((function(){e()}),t)}Sr.Ma="serverreachability",Kt(Ir,An),Sr.STAT_EVENT="statevent",Kt(Cr,An),Sr.Na="timingevent",Kt(Nr,An);var Dr={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Lr={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Pr(){}function Or(e){return e.h||(e.h=e.i())}function Rr(){}Pr.prototype.h=null;var Mr,Fr={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function Ur(){An.call(this,"d")}function Vr(){An.call(this,"c")}function jr(){}function zr(e,t,n,r){this.l=e,this.j=t,this.m=n,this.X=r||1,this.V=new gr(this),this.P=qr,e=yn?125:void 0,this.W=new hr(e),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Br}function Br(){this.i=null,this.g="",this.h=!1}Kt(Ur,An),Kt(Vr,An),Kt(jr,Pr),jr.prototype.g=function(){return new XMLHttpRequest},jr.prototype.i=function(){return{}},Mr=new jr;var qr=45e3,Hr={},$r={};function Kr(e,t,n){e.K=1,e.v=mi(ui(t)),e.s=n,e.U=!0,Gr(e,null)}function Gr(e,t){e.F=Date.now(),Yr(e),e.A=ui(e.v);var n=e.A,r=e.X;Array.isArray(r)||(r=[String(r)]),_i(n.h,"t",r),e.C=0,n=e.l.H,e.h=new Br,e.g=No(e.l,n?t:null,!e.s),0<e.O&&(e.L=new mr(Ht(e.Ia,e,e.g),e.O)),vr(e.V,e.g,"readystatechange",e.gb),t=e.H?ln(e.H):{},e.s?(e.u||(e.u="POST"),t["Content-Type"]="application/x-www-form-urlencoded",e.g.ea(e.A,e.u,e.s,t)):(e.u="GET",e.g.ea(e.A,e.u,null,t)),xr(1),function(e,t,n,r,i,o){e.info((function(){if(e.g)if(o)for(var s="",a=o.split("&"),l=0;l<a.length;l++){var u=a[l].split("=");if(1<u.length){var c=u[0];u=u[1];var h=c.split("_");s=2<=h.length&&"type"==h[1]?s+(c+"=")+u+"&":s+(c+"=redacted&")}}else s=null;else s=o;return"XMLHTTP REQ ("+r+") [attempt "+i+"]: "+t+"\n"+n+"\n"+s}))}(e.j,e.u,e.A,e.m,e.X,e.s)}function Wr(e){return!!e.g&&("GET"==e.u&&2!=e.K&&e.l.Ba)}function Qr(e,t,n){let r,i=!0;for(;!e.I&&e.C<n.length;){if(r=Xr(e,n),r==$r){4==t&&(e.o=4,_r(14),i=!1),Er(e.j,e.m,null,"[Incomplete Response]");break}if(r==Hr){e.o=4,_r(15),Er(e.j,e.m,n,"[Invalid Chunk]"),i=!1;break}Er(e.j,e.m,r,null),ni(e,r)}Wr(e)&&r!=$r&&r!=Hr&&(e.h.g="",e.C=0),4!=t||0!=n.length||e.h.h||(e.o=1,_r(16),i=!1),e.i=e.i&&i,i?0<n.length&&!e.aa&&(e.aa=!0,(t=e.l).g==e&&t.$&&!t.L&&(t.h.info("Great, no buffering proxy detected. Bytes received: "+n.length),Eo(t),t.L=!0,_r(11))):(Er(e.j,e.m,n,"[Invalid Chunked Response]"),ti(e),ei(e))}function Xr(e,t){var n=e.C,r=t.indexOf("\n",n);return-1==r?$r:(n=Number(t.substring(n,r)),isNaN(n)?Hr:(r+=1)+n>t.length?$r:(t=t.substr(r,n),e.C=r+n,t))}function Yr(e){e.Y=Date.now()+e.P,Jr(e,e.P)}function Jr(e,t){if(null!=e.B)throw Error("WatchDog timer not null");e.B=Ar(Ht(e.eb,e),t)}function Zr(e){e.B&&(Mt.clearTimeout(e.B),e.B=null)}function ei(e){0==e.l.G||e.I||To(e.l,e)}function ti(e){Zr(e);var t=e.L;t&&"function"==typeof t.na&&t.na(),e.L=null,fr(e.W),wr(e.V),e.g&&(t=e.g,e.g=null,t.abort(),t.na())}function ni(e,t){try{var n=e.l;if(0!=n.G&&(n.g==e||Oi(n.i,e)))if(n.I=e.N,!e.J&&Oi(n.i,e)&&3==n.G){try{var r=n.Ca.g.parse(t)}catch(e){r=null}if(Array.isArray(r)&&3==r.length){var i=r;if(0==i[0]){e:if(!n.u){if(n.g){if(!(n.g.F+3e3<e.F))break e;ko(n),ho(n)}bo(n),_r(18)}}else n.ta=i[1],0<n.ta-n.U&&37500>i[2]&&n.N&&0==n.A&&!n.v&&(n.v=Ar(Ht(n.ab,n),6e3));if(1>=Pi(n.i)&&n.ka){try{n.ka()}catch(e){}n.ka=void 0}}else xo(n,11)}else if((e.J||n.g==e)&&ko(n),!Zt(t))for(i=n.Ca.g.parse(t),t=0;t<i.length;t++){let u=i[t];if(n.U=u[0],u=u[1],2==n.G)if("c"==u[0]){n.J=u[1],n.la=u[2];const t=u[3];null!=t&&(n.ma=t,n.h.info("VER="+n.ma));const i=u[4];null!=i&&(n.za=i,n.h.info("SVER="+n.za));const c=u[5];null!=c&&"number"==typeof c&&0<c&&(r=1.5*c,n.K=r,n.h.info("backChannelRequestTimeoutMs_="+r)),r=n;const h=e.g;if(h){const e=h.g?h.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(e){var o=r.i;!o.g&&(nn(e,"spdy")||nn(e,"quic")||nn(e,"h2"))&&(o.j=o.l,o.g=new Set,o.h&&(Ri(o,o.h),o.h=null))}if(r.D){const e=h.g?h.g.getResponseHeader("X-HTTP-Session-Id"):null;e&&(r.sa=e,pi(r.F,r.D,e))}}n.G=3,n.j&&n.j.xa(),n.$&&(n.O=Date.now()-e.F,n.h.info("Handshake RTT: "+n.O+"ms"));var s=e;if((r=n).oa=_o(r,r.H?r.la:null,r.W),s.J){Mi(r.i,s);var a=s,l=r.K;l&&a.setTimeout(l),a.B&&(Zr(a),Yr(a)),r.g=s}else wo(r);0<n.l.length&&mo(n)}else"stop"!=u[0]&&"close"!=u[0]||xo(n,7);else 3==n.G&&("stop"==u[0]||"close"==u[0]?"stop"==u[0]?xo(n,7):co(n):"noop"!=u[0]&&n.j&&n.j.wa(u),n.A=0)}xr(4)}catch(e){}}function ri(e,t){if(e.forEach&&"function"==typeof e.forEach)e.forEach(t,void 0);else if(Ut(e)||"string"==typeof e)Xt(e,t,void 0);else{if(e.T&&"function"==typeof e.T)var n=e.T();else if(e.R&&"function"==typeof e.R)n=void 0;else if(Ut(e)||"string"==typeof e){n=[];for(var r=e.length,i=0;i<r;i++)n.push(i)}else for(i in n=[],r=0,e)n[r++]=i;r=function(e){if(e.R&&"function"==typeof e.R)return e.R();if("string"==typeof e)return e.split("");if(Ut(e)){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t}for(r in t=[],n=0,e)t[n++]=e[r];return t}(e),i=r.length;for(var o=0;o<i;o++)t.call(void 0,r[o],n&&n[o],e)}}function ii(e,t){this.h={},this.g=[],this.i=0;var n=arguments.length;if(1<n){if(n%2)throw Error("Uneven number of arguments");for(var r=0;r<n;r+=2)this.set(arguments[r],arguments[r+1])}else if(e)if(e instanceof ii)for(n=e.T(),r=0;r<n.length;r++)this.set(n[r],e.get(n[r]));else for(r in e)this.set(r,e[r])}function oi(e){if(e.i!=e.g.length){for(var t=0,n=0;t<e.g.length;){var r=e.g[t];si(e.h,r)&&(e.g[n++]=r),t++}e.g.length=n}if(e.i!=e.g.length){var i={};for(n=t=0;t<e.g.length;)si(i,r=e.g[t])||(e.g[n++]=r,i[r]=1),t++;e.g.length=n}}function si(e,t){return Object.prototype.hasOwnProperty.call(e,t)}(Lt=zr.prototype).setTimeout=function(e){this.P=e},Lt.gb=function(e){e=e.target;const t=this.L;t&&3==oo(e)?t.l():this.Ia(e)},Lt.Ia=function(e){try{if(e==this.g)e:{const c=oo(this.g);var t=this.g.Da();const h=this.g.ba();if(!(3>c)&&(3!=c||yn||this.g&&(this.h.h||this.g.ga()||so(this.g)))){this.I||4!=c||7==t||xr(8==t||0>=h?3:2),Zr(this);var n=this.g.ba();this.N=n;t:if(Wr(this)){var r=so(this.g);e="";var i=r.length,o=4==oo(this.g);if(!this.h.i){if("undefined"==typeof TextDecoder){ti(this),ei(this);var s="";break t}this.h.i=new Mt.TextDecoder}for(t=0;t<i;t++)this.h.h=!0,e+=this.h.i.decode(r[t],{stream:o&&t==i-1});r.splice(0,i),this.h.g+=e,this.C=0,s=this.h.g}else s=this.g.ga();if(this.i=200==n,function(e,t,n,r,i,o,s){e.info((function(){return"XMLHTTP RESP ("+r+") [ attempt "+i+"]: "+t+"\n"+n+"\n"+o+" "+s}))}(this.j,this.u,this.A,this.m,this.X,c,n),this.i){if(this.$&&!this.J){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Zt(a)){var u=a;break t}}u=null}if(!(n=u)){this.i=!1,this.o=3,_r(12),ti(this),ei(this);break e}Er(this.j,this.m,n,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,ni(this,n)}this.U?(Qr(this,c,s),yn&&this.i&&3==c&&(vr(this.V,this.W,"tick",this.fb),this.W.start())):(Er(this.j,this.m,s,null),ni(this,s)),4==c&&ti(this),this.i&&!this.I&&(4==c?To(this.l,this):(this.i=!1,Yr(this)))}else 400==n&&0<s.indexOf("Unknown SID")?(this.o=3,_r(12)):(this.o=0,_r(13)),ti(this),ei(this)}}}catch(e){}},Lt.fb=function(){if(this.g){var e=oo(this.g),t=this.g.ga();this.C<t.length&&(Zr(this),Qr(this,e,t),this.i&&4!=e&&Yr(this))}},Lt.cancel=function(){this.I=!0,ti(this)},Lt.eb=function(){this.B=null;const e=Date.now();0<=e-this.Y?(function(e,t){e.info((function(){return"TIMEOUT: "+t}))}(this.j,this.A),2!=this.K&&(xr(3),_r(17)),ti(this),this.o=2,ei(this)):Jr(this,this.Y-e)},(Lt=ii.prototype).R=function(){oi(this);for(var e=[],t=0;t<this.g.length;t++)e.push(this.h[this.g[t]]);return e},Lt.T=function(){return oi(this),this.g.concat()},Lt.get=function(e,t){return si(this.h,e)?this.h[e]:t},Lt.set=function(e,t){si(this.h,e)||(this.i++,this.g.push(e)),this.h[e]=t},Lt.forEach=function(e,t){for(var n=this.T(),r=0;r<n.length;r++){var i=n[r],o=this.get(i);e.call(t,o,i,this)}};var ai=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function li(e,t){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,e instanceof li){this.g=void 0!==t?t:e.g,ci(this,e.j),this.s=e.s,hi(this,e.i),fi(this,e.m),this.l=e.l,t=e.h;var n=new Ti;n.i=t.i,t.g&&(n.g=new ii(t.g),n.h=t.h),di(this,n),this.o=e.o}else e&&(n=String(e).match(ai))?(this.g=!!t,ci(this,n[1]||"",!0),this.s=gi(n[2]||""),hi(this,n[3]||"",!0),fi(this,n[4]),this.l=gi(n[5]||"",!0),di(this,n[6]||"",!0),this.o=gi(n[7]||"")):(this.g=!!t,this.h=new Ti(null,this.g))}function ui(e){return new li(e)}function ci(e,t,n){e.j=n?gi(t,!0):t,e.j&&(e.j=e.j.replace(/:$/,""))}function hi(e,t,n){e.i=n?gi(t,!0):t}function fi(e,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);e.m=t}else e.m=null}function di(e,t,n){t instanceof Ti?(e.h=t,function(e,t){t&&!e.j&&(Ii(e),e.i=null,e.g.forEach((function(e,t){var n=t.toLowerCase();t!=n&&(xi(this,t),_i(this,n,e))}),e)),e.j=t}(e.h,e.g)):(n||(t=yi(t,Si)),e.h=new Ti(t,e.g))}function pi(e,t,n){e.h.set(t,n)}function mi(e){return pi(e,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),e}function gi(e,t){return e?t?decodeURI(e.replace(/%25/g,"%2525")):decodeURIComponent(e):""}function yi(e,t,n){return"string"==typeof e?(e=encodeURI(e).replace(t,vi),n&&(e=e.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e):null}function vi(e){return"%"+((e=e.charCodeAt(0))>>4&15).toString(16)+(15&e).toString(16)}li.prototype.toString=function(){var e=[],t=this.j;t&&e.push(yi(t,wi,!0),":");var n=this.i;return(n||"file"==t)&&(e.push("//"),(t=this.s)&&e.push(yi(t,wi,!0),"@"),e.push(encodeURIComponent(String(n)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),null!=(n=this.m)&&e.push(":",String(n))),(n=this.l)&&(this.i&&"/"!=n.charAt(0)&&e.push("/"),e.push(yi(n,"/"==n.charAt(0)?Ei:bi,!0))),(n=this.h.toString())&&e.push("?",n),(n=this.o)&&e.push("#",yi(n,ki)),e.join("")};var wi=/[#\/\?@]/g,bi=/[#\?:]/g,Ei=/[#\?]/g,Si=/[#\?@]/g,ki=/#/g;function Ti(e,t){this.h=this.g=null,this.i=e||null,this.j=!!t}function Ii(e){e.g||(e.g=new ii,e.h=0,e.i&&function(e,t){if(e){e=e.split("&");for(var n=0;n<e.length;n++){var r=e[n].indexOf("="),i=null;if(0<=r){var o=e[n].substring(0,r);i=e[n].substring(r+1)}else o=e[n];t(o,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}(e.i,(function(t,n){e.add(decodeURIComponent(t.replace(/\+/g," ")),n)})))}function xi(e,t){Ii(e),t=Ni(e,t),si(e.g.h,t)&&(e.i=null,e.h-=e.g.get(t).length,si((e=e.g).h,t)&&(delete e.h[t],e.i--,e.g.length>2*e.i&&oi(e)))}function Ci(e,t){return Ii(e),t=Ni(e,t),si(e.g.h,t)}function _i(e,t,n){xi(e,t),0<n.length&&(e.i=null,e.g.set(Ni(e,t),Jt(n)),e.h+=n.length)}function Ni(e,t){return t=String(t),e.j&&(t=t.toLowerCase()),t}(Lt=Ti.prototype).add=function(e,t){Ii(this),this.i=null,e=Ni(this,e);var n=this.g.get(e);return n||this.g.set(e,n=[]),n.push(t),this.h+=1,this},Lt.forEach=function(e,t){Ii(this),this.g.forEach((function(n,r){Xt(n,(function(n){e.call(t,n,r,this)}),this)}),this)},Lt.T=function(){Ii(this);for(var e=this.g.R(),t=this.g.T(),n=[],r=0;r<t.length;r++)for(var i=e[r],o=0;o<i.length;o++)n.push(t[r]);return n},Lt.R=function(e){Ii(this);var t=[];if("string"==typeof e)Ci(this,e)&&(t=Yt(t,this.g.get(Ni(this,e))));else{e=this.g.R();for(var n=0;n<e.length;n++)t=Yt(t,e[n])}return t},Lt.set=function(e,t){return Ii(this),this.i=null,Ci(this,e=Ni(this,e))&&(this.h-=this.g.get(e).length),this.g.set(e,[t]),this.h+=1,this},Lt.get=function(e,t){return e&&0<(e=this.R(e)).length?String(e[0]):t},Lt.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var e=[],t=this.g.T(),n=0;n<t.length;n++){var r=t[n],i=encodeURIComponent(String(r));r=this.R(r);for(var o=0;o<r.length;o++){var s=i;""!==r[o]&&(s+="="+encodeURIComponent(String(r[o]))),e.push(s)}}return this.i=e.join("&")};function Ai(e){this.l=e||Di,Mt.PerformanceNavigationTiming?e=0<(e=Mt.performance.getEntriesByType("navigation")).length&&("hq"==e[0].nextHopProtocol||"h2"==e[0].nextHopProtocol):e=!!(Mt.g&&Mt.g.Ea&&Mt.g.Ea()&&Mt.g.Ea().Zb),this.j=e?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Di=10;function Li(e){return!!e.h||!!e.g&&e.g.size>=e.j}function Pi(e){return e.h?1:e.g?e.g.size:0}function Oi(e,t){return e.h?e.h==t:!!e.g&&e.g.has(t)}function Ri(e,t){e.g?e.g.add(t):e.h=t}function Mi(e,t){e.h&&e.h==t?e.h=null:e.g&&e.g.has(t)&&e.g.delete(t)}function Fi(e){if(null!=e.h)return e.i.concat(e.h.D);if(null!=e.g&&0!==e.g.size){let t=e.i;for(const n of e.g.values())t=t.concat(n.D);return t}return Jt(e.i)}function Ui(){}function Vi(){this.g=new Ui}function ji(e,t,n){const r=n||"";try{ri(e,(function(e,n){let i=e;Vt(e)&&(i=tr(e)),t.push(r+n+"="+encodeURIComponent(i))}))}catch(e){throw t.push(r+"type="+encodeURIComponent("_badmap")),e}}function zi(e,t,n,r,i){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,i(r)}catch(e){}}function Bi(e){this.l=e.$b||null,this.j=e.ib||!1}function qi(e,t){Jn.call(this),this.D=e,this.u=t,this.m=void 0,this.readyState=Hi,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}Ai.prototype.cancel=function(){if(this.i=Fi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&0!==this.g.size){for(const e of this.g.values())e.cancel();this.g.clear()}},Ui.prototype.stringify=function(e){return Mt.JSON.stringify(e,void 0)},Ui.prototype.parse=function(e){return Mt.JSON.parse(e,void 0)},Kt(Bi,Pr),Bi.prototype.g=function(){return new qi(this.l,this.j)},Bi.prototype.i=function(e){return function(){return e}}({}),Kt(qi,Jn);var Hi=0;function $i(e){e.j.read().then(e.Sa.bind(e)).catch(e.ha.bind(e))}function Ki(e){e.readyState=4,e.l=null,e.j=null,e.A=null,Gi(e)}function Gi(e){e.onreadystatechange&&e.onreadystatechange.call(e)}(Lt=qi.prototype).open=function(e,t){if(this.readyState!=Hi)throw this.abort(),Error("Error reopening a connection");this.C=e,this.B=t,this.readyState=1,Gi(this)},Lt.send=function(e){if(1!=this.readyState)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};e&&(t.body=e),(this.D||Mt).fetch(new Request(this.B,t)).then(this.Va.bind(this),this.ha.bind(this))},Lt.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&4!=this.readyState&&(this.g=!1,Ki(this)),this.readyState=Hi},Lt.Va=function(e){if(this.g&&(this.l=e,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=e.headers,this.readyState=2,Gi(this)),this.g&&(this.readyState=3,Gi(this),this.g)))if("arraybuffer"===this.responseType)e.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(void 0!==Mt.ReadableStream&&"body"in e){if(this.j=e.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;$i(this)}else e.text().then(this.Ua.bind(this),this.ha.bind(this))},Lt.Sa=function(e){if(this.g){if(this.u&&e.value)this.response.push(e.value);else if(!this.u){var t=e.value?e.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!e.done}))&&(this.response=this.responseText+=t)}e.done?Ki(this):Gi(this),3==this.readyState&&$i(this)}},Lt.Ua=function(e){this.g&&(this.response=this.responseText=e,Ki(this))},Lt.Ta=function(e){this.g&&(this.response=e,Ki(this))},Lt.ha=function(){this.g&&Ki(this)},Lt.setRequestHeader=function(e,t){this.v.append(e,t)},Lt.getResponseHeader=function(e){return this.h&&this.h.get(e.toLowerCase())||""},Lt.getAllResponseHeaders=function(){if(!this.h)return"";const e=[],t=this.h.entries();for(var n=t.next();!n.done;)n=n.value,e.push(n[0]+": "+n[1]),n=t.next();return e.join("\r\n")},Object.defineProperty(qi.prototype,"withCredentials",{get:function(){return"include"===this.m},set:function(e){this.m=e?"include":"same-origin"}});var Wi=Mt.JSON.parse;function Qi(e){Jn.call(this),this.headers=new ii,this.u=e||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Xi,this.K=this.L=!1}Kt(Qi,Jn);var Xi="",Yi=/^https?$/i,Ji=["POST","PUT"];function Zi(e){return"content-type"==e.toLowerCase()}function eo(e,t){e.h=!1,e.g&&(e.l=!0,e.g.abort(),e.l=!1),e.j=t,e.m=5,to(e),ro(e)}function to(e){e.D||(e.D=!0,Zn(e,"complete"),Zn(e,"error"))}function no(e){if(e.h&&void 0!==Rt&&(!e.C[1]||4!=oo(e)||2!=e.ba()))if(e.v&&4==oo(e))dr(e.Fa,0,e);else if(Zn(e,"readystatechange"),4==oo(e)){e.h=!1;try{const a=e.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break e;default:t=!1}var n;if(!(n=t)){var r;if(r=0===a){var i=String(e.H).match(ai)[1]||null;if(!i&&Mt.self&&Mt.self.location){var o=Mt.self.location.protocol;i=o.substr(0,o.length-1)}r=!Yi.test(i?i.toLowerCase():"")}n=r}if(n)Zn(e,"complete"),Zn(e,"success");else{e.m=6;try{var s=2<oo(e)?e.g.statusText:""}catch(e){s=""}e.j=s+" ["+e.ba()+"]",to(e)}}finally{ro(e)}}}function ro(e,t){if(e.g){io(e);const n=e.g,r=e.C[0]?Ft:null;e.g=null,e.C=null,t||Zn(e,"ready");try{n.onreadystatechange=r}catch(e){}}}function io(e){e.g&&e.K&&(e.g.ontimeout=null),e.A&&(Mt.clearTimeout(e.A),e.A=null)}function oo(e){return e.g?e.g.readyState:0}function so(e){try{if(!e.g)return null;if("response"in e.g)return e.g.response;switch(e.J){case Xi:case"text":return e.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in e.g)return e.g.mozResponseArrayBuffer}return null}catch(e){return null}}function ao(e,t,n){e:{for(r in n){var r=!1;break e}r=!0}r||(n=function(e){let t="";return an(e,(function(e,n){t+=n,t+=":",t+=e,t+="\r\n"})),t}(n),"string"==typeof e?null!=n&&encodeURIComponent(String(n)):pi(e,t,n))}function lo(e,t,n){return n&&n.internalChannelParams&&n.internalChannelParams[e]||t}function uo(e){this.za=0,this.l=[],this.h=new br,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=lo("failFast",!1,e),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=lo("baseRetryDelayMs",5e3,e),this.$a=lo("retryDelaySeedMs",1e4,e),this.Ya=lo("forwardChannelMaxRetries",2,e),this.ra=lo("forwardChannelRequestTimeoutMs",2e4,e),this.qa=e&&e.xmlHttpFactory||void 0,this.Ba=e&&e.Yb||!1,this.K=void 0,this.H=e&&e.supportsCrossDomainXhr||!1,this.J="",this.i=new Ai(e&&e.concurrentRequestLimit),this.Ca=new Vi,this.ja=e&&e.fastHandshake||!1,this.Ra=e&&e.Wb||!1,e&&e.Aa&&this.h.Aa(),e&&e.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&e&&e.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!e||!1!==e.Xb}function co(e){if(fo(e),3==e.G){var t=e.V++,n=ui(e.F);pi(n,"SID",e.J),pi(n,"RID",t),pi(n,"TYPE","terminate"),yo(e,n),(t=new zr(e,e.h,t,void 0)).K=2,t.v=mi(ui(n)),n=!1,Mt.navigator&&Mt.navigator.sendBeacon&&(n=Mt.navigator.sendBeacon(t.v.toString(),"")),!n&&Mt.Image&&((new Image).src=t.v,n=!0),n||(t.g=No(t.l,null),t.g.ea(t.v)),t.F=Date.now(),Yr(t)}Co(e)}function ho(e){e.g&&(Eo(e),e.g.cancel(),e.g=null)}function fo(e){ho(e),e.u&&(Mt.clearTimeout(e.u),e.u=null),ko(e),e.i.cancel(),e.m&&("number"==typeof e.m&&Mt.clearTimeout(e.m),e.m=null)}function po(e,t){e.l.push(new class{constructor(e,t){this.h=e,this.g=t}}(e.Za++,t)),3==e.G&&mo(e)}function mo(e){Li(e.i)||e.m||(e.m=!0,ar(e.Ha,e),e.C=0)}function go(e,t){var n;n=t?t.m:e.V++;const r=ui(e.F);pi(r,"SID",e.J),pi(r,"RID",n),pi(r,"AID",e.U),yo(e,r),e.o&&e.s&&ao(r,e.o,e.s),n=new zr(e,e.h,n,e.C+1),null===e.o&&(n.H=e.s),t&&(e.l=t.D.concat(e.l)),t=vo(e,n,1e3),n.setTimeout(Math.round(.5*e.ra)+Math.round(.5*e.ra*Math.random())),Ri(e.i,n),Kr(n,r,t)}function yo(e,t){e.j&&ri({},(function(e,n){pi(t,n,e)}))}function vo(e,t,n){n=Math.min(e.l.length,n);var r=e.j?Ht(e.j.Oa,e.j,e):null;e:{var i=e.l;let t=-1;for(;;){const e=["count="+n];-1==t?0<n?(t=i[0].h,e.push("ofs="+t)):t=0:e.push("ofs="+t);let o=!0;for(let s=0;s<n;s++){let n=i[s].h;const a=i[s].g;if(n-=t,0>n)t=Math.max(0,i[s].h-100),o=!1;else try{ji(a,e,"req"+n+"_")}catch(e){r&&r(a)}}if(o){r=e.join("&");break e}}}return e=e.l.splice(0,n),t.D=e,r}function wo(e){e.g||e.u||(e.Y=1,ar(e.Ga,e),e.A=0)}function bo(e){return!(e.g||e.u||3<=e.A)&&(e.Y++,e.u=Ar(Ht(e.Ga,e),Io(e,e.A)),e.A++,!0)}function Eo(e){null!=e.B&&(Mt.clearTimeout(e.B),e.B=null)}function So(e){e.g=new zr(e,e.h,"rpc",e.Y),null===e.o&&(e.g.H=e.s),e.g.O=0;var t=ui(e.oa);pi(t,"RID","rpc"),pi(t,"SID",e.J),pi(t,"CI",e.N?"0":"1"),pi(t,"AID",e.U),yo(e,t),pi(t,"TYPE","xmlhttp"),e.o&&e.s&&ao(t,e.o,e.s),e.K&&e.g.setTimeout(e.K);var n=e.g;e=e.la,n.K=1,n.v=mi(ui(t)),n.s=null,n.U=!0,Gr(n,e)}function ko(e){null!=e.v&&(Mt.clearTimeout(e.v),e.v=null)}function To(e,t){var n=null;if(e.g==t){ko(e),Eo(e),e.g=null;var r=2}else{if(!Oi(e.i,t))return;n=t.D,Mi(e.i,t),r=1}if(e.I=t.N,0!=e.G)if(t.i)if(1==r){n=t.s?t.s.length:0,t=Date.now()-t.F;var i=e.C;Zn(r=Tr(),new Nr(r,n,t,i)),mo(e)}else wo(e);else if(3==(i=t.o)||0==i&&0<e.I||!(1==r&&function(e,t){return!(Pi(e.i)>=e.i.j-(e.m?1:0)||(e.m?(e.l=t.D.concat(e.l),0):1==e.G||2==e.G||e.C>=(e.Xa?0:e.Ya)||(e.m=Ar(Ht(e.Ha,e,t),Io(e,e.C)),e.C++,0)))}(e,t)||2==r&&bo(e)))switch(n&&0<n.length&&(t=e.i,t.i=t.i.concat(n)),i){case 1:xo(e,5);break;case 4:xo(e,10);break;case 3:xo(e,6);break;default:xo(e,2)}}function Io(e,t){let n=e.Pa+Math.floor(Math.random()*e.$a);return e.j||(n*=2),n*t}function xo(e,t){if(e.h.info("Error code "+t),2==t){var n=null;e.j&&(n=null);var r=Ht(e.jb,e);n||(n=new li("//www.google.com/images/cleardot.gif"),Mt.location&&"http"==Mt.location.protocol||ci(n,"https"),mi(n)),function(e,t){const n=new br;if(Mt.Image){const r=new Image;r.onload=$t(zi,n,r,"TestLoadImage: loaded",!0,t),r.onerror=$t(zi,n,r,"TestLoadImage: error",!1,t),r.onabort=$t(zi,n,r,"TestLoadImage: abort",!1,t),r.ontimeout=$t(zi,n,r,"TestLoadImage: timeout",!1,t),Mt.setTimeout((function(){r.ontimeout&&r.ontimeout()}),1e4),r.src=e}else t(!1)}(n.toString(),r)}else _r(2);e.G=0,e.j&&e.j.va(t),Co(e),fo(e)}function Co(e){e.G=0,e.I=-1,e.j&&(0==Fi(e.i).length&&0==e.l.length||(e.i.i.length=0,Jt(e.l),e.l.length=0),e.j.ua())}function _o(e,t,n){let r=function(e){return e instanceof li?ui(e):new li(e,void 0)}(n);if(""!=r.i)t&&hi(r,t+"."+r.i),fi(r,r.m);else{const e=Mt.location;r=function(e,t,n,r){var i=new li(null,void 0);return e&&ci(i,e),t&&hi(i,t),n&&fi(i,n),r&&(i.l=r),i}(e.protocol,t?t+"."+e.hostname:e.hostname,+e.port,n)}return e.aa&&an(e.aa,(function(e,t){pi(r,t,e)})),t=e.D,n=e.sa,t&&n&&pi(r,t,n),pi(r,"VER",e.ma),yo(e,r),r}function No(e,t,n){if(t&&!e.H)throw Error("Can't create secondary domain capable XhrIo object.");return(t=n&&e.Ba&&!e.qa?new Qi(new Bi({ib:!0})):new Qi(e.qa)).L=e.H,t}function Ao(){}function Do(){if(mn&&!(10<=Number(_n)))throw Error("Environmental error: no available transport.")}function Lo(e,t){Jn.call(this),this.g=new uo(t),this.l=e,this.h=t&&t.messageUrlParams||null,e=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(e?e["X-Client-Protocol"]="webchannel":e={"X-Client-Protocol":"webchannel"}),this.g.s=e,e=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(e?e["X-WebChannel-Content-Type"]=t.messageContentType:e={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.ya&&(e?e["X-WebChannel-Client-Profile"]=t.ya:e={"X-WebChannel-Client-Profile":t.ya}),this.g.P=e,(e=t&&t.httpHeadersOverwriteParam)&&!Zt(e)&&(this.g.o=e),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!Zt(t)&&(this.g.D=t,null!==(e=this.h)&&t in e&&(t in(e=this.h)&&delete e[t])),this.j=new Ro(this)}function Po(e){Ur.call(this);var t=e.__sm__;if(t){e:{for(const n in t){e=n;break e}e=void 0}(this.i=e)&&(e=this.i,t=null!==t&&e in t?t[e]:void 0),this.data=t}else this.data=e}function Oo(){Vr.call(this),this.status=1}function Ro(e){this.g=e}(Lt=Qi.prototype).ea=function(e,t,n,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+e);t=t?t.toUpperCase():"GET",this.H=e,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():Mr.g(),this.C=this.u?Or(this.u):Or(Mr),this.g.onreadystatechange=Ht(this.Fa,this);try{this.F=!0,this.g.open(t,String(e),!0),this.F=!1}catch(e){return void eo(this,e)}e=n||"";const i=new ii(this.headers);r&&ri(r,(function(e,t){i.set(t,e)})),r=function(e){e:{var t=Zi;const n=e.length,r="string"==typeof e?e.split(""):e;for(let i=0;i<n;i++)if(i in r&&t.call(void 0,r[i],i,e)){t=i;break e}t=-1}return 0>t?null:"string"==typeof e?e.charAt(t):e[t]}(i.T()),n=Mt.FormData&&e instanceof Mt.FormData,!(0<=Qt(Ji,t))||r||n||i.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),i.forEach((function(e,t){this.g.setRequestHeader(t,e)}),this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{io(this),0<this.B&&((this.K=function(e){return mn&&xn()&&"number"==typeof e.timeout&&void 0!==e.ontimeout}(this.g))?(this.g.timeout=this.B,this.g.ontimeout=Ht(this.pa,this)):this.A=dr(this.pa,this.B,this)),this.v=!0,this.g.send(e),this.v=!1}catch(e){eo(this,e)}},Lt.pa=function(){void 0!==Rt&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,Zn(this,"timeout"),this.abort(8))},Lt.abort=function(e){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=e||7,Zn(this,"complete"),Zn(this,"abort"),ro(this))},Lt.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),ro(this,!0)),Qi.Z.M.call(this)},Lt.Fa=function(){this.s||(this.F||this.v||this.l?no(this):this.cb())},Lt.cb=function(){no(this)},Lt.ba=function(){try{return 2<oo(this)?this.g.status:-1}catch(e){return-1}},Lt.ga=function(){try{return this.g?this.g.responseText:""}catch(e){return""}},Lt.Qa=function(e){if(this.g){var t=this.g.responseText;return e&&0==t.indexOf(e)&&(t=t.substring(e.length)),Wi(t)}},Lt.Da=function(){return this.m},Lt.La=function(){return"string"==typeof this.j?this.j:String(this.j)},(Lt=uo.prototype).ma=8,Lt.G=1,Lt.hb=function(e){try{this.h.info("Origin Trials invoked: "+e)}catch(e){}},Lt.Ha=function(e){if(this.m)if(this.m=null,1==this.G){if(!e){this.V=Math.floor(1e5*Math.random()),e=this.V++;const i=new zr(this,this.h,e,void 0);let o=this.s;if(this.P&&(o?(o=ln(o),cn(o,this.P)):o=this.P),null===this.o&&(i.H=o),this.ja)e:{for(var t=0,n=0;n<this.l.length;n++){var r=this.l[n];if(void 0===(r="__data__"in r.g&&"string"==typeof(r=r.g.__data__)?r.length:void 0))break;if(4096<(t+=r)){t=n;break e}if(4096===t||n===this.l.length-1){t=n+1;break e}}t=1e3}else t=1e3;t=vo(this,i,t),pi(n=ui(this.F),"RID",e),pi(n,"CVER",22),this.D&&pi(n,"X-HTTP-Session-Id",this.D),yo(this,n),this.o&&o&&ao(n,this.o,o),Ri(this.i,i),this.Ra&&pi(n,"TYPE","init"),this.ja?(pi(n,"$req",t),pi(n,"SID","null"),i.$=!0,Kr(i,n,null)):Kr(i,n,t),this.G=2}}else 3==this.G&&(e?go(this,e):0==this.l.length||Li(this.i)||go(this))},Lt.Ga=function(){if(this.u=null,So(this),this.$&&!(this.L||null==this.g||0>=this.O)){var e=2*this.O;this.h.info("BP detection timer enabled: "+e),this.B=Ar(Ht(this.bb,this),e)}},Lt.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,_r(10),ho(this),So(this))},Lt.ab=function(){null!=this.v&&(this.v=null,ho(this),bo(this),_r(19))},Lt.jb=function(e){e?(this.h.info("Successfully pinged google.com"),_r(2)):(this.h.info("Failed to ping google.com"),_r(1))},(Lt=Ao.prototype).xa=function(){},Lt.wa=function(){},Lt.va=function(){},Lt.ua=function(){},Lt.Oa=function(){},Do.prototype.g=function(e,t){return new Lo(e,t)},Kt(Lo,Jn),Lo.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var e=this.g,t=this.l,n=this.h||void 0;e.Wa&&(e.h.info("Origin Trials enabled."),ar(Ht(e.hb,e,t))),_r(0),e.W=t,e.aa=n||{},e.N=e.X,e.F=_o(e,null,e.W),mo(e)},Lo.prototype.close=function(){co(this.g)},Lo.prototype.u=function(e){if("string"==typeof e){var t={};t.__data__=e,po(this.g,t)}else this.v?((t={}).__data__=tr(e),po(this.g,t)):po(this.g,e)},Lo.prototype.M=function(){this.g.j=null,delete this.j,co(this.g),delete this.g,Lo.Z.M.call(this)},Kt(Po,Ur),Kt(Oo,Vr),Kt(Ro,Ao),Ro.prototype.xa=function(){Zn(this.g,"a")},Ro.prototype.wa=function(e){Zn(this.g,new Po(e))},Ro.prototype.va=function(e){Zn(this.g,new Oo(e))},Ro.prototype.ua=function(){Zn(this.g,"b")},Do.prototype.createWebChannel=Do.prototype.g,Lo.prototype.send=Lo.prototype.u,Lo.prototype.open=Lo.prototype.m,Lo.prototype.close=Lo.prototype.close,Dr.NO_ERROR=0,Dr.TIMEOUT=8,Dr.HTTP_ERROR=6,Lr.COMPLETE="complete",Rr.EventType=Fr,Fr.OPEN="a",Fr.CLOSE="b",Fr.ERROR="c",Fr.MESSAGE="d",Jn.prototype.listen=Jn.prototype.N,Qi.prototype.listenOnce=Qi.prototype.O,Qi.prototype.getLastError=Qi.prototype.La,Qi.prototype.getLastErrorCode=Qi.prototype.Da,Qi.prototype.getStatus=Qi.prototype.ba,Qi.prototype.getResponseJson=Qi.prototype.Qa,Qi.prototype.getResponseText=Qi.prototype.ga,Qi.prototype.send=Qi.prototype.ea;var Mo,Fo,Uo=Ot.createWebChannelTransport=function(){return new Do},Vo=Ot.getStatEventTarget=function(){return Tr()},jo=Ot.ErrorCode=Dr,zo=Ot.EventType=Lr,Bo=Ot.Event=Sr,qo=Ot.Stat={rb:0,ub:1,vb:2,Ob:3,Tb:4,Qb:5,Rb:6,Pb:7,Nb:8,Sb:9,PROXY:10,NOPROXY:11,Lb:12,Hb:13,Ib:14,Gb:15,Jb:16,Kb:17,nb:18,mb:19,ob:20},Ho=Ot.FetchXmlHttpFactory=Bi,$o=Ot.WebChannel=Rr,Ko=Ot.XhrIo=Qi,Go={};function Wo(){throw new Error("setTimeout has not been defined")}function Qo(){throw new Error("clearTimeout has not been defined")}function Xo(e){if(Mo===setTimeout)return setTimeout(e,0);if((Mo===Wo||!Mo)&&setTimeout)return Mo=setTimeout,setTimeout(e,0);try{return Mo(e,0)}catch(t){try{return Mo.call(null,e,0)}catch(t){return Mo.call(this,e,0)}}}!function(){try{Mo="function"==typeof setTimeout?setTimeout:Wo}catch(e){Mo=Wo}try{Fo="function"==typeof clearTimeout?clearTimeout:Qo}catch(e){Fo=Qo}}();var Yo,Jo=[],Zo=!1,es=-1;function ts(){Zo&&Yo&&(Zo=!1,Yo.length?Jo=Yo.concat(Jo):es=-1,Jo.length&&ns())}function ns(){if(!Zo){var e=Xo(ts);Zo=!0;for(var t=Jo.length;t;){for(Yo=Jo,Jo=[];++es<t;)Yo&&Yo[es].run();es=-1,t=Jo.length}Yo=null,Zo=!1,function(e){if(Fo===clearTimeout)return clearTimeout(e);if((Fo===Qo||!Fo)&&clearTimeout)return Fo=clearTimeout,clearTimeout(e);try{Fo(e)}catch(t){try{return Fo.call(null,e)}catch(t){return Fo.call(this,e)}}}(e)}}function rs(e,t){this.fun=e,this.array=t}function is(){}Go.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];Jo.push(new rs(e,t)),1!==Jo.length||Zo||Xo(ns)},rs.prototype.run=function(){this.fun.apply(null,this.array)},Go.title="browser",Go.browser=!0,Go.env={},Go.argv=[],Go.version="",Go.versions={},Go.on=is,Go.addListener=is,Go.once=is,Go.off=is,Go.removeListener=is,Go.removeAllListeners=is,Go.emit=is,Go.prependListener=is,Go.prependOnceListener=is,Go.listeners=function(e){return[]},Go.binding=function(e){throw new Error("process.binding is not supported")},Go.cwd=function(){return"/"},Go.chdir=function(e){throw new Error("process.chdir is not supported")},Go.umask=function(){return 0};const os="@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{constructor(e){this.uid=e}isAuthenticated(){return null!=this.uid}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ss.UNAUTHENTICATED=new ss(null),ss.GOOGLE_CREDENTIALS=new ss("google-credentials-uid"),ss.FIRST_PARTY=new ss("first-party-uid"),ss.MOCK_USER=new ss("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let as="9.1.3";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ls=new te("@firebase/firestore");function us(){return ls.logLevel}function cs(e,...t){if(ls.logLevel<=Q.DEBUG){const n=t.map(ds);ls.debug(`Firestore (${as}): ${e}`,...n)}}function hs(e,...t){if(ls.logLevel<=Q.ERROR){const n=t.map(ds);ls.error(`Firestore (${as}): ${e}`,...n)}}function fs(e,...t){if(ls.logLevel<=Q.WARN){const n=t.map(ds);ls.warn(`Firestore (${as}): ${e}`,...n)}}function ds(e){if("string"==typeof e)return e;try{return t=e,JSON.stringify(t)}catch(t){return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(e="Unexpected state"){const t=`FIRESTORE (${as}) INTERNAL ASSERTION FAILED: `+e;throw hs(t),new Error(t)}function ms(e,t){e||ps()}function gs(e,t){return e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class vs extends Error{constructor(e,t){super(t),this.code=e,this.message=t,this.name="FirebaseError",this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,t){this.user=t,this.type="OAuth",this.authHeaders={},this.authHeaders.Authorization=`Bearer ${e}`}}class Es{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ss.UNAUTHENTICATED)))}shutdown(){}}class Ss{constructor(e){this.t=e,this.currentUser=ss.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let n=this.i;const r=e=>this.i!==n?(n=this.i,t(e)):Promise.resolve();let i=new ws;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new ws,e.enqueueRetryable((()=>r(this.currentUser)))};const o=()=>{const t=i;e.enqueueRetryable((async()=>{await t.promise,await r(this.currentUser)}))},s=e=>{cs("FirebaseCredentialsProvider","Auth detected"),this.auth=e,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit((e=>s(e))),setTimeout((()=>{if(!this.auth){const e=this.t.getImmediate({optional:!0});e?s(e):(cs("FirebaseCredentialsProvider","Auth not yet detected"),i.resolve(),i=new ws)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((t=>this.i!==e?(cs("FirebaseCredentialsProvider","getToken aborted due to token change."),this.getToken()):t?(ms("string"==typeof t.accessToken),new bs(t.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return ms(null===e||"string"==typeof e),new ss(e)}}class ks{constructor(e,t,n){this.h=e,this.l=t,this.m=n,this.type="FirstParty",this.user=ss.FIRST_PARTY}get authHeaders(){const e={"X-Goog-AuthUser":this.l},t=this.h.auth.getAuthHeaderValueForFirstParty([]);return t&&(e.Authorization=t),this.m&&(e["X-Goog-Iam-Authorization-Token"]=this.m),e}}class Ts{constructor(e,t,n){this.h=e,this.l=t,this.m=n}getToken(){return Promise.resolve(new ks(this.h,this.l,this.m))}start(e,t){e.enqueueRetryable((()=>t(ss.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=e=>this.g(e),this.p=e=>t.writeSequenceNumber(e))}g(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.p&&this.p(e),e}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xs(e){const t="undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(e);if(t&&"function"==typeof t.getRandomValues)t.getRandomValues(n);else for(let t=0;t<e;t++)n[t]=Math.floor(256*Math.random());return n}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Is.T=-1;class Cs{static I(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const r=xs(40);for(let i=0;i<r.length;++i)n.length<20&&r[i]<t&&(n+=e.charAt(r[i]%e.length))}return n}}function _s(e,t){return e<t?-1:e>t?1:0}function Ns(e,t,n){return e.length===t.length&&e.every(((e,r)=>n(e,t[r])))}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class As{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new vs(ys.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new vs(ys.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new vs(ys.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new vs(ys.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return As.fromMillis(Date.now())}static fromDate(e){return As.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new As(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?_s(this.nanoseconds,e.nanoseconds):_s(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e){this.timestamp=e}static fromTimestamp(e){return new Ds(e)}static min(){return new Ds(new As(0,0))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(e){let t=0;for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t++;return t}function Ps(e,t){for(const n in e)Object.prototype.hasOwnProperty.call(e,n)&&t(n,e[n])}function Os(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(e,t,n){void 0===t?t=0:t>e.length&&ps(),void 0===n?n=e.length-t:n>e.length-t&&ps(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return 0===Rs.comparator(this,e)}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Rs?e.forEach((e=>{t.push(e)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=void 0===e?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return 0===this.length}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let r=0;r<n;r++){const n=e.get(r),i=t.get(r);if(n<i)return-1;if(n>i)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class Ms extends Rs{construct(e,t,n){return new Ms(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new vs(ys.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((e=>e.length>0)))}return new Ms(t)}static emptyPath(){return new Ms([])}}const Fs=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Us extends Rs{construct(e,t,n){return new Us(e,t,n)}static isValidIdentifier(e){return Fs.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Us.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return 1===this.length&&"__name__"===this.get(0)}static keyField(){return new Us(["__name__"])}static fromServerFormat(e){const t=[];let n="",r=0;const i=()=>{if(0===n.length)throw new vs(ys.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;r<e.length;){const t=e[r];if("\\"===t){if(r+1===e.length)throw new vs(ys.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const t=e[r+1];if("\\"!==t&&"."!==t&&"`"!==t)throw new vs(ys.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=t,r+=2}else"`"===t?(o=!o,r++):"."!==t||o?(n+=t,r++):(i(),r++)}if(i(),o)throw new vs(ys.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Us(t)}static emptyPath(){return new Us([])}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(e){this.fields=e,e.sort(Us.comparator)}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Ns(this.fields,e.fields,((e,t)=>e.isEqual(t)))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class js{constructor(e){this.binaryString=e}static fromBase64String(e){const t=atob(e);return new js(t)}static fromUint8Array(e){const t=function(e){let t="";for(let n=0;n<e.length;++n)t+=String.fromCharCode(e[n]);return t}(e);return new js(t)}toBase64(){var e;return e=this.binaryString,btoa(e)}toUint8Array(){return function(e){const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return _s(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}js.EMPTY_BYTE_STRING=new js("");const zs=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Bs(e){if(ms(!!e),"string"==typeof e){let t=0;const n=zs.exec(e);if(ms(!!n),n[1]){let e=n[1];e=(e+"000000000").substr(0,9),t=Number(e)}const r=new Date(e);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:qs(e.seconds),nanos:qs(e.nanos)}}function qs(e){return"number"==typeof e?e:"string"==typeof e?Number(e):0}function Hs(e){return"string"==typeof e?js.fromBase64String(e):js.fromUint8Array(e)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $s(e){var t,n;return"server_timestamp"===(null===(n=((null===(t=null==e?void 0:e.mapValue)||void 0===t?void 0:t.fields)||{}).__type__)||void 0===n?void 0:n.stringValue)}function Ks(e){const t=e.mapValue.fields.__previous_value__;return $s(t)?Ks(t):t}function Gs(e){const t=Bs(e.mapValue.fields.__local_write_time__.timestampValue);return new As(t.seconds,t.nanos)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ws(e){return null==e}function Qs(e){return 0===e&&1/e==-1/0}function Xs(e){return"number"==typeof e&&Number.isInteger(e)&&!Qs(e)&&e<=Number.MAX_SAFE_INTEGER&&e>=Number.MIN_SAFE_INTEGER}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e){this.path=e}static fromPath(e){return new Ys(Ms.fromString(e))}static fromName(e){return new Ys(Ms.fromString(e).popFirst(5))}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}isEqual(e){return null!==e&&0===Ms.comparator(this.path,e.path)}toString(){return this.path.toString()}static comparator(e,t){return Ms.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Ys(new Ms(e.slice()))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Js(e){return"nullValue"in e?0:"booleanValue"in e?1:"integerValue"in e||"doubleValue"in e?2:"timestampValue"in e?3:"stringValue"in e?5:"bytesValue"in e?6:"referenceValue"in e?7:"geoPointValue"in e?8:"arrayValue"in e?9:"mapValue"in e?$s(e)?4:10:ps()}function Zs(e,t){const n=Js(e);if(n!==Js(t))return!1;switch(n){case 0:return!0;case 1:return e.booleanValue===t.booleanValue;case 4:return Gs(e).isEqual(Gs(t));case 3:return function(e,t){if("string"==typeof e.timestampValue&&"string"==typeof t.timestampValue&&e.timestampValue.length===t.timestampValue.length)return e.timestampValue===t.timestampValue;const n=Bs(e.timestampValue),r=Bs(t.timestampValue);return n.seconds===r.seconds&&n.nanos===r.nanos}(e,t);case 5:return e.stringValue===t.stringValue;case 6:return function(e,t){return Hs(e.bytesValue).isEqual(Hs(t.bytesValue))}(e,t);case 7:return e.referenceValue===t.referenceValue;case 8:return function(e,t){return qs(e.geoPointValue.latitude)===qs(t.geoPointValue.latitude)&&qs(e.geoPointValue.longitude)===qs(t.geoPointValue.longitude)}(e,t);case 2:return function(e,t){if("integerValue"in e&&"integerValue"in t)return qs(e.integerValue)===qs(t.integerValue);if("doubleValue"in e&&"doubleValue"in t){const n=qs(e.doubleValue),r=qs(t.doubleValue);return n===r?Qs(n)===Qs(r):isNaN(n)&&isNaN(r)}return!1}(e,t);case 9:return Ns(e.arrayValue.values||[],t.arrayValue.values||[],Zs);case 10:return function(e,t){const n=e.mapValue.fields||{},r=t.mapValue.fields||{};if(Ls(n)!==Ls(r))return!1;for(const e in n)if(n.hasOwnProperty(e)&&(void 0===r[e]||!Zs(n[e],r[e])))return!1;return!0}(e,t);default:return ps()}}function ea(e,t){return void 0!==(e.values||[]).find((e=>Zs(e,t)))}function ta(e,t){const n=Js(e),r=Js(t);if(n!==r)return _s(n,r);switch(n){case 0:return 0;case 1:return _s(e.booleanValue,t.booleanValue);case 2:return function(e,t){const n=qs(e.integerValue||e.doubleValue),r=qs(t.integerValue||t.doubleValue);return n<r?-1:n>r?1:n===r?0:isNaN(n)?isNaN(r)?0:-1:1}(e,t);case 3:return na(e.timestampValue,t.timestampValue);case 4:return na(Gs(e),Gs(t));case 5:return _s(e.stringValue,t.stringValue);case 6:return function(e,t){const n=Hs(e),r=Hs(t);return n.compareTo(r)}(e.bytesValue,t.bytesValue);case 7:return function(e,t){const n=e.split("/"),r=t.split("/");for(let e=0;e<n.length&&e<r.length;e++){const t=_s(n[e],r[e]);if(0!==t)return t}return _s(n.length,r.length)}(e.referenceValue,t.referenceValue);case 8:return function(e,t){const n=_s(qs(e.latitude),qs(t.latitude));return 0!==n?n:_s(qs(e.longitude),qs(t.longitude))}(e.geoPointValue,t.geoPointValue);case 9:return function(e,t){const n=e.values||[],r=t.values||[];for(let e=0;e<n.length&&e<r.length;++e){const t=ta(n[e],r[e]);if(t)return t}return _s(n.length,r.length)}(e.arrayValue,t.arrayValue);case 10:return function(e,t){const n=e.fields||{},r=Object.keys(n),i=t.fields||{},o=Object.keys(i);r.sort(),o.sort();for(let e=0;e<r.length&&e<o.length;++e){const t=_s(r[e],o[e]);if(0!==t)return t;const s=ta(n[r[e]],i[o[e]]);if(0!==s)return s}return _s(r.length,o.length)}(e.mapValue,t.mapValue);default:throw ps()}}function na(e,t){if("string"==typeof e&&"string"==typeof t&&e.length===t.length)return _s(e,t);const n=Bs(e),r=Bs(t),i=_s(n.seconds,r.seconds);return 0!==i?i:_s(n.nanos,r.nanos)}function ra(e){return ia(e)}function ia(e){var t,n;return"nullValue"in e?"null":"booleanValue"in e?""+e.booleanValue:"integerValue"in e?""+e.integerValue:"doubleValue"in e?""+e.doubleValue:"timestampValue"in e?function(e){const t=Bs(e);return`time(${t.seconds},${t.nanos})`}(e.timestampValue):"stringValue"in e?e.stringValue:"bytesValue"in e?Hs(e.bytesValue).toBase64():"referenceValue"in e?(n=e.referenceValue,Ys.fromName(n).toString()):"geoPointValue"in e?`geo(${(t=e.geoPointValue).latitude},${t.longitude})`:"arrayValue"in e?function(e){let t="[",n=!0;for(const r of e.values||[])n?n=!1:t+=",",t+=ia(r);return t+"]"}(e.arrayValue):"mapValue"in e?function(e){const t=Object.keys(e.fields||{}).sort();let n="{",r=!0;for(const i of t)r?r=!1:n+=",",n+=`${i}:${ia(e.fields[i])}`;return n+"}"}(e.mapValue):ps()}function oa(e){return!!e&&"integerValue"in e}function sa(e){return!!e&&"arrayValue"in e}function aa(e){return!!e&&"nullValue"in e}function la(e){return!!e&&"doubleValue"in e&&isNaN(Number(e.doubleValue))}function ua(e){return!!e&&"mapValue"in e}function ca(e){if(e.geoPointValue)return{geoPointValue:Object.assign({},e.geoPointValue)};if(e.timestampValue&&"object"==typeof e.timestampValue)return{timestampValue:Object.assign({},e.timestampValue)};if(e.mapValue){const t={mapValue:{fields:{}}};return Ps(e.mapValue.fields,((e,n)=>t.mapValue.fields[e]=ca(n))),t}if(e.arrayValue){const t={arrayValue:{values:[]}};for(let n=0;n<(e.arrayValue.values||[]).length;++n)t.arrayValue.values[n]=ca(e.arrayValue.values[n]);return t}return Object.assign({},e)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ha{constructor(e){this.value=e}static empty(){return new ha({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!ua(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ca(t)}setAll(e){let t=Us.emptyPath(),n={},r=[];e.forEach(((e,i)=>{if(!t.isImmediateParentOf(i)){const e=this.getFieldsMap(t);this.applyChanges(e,n,r),n={},r=[],t=i.popLast()}e?n[i.lastSegment()]=ca(e):r.push(i.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,n,r)}delete(e){const t=this.field(e.popLast());ua(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Zs(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let r=t.mapValue.fields[e.get(n)];ua(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,n){Ps(t,((t,n)=>e[t]=n));for(const t of n)delete e[t]}clone(){return new ha(ca(this.value))}}function fa(e){const t=[];return Ps(e.fields,((e,n)=>{const r=new Us([e]);if(ua(n)){const e=fa(n.mapValue).fields;if(0===e.length)t.push(r);else for(const n of e)t.push(r.child(n))}else t.push(r)})),new Vs(t)
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class da{constructor(e,t,n,r,i){this.key=e,this.documentType=t,this.version=n,this.data=r,this.documentState=i}static newInvalidDocument(e){return new da(e,0,Ds.min(),ha.empty(),0)}static newFoundDocument(e,t,n){return new da(e,1,t,n,0)}static newNoDocument(e,t){return new da(e,2,t,ha.empty(),0)}static newUnknownDocument(e,t){return new da(e,3,t,ha.empty(),2)}convertToFoundDocument(e,t){return this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ha.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ha.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this}get hasLocalMutations(){return 1===this.documentState}get hasCommittedMutations(){return 2===this.documentState}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return 0!==this.documentType}isFoundDocument(){return 1===this.documentType}isNoDocument(){return 2===this.documentType}isUnknownDocument(){return 3===this.documentType}isEqual(e){return e instanceof da&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}clone(){return new da(this.key,this.documentType,this.version,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(e,t=null,n=[],r=[],i=null,o=null,s=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=r,this.limit=i,this.startAt=o,this.endAt=s,this.A=null}}function ma(e,t=null,n=[],r=[],i=null,o=null,s=null){return new pa(e,t,n,r,i,o,s)}function ga(e){const t=gs(e);if(null===t.A){let e=t.path.canonicalString();null!==t.collectionGroup&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((e=>function(e){return e.field.canonicalString()+e.op.toString()+ra(e.value)}(e))).join(","),e+="|ob:",e+=t.orderBy.map((e=>function(e){return e.field.canonicalString()+e.dir}(e))).join(","),Ws(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=Na(t.startAt)),t.endAt&&(e+="|ub:",e+=Na(t.endAt)),t.A=e}return t.A}function ya(e,t){if(e.limit!==t.limit)return!1;if(e.orderBy.length!==t.orderBy.length)return!1;for(let n=0;n<e.orderBy.length;n++)if(!Da(e.orderBy[n],t.orderBy[n]))return!1;if(e.filters.length!==t.filters.length)return!1;for(let i=0;i<e.filters.length;i++)if(n=e.filters[i],r=t.filters[i],n.op!==r.op||!n.field.isEqual(r.field)||!Zs(n.value,r.value))return!1;var n,r;return e.collectionGroup===t.collectionGroup&&!!e.path.isEqual(t.path)&&!!Pa(e.startAt,t.startAt)&&Pa(e.endAt,t.endAt)}function va(e){return Ys.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}class wa extends class{}{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?"in"===t||"not-in"===t?this.R(e,t,n):new ba(e,t,n):"array-contains"===t?new Ta(e,n):"in"===t?new Ia(e,n):"not-in"===t?new xa(e,n):"array-contains-any"===t?new Ca(e,n):new wa(e,t,n)}static R(e,t,n){return"in"===t?new Ea(e,n):new Sa(e,n)}matches(e){const t=e.data.field(this.field);return"!="===this.op?null!==t&&this.P(ta(t,this.value)):null!==t&&Js(this.value)===Js(t)&&this.P(ta(t,this.value))}P(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return 0===e;case"!=":return 0!==e;case">":return e>0;case">=":return e>=0;default:return ps()}}v(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}}class ba extends wa{constructor(e,t,n){super(e,t,n),this.key=Ys.fromName(n.referenceValue)}matches(e){const t=Ys.comparator(e.key,this.key);return this.P(t)}}class Ea extends wa{constructor(e,t){super(e,"in",t),this.keys=ka("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class Sa extends wa{constructor(e,t){super(e,"not-in",t),this.keys=ka("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function ka(e,t){var n;return((null===(n=t.arrayValue)||void 0===n?void 0:n.values)||[]).map((e=>Ys.fromName(e.referenceValue)))}class Ta extends wa{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return sa(t)&&ea(t.arrayValue,this.value)}}class Ia extends wa{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return null!==t&&ea(this.value.arrayValue,t)}}class xa extends wa{constructor(e,t){super(e,"not-in",t)}matches(e){if(ea(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return null!==t&&!ea(this.value.arrayValue,t)}}class Ca extends wa{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!sa(t)||!t.arrayValue.values)&&t.arrayValue.values.some((e=>ea(this.value.arrayValue,e)))}}class _a{constructor(e,t){this.position=e,this.before=t}}function Na(e){return`${e.before?"b":"a"}:${e.position.map((e=>ra(e))).join(",")}`}class Aa{constructor(e,t="asc"){this.field=e,this.dir=t}}function Da(e,t){return e.dir===t.dir&&e.field.isEqual(t.field)}function La(e,t,n){let r=0;for(let i=0;i<e.position.length;i++){const o=t[i],s=e.position[i];if(r=o.field.isKeyField()?Ys.comparator(Ys.fromName(s.referenceValue),n.key):ta(s,n.data.field(o.field)),"desc"===o.dir&&(r*=-1),0!==r)break}return e.before?r<=0:r<0}function Pa(e,t){if(null===e)return null===t;if(null===t)return!1;if(e.before!==t.before||e.position.length!==t.position.length)return!1;for(let n=0;n<e.position.length;n++)if(!Zs(e.position[n],t.position[n]))return!1;return!0}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oa{constructor(e,t=null,n=[],r=[],i=null,o="F",s=null,a=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=r,this.limit=i,this.limitType=o,this.startAt=s,this.endAt=a,this.V=null,this.S=null,this.startAt,this.endAt}}function Ra(e,t,n,r,i,o,s,a){return new Oa(e,t,n,r,i,o,s,a)}function Ma(e){return new Oa(e)}function Fa(e){return!Ws(e.limit)&&"F"===e.limitType}function Ua(e){return!Ws(e.limit)&&"L"===e.limitType}function Va(e){return e.explicitOrderBy.length>0?e.explicitOrderBy[0].field:null}function ja(e){for(const t of e.filters)if(t.v())return t.field;return null}function za(e){return null!==e.collectionGroup}function Ba(e){const t=gs(e);if(null===t.V){t.V=[];const e=ja(t),n=Va(t);if(null!==e&&null===n)e.isKeyField()||t.V.push(new Aa(e)),t.V.push(new Aa(Us.keyField(),"asc"));else{let e=!1;for(const n of t.explicitOrderBy)t.V.push(n),n.field.isKeyField()&&(e=!0);if(!e){const e=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";t.V.push(new Aa(Us.keyField(),e))}}}return t.V}function qa(e){const t=gs(e);if(!t.S)if("F"===t.limitType)t.S=ma(t.path,t.collectionGroup,Ba(t),t.filters,t.limit,t.startAt,t.endAt);else{const e=[];for(const n of Ba(t)){const t="desc"===n.dir?"asc":"desc";e.push(new Aa(n.field,t))}const n=t.endAt?new _a(t.endAt.position,!t.endAt.before):null,r=t.startAt?new _a(t.startAt.position,!t.startAt.before):null;t.S=ma(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}return t.S}function Ha(e,t,n){return new Oa(e.path,e.collectionGroup,e.explicitOrderBy.slice(),e.filters.slice(),t,n,e.startAt,e.endAt)}function $a(e,t){return ya(qa(e),qa(t))&&e.limitType===t.limitType}function Ka(e){return`${ga(qa(e))}|lt:${e.limitType}`}function Ga(e){return`Query(target=${function(e){let t=e.path.canonicalString();return null!==e.collectionGroup&&(t+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(t+=`, filters: [${e.filters.map((e=>{var t;return`${(t=e).field.canonicalString()} ${t.op} ${ra(t.value)}`})).join(", ")}]`),Ws(e.limit)||(t+=", limit: "+e.limit),e.orderBy.length>0&&(t+=`, orderBy: [${e.orderBy.map((e=>function(e){return`${e.field.canonicalString()} (${e.dir})`}(e))).join(", ")}]`),e.startAt&&(t+=", startAt: "+Na(e.startAt)),e.endAt&&(t+=", endAt: "+Na(e.endAt)),`Target(${t})`}(qa(e))}; limitType=${e.limitType})`}function Wa(e,t){return t.isFoundDocument()&&function(e,t){const n=t.key.path;return null!==e.collectionGroup?t.key.hasCollectionId(e.collectionGroup)&&e.path.isPrefixOf(n):Ys.isDocumentKey(e.path)?e.path.isEqual(n):e.path.isImmediateParentOf(n)}(e,t)&&function(e,t){for(const n of e.explicitOrderBy)if(!n.field.isKeyField()&&null===t.data.field(n.field))return!1;return!0}(e,t)&&function(e,t){for(const n of e.filters)if(!n.matches(t))return!1;return!0}(e,t)&&function(e,t){return!(e.startAt&&!La(e.startAt,Ba(e),t))&&(!e.endAt||!La(e.endAt,Ba(e),t))}(e,t)}function Qa(e){return(t,n)=>{let r=!1;for(const i of Ba(e)){const e=Xa(i,t,n);if(0!==e)return e;r=r||i.field.isKeyField()}return 0}}function Xa(e,t,n){const r=e.field.isKeyField()?Ys.comparator(t.key,n.key):function(e,t,n){const r=t.data.field(e),i=n.data.field(e);return null!==r&&null!==i?ta(r,i):ps()}(e.field,t,n);switch(e.dir){case"asc":return r;case"desc":return-1*r;default:return ps()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ya(e,t){if(e.D){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qs(t)?"-0":t}}function Ja(e){return{integerValue:""+e}}function Za(e,t){return Xs(t)?Ja(t):Ya(e,t)}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(){this._=void 0}}function tl(e,t,n){return e instanceof il?function(e,t){const n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:e.seconds,nanos:e.nanoseconds}}}};return t&&(n.fields.__previous_value__=t),{mapValue:n}}(n,t):e instanceof ol?sl(e,t):e instanceof al?ll(e,t):function(e,t){const n=rl(e,t),r=cl(n)+cl(e.C);return oa(n)&&oa(e.C)?Ja(r):Ya(e.N,r)}(e,t)}function nl(e,t,n){return e instanceof ol?sl(e,t):e instanceof al?ll(e,t):n}function rl(e,t){var n;return e instanceof ul?oa(n=t)||function(e){return!!e&&"doubleValue"in e}(n)?t:{integerValue:0}:null}class il extends el{}class ol extends el{constructor(e){super(),this.elements=e}}function sl(e,t){const n=hl(t);for(const t of e.elements)n.some((e=>Zs(e,t)))||n.push(t);return{arrayValue:{values:n}}}class al extends el{constructor(e){super(),this.elements=e}}function ll(e,t){let n=hl(t);for(const t of e.elements)n=n.filter((e=>!Zs(e,t)));return{arrayValue:{values:n}}}class ul extends el{constructor(e,t){super(),this.N=e,this.C=t}}function cl(e){return qs(e.integerValue||e.doubleValue)}function hl(e){return sa(e)&&e.arrayValue.values?e.arrayValue.values.slice():[]}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,t){this.version=e,this.transformResults=t}}class dl{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new dl}static exists(e){return new dl(void 0,e)}static updateTime(e){return new dl(e)}get isNone(){return void 0===this.updateTime&&void 0===this.exists}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function pl(e,t){return void 0!==e.updateTime?t.isFoundDocument()&&t.version.isEqual(e.updateTime):void 0===e.exists||e.exists===t.isFoundDocument()}class ml{}function gl(e,t,n){e instanceof El?function(e,t,n){const r=e.value.clone(),i=Tl(e.fieldTransforms,t,n.transformResults);r.setAll(i),t.convertToFoundDocument(n.version,r).setHasCommittedMutations()}(e,t,n):e instanceof Sl?function(e,t,n){if(!pl(e.precondition,t))return void t.convertToUnknownDocument(n.version);const r=Tl(e.fieldTransforms,t,n.transformResults),i=t.data;i.setAll(kl(e)),i.setAll(r),t.convertToFoundDocument(n.version,i).setHasCommittedMutations()}(e,t,n):function(e,t,n){t.convertToNoDocument(n.version).setHasCommittedMutations()}(0,t,n)}function yl(e,t,n){e instanceof El?function(e,t,n){if(!pl(e.precondition,t))return;const r=e.value.clone(),i=Il(e.fieldTransforms,n,t);r.setAll(i),t.convertToFoundDocument(bl(t),r).setHasLocalMutations()}(e,t,n):e instanceof Sl?function(e,t,n){if(!pl(e.precondition,t))return;const r=Il(e.fieldTransforms,n,t),i=t.data;i.setAll(kl(e)),i.setAll(r),t.convertToFoundDocument(bl(t),i).setHasLocalMutations()}(e,t,n):function(e,t){pl(e.precondition,t)&&t.convertToNoDocument(Ds.min())}(e,t)}function vl(e,t){let n=null;for(const r of e.fieldTransforms){const e=t.data.field(r.field),i=rl(r.transform,e||null);null!=i&&(null==n&&(n=ha.empty()),n.set(r.field,i))}return n||null}function wl(e,t){return e.type===t.type&&!!e.key.isEqual(t.key)&&!!e.precondition.isEqual(t.precondition)&&!!function(e,t){return void 0===e&&void 0===t||!(!e||!t)&&Ns(e,t,((e,t)=>function(e,t){return e.field.isEqual(t.field)&&function(e,t){return e instanceof ol&&t instanceof ol||e instanceof al&&t instanceof al?Ns(e.elements,t.elements,Zs):e instanceof ul&&t instanceof ul?Zs(e.C,t.C):e instanceof il&&t instanceof il}(e.transform,t.transform)}(e,t)))}(e.fieldTransforms,t.fieldTransforms)&&(0===e.type?e.value.isEqual(t.value):1!==e.type||e.data.isEqual(t.data)&&e.fieldMask.isEqual(t.fieldMask))}function bl(e){return e.isFoundDocument()?e.version:Ds.min()}class El extends ml{constructor(e,t,n,r=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=r,this.type=0}}class Sl extends ml{constructor(e,t,n,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=r,this.fieldTransforms=i,this.type=1}}function kl(e){const t=new Map;return e.fieldMask.fields.forEach((n=>{if(!n.isEmpty()){const r=e.data.field(n);t.set(n,r)}})),t}function Tl(e,t,n){const r=new Map;ms(e.length===n.length);for(let i=0;i<n.length;i++){const o=e[i],s=o.transform,a=t.data.field(o.field);r.set(o.field,nl(s,a,n[i]))}return r}function Il(e,t,n){const r=new Map;for(const i of e){const e=i.transform,o=n.data.field(i.field);r.set(i.field,tl(e,o,t))}return r}class xl extends ml{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}}class Cl extends ml{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e){this.count=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Nl,Al;function Dl(e){switch(e){default:return ps();case ys.CANCELLED:case ys.UNKNOWN:case ys.DEADLINE_EXCEEDED:case ys.RESOURCE_EXHAUSTED:case ys.INTERNAL:case ys.UNAVAILABLE:case ys.UNAUTHENTICATED:return!1;case ys.INVALID_ARGUMENT:case ys.NOT_FOUND:case ys.ALREADY_EXISTS:case ys.PERMISSION_DENIED:case ys.FAILED_PRECONDITION:case ys.ABORTED:case ys.OUT_OF_RANGE:case ys.UNIMPLEMENTED:case ys.DATA_LOSS:return!0}}function Ll(e){if(void 0===e)return hs("GRPC error has no .code"),ys.UNKNOWN;switch(e){case Nl.OK:return ys.OK;case Nl.CANCELLED:return ys.CANCELLED;case Nl.UNKNOWN:return ys.UNKNOWN;case Nl.DEADLINE_EXCEEDED:return ys.DEADLINE_EXCEEDED;case Nl.RESOURCE_EXHAUSTED:return ys.RESOURCE_EXHAUSTED;case Nl.INTERNAL:return ys.INTERNAL;case Nl.UNAVAILABLE:return ys.UNAVAILABLE;case Nl.UNAUTHENTICATED:return ys.UNAUTHENTICATED;case Nl.INVALID_ARGUMENT:return ys.INVALID_ARGUMENT;case Nl.NOT_FOUND:return ys.NOT_FOUND;case Nl.ALREADY_EXISTS:return ys.ALREADY_EXISTS;case Nl.PERMISSION_DENIED:return ys.PERMISSION_DENIED;case Nl.FAILED_PRECONDITION:return ys.FAILED_PRECONDITION;case Nl.ABORTED:return ys.ABORTED;case Nl.OUT_OF_RANGE:return ys.OUT_OF_RANGE;case Nl.UNIMPLEMENTED:return ys.UNIMPLEMENTED;case Nl.DATA_LOSS:return ys.DATA_LOSS;default:return ps()}}(Al=Nl||(Nl={}))[Al.OK=0]="OK",Al[Al.CANCELLED=1]="CANCELLED",Al[Al.UNKNOWN=2]="UNKNOWN",Al[Al.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Al[Al.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Al[Al.NOT_FOUND=5]="NOT_FOUND",Al[Al.ALREADY_EXISTS=6]="ALREADY_EXISTS",Al[Al.PERMISSION_DENIED=7]="PERMISSION_DENIED",Al[Al.UNAUTHENTICATED=16]="UNAUTHENTICATED",Al[Al.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Al[Al.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Al[Al.ABORTED=10]="ABORTED",Al[Al.OUT_OF_RANGE=11]="OUT_OF_RANGE",Al[Al.UNIMPLEMENTED=12]="UNIMPLEMENTED",Al[Al.INTERNAL=13]="INTERNAL",Al[Al.UNAVAILABLE=14]="UNAVAILABLE",Al[Al.DATA_LOSS=15]="DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Pl{constructor(e,t){this.comparator=e,this.root=t||Rl.EMPTY}insert(e,t){return new Pl(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Rl.BLACK,null,null))}remove(e){return new Pl(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Rl.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(0===n)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(0===r)return t+n.left.size;r<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ol(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ol(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ol(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ol(this.root,e,this.comparator,!0)}}class Ol{constructor(e,t,n,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?n(e.key,t):1,r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(0===i){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(0===this.nodeStack.length)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Rl{constructor(e,t,n,r,i){this.key=e,this.value=t,this.color=null!=n?n:Rl.RED,this.left=null!=r?r:Rl.EMPTY,this.right=null!=i?i:Rl.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,r,i){return new Rl(null!=e?e:this.key,null!=t?t:this.value,null!=n?n:this.color,null!=r?r:this.left,null!=i?i:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let r=this;const i=n(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,n),null):0===i?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,n)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Rl.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),0===t(e,r.key)){if(r.right.isEmpty())return Rl.EMPTY;n=r.right.min(),r=r.copy(n.key,n.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Rl.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Rl.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ps();if(this.right.isRed())throw ps();const e=this.left.check();if(e!==this.right.check())throw ps();return e+(this.isRed()?0:1)}}Rl.EMPTY=null,Rl.RED=!0,Rl.BLACK=!1,Rl.EMPTY=new class{constructor(){this.size=0}get key(){throw ps()}get value(){throw ps()}get color(){throw ps()}get left(){throw ps()}get right(){throw ps()}copy(e,t,n,r,i){return this}insert(e,t,n){return new Rl(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ml{constructor(e){this.comparator=e,this.data=new Pl(this.comparator)}has(e){return null!==this.data.get(e)}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const r=n.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let n;for(n=void 0!==t?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Fl(this.data.getIterator())}getIteratorFrom(e){return new Fl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((e=>{t=t.add(e)})),t}isEqual(e){if(!(e instanceof Ml))return!1;if(this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(0!==this.comparator(e,r))return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Ml(this.comparator);return t.data=e,t}}class Fl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul=new Pl(Ys.comparator);function Vl(){return Ul}const jl=new Pl(Ys.comparator);function zl(){return jl}const Bl=new Pl(Ys.comparator);function ql(){return Bl}const Hl=new Ml(Ys.comparator);function $l(...e){let t=Hl;for(const n of e)t=t.add(n);return t}const Kl=new Ml(_s);function Gl(){return Kl}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wl{constructor(e,t,n,r,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=r,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t){const n=new Map;return n.set(e,Ql.createSynthesizedTargetChangeForCurrentChange(e,t)),new Wl(Ds.min(),n,Gl(),Vl(),$l())}}class Ql{constructor(e,t,n,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t){return new Ql(js.EMPTY_BYTE_STRING,t,$l(),$l(),$l())}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xl{constructor(e,t,n,r){this.k=e,this.removedTargetIds=t,this.key=n,this.$=r}}class Yl{constructor(e,t){this.targetId=e,this.O=t}}class Jl{constructor(e,t,n=js.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=r}}class Zl{constructor(){this.F=0,this.M=nu(),this.L=js.EMPTY_BYTE_STRING,this.B=!1,this.U=!0}get current(){return this.B}get resumeToken(){return this.L}get q(){return 0!==this.F}get K(){return this.U}j(e){e.approximateByteSize()>0&&(this.U=!0,this.L=e)}W(){let e=$l(),t=$l(),n=$l();return this.M.forEach(((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:n=n.add(r);break;default:ps()}})),new Ql(this.L,this.B,e,t,n)}G(){this.U=!1,this.M=nu()}H(e,t){this.U=!0,this.M=this.M.insert(e,t)}J(e){this.U=!0,this.M=this.M.remove(e)}Y(){this.F+=1}X(){this.F-=1}Z(){this.U=!0,this.B=!0}}class eu{constructor(e){this.tt=e,this.et=new Map,this.nt=Vl(),this.st=tu(),this.it=new Ml(_s)}rt(e){for(const t of e.k)e.$&&e.$.isFoundDocument()?this.ot(t,e.$):this.at(t,e.key,e.$);for(const t of e.removedTargetIds)this.at(t,e.key,e.$)}ct(e){this.forEachTarget(e,(t=>{const n=this.ut(t);switch(e.state){case 0:this.ht(t)&&n.j(e.resumeToken);break;case 1:n.X(),n.q||n.G(),n.j(e.resumeToken);break;case 2:n.X(),n.q||this.removeTarget(t);break;case 3:this.ht(t)&&(n.Z(),n.j(e.resumeToken));break;case 4:this.ht(t)&&(this.lt(t),n.j(e.resumeToken));break;default:ps()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.et.forEach(((e,n)=>{this.ht(n)&&t(n)}))}ft(e){const t=e.targetId,n=e.O.count,r=this.dt(t);if(r){const e=r.target;if(va(e))if(0===n){const n=new Ys(e.path);this.at(t,n,da.newNoDocument(n,Ds.min()))}else ms(1===n);else this.wt(t)!==n&&(this.lt(t),this.it=this.it.add(t))}}_t(e){const t=new Map;this.et.forEach(((n,r)=>{const i=this.dt(r);if(i){if(n.current&&va(i.target)){const t=new Ys(i.target.path);null!==this.nt.get(t)||this.gt(r,t)||this.at(r,t,da.newNoDocument(t,e))}n.K&&(t.set(r,n.W()),n.G())}}));let n=$l();this.st.forEach(((e,t)=>{let r=!0;t.forEachWhile((e=>{const t=this.dt(e);return!t||2===t.purpose||(r=!1,!1)})),r&&(n=n.add(e))}));const r=new Wl(e,t,this.it,this.nt,n);return this.nt=Vl(),this.st=tu(),this.it=new Ml(_s),r}ot(e,t){if(!this.ht(e))return;const n=this.gt(e,t.key)?2:0;this.ut(e).H(t.key,n),this.nt=this.nt.insert(t.key,t),this.st=this.st.insert(t.key,this.yt(t.key).add(e))}at(e,t,n){if(!this.ht(e))return;const r=this.ut(e);this.gt(e,t)?r.H(t,1):r.J(t),this.st=this.st.insert(t,this.yt(t).delete(e)),n&&(this.nt=this.nt.insert(t,n))}removeTarget(e){this.et.delete(e)}wt(e){const t=this.ut(e).W();return this.tt.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Y(e){this.ut(e).Y()}ut(e){let t=this.et.get(e);return t||(t=new Zl,this.et.set(e,t)),t}yt(e){let t=this.st.get(e);return t||(t=new Ml(_s),this.st=this.st.insert(e,t)),t}ht(e){const t=null!==this.dt(e);return t||cs("WatchChangeAggregator","Detected inactive target",e),t}dt(e){const t=this.et.get(e);return t&&t.q?null:this.tt.Tt(e)}lt(e){this.et.set(e,new Zl),this.tt.getRemoteKeysForTarget(e).forEach((t=>{this.at(e,t,null)}))}gt(e,t){return this.tt.getRemoteKeysForTarget(e).has(t)}}function tu(){return new Pl(Ys.comparator)}function nu(){return new Pl(Ys.comparator)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru={asc:"ASCENDING",desc:"DESCENDING"},iu={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};class ou{constructor(e,t){this.databaseId=e,this.D=t}}function su(e,t){return e.D?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function au(e,t){return e.D?t.toBase64():t.toUint8Array()}function lu(e,t){return su(e,t.toTimestamp())}function uu(e){return ms(!!e),Ds.fromTimestamp(function(e){const t=Bs(e);return new As(t.seconds,t.nanos)}(e))}function cu(e,t){return function(e){return new Ms(["projects",e.projectId,"databases",e.database])}(e).child("documents").child(t).canonicalString()}function hu(e){const t=Ms.fromString(e);return ms(Pu(t)),t}function fu(e,t){return cu(e.databaseId,t.path)}function du(e,t){const n=hu(t);if(n.get(1)!==e.databaseId.projectId)throw new vs(ys.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+e.databaseId.projectId);if(n.get(3)!==e.databaseId.database)throw new vs(ys.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+e.databaseId.database);return new Ys(yu(n))}function pu(e,t){return cu(e.databaseId,t)}function mu(e){const t=hu(e);return 4===t.length?Ms.emptyPath():yu(t)}function gu(e){return new Ms(["projects",e.databaseId.projectId,"databases",e.databaseId.database]).canonicalString()}function yu(e){return ms(e.length>4&&"documents"===e.get(4)),e.popFirst(5)}function vu(e,t,n){return{name:fu(e,t),fields:n.value.mapValue.fields}}function wu(e,t){let n;if(t instanceof El)n={update:vu(e,t.key,t.value)};else if(t instanceof xl)n={delete:fu(e,t.key)};else if(t instanceof Sl)n={update:vu(e,t.key,t.data),updateMask:Lu(t.fieldMask)};else{if(!(t instanceof Cl))return ps();n={verify:fu(e,t.key)}}return t.fieldTransforms.length>0&&(n.updateTransforms=t.fieldTransforms.map((e=>function(e,t){const n=t.transform;if(n instanceof il)return{fieldPath:t.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof ol)return{fieldPath:t.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof al)return{fieldPath:t.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof ul)return{fieldPath:t.field.canonicalString(),increment:n.C};throw ps()}(0,e)))),t.precondition.isNone||(n.currentDocument=function(e,t){return void 0!==t.updateTime?{updateTime:lu(e,t.updateTime)}:void 0!==t.exists?{exists:t.exists}:ps()}(e,t.precondition)),n}function bu(e,t){return{documents:[pu(e,t.path)]}}function Eu(e,t){const n={structuredQuery:{}},r=t.path;null!==t.collectionGroup?(n.parent=pu(e,r),n.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(n.parent=pu(e,r.popLast()),n.structuredQuery.from=[{collectionId:r.lastSegment()}]);const i=function(e){if(0===e.length)return;const t=e.map((e=>function(e){if("=="===e.op){if(la(e.value))return{unaryFilter:{field:_u(e.field),op:"IS_NAN"}};if(aa(e.value))return{unaryFilter:{field:_u(e.field),op:"IS_NULL"}}}else if("!="===e.op){if(la(e.value))return{unaryFilter:{field:_u(e.field),op:"IS_NOT_NAN"}};if(aa(e.value))return{unaryFilter:{field:_u(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_u(e.field),op:Cu(e.op),value:e.value}}}(e)));return 1===t.length?t[0]:{compositeFilter:{op:"AND",filters:t}}}(t.filters);i&&(n.structuredQuery.where=i);const o=function(e){if(0!==e.length)return e.map((e=>function(e){return{field:_u(e.field),direction:xu(e.dir)}}(e)))}(t.orderBy);o&&(n.structuredQuery.orderBy=o);const s=function(e,t){return e.D||Ws(t)?t:{value:t}}(e,t.limit);return null!==s&&(n.structuredQuery.limit=s),t.startAt&&(n.structuredQuery.startAt=Tu(t.startAt)),t.endAt&&(n.structuredQuery.endAt=Tu(t.endAt)),n}function Su(e){let t=mu(e.parent);const n=e.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){ms(1===r);const e=n.from[0];e.allDescendants?i=e.collectionId:t=t.child(e.collectionId)}let o=[];n.where&&(o=ku(n.where));let s=[];n.orderBy&&(s=n.orderBy.map((e=>function(e){return new Aa(Nu(e.field),function(e){switch(e){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(e.direction))}(e))));let a=null;n.limit&&(a=function(e){let t;return t="object"==typeof e?e.value:e,Ws(t)?null:t}(n.limit));let l=null;n.startAt&&(l=Iu(n.startAt));let u=null;return n.endAt&&(u=Iu(n.endAt)),Ra(t,i,s,o,a,"F",l,u)}function ku(e){return e?void 0!==e.unaryFilter?[Du(e)]:void 0!==e.fieldFilter?[Au(e)]:void 0!==e.compositeFilter?e.compositeFilter.filters.map((e=>ku(e))).reduce(((e,t)=>e.concat(t))):ps():[]}function Tu(e){return{before:e.before,values:e.position}}function Iu(e){const t=!!e.before,n=e.values||[];return new _a(n,t)}function xu(e){return ru[e]}function Cu(e){return iu[e]}function _u(e){return{fieldPath:e.canonicalString()}}function Nu(e){return Us.fromServerFormat(e.fieldPath)}function Au(e){return wa.create(Nu(e.fieldFilter.field),function(e){switch(e){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return ps()}}(e.fieldFilter.op),e.fieldFilter.value)}function Du(e){switch(e.unaryFilter.op){case"IS_NAN":const t=Nu(e.unaryFilter.field);return wa.create(t,"==",{doubleValue:NaN});case"IS_NULL":const n=Nu(e.unaryFilter.field);return wa.create(n,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Nu(e.unaryFilter.field);return wa.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const i=Nu(e.unaryFilter.field);return wa.create(i,"!=",{nullValue:"NULL_VALUE"});default:return ps()}}function Lu(e){const t=[];return e.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Pu(e){return e.length>=4&&"projects"===e.get(0)&&"databases"===e.get(2)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(e){let t="";for(let n=0;n<e.length;n++)t.length>0&&(t=Mu(t)),t=Ru(e.get(n),t);return Mu(t)}function Ru(e,t){let n=t;const r=e.length;for(let t=0;t<r;t++){const r=e.charAt(t);switch(r){case"\0":n+="";break;case"":n+="";break;default:n+=r}}return n}function Mu(e){return e+""}class Fu{constructor(e,t,n){this.ownerId=e,this.allowTabSynchronization=t,this.leaseTimestampMs=n}}Fu.store="owner",Fu.key="owner";class Uu{constructor(e,t,n){this.userId=e,this.lastAcknowledgedBatchId=t,this.lastStreamToken=n}}Uu.store="mutationQueues",Uu.keyPath="userId";class Vu{constructor(e,t,n,r,i){this.userId=e,this.batchId=t,this.localWriteTimeMs=n,this.baseMutations=r,this.mutations=i}}Vu.store="mutations",Vu.keyPath="batchId",Vu.userMutationsIndex="userMutationsIndex",Vu.userMutationsKeyPath=["userId","batchId"];class ju{constructor(){}static prefixForUser(e){return[e]}static prefixForPath(e,t){return[e,Ou(t)]}static key(e,t,n){return[e,Ou(t),n]}}ju.store="documentMutations",ju.PLACEHOLDER=new ju;class zu{constructor(e,t,n,r,i,o){this.unknownDocument=e,this.noDocument=t,this.document=n,this.hasCommittedMutations=r,this.readTime=i,this.parentPath=o}}zu.store="remoteDocuments",zu.readTimeIndex="readTimeIndex",zu.readTimeIndexPath="readTime",zu.collectionReadTimeIndex="collectionReadTimeIndex",zu.collectionReadTimeIndexPath=["parentPath","readTime"];class Bu{constructor(e){this.byteSize=e}}Bu.store="remoteDocumentGlobal",Bu.key="remoteDocumentGlobalKey";class qu{constructor(e,t,n,r,i,o,s){this.targetId=e,this.canonicalId=t,this.readTime=n,this.resumeToken=r,this.lastListenSequenceNumber=i,this.lastLimboFreeSnapshotVersion=o,this.query=s}}qu.store="targets",qu.keyPath="targetId",qu.queryTargetsIndexName="queryTargetsIndex",qu.queryTargetsKeyPath=["canonicalId","targetId"];class Hu{constructor(e,t,n){this.targetId=e,this.path=t,this.sequenceNumber=n}}Hu.store="targetDocuments",Hu.keyPath=["targetId","path"],Hu.documentTargetsIndex="documentTargetsIndex",Hu.documentTargetsKeyPath=["path","targetId"];class $u{constructor(e,t,n,r){this.highestTargetId=e,this.highestListenSequenceNumber=t,this.lastRemoteSnapshotVersion=n,this.targetCount=r}}$u.key="targetGlobalKey",$u.store="targetGlobal";class Ku{constructor(e,t){this.collectionId=e,this.parent=t}}Ku.store="collectionParents",Ku.keyPath=["collectionId","parent"];class Gu{constructor(e,t,n,r){this.clientId=e,this.updateTimeMs=t,this.networkEnabled=n,this.inForeground=r}}Gu.store="clientMetadata",Gu.keyPath="clientId";class Wu{constructor(e,t,n){this.bundleId=e,this.createTime=t,this.version=n}}Wu.store="bundles",Wu.keyPath="bundleId";class Qu{constructor(e,t,n){this.name=e,this.readTime=t,this.bundledQuery=n}}Qu.store="namedQueries",Qu.keyPath="name";Uu.store,Vu.store,ju.store,zu.store,qu.store,Fu.store,$u.store,Hu.store,Gu.store,Bu.store,Ku.store,Wu.store,Qu.store;const Xu="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Yu{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ps(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new Ju(((n,r)=>{this.nextCallback=t=>{this.wrapSuccess(e,t).next(n,r)},this.catchCallback=e=>{this.wrapFailure(t,e).next(n,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof Ju?t:Ju.resolve(t)}catch(e){return Ju.reject(e)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):Ju.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):Ju.reject(t)}static resolve(e){return new Ju(((t,n)=>{t(e)}))}static reject(e){return new Ju(((t,n)=>{n(e)}))}static waitFor(e){return new Ju(((t,n)=>{let r=0,i=0,o=!1;e.forEach((e=>{++r,e.next((()=>{++i,o&&i===r&&t()}),(e=>n(e)))})),o=!0,i===r&&t()}))}static or(e){let t=Ju.resolve(!1);for(const n of e)t=t.next((e=>e?Ju.resolve(e):n()));return t}static forEach(e,t){const n=[];return e.forEach(((e,r)=>{n.push(t.call(this,e,r))})),this.waitFor(n)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zu(e){return"IndexedDbTransactionError"===e.name}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ec{constructor(e,t,n,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=r}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let t=0;t<this.mutations.length;t++){const r=this.mutations[t];r.key.isEqual(e.key)&&gl(r,e,n[t])}}applyToLocalView(e){for(const t of this.baseMutations)t.key.isEqual(e.key)&&yl(t,e,this.localWriteTime);for(const t of this.mutations)t.key.isEqual(e.key)&&yl(t,e,this.localWriteTime)}applyToLocalDocumentSet(e){this.mutations.forEach((t=>{const n=e.get(t.key),r=n;this.applyToLocalView(r),n.isValidDocument()||r.convertToNoDocument(Ds.min())}))}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),$l())}isEqual(e){return this.batchId===e.batchId&&Ns(this.mutations,e.mutations,((e,t)=>wl(e,t)))&&Ns(this.baseMutations,e.baseMutations,((e,t)=>wl(e,t)))}}class tc{constructor(e,t,n,r){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=r}static from(e,t,n){ms(e.mutations.length===n.length);let r=ql();const i=e.mutations;for(let e=0;e<i.length;e++)r=r.insert(i[e].key,n[e].version);return new tc(e,t,n,r)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc{constructor(e,t,n,r,i=Ds.min(),o=Ds.min(),s=js.EMPTY_BYTE_STRING){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=s}withSequenceNumber(e){return new nc(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken)}withResumeToken(e,t){return new nc(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e)}withLastLimboFreeSnapshotVersion(e){return new nc(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rc{constructor(e){this.Wt=e}}function ic(e){const t=Su({parent:e.parent,structuredQuery:e.structuredQuery});return"LAST"===e.limitType?Ha(t,t.limit,"L"):t}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class oc{constructor(){this.Gt=new sc}addToCollectionParentIndex(e,t){return this.Gt.add(t),Ju.resolve()}getCollectionParents(e,t){return Ju.resolve(this.Gt.getEntries(t))}}class sc{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t]||new Ml(Ms.comparator),i=!r.has(n);return this.index[t]=r.add(n),i}has(e){const t=e.lastSegment(),n=e.popLast(),r=this.index[t];return r&&r.has(n)}getEntries(e){return(this.index[e]||new Ml(Ms.comparator)).toArray()}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new ac(e,ac.DEFAULT_COLLECTION_PERCENTILE,ac.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ac.DEFAULT_COLLECTION_PERCENTILE=10,ac.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,ac.DEFAULT=new ac(41943040,ac.DEFAULT_COLLECTION_PERCENTILE,ac.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),ac.DISABLED=new ac(-1,0,0);
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class lc{constructor(e){this.ne=e}next(){return this.ne+=2,this.ne}static se(){return new lc(0)}static ie(){return new lc(-1)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function uc(e){if(e.code!==ys.FAILED_PRECONDITION||e.message!==Xu)throw e;cs("LocalStore","Unexpectedly lost primary lease")}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class cc{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={}}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0!==n)for(const[t,r]of n)if(this.equalsFn(t,e))return r}has(e){return void 0!==this.get(e)}set(e,t){const n=this.mapKeyFn(e),r=this.inner[n];if(void 0!==r){for(let n=0;n<r.length;n++)if(this.equalsFn(r[n][0],e))return void(r[n]=[e,t]);r.push([e,t])}else this.inner[n]=[[e,t]]}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(void 0===n)return!1;for(let r=0;r<n.length;r++)if(this.equalsFn(n[r][0],e))return 1===n.length?delete this.inner[t]:n.splice(r,1),!0;return!1}forEach(e){Ps(this.inner,((t,n)=>{for(const[t,r]of n)e(t,r)}))}isEmpty(){return Os(this.inner)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hc{constructor(){this.changes=new cc((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}getReadTime(e){const t=this.changes.get(e);return t?t.readTime:Ds.min()}addEntry(e,t){this.assertNotApplied(),this.changes.set(e.key,{document:e,readTime:t})}removeEntry(e,t=null){this.assertNotApplied(),this.changes.set(e,{document:da.newInvalidDocument(e),readTime:t})}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return void 0!==n?Ju.resolve(n.document):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fc{constructor(e,t,n){this.He=e,this.In=t,this.Ht=n}An(e,t){return this.In.getAllMutationBatchesAffectingDocumentKey(e,t).next((n=>this.Rn(e,t,n)))}Rn(e,t,n){return this.He.getEntry(e,t).next((e=>{for(const t of n)t.applyToLocalView(e);return e}))}bn(e,t){e.forEach(((e,n)=>{for(const e of t)e.applyToLocalView(n)}))}Pn(e,t){return this.He.getEntries(e,t).next((t=>this.vn(e,t).next((()=>t))))}vn(e,t){return this.In.getAllMutationBatchesAffectingDocumentKeys(e,t).next((e=>this.bn(t,e)))}getDocumentsMatchingQuery(e,t,n){return function(e){return Ys.isDocumentKey(e.path)&&null===e.collectionGroup&&0===e.filters.length}(t)?this.Vn(e,t.path):za(t)?this.Sn(e,t,n):this.Dn(e,t,n)}Vn(e,t){return this.An(e,new Ys(t)).next((e=>{let t=zl();return e.isFoundDocument()&&(t=t.insert(e.key,e)),t}))}Sn(e,t,n){const r=t.collectionGroup;let i=zl();return this.Ht.getCollectionParents(e,r).next((o=>Ju.forEach(o,(o=>{const s=function(e,t){return new Oa(t,null,e.explicitOrderBy.slice(),e.filters.slice(),e.limit,e.limitType,e.startAt,e.endAt)}(t,o.child(r));return this.Dn(e,s,n).next((e=>{e.forEach(((e,t)=>{i=i.insert(e,t)}))}))})).next((()=>i))))}Dn(e,t,n){let r,i;return this.He.getDocumentsMatchingQuery(e,t,n).next((n=>(r=n,this.In.getAllMutationBatchesAffectingQuery(e,t)))).next((t=>(i=t,this.Cn(e,i,r).next((e=>{r=e;for(const e of i)for(const t of e.mutations){const n=t.key;let i=r.get(n);null==i&&(i=da.newInvalidDocument(n),r=r.insert(n,i)),yl(t,i,e.localWriteTime),i.isFoundDocument()||(r=r.remove(n))}}))))).next((()=>(r.forEach(((e,n)=>{Wa(t,n)||(r=r.remove(e))})),r)))}Cn(e,t,n){let r=$l();for(const e of t)for(const t of e.mutations)t instanceof Sl&&null===n.get(t.key)&&(r=r.add(t.key));let i=n;return this.He.getEntries(e,r).next((e=>(e.forEach(((e,t)=>{t.isFoundDocument()&&(i=i.insert(e,t))})),i)))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t,n,r){this.targetId=e,this.fromCache=t,this.Nn=n,this.xn=r}static kn(e,t){let n=$l(),r=$l();for(const e of t.docChanges)switch(e.type){case 0:n=n.add(e.doc.key);break;case 1:r=r.add(e.doc.key)}return new dc(e,t.fromCache,n,r)}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pc{$n(e){this.On=e}getDocumentsMatchingQuery(e,t,n,r){return function(e){return 0===e.filters.length&&null===e.limit&&null==e.startAt&&null==e.endAt&&(0===e.explicitOrderBy.length||1===e.explicitOrderBy.length&&e.explicitOrderBy[0].field.isKeyField())}(t)||n.isEqual(Ds.min())?this.Fn(e,t):this.On.Pn(e,r).next((i=>{const o=this.Mn(t,i);return(Fa(t)||Ua(t))&&this.Ln(t.limitType,o,r,n)?this.Fn(e,t):(us()<=Q.DEBUG&&cs("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),Ga(t)),this.On.getDocumentsMatchingQuery(e,t,n).next((e=>(o.forEach((t=>{e=e.insert(t.key,t)})),e))))}))}Mn(e,t){let n=new Ml(Qa(e));return t.forEach(((t,r)=>{Wa(e,r)&&(n=n.add(r))})),n}Ln(e,t,n,r){if(n.size!==t.size)return!0;const i="F"===e?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}Fn(e,t){return us()<=Q.DEBUG&&cs("QueryEngine","Using full collection scan to execute query:",Ga(t)),this.On.getDocumentsMatchingQuery(e,t,Ds.min())}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mc{constructor(e,t,n,r){this.persistence=e,this.Bn=t,this.N=r,this.Un=new Pl(_s),this.qn=new cc((e=>ga(e)),ya),this.Kn=Ds.min(),this.In=e.getMutationQueue(n),this.jn=e.getRemoteDocumentCache(),this.ze=e.getTargetCache(),this.Qn=new fc(this.jn,this.In,this.persistence.getIndexManager()),this.Je=e.getBundleCache(),this.Bn.$n(this.Qn)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Un)))}}function gc(e,t,n,r){return new mc(e,t,n,r)}async function yc(e,t){const n=gs(e);let r=n.In,i=n.Qn;const o=await n.persistence.runTransaction("Handle user change","readonly",(e=>{let o;return n.In.getAllMutationBatches(e).next((s=>(o=s,r=n.persistence.getMutationQueue(t),i=new fc(n.jn,r,n.persistence.getIndexManager()),r.getAllMutationBatches(e)))).next((t=>{const n=[],r=[];let s=$l();for(const e of o){n.push(e.batchId);for(const t of e.mutations)s=s.add(t.key)}for(const e of t){r.push(e.batchId);for(const t of e.mutations)s=s.add(t.key)}return i.Pn(e,s).next((e=>({Wn:e,removedBatchIds:n,addedBatchIds:r})))}))}));return n.In=r,n.Qn=i,n.Bn.$n(n.Qn),o}function vc(e){const t=gs(e);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.ze.getLastRemoteSnapshotVersion(e)))}function wc(e,t,n,r,i){let o=$l();return n.forEach((e=>o=o.add(e))),t.getEntries(e,o).next((e=>{let o=Vl();return n.forEach(((n,s)=>{const a=e.get(n),l=(null==i?void 0:i.get(n))||r;s.isNoDocument()&&s.version.isEqual(Ds.min())?(t.removeEntry(n,l),o=o.insert(n,s)):!a.isValidDocument()||s.version.compareTo(a.version)>0||0===s.version.compareTo(a.version)&&a.hasPendingWrites?(t.addEntry(s,l),o=o.insert(n,s)):cs("LocalStore","Ignoring outdated watch update for ",n,". Current version:",a.version," Watch version:",s.version)})),o}))}function bc(e,t){const n=gs(e);return n.persistence.runTransaction("Get next mutation batch","readonly",(e=>(void 0===t&&(t=-1),n.In.getNextMutationBatchAfterBatchId(e,t))))}function Ec(e,t){const n=gs(e);return n.persistence.runTransaction("Allocate target","readwrite",(e=>{let r;return n.ze.getTargetData(e,t).next((i=>i?(r=i,Ju.resolve(r)):n.ze.allocateTargetId(e).next((i=>(r=new nc(t,i,0,e.currentSequenceNumber),n.ze.addTargetData(e,r).next((()=>r)))))))})).then((e=>{const r=n.Un.get(e.targetId);return(null===r||e.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(n.Un=n.Un.insert(e.targetId,e),n.qn.set(t,e.targetId)),e}))}async function Sc(e,t,n){const r=gs(e),i=r.Un.get(t),o=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",o,(e=>r.persistence.referenceDelegate.removeTarget(e,i)))}catch(e){if(!Zu(e))throw e;cs("LocalStore",`Failed to update sequence numbers for target ${t}: ${e}`)}r.Un=r.Un.remove(t),r.qn.delete(i.target)}function kc(e,t,n){const r=gs(e);let i=Ds.min(),o=$l();return r.persistence.runTransaction("Execute query","readonly",(e=>function(e,t,n){const r=gs(e),i=r.qn.get(n);return void 0!==i?Ju.resolve(r.Un.get(i)):r.ze.getTargetData(t,n)}(r,e,qa(t)).next((t=>{if(t)return i=t.lastLimboFreeSnapshotVersion,r.ze.getMatchingKeysForTargetId(e,t.targetId).next((e=>{o=e}))})).next((()=>r.Bn.getDocumentsMatchingQuery(e,t,n?i:Ds.min(),n?o:$l()))).next((e=>({documents:e,Gn:o})))))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tc{constructor(e){this.N=e,this.Yn=new Map,this.Xn=new Map}getBundleMetadata(e,t){return Ju.resolve(this.Yn.get(t))}saveBundleMetadata(e,t){var n;return this.Yn.set(t.id,{id:(n=t).id,version:n.version,createTime:uu(n.createTime)}),Ju.resolve()}getNamedQuery(e,t){return Ju.resolve(this.Xn.get(t))}saveNamedQuery(e,t){return this.Xn.set(t.name,function(e){return{name:e.name,query:ic(e.bundledQuery),readTime:uu(e.readTime)}}(t)),Ju.resolve()}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ic{constructor(){this.Zn=new Ml(xc.ts),this.es=new Ml(xc.ns)}isEmpty(){return this.Zn.isEmpty()}addReference(e,t){const n=new xc(e,t);this.Zn=this.Zn.add(n),this.es=this.es.add(n)}ss(e,t){e.forEach((e=>this.addReference(e,t)))}removeReference(e,t){this.rs(new xc(e,t))}os(e,t){e.forEach((e=>this.removeReference(e,t)))}cs(e){const t=new Ys(new Ms([])),n=new xc(t,e),r=new xc(t,e+1),i=[];return this.es.forEachInRange([n,r],(e=>{this.rs(e),i.push(e.key)})),i}us(){this.Zn.forEach((e=>this.rs(e)))}rs(e){this.Zn=this.Zn.delete(e),this.es=this.es.delete(e)}hs(e){const t=new Ys(new Ms([])),n=new xc(t,e),r=new xc(t,e+1);let i=$l();return this.es.forEachInRange([n,r],(e=>{i=i.add(e.key)})),i}containsKey(e){const t=new xc(e,0),n=this.Zn.firstAfterOrEqual(t);return null!==n&&e.isEqual(n.key)}}class xc{constructor(e,t){this.key=e,this.ls=t}static ts(e,t){return Ys.comparator(e.key,t.key)||_s(e.ls,t.ls)}static ns(e,t){return _s(e.ls,t.ls)||Ys.comparator(e.key,t.key)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,t){this.Ht=e,this.referenceDelegate=t,this.In=[],this.fs=1,this.ds=new Ml(xc.ts)}checkEmpty(e){return Ju.resolve(0===this.In.length)}addMutationBatch(e,t,n,r){const i=this.fs;this.fs++,this.In.length>0&&this.In[this.In.length-1];const o=new ec(i,t,n,r);this.In.push(o);for(const t of r)this.ds=this.ds.add(new xc(t.key,i)),this.Ht.addToCollectionParentIndex(e,t.key.path.popLast());return Ju.resolve(o)}lookupMutationBatch(e,t){return Ju.resolve(this.ws(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,r=this._s(n),i=r<0?0:r;return Ju.resolve(this.In.length>i?this.In[i]:null)}getHighestUnacknowledgedBatchId(){return Ju.resolve(0===this.In.length?-1:this.fs-1)}getAllMutationBatches(e){return Ju.resolve(this.In.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new xc(t,0),r=new xc(t,Number.POSITIVE_INFINITY),i=[];return this.ds.forEachInRange([n,r],(e=>{const t=this.ws(e.ls);i.push(t)})),Ju.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new Ml(_s);return t.forEach((e=>{const t=new xc(e,0),r=new xc(e,Number.POSITIVE_INFINITY);this.ds.forEachInRange([t,r],(e=>{n=n.add(e.ls)}))})),Ju.resolve(this.gs(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,r=n.length+1;let i=n;Ys.isDocumentKey(i)||(i=i.child(""));const o=new xc(new Ys(i),0);let s=new Ml(_s);return this.ds.forEachWhile((e=>{const t=e.key.path;return!!n.isPrefixOf(t)&&(t.length===r&&(s=s.add(e.ls)),!0)}),o),Ju.resolve(this.gs(s))}gs(e){const t=[];return e.forEach((e=>{const n=this.ws(e);null!==n&&t.push(n)})),t}removeMutationBatch(e,t){ms(0===this.ys(t.batchId,"removed")),this.In.shift();let n=this.ds;return Ju.forEach(t.mutations,(r=>{const i=new xc(r.key,t.batchId);return n=n.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.ds=n}))}te(e){}containsKey(e,t){const n=new xc(t,0),r=this.ds.firstAfterOrEqual(n);return Ju.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.In.length,Ju.resolve()}ys(e,t){return this._s(e)}_s(e){return 0===this.In.length?0:e-this.In[0].batchId}ws(e){const t=this._s(e);return t<0||t>=this.In.length?null:this.In[t]}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _c{constructor(e,t){this.Ht=e,this.ps=t,this.docs=new Pl(Ys.comparator),this.size=0}addEntry(e,t,n){const r=t.key,i=this.docs.get(r),o=i?i.size:0,s=this.ps(t);return this.docs=this.docs.insert(r,{document:t.clone(),size:s,readTime:n}),this.size+=s-o,this.Ht.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return Ju.resolve(n?n.document.clone():da.newInvalidDocument(t))}getEntries(e,t){let n=Vl();return t.forEach((e=>{const t=this.docs.get(e);n=n.insert(e,t?t.document.clone():da.newInvalidDocument(e))})),Ju.resolve(n)}getDocumentsMatchingQuery(e,t,n){let r=Vl();const i=new Ys(t.path.child("")),o=this.docs.getIteratorFrom(i);for(;o.hasNext();){const{key:e,value:{document:i,readTime:s}}=o.getNext();if(!t.path.isPrefixOf(e.path))break;s.compareTo(n)<=0||Wa(t,i)&&(r=r.insert(i.key,i.clone()))}return Ju.resolve(r)}Ts(e,t){return Ju.forEach(this.docs,(e=>t(e)))}newChangeBuffer(e){return new Nc(this)}getSize(e){return Ju.resolve(this.size)}}class Nc extends hc{constructor(e){super(),this.Se=e}applyChanges(e){const t=[];return this.changes.forEach(((n,r)=>{r.document.isValidDocument()?t.push(this.Se.addEntry(e,r.document,this.getReadTime(n))):this.Se.removeEntry(n)})),Ju.waitFor(t)}getFromCache(e,t){return this.Se.getEntry(e,t)}getAllFromCache(e,t){return this.Se.getEntries(e,t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ac{constructor(e){this.persistence=e,this.Es=new cc((e=>ga(e)),ya),this.lastRemoteSnapshotVersion=Ds.min(),this.highestTargetId=0,this.Is=0,this.As=new Ic,this.targetCount=0,this.Rs=lc.se()}forEachTarget(e,t){return this.Es.forEach(((e,n)=>t(n))),Ju.resolve()}getLastRemoteSnapshotVersion(e){return Ju.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return Ju.resolve(this.Is)}allocateTargetId(e){return this.highestTargetId=this.Rs.next(),Ju.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Is&&(this.Is=t),Ju.resolve()}ae(e){this.Es.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Rs=new lc(t),this.highestTargetId=t),e.sequenceNumber>this.Is&&(this.Is=e.sequenceNumber)}addTargetData(e,t){return this.ae(t),this.targetCount+=1,Ju.resolve()}updateTargetData(e,t){return this.ae(t),Ju.resolve()}removeTargetData(e,t){return this.Es.delete(t.target),this.As.cs(t.targetId),this.targetCount-=1,Ju.resolve()}removeTargets(e,t,n){let r=0;const i=[];return this.Es.forEach(((o,s)=>{s.sequenceNumber<=t&&null===n.get(s.targetId)&&(this.Es.delete(o),i.push(this.removeMatchingKeysForTargetId(e,s.targetId)),r++)})),Ju.waitFor(i).next((()=>r))}getTargetCount(e){return Ju.resolve(this.targetCount)}getTargetData(e,t){const n=this.Es.get(t)||null;return Ju.resolve(n)}addMatchingKeys(e,t,n){return this.As.ss(t,n),Ju.resolve()}removeMatchingKeys(e,t,n){this.As.os(t,n);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach((t=>{i.push(r.markPotentiallyOrphaned(e,t))})),Ju.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.As.cs(t),Ju.resolve()}getMatchingKeysForTargetId(e,t){const n=this.As.hs(t);return Ju.resolve(n)}containsKey(e,t){return Ju.resolve(this.As.containsKey(t))}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dc{constructor(e,t){this.bs={},this.Le=new Is(0),this.Be=!1,this.Be=!0,this.referenceDelegate=e(this),this.ze=new Ac(this),this.Ht=new oc,this.He=function(e,t){return new _c(e,t)}(this.Ht,(e=>this.referenceDelegate.Ps(e))),this.N=new rc(t),this.Je=new Tc(this.N)}start(){return Promise.resolve()}shutdown(){return this.Be=!1,Promise.resolve()}get started(){return this.Be}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(){return this.Ht}getMutationQueue(e){let t=this.bs[e.toKey()];return t||(t=new Cc(this.Ht,this.referenceDelegate),this.bs[e.toKey()]=t),t}getTargetCache(){return this.ze}getRemoteDocumentCache(){return this.He}getBundleCache(){return this.Je}runTransaction(e,t,n){cs("MemoryPersistence","Starting transaction:",e);const r=new Lc(this.Le.next());return this.referenceDelegate.vs(),n(r).next((e=>this.referenceDelegate.Vs(r).next((()=>e)))).toPromise().then((e=>(r.raiseOnCommittedEvent(),e)))}Ss(e,t){return Ju.or(Object.values(this.bs).map((n=>()=>n.containsKey(e,t))))}}class Lc extends Yu{constructor(e){super(),this.currentSequenceNumber=e}}class Pc{constructor(e){this.persistence=e,this.Ds=new Ic,this.Cs=null}static Ns(e){return new Pc(e)}get xs(){if(this.Cs)return this.Cs;throw ps()}addReference(e,t,n){return this.Ds.addReference(n,t),this.xs.delete(n.toString()),Ju.resolve()}removeReference(e,t,n){return this.Ds.removeReference(n,t),this.xs.add(n.toString()),Ju.resolve()}markPotentiallyOrphaned(e,t){return this.xs.add(t.toString()),Ju.resolve()}removeTarget(e,t){this.Ds.cs(t.targetId).forEach((e=>this.xs.add(e.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((e=>{e.forEach((e=>this.xs.add(e.toString())))})).next((()=>n.removeTargetData(e,t)))}vs(){this.Cs=new Set}Vs(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return Ju.forEach(this.xs,(n=>{const r=Ys.fromPath(n);return this.ks(e,r).next((e=>{e||t.removeEntry(r)}))})).next((()=>(this.Cs=null,t.apply(e))))}updateLimboDocument(e,t){return this.ks(e,t).next((e=>{e?this.xs.delete(t.toString()):this.xs.add(t.toString())}))}Ps(e){return 0}ks(e,t){return Ju.or([()=>Ju.resolve(this.Ds.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ss(e,t)])}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc{constructor(){this.activeTargetIds=Gl()}Fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ms(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Os(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Rc{constructor(){this.yi=new Oc,this.pi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e){return this.yi.Fs(e),this.pi[e]||"not-current"}updateQueryState(e,t,n){this.pi[e]=t}removeLocalQueryTarget(e){this.yi.Ms(e)}isLocalQueryTarget(e){return this.yi.activeTargetIds.has(e)}clearQueryState(e){delete this.pi[e]}getAllActiveQueryTargets(){return this.yi.activeTargetIds}isActiveQueryTarget(e){return this.yi.activeTargetIds.has(e)}start(){return this.yi=new Oc,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{Ti(e){}shutdown(){}}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fc{constructor(){this.Ei=()=>this.Ii(),this.Ai=()=>this.Ri(),this.bi=[],this.Pi()}Ti(e){this.bi.push(e)}shutdown(){window.removeEventListener("online",this.Ei),window.removeEventListener("offline",this.Ai)}Pi(){window.addEventListener("online",this.Ei),window.addEventListener("offline",this.Ai)}Ii(){cs("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.bi)e(0)}Ri(){cs("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.bi)e(1)}static bt(){return"undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e){this.vi=e.vi,this.Vi=e.Vi}Si(e){this.Di=e}Ci(e){this.Ni=e}onMessage(e){this.xi=e}close(){this.Vi()}send(e){this.vi(e)}ki(){this.Di()}$i(e){this.Ni(e)}Oi(e){this.xi(e)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http";this.Fi=t+"://"+e.host,this.Mi="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents"}Li(e,t,n,r){const i=this.Bi(e,t);cs("RestConnection","Sending: ",i,n);const o={};return this.Ui(o,r),this.qi(e,i,o,n).then((e=>(cs("RestConnection","Received: ",e),e)),(t=>{throw fs("RestConnection",`${e} failed with error: `,t,"url: ",i,"request:",n),t}))}Ki(e,t,n,r){return this.Li(e,t,n,r)}Ui(e,t){if(e["X-Goog-Api-Client"]="gl-js/ fire/"+as,e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t)for(const n in t.authHeaders)t.authHeaders.hasOwnProperty(n)&&(e[n]=t.authHeaders[n])}Bi(e,t){const n=Uc[e];return`${this.Fi}/v1/${t}:${n}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams}qi(e,t,n,r){return new Promise(((i,o)=>{const s=new Ko;s.listenOnce(zo.COMPLETE,(()=>{try{switch(s.getLastErrorCode()){case jo.NO_ERROR:const t=s.getResponseJson();cs("Connection","XHR received:",JSON.stringify(t)),i(t);break;case jo.TIMEOUT:cs("Connection",'RPC "'+e+'" timed out'),o(new vs(ys.DEADLINE_EXCEEDED,"Request time out"));break;case jo.HTTP_ERROR:const n=s.getStatus();if(cs("Connection",'RPC "'+e+'" failed with status:',n,"response text:",s.getResponseText()),n>0){const e=s.getResponseJson().error;if(e&&e.status&&e.message){const t=function(e){const t=e.toLowerCase().replace(/_/g,"-");return Object.values(ys).indexOf(t)>=0?t:ys.UNKNOWN}(e.status);o(new vs(t,e.message))}else o(new vs(ys.UNKNOWN,"Server responded with status "+s.getStatus()))}else o(new vs(ys.UNAVAILABLE,"Connection failed."));break;default:ps()}}finally{cs("Connection",'RPC "'+e+'" completed.')}}));const a=JSON.stringify(r);s.send(t,"POST",a,n,15)}))}ji(e,t){const n=[this.Fi,"/","google.firestore.v1.Firestore","/",e,"/channel"],r=Uo(),i=Vo(),o={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(o.xmlHttpFactory=new Ho({})),this.Ui(o.initMessageHeaders,t),"undefined"!=typeof window&&(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(L())||"object"==typeof navigator&&"ReactNative"===navigator.product||L().indexOf("Electron/")>=0||function(){const e=L();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}()||L().indexOf("MSAppHost/")>=0||P()||(o.httpHeadersOverwriteParam="$httpHeaders");const s=n.join("");cs("Connection","Creating WebChannel: "+s,o);const a=r.createWebChannel(s,o);let l=!1,u=!1;const c=new Vc({vi:e=>{u?cs("Connection","Not sending because WebChannel is closed:",e):(l||(cs("Connection","Opening WebChannel transport."),a.open(),l=!0),cs("Connection","WebChannel sending:",e),a.send(e))},Vi:()=>a.close()}),h=(e,t,n)=>{e.listen(t,(e=>{try{n(e)}catch(e){setTimeout((()=>{throw e}),0)}}))};return h(a,$o.EventType.OPEN,(()=>{u||cs("Connection","WebChannel transport opened.")})),h(a,$o.EventType.CLOSE,(()=>{u||(u=!0,cs("Connection","WebChannel transport closed"),c.$i())})),h(a,$o.EventType.ERROR,(e=>{u||(u=!0,fs("Connection","WebChannel transport errored:",e),c.$i(new vs(ys.UNAVAILABLE,"The operation could not be completed")))})),h(a,$o.EventType.MESSAGE,(e=>{var t;if(!u){const n=e.data[0];ms(!!n);const r=n,i=r.error||(null===(t=r[0])||void 0===t?void 0:t.error);if(i){cs("Connection","WebChannel received error:",i);const e=i.status;let t=function(e){const t=Nl[e];if(void 0!==t)return Ll(t)}(e),n=i.message;void 0===t&&(t=ys.INTERNAL,n="Unknown error status: "+e+" with message "+i.message),u=!0,c.$i(new vs(t,n)),a.close()}else cs("Connection","WebChannel received:",n),c.Oi(n)}})),h(i,Bo.STAT_EVENT,(e=>{e.stat===qo.PROXY?cs("Connection","Detected buffering proxy"):e.stat===qo.NOPROXY&&cs("Connection","Detected no buffering proxy")})),setTimeout((()=>{c.ki()}),0),c}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zc(){return"undefined"!=typeof document?document:null}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(e){return new ou(e,!0)}class qc{constructor(e,t,n=1e3,r=1.5,i=6e4){this.Oe=e,this.timerId=t,this.Qi=n,this.Wi=r,this.Gi=i,this.zi=0,this.Hi=null,this.Ji=Date.now(),this.reset()}reset(){this.zi=0}Yi(){this.zi=this.Gi}Xi(e){this.cancel();const t=Math.floor(this.zi+this.Zi()),n=Math.max(0,Date.now()-this.Ji),r=Math.max(0,t-n);r>0&&cs("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.zi} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.Hi=this.Oe.enqueueAfterDelay(this.timerId,r,(()=>(this.Ji=Date.now(),e()))),this.zi*=this.Wi,this.zi<this.Qi&&(this.zi=this.Qi),this.zi>this.Gi&&(this.zi=this.Gi)}tr(){null!==this.Hi&&(this.Hi.skipDelay(),this.Hi=null)}cancel(){null!==this.Hi&&(this.Hi.cancel(),this.Hi=null)}Zi(){return(Math.random()-.5)*this.zi}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e,t,n,r,i,o){this.Oe=e,this.er=n,this.nr=r,this.credentialsProvider=i,this.listener=o,this.state=0,this.sr=0,this.ir=null,this.stream=null,this.rr=new qc(e,t)}ar(){return 1===this.state||2===this.state||4===this.state}cr(){return 2===this.state}start(){3!==this.state?this.auth():this.ur()}async stop(){this.ar()&&await this.close(0)}hr(){this.state=0,this.rr.reset()}lr(){this.cr()&&null===this.ir&&(this.ir=this.Oe.enqueueAfterDelay(this.er,6e4,(()=>this.dr())))}wr(e){this._r(),this.stream.send(e)}async dr(){if(this.cr())return this.close(0)}_r(){this.ir&&(this.ir.cancel(),this.ir=null)}async close(e,t){this._r(),this.rr.cancel(),this.sr++,3!==e?this.rr.reset():t&&t.code===ys.RESOURCE_EXHAUSTED?(hs(t.toString()),hs("Using maximum backoff delay to prevent overloading the backend."),this.rr.Yi()):t&&t.code===ys.UNAUTHENTICATED&&this.credentialsProvider.invalidateToken(),null!==this.stream&&(this.mr(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Ci(t)}mr(){}auth(){this.state=1;const e=this.gr(this.sr),t=this.sr;this.credentialsProvider.getToken().then((e=>{this.sr===t&&this.yr(e)}),(t=>{e((()=>{const e=new vs(ys.UNKNOWN,"Fetching auth token failed: "+t.message);return this.pr(e)}))}))}yr(e){const t=this.gr(this.sr);this.stream=this.Tr(e),this.stream.Si((()=>{t((()=>(this.state=2,this.listener.Si())))})),this.stream.Ci((e=>{t((()=>this.pr(e)))})),this.stream.onMessage((e=>{t((()=>this.onMessage(e)))}))}ur(){this.state=4,this.rr.Xi((async()=>{this.state=0,this.start()}))}pr(e){return cs("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(3,e)}gr(e){return t=>{this.Oe.enqueueAndForget((()=>this.sr===e?t():(cs("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class $c extends Hc{constructor(e,t,n,r,i){super(e,"listen_stream_connection_backoff","listen_stream_idle",t,n,i),this.N=r}Tr(e){return this.nr.ji("Listen",e)}onMessage(e){this.rr.reset();const t=function(e,t){let n;if("targetChange"in t){t.targetChange;const r=function(e){return"NO_CHANGE"===e?0:"ADD"===e?1:"REMOVE"===e?2:"CURRENT"===e?3:"RESET"===e?4:ps()}(t.targetChange.targetChangeType||"NO_CHANGE"),i=t.targetChange.targetIds||[],o=function(e,t){return e.D?(ms(void 0===t||"string"==typeof t),js.fromBase64String(t||"")):(ms(void 0===t||t instanceof Uint8Array),js.fromUint8Array(t||new Uint8Array))}(e,t.targetChange.resumeToken),s=t.targetChange.cause,a=s&&function(e){const t=void 0===e.code?ys.UNKNOWN:Ll(e.code);return new vs(t,e.message||"")}(s);n=new Jl(r,i,o,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const i=du(e,r.document.name),o=uu(r.document.updateTime),s=new ha({mapValue:{fields:r.document.fields}}),a=da.newFoundDocument(i,o,s),l=r.targetIds||[],u=r.removedTargetIds||[];n=new Xl(l,u,a.key,a)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const i=du(e,r.document),o=r.readTime?uu(r.readTime):Ds.min(),s=da.newNoDocument(i,o),a=r.removedTargetIds||[];n=new Xl([],a,s.key,s)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const i=du(e,r.document),o=r.removedTargetIds||[];n=new Xl([],o,i,null)}else{if(!("filter"in t))return ps();{t.filter;const e=t.filter;e.targetId;const r=e.count||0,i=new _l(r),o=e.targetId;n=new Yl(o,i)}}return n}(this.N,e),n=function(e){if(!("targetChange"in e))return Ds.min();const t=e.targetChange;return t.targetIds&&t.targetIds.length?Ds.min():t.readTime?uu(t.readTime):Ds.min()}(e);return this.listener.Er(t,n)}Ir(e){const t={};t.database=gu(this.N),t.addTarget=function(e,t){let n;const r=t.target;return n=va(r)?{documents:bu(e,r)}:{query:Eu(e,r)},n.targetId=t.targetId,t.resumeToken.approximateByteSize()>0?n.resumeToken=au(e,t.resumeToken):t.snapshotVersion.compareTo(Ds.min())>0&&(n.readTime=su(e,t.snapshotVersion.toTimestamp())),n}(this.N,e);const n=function(e,t){const n=function(e,t){switch(t){case 0:return null;case 1:return"existence-filter-mismatch";case 2:return"limbo-document";default:return ps()}}(0,t.purpose);return null==n?null:{"goog-listen-tags":n}}(this.N,e);n&&(t.labels=n),this.wr(t)}Ar(e){const t={};t.database=gu(this.N),t.removeTarget=e,this.wr(t)}}class Kc extends Hc{constructor(e,t,n,r,i){super(e,"write_stream_connection_backoff","write_stream_idle",t,n,i),this.N=r,this.Rr=!1}get br(){return this.Rr}start(){this.Rr=!1,this.lastStreamToken=void 0,super.start()}mr(){this.Rr&&this.Pr([])}Tr(e){return this.nr.ji("Write",e)}onMessage(e){if(ms(!!e.streamToken),this.lastStreamToken=e.streamToken,this.Rr){this.rr.reset();const t=function(e,t){return e&&e.length>0?(ms(void 0!==t),e.map((e=>function(e,t){let n=e.updateTime?uu(e.updateTime):uu(t);return n.isEqual(Ds.min())&&(n=uu(t)),new fl(n,e.transformResults||[])}(e,t)))):[]}(e.writeResults,e.commitTime),n=uu(e.commitTime);return this.listener.vr(n,t)}return ms(!e.writeResults||0===e.writeResults.length),this.Rr=!0,this.listener.Vr()}Sr(){const e={};e.database=gu(this.N),this.wr(e)}Pr(e){const t={streamToken:this.lastStreamToken,writes:e.map((e=>wu(this.N,e)))};this.wr(t)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc extends class{}{constructor(e,t,n){super(),this.credentials=e,this.nr=t,this.N=n,this.Dr=!1}Cr(){if(this.Dr)throw new vs(ys.FAILED_PRECONDITION,"The client has already been terminated.")}Li(e,t,n){return this.Cr(),this.credentials.getToken().then((r=>this.nr.Li(e,t,n,r))).catch((e=>{throw"FirebaseError"===e.name?(e.code===ys.UNAUTHENTICATED&&this.credentials.invalidateToken(),e):new vs(ys.UNKNOWN,e.toString())}))}Ki(e,t,n){return this.Cr(),this.credentials.getToken().then((r=>this.nr.Ki(e,t,n,r))).catch((e=>{throw"FirebaseError"===e.name?(e.code===ys.UNAUTHENTICATED&&this.credentials.invalidateToken(),e):new vs(ys.UNKNOWN,e.toString())}))}terminate(){this.Dr=!0}}class Wc{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Nr=0,this.kr=null,this.$r=!0}Or(){0===this.Nr&&(this.Fr("Unknown"),this.kr=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.kr=null,this.Mr("Backend didn't respond within 10 seconds."),this.Fr("Offline"),Promise.resolve()))))}Lr(e){"Online"===this.state?this.Fr("Unknown"):(this.Nr++,this.Nr>=1&&(this.Br(),this.Mr(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.Fr("Offline")))}set(e){this.Br(),this.Nr=0,"Online"===e&&(this.$r=!1),this.Fr(e)}Fr(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}Mr(e){const t=`Could not reach Cloud Firestore backend. ${e}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.$r?(hs(t),this.$r=!1):cs("OnlineStateTracker",t)}Br(){null!==this.kr&&(this.kr.cancel(),this.kr=null)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qc{constructor(e,t,n,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Ur=[],this.qr=new Map,this.Kr=new Set,this.jr=[],this.Qr=i,this.Qr.Ti((e=>{n.enqueueAndForget((async()=>{ih(this)&&(cs("RemoteStore","Restarting streams for network reachability change."),await async function(e){const t=gs(e);t.Kr.add(4),await Yc(t),t.Wr.set("Unknown"),t.Kr.delete(4),await Xc(t)}(this))}))})),this.Wr=new Wc(n,r)}}async function Xc(e){if(ih(e))for(const t of e.jr)await t(!0)}async function Yc(e){for(const t of e.jr)await t(!1)}function Jc(e,t){const n=gs(e);n.qr.has(t.targetId)||(n.qr.set(t.targetId,t),rh(n)?nh(n):Eh(n).cr()&&eh(n,t))}function Zc(e,t){const n=gs(e),r=Eh(n);n.qr.delete(t),r.cr()&&th(n,t),0===n.qr.size&&(r.cr()?r.lr():ih(n)&&n.Wr.set("Unknown"))}function eh(e,t){e.Gr.Y(t.targetId),Eh(e).Ir(t)}function th(e,t){e.Gr.Y(t),Eh(e).Ar(t)}function nh(e){e.Gr=new eu({getRemoteKeysForTarget:t=>e.remoteSyncer.getRemoteKeysForTarget(t),Tt:t=>e.qr.get(t)||null}),Eh(e).start(),e.Wr.Or()}function rh(e){return ih(e)&&!Eh(e).ar()&&e.qr.size>0}function ih(e){return 0===gs(e).Kr.size}function oh(e){e.Gr=void 0}async function sh(e){e.qr.forEach(((t,n)=>{eh(e,t)}))}async function ah(e,t){oh(e),rh(e)?(e.Wr.Lr(t),nh(e)):e.Wr.set("Unknown")}async function lh(e,t,n){if(e.Wr.set("Online"),t instanceof Jl&&2===t.state&&t.cause)try{await async function(e,t){const n=t.cause;for(const r of t.targetIds)e.qr.has(r)&&(await e.remoteSyncer.rejectListen(r,n),e.qr.delete(r),e.Gr.removeTarget(r))}(e,t)}catch(n){cs("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),n),await uh(e,n)}else if(t instanceof Xl?e.Gr.rt(t):t instanceof Yl?e.Gr.ft(t):e.Gr.ct(t),!n.isEqual(Ds.min()))try{const t=await vc(e.localStore);n.compareTo(t)>=0&&await function(e,t){const n=e.Gr._t(t);return n.targetChanges.forEach(((n,r)=>{if(n.resumeToken.approximateByteSize()>0){const i=e.qr.get(r);i&&e.qr.set(r,i.withResumeToken(n.resumeToken,t))}})),n.targetMismatches.forEach((t=>{const n=e.qr.get(t);if(!n)return;e.qr.set(t,n.withResumeToken(js.EMPTY_BYTE_STRING,n.snapshotVersion)),th(e,t);const r=new nc(n.target,t,1,n.sequenceNumber);eh(e,r)})),e.remoteSyncer.applyRemoteEvent(n)}(e,n)}catch(t){cs("RemoteStore","Failed to raise snapshot:",t),await uh(e,t)}}async function uh(e,t,n){if(!Zu(t))throw t;e.Kr.add(1),await Yc(e),e.Wr.set("Offline"),n||(n=()=>vc(e.localStore)),e.asyncQueue.enqueueRetryable((async()=>{cs("RemoteStore","Retrying IndexedDB access"),await n(),e.Kr.delete(1),await Xc(e)}))}function ch(e,t){return t().catch((n=>uh(e,n,t)))}async function hh(e){const t=gs(e),n=Sh(t);let r=t.Ur.length>0?t.Ur[t.Ur.length-1].batchId:-1;for(;fh(t);)try{const e=await bc(t.localStore,r);if(null===e){0===t.Ur.length&&n.lr();break}r=e.batchId,dh(t,e)}catch(e){await uh(t,e)}ph(t)&&mh(t)}function fh(e){return ih(e)&&e.Ur.length<10}function dh(e,t){e.Ur.push(t);const n=Sh(e);n.cr()&&n.br&&n.Pr(t.mutations)}function ph(e){return ih(e)&&!Sh(e).ar()&&e.Ur.length>0}function mh(e){Sh(e).start()}async function gh(e){Sh(e).Sr()}async function yh(e){const t=Sh(e);for(const n of e.Ur)t.Pr(n.mutations)}async function vh(e,t,n){const r=e.Ur.shift(),i=tc.from(r,t,n);await ch(e,(()=>e.remoteSyncer.applySuccessfulWrite(i))),await hh(e)}async function wh(e,t){t&&Sh(e).br&&await async function(e,t){if(Dl(n=t.code)&&n!==ys.ABORTED){const n=e.Ur.shift();Sh(e).hr(),await ch(e,(()=>e.remoteSyncer.rejectFailedWrite(n.batchId,t))),await hh(e)}var n}(e,t),ph(e)&&mh(e)}async function bh(e,t){const n=gs(e);t?(n.Kr.delete(2),await Xc(n)):t||(n.Kr.add(2),await Yc(n),n.Wr.set("Unknown"))}function Eh(e){return e.zr||(e.zr=function(e,t,n){const r=gs(e);return r.Cr(),new $c(t,r.nr,r.credentials,r.N,n)}(e.datastore,e.asyncQueue,{Si:sh.bind(null,e),Ci:ah.bind(null,e),Er:lh.bind(null,e)}),e.jr.push((async t=>{t?(e.zr.hr(),rh(e)?nh(e):e.Wr.set("Unknown")):(await e.zr.stop(),oh(e))}))),e.zr}function Sh(e){return e.Hr||(e.Hr=function(e,t,n){const r=gs(e);return r.Cr(),new Kc(t,r.nr,r.credentials,r.N,n)}(e.datastore,e.asyncQueue,{Si:gh.bind(null,e),Ci:wh.bind(null,e),Vr:yh.bind(null,e),vr:vh.bind(null,e)}),e.jr.push((async t=>{t?(e.Hr.hr(),await hh(e)):(await e.Hr.stop(),e.Ur.length>0&&(cs("RemoteStore",`Stopping write stream with ${e.Ur.length} pending writes`),e.Ur=[]))}))),e.Hr
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */}class kh{constructor(e,t,n,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=r,this.removalCallback=i,this.deferred=new ws,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((e=>{}))}static createAndSchedule(e,t,n,r,i){const o=Date.now()+n,s=new kh(e,t,o,r,i);return s.start(n),s}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new vs(ys.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>null!==this.timerHandle?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Th(e,t){if(hs("AsyncQueue",`${t}: ${e}`),Zu(e))return new vs(ys.UNAVAILABLE,`${t}: ${e}`);throw e}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(e){this.comparator=e?(t,n)=>e(t,n)||Ys.comparator(t.key,n.key):(e,t)=>Ys.comparator(e.key,t.key),this.keyedMap=zl(),this.sortedSet=new Pl(this.comparator)}static emptySet(e){return new Ih(e.comparator)}has(e){return null!=this.keyedMap.get(e)}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Ih))return!1;if(this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const e=t.getNext().key,r=n.getNext().key;if(!e.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),0===e.length?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){const n=new Ih;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(){this.Jr=new Pl(Ys.comparator)}track(e){const t=e.doc.key,n=this.Jr.get(t);n?0!==e.type&&3===n.type?this.Jr=this.Jr.insert(t,e):3===e.type&&1!==n.type?this.Jr=this.Jr.insert(t,{type:n.type,doc:e.doc}):2===e.type&&2===n.type?this.Jr=this.Jr.insert(t,{type:2,doc:e.doc}):2===e.type&&0===n.type?this.Jr=this.Jr.insert(t,{type:0,doc:e.doc}):1===e.type&&0===n.type?this.Jr=this.Jr.remove(t):1===e.type&&2===n.type?this.Jr=this.Jr.insert(t,{type:1,doc:n.doc}):0===e.type&&1===n.type?this.Jr=this.Jr.insert(t,{type:2,doc:e.doc}):ps():this.Jr=this.Jr.insert(t,e)}Yr(){const e=[];return this.Jr.inorderTraversal(((t,n)=>{e.push(n)})),e}}class Ch{constructor(e,t,n,r,i,o,s,a){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=s,this.excludesMetadataChanges=a}static fromInitialDocuments(e,t,n,r){const i=[];return t.forEach((e=>{i.push({type:0,doc:e})})),new Ch(e,t,Ih.emptySet(t),i,n,r,!0,!1)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&$a(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let e=0;e<t.length;e++)if(t[e].type!==n[e].type||!t[e].doc.isEqual(n[e].doc))return!1;return!0}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _h{constructor(){this.Xr=void 0,this.listeners=[]}}class Nh{constructor(){this.queries=new cc((e=>Ka(e)),$a),this.onlineState="Unknown",this.Zr=new Set}}async function Ah(e,t){const n=gs(e),r=t.query;let i=!1,o=n.queries.get(r);if(o||(i=!0,o=new _h),i)try{o.Xr=await n.onListen(r)}catch(e){const n=Th(e,`Initialization of query '${Ga(t.query)}' failed`);return void t.onError(n)}n.queries.set(r,o),o.listeners.push(t),t.eo(n.onlineState),o.Xr&&t.no(o.Xr)&&Oh(n)}async function Dh(e,t){const n=gs(e),r=t.query;let i=!1;const o=n.queries.get(r);if(o){const e=o.listeners.indexOf(t);e>=0&&(o.listeners.splice(e,1),i=0===o.listeners.length)}if(i)return n.queries.delete(r),n.onUnlisten(r)}function Lh(e,t){const n=gs(e);let r=!1;for(const e of t){const t=e.query,i=n.queries.get(t);if(i){for(const t of i.listeners)t.no(e)&&(r=!0);i.Xr=e}}r&&Oh(n)}function Ph(e,t,n){const r=gs(e),i=r.queries.get(t);if(i)for(const e of i.listeners)e.onError(n);r.queries.delete(t)}function Oh(e){e.Zr.forEach((e=>{e.next()}))}class Rh{constructor(e,t,n){this.query=e,this.so=t,this.io=!1,this.ro=null,this.onlineState="Unknown",this.options=n||{}}no(e){if(!this.options.includeMetadataChanges){const t=[];for(const n of e.docChanges)3!==n.type&&t.push(n);e=new Ch(e.query,e.docs,e.oldDocs,t,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0)}let t=!1;return this.io?this.oo(e)&&(this.so.next(e),t=!0):this.ao(e,this.onlineState)&&(this.co(e),t=!0),this.ro=e,t}onError(e){this.so.error(e)}eo(e){this.onlineState=e;let t=!1;return this.ro&&!this.io&&this.ao(this.ro,e)&&(this.co(this.ro),t=!0),t}ao(e,t){if(!e.fromCache)return!0;const n="Offline"!==t;return!(this.options.uo&&n||e.docs.isEmpty()&&"Offline"!==t)}oo(e){if(e.docChanges.length>0)return!0;const t=this.ro&&this.ro.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&!0===this.options.includeMetadataChanges}co(e){e=Ch.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache),this.io=!0,this.so.next(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mh{constructor(e){this.key=e}}class Fh{constructor(e){this.key=e}}class Uh{constructor(e,t){this.query=e,this._o=t,this.mo=null,this.current=!1,this.yo=$l(),this.mutatedKeys=$l(),this.po=Qa(e),this.To=new Ih(this.po)}get Eo(){return this._o}Io(e,t){const n=t?t.Ao:new xh,r=t?t.To:this.To;let i=t?t.mutatedKeys:this.mutatedKeys,o=r,s=!1;const a=Fa(this.query)&&r.size===this.query.limit?r.last():null,l=Ua(this.query)&&r.size===this.query.limit?r.first():null;if(e.inorderTraversal(((e,t)=>{const u=r.get(e),c=Wa(this.query,t)?t:null,h=!!u&&this.mutatedKeys.has(u.key),f=!!c&&(c.hasLocalMutations||this.mutatedKeys.has(c.key)&&c.hasCommittedMutations);let d=!1;u&&c?u.data.isEqual(c.data)?h!==f&&(n.track({type:3,doc:c}),d=!0):this.Ro(u,c)||(n.track({type:2,doc:c}),d=!0,(a&&this.po(c,a)>0||l&&this.po(c,l)<0)&&(s=!0)):!u&&c?(n.track({type:0,doc:c}),d=!0):u&&!c&&(n.track({type:1,doc:u}),d=!0,(a||l)&&(s=!0)),d&&(c?(o=o.add(c),i=f?i.add(e):i.delete(e)):(o=o.delete(e),i=i.delete(e)))})),Fa(this.query)||Ua(this.query))for(;o.size>this.query.limit;){const e=Fa(this.query)?o.last():o.first();o=o.delete(e.key),i=i.delete(e.key),n.track({type:1,doc:e})}return{To:o,Ao:n,Ln:s,mutatedKeys:i}}Ro(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n){const r=this.To;this.To=e.To,this.mutatedKeys=e.mutatedKeys;const i=e.Ao.Yr();i.sort(((e,t)=>function(e,t){const n=e=>{switch(e){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ps()}};return n(e)-n(t)}(e.type,t.type)||this.po(e.doc,t.doc))),this.bo(n);const o=t?this.Po():[],s=0===this.yo.size&&this.current?1:0,a=s!==this.mo;return this.mo=s,0!==i.length||a?{snapshot:new Ch(this.query,e.To,r,i,e.mutatedKeys,0===s,a,!1),vo:o}:{vo:o}}eo(e){return this.current&&"Offline"===e?(this.current=!1,this.applyChanges({To:this.To,Ao:new xh,mutatedKeys:this.mutatedKeys,Ln:!1},!1)):{vo:[]}}Vo(e){return!this._o.has(e)&&!!this.To.has(e)&&!this.To.get(e).hasLocalMutations}bo(e){e&&(e.addedDocuments.forEach((e=>this._o=this._o.add(e))),e.modifiedDocuments.forEach((e=>{})),e.removedDocuments.forEach((e=>this._o=this._o.delete(e))),this.current=e.current)}Po(){if(!this.current)return[];const e=this.yo;this.yo=$l(),this.To.forEach((e=>{this.Vo(e.key)&&(this.yo=this.yo.add(e.key))}));const t=[];return e.forEach((e=>{this.yo.has(e)||t.push(new Fh(e))})),this.yo.forEach((n=>{e.has(n)||t.push(new Mh(n))})),t}So(e){this._o=e.Gn,this.yo=$l();const t=this.Io(e.documents);return this.applyChanges(t,!0)}Do(){return Ch.fromInitialDocuments(this.query,this.To,this.mutatedKeys,0===this.mo)}}class Vh{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class jh{constructor(e){this.key=e,this.Co=!1}}class zh{constructor(e,t,n,r,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.No={},this.xo=new cc((e=>Ka(e)),$a),this.ko=new Map,this.$o=new Set,this.Oo=new Pl(Ys.comparator),this.Fo=new Map,this.Mo=new Ic,this.Lo={},this.Bo=new Map,this.Uo=lc.ie(),this.onlineState="Unknown",this.qo=void 0}get isPrimaryClient(){return!0===this.qo}}async function Bh(e,t){const n=af(e);let r,i;const o=n.xo.get(t);if(o)r=o.targetId,n.sharedClientState.addLocalQueryTarget(r),i=o.view.Do();else{const e=await Ec(n.localStore,qa(t)),o=n.sharedClientState.addLocalQueryTarget(e.targetId);r=e.targetId,i=await qh(n,t,r,"current"===o),n.isPrimaryClient&&Jc(n.remoteStore,e)}return i}async function qh(e,t,n,r){e.Ko=(t,n,r)=>async function(e,t,n,r){let i=t.view.Io(n);i.Ln&&(i=await kc(e.localStore,t.query,!1).then((({documents:e})=>t.view.Io(e,i))));const o=r&&r.targetChanges.get(t.targetId),s=t.view.applyChanges(i,e.isPrimaryClient,o);return ef(e,t.targetId,s.vo),s.snapshot}(e,t,n,r);const i=await kc(e.localStore,t,!0),o=new Uh(t,i.Gn),s=o.Io(i.documents),a=Ql.createSynthesizedTargetChangeForCurrentChange(n,r&&"Offline"!==e.onlineState),l=o.applyChanges(s,e.isPrimaryClient,a);ef(e,n,l.vo);const u=new Vh(t,n,o);return e.xo.set(t,u),e.ko.has(n)?e.ko.get(n).push(t):e.ko.set(n,[t]),l.snapshot}async function Hh(e,t){const n=gs(e),r=n.xo.get(t),i=n.ko.get(r.targetId);if(i.length>1)return n.ko.set(r.targetId,i.filter((e=>!$a(e,t)))),void n.xo.delete(t);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(r.targetId),n.sharedClientState.isActiveQueryTarget(r.targetId)||await Sc(n.localStore,r.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(r.targetId),Zc(n.remoteStore,r.targetId),Jh(n,r.targetId)})).catch(uc)):(Jh(n,r.targetId),await Sc(n.localStore,r.targetId,!0))}async function $h(e,t){const n=gs(e);try{const e=await function(e,t){const n=gs(e),r=t.snapshotVersion;let i=n.Un;return n.persistence.runTransaction("Apply remote event","readwrite-primary",(e=>{const o=n.jn.newChangeBuffer({trackRemovals:!0});i=n.Un;const s=[];t.targetChanges.forEach(((t,o)=>{const a=i.get(o);if(!a)return;s.push(n.ze.removeMatchingKeys(e,t.removedDocuments,o).next((()=>n.ze.addMatchingKeys(e,t.addedDocuments,o))));const l=t.resumeToken;if(l.approximateByteSize()>0){const u=a.withResumeToken(l,r).withSequenceNumber(e.currentSequenceNumber);i=i.insert(o,u),function(e,t,n){return ms(t.resumeToken.approximateByteSize()>0),0===e.resumeToken.approximateByteSize()||t.snapshotVersion.toMicroseconds()-e.snapshotVersion.toMicroseconds()>=3e8||n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0}(a,u,t)&&s.push(n.ze.updateTargetData(e,u))}}));let a=Vl();if(t.documentUpdates.forEach(((r,i)=>{t.resolvedLimboDocuments.has(r)&&s.push(n.persistence.referenceDelegate.updateLimboDocument(e,r))})),s.push(wc(e,o,t.documentUpdates,r,void 0).next((e=>{a=e}))),!r.isEqual(Ds.min())){const t=n.ze.getLastRemoteSnapshotVersion(e).next((t=>n.ze.setTargetsMetadata(e,e.currentSequenceNumber,r)));s.push(t)}return Ju.waitFor(s).next((()=>o.apply(e))).next((()=>n.Qn.vn(e,a))).next((()=>a))})).then((e=>(n.Un=i,e)))}(n.localStore,t);t.targetChanges.forEach(((e,t)=>{const r=n.Fo.get(t);r&&(ms(e.addedDocuments.size+e.modifiedDocuments.size+e.removedDocuments.size<=1),e.addedDocuments.size>0?r.Co=!0:e.modifiedDocuments.size>0?ms(r.Co):e.removedDocuments.size>0&&(ms(r.Co),r.Co=!1))})),await rf(n,e,t)}catch(e){await uc(e)}}function Kh(e,t,n){const r=gs(e);if(r.isPrimaryClient&&0===n||!r.isPrimaryClient&&1===n){const e=[];r.xo.forEach(((n,r)=>{const i=r.view.eo(t);i.snapshot&&e.push(i.snapshot)})),function(e,t){const n=gs(e);n.onlineState=t;let r=!1;n.queries.forEach(((e,n)=>{for(const e of n.listeners)e.eo(t)&&(r=!0)})),r&&Oh(n)}(r.eventManager,t),e.length&&r.No.Er(e),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Gh(e,t,n){const r=gs(e);r.sharedClientState.updateQueryState(t,"rejected",n);const i=r.Fo.get(t),o=i&&i.key;if(o){let e=new Pl(Ys.comparator);e=e.insert(o,da.newNoDocument(o,Ds.min()));const n=$l().add(o),i=new Wl(Ds.min(),new Map,new Ml(_s),e,n);await $h(r,i),r.Oo=r.Oo.remove(o),r.Fo.delete(t),nf(r)}else await Sc(r.localStore,t,!1).then((()=>Jh(r,t,n))).catch(uc)}async function Wh(e,t){const n=gs(e),r=t.batch.batchId;try{const e=await function(e,t){const n=gs(e);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",(e=>{const r=t.batch.keys(),i=n.jn.newChangeBuffer({trackRemovals:!0});return function(e,t,n,r){const i=n.batch,o=i.keys();let s=Ju.resolve();return o.forEach((e=>{s=s.next((()=>r.getEntry(t,e))).next((t=>{const o=n.docVersions.get(e);ms(null!==o),t.version.compareTo(o)<0&&(i.applyToRemoteDocument(t,n),t.isValidDocument()&&r.addEntry(t,n.commitVersion))}))})),s.next((()=>e.In.removeMutationBatch(t,i)))}(n,e,t,i).next((()=>i.apply(e))).next((()=>n.In.performConsistencyCheck(e))).next((()=>n.Qn.Pn(e,r)))}))}(n.localStore,t);Yh(n,r,null),Xh(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await rf(n,e)}catch(e){await uc(e)}}async function Qh(e,t,n){const r=gs(e);try{const e=await function(e,t){const n=gs(e);return n.persistence.runTransaction("Reject batch","readwrite-primary",(e=>{let r;return n.In.lookupMutationBatch(e,t).next((t=>(ms(null!==t),r=t.keys(),n.In.removeMutationBatch(e,t)))).next((()=>n.In.performConsistencyCheck(e))).next((()=>n.Qn.Pn(e,r)))}))}(r.localStore,t);Yh(r,t,n),Xh(r,t),r.sharedClientState.updateMutationState(t,"rejected",n),await rf(r,e)}catch(e){await uc(e)}}function Xh(e,t){(e.Bo.get(t)||[]).forEach((e=>{e.resolve()})),e.Bo.delete(t)}function Yh(e,t,n){const r=gs(e);let i=r.Lo[r.currentUser.toKey()];if(i){const e=i.get(t);e&&(n?e.reject(n):e.resolve(),i=i.remove(t)),r.Lo[r.currentUser.toKey()]=i}}function Jh(e,t,n=null){e.sharedClientState.removeLocalQueryTarget(t);for(const r of e.ko.get(t))e.xo.delete(r),n&&e.No.jo(r,n);e.ko.delete(t),e.isPrimaryClient&&e.Mo.cs(t).forEach((t=>{e.Mo.containsKey(t)||Zh(e,t)}))}function Zh(e,t){e.$o.delete(t.path.canonicalString());const n=e.Oo.get(t);null!==n&&(Zc(e.remoteStore,n),e.Oo=e.Oo.remove(t),e.Fo.delete(n),nf(e))}function ef(e,t,n){for(const r of n)r instanceof Mh?(e.Mo.addReference(r.key,t),tf(e,r)):r instanceof Fh?(cs("SyncEngine","Document no longer in limbo: "+r.key),e.Mo.removeReference(r.key,t),e.Mo.containsKey(r.key)||Zh(e,r.key)):ps()}function tf(e,t){const n=t.key,r=n.path.canonicalString();e.Oo.get(n)||e.$o.has(r)||(cs("SyncEngine","New document in limbo: "+n),e.$o.add(r),nf(e))}function nf(e){for(;e.$o.size>0&&e.Oo.size<e.maxConcurrentLimboResolutions;){const t=e.$o.values().next().value;e.$o.delete(t);const n=new Ys(Ms.fromString(t)),r=e.Uo.next();e.Fo.set(r,new jh(n)),e.Oo=e.Oo.insert(n,r),Jc(e.remoteStore,new nc(qa(Ma(n.path)),r,2,Is.T))}}async function rf(e,t,n){const r=gs(e),i=[],o=[],s=[];r.xo.isEmpty()||(r.xo.forEach(((e,a)=>{s.push(r.Ko(a,t,n).then((e=>{if(e){r.isPrimaryClient&&r.sharedClientState.updateQueryState(a.targetId,e.fromCache?"not-current":"current"),i.push(e);const t=dc.kn(a.targetId,e);o.push(t)}})))})),await Promise.all(s),r.No.Er(i),await async function(e,t){const n=gs(e);try{await n.persistence.runTransaction("notifyLocalViewChanges","readwrite",(e=>Ju.forEach(t,(t=>Ju.forEach(t.Nn,(r=>n.persistence.referenceDelegate.addReference(e,t.targetId,r))).next((()=>Ju.forEach(t.xn,(r=>n.persistence.referenceDelegate.removeReference(e,t.targetId,r)))))))))}catch(e){if(!Zu(e))throw e;cs("LocalStore","Failed to update sequence numbers: "+e)}for(const e of t){const t=e.targetId;if(!e.fromCache){const e=n.Un.get(t),r=e.snapshotVersion,i=e.withLastLimboFreeSnapshotVersion(r);n.Un=n.Un.insert(t,i)}}}(r.localStore,o))}async function of(e,t){const n=gs(e);if(!n.currentUser.isEqual(t)){cs("SyncEngine","User change. New user:",t.toKey());const e=await yc(n.localStore,t);n.currentUser=t,function(e,t){e.Bo.forEach((e=>{e.forEach((e=>{e.reject(new vs(ys.CANCELLED,"'waitForPendingWrites' promise is rejected due to a user change."))}))})),e.Bo.clear()}(n),n.sharedClientState.handleUserChange(t,e.removedBatchIds,e.addedBatchIds),await rf(n,e.Wn)}}function sf(e,t){const n=gs(e),r=n.Fo.get(t);if(r&&r.Co)return $l().add(r.key);{let e=$l();const r=n.ko.get(t);if(!r)return e;for(const t of r){const r=n.xo.get(t);e=e.unionWith(r.view.Eo)}return e}}function af(e){const t=gs(e);return t.remoteStore.remoteSyncer.applyRemoteEvent=$h.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=sf.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Gh.bind(null,t),t.No.Er=Lh.bind(null,t.eventManager),t.No.jo=Ph.bind(null,t.eventManager),t}function lf(e){const t=gs(e);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Wh.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Qh.bind(null,t),t}class uf{constructor(){this.synchronizeTabs=!1}async initialize(e){this.N=Bc(e.databaseInfo.databaseId),this.sharedClientState=this.Wo(e),this.persistence=this.Go(e),await this.persistence.start(),this.gcScheduler=this.zo(e),this.localStore=this.Ho(e)}zo(e){return null}Ho(e){return gc(this.persistence,new pc,e.initialUser,this.N)}Go(e){return new Dc(Pc.Ns,this.N)}Wo(e){return new Rc}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class cf{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=e=>Kh(this.syncEngine,e,1),this.remoteStore.remoteSyncer.handleCredentialChange=of.bind(null,this.syncEngine),await bh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return new Nh}createDatastore(e){const t=Bc(e.databaseInfo.databaseId),n=(r=e.databaseInfo,new jc(r));var r;return function(e,t,n){return new Gc(e,t,n)}(e.credentials,n,t)}createRemoteStore(e){var t,n,r,i,o;return t=this.localStore,n=this.datastore,r=e.asyncQueue,i=e=>Kh(this.syncEngine,e,0),o=Fc.bt()?new Fc:new Mc,new Qc(t,n,r,i,o)}createSyncEngine(e,t){return function(e,t,n,r,i,o,s){const a=new zh(e,t,n,r,i,o);return s&&(a.qo=!0),a}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(e){const t=gs(e);cs("RemoteStore","RemoteStore shutting down."),t.Kr.add(5),await Yc(t),t.Qr.shutdown(),t.Wr.set("Unknown")}(this.remoteStore)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hf{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Yo(this.observer.next,e)}error(e){this.observer.error?this.Yo(this.observer.error,e):console.error("Uncaught Error in snapshot listener:",e)}Xo(){this.muted=!0}Yo(e,t){this.muted||setTimeout((()=>{this.muted||e(t)}),0)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ff{constructor(e,t,n){this.credentials=e,this.asyncQueue=t,this.databaseInfo=n,this.user=ss.UNAUTHENTICATED,this.clientId=Cs.I(),this.credentialListener=()=>Promise.resolve(),this.credentials.start(t,(async e=>{cs("FirestoreClient","Received user=",e.uid),await this.credentialListener(e),this.user=e}))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.credentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new vs(ys.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ws;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.credentials.shutdown(),e.resolve()}catch(t){const n=Th(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function df(e,t){e.asyncQueue.verifyOperationInProgress(),cs("FirestoreClient","Initializing OfflineComponentProvider");const n=await e.getConfiguration();await t.initialize(n);let r=n.initialUser;e.setCredentialChangeListener((async e=>{r.isEqual(e)||(await yc(t.localStore,e),r=e)})),t.persistence.setDatabaseDeletedListener((()=>e.terminate())),e.offlineComponents=t}async function pf(e,t){e.asyncQueue.verifyOperationInProgress();const n=await mf(e);cs("FirestoreClient","Initializing OnlineComponentProvider");const r=await e.getConfiguration();await t.initialize(n,r),e.setCredentialChangeListener((e=>async function(e,t){const n=gs(e);n.asyncQueue.verifyOperationInProgress(),cs("RemoteStore","RemoteStore received new credentials");const r=ih(n);n.Kr.add(3),await Yc(n),r&&n.Wr.set("Unknown"),await n.remoteSyncer.handleCredentialChange(t),n.Kr.delete(3),await Xc(n)}(t.remoteStore,e))),e.onlineComponents=t}async function mf(e){return e.offlineComponents||(cs("FirestoreClient","Using default OfflineComponentProvider"),await df(e,new uf)),e.offlineComponents}async function gf(e){return e.onlineComponents||(cs("FirestoreClient","Using default OnlineComponentProvider"),await pf(e,new cf)),e.onlineComponents}function yf(e){return gf(e).then((e=>e.syncEngine))}async function vf(e){const t=await gf(e),n=t.eventManager;return n.onListen=Bh.bind(null,t.syncEngine),n.onUnlisten=Hh.bind(null,t.syncEngine),n}function wf(e,t,n={}){const r=new ws;return e.asyncQueue.enqueueAndForget((async()=>function(e,t,n,r,i){const o=new hf({next:o=>{t.enqueueAndForget((()=>Dh(e,s)));const a=o.docs.has(n);!a&&o.fromCache?i.reject(new vs(ys.UNAVAILABLE,"Failed to get document because the client is offline.")):a&&o.fromCache&&r&&"server"===r.source?i.reject(new vs(ys.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(o)},error:e=>i.reject(e)}),s=new Rh(Ma(n.path),o,{includeMetadataChanges:!0,uo:!0});return Ah(e,s)}(await vf(e),e.asyncQueue,t,n,r))),r.promise}class bf{constructor(e,t,n,r,i,o,s,a){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=s,this.useFetchStreams=a}}class Ef{constructor(e,t){this.projectId=e,this.database=t||"(default)"}get isDefaultDatabase(){return"(default)"===this.database}isEqual(e){return e instanceof Ef&&e.projectId===this.projectId&&e.database===this.database}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sf=new Map;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kf(e,t,n){if(!n)throw new vs(ys.INVALID_ARGUMENT,`Function ${e}() cannot be called with an empty ${t}.`)}function Tf(e){if(!Ys.isDocumentKey(e))throw new vs(ys.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`)}function If(e){if(Ys.isDocumentKey(e))throw new vs(ys.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`)}function xf(e){if(void 0===e)return"undefined";if(null===e)return"null";if("string"==typeof e)return e.length>20&&(e=`${e.substring(0,20)}...`),JSON.stringify(e);if("number"==typeof e||"boolean"==typeof e)return""+e;if("object"==typeof e){if(e instanceof Array)return"an array";{const t=function(e){return e.constructor?e.constructor.name:null}(e);return t?`a custom ${t} object`:"an object"}}return"function"==typeof e?"a function":ps()}function Cf(e,t){if("_delegate"in e&&(e=e._delegate),!(e instanceof t)){if(t.name===e.constructor.name)throw new vs(ys.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=xf(e);throw new vs(ys.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${n}`)}}return e}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class _f{constructor(e){var t;if(void 0===e.host){if(void 0!==e.ssl)throw new vs(ys.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=null===(t=e.ssl)||void 0===t||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,void 0===e.cacheSizeBytes)this.cacheSizeBytes=41943040;else{if(-1!==e.cacheSizeBytes&&e.cacheSizeBytes<1048576)throw new vs(ys.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,function(e,t,n,r){if(!0===t&&!0===r)throw new vs(ys.INVALID_ARGUMENT,`${e} and ${n} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nf{constructor(e,t){this._credentials=t,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new _f({}),this._settingsFrozen=!1,e instanceof Ef?this._databaseId=e:(this._app=e,this._databaseId=function(e){if(!Object.prototype.hasOwnProperty.apply(e.options,["projectId"]))throw new vs(ys.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ef(e.options.projectId)}(e))}get app(){if(!this._app)throw new vs(ys.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return void 0!==this._terminateTask}_setSettings(e){if(this._settingsFrozen)throw new vs(ys.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new _f(e),void 0!==e.credentials&&(this._credentials=function(e){if(!e)return new Es;switch(e.type){case"gapi":const t=e.client;return ms(!("object"!=typeof t||null===t||!t.auth||!t.auth.getAuthHeaderValueForFirstParty)),new Ts(t,e.sessionIndex||"0",e.iamToken||null);case"provider":return e.client;default:throw new vs(ys.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const t=Sf.get(e);t&&(cs("ComponentProvider","Removing Datastore"),Sf.delete(e),t.terminate())}(this),Promise.resolve()}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Af{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lf(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Af(this.firestore,e,this._key)}}class Df{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Df(this.firestore,e,this._query)}}class Lf extends Df{constructor(e,t,n){super(e,t,Ma(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Af(this.firestore,null,new Ys(e))}withConverter(e){return new Lf(this.firestore,e,this._path)}}function Pf(e,t,...n){if(e=q(e),kf("collection","path",t),e instanceof Nf){const r=Ms.fromString(t,...n);return If(r),new Lf(e,null,r)}{if(!(e instanceof Af||e instanceof Lf))throw new vs(ys.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ms.fromString(t,...n));return If(r),new Lf(e.firestore,null,r)}}function Of(e,t,...n){if(e=q(e),1===arguments.length&&(t=Cs.I()),kf("doc","path",t),e instanceof Nf){const r=Ms.fromString(t,...n);return Tf(r),new Af(e,null,new Ys(r))}{if(!(e instanceof Af||e instanceof Lf))throw new vs(ys.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=e._path.child(Ms.fromString(t,...n));return Tf(r),new Af(e.firestore,e instanceof Lf?e.converter:null,new Ys(r))}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rf{constructor(){this.fa=Promise.resolve(),this.da=[],this.wa=!1,this._a=[],this.ma=null,this.ga=!1,this.ya=!1,this.pa=[],this.rr=new qc(this,"async_queue_retry"),this.Ta=()=>{const e=zc();e&&cs("AsyncQueue","Visibility state changed to "+e.visibilityState),this.rr.tr()};const e=zc();e&&"function"==typeof e.addEventListener&&e.addEventListener("visibilitychange",this.Ta)}get isShuttingDown(){return this.wa}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Ea(),this.Ia(e)}enterRestrictedMode(e){if(!this.wa){this.wa=!0,this.ya=e||!1;const t=zc();t&&"function"==typeof t.removeEventListener&&t.removeEventListener("visibilitychange",this.Ta)}}enqueue(e){if(this.Ea(),this.wa)return new Promise((()=>{}));const t=new ws;return this.Ia((()=>this.wa&&this.ya?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.da.push(e),this.Aa())))}async Aa(){if(0!==this.da.length){try{await this.da[0](),this.da.shift(),this.rr.reset()}catch(e){if(!Zu(e))throw e;cs("AsyncQueue","Operation failed with retryable error: "+e)}this.da.length>0&&this.rr.Xi((()=>this.Aa()))}}Ia(e){const t=this.fa.then((()=>(this.ga=!0,e().catch((e=>{this.ma=e,this.ga=!1;const t=function(e){let t=e.message||"";return e.stack&&(t=e.stack.includes(e.message)?e.stack:e.message+"\n"+e.stack),t}(e);throw hs("INTERNAL UNHANDLED ERROR: ",t),e})).then((e=>(this.ga=!1,e))))));return this.fa=t,t}enqueueAfterDelay(e,t,n){this.Ea(),this.pa.indexOf(e)>-1&&(t=0);const r=kh.createAndSchedule(this,e,t,n,(e=>this.Ra(e)));return this._a.push(r),r}Ea(){this.ma&&ps()}verifyOperationInProgress(){}async ba(){let e;do{e=this.fa,await e}while(e!==this.fa)}Pa(e){for(const t of this._a)if(t.timerId===e)return!0;return!1}va(e){return this.ba().then((()=>{this._a.sort(((e,t)=>e.targetTimeMs-t.targetTimeMs));for(const t of this._a)if(t.skipDelay(),"all"!==e&&t.timerId===e)break;return this.ba()}))}Va(e){this.pa.push(e)}Ra(e){const t=this._a.indexOf(e);this._a.splice(t,1)}}class Mf extends Nf{constructor(e,t){super(e,t),this.type="firestore",this._queue=new Rf,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Uf(this),this._firestoreClient.terminate()}}function Ff(e){return e._firestoreClient||Uf(e),e._firestoreClient.verifyNotTerminated(),e._firestoreClient}function Uf(e){var t;const n=e._freezeSettings(),r=function(e,t,n,r){return new bf(e,t,n,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,r.useFetchStreams)}(e._databaseId,(null===(t=e._app)||void 0===t?void 0:t.options.appId)||"",e._persistenceKey,n);e._firestoreClient=new ff(e._credentials,e._queue,r)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vf{constructor(...e){for(let t=0;t<e.length;++t)if(0===e[t].length)throw new vs(ys.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Us(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class jf{constructor(e){this._byteString=e}static fromBase64String(e){try{return new jf(js.fromBase64String(e))}catch(e){throw new vs(ys.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(e){return new jf(js.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e){this._methodName=e}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new vs(ys.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new vs(ys.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return _s(this._lat,e._lat)||_s(this._long,e._long)}}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf=/^__.*__$/;class Hf{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return null!==this.fieldMask?new Sl(e,this.data,this.fieldMask,t,this.fieldTransforms):new El(e,this.data,t,this.fieldTransforms)}}function $f(e){switch(e){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ps()}}class Kf{constructor(e,t,n,r,i,o){this.settings=e,this.databaseId=t,this.N=n,this.ignoreUndefinedProperties=r,void 0===i&&this.Sa(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Da(){return this.settings.Da}Ca(e){return new Kf(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.N,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Na(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.Ca({path:n,xa:!1});return r.ka(e),r}$a(e){var t;const n=null===(t=this.path)||void 0===t?void 0:t.child(e),r=this.Ca({path:n,xa:!1});return r.Sa(),r}Oa(e){return this.Ca({path:void 0,xa:!0})}Fa(e){return rd(e,this.settings.methodName,this.settings.Ma||!1,this.path,this.settings.La)}contains(e){return void 0!==this.fieldMask.find((t=>e.isPrefixOf(t)))||void 0!==this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))}Sa(){if(this.path)for(let e=0;e<this.path.length;e++)this.ka(this.path.get(e))}ka(e){if(0===e.length)throw this.Fa("Document fields must not be empty");if($f(this.Da)&&qf.test(e))throw this.Fa('Document fields cannot begin and end with "__"')}}class Gf{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.N=n||Bc(e)}Ba(e,t,n,r=!1){return new Kf({Da:e,methodName:t,La:n,path:Us.emptyPath(),xa:!1,Ma:r},this.databaseId,this.N,this.ignoreUndefinedProperties)}}function Wf(e){const t=e._freezeSettings(),n=Bc(e._databaseId);return new Gf(e._databaseId,!!t.ignoreUndefinedProperties,n)}function Qf(e,t,n,r,i,o={}){const s=e.Ba(o.merge||o.mergeFields?2:0,t,n,i);Zf("Data must be an object, but it was:",s,r);const a=Yf(r,s);let l,u;if(o.merge)l=new Vs(s.fieldMask),u=s.fieldTransforms;else if(o.mergeFields){const e=[];for(const r of o.mergeFields){const i=ed(t,r,n);if(!s.contains(i))throw new vs(ys.INVALID_ARGUMENT,`Field '${i}' is specified in your field mask but missing from your input data.`);id(e,i)||e.push(i)}l=new Vs(e),u=s.fieldTransforms.filter((e=>l.covers(e.field)))}else l=null,u=s.fieldTransforms;return new Hf(new ha(a),l,u)}function Xf(e,t){if(Jf(e=q(e)))return Zf("Unsupported field value:",t,e),Yf(e,t);if(e instanceof zf)return function(e,t){if(!$f(t.Da))throw t.Fa(`${e._methodName}() can only be used with update() and set()`);if(!t.path)throw t.Fa(`${e._methodName}() is not currently supported inside arrays`);const n=e._toFieldTransform(t);n&&t.fieldTransforms.push(n)}(e,t),null;if(void 0===e&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),e instanceof Array){if(t.settings.xa&&4!==t.Da)throw t.Fa("Nested arrays are not supported");return function(e,t){const n=[];let r=0;for(const i of e){let e=Xf(i,t.Oa(r));null==e&&(e={nullValue:"NULL_VALUE"}),n.push(e),r++}return{arrayValue:{values:n}}}(e,t)}return function(e,t){if(null===(e=q(e)))return{nullValue:"NULL_VALUE"};if("number"==typeof e)return Za(t.N,e);if("boolean"==typeof e)return{booleanValue:e};if("string"==typeof e)return{stringValue:e};if(e instanceof Date){const n=As.fromDate(e);return{timestampValue:su(t.N,n)}}if(e instanceof As){const n=new As(e.seconds,1e3*Math.floor(e.nanoseconds/1e3));return{timestampValue:su(t.N,n)}}if(e instanceof Bf)return{geoPointValue:{latitude:e.latitude,longitude:e.longitude}};if(e instanceof jf)return{bytesValue:au(t.N,e._byteString)};if(e instanceof Af){const n=t.databaseId,r=e.firestore._databaseId;if(!r.isEqual(n))throw t.Fa(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${n.projectId}/${n.database}`);return{referenceValue:cu(e.firestore._databaseId||t.databaseId,e._key.path)}}throw t.Fa(`Unsupported field value: ${xf(e)}`)}(e,t)}function Yf(e,t){const n={};return Os(e)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Ps(e,((e,r)=>{const i=Xf(r,t.Na(e));null!=i&&(n[e]=i)})),{mapValue:{fields:n}}}function Jf(e){return!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof As||e instanceof Bf||e instanceof jf||e instanceof Af||e instanceof zf)}function Zf(e,t,n){if(!Jf(n)||!function(e){return"object"==typeof e&&null!==e&&(Object.getPrototypeOf(e)===Object.prototype||null===Object.getPrototypeOf(e))}(n)){const r=xf(n);throw"an object"===r?t.Fa(e+" a custom object"):t.Fa(e+" "+r)}}function ed(e,t,n){if((t=q(t))instanceof Vf)return t._internalPath;if("string"==typeof t)return nd(e,t);throw rd("Field path arguments must be of type string or FieldPath.",e,!1,void 0,n)}const td=new RegExp("[~\\*/\\[\\]]");function nd(e,t,n){if(t.search(td)>=0)throw rd(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,e,!1,void 0,n);try{return new Vf(...t.split("."))._internalPath}catch(r){throw rd(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,e,!1,void 0,n)}}function rd(e,t,n,r,i){const o=r&&!r.isEmpty(),s=void 0!==i;let a=`Function ${t}() called with invalid data`;n&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(o||s)&&(l+=" (found",o&&(l+=` in field ${r}`),s&&(l+=` in document ${i}`),l+=")"),new vs(ys.INVALID_ARGUMENT,a+e+l)}function id(e,t){return e.some((e=>e.isEqual(t)))}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e,t,n,r,i){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Af(this._firestore,this._converter,this._key)}exists(){return null!==this._document}data(){if(this._document){if(this._converter){const e=new sd(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ad("DocumentSnapshot.get",e));if(null!==t)return this._userDataWriter.convertValue(t)}}}class sd extends od{data(){return super.data()}}function ad(e,t){return"string"==typeof t?nd(e,t):t instanceof Vf?t._internalPath:t._delegate._internalPath}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ld{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ud extends od{constructor(e,t,n,r,i,o){super(e,t,n,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new cd(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(ad("DocumentSnapshot.get",e));if(null!==n)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class cd extends ud{data(e={}){return super.data(e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class hd{convertValue(e,t="none"){switch(Js(e)){case 0:return null;case 1:return e.booleanValue;case 2:return qs(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Hs(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw ps()}}convertObject(e,t){const n={};return Ps(e.fields,((e,r)=>{n[e]=this.convertValue(r,t)})),n}convertGeoPoint(e){return new Bf(qs(e.latitude),qs(e.longitude))}convertArray(e,t){return(e.values||[]).map((e=>this.convertValue(e,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Ks(e);return null==n?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Gs(e));default:return null}}convertTimestamp(e){const t=Bs(e);return new As(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=Ms.fromString(e);ms(Pu(n));const r=new Ef(n.get(1),n.get(3)),i=new Ys(n.popFirst(5));return r.isEqual(t)||hs(`Document ${i} contains a document reference within a different database (${r.projectId}/${r.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(e,t,n){let r;return r=e?n&&(n.merge||n.mergeFields)?e.toFirestore(t,n):e.toFirestore(t):t,r}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function dd(e){e=Cf(e,Af);const t=Cf(e.firestore,Mf);return wf(Ff(t),e._key).then((n=>yd(t,e,n)))}class pd extends hd{constructor(e){super(),this.firestore=e}convertBytes(e){return new jf(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Af(this.firestore,null,t)}}function md(e,t){const n=Cf(e.firestore,Mf),r=Of(e),i=fd(e.converter,t);return gd(n,[Qf(Wf(e.firestore),"addDoc",r._key,i,null!==e.converter,{}).toMutation(r._key,dl.exists(!1))]).then((()=>r))}function gd(e,t){return function(e,t){const n=new ws;return e.asyncQueue.enqueueAndForget((async()=>async function(e,t,n){const r=lf(e);try{const e=await function(e,t){const n=gs(e),r=As.now(),i=t.reduce(((e,t)=>e.add(t.key)),$l());let o;return n.persistence.runTransaction("Locally write mutations","readwrite",(e=>n.Qn.Pn(e,i).next((i=>{o=i;const s=[];for(const e of t){const t=vl(e,o.get(e.key));null!=t&&s.push(new Sl(e.key,t,fa(t.value.mapValue),dl.exists(!0)))}return n.In.addMutationBatch(e,r,s,t)})))).then((e=>(e.applyToLocalDocumentSet(o),{batchId:e.batchId,changes:o})))}(r.localStore,t);r.sharedClientState.addPendingMutation(e.batchId),function(e,t,n){let r=e.Lo[e.currentUser.toKey()];r||(r=new Pl(_s)),r=r.insert(t,n),e.Lo[e.currentUser.toKey()]=r}(r,e.batchId,n),await rf(r,e.changes),await hh(r.remoteStore)}catch(e){const t=Th(e,"Failed to persist write");n.reject(t)}}(await yf(e),t,n))),n.promise}(Ff(e),t)}function yd(e,t,n){const r=n.docs.get(t._key),i=new pd(e);return new ud(e,i,t._key,r,new ld(n.hasPendingWrites,n.fromCache),t.converter)}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */as="9.1.3",he(new H("firestore",((e,{options:t})=>{const n=e.getProvider("app").getImmediate(),r=new Mf(n,new Ss(e.getProvider("auth-internal")));return t=Object.assign({useFetchStreams:!0},t),r._setSettings(t),r}),"PUBLIC")),ge(os,"3.1.1",undefined),ge(os,"3.1.1","esm2017");var vd=function(e,t={}){if("object"!=typeof t){t={name:t}}const n=Object.assign({name:se,automaticDataCollectionEnabled:!1},t),r=n.name;if("string"!=typeof r||!r)throw de.create("bad-app-name",{appName:String(r)});const i=le.get(r);if(i){if(j(e,i.options)&&j(n,i.config))return i;throw de.create("duplicate-app",{appName:r})}const o=new G(r);for(const e of ue.values())o.addComponent(e);const s=new pe(e,n,o);return le.set(r,s),s}({apiKey:"AIzaSyCvUrwP5dWsSvIkFyLDYNJbTOzYo4TxFGo",authDomain:"voice-shopping-list-eeerock.firebaseapp.com",projectId:"voice-shopping-list-eeerock",storageBucket:"voice-shopping-list-eeerock.appspot.com",messagingSenderId:"758012561885",appId:"1:758012561885:web:e2af3e4e4548c7659ece34",measurementId:"G-HE234101N7"}),wd=function(e=me()){return fe(e,"firestore").getImmediate()}(vd),bd=(function(e=me()){const t=fe(e=q(e),at);t.isInitialized()?t.getImmediate():function(e,t={}){const n=fe(e,at);if(n.isInitialized()){const e=n.getImmediate();if(j(t,n.getOptions()))return e;throw ft.create("already-initialized")}n.initialize({options:t})}(e)}(vd),wd);function Ed(){var e=c(m.useState({0:"editor",1:"молоко",2:"хлеб",3:"киви",4:"крендели"})),n=e[0],r=e[1],i=c(m.useState({1:1,2:2,3:3,4:4})),o=i[0],s=i[1],l=c(m.useState({state:"off",content:"voice",val:""})),f=l[0],p=l[1],g=c(m.useState("")),y=g[0],v=g[1],w=c(m.useState("")),E=w[0],I=w[1];function x(e,t){var n=void 0===t?{}:t;n&&0!==Object.keys(n).length&&s(n),r(e)}function C(){return(C=a(t(h).mark((function e(){var r;return t(h).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,md(Pf(bd,"lists"),{state:n,count:o});case 2:r=e.sent,console.log("Document written with ID: ",r.id),_({state:"on",content:"copy",val:r.id});case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(e){p(u({},e))}function N(e){I(e)}return m.useEffect(a(t(h).mark((function e(){var n,r,i;return t(h).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if((n=window.location.search.substring(1))===y){e.next=8;break}return v(n),r=Of(bd,"lists",n),e.next=6,dd(r);case 6:(i=e.sent).exists()?x(i.data().state,i.data().count):console.log("No such document!");case 8:case"end":return e.stop()}}),e)})))),d.jsxs("div",{className:"w-full h-full flex flex-col justify-center items-center font-sans",children:[d.jsx(S,{modal:f,closeModal:_,addOneToggle:N}),d.jsx(k,{state:n}),d.jsx(b,{state:n,count:o,showModal:_,addOneState:E}),d.jsx(T,{state:n,onChange:x,onShare:function(){return C.apply(this,arguments)},addOneToggle:N})]})}t(p).render(d.jsx(Ed,{}),document.getElementById("root"))}();
//# sourceMappingURL=index.f7937c2a.js.map
