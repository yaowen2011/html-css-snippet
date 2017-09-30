"use strict"
//invoking functions 四种方式
//as functions 
//as methods
    //和前者的区别 ，在于绑定的this
//as constructors
//通过call apply 设置
//JavaScript syntax does
// not allow you to assign a value to  this 


// the invocation
// context (the  this value) is the global object. In strict mode, however, the invocation
// context is  undefined .

//非严格模式下 函数执行上下文，this 是global对象，严格模式下 this=undefined

// Define and invoke a function to determine if we're in strict mode.
//检测严格模式是否开启的 简单方法
var strict = (function() { return !this; }());
console.log(strict);

//arguments.caller  arguments.callee
var factorial = function(x) {
if (x <= 1) return 1;
return x * arguments.callee(x-1);
};



// Initialize the counter property of the function object.
// Function declarations are hoisted so we really can
// do this assignment before the function declaration.
uniqueInteger.counter = 0;
// This function returns a different integer each time it is called.
// It uses a property of itself to remember the next value to be returned.
function uniqueInteger() {
	return uniqueInteger.counter++; // Increment and return counter property
}
console.log(uniqueInteger());
console.log(uniqueInteger());
console.log(uniqueInteger());

//匿名函数  命名函数  前者调试不会出现在调用栈中