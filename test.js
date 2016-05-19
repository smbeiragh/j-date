var JDate = require('./dist/j-date.src').JDate;

console.log('JDate should be function', typeof(JDate) === 'function');

console.log((new JDate('139۴-12-2')).toLocaleString());