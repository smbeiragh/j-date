import jalali from 'jalaali-js';

// Calculate Gregorian calendar date from Julian day
export function jd_to_gregorian(jd) {
  var res = jalali.d2g(jd);
  return [res.gy, res.gm, res.gd];
}

export function gregorian_to_jd(year, month, day) {
  return jalali.g2d(year, month, day);
}

export function jd_to_persian(jd) {
  var res = jalali.d2j(jd);
  return [res.jy, res.jm, res.jd];
}

// Determine Julian day from Persian date
export function persian_to_jd(year, month, day) {
  return jalali.j2d(year, month, day);
}

export function persian_to_jd_fixed(year, month, day) {
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
