//how to run
//node hello.js
//CommonJS规范。在这个规范下，每个.js文件都是一个模块
'use strict';
//var input;//input === undefined
//var myArray = [];   if(!myArray[0]) myFunction;
//var a; a+2;//evaluates to NAN
const f = 5;//cannot declare a constant with the same name as function or variable
var s = 'Hello';

function greet(name) {
    console.log(s + ', '+ name + '!');
}

function hello(){
    console.log("Hello World~~");
}

function printFloat(){
    console.log(-3.1E+2);
}
//JavaScript automatically converts the string literal to a temporary String object,
// calls the method, then discards the temporary String object. 

function replaceString(){
    var name = "Bob", time ="today";
    console.log(`Hello ${name}, how are you ${time} ?`);
    
    var str = "this string \
is broken \
    across multiple\
    lines.";
    console.log(str);
    var poem = 
"Roses are red,\n\
Violets are blue.\n\
I'm schizophrenic,\n\
And so am I.";
    console.log(poem);
    
    //正则 var re = /ab+c/;
}

function aboutifelse(){
    // false
    // undefined
    // null
    // 0
    // NaN
    // the empty string ("")
    //var b = new Boolean(false);
    //if (b) // this condition evaluates to true
    //if (b == true) // this condition evaluates to false
}

//方法一：
// module.exports = greet;
// module.exports = hello;
// module.exports = printFloat;

//方法二：
module.exports = {
  hello:hello,
  greet:greet,
  printFloat:printFloat,
  replaceString:replaceString
};