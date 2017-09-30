;(function (window) {
    function jQuery(selector) {
        return jQuery.fn.selector(selector);
    }

    /**
     * 简化实例化 jQuery
     * @param arg
     * @returns {jQuery}
     */


    jQuery.fn = jQuery.prototype;


    jQuery.extend = jQuery.fn.extend = function (json) {
        for (var key in json) {
            this[key] = json[key];
        }
    }

    /**
     * jquery选择器方法
     * @param selector
     */
    jQuery.prototype.selector = function (selector) {
        if (typeof selector === "string" || selector instanceof String) {
            var domList = document.querySelectorAll(selector);
            //将jQuery对象 包装成伪数组
            Array.prototype.push.apply(this, domList);
        } else if (typeof selector === 'function') {

        } else if (typeof selector === 'object') {
            Array.prototype.push.apply(this, selector);
        } else {
            throw new Error("只支持css选择器");
        }

        return this;
    }

    /**
     * dom相关操作
     */
    jQuery.prototype.css = function (name, value) {
        if (arguments.length === 2) {
            //set
            for (var i = 0; i < this.length; ++i) {
                this[i].style[name] = value;
            }
        } else {
            //get
            if (typeof name === 'string') {
                //返回第一个元素的样式
                return getElementStyle(this[0], name);
            }
        }

    }

    /**
     * set get attr
     * @param name
     * @param value
     */
    jQuery.prototype.attr = function (name, value) {
        if (arguments.length === 2) {
            //set
            for (var i = 0; i < this.length; ++i) {
                this.setAttribute(name, value);
            }
        } else {
            //get
            if (typeof name === 'string') {
                return this[0].getAttribute(name);
            }
        }
    }

    /**
     * 添加css类
     * @param className
     * @returns {jQuery}
     */
    jQuery.prototype.addClass = function (className) {
        var re = new RegExp('\\b' + className + '\\b', 'g');
        for (var i = 0; i < this.length; ++i) {
            if (this[i].className.search(re) === -1) {
                this[i].className += ' ' + className;
            }
        }

        return this;
    }

    /**
     * 移除css类
     * @param className
     * @returns {jQuery}
     */
    jQuery.prototype.removeClass = function (className) {
        var re = new RegExp('\\b' + className + '\\b', 'g');
        for (var i = 0; i < this.length; ++i) {
            if (this[i].className.search(re) === -1) {
                this[i].className = this[i].className.replace(className, '');
            }
        }

        return this;
    }

    


    function getElementStyle(element, style) {
        return (element.currentSrc || getComputedStyle(element, false))[style];
    }

    //jQuery 一些基本的方法封装
    //jQuery.extend
    jQuery.extend({
        each : function (array, cb) {
            var length = array;
            if (typeof length === 'number' && length > 0) {
                for (var i = 0; i < array.length; ) {
                    if (cb.call(array[i], i, array[i++]) === false) {
                        break;//TODO 不太理解call的第三个参数
                    }
                }
            } else {
                for (var i in array) {
                    if (cb.call(array[i], i, array[i]) === false) {
                        break;
                    }
                }
            }
        }
    });

    //
    jQuery.fn.extend({
        each : function (callback) {
            jQuery.each(this, callback);
            return this;
        }
    });

    window.$ = jQuery;
})(window);