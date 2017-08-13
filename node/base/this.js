//参考页面 http://javascript.ruanyifeng.com/oop/this.html

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


