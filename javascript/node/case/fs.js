/**
 * Created by Administrator on 2017/8/6.
 */
var fs = require('fs');

var content = false;
console.log("__dirname===>" + __dirname);
fs.readFile(__dirname + '/' + 'data.txt', 'utf8', function(err, data) {
    if ( ! err) {
        content = data;
    }

    console.log(content);
});
