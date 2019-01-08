## vue实现原理
- [参考](https://github.com/DMQ/mvvm)

- 监听的data必须是个对象，这样的好处是，不需要写过多判断；
- 对对象的所有属性进行，遍历监听；（关键特点： 必须一个都不漏，）
- Object.defineProperty(data, key, {set: function() {}, get: function() {}})
  - 归根到底，都是对某个粒度级别的 set get
- 数据源的第一性，一般都会有多个订阅者，（现实世界也是，一个内部消息，政策法规，会有多方 多行业 多政府等在监听，并作出不同的反馈）
- 数据源或者说一个单元的状态， 要么读它 要么写它

## .sync修饰符
```html
  <div>
    <counter1 :num.sync="syncNum"></counter1>
  </div>
```
- 实际上，会被解析成这样
- <counter1 :num="syncNum" @update:syncNum="val => bar=val"></counter1>
- 实际上，这个是个语法糖， 子组件更新syncNum时，this.$emit('update:foo', newValue)


## Vue.nextTick 和 vm.$nextTick
- $nextTick是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick,
- 则可以在回调中获取更新后的DOM
```javascript
new Vue({
  //...
  methods: {
    //...
    example: function() {
      // modify data
      this.message = 'changed'
      // DOM is not updated yet
      this.$nextTick(function() {
        // DOM is now updated
        // `this` is bound to the current instance
        this.doSomethingElse()
      })      
    }
  }
})
```
- $nextTick 使用场景，使用了某个jquery插件，希望在 DOM 元素中某些属性发生变化之后重新应用该插件，这时候就需要在 $nextTick 的回调函数中执行重新应用插件的方法
- 一般看到 $nextTick的地方，也会看到this.$refs.
- 有些插件的异常bug，应该在基本的DOM结构，渲染完以后，再初始化
- 比如：
```javascript
this.$nextTick(() => {
  // dom结构渲染完后
  // 再初始化swiper
  swiper.init(); 
})
```

## 关键还是组件化的思想
- 抽象组件的思想
- 可以复用的组件
## 锤子官网首页 背景图的动画效果
- 三个事件  mouseover="" mousemove="" mouseout=""
- offset家族两类属性
```javascript
  // 输入移入 获取初始状态
  const {offsetLeft, offsetTop, offsetWidth, offsetHeight} = ele
```
- 鼠标移动
- 鼠标移出
## 子组件向父组件传递
- login中countdown组件，this.$emit('countDown')
```javascript
  // 自己封装按钮组件很常用
  methods: {
    btnClick(event) {
      this.$emit('btnClick', event)
    }
  }
```
## 支援vue 多页面
  ```javascript
    glob.sync('./src/pages/**/*.html').forEach(path => {
    const chunk = path.split('./src/pages/')[1].split('/app.html')[0]
    const filename = chunk + '.html'
    const htmlConf = {
      filename: filename,
      template: path,
      inject: 'body',
      favicon: './src/assets/img/logo.png',
      hash: process.env.NODE_ENV === 'production',
      chunks: ['vendors', chunk]
    }
    config.plugins.push(new HtmlWebpackPlugin(htmlConf))
  })
```

## scoped 后代选择器
- .a >>> .b { /* ... */ }
- [参考地址：](https://vue-loader.vuejs.org/en/features/scoped-css.html)