var fs = require("fs");

fs.readFile("常用命令.txt", "utf8", function(error,data){
    if (error) {
        throw error;
    }
    console.log(data);
});

console.log("Reading file...");

//callback hell  注意定义成方法 调用时没有传参

//deal exception synchronous process
 //global event handler for the process’s
//uncaughtException event. 
//async  
//the try ... catch statement is no longer a part of the call stack, and the exception is left uncaught.

// global exception handler, use it only to
//gracefully terminate the program.
process.on("uncaughtException", function(error){
    console.log("The exception was caught!");
});

//deal asynchronous error

var domain = require//create
domain.run(function(){
    //....//
    throw error;
    domain.dispose();
    }
)

domain.on("error", function(error){
    //log1
});

d1.run(function(){
    d2.add//explicitly bind timers to a domain
    
});
d1.on("error", function(){})
d2.on("error", function(){});

domain.bind();
domain.intercept();  // eliminated the if statement used to detect the error argument.