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

arr.filter(function(i) {
	return  i%3 = 0;
});

//every some  返回some
arr.every(function() {

});

//reduce  reduceRight

//indexOf lastIndexOf  和string的api逻辑一致
