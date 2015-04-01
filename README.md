enpeem
======
[![Build Status](https://travis-ci.org/balderdashy/enpeem.svg?branch=master)](https://travis-ci.org/balderdashy/enpeem) [![npm version](https://badge.fury.io/js/enpeem.svg)](https://npmjs.org/package/enpeem)

Lightweight wrapper for accessing npm programmatically (alternative to adding `npm` as a dependency)

`require('npm')` seems like a good idea, but it adds tons of weight to your module, since it takes a long time to install.  Why not use the `npm` your users already have?


> NOTE:
> re: `cache-min`, see: https://github.com/isaacs/npm/issues/2568#issuecomment-30626394
> re: `loglevel`, see: https://github.com/isaacs/npm/pull/4320



## Usage

```shell
$ npm install enpeem --save
```

```javascript
var npm = require('enpeem');
```

For all supported options look into the `index.js` `install` and `update` function.

#### npm install

```javascript
npm.install({
  dependencies: [
    'sails@0.10.1',
    'sails-disk@git://github.com/balderdashy/sails-disk.git#associations',
    'lodash'
  ],
  prefix: 'custom/path/to/install',
  saveDev: true, //--save-dev flag
  //saves package to package.json without installing. Only works with save/saveDev option
  dryRun: true,
  loglevel: 'silent',
  'cache-min': 999999999
}, function (err) { /* ... */ });
```


#### npm update

```javascript
npm.update({
  loglevel: 'silent'
}, function (err) { /* ... */ });
```
