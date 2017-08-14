//存疑 node的setTimeOut 绑在哪个对象上

// closure 优点  实用的场景
//函数以及函数可以访问的变量的总和  
//感觉很像是 面向对象的私有变量，通过方法可以控制

//这种变量除了普通值类型  函数  对象等都是可以通过闭包，保护起来的；

//from master javascript
        // closures and looping
       for (var i=1; i<=5; i++) {
            setTimeout( function delay(){
               console.log( i );
            }, i*100);
       }

       //以上等价于
       // for (var i=1; i<=5; i++) {
       // 		var func = function() {
       // 			console.log(i);
       // 		};
       // 		setTimeOut(func, i+100);
       // }

       //  //打印都是5 是多个引用  但是这个地方 i 是引用了  最后i的改变影响到了所有闭包中的i的值
       // for (var i=1; i<=5; i++) {
       //     (function(j){
       //         setTimeout( function delay(){
       //             console.log( j );
       //         }, j*100);
       //     })( i );
       // }