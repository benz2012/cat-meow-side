import Phaser from 'phaser'

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
    window.player.orientation = GAME.CAT.DIRECTION.NORTH
  } else if (up && left) {
    window.player.body.moveUp(diagonal)
    window.player.body.moveLeft(diagonal)
    window.player.animations.play('left')
    window.player.orientation = GAME.CAT.DIRECTION.WEST
  } else if (up && right) {
    window.player.body.moveUp(diagonal)
    window.player.body.moveRight(diagonal)
    window.player.animations.play('right')
    window.player.orientation = GAME.CAT.DIRECTION.EAST
  } else if (down && !(left || right)) {
    window.player.body.moveDown(straight)
    window.player.animations.play('down')
    window.player.orientation = GAME.CAT.DIRECTION.SOUTH
  } else if (down && left){
    window.player.body.moveDown(diagonal)
    window.player.body.moveLeft(diagonal)
    window.player.animations.play('left')
    window.player.orientation = GAME.CAT.DIRECTION.WEST
  } else if (down && right) {
    window.player.body.moveDown(diagonal)
    window.player.body.moveRight(diagonal)
    window.player.animations.play('right')
    window.player.orientation = GAME.CAT.DIRECTION.EAST
  }

  if (left && !(up || down)) {
    window.player.body.moveLeft(straight)
    window.player.animations.play('left')
    window.player.orientation = GAME.CAT.DIRECTION.WEST
  } else if (right && !(up || down)) {
    window.player.body.moveRight(straight)
    window.player.animations.play('right')
    window.player.orientation = GAME.CAT.DIRECTION.EAST
  }

  if (!(up || down || left || right)) {
    // no cursors are active
    window.player.animations.stop()
  }

  // COLISSION CHECKS
  Object.keys(window.catSpritesOnMap).forEach(key => {
    const otherCat = window.catSpritesOnMap[key]
    // skip if either cat doesn't exist
    if (!(otherCat && otherCat.cat)) { return }
    if (typeof otherCat.cat.getBounds === 'function') {
      if (window.weapon) {
        if (window.weapon.bullets) {
          if (window.weapon.bullets.children) {
            window.weapon.bullets.children.forEach(bullet => {
              if (bullet.alive) {
                if (checkOverlap(bullet, otherCat.cat)) {
                  bullet.kill()
                  hurt(fireDB, key)
                }
              }
            })
          }
        }
      }
    }
  })

  // FIREBASE UPDATES
  // Send this persons' cat movements to firebase
  const updates = {}
  updates['map/' + uid + '/x'] = window.player.x
  updates['map/' + uid + '/y'] = window.player.y
  fireDB.ref().update(updates)
  if (window.actionStack[uid]) {
    const userStack = window.actionStack[uid]
    if (userStack.length > 0) {
      const newestAction = userStack.pop()
      window.actionStack[uid] = []
      console.log('health: ', newestAction.hp_now)
    }
  }

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

function checkOverlap(spriteA, spriteB) {
  const boundsA = spriteA.getBounds()
  const boundsB = spriteB.getBounds()
  return Phaser.Rectangle.intersects(boundsA, boundsB)
}

function hurt(fireDB, catId) {
  fireDB.ref('map/' + catId).transaction((cat) => {
    if (cat) {
      if (cat.hp_now) {
        cat.hp_now -= 1
      }
    }
    return cat
  });
}
