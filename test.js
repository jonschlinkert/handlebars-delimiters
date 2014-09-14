/*!
 * handlebars-delimiters <https://github.com/jonschlinkert/handlebars-delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var handlebarsDelimiters = require('..');

describe('handlebarsDelimiters', function () {
  it('should handlebars delimiters', function () {
    var actual = handlebarsDelimiters('foo');
    actual.should.equal('foo');
    actual.should.have.property('bar');
  });
});