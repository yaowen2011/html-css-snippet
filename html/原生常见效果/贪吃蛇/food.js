//食物构造函数
function Food(options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.bgColor = options.bgColor || 'green';
    this.className = 'food';

    this.map = options.map || null;

    this.x = options.x || 0;
    this.y = options.y || 0;

    this.body = [
        {x: this.x, y: this.y, bgColor: this.bgColor}
    ];
}

Food.prototype.rand = function () {
    if (! this.map) throw new Error('map对象找不到');

    var x = parseInt(Math.random() * this.map.offsetWidth / this.width);
    var y = parseInt(Math.random() * this.map.offsetHeight / this.height);

    this.body[0].x = x;
        this.x = x;
    this.body[0].y = y;
        this.y = y;

    return this;
}