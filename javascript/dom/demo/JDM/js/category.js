;(function(){

	// 需求：滑动的时候让ul跟随滑动
	// 思路： （1）获取滑动的距离
	// 		  （2）设置一个中间变量，这个变量的作用就是用来存储上一次滑动的位置
	// 需求2：在滑动的时候，需要将ul限制在一个区间里面，超出区间就将ul定死在那个位置上
	//	思路： （1）代码应该写在move里面
	//		   （2）找到区间  往下：不能超过50 往上-（ul的高度-aside的高度 + 50）
	// 需求3：在滑动结束的时候，去判断当前的位置是否超出反弹区间，如果超出，则ul反弹回去
	//	思路：	（1）反弹区间 ： 往下：只要大于0 就反弹
	//							 往上：-（ul的高度-aside的高度）
	
	var myScroll = new IScroll('#article');
	
	scroll('#aside');
	// scroll('#article');
	function scroll (element){
		var aside = document.querySelector(element);
		var scrollWrap = aside.children[0];

		// 如果说ul的高度小于aside的高度，什么都不做，后面的代码都不执行
		if(scrollWrap.offsetHeight <= aside.offsetHeight){
			return false;
		}

		aside.addEventListener('touchstart', touchstartHandler);
		aside.addEventListener('touchmove', touchmoveHandler);
		aside.addEventListener('touchend', touchendHandler);

		var startY = 0;
		// 这里一定要赋一个初始值
		var centerY = 0;

		// 往下的最大值
		var maxDown = 50;	
		// 往上的最大值
		var maxUp = -(scrollWrap.offsetHeight - aside.offsetHeight + maxDown);

		// 往下反弹区间值
		var maxBounceDown = 0;
		//  往上反弹区间值
		var maxBounceUp = -(scrollWrap.offsetHeight - aside.offsetHeight);

		function touchstartHandler (e){
			// 得到开始时候的手指Y落点
			startY = e.changedTouches[0].clientY;
		}
		function touchmoveHandler (e){
			// 得到差值（距离）
			var dy = e.changedTouches[0].clientY - startY;

			// 清除过渡
			scrollWrap.style.transition = 'none';

			// 极值判断
			// 这里需要利用centerY+dy去做极值判断
			var tempY = centerY + dy;

			if(tempY >= maxDown){
				tempY = maxDown;
			}else if(tempY <= maxUp){
				tempY = maxUp;
			}

			// 这里需要注意一个细节点：就是每一次滑动都应该基于上一次滑动的位置在加上当前这一次的滑动距离
			// 实现：设置一个中间变量 初始值为0
			scrollWrap.style.transform = 'translateY('+ tempY +'px)';

		}
		function touchendHandler (e){
			// 得到差值（距离）
			var dy = e.changedTouches[0].clientY - startY;
			// 在结束的时候将上一次滑动的最终位置赋值给centerY，以便下一次基于这个位置在加上下一次的滑动距离
			centerY += dy;
			// 反弹区间的检测
			// 在这里，直接拿centerY去做区间匹配
			if(centerY >= maxBounceDown){
				// 反弹回去
				// 添加过渡
				// 细节：同步centerY 
				centerY = maxBounceDown;
				scrollWrap.style.transition = 'transform 1s';
				scrollWrap.style.transform = 'translateY('+ centerY +'px)';
			}else if(centerY <= maxBounceUp){
				// 反弹回去
				centerY = maxBounceUp; 
				scrollWrap.style.transition = 'transform 1s';
				scrollWrap.style.transform = 'translateY('+ centerY +'px)';
			}

		}
	}

})()