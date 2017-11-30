var events = require('events');
var util = require('util');

function Pulser() {
    events.EventEmitter.call(this);
}

util.inherits(Pulser, events.EventEmitter);

Pulser.prototype.start = function () {
    setInterval(()=>{
        util.log(">>>>pulse");
        this.emit('pulse');
        util.log('<<<<pulse');
    }, 1000)
}

//exports.Pulser = Pulser;

var pulser = new Pulser();
pulser.on('pulse', function () {
    util.log('pulse received.......');
})

//开始隔开1秒触发1次事件
pulser.start();