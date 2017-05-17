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

  const mapRef = fireDB.ref('map')
  mapRef.on('child_added', (data) => {
    // addCommentElement(postElement, data.key, data.val().text, data.val().author)
  })
  mapRef.on('child_changed', function(data) {
    // setCommentValues(postElement, data.key, data.val().text, data.val().author)
  })
  mapRef.on('child_removed', function(data) {
    // deleteComment(postElement, data.key)
  })
}
