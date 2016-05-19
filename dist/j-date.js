!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("JDate",[],e):"object"==typeof exports?exports.JDate=e():t.JDate=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){(function(t){"use strict";function i(t,e,n,r,d,u,_){if("string"==typeof t){if(this._d=(0,s.parseDate)((0,o.digits_fa2en)(t),!0),!this._d)throw new Error("Cannot parse date string")}else if(0===arguments.length)this._d=new Date;else if(1===arguments.length)this._d=new Date(t instanceof i?t._d:t);else{var c=(0,a.jd_to_gregorian)((0,a.persian_to_jd_fixed)(t,(e||0)+1,n||1));this._d=new Date(c[0],c[1]-1,c[2],r||0,d||0,u||0,_||0)}this._date=this._d,this._cached_date_ts=null,this._cached_date=[0,0,0],this._cached_utc_date_ts=null,this._cached_utc_date=[0,0,0]}Object.defineProperty(e,"__esModule",{value:!0}),e.JDate=void 0;var r,a=n(1),s=n(3),o=n(4);t.Date;r=i.prototype,r._persianDate=function(){return this._cached_date_ts!=+this._d&&(this._cached_date_ts=+this._d,this._cached_date=(0,a.jd_to_persian)((0,a.gregorian_to_jd)(this._d.getFullYear(),this._d.getMonth()+1,this._d.getDate()))),this._cached_date},r._persianUTCDate=function(){return this._cached_utc_date_ts!=+this._d&&(this._cached_utc_date_ts=+this._d,this._cached_utc_date=(0,a.jd_to_persian)((0,a.gregorian_to_jd)(this._d.getUTCFullYear(),this._d.getUTCMonth()+1,this._d.getUTCDate()))),this._cached_utc_date},r._setPersianDate=function(t,e,n){var i=this._persianDate();i[t]=e,void 0!==n&&(i[2]=n);var r=(0,a.jd_to_gregorian)((0,a.persian_to_jd_fixed)(i[0],i[1],i[2]));this._d.setFullYear(r[0]),this._d.setMonth(r[1]-1,r[2])},r._setUTCPersianDate=function(t,e,n){var i=this._persianUTCDate();void 0!==n&&(i[2]=n),i[t]=e;var r=(0,a.jd_to_gregorian)((0,a.persian_to_jd_fixed)(i[0],i[1],i[2]));this._d.setUTCFullYear(r[0]),this._d.setUTCMonth(r[1]-1,r[2])},r.getDate=function(){return this._persianDate()[2]},r.getMonth=function(){return this._persianDate()[1]-1},r.getFullYear=function(){return this._persianDate()[0]},r.getUTCDate=function(){return this._persianUTCDate()[2]},r.getUTCMonth=function(){return this._persianUTCDate()[1]-1},r.getUTCFullYear=function(){return this._persianUTCDate()[0]},r.setDate=function(t){this._setPersianDate(2,t)},r.setFullYear=function(t){this._setPersianDate(0,t)},r.setMonth=function(t,e){this._setPersianDate(1,t+1,e)},r.setUTCDate=function(t){this._setUTCPersianDate(2,t)},r.setUTCFullYear=function(t){this._setUTCPersianDate(0,t)},r.setUTCMonth=function(t,e){this._setUTCPersianDate(1,t+1,e)},r.toLocaleString=function(){return this.getFullYear()+"/"+(0,o.pad2)(this.getMonth()+1)+"/"+(0,o.pad2)(this.getDate())+" "+(0,o.pad2)(this.getHours())+":"+(0,o.pad2)(this.getMinutes())+":"+(0,o.pad2)(this.getSeconds())},i.now=function(){return Date.now()},i.parse=function(t){return new i(t).getTime()},i.UTC=function(t,e,n,i,r,s,o){var d=(0,a.jd_to_gregorian)((0,a.persian_to_jd_fixed)(t,e+1,n||1));return Date.UTC(d[0],d[1]-1,d[2],i||0,r||0,s||0,o||0)},["getHours","getMilliseconds","getMinutes","getSeconds","getTime","getUTCDay","getUTCHours","getTimezoneOffset","getUTCMilliseconds","getUTCMinutes","getUTCSeconds","setHours","setMilliseconds","setMinutes","setSeconds","setTime","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCSeconds","toDateString","toISOString","toJSON","toString","toLocaleDateString","toLocaleTimeString","toTimeString","toUTCString","valueOf","getDay"].forEach(function(t){r[t]=function(){return this._d[t].apply(this._d,arguments)}}),e["default"]=i,e.JDate=i}).call(e,function(){return this}())},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t){var e=_["default"].d2g(t);return[e.gy,e.gm,e.gd]}function a(t,e,n){return _["default"].g2d(t,e,n)}function s(t){var e=_["default"].d2j(t);return[e.jy,e.jm,e.jd]}function o(t,e,n){return _["default"].j2d(t,e,n)}function d(t,e,n){if(e>12||0>=e){var i=Math.floor((e-1)/12);t+=i,e-=12*i}return o(t,e,n)}Object.defineProperty(e,"__esModule",{value:!0}),e.jd_to_gregorian=r,e.gregorian_to_jd=a,e.jd_to_persian=s,e.persian_to_jd=o,e.persian_to_jd_fixed=d;var u=n(2),_=i(u)},function(t,e){function n(t,e,n){return u(_(t,e,n))}function i(t,e,n){return c(d(t,e,n))}function r(t,e,n){return t>=-61&&3177>=t&&e>=1&&12>=e&&n>=1&&n<=s(t,e)}function a(t){return 0===o(t).leap}function s(t,e){return 6>=e?31:11>=e?30:a(t)?30:29}function o(t){var e,n,i,r,a,s,o,d=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178],u=d.length,_=t+621,c=-14,l=d[0];if(l>t||t>=d[u-1])throw new Error("Invalid Jalaali year "+t);for(o=1;u>o&&(e=d[o],n=e-l,!(e>t));o+=1)c=c+8*f(n,33)+f(h(n,33),4),l=e;return s=t-l,c=c+8*f(s,33)+f(h(s,33)+3,4),4===h(n,33)&&n-s===4&&(c+=1),r=f(_,4)-f(3*(f(_,100)+1),4)-150,a=20+c-r,6>n-s&&(s=s-n+33*f(n+4,33)),i=h(h(s+1,33)-1,4),-1===i&&(i=4),{leap:i,gy:_,march:a}}function d(t,e,n){var i=o(t);return _(i.gy,3,i.march)+31*(e-1)-f(e,7)*(e-7)+n-1}function u(t){var e,n,i,r=c(t).gy,a=r-621,s=o(a),d=_(r,3,s.march);if(i=t-d,i>=0){if(185>=i)return n=1+f(i,31),e=h(i,31)+1,{jy:a,jm:n,jd:e};i-=186}else a-=1,i+=179,1===s.leap&&(i+=1);return n=7+f(i,30),e=h(i,30)+1,{jy:a,jm:n,jd:e}}function _(t,e,n){var i=f(1461*(t+f(e-8,6)+100100),4)+f(153*h(e+9,12)+2,5)+n-34840408;return i=i-f(3*f(t+100100+f(e-8,6),100),4)+752}function c(t){var e,n,i,r,a;return e=4*t+139361631,e=e+4*f(3*f(4*t+183187720,146097),4)-3908,n=5*f(h(e,1461),4)+308,i=f(h(n,153),5)+1,r=h(f(n,153),12)+1,a=f(e,1461)-100100+f(8-r,6),{gy:a,gm:r,gd:i}}function f(t,e){return~~(t/e)}function h(t,e){return t-~~(t/e)*e}t.exports={toJalaali:n,toGregorian:i,isValidJalaaliDate:r,isLeapJalaaliYear:a,jalaaliMonthLength:s,jalCal:o,j2d:d,d2j:u,g2d:_,d2g:c}},function(t,e,n){"use strict";function i(t,e){var n,i,a,s,o,d,u,_,c,f,h,l,g,p,D=/^(\d|\d\d|\d\d\d\d)(?:([-\/])(\d{1,2})(?:\2(\d|\d\d|\d\d\d\d))?)?(([ T])(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2})(?::?(\d{2}))?)?)?$/,T=D.exec(t);if(T&&(i=T[2],a=T[6],s=+T[1],o=+T[3]||1,d=+T[4]||1,u="/"!==i&&" "!==T[6],_=+T[7]||0,c=+T[8]||0,f=+T[9]||0,h=1e3*+("0."+(T[10]||"0")),l=T[11],g=u&&(l||!T[5]),p=("-"===T[12]?-1:1)*(60*(+T[13]||0)+(+T[14]||0)),(!l&&"T"!==a||u)&&d>=1e3!=s>=1e3)){if(d>=1e3){if("-"===i)return;d=+T[1],s=d}if(e){var j=(0,r.jd_to_gregorian)((0,r.persian_to_jd_fixed)(s,o,d));s=j[0],o=j[1],d=j[2]}return n=new Date(s,o-1,d,_,c,f,h),g&&n.setUTCMinutes(n.getUTCMinutes()-n.getTimezoneOffset()+p),n}}Object.defineProperty(e,"__esModule",{value:!0}),e.parseDate=i;var r=n(1)},function(t,e){"use strict";function n(t){var e,n;if(!t&&0!==t)return"";e=t.toString(),n=e.split("");for(var i=0;i<n.length;i++){var s=n[i];(a[s]||r[s])&&(n[i]=a[s]||r[s])}return n.join("")}function i(t){return 10>t?"0"+t:t}Object.defineProperty(e,"__esModule",{value:!0}),e.pad2=i;for(var r={},a={},s=["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"],o=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"],d=0;10>d;d++)a[s[d]]=d,r[o[d]]=d;e.digits_fa2en=n}])});