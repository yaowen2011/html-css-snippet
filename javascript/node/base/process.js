//process 存疑 查资料深入理解
//process定义
console.log(process.version);
console.log(process.argv);
console.log(process.pid);

console.log(100/0);

// throw Error('没有被处理的异常');

process.on("exit", function(){
	console.log("Goodbye 进程id=" + process.pid + "被释放");
});

process.on("uncaughtException", function(e) {
	console.log(Exception, e);
});

process.on("SIGINT", function() {
	console.log("Ignored Ctrl-C");
});