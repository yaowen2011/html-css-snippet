;(function (window) {
    //伪数组借用数组的push和splice方法
    var arr = [];//Array.prototype;
    var push = arr.push;
    var splice = arr.splice;

    //jQuery.extend()工具类方法中的type部分代码预处理
    var toString = Object.prototype.toString;
    var types = "Number,String,Boolean,Null,Undefined,Array,Object,Function,Math,Date,RegExp".split(",");
    var class2type = {};
    for (var i = 0; i < types; i++) {
        var type = types[i];
        class2type["[object " + type + "]"] = type.toLowerCase();
    }
    /**
     * 获取dom元素的伪数组nodelist 不考虑兼容性问题；
     * @param selector
     * @returns {NodeList}
     * @constructor
     */
    var Sizzle = function (selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * 设置入口函数，返回F的实例对象
     * @param selector
     * @returns {*}
     */
    function jQuery(selector) {
        return jQuery.fn.F(selector);
    }

    /**
     * jQuery.prototype设置
     * @type {{constructor: jQuery, F: Function}}
     */
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        version: "0.0.1",
        F: function (selector) {
            if (jQuery.isString(selector)) {
                if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
                    //eg:$("<input>");
                    var div = document.createElement("div");
                    div.innerHTML = selector;
                    //for(var i =0;i<div.childNodes.length;i++){
                    //    var child = div.childNodes[i];
                    //    push.call(this.child);
                    //}
                    push.apply(this, div.childNodes);
                } else {
                    //eg:$("div")
                    splice.call(this, 0, this.length);
                    var elements = Sizzle(selector);
                    push.apply(this, elements);
                }
            } else if (selector.nodeType) {
                //鸭式辨型思想
                //this[0] = selector;
                //this.length = 1;
                push.call(this, selector);
            } else if (selector.version === this.version) {
                return selector;
            }
            return this;//实现链式编程
        }
    }

    /**
     * extend方法
     * @type {Function}
     */
    jQuery.fn.extend = jQuery.extend = function () {
        var argLen = arguments.length;
        var arg0 = arguments[0];
        var sources = [];
        var target;
        if (argLen === 0) return this;
        if (argLen === 1) {
            sources.push(arg0);
            target = this;
        } else {
            //for(var i=1;i<argLen;i++){
            //    sources.push(arguments[i]);
            //}
            push.apply(sources, arguments);
            target = arg0;
        }

        for (var i = 0; i < sources.length; i++) {
            var source = sources[i];
            for (var key in source) {
                target[key] = source[key];
            }
        }
        return target;
    }
    /**
     * 工具类方法，添加到jQuery中，使用$.方法名（）调用
     */
    jQuery.extend({
        //判断数据类型
        type: function (data) {
            return class2type[toString.call(data)];
        },
        //判断是不是字符串
        isString: function (str) {
            return jQuery.type(str) === "string";
        },
        //判断是不是函数
        isFunction: function (fn) {
            return jQuery.type(fn) === "function";
        },
        //抛出异常
        error: function (msg) {
            throw new Error(msg);
        },
        //去除字符串两边的空格
        trim: function (str) {
            return str.replace(/^\s+|\s+$/g, "");
        },
        //遍历（数组的遍历或者对象的遍历）
        each: function (array, callback) {
            var len = array.length;
            var i;
            if (typeof len === "number" && len >= 0) {
                for (i = 0; i < len;) {
                    if (callback.call(array[i], i, array[i++]) === false) {
                        break;
                    }
                }
            } else {
                for (i in array) {
                    if (callback.call(array[i], i, array[i]) === false) {
                        break;
                    }
                }
            }
        }
    })

    //jQuery.fn中的each方法：这样F的实例，即jQuery的对象拥有的each方法
    jQuery.fn.extend({
        each: function (callback) {
            jQuery.each(this, callback);
            return this;
        }
    })
    //css模块
    jQuery.fn.extend({
        css: function () {
            var argLen = arguments.length;
            var arg0 = arguments[0];
            var arg1 = arguments[1];
            if (argLen === 0) return this;
            if (argLen === 1) {
                if (jQuery.isString(arg0)) {
                    //表示获取第一个dom元素的css样式
                    var firstDom = this[0];
                    return window.getComputedStyle(firstDom, null)[arg0];
                } else {
                    //是一个对象的时候表示设置多个样式
                    //return this.each(function(){
                    //    var dom = this;
                    //    jQuery.each(arg0,function(styleName,styleValue){
                    //        dom.style[styleName] = styleValue;
                    //    })
                    //})
                    return this.each(function () {
                        jQuery.extend(this.style, arg0);
                    });
                }
            } else {
                //传递两个参数；设置单个css样式
                return this.each(function () {
                    this.style[arg0] = arg1;
                })
            }

        },
        //显示
        show: function () {
            return this.css("display", "block");
        },
        //隐藏
        hide: function () {
            return this, css("display", "none");
        },
        //切换显示和隐藏
        toggle: function () {
            return this.each(function () {
                var $this = $(this);
                $this.css("display") === "none" ? $this.show() : $this.hide();
            })
        }
    })
    //属性模块
    jQuery.fn.extend({
        attr: function (arg0, arg1) {
            var argLen = arguments.length;
            if (argLen === 0) return this;
            if (argLen === 1) {
                if (jQuery.isString(arg0)) {
                    //获取第一个dom元素的属性值
                    var firstDom = this[0];
                    return firstDom.getAttribute(arg0);
                } else {
                    //设置一个对象的属性
                    return this.each(function () {
                        var dom = this;
                        jQuery.each(function (className, classValue) {
                            dom.setAttribute(className, classValue);
                        })

                    })
                }
            } else {
                //两个参数；设置属性
                return this.each(function () {
                    this.setAttribute(arg0, arg1);
                })
            }
        },
        hasClass: function (className) {
            //遍历，只要有一个dom元素含有className这个类名就返回true
            var isExist = false;
            this.each(function () {
                if ((" " + this.className + " ").indexOf(" " + className + " ") > -1) {
                    isExist = true;
                    return false;
                }
            })
            return isExist;
        },
        addClass: function (className) {
            var classNames = className.split(" ");
            return this.each(function () {
                for (var i = 0; i < classNames.length; i++) {
                    var singleClassName = className[i];
                    if (!$(this).hasClass(singleClassName)) {
                        this.className += " " + singleClassName;
                    }
                }
            })

        },
        removeClass: function (className) {
            if (!className) {
                //删除全部类名
                return this.each(function () {
                    this.className = "";
                })
            } else {
                //删除一个或者多个类名
                var classNames = className.split(" ");
                return this.each(function () {
                    var domClassName = " " + this.className + " ";
                    for (var i = 0; i < classNames.length; i++) {
                        var singleClassName = " " + classNames[i] + " ";
                        domClassName = domClassName.replace(singleClassName, " ");
                    }
                    this.className = $.trim(domClassName);
                })
            }
        }
    })
    //dom操作方法模块
    jQuery.fn.extend({
        appendTo: function () {
            var $parent = $(arguments[0]);
            return this.each(function () {
                var child = this;
                $parent.each(function () {
                    var parent = this;
                    parent.appendChild(child.cloneNode(true));
                })
            })

        },
        prependTo: function () {
            var $parent = $(arguments[0]);
            return this.each(function () {
                var child = this;
                $parent.each(function () {
                    var parent = this;
                    parent.insertBefore(child.cloneNode(true), parent.firstChild);
                })
            })
        },
        append: function () {
            var $parent = $this;
            var $child = $(arguments[0]);
            $child.appendTo($parent);
            return this;
        },
        prepend: function () {
            var $parent = $this;
            var $child = $(arguments[0]);
            $child.prependTo($parent);
            return this;
        },
        remove: function () {
            return this.each(function(){
                this.parentNode.removeChild(this);
            })
        },
        html: function (html) {
            if (html === undefined) {
                //返回第一个dom元素的html
                var firstDom = this[0];
                return firstDom.innerHTML;
            }
            //如果为null或者其他参数时候
            return this.each(function () {
                this.innerHTML = html;
                //this.innerHTML = html===null?"":html;
            })
        },
        text: function (text) {
            if (html === undefined) {
                var str = "";
                this.each(function () {
                    str += this.innerText;
                })
                return str;
            }
            return this.each(function () {
                this.innerText = text;
            })
        }
    })

    //事件模块
    jQuery.fn.extend({
        on:function(type,callback){
            return this.each(function(){
                this.addEventListener(type,callback);
            })
        }
    })
    var eventTypes = "click dblclivk keydown keyup mousedown mouseup mouseout mouseenter mouseleave load".split(" ");
    for(var i =0;i<eventTypes.length;i++){
        var eventType = eventTypes[i];
        $.fn[eventType] = (function(){
            var type = eventType;
            return function(callback){
                return this.on(type,callback);
            }
        })()
    }

    //F的实例 = jQuery的实例
    jQuery.fn.F.prototype = jQuery.fn;
    //暴露出去两个接口
    window.$ = window.jQuery = jQuery;
})(window);