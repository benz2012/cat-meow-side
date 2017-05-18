import Cat from './cat'

const localMap = {}

export function update(fireDB, uid) {
  window.player.body.setZeroVelocity()

  var up = window.cursors.up.isDown
  var down = window.cursors.down.isDown
  var left = window.cursors.left.isDown
  var right = window.cursors.right.isDown
  var SPEED = 300
  var DIAG_SPEED = 212

  if (up && !(left || right)) {
    window.player.body.moveUp(SPEED)
    window.player.animations.play('up')
  } else if (up && left) {
    window.player.body.moveUp(DIAG_SPEED)
    window.player.body.moveLeft(DIAG_SPEED)
    window.player.animations.play('left')
  } else if (up && right) {
    window.player.body.moveUp(DIAG_SPEED)
    window.player.body.moveRight(DIAG_SPEED)
    window.player.animations.play('right')
  } else if (down && !(left || right)) {
    window.player.body.moveDown(SPEED)
    window.player.animations.play('down')
  } else if (down && left){
    window.player.body.moveDown(DIAG_SPEED)
    window.player.body.moveLeft(DIAG_SPEED)
    window.player.animations.play('left')
  } else if (down && right) {
    window.player.body.moveDown(DIAG_SPEED)
    window.player.body.moveRight(DIAG_SPEED)
    window.player.animations.play('right')
  }

  if (left && !(up || down)) {
    window.player.body.moveLeft(SPEED)
    window.player.animations.play('left')
  } else if (right && !(up || down)) {
    window.player.body.moveRight(SPEED)
    window.player.animations.play('right')
  }

  if (!(up || down || left || right)) {
    // no cursors are active
    window.player.animations.stop()
    window.player.frame = 1
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
