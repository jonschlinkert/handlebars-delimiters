/*!
 * handlebars-delimiters <https://github.com/jonschlinkert/handlebars-delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var useDelims = require('./');

describe('custom handlebars delimiters', function () {
  var Handlebars, str = '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>%{name}%{ name }';

  beforeEach(function() {
    Handlebars = require('handlebars');
  });

  function testWith(str, expectation) {
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, expectation);
  }

  it('should use default delimiters', function () {
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    testWith(str, '{%= name %}Jon SchlinkertJon Schlinkert<%= name %><% name %><<= name >><< name >>%{name}%{ name }');
  });

  it('should use <%=...%>', function () {
    useDelims(Handlebars, ['<%=', '%>']);
    testWith(str, '{%= name %}{{ name }}{{{ name }}}Jon Schlinkert<% name %><<= name >><< name >>%{name}%{ name }');
  });

  it('should use {%=...%}', function () {
    useDelims(Handlebars, ['{%=', '%}']);
    testWith(str, 'Jon Schlinkert{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>%{name}%{ name }');
  });

  it('should use <%...%>', function () {
    useDelims(Handlebars, ['<%', '%>']);
    testWith(str, '{%= name %}{{ name }}{{{ name }}}<%= name %>Jon Schlinkert<<= name >><< name >>%{name}%{ name }');
  });

  it('should use <<...>>', function () {
    useDelims(Handlebars, ['<<', '>>']);
    testWith(str, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >>Jon Schlinkert%{name}%{ name }');
  });

  it('should use <<=...>>', function () {
    useDelims(Handlebars, ['<<=', '>>']);
    testWith(str, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %>Jon Schlinkert<< name >>%{name}%{ name }');
  });

  it('should use %{...} with or without spaces', function () {
    useDelims(Handlebars, ['%{', '}']);
    testWith(str, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>Jon SchlinkertJon Schlinkert');
  });

  it('should handle no spaces in first occurence', function () {
    useDelims(Handlebars, ['%{', '}']);
    testWith("%{name}", 'Jon Schlinkert');
  });

  it('should handle spaces in first occurence', function () {
    useDelims(Handlebars, ['%{', '}']);
    testWith("%{ name }", 'Jon Schlinkert');
  });
});
