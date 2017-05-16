export function update() {
  window.player.body.setZeroVelocity();

  var up = window.cursors.up.isDown;
  var down = window.cursors.down.isDown;
  var left = window.cursors.left.isDown;
  var right = window.cursors.right.isDown;
  var SPEED = 300;
  var DIAG_SPEED = 212;

  if (up && !(left || right)) {
    window.player.body.moveUp(SPEED);
    window.player.animations.play('up');
  } else if (up && left) {
    window.player.body.moveUp(DIAG_SPEED);
    window.player.body.moveLeft(DIAG_SPEED);
    window.player.animations.play('left');
  } else if (up && right) {
    window.player.body.moveUp(DIAG_SPEED);
    window.player.body.moveRight(DIAG_SPEED);
    window.player.animations.play('right');
  } else if (down && !(left || right)) {
    window.player.body.moveDown(SPEED);
    window.player.animations.play('down')
  } else if (down && left){
    window.player.body.moveDown(DIAG_SPEED);
    window.player.body.moveLeft(DIAG_SPEED);
    window.player.animations.play('left');
  } else if (down && right) {
    window.player.body.moveDown(DIAG_SPEED);
    window.player.body.moveRight(DIAG_SPEED);
    window.player.animations.play('right');
  }

  if (left && !(up || down)) {
    window.player.body.moveLeft(SPEED);
    window.player.animations.play('left')
  } else if (right && !(up || down)) {
    window.player.body.moveRight(SPEED);
    window.player.animations.play('right')
  }

  if (!(up || down || left || right)) {
    // no cursors are active
    window.player.animations.stop();
    window.player.frame = 1;
  }
}
