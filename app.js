'use strict';

var Woden = require('woden'),
		woden = new Woden({}),
		DS = {};

woden.listen(4444);
console.log('Listening on 4444...');