var faNumtoEnMap = {};
var arNumtoEnMap = {};

var arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
var persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

var arabicNumbersToFarsiMap = {};

for (let i = 0; i < 10; i++) {
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

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (arNumtoEnMap[char] || faNumtoEnMap[char]) {
      arr[i] = arNumtoEnMap[char] || faNumtoEnMap[char];
    }
  }

  return arr.join('');
}

export { toEnglishNumbers as digits_fa2en };

export function pad2(number) {
  return number < 10 ? `0${number}` : number;
}
