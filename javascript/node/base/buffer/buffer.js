//copy an ASCII string into a buffer , one byte at a time
var str = "aksjflaksfja;lsdkfjldskjflaskjl;sdfk" +
    "ajlfsdkjsaldkj" +
    "asjdfkalfsdjalsdkjasfldkjasflkjs" +
    "alsdkfjlsdfjskkkkkkkkl;k''lhlkhkjhlkjhlkjhlkjhlkjhkjl;skflafsjlsalksfjalsdkfja;" +
    "sldkfjasflkjaslfkjasfldkjalfsjkl" +
    "asdfkljaslfkjsaldkfjlkdjfaklsdjfklfdjk" +
    "slkdafjlafskjdlsfdkjlsfdkasldfkjklasdkfjasdkfj" +
    "asfjdklaksdjlsdk" +
    "alsdkfjlakfsdjlksdjlaksdlakjsdlsdkjlskdfjalfsdksfd" +
    "asldjkfljjjjjjjjjjffffffffffffffffffff" +
    "jjjjjjjjjjjjjjjjjjjjjjk";
var buf = new Buffer(str.length);
//The values refer to individual bytes, so the legal range is between 0x00 and 0xFF hex or 0 and 255.
//一个值 就是站一个一个字节 2的8次方   所有这个方法只能是 写  ascii编码的字符 ，其他编码字符，用多个字节的组合
//的 所以这种赋值方式就不适合了
//这也说明了 Buffer里存放数据的方式  一个key里存一个字节，所以其他语言中 byteArray
for (var i = 0; i < str.length; ++i) {
    buf[i] = str.charCodeAt(i);
}
console.log(buf);
console.log(buf.toString());

//Buffer.isBuffer(obj)# 测试  obj是否是Buffer对象

