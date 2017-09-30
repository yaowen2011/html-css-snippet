//存疑
var i = 1;
var s = "1";
var b = true;
var a = [1,2,3];
var n = null;
var func = function() {
	return 1;
};

var obj = {
	p1:1,

};



console.log(typeof i);
console.log(typeof s);
console.log(typeof b);
console.log(typeof a);
console.log(typeof func);
console.log(typeof n);
console.log(typeof obj);
//可见  当变量类型为 null  array obj时，typeof能给到的检测结果都是object
//如果需要跟精确的判定 则可以通过instanceof
console.log("===================");
console.log(a instanceof Array);
console.log(n instanceof Object);
console.log(obj instanceof Object);
