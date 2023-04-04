import Game from './engine/Game.js'
import Player from './Player.js'
import BulletManager from './bullet/BulletManager.js'
import StarManager from './star/StarManager.js'

const game = new Game({ ms: 30 })
const player = new Player(game)
const bulletManager = new BulletManager(game, player)
const starManager = new StarManager(game)

game.update(() => {
  player.render()
  bulletManager.render()
  starManager.render()

  player.update()
  bulletManager.update()
  starManager.update()
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
