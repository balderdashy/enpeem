/**
 * Module dependencies
 */

var exec =  require('child_process').exec
	, reduce = require('stream-reduce');



/**
 * Reduce a stream of data into a single value.
 * 
 * @param  {[type]}   stream$ [description]
 * @param  {Function} reducer [reducer object]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
function _reduceStream (stream$, reducer, cb) {

	stream$
		.pipe(reduce(reducer.fn, reducer.memo))
		.once('data', function (reduction) {
			cb(null, reduction);
		})
		.once('error', cb);
}


/**
 * Returns a reduction function.
 * @param  {Object} reducer [reducer definition]
 * @return {Function}
 */
function _createReducer( reducer ) {
	return function (stream$, cb) {
		_reduceStream(stream$, reducer, cb);
	};
}


/**
 * Available reduction methods
 * @type {Object}
 */
module.exports = {

	/**
	 * concat
	 * 
	 * Reduce a stream's emissions into a single string.
	 */
	concat: _createReducer({
		fn: function concat (memo, data) {
			return memo + data;
		},
		memo: ''
	})
	
};
