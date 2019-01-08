
## 核心
- 面向 react-navigation react-redux,路由和数据中心调度的编程思想
- 任何界面上的小效果，通过setState()方法实现
- 属性值可以是，
  - 判断界面是否显示的逻辑值
  - 业务数据
  - 样式的属性值，（动画的本质，也是这块属性值的变化）
- 交互
  - app简单的就是纯展示，
  - 稍微复杂的就是 简单的交互事件（点击），表单 按钮 缓存数据 提交 
- 任何jsx的地方其实，返回的是ReactElement类型，自动眼球parse成 React.createElement
  - 直接当成js的对象来处理，尤其是和容器结合的时候；
- 组件是种特殊类型，可以经常用来和容器（数组）打交道；
```jsx
  
  class OrderScene extends PureComponent<Props, State> {
    let cells:Array<PureComponent<{}>> = [];
    let dataList = this.getDataList();
    for (let i = 0; i<dataList.length; i++) {
      let sublist = dataList[i];
      for (let j = 0; j < sublist.length; j++>) {
        let data = sublist[j]
        // 这个cell的类型其实是 ReactElement
        let cell = <DetailCell image={data.image} title={data.title} subtitle={data.subtitle} key={data.title} />
        cells.push(cell)
      }
      // 注意这里插入分组空格  这种操作
      cells.push(<SpacingView key={i} />)
    }
    // 所以这块最后是个  ReactElement形成的一个 树形结构
    return (
      <View style={{flex: 1}}>
        {cells}
      </View>
    )
  }

```

- jsx一些语法
```jsx
// 第一行的这种写法
{tabIndex == 0 &&
  <View>
    <Block>
      <Title>{course.title}</Title>
      <LabelValue label="开课时间">
        <Description>{course.start.substring(0, 10)}</Description>
      </LabelValue>
      <LabelValue label="上课地点">
        <Description>{course.address}</Description>
      </LabelValue>
      <LabelValue label="课程价格">
        <Price>{course.price}</Price>
      </LabelValue>

    </Block>

    <Block>
      <View>
        <IconLabel icon={require("./images/introduce.png")}>课程简介</IconLabel>
        <View>
          <Description>{course.description}</Description>
        </View>
      </View>
    </Block>
    <Block>
      <View>
        <IconLabel icon={require("./images/about-teacher.png")}>教师简介</IconLabel>
        <View>
          <Description>{course.author_profile}</Description>
        </View>
      </View>
    </Block>
  </View>
  }
```


- UI的通常结构
```jsx
  class OrderScene extends PureComponent<Props, State> {
    //  比如这个是渲染，头部组件
    renderHeader = () => {
      return (
        // 外面必然有个 容器view
        <View>
          {/* 独立的一行，就有一个view包裹 要么是个组件，要么是个view*/}
          <DetailCell title='我的订单' subtitle='全部订单' style={{height: 38}}>

          <View style={styles.itemContainer}>
            <OrderMenuItem title="待付款" icon={require('../../imgs/test.png')}/>
            <OrderMenuItem title="待付款" icon={require('../../imgs/test.png')}/>
            <OrderMenuItem title="待付款" icon={require('../../imgs/test.png')}/>
            <OrderMenuItem title="待付款" icon={require('../../imgs/test.png')}/>
          </View>
          
          <SpacingView />

          <DetialCell title='我的收藏' subtitle='查看全部' style={{height: 38}}>
        </View>
      )
    }
  }
```
  - 组件封装的粒度
    - 以行为单位，进行组件封装；
    - 比如：轮播图的小点点，空行，左边文字 右边箭头的行

## 《React Native跨平台移动开发.pdf》
- 下面这本书抄了80%，找其他地方抄了20%
- 不过还是有一定的实用度
## 《Packt.Mastering.React.Native.pdf》
- 样式 page.81
    - StyleSheet.create()
    - 有些样式效果是Stylesheet表现不出来的,
      - 比如
      ```jsx
      <TouchableHighlight activeOpacity={0.8}></TouchableHighlight >，
      <!---->
      ```
    - Image组件既可以是前景图，背景图也是使用Image组件
    - onLayout事件  
- page34 组件的休眠状态被打破，主要是props或者state 被修改了
- 这本书很细致，先是从基本的react的基本构成讲起
- 任何UI上的交互互动，都可以通过（一个或多个state来作为这个特效的推动剂）
- 人的外部体现，也是内部 各种综合state的体现，修改state，修改自己的体现
## API 和 组件
- 《react native跨平台移动开发.pdf》page.38
- 状态机思维：this.setState() 每调用一次，意味着 重新render() UI
## Animated.view的核心用法
- 动画的思想和css动画一样，在一定时间内，修改UI元素的显示属性
- interpolate() 函数，实现了数值大小、单位的映射转换
- 旋转角度也可以是 值 0-1的修改
- [alloyteam的技术解说](http://www.alloyteam.com/2016/01/reactnative-animated/?utm_source=tuicool&utm_medium=referral)
- render() 方法中，存放的永远是**第一帧**的东西，所以
```jsx
// 因为这些动画属性值，需要不停被修改，所以会先绑定到
// state上
getInitialState() {
  return (
    fadeInOpacity: new Animated.Value(0),
    rotation: new Animated.Value(0) 
  )
}
// interpolate()函数 
rotateZ: this.state.rotation.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg']
})
// case1
componentDidMount() {
  Animated.timing(this.state.fadeInOpacity, {
    toValue: 1, // 目标值
    duration: 2500, // 动画时间
    easing: Easing.linar
  }).start();
}

// case 2
componentDidMount() {
  var timing = Animated.timing;
  // 同时又多个属性变化的动画
  Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
    return timing(this.state[property], {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    })
  })).start();
}
// render() 方法
render() {
  return (
    <Animated.View style={{styles.demo, }}>
      <Animated.Text style={{
        fontSize: this.state.fontSize.interpolate({
          inputRange: [0, 1],
          outputRange: [12, 26]
        })
      }}>
        附近上空
      </Animated.Text>
    </Animated.View>
  )
}
```
## 美团项目
- 面向可调用 确实可以使用的API/组件/套路 学习法，分析哪些掌握了，不管是象棋 游戏 编程都一样的，那些稳固的 第一性的方法，构成整体操作 
- [git地址](https://github.com/huanxsd/MeiTuan)
- 设计到常用组件的封装 复用 宽高如何设置
- 比如 空白行 常用色 轮播的导航点点 都是独立的组件
- UI组件最常用的props是 title icon style这些
- 最好集成flow来使用
- 
## 有些方法文档中没有
- 直接跳转到源码查看
- 如果官方提供的ios android不兼容，可以尝试找第三方组件
- [react-native 常用第三方组件](https://yq.aliyun.com/articles/78154)
- 使用常用关键字搜索
## React Native Express
- [网址](http://www.reactnativeexpress.com/environment)

## Expo app
- whick is a React Native app previewing client.

## Mounting Cycle 和 Updating Cycle

## 核心组件
- Nearly all the core components extend the View component, and can be passed an optional style prop.

## Animation 的两个组件
- Animated
- LayoutAnimation