/**
 * Created by Administrator on 2017/7/31 0031.
 */
//包含块 判定

var currBlock = {};
var containBlock = {};

if (currBlock.position == 'relative' || currBlock.position=='static') {
    containBlock.desc = '由它最近的块级、单元格（table cell）或者行内块（inline-block）' +
        '祖先元素的 内容框创建。';
}

if (currBlock.position == 'fixed') {
    containBlock.desc = '是当前可视窗口';
}

if (currBlock.position == 'absolute') {
    containBlock.desc = "由离它最近的 'position' 属性为 'absolute'、'relative' 或者 'fixed' 的祖先元素创建。" +
        "（只要不是static）";
}


