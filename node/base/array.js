//javascript中没有数组类型。通过javascript中的Array对象来支持数组.
var arr = [1,2,3];
delete arr[1];

console.log(1 in arr);
console.log(arr.length);	//对长度没有影响

console.log("遍历数组================");
//iterating array 
for (var i=0; i<arr.length; i++) {
	console.log(arr[i]);
}

console.log("稍稍优化的遍历===========");
for (var i=0, j=arr.length; i<j; i++) {
	if (! arr[i]) continue;
	console.log(arr[i]);
}
//for in  结构不保证遍历的顺序
// for (var k in arr) {
// 	if (arr.hasOwnProperty(k)) {

// 	}
// 	console.log(arr);
// }

console.log("ES5规范中的forEach=========");
var sumOfSquares = 0;
arr.forEach(
	function(x) {
		sumOfSquares += x*x;
	}
);
console.log(sumOfSquares);

// arr.forEach(
// 	function (item) {
//       console.log(that.v+' '+item);
//     }
// );

var arr = [1,2,4,5,6,3];
console.log("JS中array常用的api============");
console.log("join方法==========");
console.log(arr.join('---'));

console.log(arr.reverse().join());//join 默认逗号

//sort
console.log("==================");
console.log(arr.sort().join());

arr.sort(function(a,b){
	return a-b;
});

console.log(arr);

arr.sort(function(a,b){
	return b-a;
});
console.log(arr);

console.log("concat===========");
console.log("concat会返回新的数组===========");
var newarr = arr.concat(7,8).concat([9,10]);
console.log(newarr);

console.log("slice=============");
console.log("slice选取部分数组区间=============");

arr.slice(0,3);//后面代表选取几个元素

console.log("splice=============");
console.log("splice 可以insert 以及 删除 或者同时这两种操作");

//push pop
//unshift shift

//toString  toLocalString

//
arr.map(function(x){
	return x*x;
});

arr.filter(function(x) {
	return x<3;
});

// arr.filter(function(i) {
// 	return  i%3 = 0;
// });

//every some  返回some
arr.every(function() {

});

//reduce  reduceRight

//indexOf lastIndexOf  和string的api逻辑一致


//扁平化 二位数组  concat() apply()
var fruitArr = [];
fruitArr[0] = ["水果1", "水果2"];
fruitArr[1] = ["水果3", "水果4"];
fruitArr[2] = ["水果5", "水果6"];
fruitArr[3] = ["水果7", "水果8"];
fruitArr[4] = ["水果9", "水果10"];

//利用 apply的这种 可以传递数组参数的特性
//普通情况可以写成furitArr[0].concat(fruitArr[1], fruitArr[2], fruitArr[3], fruitArr[4],);
var newarr = [].concat.apply([], fruitArr);
console.log(newarr);

//splice  参数1：删除起始的index 参数2： 删除的个数 参数3: 替换被删除的元素

//slice  浅拷贝 如果数组元素是对象类型， 两个数组指向的是同一个对象

//类数组对象 使用 数组对象的方法

//var cells = document.querySelectorAll("td+td");
//[].foreach.call(cells, function(val, idx, arr){});

//foreach map区别
//foreach 修改原数组  handle函数没有返回值
//map 生成新数组  handle函数有返回值

//Object.keys()

//如何深拷贝???
