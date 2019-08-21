## 移动端常见的坑
- [参考地址](https://segmentfault.com/a/1190000015460570)
## css中申明变量和表达式
```html
<style>
:root {
	--time-slot-length: 0.1s;/*申明*/
	--t1x: var(--time-slot-length);
	--t2x: calc(var(--time-slot-length) * 2);/*表达式赋值*/
	--t3x: calc(var(--time-slot-length) * 3);
	--t4x: calc(var(--time-slot-length) * 4);
	--color: dodgerblue;
}
</style>
```
## 边框动画
- 边框使用transition，阴影使用animation
- transition中的延迟设置，是构成序列动画的关键
- 比如
  - transition: 
    - height linear var(--t1x) var(--t2x),
    - width linear var(--t1x) var(--t3x),
    - visibility 0s var(--t4x); /* delay 4x 直接关闭*/

```html
<style>
 nav ul li:hover::before {

 }
</style>
```
## 0.5px 圆角边框
- (https://segmentfault.com/a/1190000015385024)[参考地址]
```html
<div class="round">
  <div class="round-div">
    HELLO WORLD
  </div>
</div>
<style>
.round{
   position: relative;
   font-size: 16px;
 }
.round .round-div:before{
  content: "";
  position: absolute;
  top: -50%;
  bottom: -50%;
  left: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  border: solid 1px red;
  border-radius: 22px;
  box-sizing:border-box;
}
</style>
```

## css进阶基本功
- (https://segmentfault.com/a/1190000015440135)[参考地址]
- (https://segmentfault.com/a/1190000015439611)[参考地址]

## 隐藏一个元素的一个 高端方法
- rect的参数是 top right bottom left的距离
- 这个方法额外好处，tab键事件还是可以获取
- input[type="checkbox"] {
- position: absolute;
- clip: rect(0, 0, 0, 0);
- }
## 层叠机制
- 老的浏览器识别不了后面的机制，后面的会被忽略掉；
- html {
- cursor: url('transparent.gif');
- cursor: none; 
-}
## 透明边框
- background 默认是延伸到border的,导致默认半透明会失效
- background-clip: border-box|padding-box;

## 多层边框
```css
background: yellowgreen;
box-shadow: 0 0 0 10px #655, 0 0 0 15px deeppink; //粉色可见宽度是5px
```
## 如果只是两层边框 outline属性
- background: yellowgreen;
- border: 10px solid #655;
- outline: 15px solid deeppink;

## 判断元素是否滚到底部
- element.scrollHeight - element.scrollTop === element.clientHeight 
- 如果是true 则已经到达底部

## background-position 可以控制微小距离
- bckground-position: right 20px bottom 10px;

## background-origin 
- 4个box margin-box border-box  padding-box  content-box
- padding-box是background的默认参考，这种情况下 边框和内容背景正好不重叠
- 设置好padding 再设置background-origin 可以细节控制背景图的位置
- padding: 10px;
- background-origin: content-box;
- background: url("code-pirate.svg") no-repeat #58a bottom right;

## calc实现类似效果 + -旁边必须有空格
- background: url("code-pirate.svg") no-repeat;
- background-position: calc(100% - 20px) calc(100% - 10px); 
- calc 在流式布局，动态计算宽高还是很好用的

## 内圆外方  
- 方法一： 内外两个div
- 方法二： 
- background: tan;
- border-radius: .8em;
- padding: 1em;
- box-shadow: 0 0 0 .6em #655;
- outline: .6em solid #655;  //outline的特性 不会变成圆角

## linear-gradient(#fb3 20%, #58a 80%);
- 这里的20%和80%是过渡的区间，<20%是纯#fb3  >80%是纯的#58a
- 条纹效果的关键 是不设置过渡区间，两个值相等
- background: linear-gradient(to right, /*or 90deg*/ #fb3 50%, #58a 0);
- backgroud-size: 30px 100%;

## 倾斜效果
- 思路一：两层div 使用相反的skew()方法
- 思路二：伪元素
- .button {
-  position: relative
- }
- .button::before {
- content: '',
- position: absolute;
- top:0; right:0; bottom:0; left:0;
- z-index: -1;
- background: #58a;
- transform: skew(45deg);
- }

## width 放大图片和scale的区别
- width 是从top - left ，而scale默认是从center开始
- 方法一：实现把一张菱形图，裁切成菱形，还是原来的角度
```html
<style>
  .picture {
    width: 400px;
    transform: rotate(45deg);
    overflow: hidden;
  }
  .picture > img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
  }
</style>
```
- 方法二：clip-path:polygon()
```html
<style>
  img {
    clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
    transition: 1s clip-path;
  }
  /* // clip-path可以过渡 */
  img:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
</style>
```

## 样式优先级
```html
   <style>
    /* style标签中的顺序决定了权重  green权重高于red */
    .red {
      color: red;
    }
    .green {
      color: green;
    }
  </style>

  <p class="green red">内容</p>
```

## flex布局
- [参考地址](http://www.runoob.com/w3cnote/flex-grammar.html)
- .box { display: flex;}  行内元素.box { display: inline-flex;}
- 注意：
  - 设为flex布局以后，子元素的float\clear vertical-align属性将失效
- align-items: flex-start|flex-end|center|stretch|baseline
  - stretch (默认值)
- align-content 这个属性 对象  justify-content
  - 默认，也是stretch
  - 注意： 定义了多根轴线的对齐方式，如果项目只有一个轴线，该属性不去作用
  - 把一跟轴线，看成是一个单元，然后再侧轴方向上对齐

- 分容器属性  项目属性
  - 容器属性（6个）flex-direction flex-wrap flex-flow justify-content align-items align-content
    - flex-flow: row nowrap; 是flex-direction 和 flex-wrap的缩写 
  - 项目属性（6个） order flex-grow flex-shrink  flex-basis flex align-self
    - order 默认0 越小，排名越靠前
    - flex ： flex-grow flex-shrink flex-basis，快捷值 auto(1 1 auto) none(0 0 auto), 默认值 0 1 auto
    - align-self: 对标align-items 设置的话，会覆盖掉容器设置


## 伪类和伪元素选择器
- [参考地址](https://segmentfault.com/a/1190000012156828)
- 伪类包含两种：状态伪类和结构性伪类 偏向多个
  - (状态伪类) :focus :link :visited :hover :active
  - (结构伪类) :first-child :last-child :nth-child()
  - :nth-of-type() :empty

- 伪元素 偏向单个
  - ::before ::after ::first-letter ::first-line

## p:nth-child(2) { color: red;} 和 p:nth-of-type(2) { color: red;}区别
- 前者： 1.这是段落元素 2.这是父标签的第二个孩子元素
- 后者： 指定类型，必须是类型为 p 标签构成的容器，并且是这个容器中的第二个元素

## 隐藏滚动条
- ::webkit-scrollbar

## flex-grow flex-shrink flex-basis
- 父子容器 主轴 侧轴
- 瓜分父容器 的剩余空间
- flex-basix和width作用一致,flex-basis的优先级比width高
- flex-shrink 子容器总宽 超过父容器的情况下，如何压缩
- [参考博客](https://www.cnblogs.com/ghfjj/p/6529733.html)
- [参考官方](https://www.w3.org/html/ig/zh/css-flex-1/)
- auto的值是怎么求的？
- %0 + auto + 200px = 300px,auto对应取为100px
## 实现导航牌 箭头式背景图
- 正常的background设置， 加上:after 伪元素，通过设置边框，画一个偏左的三角形
### min-width小屏幕样式错乱问题
- 之前在台式机上，没有设置右侧min-width，到笔记本上样式错乱
- pos点餐效果，不同设备 显示效果不一致，所以一开始就要考虑处理
- 用rem处理的思路，感觉要比css媒体查询的思路好些
### close按钮旋转360
```css
/* :hover时 调用（带有隐式的调用） */
&:hover {
  svg {
    /* 定义过渡的属性 */
    transform-origin: 50% 50%;
    transform: rotate(360deg);
    /* 定义过渡的css属性，以及过渡的时间 */
    transition: all 1s;
  }
}
```
### 根据设备像素比 设置不同大小的图
```css
  bg-image($url)
  background-image: url($url + "@2x.png")
  @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3)
    background-image: url($url + "@3x.png")
```

## 动画
```css
p {
  animation-duration: 3s;
  animation-name: slidein;
  animation-iteration-count: infinite;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%; 
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```