function test01() {
  console.log(a)
  var a=123;
  function a() {
    console.log(456)
  }
}

function test() {
  var n = 4399;
  
  function add() {
    n++
    console.log(n)
  }

}


//
function sidEffecting(ary) {
  ary[0] = ary[2]
}
function bar(a, b, c) {
  c = 10;
  sidEffecting(arguments);
  return a + b +c;
}
bar(1,1,1)// 10 + 1 + 10 

// 这个很重要
var arr = new Array(3);
arr[0] = 2;
arr.map(function(element) {
  return '1'
})
console.log(arr.join(','))

// 和参数同名的内部变量
function foo(a) {
  var a;
  return a;
}
function bar(a) {
  var a = 'bye'
  return a;
}
[foo('hello'), bar('hello')]

// 闭包以及自调用
for (var i = 0; i< 100; i++) {
  (function (i) {
    setTimeout(function() {
      console.log(i)
    }, 1000*i)
  })(i)
}
// b成了全局变量
(function() {
  var a = b = 2;
})();
console.log(b)

// 原型链
function f() {}
var a = f.__proto__, b = Object.getPrototypeOf(f)
console.log(a === b) // true