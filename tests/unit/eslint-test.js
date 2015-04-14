/*eslint-env node, mocha, es6 */

var lint = require('mocha-eslint');


var paths = [
  'index.js',
  'lib',
  'tests'
];
var options = {};
options.formatter = 'stylish';

lint(paths, options);
