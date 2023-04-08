import Asteroid from './Asteroid.js'

class AsteroidManager {
  constructor(game) {
    this.game = game

    this.asteroids = []

    setInterval(() => {
      this.spawn()
    }, 3500)
  }

  render() {
    for (const asteroid of this.asteroids) {
      asteroid.render()
    }
  }

  update() {
    for (const asteroid of this.asteroids) {
      if (asteroid.isEdge()) {
        this.asteroids = this.asteroids.filter(v => v.id !== asteroid.id)
        continue
      }

      asteroid.update()
    }
  }

  spawn() {
    this.asteroids.push(new Asteroid(this.game))
  }
}

export default AsteroidManager
