import React from 'react'
import Phaser from 'phaser'

import { preload } from './Preload'
import { create } from './Create'
import { update } from './Update'
import { GAME } from 'config'

class Game extends Phaser.Game {
  constructor(firebase, mapRef, user, uid) {
    super(GAME.WIDTH, GAME.HEIGHT, Phaser.AUTO, 'phaser-game', {
          preload: preload,
          create: () => (create(user, mapRef)),
          update: () => (update(firebase.database(), uid))
    })
  }
}

class GameContainer extends React.Component {
  componentDidMount() {
    const { firebase, uid } = this.props
    let user = {}
    const userRef = firebase.database().ref('cats/' + uid)
    const mapRef = firebase.database().ref('map/' + uid)
    userRef.once('value').then((snapshot) => {
      user = snapshot.val()
      window.game = new Game(firebase, mapRef, user, uid)
    })
    mapRef.onDisconnect().remove()
  }
  render() {
    return (
      <div id='phaser-game' style={{width: GAME.WIDTH, margin: 'auto'}}></div>
    )
  }
}

export default GameContainer
