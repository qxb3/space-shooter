import MenuScreen from './MenuScreen.js'
import NormalScreen from './NormalScreen.js'

class ScreenManager {
  constructor(game) {
    this.game = game

    this.screens = new Map([
      ['menu', new MenuScreen(this.game, this)],
      ['normal', new NormalScreen(this.game, this)]
    ])

    this.currentScreen = this.screens.get('menu')
    this.currentScreen.start()
  }

  render() {
    this.currentScreen.render()
  }

  update() {
    this.currentScreen.update()
  }

  changeScreen(screenName) {
    this.currentScreen = this.screens.get(screenName)
    this.currentScreen.start()
  }
}

export default ScreenManager
