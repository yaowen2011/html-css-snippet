/**
 * Created by Administrator on 2017/8/6.
 */
var http = require('http');
//var static = require('node-static');
//var file = new static.Server();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!\n');
    //file.serve(req, res);
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
