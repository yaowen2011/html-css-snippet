;(function (window) {
  var timer;
//游戏构造函数,管理所有的对象，地图
//属性： 蛇  食物对象   地图   level   score
//方法： 开始游戏
  function Game(map) {
    this.map = map;
    this.snake = new Snake();
    this.food = new Food();

    //初始化游戏
    this.init();
  }

  Game.prototype.init = function () {
    //渲染蛇
    this.snake.render(this.map);
    //渲染食物
    this.food.render(this.map);
    var that = this;
    //onkeyup事件与onkeydown只能给有焦点的东西注册，document
    document.onkeyup = function (e) {
      switch (e.keyCode) {
        case 37:
          if (that.snake.direction != "right") {
            that.snake.direction = "left";
          }
          break;
        case 38:
          if (that.snake.direction != "bottom") {
            that.snake.direction = "top";
          }
          break;
        case 39:
          if (that.snake.direction != "left") {
            that.snake.direction = "right";
          }
          break;
        case 40:
          if (that.snake.direction != "top") {
            that.snake.direction = "bottom";
          }
          break;
      }
    }
  }

//开始游戏的方法
  Game.prototype.start = function () {
    var that = this;//that存储了外部的this
    clearInterval(timer);
    timer = setInterval(function () {
      //在定时器中的this，是window对象
      that.snake.move(that.map, that.food);

      //判断蛇头的位置，如果蛇头的位置超出了地图，就说明撞墙
      var head = that.snake.body[0];
      if(head.x < 0 || head.y < 0 || head.x > that.map.offsetWidth/that.snake.width -1 || head.y > that.map.offsetHeight/that.snake.height -1){
        alert("Game Over");
        clearInterval(timer);
      }

      //撞身体的判断， 判断蛇头和蛇身体的位置是否重合
      for(var i = 3; i < that.snake.body.length; i++){
        if(head.x === that.snake.body[i].x && head.y === that.snake.body[i].y){
          alert("Game Over");
          clearInterval(timer);
        }
      }

    }, 150);
  }


  window.Game = Game;
})(window);
