# 参考
- Reactive programming with RxJS.pdf
- [RxJS在angular中](https://www.jianshu.com/p/727c9f302805)
- [RxJS6之前后API大改动](https://www.cnblogs.com/timetimetime/p/9139926.html)
# 常用API分类
  - 创建数据流：
    - 单值：of, empty, never
    - 多值：from
    - 定时：interval, timer
    - 从事件创建：fromEvent
    - 从Promise创建：fromPromise
    - 自定义创建：create
  - 转换操作：
    - 改变数据形态：map, mapTo, pluck
    - 过滤一些值：filter, skip, first, last, take
    - 时间轴上的操作：delay, timeout, throttle, debounce, audit,  bufferTime
    - 累加：reduce, scan
    - 异常处理：throw, catch, retry, finally
    - 条件执行：takeUntil, delayWhen, retryWhen, subscribeOn,  ObserveOn
    - 转接：switch
  - 组合数据流：
    - concat，保持原来的序列顺序连接两个数据流
    - merge，合并序列
    - race，预设条件为其中一个数据流完成
    - forkJoin，预设条件为所有数据流都完成
    - zip，取各来源数据流最后一个值合并为对象
    - combineLatest，取各来源数据流最后一个值合并为数组,某个流生成数据，combineLatest就会生成数据
    - 另，最好使用 $ 结尾的命名方式来表示Observable，例：input$。

# rxjs的订阅模式，和传统观察者模式区别
- 拉取和推送是两种不同的协议，用来描述数据生产者 (Producer)如何与数据消费者 (Consumer)如何进行通信的。
  - 什么是拉取？ - 在拉取体系中，由消费者来决定何时从生产者那接收数据。生产者本身不知道数据是何时交付到消费者手中的。
  - 什么是推送？ - 在推送体系中，由生产者来决定何时把数据发送给消费者。消费者本身不知道何时会接收到数据。
  - RxJS中不订阅Observable，是不会被执行的 
  - Observable 的核心关注点：
    - 创建 Observables
    - 订阅 Observables
    - 执行 Observables
    - 清理 Observables
# 使用rxjs 封装一个xmlHttpRequest
```javascript
function get(url) {
  return Rx.Observable.create(function(observer) {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    // 先注册监听事件
    req.onload = function() {
      if (req.status == 200) {
        // Yield the result to listeners and complete the sequence
        observer.onNext(req.response)
        observer.onCompleted()
      } else {
        observer.onError(new Error(req.statusTex))
      }
    }

    req.onerror = function() {
      observer.onEror(new Error("Unknown Error"))
    }

    req.send();
  })
}

var test = get('/api/test.json');
test.subscribe(
  function onNext(x) { console.log('Result: ' + x) },
  function onError(err) { console.log('Error: ' + err) },
  function onCompleted() { console.log('Completed')},
)
```

# RxJS 提供的内置的异步请求api
```javascript
Rx.DOM.get('/api/test.json').subscribe(
  function onNext(data) { console.log(data.response) },
  function onError(err) { console.log(err) }
)
```

# RxJS Creating Observables from Arrays
- .from()  .fromEvent()
```javascript
Rx.Observable
  .from(['Jack', 'Tom', 'jerry'])
  .subscribe(
    function(x) { console.log('Next: ' + x) },
    function(err) { console.log('Error: ', err) },
    function() { console.log('Completed') }
  )

var src = Rx.Observable.range(1, 5);
var even = src.filter(val => {val%2 !== 0});
// filter  map这类返回的还是 Observable
even.subscribe(logValue)
```

# fromEvent()
```javascript
var allMoves = Rx.Observable.fromEvent(document, 'mousemove')
allMoves.subscribe(function(e) {
  console.log(e.clientX, e.clientY)
})
```
# 从回调函数，比如IO函数，创建Observable
```javascript
var Rx = require('rx')
var fs = require('fs')

var readdir = Rx.Observable.fromNodeCallback(fs.readdir);
var source = readdir('/use/www')

var subscription = source.subscribe(
  function(res) { console.log('List of directories: ' + res) },
  function(err) { console.log(err) },
  function() { console.log('done') }
)
```

# transform 有点像sql中的where子句
```javascript
// 在屏幕右侧的临时表
var movesOnTheRight = allMoves.filter(function(e) {
  return e.clientX > window.innerWidth /2;
})
// 在屏幕左侧的临时表
var movesOnTheLeft = allMoves.filter(function(e) {
  return e.clientX < window.innerWidth /2;
})

// 对表进行订阅
movesOnTheRight.subscribe(function(e) {
  console.log('鼠标在屏幕右侧滑过：', e.clientX)
})

movesOnTheLeft.subscribe(function(e) {
  console.log('鼠标在屏幕左侧划过：', e.clientX)
})
```

# the merged sequence 
- If elements of different Observables are emitted at the same time,
- the order of these elements in the merged sequence is **random**.
```javascript
var a = Rx.Observable.interval(200).map(function(i) {
  return 'A' + i;
})
var b = Rx.Observable.interval(100).map(function(i) {
  return 'B' + i;
})

// 相当于 将几张表 合并到一张表
Rx.Observable.merge(a, b).subscribe(function(x) {
  console.log(x)
})
```  

# Basic Sequence Operators
- .map() .filter() .distinct() .reduce() .scan() .flatMap() 这些操作符返回的都是Observable 可以说是返回结果集合的表
```javascript
var src = Rx.Observable.range(1, 5);
var sum = src.reduce(function(acc, x) {
  return acc + x
})
// 经过reduce的处理，多条记录变成了一条记录
sum.subscribe(function(val) {
  console.log(val)
})

// demo 计算一个表的某个字段的，平均数
var avg = Rx.Observable.range(0, 5)
  .reduce(function(prev, cur) {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    }
  }, {sum: 0, count: 0})  // 初始化的对象
                          // 写RxJS一定要搞清楚，参数肯定是 个对象或值类型，进来多少条记录 出来有几条记录 做到很清楚
  .map(function(o) {
    return o.sum / o.count;
  });

// demo .scan() 在弹珠图上是1:1生成的  emits each intermediate result
var avg = Rx.Observable.interval(1000)
  .scan(function (prev, cur) {
    return {
      sum: prev.sum +cur,
      count: prev.count + 1
    }
  }, { sum: 0, count: 0})
  .map(function(o) {
    return o.sum / o.count;
  });
var subscription = avg.subscribe( function(x) {
  console.log(x)
} )
```
# 取消一个Observable : implicitly and explicitly
- 订阅一个Observable，返回一个Disposable 对象
- 显式取消: 调用 Disposable对象的 dispose() 方法
``````javascript
// 注意Observable 自身不能取消
var counter = Rx.Observable.interval(1000);

var subscription1 = counter.subscribe(function(i) {
  console.log('Subscription 1:', i)
})

var subscription2 = counter.subscribe(function(i) {
  console.log('Subscription 2:', i)
})

setTimeout(function() {
  console.log('canceling subscription2!')
  subscription2.dispose(); // 取消订阅，停止输出
}, 2000)
``````
- 隐式取消：such as range()  take() withLatestFrom()  flatMapLatest()

# the Observable will stop emitting when canceled, but the underlying promise will not be canceled
``````javascript
var p = new Promise(function(resolve, reject) {
  window.setTimeout(resolve, 5000)
})
p.then(function() {
  // 这个Observable 是对promise的包装，
  console.log('Potential side effect !')
})

var subscription = Rx.Observabl.fromPromise(p).subscribe(function(msg) {
  console.log('接受到的值', msg)
})
subscription.dispose();
// < Potential side effect ! 这种就是ExJS比较难找的BUG 

// try catch 也是用不了的，因为是异步的
function getJSON(arr) {
  return Rx.Observable.from(arr).map(function(str) {
    var parsedJSON = JSON.parse(str)
    return parsedJSON
  })
}
// 使用catch  即使出现异常，后面还可以走下去
var caught = getJSON(['{"name": 1, "value: 2}', '{"name": 44}']).catch(
  Rx.Observable.return({
    error: "解析JSON出错"
  })
)

// 有了catch onError方法不会被触发
caught.subscribe(
  function(json) {
    console.log('Parsed JSON:', json)
  },
  function(err) {
    console.log('err', err.message)
  }
)

// Retrying Sequences
// 注意 synchronous Observables 简单来说retry必须要传递参数，并且只用于异步
// retry 会重新来一遍
Rx.DOM.get('/api/products').retry(5)
  .subscribe(
    function(xhr) { console.log(xhr) },
    function(err) { console.error('Err', err) }
  )

// .scan()
//  when we need to keep track of previous states of the game
``````

## 性能问题
- 数组的方法一般会返回一个新方法；
- Obsesrvable pipelines， The Observable is thus traversed only once;

## Subject Class 同时实现了Observer and Observable types
- 可以同时订阅，并生成数据
``````javascript
var subject = new Rx.Subject();
var source = Rx.Observable.interval(300)
  .map(v => 'Interval message #' + v)
  .take(5)
// 这个地方 subject 当作Observer
source.subscribe(subject)

// 这个地方 当作 Observable
var subscription = subject.subscribe(
  function onNext(x) { console.log(x) },
  function onError(e) { console.log(e.message) },
  function onCompleted() { console.log('onCompleted') }
)
// make a proxy object between a data source and the Subject's listeners
// 这样也可以适当的解耦
// 手动生成数据
subject.onNext('Our message #1')
subject.onNext('Our message #2')

setTimeout(function() {
  subject.onCompleted()
}, 1000)
``````