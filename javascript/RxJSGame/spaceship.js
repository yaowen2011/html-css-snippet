var canvas = document.createElement('canvas');
var ctx = canvas.getContext("2d")
document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// 背景层的星星
var SPEED = 40;
var STAR_NUMBER = 250;
var StarStream = Rx.Observable.range(1, STAR_NUMBER)
  .map(() => {
    return {
      x: parseInt(Math.random() * canvas.width),
      y: parseInt(Math.random() * canvas.height),
      size: Math.random() * 3 + 1
    }
  })
  .toArray()
  .flatMap(starArray => {
    return Rx.Observable.interval(SPEED).map(() => {
      starArray.forEach(function(star) {
        if (star.y >= canvas.height) {
          star.y = 0
        }
        star.y += 3
      })
      return starArray
    })
  })
  .subscribe(starArray => paintStars(starArray))

// 画一个星星
function paintStars(stars) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  stars.forEach(star => {
    ctx.fillRect(star.x, star.y, star.size, star.size)
  })
}

// 添加玩家的飞船
var HERO_y = canvas.height - 30;
var mouseMove = Rx.Observable.fromEvent(canvas, 'mousemove')
var SpaceShip = mouseMove
  .map(event => {
    return {
      x: event.clientX,
      y: HERO_y
    }
  })
  .starWith({ // sets the first value in the Observable
    x: canvas.width /2,
    y: HERO_y
  })

// 画出飞船
function drawTriangle(x, y, width, color, direction) {
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x - width, y)
  ctx.lineTo(x, direction ==='up' ? y-width: y+width)
  ctx.lineTo(x + width, y)
  ctx.lintTo(x - width, y)
  ctx.fill()
}

function paintSpaceShip(x, y) {
  drawTriangle(x, y, 20, '#ff0000', 'up')
}

var ENEMY_FREQ = 1500;
var Enemies = Rx.Observable.interval(ENEMY_FREQ)
  .scan(prev => {
    var enemy = {
      x: parseInt(Math.random() * canvas.width),
      y: -30
    }

    enemyArray.push(enemy)
    return enemyArray;  // 这一次处理的中间结果
  }, []);// 从一个空数组init 

// 游戏主体
var Game = Rx.Observable
  .combineLatest(
    StarStream, SpaceShip, Enemies,
    function(stars, spaceship, enemies) {
      return {
        stars: stars,
        spaceship: spaceship,
        enemies: enemies
      }
    }
  )
Game.subscribe(renderScene)

// 绘制主场景
function renderScene(actors) {
  paintStars(actors.stars);
  paintSpaceShip(actors.spaceship.x, actors.spaceship.y)
}