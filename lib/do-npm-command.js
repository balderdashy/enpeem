var exec = require('child_process').exec;

var concat = require('./reduce-stream').concat;
var Err = require('./errors');

module.exports = function doNpmCommand(options) {

  if (!options.npmCommand) {
    return new Promise(function (resolve, reject) {
      reject(new Error('`npmCommand` option is required'));
    });
  }

  // Defaults
  options.cmdOptions = options.cmdOptions || {};
  options.cmdArgs = options.cmdArgs || [];

  // Check to make sure npm CLI is accessible
  var NPM_V_OUTPUT = /^[0-9]+\.[0-9]+\.[0-9]+/;
  var stdout$npmV = exec('npm -v').stdout;

  var promise = new Promise(function (resolve, reject) {

    concat(stdout$npmV, function (err, result) {
      if (err) {
        reject(err);
      }
      if (typeof result !== 'string' ||
        !result.match(NPM_V_OUTPUT)) {
        return reject(Err.cantFindNpm(result));
      }

      // Build command to execute
      var cmd = '';
      cmd += 'npm ' + options.npmCommand + ' ';
      cmd += options.cmdArgs.join(' ');
      cmd += ' ';

      // if ('save' in options && options.save) {
      //     cmd += '--save ';
      // }
      //
      // if ('saveDev' in options && options.saveDev) {
      //   cmd += '--save-dev ';
      // }
      //
      // if (options.path.length > 0) {
      //   cmd += '--prefix ' + options.path + ' ';
      // }

      for (var key in options.cmdOptions) {
        // Skip undefined options
        if (options.cmdOptions[key] !== undefined) {
          cmd += '--' + key + '=' + options.cmdOptions[key] + ' ';
        }
      }
      cmd += '';

      // DRY:
      // console.log('WOULD HAVE RUN::');
      // console.log(cmd);

      // Spin up child process
      var npm = exec(cmd);
      var stderr$npm = npm.stderr;
      // var stdout$npm = npm.stdout;

      // Watch in case anything goes wrong
      stderr$npm.pipe(process.stderr);

      // When finished, trigger success cb
      npm.on('exit', function onSuccess(exitCode) {
        resolve(exitCode);
      });

      npm.on('error', function onError(error) {
        reject(error);
      });
    });

  });

  return promise;
};
