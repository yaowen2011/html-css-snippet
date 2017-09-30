/**
 * 水平方向匀速动画
 * @param element
 * @param target
 * @param num
 */
function animate(element, target, num) {
    //清除定时器
    clearInterval(element.timer);
    element.timer = setInterval(function () {
        //获取当前位置
        var leader = element.offsetLeft;//只读属性

        var step = target > leader ? num : -num;

        //剩余的距离
        if (Math.abs(target - leader) > Math.abs(step)) {
            leader += step;
            element.style.left = leader + "px";
        } else {
            clearInterval(element.timer);
            //手动补足剩余的距离
            element.style.left = target + "px";
        }

    }, 15);
}

/**
 * 水平方向减速运动
 * @param element
 * @param target
 */
function animateSlowDown(element, target) {
    //清除定时器
    clearInterval(element.timer);

    element.timer = setInterval(function () {
        //移动对象当前位置
        var leader = element.offsetLeft;//read only

        var step = (target - leader) / 10; //刚开始距离比较大，对应步长也比较大, 所以开始移动较快

        step = step > 0 ? Math.ceil(step) : Math.floor(step);

        if (Math.abs(step) > 0) {
            leader += step;
            element.style.left = leader + "px";
        } else {
            clearInterval(element.timer);
            //最后的移动是像素级的  不用手动置
        }
    }, 15);
}