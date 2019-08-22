## 事件冒泡e.target 和 e.currentTarget
- e.target 最初触发事件的元素

## 封装一个简单的EventBus
```js
// 方法一： 
function EventBus() {
  this.events = new Map()
}

EventBus.prototype.on = function(key, cb) {
  const list = this.events.get(key) ? this.events.get(key).push(cb) : []
  this.events.set(key, list)
}

EventBus.prototype.off = function(key) {
  // this.events.delete(key)
}

EventBus.prototype.emit = function(key, args) {
  this.events.get(key).forEach((handler, key) => {
    handler.apply(this, args)
  })
}

// 方法二：这种方法没体现出总线的概念
var eventEmitter = {
  emit: function(type) {
    var e = new Event(type)
    window.dispatchEvent(e)
  },
  on: function(type, cb) {
    window.addEventListener(type, cb)
  }
}
```
## 路由两种模式hash和history
- history.pushState() history.replaceState如何监听
```js
// 通过篡改bom原生的方法，
var _wr = function(type) {
  var orig = window.history[type]

  return function() {
    var rv = orig.apply(this, arguments)
    var e = new Event(type)
    e.arguments = arguments
    // emit 事件
    window.dispatchEvent(e)
    return rv
  }
}
window.pushState = _wr('pushState')
window.replaceState = _wr('replaceState')

window.addEventListener('pushState', function(e) {})
window.addEventListener('replaceState', function(e) {})
```