## 一些不错的js片段
- 数组去重
``````javascript
    //去重
    Array.prototype.unique = function() {
        this.filter((e, i) => this.indexOf(e) ===i )
    }
``````
    

- 字符串首字母大写
``````javascript
    //首字母大写
    function (string) {
        var [first, ...tail] = string;
        return first.toUpperCase() + tail.join('')
    }
``````

- 获取自增id
``````js
function getId(heroes: Hero[]): number {
    let heroes = [
        {id: 11, name: 'james bond'},
        {id: 12, name: 'james bond'},
        {id: 13, name: 'james bond'},
        {id: 14, name: 'james bond'},
    ]
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
}
``````

-  实现返回页面顶部
``````JavaScript
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

