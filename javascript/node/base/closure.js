//存疑 node的setTimeOut 绑在哪个对象上


//<javascript the definitive guide>page 55行
// When that function is invoked, it creates a new object to store its local variables, and
// adds that new object to the stored scope chain to create a new, longer, chain that
// represents the scope for that function invocation. This becomes more interesting for
// nested functions because each time the outer function is called, the inner function is
// defined again. Since the scope chain differs on each invocation of the outer function,
// the inner function will be subtly different each time it is defined—the code of the inner
// function will be identical on each invocation of the outer function, but the scope chain
// associated with that code will be different.

// closure 优点  实用的场景
//函数以及函数可以访问的变量的总和  
//感觉很像是 面向对象的私有变量，通过方法可以控制

//这种变量除了普通值类型  函数  对象等都是可以通过闭包，保护起来的；
//通过lexical scope  作用域链，来理解。
//from master javascript
        // closures and looping
       // for (var i=1; i<=5; i++) {
       //      setTimeout( function delay(){
       //         console.log( i );
       //      }, i*100);
       // }

       //以上等价于
       // for (var i=1; i<=5; i++) {
       // 		var func = function() {
       // 			console.log(i);
       // 		};
       // 		setTimeOut(func, i+100);
       // }

       //  //打印都是5 是多个引用  但是这个地方 i 是引用了  最后i的改变影响到了所有闭包中的i的值
       // for (var i=1; i<=5; i++) {
       //     (function(j){
       //         setTimeout( function delay(){
       //             console.log( j );
       //         }, j*100);
       //     })( i );
       // }


// Return an array of functions that return the values 0-9
function constfuncs() {
      var funcs = [];
      for(var i = 0; i < 10; i++)
            funcs[i] = function() { return i; };
      return funcs;
}
var funcs = constfuncs();
console.log(funcs[5]()); // What does this return?

// Nested functions do not make private copies
// of the scope or make static snapshots of the variable bindings.

//this是关键字,不是变量  闭包也不能直接访问


// Remember the fundamental rule of lexical scoping: JavaScript functions are executed
// using the scope chain that was in effect when they were defined. 


// Closures are easy to understand if you simply accept the lexical scoping rule: functions
// are executed using the scope chain that was in effect when they were defined. 

// page.182
// But if the function defines a nested
// function and returns it or stores it into a property somewhere, then there will be an
// external reference to the nested function. It won’t be garbage collected, and the variable
// binding object it refers to won’t be garbage collected either.

var uniqueInteger = (function() { // Define and invoke
      var counter = 0; // Private state of function below
      return function() { return counter++; };
}());

uniqueInteger();
uniqueInteger();
console.log(uniqueInteger());