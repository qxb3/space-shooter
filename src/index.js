import Game from './engine/Game.js'
import Keys from './engine/Keys.js'

const game = new Game({ ms: 60 })
const keys = new Keys()

const playerChar = '/+\\'
const playerSpeed = 2
let playerX = game.width / 2 - 1

const bulletChar = '|'
const bullets = []

keys.on('left', () => {
  playerX -= playerSpeed
})

keys.on('right', () => {
  playerX += playerSpeed
})

keys.on('up', () => {
  bullets.push({
    id: bullets.length,
    x: playerX + 1,
    y: game.height - 1
  })
})

game.update(() => {
  game.draw(playerChar, playerX, game.height)

  for (const bullet of bullets) {
    if (bullet.y < 0) {
      bullets.shift()
    } else {
      game.draw(bulletChar, bullet.x, bullet.y)
      bullet.y -= 2
    }
  }
})
