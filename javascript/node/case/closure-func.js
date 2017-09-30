//js中函数也是可以当成变量 赋值
//连读读写文件  避免回调过度的一种机制
// 使用闭包动态生成函数体
// 这有点像是一种代码生成代码的感觉


var fs = require('fs');

var f = function() {

};

var n = 5;
var data = 'test closure';

for (var i=n-1; i>=0; --i) {
    f = function(g, j) {
        return function() {
            fs.open('data.txt' + j, 'w', '0666', function (err, fp) {
                fs.write(fp, data, null, function() {
                    fs.close(fp, function(err){
                        g();//f通过闭包，变成了引用变量，每次循环  引用到完整的f
                    });
                });
            });
        }
    }(f, i);
}
f();
