/*!
 * handlebars-delimiters <https://github.com/jonschlinkert/handlebars-delimiters>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var Handlebars = require('handlebars');
var Delimiters = require('delims');
var delimiters = new Delimiters();


function escapeDelims(str, delims) {
  var defaults = /\{{([\s\S]+?)}}/ig;
  var match;

  while (match = defaults.exec(str)) {
    str = str.replace(match[0], '\\{{' + match[1] + '}}');
  }
  return str;
}


function useDelims(Handlebars, delims) {
  var re = delimiters.templates(delims).interpolate;
  if (!Handlebars._compile) {
    Handlebars._compile = Handlebars.compile;
  }

  Handlebars.compile = function () {
    var args = [].slice.call(arguments);
    var match;

    if (typeof args[0] !== 'string') {
      throw new Error('The first argument must be a string.');
    }

    if(delims[0] !== '{{' && delims[1] !== '}}') {
      args[0] = escapeDelims(args[0], delims);
    }

    while (match = re.exec(args[0])) {
      args[0] = args[0].replace(match[0], '{{' + match[1] + '}}');
    }

    return Handlebars._compile.apply(null, args);
  };
};

useDelims(Handlebars, ['<%', '%>']);
console.log(Handlebars.compile('{{ name }}{{{ name }}}<%= name %><< name >>')({name: 'Jon Schlinkert'}));

useDelims(Handlebars, ['<<', '>>']);
console.log(Handlebars.compile('{{ name }}<%= name %><<= name >>')({name: 'Jon Schlinkert'}));