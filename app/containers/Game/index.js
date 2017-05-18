import React from 'react'
import Phaser from 'phaser'

import { preload } from './Preload'
import { create } from './Create'
import { update } from './Update'
import Cat from './cat'
import { GAME } from 'config'

class Game extends Phaser.Game {
  constructor(fireDB, user, uid) {
    super(GAME.WIDTH, GAME.HEIGHT, Phaser.AUTO, 'phaser-game', {
          preload: preload,
          create: () => (create(user, uid, fireDB)),
          update: () => (update(fireDB, uid)),
    })
  }
}

class GameContainer extends React.Component {
  componentDidMount() {
    const { firebase, uid } = this.props
    const fireDB = firebase.database()

    // global game object features
    window.catsOnMap = {}
    window.catSpritesOnMap = {}
    window.actionStack = {}
    window.actionStack[uid] = []

    // build initial object of cats on the map
    const globalMapRef = fireDB.ref('map')
    const globalCatsRef = fireDB.ref('cats')
    globalMapRef.once('value').then((snapshot) => {
      const currentCatsOnMap = snapshot.val()
      if (!currentCatsOnMap) { return }
      window.catsOnMap = currentCatsOnMap
      Object.keys(currentCatsOnMap).forEach((catId) => {
        window.actionStack[catId] = []
      })
    })

    // watch for changes from cats (ie movements or attacks)
    globalMapRef.on('child_changed', (data) => {
      window.actionStack[data.key].push(data.val())
      // console.log(window.actionStack)
    })

    // build and run the game
    const userRef = fireDB.ref('cats/' + uid)
    const mapRef = fireDB.ref('map/' + uid)
    let user = {}
    userRef.once('value').then((snapshot) => {
      user = snapshot.val()
      window.game = new Game(fireDB, user, uid)
    })
    mapRef.onDisconnect().remove()

    // watch for cats joining or leavin the game
    let ignoreInitial = true
    globalMapRef.on('child_added', (data) => {
      if (data.key === uid) { return } // don't re-render ourself
      if (!ignoreInitial) {
        window.actionStack[data.key] = []
        fireDB.ref('cats/' + data.key).once('value').then((snapshot) => {
          const cat = new Cat(
            window.game, fireDB, data.key,
            snapshot.val().x, snapshot.val().y
          )
          window.catSpritesOnMap[data.key] = cat
        })
      }
    })
    globalMapRef.once('value').then((snapshot) => {
      ignoreInitial = false
    })
    globalMapRef.on('child_removed', (data) => {
      delete window.actionStack[data.key]
      window.catSpritesOnMap[data.key].destroy()
      delete window.catSpritesOnMap[data.key]
    })
  }
  render() {
    return (
      <div id='phaser-game' style={{width: GAME.WIDTH, margin: 'auto'}}></div>
    )
  }
}

export default GameContainer
