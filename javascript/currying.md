## https://www.cnblogs.com/pigtail/p/3447660.html
- 核心思想还是 函数功能的存粹性质
- 将多个小函数组合成大的功能，再调用
```js
function currying(fn) {
            var slice = Array.prototype.slice,
            __args = slice.call(arguments, 1);
            return function () {
                var __inargs = slice.call(arguments);
                return fn.apply(null, __args.concat(__inargs));
            };
        }
```