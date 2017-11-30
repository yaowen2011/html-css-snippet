var util = require('util');
var url = require('url');

exports.sniffOn = function (httpServer) {
    httpServer.on('request', (req, res) => {
        util.log('e_request');
        util.log(reqToString(req));
    })

    httpServer.on('close', errno => {
        util.log('e_close errno=' + errno);
    })

    httpServer.on('checkContinue', (req, res) => {
        util.log('e_checkContinue');
        util.log(reqToString(req));
        res.writeContinue();
    })

    httpServer.on('upgrade', function (req, socket, head) {
        util.log('e_upgrade');
        util.log(reqToString(req));
    })

    httpServer.on('clientError', ()=>{
        util.log('e_clientError');
    })
}

var reqToString = exports.reqToString = function(req) {
    var ret=`req ${req.method} ${req.httpVersion} ${req.url}` +'\n';
    ret += JSON.stringify(url.parse(req.url, true)) +'\n';
    var keys = Object.keys(req.headers);
    for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        ret += `${i} ${key}: ${req.headers[key]}` +'\n';
    }
    if (req.trailers)ret += req.trailers +'\n';
        return ret;
};
