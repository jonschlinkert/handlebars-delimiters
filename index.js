/*!
 * handlebars-delimiters <https://github.com/jonschlinkert/handlebars-delimiters>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

/**
 * RegExp cache
 */

var cache = {};


/**
 * Pass `Handlebars` and the `delimiters` to use as replacements. This
 * patches the `Handlebars.compile` method to automatically use the
 * custom delimiters when compiling.
 *
 * @param {Object} `Handlebars`
 * @param {Array} `delimiters` Array with open and close delimiters, like `['<%', '%>']`
 * @return {undefined}
 * @api public
 */

module.exports = function(Handlebars, delimiters) {
  if (delimiters[0].slice(-1) !== '=') {
    delimiters[0] += '(?!=)';
  }

  var source = delimiters[0] + '([\\s\\S]+?)' + delimiters[1];

  // Idea for compile method from http://stackoverflow.com/a/19181804/1267639
  if (!Handlebars._compile) {
    Handlebars._compile = Handlebars.compile;
  }

  Handlebars.compile = function(str) {
    var args = [].slice.call(arguments);
    if (typeof str === 'string') {
      if(delimiters[0] !== '{{' && delimiters[1] !== '}}') {
        args[0] = escapeDelimiters(args[0]);
      }
      args[0] = replaceDelimiters(args[0], source);
    }
    return Handlebars._compile.apply(Handlebars, args);
  };
};

/**
 * Replace or escape delimiters in the given string.
 *
 * @param {String} `str` String with handlebars to replace or escape.
 * @param {String} `source` The delimiters regex source string to conver to a regular expression.
 * @param {Boolean} `escape` If true, replacements are escaped with a double-slash.
 * @return {String}
 * @api public
 */

function replaceDelimiters(str, source, escape) {
  var regex = cache[source] || (cache[source] = new RegExp(source, 'g'));
  var match;

  while ((match = regex.exec(str))) {
    var prefix = str.slice(0, match.index);
    var inner = (escape ? '\\' : '') + '{{' + match[1] + '}}';
    var suffix = str.slice(match.index + match[0].length);
    str = prefix + inner + suffix;
  }
  return str;
}

/**
 * Escape delimiters in the given string.
 *
 * @param {String} `str` String with handlebars to replace or escape.
 * @return {String}
 * @api public
 */

function escapeDelimiters(str) {
  return replaceDelimiters(str, '{{([\\s\\S]+?)}}', true);
}

/**
 * Expose `escapeDelimiters` and `replaceDelimiters`
 */

module.exports.replaceDelimiters = replaceDelimiters;
module.exports.escapeDelimiters = escapeDelimiters;
