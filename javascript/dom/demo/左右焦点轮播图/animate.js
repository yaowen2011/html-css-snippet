/**
 * Created by HUCC on 2017/9/21.
 */
function animate(element, target, num) {
  clearInterval(element.timer);
  element.timer = setInterval(function () {
    //让盒子每次在原来的基础上移动 10px
    var leader = element.offsetLeft;
    var step = target > leader ? num : -num;

    //只有当距离超过step的时候，才运行，否则，清除定时器
    if (Math.abs(leader - target) >= Math.abs(step)) {
      leader += step;
      element.style.left = leader + "px";
    } else {
      clearInterval(element.timer);
      element.style.left = target + "px";
    }

  }, 15);
}