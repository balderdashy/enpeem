var path = require('path');
var fs = require('fs');

/**
* 'Simulates' and install command by just adding the package to the package.json
* is --save, or --save-dev is provided.
*
* @method installDryRun
* @param {Object} options
* @param {Array} dependencies the arguments after the npmCommand. E.g. packagenames
* @param {Object} cmdOptions Has npm command options
* @param {Boolean} cmdOptions.save Turns on the --save flag, which saves
* the given dependency as 'dependencies'
* @param {Boolean} cmdOptions['save-dev'] Turning on the --save-dev flag, which
* saves the given dependency as 'devDependencies'
* @param {String} cmdOptions.prefix Adds the --prefix flag which lets npm install
* the dependecy into a custom path
* @return {Boolean}
*/

module.exports = function installDryRun(dependencies, cmdOptions) {
  cmdOptions = cmdOptions || {};

  if (cmdOptions.save || cmdOptions['save-dev']) {
    var prefix = cmdOptions.prefix || '';
    var fileName = path.join(process.cwd(), prefix, 'package.json');
    try {
      var packageInfo = fs.readFileSync(fileName);
    } catch (error) {
      return error;
    }
    var content = JSON.parse(packageInfo);
    var packageToSave = '';
    var versionToSave = '';

    for (var i = 0; i < dependencies.length; i++) {
      var atPos = dependencies[i].indexOf('@');
      if (atPos > -1) {
        // cut out the @ and use the semVer instead of the *
        packageToSave = dependencies[i].slice(0, atPos);
        versionToSave = dependencies[i].slice(atPos + 1);
      } else {
        packageToSave = dependencies[i];
        versionToSave = '*';
      }

      if (cmdOptions.save) {
        content.dependencies[packageToSave] = versionToSave;
      } else if (cmdOptions['save-dev']) {
        content.devDependencies[packageToSave] = versionToSave;
      }
    }

    try {
      fs.writeFileSync(fileName, JSON.stringify(content, null, 2));
    } catch (error) {
      return error;
    }
    return true;
  }
  return true;
};
