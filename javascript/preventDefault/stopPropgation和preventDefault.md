## 解决滑动浏览器报 Unable to preventDefault inside passive event
- 由于浏览器无法预先知道一个事件处理函数中会不会调用 preventDefault()，它需要等到事件处理函数执行完后，才能去执行默认行为，然而事件处理函数执行是要耗时的，这样一来就会导致页面卡顿，也就是说，当浏览器等待执行事件的默认行为时，大部分情况是白等了。
[参考](https://www.jianshu.com/p/04bf173826aa)
``````javascript
// 方法一：
// 使用这种方式，明确告诉浏览器：自己调用preventDefault 来阻止默认滑动行为
elem.addEventListener(
  'touchstart',
  fn,
  { passive: false }
);
``````
// 方法二：
// * { touch-action: pan-y; }

## e.preventDefault() 那些事默认行为
- 该方法将通知 Web 浏览器不要执行与**事件关联**的默认**动作**(如果存在这样的动作)
- 比如： 阻止表单提交，阻止链接跳转，阻止菜单右键默认样，选中文字，图片拖动
[参考](https://www.cnblogs.com/liugang-vip/p/5315787.html)
``````javascript
// 右键，阻止浏览器的默认菜单
$('.wfsjs1').contextmenu(function(event) {
  event.preventDefault();

  var video = $(this).find("video")[0];

  global["activeid"] = video.id;

  global["activenum"] = video.value;

  $("#myMenu")[0].style.display = "block";

  $("#myMenu")[0].style.top = event.clientY + "px";

  $("#myMenu")[0].style.left = event.clientX + "px";

});
`````` 

