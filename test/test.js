var JDate = require('./../dist/j-date.src').JDate;

module.exports = {
  setUp: function (callback) {
    this.foo = 'bar';
    callback();
  },
  tearDown: function (callback) {
    // clean up
    callback();
  },
  test1: function (test) {
    test.ok(typeof(JDate) === 'function', 'JDate should be function');
    test.done();
  },
  test2: function (test) {
    test.ok(
      (new JDate('139۴-12-2')).toLocaleString().split(' ')[0] === '1394/12/02',
      'new JDate("139۴-12-2")).toLocaleString() begins with 1394/12/02'
    );
    test.done();
  }
};
