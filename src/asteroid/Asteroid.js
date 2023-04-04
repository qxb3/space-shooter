import crypto from 'crypto'
import utils from '../utils.js'

class Asteroid {
  constructor(game) {
    this.game = game

    this.chars = [
      '   @@@@   \n' +
      '  @@@@@@  \n' +
      '  @@@@@@  \n' +
      '  @@@@@@  \n' +
      '   @@@@   ',

      '   @@@@   \n' +
      '  @@ @@@  \n' +
      '  @@@ @   \n' +
      '  @ @     \n' +
      '   @@@    ',

      '    @@    \n' +
      '  @@ @@@  \n' +
      '   @@     \n' +
      '  @ @     \n' +
      '   @ @    ',

      ''
    ]

    this.health = 0
    this.char = this.chars[this.health]
    this.id = crypto.randomUUID()
    this.x = utils.randomNumber(1, this.game.width - this.char.split('\n')[1].length - 1)
    this.y = 0
    this.speed = utils.randomNumber(0.1, 0.3)
  }

  render() {
    this.game.draw(this.char, this.x, this.y)
  }

  update() {
    this.y += this.speed
  }

  decreaseHealth() {
    this.health += 1
    this.char = this.chars[this.health]
  }

  isEdge() {
    if (this.y > this.game.height - 1) return true

    return false
  }
}

export default Asteroid
