import React from 'react'
import Phaser from 'phaser'

import { preload } from './Preload'
import { create } from './Create'
import { update } from './Update'

const WIDTH = 940
const HEIGHT = 700

class GameContainer extends React.Component {
  componentDidMount() {
    console.log('hi')
    window.game = new Game()
  }
  render() {
    return (
      <div id='phaser-game' style={{width: WIDTH, margin: 'auto'}}></div>
    )
  }
}

class Game extends Phaser.Game {
  constructor() {
    super(WIDTH, HEIGHT, Phaser.AUTO, 'phaser-game', {
          preload: preload,
          create: create,
          update: update
    })
  }
}
//
// window.game = new Game()

export default GameContainer
