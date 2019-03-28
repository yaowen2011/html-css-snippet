// 函数自调用 可以防止全局变量的污染 让代码模块化
// 添加分号是为了防止代码合并的时候出错
;(function(){
	
	// 需求：动态改变jd-header的透明度
	// 思路：
	// （1）主要逻辑在scroll事件里面
	// （2）找到比例关系：不断改变的scrollTop/自己设定的最大scroll值 = 不断改变的透明度/最大的透明度

	var topBar = document.querySelector('.jd-header');
	// 自己设定的最大卷曲值
	var maxTop = 400;
	window.onscroll = function(){
		// 获取不断变卷曲的头部
		var scrollTop = window.pageYOffset;

		if(scrollTop > maxTop){
			// 让topbar的透明度定死在最大值
			topBar.style.backgroundColor = 'rgba(201, 21, 35, 0.8)';
		}else{
			// 通过scrollTop得到这个scrollTop对应的透明度
			topBar.style.backgroundColor = 'rgba(201, 21, 35, '+ scrollTop/maxTop*0.8 +')';
		}
	}

	// 动态求ul的宽度
	var ul = document.querySelector('.sec-b > ul');
	var lis = ul.querySelectorAll('li');
	ul.style.width = lis[0].offsetWidth * lis.length + 'px';

})()

// 京东快报轮播图
;(function(){

	//  需求：做一个无缝轮播 
	//  思路：
	//  （1）复制一个临时工追加到最后面
	//  （2）开定时器 每一次让ul往上走一个li的高度
	//  （3）每一次ul的过渡执行完了，去瞅瞅index为几，当走到临时工的时候，立马掉包去第0个

	var scrollWrap = document.querySelector('#scrollWrap');
	var ul = scrollWrap.querySelector('ul');
	var lis = ul.querySelectorAll('li');
	var lisHeight = lis[0].offsetHeight;
	var timer = null;
	// 设置信号量
	var index = 0;
	// 将第0个li元素复制追加到ul里面去
	ul.appendChild(lis[0].cloneNode(true));

	// 开启定时器
	timer = setInterval(function(){
		// 信号量自增一
		index++;
		// 添加过渡
		// 细节：过渡的时间一定要小于定时器的时间
		ul.style.transition = 'transform .5s';
		// 每一次让ul自己往上走一个li的高度
		ul.style.transform = 'translateY('+ -index*lisHeight +'px)'
	}, 1000);

	// 在过渡结束的时候去看看index为几 如果index为6的时候，立马掉包
	ul.addEventListener('transitionend',function(){
		// console.log(lis.length - 1);
		// 这里打印出来的是5 而不是我们所认为的6 why？？
		// 细节1：这里的lis是没有包括克隆的那个临时工的，所以，这里的length得到的是6 正好不需要-1
		// 细节2：过渡结束事件在浏览器切换窗口的时候不执行（浏览器为了性能考虑），所以这里需要用>=
		if(index >= lis.length){
			index = 0;
			// 干掉过渡，因为我们要的是“干嘣”回去，而不是滑获取
			ul.style.transition = 'none';
			// 回到最初的起点
			ul.style.transform = 'translateY('+ -index*lisHeight +'px)';
		}
	})

})()

// 倒计时模块
;(function(){

	// 倒计时的当前时间来源于服务器，因为前台的new Date 不安全 是本地时间，可以直接改
	
	// 需求：倒计时
	// 思路：
	// （1）获取当前时间和目标时间，两个时间相减得到的是毫秒数
	// （2）将毫秒数转换成秒数
	// （3）开启定时器 每一秒将得到秒数自减一
	// （4）将定时器里面的秒数转换成 时  分  秒
	// （5）得到的时 分 秒 代入到对应的span里面

	var spans = document.querySelectorAll('.sec-time > span');

	// 当前时间
	var nowTime = new Date();
	// 目标时间
	var furTime = new Date('Aug 22 2017 17:30:00');

	var timer = null;
	// 将得到的毫秒转换成秒数
	var time = parseInt((furTime - nowTime)/1000);

	timer = setInterval(function(){
		// 让秒数自减一
		time--;
		// 极值判断
		if(time < 0){
			clearInterval(timer);
			return false;
		}

		// 将得到的s转换成 天 时  分  秒 
		// 公式：
		// 天 Math.floor(time/86400)
		// 时 Math.floor(time%86400/3600)
		// 分 Math.floor(time%3600/60)
		// 秒 Math.floor(time%60)

		// 将得到的s转换成 时  分  秒
		var h = Math.floor(time/3600);
		var m = Math.floor(time%3600/60);
		var s = Math.floor(time%60);

		// 将得到的时候代入到span里面
		// 方法一
		/*spans[0].innerHTML =  Math.floor(h/10);
		spans[1].innerHTML =  Math.floor(h%10);
		spans[3].innerHTML =  Math.floor(m/10);
		spans[4].innerHTML =  Math.floor(m%10);
		spans[6].innerHTML =  Math.floor(s/10);
		spans[7].innerHTML =  Math.floor(s%10);*/

		// 方法二
		var str = toTwo(h) + ':' + toTwo(m) + ':' + toTwo(s);
		for(var i = 0; i < str.length; i++){
			spans[i].innerHTML = str[i];
		}


	}, 1000);

	// 补0函数
	function toTwo(n){
		return n > 9 ? n : '0' + n;
	}

})()

// 轮播模块
;(function(){

	// css准备工作
	// （1）核心 是将所有的li元素用定位去实现
	// （2）因为所有的li定位了，所以ul设置一个最小高，后期到JS里面动态去求
	// （3）创建小圆点的样式（让一个位置的宽度盒子水平居中 两种方法：利用transform：transalteX（-50%）或者利用行内块配合父容器的text-align：center去控制）
	// （4）让所有的li都到屏幕外面去
	// （5）移动元素的时候不要用left去移动，用transform去移动，这样不会改变原点（说白了，给这个元素加个transform：translateX（0px）就可以回到原点）
	
	// JS准备工作
	// （1）动态设置ul的高度
	// （2）动态创建小圆点
	
	// 自动轮播的逻辑
	// （1）设置三个基本的位置变量 将三个基本下标赋值
	// （2）三个基本下标：最后一个li的下标  0 1
	// （3）执行归位操作
	// （4）开启定时器，轮转下标，极值判断，添加过渡，执行归位 ，设置原点

	var carouselWrap = document.querySelector('.carouselWrap');
	var ul = carouselWrap.querySelector('ul');
	var lis = ul.querySelectorAll('li');
	var lisHeight = lis[0].offsetHeight;
	var points = carouselWrap.querySelector('.points');
	var timer = null;
	// 屏幕的宽度
	var screenWidth = document.documentElement.offsetWidth;
	//  动态设置ul的高度
	window.onresize = function(){
		lisHeight = lis[0].offsetHeight;
		ul.style.height = lisHeight + 'px';
		screenWidth = document.documentElement.offsetWidth;
	}
	ul.style.height = lisHeight + 'px';
	
	// 动态创建小圆点
	for(var i = 0; i < lis.length; i++){
		var li = document.createElement('li');
		// 初始化第一个小圆点的时候添加上当前类
		if(i == 0){
			li.classList.add('active');
		}
		points.appendChild(li);
	}

	// 轮播的自动轮播的逻辑
	var left = lis.length - 1;
	var center = 0;
	var right = 1;

	// 归位
	setTranslateX();

	timer = setInterval(showNext, 1000);

	function showNext(){

	    left = center;  // left = 0
	    center = right; // center = 1
	    right++;	// right = 2

	    // 极值判断 这里需要-1 因为没有临时工
	    if(right > lis.length - 1){
	    	right = 0;
	    }
	    // 添加过渡 
	    // 细节  过渡的时间不要大于定时器的时间
	   	// 右边的图片永远是替补的哪一张（为了下一次的移动做准备）
	   	// 所以右边的图片不需要添加过渡
	   	setTransition(1,1,0);
	    // 归位
		setTranslateX();
		// 设置小圆点
		setPoints();
	}
	function showPrev(){

	    right = center;  // left = 0
	    center = left; // center = 1
	    left--;	// right = 2

	    // 极值判断 这里需要-1 因为没有临时工
	    if(left < 0){
	    	left = lis.length - 1;
	    }

	    // 添加过渡 
	    // 细节  过渡的时间不要大于定时器的时间
	    // 左边的图片永远是替补的哪一张（为了下一次的移动做准备）
	   	// 所以左边的图片不需要添加过渡
	   	setTransition(0,1,1);
	    // 归位
		setTranslateX();
		// 设置小圆点
		setPoints();
	}
	// 获取小圆点  一定要先创建在获取
	var pointsLi = points.querySelectorAll('li');
	function setPoints (){
		// 排他 给所有的小圆点去掉当前类
		for(var i = 0; i < pointsLi.length; i++){
			pointsLi[i].classList.remove('active');
		}
		// 给当前的小圆点添加当前类
		pointsLi[center].classList.add('active');
	}

	// 手滑操作
	// 核心：获得滑动的距离
	// （1）给最大的盒子绑定touch事件
	// （2）在touchstart里面获取手指的落点 并且清除定时器
	// （3）在touchmove里面得到差值，并且清除过渡，将原始的位置加上差值（这里面直接+ 因为差值自带正负）
	var startX = 0;
	var startTime = null;

	carouselWrap.addEventListener('touchstart',touchstartHandler);
	carouselWrap.addEventListener('touchmove',touchmoveHandler);
	// 在end的时候，需要判断滑动是否成功
	// 滑动成功的依据：滑动的距离是否超过屏幕的1/3或者滑动的时间小于300ms同时滑动距离大于30
	// 如果成功，需要再一次判断，判断方向 ，如果是左滑，看到的下一张，反之 看到的是上一张
	// 如果失败了，在弹回原位
	carouselWrap.addEventListener('touchend',touchendHandler);
	// 滑动开始的逻辑
	function touchstartHandler (e){
		// 开始的时候设置一个时间
		startTime = new Date();
		// 清除定时器
		clearInterval(timer);
		// 获取手指的水平落点
		startX = e.changedTouches[0].clientX;
	}
	// 滑动持续的逻辑
	function touchmoveHandler(e){
		// 得到滑动的差值  这个值自带正负
		var dx = e.changedTouches[0].clientX - startX;

		// move事件里面不需要添加过渡
		// 所有的元素都不需要过渡
		setTransition(0,0,0);
		// 归位
		setTranslateX(dx);
	}
	// 滑动结束
	function touchendHandler (e){
		// 获取差值
		var dx = e.changedTouches[0].clientX - startX;
		// 得到时间差
		var dTime = new Date() - startTime;
		if(Math.abs(dx) > screenWidth/3 || (dTime < 300 && Math.abs(dx) > 30) ){
			// 滑动成功
			// 需要再一次判断，判断方向 ，如果是左滑，看到的下一张，反之 看到的是上一张
			if(dx > 0){
				// 向右划  看到上一张
				showPrev();
			}else{
				// 向左划  看到下一张
				showNext();
			}
		}else{
			// 滑动失败
			// 添加过渡
			setTransition(1,1,1);
			// 归位
			setTranslateX();
		}

		clearInterval(timer);
		timer = setInterval(showNext, 1000);
	}
	// 归位函数
	function setTranslateX(dx){
		// 如果传递了dx就使用dx  如果没有则使用0
		dx = dx || 0;
		lis[left].style.transform = 'translateX('+ (-screenWidth+dx) +'px)';
		lis[center].style.transform = 'translateX('+ dx +'px)';
		lis[right].style.transform = 'translateX('+ (screenWidth+dx) +'px)';
	}
	// 封装过渡
	function setTransition(a,b,c){
		if(a){
			lis[left].style.transition = 'transform .5s';
		}else{
			lis[left].style.transition = 'none';
		}
		if(b){
			lis[center].style.transition = 'transform .5s';
		}else{
			lis[center].style.transition = 'none';
		}
		if(c){
			lis[right].style.transition = 'transform .5s';
		}else{
			lis[right].style.transition = 'none';
		}
	}


})()




