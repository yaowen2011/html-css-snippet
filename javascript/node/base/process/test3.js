process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
});
console.log("进程id  "+process.pid);

console.log('process title==>  ' + process.title);
console.log('process.platform==>  ' + process.platform);
console.log('process.env==>' , process.env);
console.log('process.env.npm_lifecycle_event==>', process.env.npm_lifecycle_event);