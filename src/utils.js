import { exec } from 'child_process'

export function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

export function playMusic(fileName, repeat = 0) {
  exec(`play assets/${fileName} repeat ${repeat}`)
}

export default {
  randomNumber,
  playMusic
}
