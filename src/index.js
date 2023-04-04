import Game from './engine/Game.js'
import Player from './Player.js'
import BulletManager from './bullet/BulletManager.js'
import AsteroidManager from './asteroid/AsteroidManager.js'
import StarManager from './star/StarManager.js'
import utils from './utils.js'

const game = new Game({ ms: 30 })
const player = new Player(game)
const bulletManager = new BulletManager(game, player)
const asteroidManager = new AsteroidManager(game)
const starManager = new StarManager(game)

utils.playMusic('bg-music.mp3', 9999)

game.update(() => {
  player.render()
  bulletManager.render()
  asteroidManager.render()
  starManager.render()

  player.update()
  bulletManager.update()
  asteroidManager.update()
  starManager.update()

  for (const bullet of bulletManager.bullets) {
    for (const asteroid of asteroidManager.asteroids) {
      const collide = checkCollision(bullet.char, bullet.x, bullet.y, asteroid.char, asteroid.x, asteroid.y)

      if (collide) {
        bulletManager.bullets = bulletManager.bullets.filter(v => v.id !== bullet.id)

        if (asteroid.health < 3) asteroid.decreaseHealth()
        else asteroidManager.asteroids = asteroidManager.asteroids.filter(v => v.id !== asteroid.id)

        utils.playMusic('explosion.mp3')
      }
    }
  }
})

function checkCollision(char1, x1, y1, char2, x2, y2) {
  const chars1 = char1.split('\n')
  const chars2 = char2.split('\n')

  // Calculate the bounding boxes for each character
  const box1 = {
    x1: parseInt(x1),
    y1: parseInt(y1),
    x2: parseInt(x1) + Math.max(...chars1.map((line) => line.length)),
    y2: parseInt(y1) + chars1.length,
  }

  const box2 = {
    x1: parseInt(x2),
    y1: parseInt(y2),
    x2: parseInt(x2) + Math.max(...chars2.map((line) => line.length)),
    y2: parseInt(y2) + chars2.length,
  }

  // Check for collision by iterating over each pixel in the overlapping region
  const xOverlap = Math.max(0, Math.min(box1.x2, box2.x2) - Math.max(box1.x1, box2.x1))
  const yOverlap = Math.max(0, Math.min(box1.y2, box2.y2) - Math.max(box1.y1, box2.y1))
  const xStart = Math.max(box1.x1, box2.x1)
  const yStart = Math.max(box1.y1, box2.y1)

  for (let y = 0; y < yOverlap; y++) {
    for (let x = 0; x < xOverlap; x++) {
      const char1Pixel = chars1[y + yStart - box1.y1].charAt(x + xStart - box1.x1)
      const char2Pixel = chars2[y + yStart - box2.y1].charAt(x + xStart - box2.x1)

      if (char1Pixel !== ' ' && char2Pixel !== ' ') {
        return true
      }
    }
  }

  return false
}
