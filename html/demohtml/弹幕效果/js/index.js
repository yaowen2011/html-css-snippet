//轮播图控制
;(function () {
    var carousel = document.querySelector(".carousel");
    var ul = document.querySelector(".carousel ul");
    var imgList = document.querySelectorAll(".carousel img");

    var pointList = document.querySelectorAll(".carousel ol li");

    var imgWidth = imgList[0].offsetWidth;

    var arrowR = document.querySelector(".carousel .arrow-r");
    var arrowL = document.querySelector(".carousel .arrow-l");
    //点击小圆点切换图片
    var count = 0;//当前显示第几张图片
    for (var i = 0; i < pointList.length; ++i) {
        //存储下标
        pointList[i].index = i;
        pointList[i].onclick = function () {


            //修复tb首页bug
            //修改count
            if (count >= imgList.length - 1) {
                count = 0;
                ul.style.left = 0;
                return ;
            } else {
                count = this.index;
            }

            animateSlowDown(ul, -this.index * imgWidth, 50);
            //修改小点点样式
            setCurrPointClass(this.index);
        }
    }

    //点击按钮切换图片
    //右侧按钮 确保右侧必须至少有一张隐藏图 才能播放
    arrowR.onclick = function () {
        if (count >= imgList.length - 1) {
            //整张图瞬移到 显示第一张图的位置
            ul.style.left = 0;
            count = 0;
        }
        count++;
        animateSlowDown(ul, -count * imgWidth, 50);

        //修改小点点样式
        if (count >= imgList.length - 1) {
            setCurrPointClass(0);
        } else {
            setCurrPointClass(count);
        }
    }

    //左侧按钮 左边必须至少有一张隐藏图才有效
    arrowL.onclick = function () {
        if (count <= 0) {
            count = imgList.length - 1;
            ul.style.left = - count * imgWidth + "px";
        }
        count--;
        animateSlowDown(ul, -count * imgWidth, 50);

        //修改小点点样式
        if (count >= imgList.length - 1) {
            setCurrPointClass(0);
        } else {
            setCurrPointClass(count);
        }
    }

    //图片自动播放

    function setCurrPointClass(index) {
        //clear all 排他
        for (var i = 0; i < pointList.length; ++i) {
            pointList[i].className = "";
        }

        pointList[index].className = "now";

    }
})();

//测试tool.js中方法
;(function () {
    var url = "http://www.jd.com/?name=xxx&age=18";
    console.log(getUrlParam(url));

    window.onscroll = function () {
        console.log(getPageScroll().top, 'scroll---');
    }

    window.onresize = function () {
        console.log(getClientWidth().width, 'innerWidth');
    }

})();