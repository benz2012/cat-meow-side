import React from 'react'
import Phaser from 'phaser'

import { preload } from './Preload'
import { create } from './Create'
import { update } from './Update'
import { GAME } from 'config'

class Game extends Phaser.Game {
  constructor() {
    super(GAME.WIDTH, GAME.HEIGHT, Phaser.AUTO, 'phaser-game', {
          preload: preload,
          create: create,
          update: update
    })
  }
}

class GameContainer extends React.Component {
  componentDidMount() {
    window.game = new Game()
  }
  render() {
    return (
      <div id='phaser-game' style={{width: GAME.WIDTH, margin: 'auto'}}></div>
    )
  }
}

export default GameContainer
