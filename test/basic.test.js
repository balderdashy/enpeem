var assert = require ('assert');
var fs = require('fs-extra');
var path = require('path');

describe('basic usage', function () {

	function rimrafTestStuff (cb) {
		this.pathToDep = path.resolve(
			__dirname,
			'../node_modules/lodash');

		fs.remove(this.pathToDep, cb);
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
			production: true,
		  // loglevel: 'silent'
		}, cb);
	});

	it('should actually install things', function (cb) {
		fs.lstat(this.pathToDep, cb);
	});


});



describe('with more options', function (){

	function rimrafTestStuff (cb) {
		this.pathToDep = path.resolve(
			__dirname,
			'../node_modules/mocha');

		fs.remove(this.pathToDep, cb);
	}
	before(rimrafTestStuff);
	after(rimrafTestStuff);
	
	it('should not crash', function (cb) {
		this.npm.install([
		  'mocha'
		], {
		  // loglevel: 'silent',
		  production: true,
		  // 'min-cache': 999999999
		}, cb);
	});

	it('should actually install things', function (cb) {
		fs.lstat(this.pathToDep, cb);
	});
});



