
## js部分
- 每秒输出一个值，输出1-100
``````javascript
for (var i = 1; i<= 100; ++i) {
  (function(i) {
    setTimeout(function() {
      console.log(i)
    }, 1000*i)
  })(i)
}
``````
- promise 函数

- promise中某个请求报异常，后续请求被reject
  - [参考](https://stackoverflow.com/questions/33445415/javascript-promises-reject-vs-throw)
  - 在每个then().catch().then().catch()
- 处理过的移动端兼容性
  ``````javascript
  //ios长时间按住页面出现闪退
    element {
      -webkit-touch-callout:none;
    }
    //ios输入框默认内阴影
    Element{
      -webkit-appearance:none;
    }
    //ios和android下触摸元素时出现半透明灰色遮罩
    Element {
      -webkit-tap-highlight-color:rgba(255,255,255,0)
    }
    // 滑动穿透
  ``````  

- 移动端300ms，fastclick解决的原理？
  - 1/3秒，这个设计的目的主要是为了移动的double click，
  - 导致的问题，比原生应用反应慢；
  - 方法一：设置meta标签，但是兼容性不好
  - 方法二：touchend 
  - 实现一个标准的tap方法 判断手指数 判断touchstart touchend的时间差小于150ms https://www.imooc.com/article/269702
- es6一句话去重
  - let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
- es6新增的几个数组方法
  - Array.prototype.includes()
  - Array.prototype.filter()
  - Array.prototype.findIndex()
  - Array.prototype.flat()
  - Array.prototype.reduce()
  - Array.prototype.splice() 

- 实现打乱数组顺序功能
``````javascript
//Method 1:  Fisher–Yates shuffle 洗牌算法
Array.prototype.shuffle = function() {
  let array = this;
  let m = array.length,
  idx,temp;
  while(m) {
    idx = Math.floor(Math.random() * m--)
    temp = array[m]
    array[m] = array[idx]
    array[idx] = temp
  }
  return array
}
// Method 2 
[1,2,3,4].sort(function() {
  return .5 - Math.random()
})
``````

- 如何将伪数组装换成标准数组
  - 不转换的情况可以是,Array.prototype.array_method_name.call(array_like_obj, args)
  - Array.prototype.slice.call(array_like_object)
  - slice方法会返回一个新数组
- webpack如何实现按需加载
  - 简单来说： By wrapping the **import** function into an arrow function,
  - https://webpack.js.org/guides/lazy-loading/
  - todo浏览器的 benchwork的方式

## 正则
```js
// 前瞻：
exp1(?=exp2) 查找exp2前面的exp1
// 后顾：
(?<=exp2)exp1 查找exp2后面的exp1
// 负前瞻：
exp1(?!exp2) 查找后面不是exp2的exp1
// 负后顾：
(?<!exp2)exp1 查找前面不是exp2的exp1
```

- "中国人".replace(/(?<=中国)人/, "rr") // 匹配中国人中的人，将其替换为rr，结果为 中国rr
- "法国人".replace(/(?<=中国)人/, "rr") // 结果为 法国人，因为人前面不是中国，所以无法匹配到
- 一个函数，用于给金额数添加千分位符？
  - (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
- 邮箱正则
  -   
- 谈谈js脚本攻击？
  - xss（css） CSRF 可以基于css的一些东西，伪造用户的请求
  - 发送cookie改成做其他事情，都是在伪造用户请求
- 闭包的运用

``````javascript
//- bubble sort
function bubbleSort(arr) {
  for (var i = 0; i < arr.length; ++i) {
    // move the minimun value to the right at first time
    for (var j = 0; j < arr.length - i; ++j) {// means the lefted unsorted elements
      if (arr[j] < arr[j+1]) { // the swap element only happened in the inner 
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
  return arr
}
bubbleSort([1,2,4,5,12])
// quick sort
function quickSort(arr, length = arr.length - 1, start = 0) {
  // 递归出口
  if (arr.length <= 1) {
    return arr
  }
  let pivot = arr[arr.length - 1]
  let left = []
  let right = []
  while (start < length) {
    if (arr[start] < pivot) left.push(arr[start])
    else right.push(arr[start])
    start++
  }

  return [...quickSort(left), pivot, ...quickSort(right)]
}
quickSort([4,1,2,44,2,44,100,0])
``````

- http状态码 100~500
  - 303 304
  - array(301, 'Moved Permanently'),
    array(302, 'Found'),
    array(303, 'See Other'),
    array(304, 'Not Modified'),
    array(305, 'Use Proxy'),
    array(306, 'Switch Proxy'),
    array(307, 'Temporary Redirect'),

- 前端性能优化
  - 懒加载 按需加载
- call apply的妙用

- 字符串的截取方法 substring() substr() slice()

- 说出三种减少页面加载时间的方法
  - Optimize Images
    - Scale your images before you upload them to your site;
    - The second way to optimize your imgages is to compress them;
    - 简单来说一定要加上限制，因为服务器的硬盘容量，处理器能力都是由上限的
  - 按需加载 defer async   of webpack
  - 启用缓存
``````javascript
//- 写个function，清除字符串前后的空格？
function trimSpace(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '')
} 
``````
- defer 和 async 区别
  - To explain is a lot easier, defer is the equivalent of jQuery.ready() - it means your script is guaranteed that the DOM is ready and all HTML has been parsed. Async means the file can potential load before the DOM is even parsed, which means you more than likely will not have access to the DOM.
- 正则表达式提取“everything is ok, a nice day, a very NICE day”zhong

- console.log("22"+2-"2") 类似这种的计算的基本逻辑
  - 
- console.log(NaN == undefined)
  - null 和 undefined 只和相互之间相等
- 函数节流 函数去抖动
  - 
- 函数形参和局部变量同名的问题？
[参考](https://www.jianshu.com/p/7d384261ee75)
``````javascript
// 题一：
function foo(a) {
  var a;
  return a;
}
function bar(a) {
  var a = 'bye'
  return a;
}
[foo('hello'), bar('hello')]
// 题二：
var foo = {n : 1};
function fun(foo) {
    var foo;
    console.log(foo.n);
    foo.n = 3;
    foo = {n : 2};
    console.log(foo.n);
};
fun(foo);
console.log(foo.n);

// 题三：
var name = "The Window";
var object = {
　name : "My Object",
　getNameFunc : function(){
　　var that = this;
　　return function(){
　　　return that.name;
　　};
  }
};　　
console.log(object.getNameFunc()()); // My Object
``````

## css部分
- 1、三种方法实现左边固定右边自适应布局
  - 左边浮动固定宽度，右边设置margin-left
  - flex布局
    - 左侧盒子： flex: 0 0 200px,右侧盒子width: 100%;
  - 父容器relative；左边元素absolute定位
- transition animation
  - transition: property duration timing-function delay
  - animation: name duration timing-function delay iteration-count direction fill-mode play-state

- rem布局
- css实现等高布局
  - Or more specifically, how can we make all columns the same height as the tallest column?
  - equal-height-columns
  - 本质上都要和最高的内容对其
  - 分成两块来解决：1：获取最高的内容的高度，使用float；2：背景色对其，可以使用container的渐变背景色实现
  - 背景色也可以用三个父容器来处理；
  - 最简单的方式：
        ``````javascript
        .col-container {
          display: table;
          width: 100%;
        }
        .col {
          display: table-cell;
          padding: 16px;
        }
        ``````  
  - 最经典的方法：
    ``````css
    .col-container {
      overflow: hidden;
    }
    .col {
      width: 33.33%;
      float: left;
      margin-bottom: -9999px;
      padding-bottom: 9999px;
    }
    ``````
    [reference](https://css-tricks.com/fluid-width-equal-height-columns/)
- 实现溢出文本省略号
- 选择器 E+F E~F
  - 同级的节点 + 必须是相邻的节点， ~ 只要是同级的节点就可以