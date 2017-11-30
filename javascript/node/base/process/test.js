//是个全局对象， It is an instance of EventEmitter
process.on('exit', function () {
    process.nextTick(function () {
        console.log('这段代码不会被运行');
    })
    console.log('进程退出');
})