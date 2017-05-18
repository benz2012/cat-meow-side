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
  const updates = {}
  updates['map/' + uid + '/x'] = window.player.x
  updates['map/' + uid + '/y'] = window.player.y
  fireDB.ref().update(updates)

  Object.keys(window.actionStack).forEach((uid_) => {
    if (uid === uid_) { return } // this is only to update the location of other cats
    const userStack = window.actionStack[uid_]
    if (userStack.length > 0) {
      const newestAction = userStack.pop()
      window.actionStack[uid_] = []
      // update cat location here
      const { x, y } = newestAction
      window.catSpritesOnMap[uid_].setCoord(x, y)
    }
  })
}
