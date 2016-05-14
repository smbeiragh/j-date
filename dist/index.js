(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["JDate"] = factory();
	else
		root["JDate"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.JDate = undefined;

	var _jalali = __webpack_require__(1);

	var _parse = __webpack_require__(3);

	var _util = __webpack_require__(4);

	// Cache original `Date` class. User may set window.Date = JDate
	var Data = (undefined || global).Date;

	var proto;

	/**
	 * @param {Object=} a ,may have different types for different semantics: 1) string: parse a date
	 * 		2) Date object: clone a date object  3) number: value for year
	 * @param {Number=} month
	 * @param {Number=} day
	 * @param {Number=} hour
	 * @param {Number=} minute
	 * @param {Number=} second
	 * @param {Number=} millisecond
	 * @constructor
	 * @extends {Date}
	 */
	function JDate(a, month, day, hour, minute, second, millisecond) {
	  if (typeof a === 'string') {
	    this._d = (0, _parse.parseDate)((0, _util.digits_fa2en)(a), true);
	    if (!this._d) {
	      throw new Error('Cannot parse date string');
	    }
	  } else if (arguments.length === 0) {
	    this._d = new Date();
	  } else if (arguments.length === 1) {
	    this._d = new Date(a instanceof JDate ? a._d : a);
	  } else {
	    var persian = (0, _jalali.jd_to_gregorian)((0, _jalali.persian_to_jd_fixed)(a, (month || 0) + 1, day || 1));
	    this._d = new Date(persian[0], persian[1] - 1, persian[2], hour || 0, minute || 0, second || 0, millisecond || 0);
	  }
	  this._date = this._d;
	  this._cached_date_ts = null;
	  this._cached_date = [0, 0, 0];
	  this._cached_utc_date_ts = null;
	  this._cached_utc_date = [0, 0, 0];
	}

	proto = JDate.prototype;
	/**
	 * returns current Jalali date representation of internal date object, eg. [1394, 12, 5]
	 * Caches the converted Jalali date for improving performance
	 * @returns {Array}
	 */
	proto._persianDate = function () {
	  if (this._cached_date_ts != +this._d) {
	    this._cached_date_ts = +this._d;
	    this._cached_date = (0, _jalali.jd_to_persian)((0, _jalali.gregorian_to_jd)(this._d.getFullYear(), this._d.getMonth() + 1, this._d.getDate()));
	  }
	  return this._cached_date;
	};
	/**
	 * Exactly like `_persianDate` but for UTC value of date
	 */
	proto._persianUTCDate = function () {
	  if (this._cached_utc_date_ts != +this._d) {
	    this._cached_utc_date_ts = +this._d;
	    this._cached_utc_date = (0, _jalali.jd_to_persian)((0, _jalali.gregorian_to_jd)(this._d.getUTCFullYear(), this._d.getUTCMonth() + 1, this._d.getUTCDate()));
	  }
	  return this._cached_utc_date;
	};
	/**
	 *
	 * @param which , which component of date to change? 0 for year, 1 for month, 2 for day
	 * @param value , value of specified component
	 * @param {Number=} dayValue , change the day along-side specified component, used for setMonth(month[, dayValue])
	 */
	proto._setPersianDate = function (which, value, dayValue) {
	  var persian = this._persianDate();
	  persian[which] = value;
	  if (dayValue !== undefined) {
	    persian[2] = dayValue;
	  }
	  var new_date = (0, _jalali.jd_to_gregorian)((0, _jalali.persian_to_jd_fixed)(persian[0], persian[1], persian[2]));
	  this._d.setFullYear(new_date[0]);
	  this._d.setMonth(new_date[1] - 1, new_date[2]);
	};
	/**
	 * Exactly like `_setPersianDate`, but operates UTC value
	 */
	proto._setUTCPersianDate = function (which, value, dayValue) {
	  var persian = this._persianUTCDate();
	  if (dayValue !== undefined) {
	    persian[2] = dayValue;
	  }
	  persian[which] = value;
	  var new_date = (0, _jalali.jd_to_gregorian)((0, _jalali.persian_to_jd_fixed)(persian[0], persian[1], persian[2]));
	  this._d.setUTCFullYear(new_date[0]);
	  this._d.setUTCMonth(new_date[1] - 1, new_date[2]);
	};

	// All date getter methods
	proto.getDate = function () {
	  return this._persianDate()[2];
	};
	proto.getMonth = function () {
	  return this._persianDate()[1] - 1;
	};
	proto.getFullYear = function () {
	  return this._persianDate()[0];
	};
	proto.getUTCDate = function () {
	  return this._persianUTCDate()[2];
	};
	proto.getUTCMonth = function () {
	  return this._persianUTCDate()[1] - 1;
	};
	proto.getUTCFullYear = function () {
	  return this._persianUTCDate()[0];
	};

	// All date setter methods
	proto.setDate = function (dayValue) {
	  this._setPersianDate(2, dayValue);
	};
	proto.setFullYear = function (yearValue) {
	  this._setPersianDate(0, yearValue);
	};
	proto.setMonth = function (monthValue, dayValue) {
	  this._setPersianDate(1, monthValue + 1, dayValue);
	};
	proto.setUTCDate = function (dayValue) {
	  this._setUTCPersianDate(2, dayValue);
	};
	proto.setUTCFullYear = function (yearValue) {
	  this._setUTCPersianDate(0, yearValue);
	};
	proto.setUTCMonth = function (monthValue, dayValue) {
	  this._setUTCPersianDate(1, monthValue + 1, dayValue);
	};

	/**
	 * The Date.toLocaleString() method can return a string with a language sensitive representation of this date,
	 * so we change it to return date in Jalali calendar
	 */
	proto.toLocaleString = function () {
	  return this.getFullYear() + '/' + (0, _util.pad2)(this.getMonth() + 1) + '/' + (0, _util.pad2)(this.getDate()) + ' ' + (0, _util.pad2)(this.getHours()) + ':' + (0, _util.pad2)(this.getMinutes()) + ':' + (0, _util.pad2)(this.getSeconds());
	};

	/**
	 * The Date.now() method returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC.
	 */
	JDate.now = function now() {
	  return Date.now();
	};

	/**
	 * parses a string representation of a date, and returns the number of milliseconds since January 1, 1970, 00:00:00 UTC.
	 */
	JDate.parse = function parse(strDate) {
	  return new JDate(strDate).getTime();
	};

	/**
	 * The Date.UTC() method accepts the same parameters as the longest form of the constructor, and returns the number of
	 * milliseconds in a Date object since January 1, 1970, 00:00:00, universal time.
	 */
	JDate.UTC = function (year, month, date, hours, minutes, seconds, milliseconds) {
	  var d = (0, _jalali.jd_to_gregorian)((0, _jalali.persian_to_jd_fixed)(year, month + 1, date || 1));
	  return Date.UTC(d[0], d[1] - 1, d[2], hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
	};

	// Proxy all time-related methods to internal date object
	['getHours', 'getMilliseconds', 'getMinutes', 'getSeconds', 'getTime', 'getUTCDay', 'getUTCHours', 'getTimezoneOffset', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCSeconds', 'setHours', 'setMilliseconds', 'setMinutes', 'setSeconds', 'setTime', 'setUTCHours', 'setUTCMilliseconds', 'setUTCMinutes', 'setUTCSeconds', 'toDateString', 'toISOString', 'toJSON', 'toString', 'toLocaleDateString', 'toLocaleTimeString', 'toTimeString', 'toUTCString', 'valueOf', 'getDay'].forEach(function (method) {
	  proto[method] = function () {
	    return this._d[method].apply(this._d, arguments);
	  };
	});

	// Export `JDate` class to global scope
	exports.JDate = JDate;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.jd_to_gregorian = jd_to_gregorian;
	exports.gregorian_to_jd = gregorian_to_jd;
	exports.jd_to_persian = jd_to_persian;
	exports.persian_to_jd = persian_to_jd;
	exports.persian_to_jd_fixed = persian_to_jd_fixed;

	var _jalaaliJs = __webpack_require__(2);

	var _jalaaliJs2 = _interopRequireDefault(_jalaaliJs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Calculate Gregorian calendar date from Julian day
	function jd_to_gregorian(jd) {
	  var res = _jalaaliJs2.default.d2g(jd);
	  return [res.gy, res.gm, res.gd];
	}

	function gregorian_to_jd(year, month, day) {
	  return _jalaaliJs2.default.g2d(year, month, day);
	}

	function jd_to_persian(jd) {
	  var res = _jalaaliJs2.default.d2j(jd);
	  return [res.jy, res.jm, res.jd];
	}

	// Determine Julian day from Persian date
	function persian_to_jd(year, month, day) {
	  return _jalaaliJs2.default.j2d(year, month, day);
	}

	function persian_to_jd_fixed(year, month, day) {
	  /*
	   Fix `persian_to_jd` so we can use negative or large values for month, e.g:
	   persian_to_jd_fixed(1393, 26, 1) == persian_to_jd_fixed(1395, 2, 1)
	   persian_to_jd_fixed(1393, -2, 1) == persian_to_jd_fixed(1392, 10, 1)
	   */
	  if (month > 12 || month <= 0) {
	    var yearDiff = Math.floor((month - 1) / 12);
	    year += yearDiff;
	    month = month - yearDiff * 12;
	  }
	  return persian_to_jd(year, month, day);
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	  Expose functions.
	*/
	module.exports =
	  { toJalaali: toJalaali
	  , toGregorian: toGregorian
	  , isValidJalaaliDate: isValidJalaaliDate
	  , isLeapJalaaliYear: isLeapJalaaliYear
	  , jalaaliMonthLength: jalaaliMonthLength
	  , jalCal: jalCal
	  , j2d: j2d
	  , d2j: d2j
	  , g2d: g2d
	  , d2g: d2g
	  }

	/*
	  Converts a Gregorian date to Jalaali.
	*/
	function toJalaali(gy, gm, gd) {
	  return d2j(g2d(gy, gm, gd))
	}

	/*
	  Converts a Jalaali date to Gregorian.
	*/
	function toGregorian(jy, jm, jd) {
	  return d2g(j2d(jy, jm, jd))
	}

	/*
	  Checks whether a Jalaali date is valid or not.
	*/
	function isValidJalaaliDate(jy, jm, jd) {
	  return  jy >= -61 && jy <= 3177 &&
	          jm >= 1 && jm <= 12 &&
	          jd >= 1 && jd <= jalaaliMonthLength(jy, jm)
	}

	/*
	  Is this a leap year or not?
	*/
	function isLeapJalaaliYear(jy) {
	  return jalCal(jy).leap === 0
	}

	/*
	  Number of days in a given month in a Jalaali year.
	*/
	function jalaaliMonthLength(jy, jm) {
	  if (jm <= 6) return 31
	  if (jm <= 11) return 30
	  if (isLeapJalaaliYear(jy)) return 30
	  return 29
	}

	/*
	  This function determines if the Jalaali (Persian) year is
	  leap (366-day long) or is the common year (365 days), and
	  finds the day in March (Gregorian calendar) of the first
	  day of the Jalaali year (jy).

	  @param jy Jalaali calendar year (-61 to 3177)
	  @return
	    leap: number of years since the last leap year (0 to 4)
	    gy: Gregorian year of the beginning of Jalaali year
	    march: the March day of Farvardin the 1st (1st day of jy)
	  @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
	  @see: http://www.fourmilab.ch/documents/calendar/
	*/
	function jalCal(jy) {
	  // Jalaali years starting the 33-year rule.
	  var breaks =  [ -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210
	                , 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
	                ]
	    , bl = breaks.length
	    , gy = jy + 621
	    , leapJ = -14
	    , jp = breaks[0]
	    , jm
	    , jump
	    , leap
	    , leapG
	    , march
	    , n
	    , i

	  if (jy < jp || jy >= breaks[bl - 1])
	    throw new Error('Invalid Jalaali year ' + jy)

	  // Find the limiting years for the Jalaali year jy.
	  for (i = 1; i < bl; i += 1) {
	    jm = breaks[i]
	    jump = jm - jp
	    if (jy < jm)
	      break
	    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
	    jp = jm
	  }
	  n = jy - jp

	  // Find the number of leap years from AD 621 to the beginning
	  // of the current Jalaali year in the Persian calendar.
	  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
	  if (mod(jump, 33) === 4 && jump - n === 4)
	    leapJ += 1

	  // And the same in the Gregorian calendar (until the year gy).
	  leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150

	  // Determine the Gregorian date of Farvardin the 1st.
	  march = 20 + leapJ - leapG

	  // Find how many years have passed since the last leap year.
	  if (jump - n < 6)
	    n = n - jump + div(jump + 4, 33) * 33
	  leap = mod(mod(n + 1, 33) - 1, 4)
	  if (leap === -1) {
	    leap = 4
	  }

	  return  { leap: leap
	          , gy: gy
	          , march: march
	          }
	}

	/*
	  Converts a date of the Jalaali calendar to the Julian Day number.

	  @param jy Jalaali year (1 to 3100)
	  @param jm Jalaali month (1 to 12)
	  @param jd Jalaali day (1 to 29/31)
	  @return Julian Day number
	*/
	function j2d(jy, jm, jd) {
	  var r = jalCal(jy)
	  return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
	}

	/*
	  Converts the Julian Day number to a date in the Jalaali calendar.

	  @param jdn Julian Day number
	  @return
	    jy: Jalaali year (1 to 3100)
	    jm: Jalaali month (1 to 12)
	    jd: Jalaali day (1 to 29/31)
	*/
	function d2j(jdn) {
	  var gy = d2g(jdn).gy // Calculate Gregorian year (gy).
	    , jy = gy - 621
	    , r = jalCal(jy)
	    , jdn1f = g2d(gy, 3, r.march)
	    , jd
	    , jm
	    , k

	  // Find number of days that passed since 1 Farvardin.
	  k = jdn - jdn1f
	  if (k >= 0) {
	    if (k <= 185) {
	      // The first 6 months.
	      jm = 1 + div(k, 31)
	      jd = mod(k, 31) + 1
	      return  { jy: jy
	              , jm: jm
	              , jd: jd
	              }
	    } else {
	      // The remaining months.
	      k -= 186
	    }
	  } else {
	    // Previous Jalaali year.
	    jy -= 1
	    k += 179
	    if (r.leap === 1)
	      k += 1
	  }
	  jm = 7 + div(k, 30)
	  jd = mod(k, 30) + 1
	  return  { jy: jy
	          , jm: jm
	          , jd: jd
	          }
	}

	/*
	  Calculates the Julian Day number from Gregorian or Julian
	  calendar dates. This integer number corresponds to the noon of
	  the date (i.e. 12 hours of Universal Time).
	  The procedure was tested to be good since 1 March, -100100 (of both
	  calendars) up to a few million years into the future.

	  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
	  @param gm Calendar month (1 to 12)
	  @param gd Calendar day of the month (1 to 28/29/30/31)
	  @return Julian Day number
	*/
	function g2d(gy, gm, gd) {
	  var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4)
	      + div(153 * mod(gm + 9, 12) + 2, 5)
	      + gd - 34840408
	  d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752
	  return d
	}

	/*
	  Calculates Gregorian and Julian calendar dates from the Julian Day number
	  (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
	  calendars) to some millions years ahead of the present.

	  @param jdn Julian Day number
	  @return
	    gy: Calendar year (years BC numbered 0, -1, -2, ...)
	    gm: Calendar month (1 to 12)
	    gd: Calendar day of the month M (1 to 28/29/30/31)
	*/
	function d2g(jdn) {
	  var j
	    , i
	    , gd
	    , gm
	    , gy
	  j = 4 * jdn + 139361631
	  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
	  i = div(mod(j, 1461), 4) * 5 + 308
	  gd = div(mod(i, 153), 5) + 1
	  gm = mod(div(i, 153), 12) + 1
	  gy = div(j, 1461) - 100100 + div(8 - gm, 6)
	  return  { gy: gy
	          , gm: gm
	          , gd: gd
	          }
	}

	/*
	  Utility helper functions.
	*/

	function div(a, b) {
	  return ~~(a / b)
	}

	function mod(a, b) {
	  return a - ~~(a / b) * b
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseDate = parseDate;

	var _jalali = __webpack_require__(1);

	function parseDate(string, convertToPersian) {
	  /*
	   http://en.wikipedia.org/wiki/ISO_8601
	   http://dygraphs.com/date-formats.html
	   https://github.com/arshaw/xdate/blob/master/src/xdate.js#L414
	   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
	   tests:
	   +parseDate('2014') == +new Date('2014')
	   +parseDate('2014-2') == +new Date('2014-02')
	   +parseDate('2014-2-3') == +new Date('2014-02-03')
	   +parseDate('2014-02-03 12:11') == +new Date('2014/02/03 12:11')
	   +parseDate('2014-02-03T12:11') == +new Date('2014/02/03 12:11')
	   parseDate('2014/02/03T12:11') == undefined
	   +parseDate('2014/02/03 12:11:10.2') == +new Date('2014/02/03 12:11:10') + 200
	   +parseDate('2014/02/03 12:11:10.02') == +new Date('2014/02/03 12:11:10') + 20
	   parseDate('2014/02/03 12:11:10Z') == undefined
	   +parseDate('2014-02-03T12:11:10Z') == +new Date('2014-02-03T12:11:10Z')
	   +parseDate('2014-02-03T12:11:10+0000') == +new Date('2014-02-03T12:11:10Z')
	   +parseDate('2014-02-03T10:41:10+0130') == +new Date('2014-02-03T12:11:10Z')
	   */
	  var re = /^(\d|\d\d|\d\d\d\d)(?:([-\/])(\d{1,2})(?:\2(\d|\d\d|\d\d\d\d))?)?(([ T])(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d+))?)?(Z|([+-])(\d{2})(?::?(\d{2}))?)?)?$/;
	  var match = re.exec(string);
	  // re.exec('2012-4-5 01:23:10.1111+0130')
	  //  0                              1       2    3    4    5                      6    7     8     9     10      11       12   13    14
	  // ["2012-4-5 01:23:10.1111+0330", "2012", "-", "4", "5", " 01:23:10.1111+0130", " ", "01", "23", "10", "1111", "+0330", "+", "03", "30"]

	  var date;
	  var separator;
	  var timeSeparator;
	  var year;
	  var month;
	  var day;
	  var isISO;
	  var hour;
	  var minute;
	  var seconds;
	  var millis;
	  var tz;
	  var isNonLocal;
	  var tzOffset;

	  if (!match) {
	    return;
	  }

	  separator = match[2];
	  timeSeparator = match[6];
	  year = +match[1];
	  month = +match[3] || 1;
	  day = +match[4] || 1;
	  isISO = separator !== '/' && match[6] !== ' ';
	  hour = +match[7] || 0;
	  minute = +match[8] || 0;
	  seconds = +match[9] || 0;
	  millis = +('0.' + (match[10] || '0')) * 1000;
	  tz = match[11];
	  isNonLocal = isISO && (tz || !match[5]);
	  tzOffset = (match[12] === '-' ? -1 : 1) * ((+match[13] || 0) * 60 + (+match[14] || 0));

	  // timezone should be empty if dates are with / (2012/1/10)
	  if ((tz || timeSeparator === 'T') && !isISO) {
	    return;
	  }

	  // one and only-one of year/day should be 4-chars (2012/1/10 vs 10/1/2012)
	  if (day >= 1000 === year >= 1000) {
	    return;
	  }

	  if (day >= 1000) {
	    // year and day only can be swapped if using '/' as separator
	    if (separator === '-') {
	      return;
	    }
	    day = +match[1];
	    year = day;
	  }

	  if (convertToPersian) {
	    var persian = (0, _jalali.jd_to_gregorian)((0, _jalali.persian_to_jd_fixed)(year, month, day));
	    year = persian[0];
	    month = persian[1];
	    day = persian[2];
	  }

	  date = new Date(year, month - 1, day, hour, minute, seconds, millis);

	  if (isNonLocal) {
	    date.setUTCMinutes(date.getUTCMinutes() - date.getTimezoneOffset() + tzOffset);
	  }

	  return date;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.pad2 = pad2;
	var faNumtoEnMap = {};
	var arNumtoEnMap = {};

	var arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
	var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

	var arabicNumbersToFarsiMap = {};

	for (var i = 0; i < 10; i++) {
	  arNumtoEnMap[arabicNumbers[i]] = i;
	  faNumtoEnMap[persianNumbers[i]] = i;
	}

	function toEnglishNumbers(number) {

	  var str;
	  var arr;

	  if (!number && number !== 0) {
	    return '';
	  }

	  str = number.toString();
	  arr = str.split('');

	  for (var _i = 0; _i < arr.length; _i++) {
	    var char = arr[_i];
	    if (arNumtoEnMap[char] || faNumtoEnMap[char]) {
	      arr[_i] = arNumtoEnMap[char] || faNumtoEnMap[char];
	    }
	  }

	  return arr.join('');
	}

	exports.digits_fa2en = toEnglishNumbers;
	function pad2(number) {
	  return number < 10 ? '0' + number : number;
	}

/***/ }
/******/ ])
});
;