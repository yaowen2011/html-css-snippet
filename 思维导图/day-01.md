# Vue -渐进式JavaScript框架

![Vue](./imgs/VUE-logo.png)

## 课程介绍

- 1 Vue基础知识
- 2 Vue全家桶（vue-router/vuex/axios/es6）
- 3 组件化开发
- 4 webpack - 前端模块化打包构建工具
- 5 ES6 - [ECMAScript 6 入门](http://es6.ruanyifeng.com/)
- 6 Vue项目

```编程能力
1 官方文档、技术博客（知识点、入坑指南、行业新闻）
2 debug
3 编码规范
4 解决问题的基础上关注性能优化
```

## 介绍

- [vue 中文网](https://cn.vuejs.org/)
- [vue github](https://github.com/vuejs/vue)
- Vue.js (读音 /vjuː/，类似于 view) 是一套构建用户界面(UI)的渐进式JavaScript框架
- 要求：**通读一遍Vue官网教程中的基础内容**

## 库和框架的区别

![框架和库的区别](./imgs/框架和库.png)

- 写在前面：JavaScript从最开始的表单验证，到现在轻松实现复杂的大型应用`无所不能`，没有一个框架怎么行？
- [我们所说的前端框架与库的区别？](https://zhuanlan.zhihu.com/p/26078359?group_id=830801800406917120)

### Library

> 库，本质上是一些函数的集合。每次调用函数，实现一个特定的功能，接着把`控制权`交给使用者

- 代表：jQuery
- jQuery这个库的核心：DOM操作，即：封装DOM操作，简化DOM操作

### Framework

> 框架，是一套完整的解决方案，使用框架的时候，需要把你的代码放到框架合适的地方，框架会在合适的时机调用你的代码

- 框架规定了自己的编程方式，是一套完整的解决方案
- 使用框架的时候，由框架控制一切，我们只需要按照规则写代码

### 主要区别

- You call Library, Framework calls you
- 核心点：谁起到主导作用（控制反转）
  - 框架中控制整个流程的是框架
  - 使用库，由开发人员决定如何调用库中提供的方法（辅助）
- 好莱坞原则：Don't call us, we'll call you.
- 框架的侵入性很高（从头到尾）

## MVVM的介绍

- MVVM，一种更好的UI模式解决方案
- [从Script到Code Blocks、Code Behind到MVC、MVP、MVVM - 科普](http://www.cnblogs.com/indream/p/3602348.html)
- ![MVVM](./imgs/MVVM.png)

### MVC

- M: Model 数据模型
- V：View 视图
- C：Controller 控制器

### 组成

- MVVM ===> M / V / VM
- M：model数据模型
- V：view视图
- VM：ViewModel 视图模型

### 优势

- MVC模式，将应用程序划分为三大部分，实现了职责分离
- MVVM通过`数据双向绑定`让数据自动地双向同步
  - V（修改数据） -> M
  - M（修改数据） -> V
  - 数据是核心
- Vue这种MVVM模式的框架，不推荐开发人员手动操作DOM

### Vue中的MVVM

> 虽然没有完全遵循 MVVM 模型，Vue 的设计无疑受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的简称) 这个变量名表示 Vue 实例

## 起步 - Hello Vue

- 安装：`npm i -S vue`

```html
<!-- 指定vue管理内容区域，需要通过vue展示的内容都要放到找个元素中 -->
<div id="app">{{ msg }}</div>

<!-- 引入 vue.js -->
<script src="vue.js"></script>

<!-- 使用 vue -->
<script>
  var vm = new Vue({
    // el：提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标
    el: '#app',
    // Vue 实例的数据对象，用于给 View 提供数据
    data: {
      msg: 'Hello Vue'
    }
  })
</script>
```

### Vue实例

- 注意 1：**先在data中声明数据，再使用数据**
- 注意 2：可以通过 `vm.$data` 访问到data中的所有属性，或者 `vm.msg`
  - `vm.$data.msg === vm.msg`

```js
var vm = new Vue({
  data: {
    msg: '大家好，...'
  }
})

vm.$data.msg === vm.msg // true
```

### 数据绑定

- 最常用的方式：`Mustache`，也就是 `{{}}` 语法
- 解释：`{{}}`从数据对象`data`中获取数据
- 说明：数据对象的属性值发生了改变，插值处的内容都会更新
- 说明：`{{}}`中只能出现JavaScript表达式
- 注意：**Mustache 语法不能作用在 HTML 元素的属性上**

```html
<h1>Hello, {{ msg }}.</h1>
<p>{{ 1 + 2 }}</p>
<p>{{ isOk ? 'yes': 'no' }}</p>

<!-- ！！！错误示范！！！ -->
<h1 title="{{ err }}"></h1>
```

## Vue two way data binding

- 双向数据绑定：将DOM与Vue实例的data数据绑定到一起，彼此之间相互影响
  - 数据的改变会引起DOM的改变
  - DOM的改变也会引起数据的变化
- 原理：`Object.defineProperty`中的`get`和`set`方法
  - `getter`和`setter`：访问器
  - 作用：指定`读取或设置`对象属性值的时候，执行的操作
- [Vue - 深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
- [MDN - Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
/*
  语法
*/

var obj = {}
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg 执行的操作
  set: function () {},
  // 读取 obj.msg 执行的操作
  get: function () {}
})
```

### Vue双向绑定的极简实现

- [剖析Vue原理&实现双向绑定MVVM](https://segmentfault.com/a/1190000006599500)

```html
<!-- 示例 -->
<input type="text" id="txt" />
<span id="sp"></span>

<script>
var txt = document.getElementById('txt'),
  sp = document.getElementById('sp'),
  obj = {}

// 给对象obj添加msg属性，并设置setter访问器
Object.defineProperty(obj, 'msg', {
  // 设置 obj.msg 执行的操作
  set: function (newVal) {
    txt.value = newVal
    sp.innerText = newVal
  }
})

// 监听文本框的改变
txt.addEventListener('keyup', function (event) {
  obj.msg = event.target.value
})
</script>
```

### 动态添加数据的注意点

- 注意：只有`data`中的数据才是响应式的，动态添加进来的数据默认为非响应式
- 可以通过以下方式实现动态添加数据的响应式
  - 1 `Vue.set(object, key, value)` - 适用于添加单个属性
  - 2 `Object.assign()` - 适用于添加多个属性

```js
var vm = new Vue({
  data: {
    stu: {
      name: 'jack',
      age: 19
    }
  }
})

/* Vue.set */
Vue.set(vm.stu, 'gender', 'male')

/* Object.assign */
vm.stu = Object.assign({}, vm.stu, { gender: 'female', height: 180 })
```

### 异步DOM更新

- 说明：Vue 异步执行 DOM 更新，监视所有数据改变，一次性更新DOM
- 优势：可以去除重复数据，对于避免不必要的计算和 避免重复 DOM 操作上，非常重要
- `Vue.nextTick(callback)`：在DOM更新后，执行某个操作（DOM操作）
  - `vm.$nextTick(function () {})`

```js
methods: {
  fn() {
    this.msg = 'change'
    this.$nextTick(function () {
      console.log('$nextTick中打印：', this.$el.children[0].innerText);
    })
    console.log('直接打印：', this.$el.children[0].innerText);
  }
}
```

## 指令

- 解释：指令 (Directives) 是带有 `v-` 前缀的特殊属性
- 作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM

### v-text

- 解释：更新DOM对象的 textContent

```html
<h1 v-text="msg"></h1>
```

### v-html

- 解释：更新DOM对象的 innerHTML

```html
<h1 v-html="msg"></h1>
```

### v-bind

- 作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
- 语法：`v-bind:title="msg"`
- 简写：`:title="msg"`

```html
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```

### v-on

- 作用：绑定事件
- 语法：`v-on:click="say"` or `v-on:click="say('参数', $event)"`
- 简写：`@click="say"`
- 说明：绑定的事件从`methods`中获取
- 案例：跑马灯

```html
<!-- 完整语法 -->
<a v-on:click="doSomething"></a>
<!-- 缩写 -->
<a @click="doSomething"></a>
```

### 事件修饰符

- `.stop`       阻止冒泡，调用 event.stopPropagation()
- `.prevent`    阻止默认行为，调用 event.preventDefault()
- `.capture`    添加事件侦听器时使用事件`捕获`模式
- `.self`       只当事件在该元素本身（比如不是子元素）触发时，才会触发事件
- `.once`       事件只触发一次

### v-model

- 作用：在表单元素上创建双向数据绑定
- 说明：监听用户的输入事件以更新数据
- 案例：计算器

```html
<input type="text" v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### v-for

- 作用：基于源数据多次渲染元素或模板块

```html
<!-- 1 基础用法 -->
<div v-for="item in items">
  {{ item.text }}
</div>

<!-- item 为当前项，index 为索引 -->
<p v-for="(item, index) in list">{{item}} -- {{index}}</p>
<!-- item 为值，key 为键，index 为索引 -->
<p v-for="(item, key, index) in obj">{{item}} -- {{key}}</p>
<p v-for="item in 10">{{item}}</p>
```

### key属性

- 推荐：使用 `v-for` 的时候提供 `key` 属性，以获得性能提升。
- 说明：使用 key，VUE会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
- [vue key](https://cn.vuejs.org/v2/guide/list.html#key)
- [vue key属性的说明](https://www.zhihu.com/question/61064119/answer/183717717)

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

## 样式处理 -class和style

- 使用方式：`v-bind:class="expression"` or `:class="expression"`
- 表达式的类型：字符串、数组、对象（重点）
- 语法：

```html
<!-- 1 -->
<!-- 重点 -->
<div v-bind:class="{ active: true }"></div> ===>
<div class="active"></div>

<!-- 2 -->
<div :class="['active', 'text-danger']"></div> ===>
<div class="active text-danger"></div>

<!-- 3 -->
<div v-bind:class="[{ active: true }, errorClass]"></div> ===>
<div class="active text-danger"></div>


--- style ---
<!-- 1 -->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<!-- 2 将多个 样式对象 应用到一个元素上-->
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

### v-if 和 v-show

- [条件渲染](https://cn.vuejs.org/v2/guide/conditional.html)
- `v-if`：根据表达式的值的真假条件，销毁或重建元素
- `v-show`：根据表达式之真假值，切换元素的 display CSS 属性

### 提升性能：v-pre

- 说明：跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。

```html
<span v-pre>{{ this will not be compiled }}</span>
```

### 提升性能：v-once

- 说明：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。

```html
<span v-once>This will never change: {{msg}}</span>
```

## 案例：品牌管理
