class Game {
  constructor(options) {
    this.ms = options.ms ?? 100

    this.width = process.stdout.columns
    this.height = process.stdout.rows

    process.on('exit', () => {
      console.clear()
      process.stdout.write('\x1B[?25h')
    })

    process.on('SIGINT', () => {
      process.exit()
    })
  }

  setup(callbackFn) {
    callbackFn()
  }

  update(callbackFn) {
    setInterval(() => {
      this.width = process.stdout.columns
      this.height = process.stdout.rows

      process.stdout.write('\x1B[2J\x1B[0;0f')
      process.stdout.write('\x1B[?25l')

      callbackFn()
    }, this.ms)
  }

  draw(char, x, y) {
    process.stdout.write(`\x1b[${parseInt(y)};${parseInt(x)}H`)
    process.stdout.write(char)
  }
}

export default Game
