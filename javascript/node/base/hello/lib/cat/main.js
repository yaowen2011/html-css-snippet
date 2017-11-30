var head = require('./head.js');
var body = require('./body.js');

exports.create = function (name) {
    return {
        name: name,
        head: head.create(),
        body: body.create()
    }
}

// require('/hello/lib/cat/main')
// main.js如果命名成 index.js 则可以省略文件名