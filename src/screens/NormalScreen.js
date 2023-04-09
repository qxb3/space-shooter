import Player from '../entities/Player.js'
import BulletManager from '../entities/bullet/BulletManager.js'
import AsteroidManager from '../entities/asteroid/AsteroidManager.js'
import StarManager from '../entities/star/StarManager.js'
import utils from '../utils.js'

class NormalScreen {
  constructor(game, screenManager) {
    this.game = game
    this.screenManager = screenManager
  }

  start() {
    this.player = new Player(this.game)
    this.bulletManager = new BulletManager(this.game, this.player)
    this.asteroidManager = new AsteroidManager(this.game)
    this.starManager = new StarManager(this.game)
  }

  render() {
    this.player.render()
    this.bulletManager.render()
    this.asteroidManager.render()
    this.starManager.render()
  }

  update() {
    this.player.update()
    this.bulletManager.update()
    this.asteroidManager.update()
    this.starManager.update()

    for (const bullet of this.bulletManager.bullets) {
      for (const asteroid of this.asteroidManager.asteroids) {
        const collide = utils.checkCollision(bullet.char, bullet.x, bullet.y, asteroid.char, asteroid.x, asteroid.y)

        if (collide) {
          this.bulletManager.bullets = this.bulletManager.bullets.filter(v => v.id !== bullet.id)

          if (asteroid.health < 3) asteroid.decreaseHealth()
          else this.asteroidManager.asteroids = this.asteroidManager.asteroids.filter(v => v.id !== asteroid.id)

          utils.playMusic('explosion.mp3')
        }
      }
    }
  }
}

export default NormalScreen
