var ENEMY_FREQ = 1500;
var Enemies$ = Rx.Observable.interval(ENEMY_FREQ)
  .scan(function(enemyArray) {
    var enemy = {
      x: parseInt(Math.random() * canvas.width),
      y: -30
    }
    // 返回累计后的值
    enemyArray.push(enemy)
    return enemyArray
  }, [])

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function paintEnemies(enemies) {
    enemies.forEach(function(enemy) {
      enemy.y += 5;
      enemy.x += getRandomInt(-15, 15)

      drawTriangle(enemy.x, enemy.y, 20, '#00ff00', 'down')
    })
  }