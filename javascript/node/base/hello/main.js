var counter1 = require('./util/counter.js');
var counter2 = require('./util/counter.js');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());
console.log('同一个文件被require多次，只会引入一次');