import crypto from 'crypto'

class Bullet {
  constructor(x, y, game) {
    this.game = game

    this.char = 'O'
    this.id = crypto.randomUUID()
    this.x = x
    this.y = y
    this.speed = 2
  }

  draw() {
    this.game.draw(this.char, this.x, this.y)
  }

  update() {
    this.y -= this.speed
  }

  isEdge() {
    if (this.y < 0) return true

    return false
  }
}

export default Bullet
