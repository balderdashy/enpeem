var switcher = require('sails-util/switcher');
var concat =  require('./reduceStream').concat;
var exec =  require('child_process').exec;



var errors = {
	cantFindNpm: function ( consoleOutput_fromNpmV ) {
		return new Error(
			'Couldn\'t install dependencies because `npm` could not be found.' +
			'(Is it in your $PATH?)' + '\n' +
			'Anyways, you\'ll have to install them yourself with `npm install`.'+
			'Here\'s what I got when I tried `npm -v` :' + '\n' +
			consoleOutput_fromNpmV
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

		
		// Check to make sure npm CLI is accessible
		var NPM_V_OUTPUT = /^[0-9]+\.[0-9]+\.[0-9]+/;
		concat( exec('npm -v').stdout, function (err, result) {
			if (err) return cb(err);
			if (typeof result !== 'string' ||
				!result.match(NPM_V_OUTPUT)) {
				return cb(errors.cantFindNpm(result));
			}

			// Build command to execute

			// Spin up child process
			// exec('npm install ').stderr.pipe(process.stderr);
			cb.success();
		});

	}
};


