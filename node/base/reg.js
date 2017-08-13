var pattern = /s$/;//创建了新的 RegExp 对象

var pattern1 = /[a-zA-Z0-9]/;//匹配所有的字母 数字

//[^a-c] 不在abv的字符 除了换行和其他unicode行终止

//	基本单位
// 	. 
//  \w = /[a-zA-Z0-9]/ 
//  \W = /[^a-zA-Z0-9]/ 
//  \s =  空白符 ：任何unicode
//	\S =  空白符 ：任何非unicode
//  \d = [0-9]
//  \D = [^0-9]

//	加上量词
//	{n}  n次
// 	{n,m}	>=n && <=m 次
//	{n,}	>=n
//  * = {0,}
// 	+ = {1,}
//	? = {0,1}

var pattern2 = /\d{2,4}/; //匹配2~4个数字

//贪婪模式
// /a+/ 与 /a+?/ 通过后面跟  ？ 关闭贪婪模式

//选择 分组 引用
// /ab|cd|df/
// /java(script)?/
// /(ab|cd)+|ef/  思路 单元+量词

	//存疑  ()

//修饰符
//i 不区分大小写
//g 找出被检索字符串中 所有的结果
//m 除了匹配整个字符串，还会匹配每行的开始和结尾
	//如/java&/im   java  以及  java\nis fun 都能匹配到

//String 对象一些执行正则的方法,共4种
var pos = "JavaScript".search(/script/i);//会忽略g
console.log(pos);//

var text = "JavaScript language";
var newtext = text.replace(/JavaScript/gi, "php");
console.log(newtext);		//注意原来的字符串  是不会变的 

var newtext = text.replace('language', "语言");
console.log(newtext);

var text = "1 plus2 equals 3".match(/\d+/g);
console.log(text);

var text = "1 plus2 equals 3".match(/\d+/);
console.log(text);

"123,456,789".split(",");


//RegExp对象上的正则方法
var pattern = /Java/g;
var text = "JavaScript is a fun language";
var newtext = pattern.exec(text);
console.log(newtext[0]);



