class Bullet {
  constructor(id, x, y, game) {
    this.game = game

    this.char = '|'
    this.id = id
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
