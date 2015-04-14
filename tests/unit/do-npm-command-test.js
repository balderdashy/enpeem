/*eslint-env node, mocha, es6 */

var { expect } 	  = require('chai');

var doNpmCommand  = require('../../lib/do-npm-command');

describe('doNpmCommand', function () {
  it('should exit with 0 on skip',  async function () {
    try {
      var exitCode = await doNpmCommand({ skip: true});
      expect(exitCode).to.equal(0);
    } catch (error) {
      expect(error, error).to.not.exist; //eslint-disable-line no-unused-expressions
    }
  });

  it('should error if no npmCommand is provided', async function () {
    try {
      var exitCode = await doNpmCommand();
      expect(exitCode, 'Should have errored.').to.not.exist; //eslint-disable-line no-unused-expressions
    } catch (error) {
      expect(error.message).to.equal('`npmCommand` option is required');
    }
  });
});
