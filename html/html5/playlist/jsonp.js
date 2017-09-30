
/**
 * Created by Administrator on 2017/7/30 0030.
 */
var animal = {"type": "cat", "sound": "meow"};
animalSays(animal);//jsonp  跨域 给客户端回调
//<script src="http://wickedlysmart.com/hfhtml5/chapter6/dog.js?callback=animalSays"></script>
if (oldScriptElement == null) {
    head.appendChild(newScriptElement);
} else {
    head.replace(oldScriptElement, newScriptElement);
}
//浏览器 是实时监听dom结构改动的  添加script 会 即时的去请求