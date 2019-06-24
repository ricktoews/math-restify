var assert = require('assert');
var div = require('../app/modules/dc/division');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe('division: 7', function() {
    it('should return the period of 1/7', function() {
      assert.equal(div.divide(1, 7), '142857');
    });
  });
});

