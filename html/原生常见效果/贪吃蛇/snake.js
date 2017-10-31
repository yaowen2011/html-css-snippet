//蛇对象
function Snake(options) {
    options = options || {};

    this.cell = 20; //每个单元的宽高都是20
    this.bodyBgColor = 'black';
    this.className = 'snake';
    this.body = [
        {x:3, y:0, bgColor:'darkred'},
        {x:2, y:0, bgColor:'black'},
        {x:1, y:0, bgColor:'black'},
        {x:0, y:0, bgColor:'black'}
    ];

    this.map = options.map || null;

    this.direction = 'right';
    this.render = options.render || null;
}

Snake.prototype.move = function (food) {
    //移动规律  对指针的控制有点像fibo
    var lastCell = {};
    lastCell.x = this.body[this.body.length - 1].x;
    lastCell.y = this.body[this.body.length - 1].y;
    lastCell.bgColor = this.body[this.body.length - 1].bgColor;
    //注意这里不能直接赋值
    for (var i = this.body.length - 1; i > 0; --i) {
        this.body[i].x = this.body[i-1].x;
        this.body[i].y = this.body[i-1].y;
        this.body[i].bgColor = this.bodyBgColor;
    }

    switch (this.direction) {
        case 'up':
            this.body[0].y--;
            break;
        case 'right':
            this.body[0].x++;
            break;
        case 'down':
            this.body[0].y++;
            break;
        case 'left':
            this.body[0].x--;
            break;
    }

    //判断吃食物
    this.isHit = false;
    if (this.body[0].x === food.body[0].x && this.body[0].y === food.body[0].y) {
        this.isHit = true;

        //填到蛇移出 移出的那个格子
        this.body.push(lastCell);
        //
        //this.render.destroy(this.map, food);
        //
        //this.render.draw(this.map, new Food({map: map}));
    }

    if ( ! this.map) throw new Error('map 没找到');
    this.render.draw(this.map, this);

    return this;
}

