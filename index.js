var switcher = require('sails-util/switcher');
var exec =  require('child_process').exec;



var errors = {
	cantFindNpm: function () {
		return new Error(
			'Couldn\'t install dependencies because `npm` could not be found.' +
			'(Is it in your $PATH?)' + '\n' +
			'Anyways, you\'ll have to install them yourself with `npm install`.'
		);
	}
};

module.exports = {

	/**
	 * Run `npm install`.
	 * 
	 * @param  {Array}   dependencies	[string names of all your dependencies, plus versions if you want, you know the drill]
	 * @param  {Object}   options
	 * @param  {Object|Function} cb
	 */
	install: function (dependencies, options, cb) {
		cb = switcher(cb || new Function ());

		cb.success();
		// exec('npm install ffi').stderr.pipe(process.stderr);
	}
};
