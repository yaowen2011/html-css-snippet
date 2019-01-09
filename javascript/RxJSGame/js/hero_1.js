var HERO_Y = canvas.height - 30;
var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove');

// 生成主角的位置信息
var SpaceShip = mouseMove
  .map(event => {
    return {
      x: event.clientX,
      y: HERO_Y
    }
  })
  .startWith({
    x: canvas.width /2,  // 给动态数据结构设置个初始值
    y: HERO_y
  })

// 绘制视图方法
function drawTriangle(x, y, width, color, direction) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x - width, y); // 起点
  ctx.lineTo(x, direction === 'up' ? y - width: y + width);
  ctx.lineTo(x + width, y);
  ctx.lineTo(x - width, y);
  ctx.fill();
}

// 绘制主角
function paintSpaceShip(x, y) {
  drawTriangle(x, y, 20, '#ff0000', 'up')
}

// 用到combineLatest
// 由于初始状态  需要mousemove触发，用combineLatest触发
// 将两个Observable 合并生成
// 这个是成了试图的总渲染方法
function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y);
}

var Game = Rx.Observable
  .combineLatest(
    
  )
  