// //do it by order
// var async = require("async");

// async.series([
//     function(callback){
//         setTimeout(function(){
//             console.log("Task 2");
//             callback(null, 1);
//             //console.log(callback.toString());
//             //callback(new Error("async series demo Problem in task 1"), 1);
//         }, 300);
//     },function(callback){
//         setTimeout(function(){
//             console.log("Task 2");
//             //console.log(callback.toString());
//             callback(null, 2);
//         }, 200);
//     },function(callback){
//         setTimeout(function(){
//             console.log("Task 2");
//             //console.log(callback.toString());
//             callback(null, 3);
//         }, 200);
//     }
// ],function(error,results){
//     if (error) {
//         console.log(error.toString());
//     } else {
//         console.log(results);
//     }
// });

// //task 1  task 2 task 3 [1,2,3]

// async.parallel({
//     one:function(callback){
//         setTimeout(function(){
//             console.log("async- parallel demo task 1 ");//it's fake  parallel
//             callback(null, 1);
//         }, 300);
//     },
//     two:function(callback){
//         setTimeout(function(){
//             console.log("async- parallel demo task 2");//it's fake  parallel
//             callback(null, 12);
//         }, 200);
//     },
//     three:function(callback){
//         setTimeout(function(){
//             console.log("async- parallel demo task 3 ");//it's fake  parallel
//             callback(null, 3);
//         }, 100);
//     }
    
// }, function(error, results){
    
//     console.log(results);
// });

//async.parallelLimit

//models

var async = require("async");
async.waterfall([
    function(callback) {
        callback(null, Math.random(), Math.random());
    },
    function(a, b, callback) {
        callback(null, a * a + b * b);
    },
    function(cc, callback) {
        callback(null, Math.sqrt(cc));
    }
    ], function(error, c) {
    console.log(c);
 });
 console.log(async.waterfall);
 
 //ayync.queue
 //queue.push
 //queu.saturated = function(){};
 //queue.drain = function(){};
 //queue.empty = function(){};
 
 //async.whilst
 //async.doWhilst(body, test, callback);
 //async.until();
 //async.doUnitil();
 //https://github.com/caolan/async