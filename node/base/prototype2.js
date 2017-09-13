// 全局变量 "x"
var x = 10;

// 全局function
function foo() {
    console.log(x);
}

(function (funArg) {

    // 局部变量 "x"
    var x = 20;

    // 这不会有歧义
    // 因为我们使用"foo"函数的[[Scope]]里保存的全局变量"x",
    // 并不是caller作用域的"x"

    funArg(); // 10, 而不是20

})(foo); // 将foo作为一个"funarg"传递下去
