// Cache original `Date` class. User may set window.Date = JDate
var Data = (this || global).Date;

import {
  jd_to_persian,
  persian_to_jd,
  jd_to_gregorian,
  gregorian_to_jd,
  persian_to_jd_fixed
} from './util/jalali';
import { parseDate } from './util/parse';
import { digits_fa2en, pad2 } from './util/util';

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
    this._d = parseDate(digits_fa2en(a), true);
    if (!this._d) {
      throw new Error('Cannot parse date string');
    }
  } else if (arguments.length === 0) {
    this._d = new Date();
  } else if (arguments.length === 1) {
    this._d = new Date((a instanceof JDate) ? a._d : a);
  } else {
    const persian = jd_to_gregorian(persian_to_jd_fixed(a, (month || 0) + 1, day || 1));
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
proto._persianDate = function(){
  if (this._cached_date_ts != +this._d) {
    this._cached_date_ts = +this._d;
    this._cached_date = jd_to_persian(gregorian_to_jd(this._d.getFullYear(), this._d.getMonth() + 1, this._d.getDate()));
  }
  return this._cached_date;
};
/**
 * Exactly like `_persianDate` but for UTC value of date
 */
proto._persianUTCDate = function(){
  if (this._cached_utc_date_ts != +this._d) {
    this._cached_utc_date_ts = +this._d;
    this._cached_utc_date = jd_to_persian(gregorian_to_jd(this._d.getUTCFullYear(), this._d.getUTCMonth() + 1, this._d.getUTCDate()));
  }
  return this._cached_utc_date;
};
/**
 *
 * @param which , which component of date to change? 0 for year, 1 for month, 2 for day
 * @param value , value of specified component
 * @param {Number=} dayValue , change the day along-side specified component, used for setMonth(month[, dayValue])
 */
proto._setPersianDate = function(which, value, dayValue) {
  var persian = this._persianDate();
  persian[which] = value;
  if (dayValue !== undefined) {
    persian[2] = dayValue;
  }
  var new_date = jd_to_gregorian(persian_to_jd_fixed(persian[0], persian[1], persian[2]));
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
  var new_date = jd_to_gregorian(persian_to_jd_fixed(persian[0], persian[1], persian[2]));
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
  return `${this.getFullYear()}/${pad2(this.getMonth() + 1)}/${pad2(this.getDate())} ${pad2(this.getHours())}:${pad2(this.getMinutes())}:${pad2(this.getSeconds())}`;
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
  return (new JDate(strDate)).getTime();
};

/**
 * The Date.UTC() method accepts the same parameters as the longest form of the constructor, and returns the number of
 * milliseconds in a Date object since January 1, 1970, 00:00:00, universal time.
 */
JDate.UTC = function (year, month, date, hours, minutes, seconds, milliseconds) {
  var d = jd_to_gregorian(persian_to_jd_fixed(year, month + 1, date || 1));
  return Date.UTC(d[0], d[1] - 1, d[2], hours || 0, minutes || 0, seconds || 0, milliseconds || 0);
};

// Proxy all time-related methods to internal date object
['getHours', 'getMilliseconds', 'getMinutes', 'getSeconds', 'getTime', 'getUTCDay',
  'getUTCHours', 'getTimezoneOffset', 'getUTCMilliseconds', 'getUTCMinutes', 'getUTCSeconds',
  'setHours', 'setMilliseconds', 'setMinutes', 'setSeconds', 'setTime', 'setUTCHours',
  'setUTCMilliseconds', 'setUTCMinutes', 'setUTCSeconds', 'toDateString', 'toISOString',
  'toJSON', 'toString', 'toLocaleDateString', 'toLocaleTimeString', 'toTimeString',
  'toUTCString', 'valueOf', 'getDay'].forEach((method) => {
    proto[method] = function() {
      return this._d[method].apply(this._d, arguments);
    };
  });


// Export `JDate` class to global scope
export { JDate as JDate };
