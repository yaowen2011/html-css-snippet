## promise
- https://blog.csdn.net/lq15310444798/article/details/81275278
```js
Promise.resolve('foo');//等价于如下
new Promise((resolve)=>{
    resolve('foo');
})

setTimeout(function(){
    console.log("three");//下一轮事件循环执行
},0);
Promise.resolve().then(function(){
    console.log("two");
});
console.log("one");
//输出是one,two,three不是one,three,two
```
## 封装 async & await 
- https://davidwalsh.name/async-generators

## 封装 promise
- https://www.freecodecamp.org/news/how-to-implement-promises-in-javascript-1ce2680a7f51/ 可以顺便学习下ts
  
```js
// https://segmentfault.com/a/1190000009792439
function MyPromise (fn) {
  this._status = 'pending'
  this._value = undefined
  this._onResolvedCallback = []
  this._onRejectCallback = []
  fn(resolve.bind(this), reject.bind(this))
}
function resolve (value) {
  if (this._status === 'pending') {
    this._status = 'resolved'
    this._value = value
    var fn
    while (fn = this._onResolvedCallback.pop()) {
      fn.call(this, value)
    }
  }
}
function reject (reason) {
  if(this._status === 'pending') {
    this._status = 'reject'
    this._value = reason
    var fn
    while (fn = this._onRejectCallback.pop()) {
      fn.call(this,reason)
    }
  }
}
MyPromise.prototype.then = function (onResolved, onRejected) {
  var self = this
  var promise2
  onResolved = typeof onResolved === 'function' ? onResolved : function (v) {}
  onRejected = typeof onRejected === 'function' ? onRejected : function (r) {}
  if (self._status === 'resolved') {
    return promise2 = new MyPromise (function (resolve, reject) {
      try {
        var x = onResolved(self._value)
        if (x instanceof MyPromise) {
          x.then(resolve,reject)
        }
        resolve(x)
      } catch (e) {
        reject(e)
      }
    })
  }
  if (self._status === 'rejected') {
    return promise2 = new MyPromise (function (resolve, reject) {
      try {
        var x = onRejected(self._value)
        if (x instanceof MyPromise) {
          x.then(resolve,reject)
        }
      } catch(e) {
        reject(e)
      }
    })
  }
  if (self._status === 'pending') {
    return promise2 = new MyPromise (function (resolve, reject) {
      self._onResolvedCallback.push(function (value) {
        try{
          var x = onResolved(self._value)
          if (x instanceof MyPromise) {
              x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
      self._onRejectCallback.push(function(reason) {
        try {
          var x =onRejected(self._value)
          if(x instanceof Promise) {
            x.then(resolve, reject)
          }
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}
//test code
  var myFirstPromise = new MyPromise(function(resolve, reject){
      setTimeout(function(){
          resolve("成功!"); //代码正常执行！
      }, 1000);
  });
  myFirstPromise.then(function (successMessage) {
     console.log("Yay! " + successMessage);
  })
```