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
    window.setInterval(cursorCapture, 10)
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

// watch for arrow press movements and store them globally for the game to
// render an accurate cat location regardless of game fps
const straight = 3
const diagonal = 2.1213
window.blip = 0
function cursorCapture() {
  // console.log('capture')
  window.blip += straight
  // if (!(window.cursors || window.player || window.currentCatLocation)) {
  //   return // no location if cursors havent been set or cat doenst exist
  // }
  //
  // const up = window.cursors.up.isDown
  // const down = window.cursors.down.isDown
  // const left = window.cursors.left.isDown
  // const right = window.cursors.right.isDown
  //
  // if (up && !(left || right)) {
  //   moveUp(straight)
  // } else if (up && left) {
  //   moveUp(diagonal)
  //   moveLeft(diagonal)
  // } else if (up && right) {
  //   moveUp(diagonal)
  //   moveRight(diagonal)
  // } else if (down && !(left || right)) {
  //   moveDown(straight)
  // } else if (down && left){
  //   moveDown(diagonal)
  //   moveLeft(diagonal)
  // } else if (down && right) {
  //   moveDown(diagonal)
  //   moveRight(diagonal)
  // }
  //
  // if (left && !(up || down)) {
  //   moveLeft(straight)
  // } else if (right && !(up || down)) {
  //   moveRight(straight)
  // }
}
// update location 100 times per second
// game will only read this value a maximum of 60 times per second
// but 1000 milliseconds / 60 updates is not an integer
function moveDown(distance) {
  window.currentCatLocation.y += distance
}
function moveUp(distance) {
  moveDown(-distance)
}
function moveRight(distance) {
  window.currentCatLocation.x += distance
}
function moveLeft(distance) {
  moveRight(-distance)
}

let prevX = 0
let prevBlip = 0
setInterval(() => {
  if (!window.currentCatLocation) { return }
  const diff = Math.abs(window.currentCatLocation.x - prevX)
  console.log(window.blip - prevBlip)
  prevBlip = window.blip
  prevX = window.currentCatLocation.x
}, 1000)


export default GameContainer
