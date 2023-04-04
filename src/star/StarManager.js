import Star from './Star.js'

class StarManager {
  constructor(game) {
    this.game = game

    this.stars = []

    setInterval(() => {
      const x = Math.round(Math.random() * this.game.width)
      this.spawn(x)
    }, 50)
  }

  render() {
    for (const star of this.stars) {
      star.render()
    }
  }

  update() {
    for (const star of this.stars) {
      if (star.isEdge()) {
        this.stars = this.stars.filter(v => v.id !== star.id)
        continue
      }

      star.update()
    }
  }

  spawn(x) {
    this.stars.push(new Star(x, this.game))
  }
}

export default StarManager
