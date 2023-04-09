import figlet from 'figlet'

class Menu {
  constructor(game, screenManager) {
    this.game = game
    this.screenManager = screenManager

    this.banner1 = figlet.textSync('Space')
    this.banner2 = figlet.textSync('Shooter')

    this.selections = [
      { name: 'Normal', value: 'normal' },
      { name: 'Online PvP', value: 'online' },
      { name: 'Quit', value: 'quit' }
    ]
    this.currentlySelected = 0
  }

  start() {
    this.game.keys.on('up', () => {
      this.currentlySelected -= 1
      if (this.currentlySelected < 0) this.currentlySelected = this.selections.length - 1
    })

    this.game.keys.on('down', () => {
      this.currentlySelected += 1
      if (this.currentlySelected > this.selections.length - 1) this.currentlySelected = 0
    })

    this.game.keys.on('return', () => {
      const selected = this.selections[this.currentlySelected]

      if (selected.value === 'quit')
        return this.game.exit()

      this.screenManager.changeScreen(selected.value)
    })
  }

  render() {
    this.game.draw(
      this.banner1,
      (this.game.width / 2) - (this.banner1.split('\n').map(v => v.length).at(-1) / 2),
      3
    )

    this.game.draw(
      this.banner2,
      (this.game.width / 2) - (this.banner2.split('\n').map(v => v.length).at(-1) / 2),
      this.banner1.split('\n').length + 3
    )

    for (let i = 0; i < this.selections.length; i++) {
      const selection = this.selections[i]

      this.game.draw(
        i === this.currentlySelected ? `> ${selection.name}` : selection.name,
        (this.game.width / 2) - (selection.name.length / 2),
        (this.game.height / 2 * 1.7) + i
      )
    }
  }

  update() {}
}

export default Menu
