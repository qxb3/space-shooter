import Bullet from './Bullet.js'
import crypto from 'crypto'

class BulletManager {
  constructor(game, player) {
    this.bullets = []

    this.game = game
    this.player = player

    this.game.keys.on('up', () => {
      const id = crypto.randomUUID()
      const x = this.player.x + 2
      const y = this.game.height

      this.shoot(id, x, y)
    })
  }

  render() {
    for (const bullet of this.bullets) {
      bullet.draw()
    }
  }

  update() {
    for (const bullet of this.bullets) {
      if (bullet.isEdge()) {
        this.bullets = this.bullets.filter(v => v.id !== bullet.id)
        continue
      }

      bullet.update()
    }
  }

  shoot(id, x, y) {
    this.bullets.push(new Bullet(id, x, y, this.game))
  }
}

export default BulletManager
