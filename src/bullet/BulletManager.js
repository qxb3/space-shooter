import Bullet from './Bullet.js'

class BulletManager {
  constructor(game, player) {
    this.bullets = []

    this.game = game
    this.player = player

    this.game.keys.on('up', () => {
      const x = this.player.x + 2
      const y = this.game.height - 1

      this.shoot(x, y)
    })
  }

  render() {
    for (const bullet of this.bullets) {
      bullet.render()
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

  shoot(x, y) {
    this.bullets.push(new Bullet(x, y, this.game))
  }
}

export default BulletManager
