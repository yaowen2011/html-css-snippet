/**
 * url参数转成对象
 * @param url
 */
function getUrlParam(url) {
    if (url.indexOf("?") === -1) {
        return null;
    }

    var obj = {};
    url.split("?")[1].split("&").forEach(function (element) {
        var item = element.split("=");
        obj[item[0]] = item[1];
    });

    return obj;
}

/**
 * 获取页面水平 垂直方向的滚动值
 */
function getPageScroll() {
    var scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

    var scrollLeft = window.pageYOffset ||
            document.documentElement.scrollLeft ||
            document.body.scrollLeft ||
            0;

    return {
        top : scrollTop,
        left : scrollLeft
    }
}

/**
 * 获取可视区域大小
 */
function getClientWidth () {
    var clientWidth = window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            0;
    var clientHeight = window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight ||
            0;

    return {
        width : clientWidth,
        height: clientHeight
    }

}