import Game from './engine/Game.js'
import ScreenManager from './screens/ScreenManager.js'
// import utils from './utils.js'

const game = new Game({ ms: 30 })
const screenManager = new ScreenManager(game)

// utils.playMusic('bg-music.mp3', 9999)

game.update(() => {
  screenManager.render()
  screenManager.update()
})
