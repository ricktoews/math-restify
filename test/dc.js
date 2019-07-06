var assert = require('assert');
var dc = require('../app/modules/dc/dc');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('division: 7', function() {
    it('should return the period of 1/7', function() {
      let payload = dc.divide(1, 7);
      assert.equal(payload.period, '142857');
    });
  });

  describe('division: 7', function() {
    it('should return the starting point of the period of 2/7', function() {
      let payload = dc.divide(1, 7);
      let numerators = payload.periodNumerators;
      assert.equal(numerators[2], 3);
    });
  });
});

