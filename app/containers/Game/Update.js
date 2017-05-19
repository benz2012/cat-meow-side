import Cat from './cat'

import { GAME } from 'config'

export function update(fireDB, uid) {
  window.player.body.setZeroVelocity()

  window.player.body.x = window.currentCatLocation.x
  window.player.body.y = window.currentCatLocation.y
  // console.log(window.currentCatLocation)

  const up = window.cursors.up.isDown
  const down = window.cursors.down.isDown
  const left = window.cursors.left.isDown
  const right = window.cursors.right.isDown
  const spacebar = window.keys.spacebar.isDown

  // const straight = GAME.CAT.SPEED.STRAIGHT
  // const diagonal = GAME.CAT.SPEED.DIAGONAL
  const straight = 5
  const diagonal = 3.5355

  if (up && !(left || right)) {
    // moveUp(window.player, straight)
    // window.player.y += straight
    window.player.animations.play('up')
  } else if (up && left) {
    // moveUp(window.player, diagonal)
    // moveLeft(window.player, diagonal)
    window.player.animations.play('left')
  } else if (up && right) {
    // moveUp(window.player, diagonal)
    // moveRight(window.player, diagonal)
    window.player.animations.play('right')
  } else if (down && !(left || right)) {
    // moveDown(window.player, straight)
    window.player.animations.play('down')
  } else if (down && left){
    // moveDown(window.player, diagonal)
    // moveLeft(window.player, diagonal)
    window.player.animations.play('left')
  } else if (down && right) {
    // moveDown(window.player, diagonal)
    // moveRight(window.player, diagonal)
    window.player.animations.play('right')
  }

  if (left && !(up || down)) {
    // moveLeft(window.player, straight)
    window.player.animations.play('left')
  } else if (right && !(up || down)) {
    // moveRight(window.player, straight)
    window.player.animations.play('right')
  }

  if (!(up || down || left || right)) {
    // no cursors are active
    window.player.animations.stop()
  }

  if (spacebar) {
    console.log('spacebar')
  }

  // FIREBASE UPDATES
  // Send this persons' cat movements to firebase
  const updates = {}
  updates['map/' + uid + '/x'] = window.player.x
  updates['map/' + uid + '/y'] = window.player.y
  fireDB.ref().update(updates)

  // Update features of other cats
  Object.keys(window.actionStack).forEach((uid_) => {
    if (uid === uid_) { return }
    const userStack = window.actionStack[uid_]
    if (userStack.length > 0) {
      // if cat update came from server since the last cycle, update cat in game
      const newestAction = userStack.pop()
      // clear the action stack so we know when the server has stopped sending
      // us updates for this cat
      window.actionStack[uid_] = []
      if (window.catSpritesOnMap[uid_] instanceof Cat) {
        const { x, y } = newestAction
        window.catSpritesOnMap[uid_].setCoord(x, y)
        const d = new Date()
        // console.log(d.getTime(), window.catSpritesOnMap[uid_].cat.x)
      }
    }
  })
}

function moveDown(sprite, distance) {
  sprite.body.y += distance
}
function moveUp(sprite, distance) {
  moveDown(sprite, -distance)
}
function moveRight(sprite, distance) {
  sprite.body.x += distance
}
function moveLeft(sprite, distance) {
  moveRight(sprite, -distance)
}
