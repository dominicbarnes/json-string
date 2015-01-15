var assert = require('assert');
var find = require('find-alternate-file').findSync;
var format = require('..');
var fs = require('fs');
var path = require('path');

var fixtures = path.resolve.bind(path, __dirname, 'fixtures');

describe('format(input, [options])', function () {
  it('should handle primitive values', function () {
    assert.strictEqual(format('string') ,'"string"');
    assert.strictEqual(format(42), '42');
    assert.strictEqual(format(1.23), '1.23');
    assert.strictEqual(format(null), 'null');
    assert.strictEqual(format(true), 'true');
    assert.strictEqual(format(false), 'false');
  });

  fs.readdirSync(fixtures()).forEach(function (fixture) {
    it('should handle the fixture - ' + fixture, function () {
      var input = fixtures(fixture, 'input');
      var output = fixtures(fixture, 'output.json');

      var actual = format(require(input), getOptions(fixture));
      var expected = fs.readFileSync(output, 'utf8');

      try {
        assert.equal(actual.trim(), expected.trim());
      } catch (err) {
        console.log('actual', actual);
        console.log('expected', expected);
        throw err;
      }
    });
  });
});

function getOptions(fixture) {
  var file = find(fixtures(fixture, 'options'), [ 'json', 'js' ]);
  return file ? require(file) : null;
}
