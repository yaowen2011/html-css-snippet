
//The  instanceof operator does not actually check whether  r was initialized by the
// Range constructor. It checks whether it inherits from  Range.prototype . 

// Define the ES5 String.trim() method if one does not already exist.
// This method returns a string with whitespace removed from the start and end.
String.prototype.trim = String.prototype.trim || function() {
	if (!this) return this; // Don't alter the empty string
	return this.replace(/^\s+|\s+$/g, ""); // Regular expression magic
};

// Return a function's name. If it has a (nonstandard) name property, use it.
// Otherwise, convert the function to a string and extract the name from that.
// Returns an empty string for unnamed functions like itself.
Function.prototype.getName = function() {
	return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};


// var test = function() {
// 	return 123;
// }
// console.log(test.toString());

console.log(typeof null);
console.log(typeof undefined);
//如果对象自身和它的原型，都定义了一个同名属性, 那么优先读取对象自身的属性，这叫做“覆盖”（overriding）
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.prototype.constructor);
//constructor 是prototype的一个默认属性

function P() {}
//var P = 1; 注意哦 定义的变量名不要和函数名 重复了
console.log("0----------------");
console.log(P.constructor === P);//  false
console.log(P.prototype.constructor === P);
var p = new P();
console.log(p.prototype);//undefined
console.log(p.constructor.toString());
console.log(p.constructor === P);
console.log(p.constructor.prototype.constructor);

console.log("1-------------------");
var a = new Array();
console.log(a.prototype);	//undefined
console.log(a.constructor);	//Function: array
//console.log(typeof a);
//console.log(a instanceof Array);

//由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承。

function X() {};
var x = new X();
var y = new x.constructor();//=new X();
console.log(y instanceof X);

//v instanceof Vehicle
//// 等同于
//Vehicle.prototype.isPrototypeOf(v)

//JavaScript 之中，只要是对象，就有对应的构造函数。
//instanceof运算符只能用于对象，不适用原始类型的值。
function F(){};
var f = new F();
console.log(Object.getPrototypeOf(f) === F.prototype);

// getPrototypeOf(f); 获取对象原型
// setPrototypeOf();  设置对象原型

//因此，获取实例对象obj的原型对象，有三种方法。:

//1、obj.__proto__;
//2、obj.constructor.prototype;
//3、Object.getPrototypeOf(obj);

var o1 = {};
var o2 = Object.create(o1);
var o3 = Object.create(o2);

//var o = new o3();
console.log(o3.constructor.prototype.constructor);

function Animal(name) {
	this.name = name;
}
Animal.prototype.color = "yellow";
Animal.prototype.move = function() {
	console.log("move function awake>>>");
};

var a = new Animal();
var a2 = new Animal();
//a.prototype.move();
console.log(a.prototype);	//undefined
console.log(a.__proto__=== Animal.prototype);
console.log("++++++++++++");
a.move();
a.prototype = {};
a.prototype.show = function() {
	console.log("show is invoked....");
};

//var c = new a();   //a is not a constructor
//c.show();

console.log(a.toString());
console.log(JSON.stringify(a));
console.log("^^^^^^^^^^^^^^^^^^");
for (item in a) {
	console.log(item);
}

//原型方法 中可以使用this吗
//答：可以js中 this 运行时确定
// x is a method assigned to the object using "this"
//https://stackoverflow.com/questions/310870/use-of-prototype-vs-this-in-javascript
var A = function () {
	this.x = function () { console.log('A'); };
};
A.prototype.updateX = function( value ) {
	this.x = function() { console.log( value ); }
};

var a1 = new A();
var a2 = new A();
a1.x();  // Displays 'A'
a2.x();  // Also displays 'A'
a1.updateX('Z');
a1.x();  // Displays 'Z'
a2.x();  // Still displays 'A'

// Here x is a method assigned to the object using "prototype"
var B = function () { };
B.prototype.x = function () { console.log('B'); };

B.prototype.updateX = function( value ) {
	B.prototype.x = function() { console.log( value ); }
}

var b1 = new B();
var b2 = new B();
b1.x();  // Displays 'B'
b2.x();  // Also displays 'B'
b1.updateX('Y');
b1.x();  // Displays 'Y'
b2.x();  // Also displays 'Y' because by using prototype we have changed it for all instances

var ABC = function(){};
var a = new ABC();
console.log("line120---------------------------");
console.log(a.__proto__);
console.log(Object.getPrototypeOf(a));
console.log(ABC.__proto__ === Function.prototype);
console.log(ABC.__proto__.__proto__.__proto__ === Object.prototype.__proto__);
console.log(Function.prototype.__proto__);
console.log("line156-------------------------");
console.log(a.__proto__ === ABC.prototype);
console.log(a.__proto__ === null);
console.log(Object.__proto__ === null);
console.log("line151----------------------");

var b = {};
console.log(b.__proto__ === Object.prototype);
console.log("line161---------------------");
//-------------存疑

//JavaScript使用静态变量作用域链
//但是在ECMAScript中，只采用了静态作用域。

//几个函数可能含有相同的父级作用域 ,在这种情况下，在[[Scope]]中存在的变量是会共享的。一个闭包中变量的变化，也会影响另一个闭包的。

//这就是说：所有的内部函数都共享同一个父作用域  __parent__


var data = [];

for (var k = 0; k < 3; k++) {
	data[k] = function () {
		console.log(k);
	};
}

k=5;

data[0](); // 3, but not 0
data[1](); // 3, but not 1
data[2](); // 3, but not 2


//__proto__
var a = {
	x : 10,
	calc : function(z) {
		return this.x + this.y + z;
	}
};

var b = {
	y : 20,
	__proto__ : a
};

var c = {
	y : 30,
	__proto__ : a
}

console.log(b.calc(0));
console.log(c.calc(10), '如果一直找不到calc就会返回undefined');

//调用构造函数做了两件事情:
// 1、创建一个对象
// 2、自动为新建的对象，设置原型对象__proto__ （原型对象存放于 ConstructorFunction.prototype 属性中）


//"Foo.prototype"自动创建了一个特殊的属性"constructor"

//上下文
//进行中的上下文[running/active execution context](栈顶就是出于激活状态的上下文)

//上下文中3个关键属性
	// 1、变量对象(variable object)， 注意：函数表达式是不挂在vo里的
	// 2、this指针(this value)，
	// 3、作用域链(scope chain)

//当函数被调用者激活，这个特殊的活动对象(activation object) 就被创建了

//作用域链的原理和原型链很类似，如果这个变量在自己的作用域中没有，那么它会寻找父级的，直到最顶层。
// 先去__proto__ 再去 __parent__

//请注意，最主要的事情是——函数在被创建时保存外部作用域，
// 是因为这个 被保存的作用域链(saved scope chain) 将会在未来的函数调用中用于变量查找。


// 全局变量 "x"
//var x = 10;

// 全局function
function foo() {
	console.log(x, '作用域链是在函数定义的地方就确定了的，函数执行时还是去找之前定义的地方的那块作用域链');
}

(function (funArg) {

	// 局部变量 "x"
	var x = 20;

	// 这不会有歧义
	// 因为我们使用"foo"函数的[[Scope]]里保存的全局变量"x",
	// 并不是caller作用域的"x"

	funArg(); // 10, 而不是20

})(foo); // 将foo作为一个"funarg"传递下去

//闭包是一系列代码块（在ECMAScript中是函数），并且静态保存所有父级的作用域。通过这些保存的作用域来搜寻到函数中的自由变量。
//非常常见的现象

//几个函数可能含有相同的父级作用域
//在这种情况下，在[[Scope]]中存在的变量是会共享的。一个闭包中变量的变化，也会影响另一个闭包的。

// 全局变量 "x"
//var x = 10;

// 全局function
function foo() {
	console.log(x, '如果这个地方没有设置');
}

(function (funArg) {

	// 局部变量 "x"
	var x = 20;

	// 这不会有歧义
	// 因为我们使用"foo"函数的[[Scope]]里保存的全局变量"x",
	// 并不是caller作用域的"x"

	funArg(); // 10, 而不是20

})(foo); // 将foo作为一个"funarg"传递下去

//this的值只取决中进入上下文时的情况。
//this会由每一次caller提供




