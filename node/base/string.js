
var s = "hello world,中文字符";

console.log(s.length);

console.log(s.charAt(0));

console.log(s.charAt(s.length-1));

console.log(s.substring(1,4));//位置1-位置4

console.log("s.substring(5)=>" + s.substring(5));

console.log(s.slice(1,4));//同上

console.log(s.slice(-3));//最后3位

console.log(s.indexOf('l'));//l第一次出现的位置

console.log(s.lastIndexOf("l"));

console.log(s.split(","));

console.log(s.replace("l", "L"));

console.log(s.toUpperCase());

//s 调用字符串 属性时 会

var s = "test";
s.len = 10;//这行执行完后，临时生成的String 对象，会被即时的销毁，导致后面无法再访问
console.log(s.len);

//函数 解析url中的参数成key=>value结构
var url = "http://www.baidu.com?a=1&b=2&c=3";
function parseUrl(url) {
	var pos = url.indexOf('?');
	var pairs = url.substring(pos+1).split('&');

	var args = {};
	for (var i=0; i<pairs.length; i++) {
		
		var pos = pairs[i].indexOf("=");
		if (pos == -1) continue;
	
		args[pairs[i].substring(0, pos)] = pairs[i].substring(pos);
	}

	return args;
}

console.log(parseUrl(url));

