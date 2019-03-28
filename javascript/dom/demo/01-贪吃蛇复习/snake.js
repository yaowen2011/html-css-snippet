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


  Snake.prototype = {
    constructor:Snake,
    render:function () {

    },
    move:function () {

    },
    //...
  }

  var a = 23;

  window.Snake = Snake;
})(window);