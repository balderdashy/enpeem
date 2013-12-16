enpeem
======

Lightweight wrapper for accessing npm programmatically (alternative to adding `npm` as a dependency)

#### Purpose

`require('npm')` seems like a good idea, but it adds tons of weight to your module, since it takes a long time to install.  Why not use the `npm` your users already have?

#### Usage



```javascript
var npm = require('enpeem');

var modules = [
  'sails@0.9.7',
  'sails-disk@git://github.com/balderdashy/sails-disk.git#associations',
  'lodash'
];

npm.install(modules, {
  loglevel: 'silent',
  'cache-min': 999999999
}, function (err) { /* ... */ });
```


###### npm install

`npm.install(dependencies, [npmOptions], [callback(s)])`


> NOTE:
> re: `cache-min`, see: https://github.com/isaacs/npm/issues/2568#issuecomment-30626394
> re: `loglevel`, see: https://github.com/isaacs/npm/pull/4320
