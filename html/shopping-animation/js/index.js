/**
 * Created by Jepson on 2017/11/10.
 */

// 初始化
$(function() {
  // 注意: 我们这边实现的动画, 是以叙事的方式, 进行设计的
  // 所以每一屏幕的动画应该只执行一次
  // flag2 = true 表示第二屏幕动画, 还没有执行过, 可以执行
  var flag2 = true;
  var flag3 = true;
  var flag4 = true;
  var flag5 = true;
  var flag6 = true;
  var flag7 = true;
  var flag8 = true;
  
  $("#shopping").fullpage({
    // 内容不垂直居中
    verticalCentered: false,
    // 导航栏
    navigation: true,
    // 回调函数
    // afterLoad 滚动到某一屏幕的回调函数
    // 参数1: anchorLink (做文字导航的, 这边用不到)
    // 参数2: index (当前第几屏) 从 1 开始
    afterLoad: function( anchorLink, index ) {
      console.log( "当前滚动到第" + index + "屏了" );
      
      // 第 2 屏动画, index === 2 说明, 进入第 2 屏
      if ( index === 2 && flag2 ) {
        // 如果 flag2 true 说明 动画还没有执行过, 可以执行
        flag2 = false;
        
        // 动画分析:
        // 1. 搜索框容器, 从右边飞到中间
        // 2. 文字慢慢显示出来
        // 3. 变小, 往右上走
        // 4. 商品栏显示出来
        // 5. 提示文本显示
        
        
        // 分析: 由于动画很多, 而且是不同盒子的动画, 涉及到很多步骤, 有先后顺序
        //       css 动画实现不太合适, 通过 jquery 动画函数来实现
        
        // 方式1: 通过jquery动画回调函数, 来实现动画的不同步骤执行
        //        下一个动画要等上一个动画执行完成, 再执行, 只能写在回调函数中
        //        动画很多以后(十几个动画), 层层嵌套, 代码可维护极差
        //        业界俗称: 回调地狱
        
        // 方式2: 通过 jquery delay 方法, 通过控制时间轴, 来控制动画先后顺序
        
        // 1. 搜索框容器, 从右边飞到中间
        $('.two-search-wrapper').animate({
          marginLeft: 0
        }, 1000);
        
        // 2. 文字慢慢显示出来
        // css 奇淫技巧, 换一张图片, 来进行缩放移动
        $('.two-search-words').delay(1000).fadeIn(500, function() {
          // 换图片
          $('.two-search-wrapper').hide();
          $('.two-search-copy').show();
        });
        
        // 3. 让假图片往右上角飞
        $('.two-search-copy').delay(1500).animate({
          width: 150,
          bottom: 450,
          marginLeft: 200
        }, 500);
        
        // 4. 商品栏显示
        // 图片如果没有设置宽高, 是不能渐变宽高的
        // jquery 的 show 本质上就是改变了宽高, 和透明的
        // 如果不设置宽高, 会瞬间崩出来
        $('.two-goods').delay(2000).show(1000);
        
        // 5. 提示文本显示
        $('.two-words').delay(3000).fadeIn(500);
        
      }
      
      // 第 5 屏动画, index === 5 说明, 进入第 5 屏
      if ( index === 5 && flag5 ) {
        flag5 = false;
        
        // 动画分析:
        // 1. 手上来, bottom 0
        $('.five-hand').animate( { bottom: 0 }, 1000 );
        
        // 2. 戳鼠标
        $('.five-mouse-active').delay(1000).fadeIn(500);
        
        // 3. 沙发掉下来 bottom: 100px; 还要改透明度
        // 沙发进入第 5 屏幕, 有两个动画, delay1500, animate500
        $('.five-sofa-rotate').delay(1500).animate( {
          bottom: 100,
          opacity: 1
        }, 500 );
        
        // 4. 订单往上跑 bottom: 370px
        $('.five-order').delay(2000).animate({ bottom: 370 }, 500);
        
        // 5. 文字淡入
        $('.five-words').delay(2500).fadeIn(500);
      }
    },
    
    // onLeave 当你离开屏幕的时候出发
    // 接收 index、nextIndex 和 direction 3个参数
    // 参数1: index 当前离开的是第几屏幕
    // 参数2: nextIndex 下一个即将到达的屏幕是第几屏
    // 参数3: direction 方向 up down
    onLeave: function( index, nextIndex, direction ) {
      console.log( "当前离开第" + index + "屏,  即将进入" + nextIndex + "屏");
      
      // 动态获取全屏高度
      var screenHeight = $(window).height();
      
      // 跨屏动画
      // 第 2 屏到 第 3 屏
      if( index === 2 && nextIndex === 3 && flag3 ) {
        flag3 = false;
        
        // 执行动画
        
        // 移动到 第 3 屏的时候,
        // 让上面的商品瞬间显示, 因为这有商品栏显示了, 沙发才能往下掉
        $('.two-goods').show();
        
        // 让假的掉下来
        // 1. 让白色蒙层显示, 让假沙发先显示, 掉下来
        $('.two-cover').show();
        $('.two-only-sofa').show().animate({
          bottom: -screenHeight + 220,
          width: 207,
          height: 207,
          marginLeft: -125
        }, 500);
        
        
        // 2. 让 active 显示
        $('.three-sel-active, .three-btn-active').delay(500).fadeIn(500);
      };
      
      
      // 第 3 屏到 第 4 屏
      if ( index === 3 && nextIndex === 4 && flag4 ) {
        flag4 = false;
        
        // 动画分析,
        // 1. 斜着的显示, 横着的消失, 往下掉
        //   掉下来就, 偷天换日, 换图片
        $('.two-only-sofa').hide();
        $('.three-sofa-rotate').show().animate({
          bottom: -screenHeight + 240,
          marginLeft: -185
        }, 500, function() {
          // 让掉下来的隐藏
          $('.three-sofa-rotate').hide();
          // 让藏在沙发中的显示
          $('.four-sofa-rotate').show();
        });
        
        // 2. 载着沙发狂奔
        $('.four-car-wrapper').delay(500).animate({
          left: "100%"
        }, 2000, "easeInBack");
        
        // 3. 沙发奔出去后, 地址容器显示, 文本active显示
        $('.four-address-wrapper, .four-words-active').delay(2500).fadeIn(500);
        
      }
      
      // 第 5 屏到 第 6 屏
      if ( index === 5 && nextIndex === 6 && flag6 ) {
        flag6 = false;
        
        // 第 5 屏的斜沙发, 掉到第 6 屏幕
        // 缩小(宽高), 先掉一整屏
        // 1. 沙发缩小, 掉下来, 掉到位, 就可以隐藏了
        // 为了让沙发和箱子动画同步执行, 这里执行动画的时候, 前面不能不能有动画了
        // (1)需要清除动画队列
        // (2)需要重置透明度
        $('.five-sofa-rotate').stop(true).css("opacity", 1).animate({
          bottom: -screenHeight + 460,
          width: 50,
          height: 50
        }, 500, function() {
          $(this).hide();
        });
        
        // 2. 箱子接住掉下来的沙发, 跟掉下来的动画同时执行
        //    箱子接着往下掉
        //    /*margin-left: -210px;*/
        $('.six-box').animate({
          marginLeft: -210
        }, 500).animate({
          bottom: 30
        }, 500)
        
        // 3. 1000ms 后文字显示
        $('.six-address').delay(1000).fadeIn(500);
        
        
        // 4. 1500ms 后 小车往右边跑
        // 小车车跑起来, 其实是背景在往左跑
        // 其实改的就是背景定位 backgroundPositionX 20% -> 100%
        // 注意: 合写属性, jquery不支持动画, jquery 只支持对数值进行动画
        // 这里一定要写 backgroundPositionX
        $('.page6').delay(1500).animate({
          backgroundPositionX: "100%"
        }, 2000);
        
  
        
      }
    }
  });
  
  
  // 给下一屏幕绑定点击事件
  $('.next').click(function() {
    // 调用 fullpage 提供的方法, 切换到下一屏
    // moveSectionDown()	向下滚动
    // 注意: 调用方式, $.fn.fullpage.方法
    // jquery 在进行插件扩展的时候, 方法是绑定jquery原型上的
    $.fn.fullpage.moveSectionDown();
  })
})
