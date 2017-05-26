import Phaser from 'phaser'

import Cat from './cat'
import { getKeyByValue } from 'utils/objectUtils'
import { GAME } from 'config'

window.cursors
window.keys = {}
window.player
window.weapon

export function create(user, uid, fireDB) {
  window.game.physics.startSystem(Phaser.Physics.P2JS)

  const map = window.game.add.tilemap('map', 16, 16)
  map.addTilesetImage('grass')
  const layer = map.createLayer(0)
  layer.resizeWorld()

  const text_center = center({width: 200, height: 50})
  window.game.add.text(text_center.x, text_center.y-100, 'Cats Meow Side\nHow Bow Dat', {font: 'bold 32px Helvetica', fill: '#fff', align: 'center'})

  window.player = window.game.add.sprite(window.game.world.centerX, window.game.world.centerY, `${user.color}_CAT`)
  window.game.physics.p2.enable(window.player)
  window.player.body.fixedRotation = true;
  window.player.orientation = GAME.CAT.DIRECTION.SOUTH
  const catType = getKeyByValue(GAME.CAT.TYPE, user.type)
  fireDB.ref('map/' + uid).set({hp_now: user.hp_full, x: window.player.x, y: window.player.y})

  window.player.animations.add('left', [3, 4, 5], 10, true)
  window.player.animations.add('right', [6, 7, 8], 10, true)
  window.player.animations.add('down', [0, 1, 2], 10, true)
  window.player.animations.add('up', [9, 10, 11], 10, true)

  const name = window.game.add.text(
    0, -30, `${user.name}`,
    {font: '11px Helvetica', fill: '#fff', align: 'center', stroke: '#000', strokeThickness: 2}
  )
  name.anchor.x = Math.round(name.width * 0.5) / name.width
  const emoji = window.game.add.image(
    (name.width / 2) + 8, 2, `${user.type}_ICON`
  )
  emoji.anchor.x = Math.round(emoji.width * 0.5) / emoji.width
  name.addChild(emoji)
  window.player.addChild(name)

  window.weapon = window.game.add.weapon(40, `${user.type}_WEAPON`)
  window.weapon.bulletKillType = Phaser.Weapon.KILL_DISTANCE
  window.weapon.bulletKillDistance = GAME.CAT.WEAPON_DISTANCE[catType]
  window.weapon.bulletSpeed = 800
  window.weapon.trackSprite(window.player, 0, 0, false)

  window.game.physics.p2.setBoundsToWorld(true, true, true, true, false)
  window.cursors = window.game.input.keyboard.createCursorKeys()
  window.keys.spacebar = window.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
  window.game.camera.follow(window.player)

  // window.weapon.onFire.add((bullet, weapon) => {
  //   firebase: send weapon.x, weapon.y, weapon.fireAngle
  // })
  window.keys.spacebar.onDown.add(() => {
    window.weapon.fireAngle = 360 - (window.player.orientation * 90)
    window.weapon.fire()
  }, this)

  // create opponent cats
  Object.keys(window.catsOnMap).forEach((catId) => {
    if (catId === uid) { return } // we already added our own cat
    const { x, y } = window.catsOnMap[catId]
    const cat = new Cat(window.game, fireDB, catId, x, y)
    window.catSpritesOnMap[catId] = cat
  })
}

function center(item, scale) {
  if (!scale) {
    scale = [1, 1]
  }
  return {
    x: window.game.world.centerX - (item.width/2/scale[0]),
    y: window.game.world.centerY - (item.height/2/scale[1])
  }
}
