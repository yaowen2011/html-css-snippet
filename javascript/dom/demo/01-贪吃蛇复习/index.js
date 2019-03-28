/**
 * Created by HUCC on 2017/10/10.
 */
;(function (window) {
//属性： width height bgColor x y
//方法： render
  function Food(options){
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.bgColor = options.bgColor || "blue";
    this.x = options.x || 0;
    this.y = options.y || 0;
  }

  Food.prototype.render = function (target) {
    //根据food这个对象，创建div，添加到target中
    var div = document.createElement("div");
    target.appendChild(div);

    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.bgColor;

    //修改位置
    div.style.position = "absolute";
    //随机x值和y值
    this.x = parseInt(Math.random() * target.offsetWidth/ this.width);
    this.y = parseInt(Math.random() * target.offsetHeight/this.height);
    div.style.left = this.x * this.width + "px";
    div.style.top = this.y * this.height + "px";
  }


  var a = 34;



  window.Food = Food;
})(window);



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


;(function (window) {
//蛇对象
//属性：
//width height headColor bodyColor direction  body
//方法：
//render
//move
  function Snake(options) {
    options = options || {};
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.headColor = options.headColor || "green";
    this.bodyColor = options.bodyColor || "red";
    //将来创建蛇对象的时候，
    this.direction = options.direction || "right";
    this.body = [
      {x: 2, y: 0, bgColor: this.headColor},
      {x: 1, y: 0, bgColor: this.bodyColor},
      {x: 0, y: 0, bgColor: this.bodyColor}
    ];
  }

  Snake.prototype.render = function (target) {
    //把body中所有的东西全部都渲染到target
    for (var i = 0; i < this.body.length; i++) {

      var span = document.createElement("span");
      target.appendChild(span);
      //设置span的样式
      span.style.width = this.width + "px";
      span.style.height = this.height + "px";
      span.style.backgroundColor = this.body[i].bgColor;

      //设置位置
      span.style.position = "absolute";
      span.style.left = this.body[i].x * this.width + "px";
      span.style.top = this.body[i].y * this.height + "px";

    }
  }

  Snake.prototype.move = function (target, food) {
    //蛇没有移动前的蛇尾
    var last = this.body[this.body.length - 1];
    //移动的思路：
    //1. 移动蛇的身体
    //2. 根据方向移动蛇头
    //3. 删除整条蛇
    //4. 重新渲染这条蛇
    for (var i = this.body.length - 1; i > 0; i--) {
      this.body[i].x = this.body[i - 1].x;
      this.body[i].y = this.body[i - 1].y;
    }
    //修改蛇头
    switch (this.direction) {
      case "right":
        this.body[0].x++;
        break;
      case "left":
        this.body[0].x--;
        break;
      case "top":
        this.body[0].y--;
        break;
      case "bottom":
        this.body[0].y++;
        break;
    }

    //1. 判断蛇头的位置与食物的位置是否重合。
    //2. 把移动前的那个蛇尾位置push到body中
    //3. 把原先的食物删除
    //4. 重新渲染一个新的食物
    if (this.body[0].x === food.x && this.body[0].y === food.y) {
      //给body加一个对象
      this.body.push({
        x: last.x,
        y: last.y,
        bgColor: this.bodyColor
      });

      //删除食物,删除div
      var div = target.querySelector("div");
      target.removeChild(div);
      //重新渲染食物
      food.render(target);
    }


    //删除蛇， 只需要删除target中所有的span就ok
    var spans = target.querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
      target.removeChild(spans[i]);
    }

    //重新渲染蛇
    this.render(target);

  }


  var a = 23;

  window.Snake = Snake;
})(window);