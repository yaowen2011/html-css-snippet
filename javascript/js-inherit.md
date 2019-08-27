## https://juejin.im/post/5bcb2e295188255c55472db0
```js
// 方法一：
function SuperType(){
  this.colors = ["red", "blue", "green"];
}
function SubType(){}

SubType.prototype = new SuperType();

var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"

var instance2 = new SubType(); 
alert(instance2.colors); //"red,blue,green,black"
// 原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。

// 方法二：
// 借用构造函数继承
function  SuperType(){
    this.color=["red","green","blue"];
}
function  SubType(){
    //继承自SuperType
    SuperType.call(this);
}
var instance1 = new SubType();
instance1.color.push("black");
console.log(instance1.color);//"red,green,blue,black"

var instance2 = new SubType();
console.log(instance2.color);//"red,green,blue"
// 
```