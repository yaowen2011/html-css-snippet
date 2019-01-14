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

