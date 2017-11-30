//EventEmitter是node.js中核心对象
require("events").EventEmitter;

//核心两个方法 触发事件
//emitter.emit(event, [arg1], [arg2], [...])#
//emitter.on(eventName, callback)

//默认同一事件  允许10个 listener
