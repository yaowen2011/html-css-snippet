var events = require("events");
var emitter = new events.EventEmitter();
emitter.on("newListener", function(date) {
    console.log(date.getTime());
});
emitter.emit("newListener", new Date());
//emitter.on("foo", function() {});