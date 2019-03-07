## learn something in 3 steps
  - 1. download a simple demo from github, then run it, read the code of it;
  - 2. goto the official site, read its document fully and **slowly**;
  - 3. find the details of tis implementation by reading its source code;
## reading the relative documents to enhance the comprehension
  - It's a good way to improve yourself
## redux
  - [doc link](https://redux.js.org/introduction/getting-started)
  - It helps simplify a lot of common use cases, including store setup, 
  - creating reducers and writing immutable update logic...
## multiple arrow functions
``````jsx
const handleClick = id => event {
  event.preventDefault()
  // Dispatch some delete action by passing record id
}

const Confirm = props => (
  <div>
    <h1>Are you sure to delete?</h1>
    <button onClick={handleClick(props.id)}>
      Delete
    </button>
  </div
)
``````

## connect: Extracting Data with mapStateToProps
``````jsx
// TodoList.js
function mapStateToProp(state) {
  const { todos } = state
  return { todoList: todos.allIds}
  // the return value must be a plain object that contain the data the component needs
  // component will receive: props.todoList
}
export default connect(mapStateToProp)(TodoList)
// mapStateToProp: Functions Should Be Pure and Synchronous
``````

## mapDispatchToProps
``````jsx
// method 1:
function Counter({ count, dispatch }) {
  // After you have connected your component, you will get a function-prop: dispatch
  return (
    <div>
      <button onClick={() => dispatch({type: 'DECREMENT'})}>-</button>
      <span>{ count }</span>
      <button onClick={() => dispatch({type: 'IECREMENT'})}>+</button>
    </div>
  )
}
// method 2:

``````

## thunk
``````javascript
// reference https://medium.com/fullstack-academy/thunks-in-redux-the-basics-85e538a3fe60
// Eager version
function yell(text) {
  console.log(text + '!')
}
yell('help--help me.')

// Lazy version
function thunkedYell(text) {
  return function thunk() {
    console.log(text + '!!')
  }
}
const thunk = thunkedYell('bonjour')
// wait for it...
thunk()// 'bonjour'

// there is a more simple version used arrorw function
const yell        = text => console.log(text + '!')
const thunkedYell = text => () => console.log(text + '!')
``````
## 高阶组件
- 抽象 可复用  
- 存在的本质，还是程序对 抽象性的 追求，一套封装下来，可以持续性地复用；

## 异步加载组件方法
- [参考地址](https://segmentfault.com/a/1190000009820646)
```javascript
import { asyncComponent } from './AsyncComponent'
const Foo = asyncComponent(() => import(/* webpackChunkName: "foo"*/"./foo"))
<Route path="/xx" component={Foo} />
``` 

## 获取品目尺寸的一些信息
- let systemInfo = wepy.getStorageSync(USER_INFO) || {};


## Anti flux
- [参考地址](https://medium.com/@raul.mihaila/challenging-the-flux-architecture-2838152a0f8f)
- The main idea of Flux is turning the application into a pipeline.
- If something happens at a certain point of the pipeline based on another point of the pipeline.
- The restricting nature of Flux can be advantageous. Redux takes it a step
- further, disallowing mutations.
## facebook flow
- [flow配置指南](https://zhuanlan.zhihu.com/p/24649359?utm_source=tuicool&utm_medium=referral)
- [flow官网地址](https://flow.org/en/docs/lang/nominal-structural/)
- A type is something like a string, a boolean, an object, or a class.
- 注意这里 an object, 不像java对象都是new的
## 读和写 （理解的核心点）
- 核心应该是个闭环，这个叫闭环学习法，能改成乱七八糟，又能改回来
- 理解框架的核心
## 完整的react-redux 项目参考
- [github地址](https://github.com/litong19930321/dianping-react)
- action reducer state
- action 中的type payload传递到reducer中 
## react-redux
- [参考文档](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)
- React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。
- connect()方法
- 涉及两点：输入逻辑 输出逻辑（简单 读/写）（读入state以及写入state）
- 
## redux-thunk
- [参考地址](https://blog.csdn.net/kuangshp128/article/details/67632683)
- redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装
## Jest facebook的测试框架
- 比如测试 点击事件
```javascript
it('shows forks when the button is tapped', () => {
  const rendered = TestUtils.renderIntoDocumnet(
    <Detail params={{repo: ''}} />
  );

  const btns = TestUtils.scryRenderedDOMComponnentsWithTag(rendered, 'button');
  const forksButton = btns[1];
  TestUtils.Simulate.click(forksButton);
  expect(rendered.state.mode).toEqual('forks');// 判断点击按钮后组件的状态
})
```
## 什么是root route
```javascript
// Regardless, a root route is a React Router path that sits at 
// the very core of our app, and will be rendered no matter what path is reached.
// 最外层的永远会被渲染的容器组件
// 比如
// 实现原理用到了插槽 和 嵌套路由  两种语法结构
import React from 'react';
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Unofficial GitHub Browser v0.1</h1>
        {this.props.children}
      </div>
    )
  }
}

export default App;

// 嵌套路由配置部分, 嵌套路由，也是用的插槽的思想，插槽本质其实就是，特殊的prop（位置不一样，名字固定）
ReactDOM.render(
  <Router history={createHistory({ queryKey: false})}
    onUpdate={() => window.scrollTo(0, 0)} >
    <Route path="/" component={ App }>
        <IndexRoute component={ List }>{/* 匹配不到子路由的时候，就用这个方式匹配*/}
        <Route path="detail/:repo" component={ Detail }>
    </Route>
  </Router>,
  document.getElementById('app')
);
// When you nest routes – i.e., put one route inside another - they build up as saw earlier 
// using this.props.children 
```
## 滚动条的问题
- 某个路由页面，内容很长，滑动到一半，切换到另一个路由，这个时候滚动条还是会
- 卡在这个页面
```jsx
// 解决方法
<Router history={createHistory({ queryKey: false})}
 onUpdate={() => window.scrollTo(0, 0)}>
```
## dataset
```jsx
  return (<div>
  <button onClick={this.selectMode.bind(this)} data-mode="forks">Show Forks</button>
  </div>);
// 获取参数的方式
// - this.setState({ mode: event.currentTarget.dataset.mode })

```

## react-router v4 中路由的跳转
```jsx
const history = createHistory();
  render() {
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/city" component={ City } />
      </Switch>
    </Router>
  }
```
- this.props.history.goBack()
## 搞懂了React Native中 组建和API 区别
  > Component ApI 和 Component Lifecycle API 
  > 前者 this.props this.state this.setState() 最重要的属性 方法
  > 组件的复用特性
  > 组件的继承关系：Nearly all the core components extend the View component, and can be passed an optional style prop.
  >[react学习网址](http://www.reactnativeexpress.com/view)
  > 这个文档 在不失整体结构的时候，the most common，又列出了最常用的一些特点

### React 编程
**setState与render**
[知乎专栏](https://zhuanlan.zhihu.com/p/20328570)

**React.cloneElement 永恒地克隆元素**
```javascript
const cloned = React.cloneElement(element, {new: '我是新增的属性'})
```

**React.Children.map 与 this.props.children.map区别**
> 如果有人将一个函数作为child传递过来，后者会报错，前者不会

**React.Children.count 与 this.props.children.length**
> 后者，在传递了字符串或者函数时程序会中断 

**React.Children.toArray(props.children)**
> toArray 将children转化为数组
> 这个东西有点类似 vue中的插槽
> 目的：假如我们需要让子组件的一部分内容，被父组件控制，而不是被子组件控制
> 作用：父组件可以很容易通过插槽向子组件插入内容
> 学习方法：拓展我在抄的这个项目，才有进步
> 插槽对比的学习方法
```javascript
// 注意这里用到了 Grid 这个组件
class App extends Component {
  render() {
    return (
      // 这里的Grid就是子组件
      <Grid>
        <Row />
        <Row />
        <Row />
      </Grid>
    )
  }
}

class Grid extends Component {
  render() {
    // 拿到第一个Row
    return this.props.children[0]
    // 拿到所有的Row
    // return this.props.children
  }
} 

```