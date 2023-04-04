import crypto from 'crypto'

class Star {
  constructor(x, game) {
    this.game = game

    this.char = ['+', '*'][Math.round(Math.random() * 1)]
    this.id = crypto.randomUUID()
    this.x = x
    this.y = 0
    this.speed = Math.round(Math.random() * 3)
  }

  render() {
    this.game.draw(this.char, this.x, this.y)
  }

  update() {
    this.y += parseInt(this.speed)
  }

  isEdge() {
    if (this.y > this.game.height) return true

    return false
  }
}

export default Star
