/*!
 * handlebars-delimiters <https://github.com/jonschlinkert/handlebars-delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var assert = require('assert');
var Handlebars = require('handlebars');
var useDelims = require('./');


describe('custom handlebars delimiters', function () {
  var str = '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>';

  it('should use default delimiters', function () {
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, '{%= name %}Jon SchlinkertJon Schlinkert<%= name %><% name %><<= name >><< name >>');
  });

  it('should use <%=...%>', function () {
    useDelims(Handlebars, ['<%=', '%>']);
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}Jon Schlinkert<% name %><<= name >><< name >>');
  });

  it('should use {%=...%}', function () {
    useDelims(Handlebars, ['{%=', '%}']);
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, 'Jon Schlinkert{{ name }}{{{ name }}}<%= name %><% name %><<= name >><< name >>');
  });

  it('should use <%...%>', function () {
    useDelims(Handlebars, ['<%', '%>']);
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}<%= name %>Jon Schlinkert<<= name >><< name >>');
  });

  it('should use <<...>>', function () {
    useDelims(Handlebars, ['<<', '>>']);
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %><<= name >>Jon Schlinkert');
  });

  it('should use <<=...>>', function () {
    useDelims(Handlebars, ['<<=', '>>']);
    var actual = Handlebars.compile(str)({name: 'Jon Schlinkert'});
    assert.equal(actual, '{%= name %}{{ name }}{{{ name }}}<%= name %><% name %>Jon Schlinkert<< name >>');
  });
});