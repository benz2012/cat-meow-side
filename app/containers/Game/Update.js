import Cat from './cat'

import { GAME } from 'config'

export function update(fireDB, uid) {
  window.player.body.setZeroVelocity()

  const up = window.cursors.up.isDown
  const down = window.cursors.down.isDown
  const left = window.cursors.left.isDown
  const right = window.cursors.right.isDown
  const spacebar = window.keys.spacebar.isDown

  const straight = GAME.CAT.SPEED.STRAIGHT
  const diagonal = GAME.CAT.SPEED.DIAGONAL

  if (up && !(left || right)) {
    window.player.body.moveUp(straight)
    window.player.animations.play('up')
  } else if (up && left) {
    window.player.body.moveUp(diagonal)
    window.player.body.moveLeft(diagonal)
    window.player.animations.play('left')
  } else if (up && right) {
    window.player.body.moveUp(diagonal)
    window.player.body.moveRight(diagonal)
    window.player.animations.play('right')
  } else if (down && !(left || right)) {
    window.player.body.moveDown(straight)
    window.player.animations.play('down')
  } else if (down && left){
    window.player.body.moveDown(diagonal)
    window.player.body.moveLeft(diagonal)
    window.player.animations.play('left')
  } else if (down && right) {
    window.player.body.moveDown(diagonal)
    window.player.body.moveRight(diagonal)
    window.player.animations.play('right')
  }

  if (left && !(up || down)) {
    window.player.body.moveLeft(straight)
    window.player.animations.play('left')
  } else if (right && !(up || down)) {
    window.player.body.moveRight(straight)
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
    if (window.catSpritesOnMap[uid_] instanceof Cat) {
      if (userStack.length > 0) {
        // if cat update came from server since the last cycle, update cat in game
        const newestAction = userStack.pop()
        // clear the action stack so we know when the server has stopped sending
        // us updates for this cat
        window.actionStack[uid_] = []
        const { x, y } = newestAction
        window.catSpritesOnMap[uid_].setCoord(x, y)
      } else {
        // if no cat updates from server, stop its sprite animation
        if (window.catSpritesOnMap[uid_].cat) {
          if (window.catSpritesOnMap[uid_].cat.animations) {
            window.catSpritesOnMap[uid_].cat.animations.stop()
          }
        }
      }
    }
  })
}
