import { persian_to_jd, jd_to_gregorian, gregorian_to_jd, persian_to_jd_fixed } from './jalali';

export function parseDate(string, convertToPersian) {
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
  isISO = (separator !== '/') && (match[6] !== ' ');
  hour = +match[7] || 0;
  minute = +match[8] || 0;
  seconds = +match[9] || 0;
  millis = +(`0.${(match[10] || '0')}`) * 1000;
  tz = match[11];
  isNonLocal = isISO && (tz || !match[5]);
  tzOffset = (match[12] === '-' ? -1 : 1) * ((+match[13] || 0) * 60 + (+match[14] || 0));

  // timezone should be empty if dates are with / (2012/1/10)
  if ((tz || timeSeparator === 'T') && !isISO) {
    return;
  }

  // one and only-one of year/day should be 4-chars (2012/1/10 vs 10/1/2012)
  if ((day >= 1000) === (year >= 1000)) {
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
    const persian = jd_to_gregorian(persian_to_jd_fixed(year, month, day));
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
