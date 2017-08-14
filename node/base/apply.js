var arr = [1,2,3,4];
// var sum = add.apply(Math, arr);
// console.log(sum);

// console.log(Math.sum(1,2));

console.log();

// from master-javascript
// arguments 参数不是一个标准的数组，需要通过slice来转换
var sum = function () {
    var args = Array.prototype.slice.call(arguments);//转换成标准数组
    var i, total = 0;
    for (i = 0; i < arguments.length; i += 1) {
        total += arguments[i];
    }
    return total;
};
console.log(sum(1,2,3,4,5,6,7,8,9)); // prints 45
console.log(sum(1,2,3,4,5)); // prints 15

