/*eslint-env node, mocha, es6 */

var path          = require('path');
var fs            = require('fs-extra');
var { expect }    = require('chai');
var tmp        	  = require('tmp-sync');

var installDryRun  = require('../../lib/install-dry-run');

var root          = process.cwd();
var tmproot       = path.join(root, 'tmp');

describe('installDryRun', function () {
  var tmpdir;

  before(function () {
    tmpdir = tmp.in(tmproot);
    this.pathToPackage = path.join(tmpdir, 'package.json');
    fs.copySync('package.json', this.pathToPackage);
    process.chdir(tmpdir);
  });

  after(function () {
    process.chdir(root);
    fs.removeSync(tmproot);
  });

  it('should write to dependencies with save option',  async function () {
    var result = installDryRun(['string', 'lodash'], { save: true });
    expect(result).to.equal(true);

    var dependencies = JSON.parse(fs.readFileSync(this.pathToPackage)).dependencies;
    expect(dependencies).to.include.keys(['string', 'lodash']);
    expect(dependencies).to.include({ 'string': '*', 'lodash': '*' });
  });

  it('should write to devDependencies with saveDev option', async function () {
    installDryRun(['string'], { 'save-dev': true });

    var devDependencies = JSON.parse(fs.readFileSync(this.pathToPackage)).devDependencies;
    expect(devDependencies).to.include.keys('string');
    expect(devDependencies).to.include({ 'string': '*' });
  });

  it('should save with the right version', async function () {
    installDryRun(['string@3.1.1', 'lodash@^3.6.0'], { 'save-dev': true });

    var devDependencies = JSON.parse(fs.readFileSync(this.pathToPackage)).devDependencies;
    expect(devDependencies).to.include.keys(['string', 'lodash']);
    expect(devDependencies).to.include({ 'string': '3.1.1', 'lodash': '^3.6.0' });
  });

  it('should save to prefixed folder', async function () {
    var prefixFolder = 'new-folder';

    var pathToPackage = path.join(tmpdir, prefixFolder, 'package.json');
    fs.copySync('package.json', pathToPackage);

    installDryRun(['string@3.1.1', 'sane-cli'], { save: true, prefix: prefixFolder });

    var dependencies = JSON.parse(fs.readFileSync(pathToPackage)).dependencies;
    expect(dependencies).to.include({ 'string': '3.1.1', 'sane-cli': '*' });
  });

  it('should do nothing without save or saveDev option', async function () {
    var result = installDryRun(['sails']);

    expect(result).to.equal(true);

    var devDependencies = JSON.parse(fs.readFileSync(this.pathToPackage)).devDependencies;
    expect(devDependencies).to.not.include.keys('sails');

    var dependencies = JSON.parse(fs.readFileSync(this.pathToPackage)).dependencies;
    expect(dependencies).to.not.include.keys('sails');
  });
});
