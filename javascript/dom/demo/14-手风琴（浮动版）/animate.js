/**
 * Created by HUCC on 2017/9/10.
 */
function animate(element, obj, fn){
  clearInterval(element.timer);
  element.timer = setInterval(function () {

    var flag = true;
    for(var k in obj){
      var style = k;
      var target = obj[k];

      var leader = getStyle(element, style);
      leader = parseInt(leader) || 0;
      var step = (target - leader)/10;
      step = step>0?Math.ceil(step):Math.floor(step);

      leader += step;
      element.style[style] = leader + "px";

      if(leader != target) {
        flag = false;
      }
    }
    if(flag){
      clearInterval(element.timer);
      fn && fn();
    }

  },15);
}

//获取任意元素的任意样式
function getStyle(element, style) {
  if("getComputedStyle" in window){
    return window.getComputedStyle(element, null)[style];
  }else {
    return element.currentStyle[style];
  }
}