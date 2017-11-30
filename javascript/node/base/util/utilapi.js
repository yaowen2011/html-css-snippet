var util = require('util');
var events = require('events');
//console.log(util)
//console.log(util.format('%s:%s', 'foo'));
//console.log(util.isArray([]));
//console.log(util.isError(new Error()));

//util.inherits(constructor, superConstructor);

//声明自己的构造函数
function MyStream() {
    events.EventEmitter.call(this);
}

util.inherits(MyStream, events.EventEmitter);

MyStream.prototype.write = function (data) {
    this.emit('data', data);
}

var stream = new MyStream();
stream.on('data', function (data) {
    console.log('获取写事件===>' + data);
})

stream.write('代码中手动触发的写');
