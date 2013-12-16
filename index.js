var switcher = require('sails-util/switcher');
var concat =  require('./reduceStream').concat;
var exec =  require('child_process').exec;
var Err = require('./errors');

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
		var stdout$npm_v = exec('npm -v').stdout;
		concat(stdout$npm_v, function (err, result) {
			if (err) return cb(err);
			if (typeof result !== 'string' ||
				!result.match(NPM_V_OUTPUT)) {
				return cb(Err.cantFindNpm(result));
			}

			// Build command to execute
			var cmd = '';
			cmd += 'npm install ';
			for (var i in dependencies) {
				cmd += dependencies[i] + ' ';
			}
			for (var key in options) {
				cmd += '--'+key + '=' + options[key] + ' ';
			}
			cmd += '';

			// DRY:
			// console.log('WOULD HAVE RUN::');
			// console.log(cmd);

			// Spin up child process
			var npm = exec(cmd);
			var stderr$npm = npm.stderr;
			var stdout$npm = npm.stdout;

			// Watch in case anything goes wrong
			stderr$npm.pipe(process.stderr);

			// When finished, trigger success cb
			npm.on('exit', cb.success);
		});

	}
};


