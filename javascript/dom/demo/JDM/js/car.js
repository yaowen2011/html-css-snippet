;(function(){

	//（1）需求 点击所有的checkbox切换checked这个类
	var checkboxWrap = document.querySelectorAll('.checkbox-wrap');

	for(var i = 0; i < checkboxWrap.length; i++){

		checkboxWrap[i].addEventListener('click', function(){
			// 点击谁切换谁
			this.classList.toggle('checked');

		})

	}

	// 需求 点击全选按钮控制所有的checkbox
	// 细节：绑定的时候不要用on去绑定 因为这样会让前面的on覆盖掉
	var inputCheck = document.querySelectorAll('input[type="checkbox"]');
	checkboxWrap[0].addEventListener('click',function(){

		// 先让看看自己身上的状态
		if(this.classList.contains('checked')){
			// 让所有的checkbox勾选上
			for(var i = 1; i < checkboxWrap.length; i++){
				// 让所有的checkbox都加上checked这个类
				checkboxWrap[i].classList.add('checked');
				// 让所有的input都设置为true
				inputCheck[i].checked = true;
			}
		}else{
			// 让所有的checkbox都取消
			for(var i = 1; i < checkboxWrap.length; i++){
				// 让所有的checkbox都移除checked这个类
				checkboxWrap[i].classList.remove('checked');
				// 让所有的 input都设置为false
				inputCheck[i].checked = false;

			}
		}

	})


	// 垃圾桶动画
	var del = document.querySelectorAll('.del');
	var modal = document.querySelector('.modal');
	var detT = null;
	for(var i = 0; i < del.length; i++){

		del[i].addEventListener('click',function(){

			// 让自己的垃圾桶盖子做动画
			detT = this.querySelector('.del-t');
			// 改变盖子的css
			detT.style.transform = 'rotate(-15deg) translateX(-2px)'

			// 让模态框显示出来
			modal.style.display = 'block';

		})

	}

	// 点击取消按钮  隐藏模态框
	var cancel = document.querySelector('.cancel');

	cancel.addEventListener('click',function(){
		// 关闭模态框
		modal.style.display = 'none';
		// 让盖子归位
		detT.style.transform = 'none';
	})

	// 加减运算
	var jia = document.querySelectorAll('.jia');
	var jian = document.querySelectorAll('.jian');
	// 给所有的加号和减号绑定点击事件
	for(var i = 0; i < jia.length; i++){

		jia[i].addEventListener('click',function(){
			// 找到点击的那个加号对应的input值
			// 传递一个标识进来确定点击的是加号还是减号
			// 将当前的this传递进去
			setNum('jia',this);
		})
		jian[i].addEventListener('click',function(){
			setNum('jian',this);
		})

	}
	// 封装setNum
	// tips代表传递过来的标识，根据标识确定是那个元素
	// this代表之前点击的DOM对象，根据这DOM对象去找元素
	function setNum(tips,_this){
		var numInput = _this.parentNode.children[1].children[0];
		var num = numInput.value
		if(tips == 'jia'){
			num++;
		}else{
			num--;
			if(num <= 1){
				num = 1;
			}
		}
		numInput.value = num;
	}

})()