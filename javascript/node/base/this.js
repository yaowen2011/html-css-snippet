//参考页面 http://javascript.ruanyifeng.com/oop/this.html

//《JavaScript  definitive guide》 page.169
// 第8章节函数 需要反复研读
//Unlike variables, the  this keyword does not have a scope, and nested functions do not
// inherit the  this value of the containing.

// this 不是一个变量或者属性， this也没有作用域的概念, 所以 nested function 如果想要使用
// this的话，他的外围函数可以吧this赋值个一个变量 然后内部的嵌套的函数可以使用 

// Constructor
// invocations differ from regular function and method invocations in their handling of
// arguments, invocation context, and return value.

//this 陷阱1
var obj = {
    foo : function() {
        console.log(this.toString());
    }
}

obj.foo();

(obj.foo = obj.foo)();
//等同于
(obj.foo = function(){
    console.log(this.toString());
})();
//等同于
(function() {
    console.log(this.toString());
})();

//this 陷阱2
//如果某个方法位于多层对象的内部，这时this只是指向当前一层的对象，而不会继承更上面的层。
var a = {
    p:100,
    m1:{
        m1_1:function() {
            console.log(this.p);
        }
    }
};

a.m1.m1_1();//undefined

//this 陷阱3
    //避免数组处理方法中this
    //避免回调中的this




