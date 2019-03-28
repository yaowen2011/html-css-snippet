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