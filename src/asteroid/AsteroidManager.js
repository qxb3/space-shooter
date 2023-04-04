import Asteroid from "./Asteroid.js"

class AsteroidManager {
  constructor(game) {
    this.game = game

    this.asteroids = []

    setInterval(() => {
      this.spawn()
    }, 3000)
  }

  render() {
    for (const asteroid of this.asteroids) {
      asteroid.render()
    }
  }

  update() {
    for (const asteroid of this.asteroids) {
      asteroid.update()
    }
  }

  spawn() {
    this.asteroids.push(new Asteroid(this.game))
  }
}

export default AsteroidManager
