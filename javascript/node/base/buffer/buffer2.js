var buf = new Buffer(1024);

console.log(buf.length);
//It does not change when the contents of the buffer are changed

buf.write('some string中文', 0, 'utf8');
//buf.write('some string中文', 0, 'ascii');
console.log(buf.length);
console.log(buf.toString());

console.log('buffer的长度申请完后，是不会变的');

var b = new Buffer(10);
b.fill('中');//一个汉字三个字节 最后一个字节填充了值，但很显然，utf8的映射表中 找不到这个字节中的01组合对应的字
console.log(b.toString());

//字符串是只读的，并且对字符串的任何修
//改得到的都是一个新字符串，原字符串保持不变。
//byteArray 一个字节一个指针  操作起来灵活，尤其是动态接受存储时，字符串的一直会重开内存
//分段处理比较大的数据也是buffer的优点