//an unfinished copy of the a.js exports object is returned to the b.js module. b.js then finishes loading, and its exports object is provided to the a.js module.


console.log('main starting');
var a = require('./a.js');
var b = require('./b.js');

console.log('in main, a.done=%j, b.done=%j', a.done, b.done);