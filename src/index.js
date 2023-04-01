import Game from './engine/Game.js'
import Keys from './engine/Keys.js'

const game = new Game({ ms: 60 })
const keys = new Keys()

const playerChar = '/+\\'
const playerSpeed = 2
let playerX = game.width / 2 - 1
let playerHealth = '❤❤❤'

const bulletChar = '|'
let bullets = []

const asteroidChar = '@'
let asteroidSpeed = 0.150
let asteroidSpawnRate = 5000
let asteroids = []

keys.on('left', () => {
  playerX -= playerSpeed
})

keys.on('right', () => {
  playerX += playerSpeed
})

keys.on('up', () => {
  bullets.push({
    id: Math.random(0, 99999),
    x: playerX + 1,
    y: game.height - 1
  })
})

setInterval(() => {
  asteroids.push({
    id: Math.random(0, 99999),
    x: Math.random() *  ((game.width - 1) - 1),
    y: 0
  })

  asteroidSpawnRate -= 50
}, asteroidSpawnRate)

game.update(() => {
  game.draw(playerHealth, game.width - 3, 0)
  game.draw(playerChar, playerX, game.height)

  for (const bullet of bullets) {
    if (bullet.y < 0) {
      bullets = bullets.filter((v) => v.id !== bullet.id)
    } else {
      game.draw(bulletChar, bullet.x, bullet.y)
      bullet.y -= 2
    }
  }

  for (const asteroid of asteroids) {
    if (asteroid.y > game.height) {
      asteroids = asteroids.filter((v) => v.id !== asteroid.id)
      playerHealth = playerHealth.slice(1)
    } else {
      game.draw(asteroidChar, asteroid.x, asteroid.y)
      asteroid.y += asteroidSpeed
    }
  }

  for (const bullet of bullets) {
    for (const asteroid of asteroids) {
      const collided = checkCollision(bullet.x, bullet.y, bulletChar, asteroid.x, asteroid.y, asteroidChar)

      if (collided) {
        bullets = bullets.filter((v) => v.id !== bullet.id)
        asteroids = asteroids.filter((v) => v.id !== asteroid.id)
      }
    }
  }
})

function checkCollision(x1, y1, char1, x2, y2, char2) {
  // Check if the characters have the same coordinates
  if (x1 === x2 && y1 === y2) {
    return true; // The characters are colliding
  }
  // Check if the characters have overlapping coordinates
  if (char1.length > 0 && char2.length > 0 && x1 < x2 + char2.length && x1 + char1.length > x2 && y1 < y2 + 1 && y1 + 1 > y2) {
    return true; // The characters are colliding
  }
  return false; // The characters are not colliding
}
