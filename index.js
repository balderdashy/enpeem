/**
 * Module dependencies
 */

var doNpmCommand = require('./lib/do-npm-command');


module.exports = {

  /**
   * Run `npm install`.
   *
   * @param  {Array}   dependencies	[string names of all your dependencies, plus versions if you want, you know the drill]
   * @param  {Object}   options
   * @param  {Object|Function} cb
   */
  install: function (options) {
    return doNpmCommand({
      npmCommand: 'install',
      cmdArgs: options.dependencies,
      skip: options.skip || false,
      dryRun: options.dryRun || false,
      cmdPrefix: options.cmdPrefix || false,
      cmdOptions: {
        production: options.production || false,
        loglevel: options.loglevel || undefined,
        save: options.save || false,
        'save-dev': options.saveDev || false,
        prefix: options.prefix || undefined
      }
    });
  },

  /**
   * @param  {[type]}   options      [description]
   * @param  {Function} cb           [description]
   * @return {[type]}                [description]
   */
  update: function (options) {
    return doNpmCommand({
      npmCommand: 'update',
      cmdArgs: [],
      path: options.path || '',
      skip: options.skip || false,
      dryRun: options.dryRun || false,
      cmdPrefix: options.cmdPrefix || false,
      cmdOptions: {
        production: options.production || false,
        loglevel: options.loglevel || undefined,
        prefix: options.prefix || undefined
      }
    });
  }
};
