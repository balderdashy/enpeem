var assert = require ('assert');
var fs = require('fs-extra');
var path = require('path');

describe('basic usage', function () {

	function rimrafTestStuff (cb) {
		var pathToDep = path.resolve(
			__dirname,
			'../node_modules/lodash');

		fs.remove(pathToDep, cb);
	}
	before(rimrafTestStuff);
	after(rimrafTestStuff);

	it('should be requirable', function () {
		this.npm = require('../');
		assert(this.npm);
	});

	it('should not crash', function (cb) {
		this.npm.install([
		  'lodash'
		], {
		  loglevel: 'silent'
		}, cb);
	});

	it('should actually install things', function (cb) {
		var pathToDep = path.resolve(
		__dirname, '../node_modules/lodash');

		fs.lstat(pathToDep, cb);
	});
});
