//游戏主控制器  指挥 控制 调遣对象运动方式
function Game(options) {
    options = options || {};
    this.render = options.render || null;
    this.map = options.map || null;
    this.snake = options.snake || null;
    this.food = options.food || null;
    this.cell = 20;
    this.init();
}

Game.prototype.init = function () {
    var that = this;
    document.addEventListener('keydown', function (e) {
        switch(e.keyCode) {
            case 37:
                that.snake.direction = 'left';
                break;
            case 38:
                that.snake.direction = 'up';
                break;
            case 39:
                that.snake.direction = 'right';
                break;
            case 40:
                that.snake.direction = 'down';
                break;
        }
    })
}

Game.prototype.start = function () {
    //开启定时器
    this.timer && clearInterval(this.timer);
    var that = this;
    this.timer = setInterval(function () {
        //判断撞墙逻辑
        if (that.snake.body[0].x < 0 || that.snake.body[0].y <0
            || that.snake.body[0].x >= that.map.offsetWidth / that.cell
            || that.snake.body[0].y >= that.map.offsetHeight / that.cell) {
            clearInterval(that.timer);
            alert('game over');
            return ;
        }
        that.snake.move(that.food);
        //如果吃掉 可以在食物对象上添加个是否被吃掉的属性
        if (that.snake.isHit) {
            //that.render.destroy(that.map, that.food);
            that.food = new Food({map:that.map}).rand();
            that.render.draw(that.map, that.food);
        }
    }, 300);



}