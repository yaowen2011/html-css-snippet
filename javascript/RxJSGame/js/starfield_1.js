var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 生成星星数据
var SPEED = 40;
var STAR_NUMBER = 250;
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
  .map(function() {
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1
    }
  })
  .toArray() // 拿到所有的星星数据
  .flatMap(function(starArray) {
    // 随着时间推移，不停修改修改的star的Y坐标，使star动起来
    return Rx.Observable.interval(SPEED).map(_ => {
      // 所有的star坐标，全部修改
      starArray.forEach(star => {
        if (star.y >= canvas.height) {
          star.y = 0;  //冲出屏幕的重置
        }
        star.y += 3;
      })
      return starArray;
    })
  })

// 批量绘制star
function paintStars(stars) {
  // 绘制canvas底部黑背景色
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // star使用白色
  ctx.fillStyle = '#ffffff';
  stars.forEach(star => {
    ctx.fillRect(star.x, star.y, star.size, star.size)
  })
}

// 订阅数据源更新视图
StarStream.subscribe(starArr => paintStars(starArr))
