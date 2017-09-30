var foo = true;

if (foo) {
    var bar0 = 10;
    console.log(bar0);
}
console.log(bar0 + 'var--');

if (foo) {//es6
    let bar1 = 20;
    console.log(bar1);
}
// console.log(bar1 + 'let--'); es6是直接无法访问的

