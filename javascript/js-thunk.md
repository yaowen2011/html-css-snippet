- 传值调用
- 传名调用
- 传值调用和传名调用，哪一种比较好？回答是各有利弊。传值调用比较简单，但是对参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。
```js
function f(m) {
  return m + 2
}
f (x + 5)
// 等同于
var thunk = function() {
  return x + 5
}
function f(thunk) {
  return thunk() * 2
}

```
## 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。
- 