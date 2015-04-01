var { exec } = require('child_process');
var whichSync = require('which').sync;

var Err = require('./errors');
var installDryRun = require('./install-dry-run');

/**
* Run an npm command with the given options
*
* @method doNpmCommand
* @param {Object} options
* @param {String} options.npmCommand A command that npm recognizes. E.g. 'install'
* @param {Array} options.cmdArgs the arguments after the npmCommand. E.g. packagenames
* @param {Boolean} options.skip If true the function immediately returns. Useful for testing.
* @param {Boolean} options.dryRun If true, this adds the package to the package.json
* in the current folder or the ptions.npmCommand.prefix folder without installing
* @param {String} options.cmdPrefix Add a custom prefix to the command such as 'docker-compose run server'
* @param {Object} options.cmdOptions Has npm command options
* @param {Boolean} options.cmdOptions.production Turns on the --production flag,
* which is uesed to only install dependencies and excluding devDependencies
* @param {String} options.cmdOptions.loglevel Changes how much the command logs. E.g. 'silent'
* @param {Boolean} options.cmdOptions.save Turns on the --save flag, which saves
* the given dependency as 'dependencies'
* @param {Boolean} options.cmdOptions['save-dev'] Turning on the --save-dev flag, which
* saves the given dependency as 'devDependencies'
* @param {String} options.cmdOptions.prefix Adds the --prefix flag which lets npm install
* the dependecy into a custom path
* @return {Promise} Returns a Promise
*/
module.exports = function doNpmCommand(options) {

  options = options || {};

  if ('skip' in options && options.skip === true) {
    return new Promise(function (resolve) {
      resolve(0);
    });
  }

  if (!options.npmCommand) {
    return new Promise(function (resolve, reject) {
      reject(new Error('`npmCommand` option is required'));
    });
  }

  // Defaults
  options.cmdOptions = options.cmdOptions || {};
  options.cmdArgs = options.cmdArgs || [];

  if ('dryRun' in options && options.dryRun === true) {
    if (options.npmCommand === 'install') {
      installDryRun(options.cmdArgs, options.cmdOptions);
    } else {
      return new Promise(function (resolve) {
        resolve(0);
      });
    }
  }

  // Check to make sure npm CLI is accessible
  try {
    whichSync('npm');
  } catch (error) {
    return new Promise(function (resolve, reject) {
      reject(Err.cantFindNpm());
    });
  }

  var promise = new Promise(function (resolve, reject) {

    // Build command to execute
    var cmd = '';
    cmd += 'npm ' + options.npmCommand + ' ';
    cmd += options.cmdArgs.join(' ');
    cmd += ' ';

    for (var key in options.cmdOptions) {
      // Skip undefined options
      if (options.cmdOptions[key] !== undefined) {
        cmd += '--' + key + '=' + options.cmdOptions[key] + ' ';
      }
    }
    cmd += '';

    if (options.cmdPrefix) {
      cmd = options.cmdPrefix + ' ' + cmd;
    }

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

  return promise;
};
