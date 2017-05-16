import React from 'react'
import Phaser from 'phaser'

import { preload } from './Preload'
import { create } from './Create'
import { update } from './Update'

class GameContainer extends React.Component {
  render() {
    return (
      <div id='phaser-game'></div>
    )
  }
}

class Game extends Phaser.Game {
  constructor() {
    const WIDTH = 940
    const HEIGHT = 700

    super(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-game', {
          preload: preload,
          create: create,
          update: update
    })
  }
}

window.game = new Game()

export default GameContainer
