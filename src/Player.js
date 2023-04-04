class Player {
  constructor(game) {
    this.game = game

    this.char = `[/∆\\]`
    this.x = parseInt(this.game.width / 2 - 1)
    this.y = this.game.height
    this.speed = 2
    this.xVelocity = 0
    this.drag = 1

    this.registerMovements()
  }

  render() {
    this.game.draw(this.char, this.x, this.y)
  }

  update() {
    this.x += parseInt(this.xVelocity)
    this.y = this.game.height

    if (this.xVelocity > 0) this.xVelocity -= this.drag
    if (this.xVelocity < 0) this.xVelocity += this.drag

    if (this.x < 0) this.x = 0
    if (this.x + this.char.length > this.game.width) this.x = this.game.width - this.char.length
  }

  registerMovements() {
    this.game.keys.on('left', () => {
      this.xVelocity -= this.speed
    })

    this.game.keys.on('right', () => {
      this.xVelocity += this.speed
    })
  }
}

export default Player
