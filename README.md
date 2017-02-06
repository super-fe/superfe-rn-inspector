# superfe-rn-inspector
[![NPM version][npm-image]][npm-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

Inspector tool for super-fe's react-native apps using [mocha](https://mochajs.org/).

```sh
npm install superfe-rn-inspector --save-dev
cd your_project
./node_modules/.bin/inspect .
```

This module can also be used programmatically from node:

```js
var inspect = require('superfe-rn-inspector');

inspect(process.cwd());
```

## changelog

See [CHANGELOG.md](CHANGELOG.md).

## license

BSD-2-Clause

[npm-url]: https://npmjs.org/package/superfe-rn-inspector
[npm-image]: http://img.shields.io/npm/v/superfe-rn-inspector.svg
[david-dm-url]:https://david-dm.org/super-fe/superfe-rn-inspector
[david-dm-image]:https://img.shields.io/david/super-fe/superfe-rn-inspector.svg
[david-dm-dev-url]:https://david-dm.org/super-fe/superfe-rn-inspector?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/super-fe/superfe-rn-inspector.svg