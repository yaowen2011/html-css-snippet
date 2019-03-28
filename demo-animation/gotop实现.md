``````JavaScript
// 实现返回页面顶部
//返回顶部
gotop:function(){
  let speed = 10;
  let timer = setInterval(function(){
    if(document.body.scrollTop>0){
      document.body.scrollTop = document.body.scrollTop-speed > 0 ? document.body.scrollTop-speed : 0 ;
      speed += 20;      
    }else{
      clearInterval(timer)
    }       
  },16)
}      
``````