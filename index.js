// dependencies
var defaults = require('defaults');
var naturalSort = require('javascript-natural-sort');
var repeat = require('repeat-string');
var util = require('util');

// single export
module.exports = formatter;

/**
 * Top-level formatter function, initiates with level 1.
 *
 * @param {Mixed} input
 * @param {Object} [options]
 * @returns {String}
 */

function formatter(input, options) {
  return format(input, 1, defaults(options, formatter.defaults));
}

/**
 * Default options.
 */

formatter.defaults = {
  replacer: null,
  sortKeys: true,
  spaces: 2
};

/**
 * Turns the `input` object into a string with options for human-friendly
 * output.
 *
 * @param {Object} input
 * @param {Object} [options]
 * @returns {String}
 */

function format(input, level, options) {
  if (util.isArray(input)) {
    return array(input, level, options);
  } else if (util.isObject(input)) {
    return object(input, level, options);
  } else {
    return stringify(input, options);
  }
}

/**
 * Thin wrapper for `JSON.stringify()` that allows for setting replacer and
 * spaces option from the `options` object.
 *
 * @param {Mixed} input
 * @param {Object} [options]
 * @returns {String}
 */

function stringify(input, options) {
  if (!options) options = {};
  return JSON.stringify(input, options.replacer, options.spaces);
}

/**
 * JSON format an object directly.
 *
 * @param {Object} input
 * @param {Number} level
 * @param {Object} options
 * @returns {String}
 */

function object(input, level, options) {
  var spaces = options.spaces;
  var inner = indent(level, spaces);
  var outer = indent(level - 1, spaces);

  var keys = Object.keys(input);
  if (options.sortKeys) keys.sort(naturalSort());
  var str = keys.map(function (key) {
    return inner
      + stringify(key) + ': '
      + format(input[key], level + 1, options);
  }).join(',\n');

  return [ '{', str, outer + '}' ].join('\n');
}

/**
 * JSON format an array directly.
 *
 * @param {Object} input
 * @param {Number} level
 * @param {Object} options
 * @returns {String}
 */

function array(input, level, options) {
  var spaces = options.spaces;
  var inner = indent(level, spaces);
  var outer = indent(level - 1, spaces);

  var str = input
    .map(function (value) {
      return inner + format(value, level + 1, options);
    })
    .join(',\n');

  return [ '[', str, outer + ']' ].join('\n');
}

/**
 * Generate indentation whitespace.
 *
 * @param {Number} level
 * @param {Number} spaces
 * @returns {String}
 */

function indent(level, spaces) {
  return repeat(' ', level * spaces);
}
