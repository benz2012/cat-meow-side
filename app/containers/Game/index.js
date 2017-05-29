import React from 'react'
import Phaser from 'phaser'

import { preload } from './Preload'
import { create } from './Create'
import { update } from './Update'
import Cat from './cat'
import { GAME } from 'config'

class Game extends Phaser.Game {
  constructor(fireDB, user, uid, died) {
    super(GAME.WIDTH, GAME.HEIGHT, Phaser.CANVAS, 'phaser-game', {
          preload: preload,
          create: () => (create(user, uid, fireDB)),
          update: () => (update(fireDB, uid, died)),
    })
  }
}

class GameContainer extends React.Component {
  componentWillMount() {
    const { firebase, uid } = this.props
    const fireDB = firebase.database()
    fireDB.ref('active/' + uid).set(true)
  }
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
    // const globalCatsRef = fireDB.ref('cats')
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
      if (window.actionStack[data.key]) {
        window.actionStack[data.key].push(data.val())
      }
    })

    // build and run the game
    const userRef = fireDB.ref('cats/' + uid)
    const mapRef = fireDB.ref('map/' + uid)
    let user = {}
    userRef.once('value').then((snapshot) => {
      user = snapshot.val()
      window.game = new Game(fireDB, user, uid, this.died.bind(this))
    })
    mapRef.onDisconnect().remove()

    // watch for cats joining or leavin the game
    let ignoreInitial = true
    globalMapRef.on('child_added', (data) => {
      if (data.key === uid) { return } // don't re-render ourself
      if (!ignoreInitial) {
        window.actionStack[data.key] = []
        const cat = new Cat(window.game, fireDB, data.key, data.val().x, data.val().y)
        window.catSpritesOnMap[data.key] = cat
      }
    })
    globalMapRef.once('value').then((snapshot) => {
      ignoreInitial = false
    })
    globalMapRef.on('child_removed', (data) => {
      delete window.actionStack[data.key]
      if (window.catSpritesOnMap[data.key]) {
        window.catSpritesOnMap[data.key].cat.destroy()
        delete window.catSpritesOnMap[data.key]
      }
    })

    // watch for weapons fired by other cats
    const globalWeaponRef = fireDB.ref('weapon')
    let ignoreInitialWeapon = true
    globalWeaponRef.on('child_added', (data) => {
      if (data.key === uid) { return } // ignore own cats weapons
      if (!ignoreInitialWeapon) {
        fireFromCat(data)
      }
    })
    globalWeaponRef.once('value').then(() => { ignoreInitialWeapon = false })
    globalWeaponRef.on('child_changed', (data) => {
      if (data.key === uid) { return } // ignore own cats weapons
      fireFromCat(data)
    })
    function fireFromCat(data) {
      const uid_ = data.key
      const weaponInfo = data.val()
      if (window.catSpritesOnMap[uid_] instanceof Cat) {
        if (window.catSpritesOnMap[uid_].weapon) {
          window.catSpritesOnMap[uid_].fireWeapon(weaponInfo.angle)
        }
      }
    }

    fireDB.ref('active/' + uid).onDisconnect().remove()
    fireDB.ref('weapon/' + uid).onDisconnect().remove()
  }
  died() {
    this.props.died()
  }
  render() {
    return (
      <div id='phaser-game' style={{width: GAME.WIDTH, margin: 'auto'}}></div>
    )
  }
}

export default GameContainer
