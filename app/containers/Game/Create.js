import Phaser from 'phaser'

import Cat from './cat'

window.cursors;
window.player;

import { GAME } from 'config'

export function create(user, mapRef) {
  game.physics.startSystem(Phaser.Physics.P2JS)

  const map = game.add.tilemap('map', 16, 16)
  map.addTilesetImage('grass')
  const layer = map.createLayer(0)
  layer.resizeWorld()

  const text_center = center({width: 200, height: 50})
  game.add.text(text_center.x, text_center.y-100, 'Cats Meow Side\nHow Bow Dat', {font: 'bold 32px Helvetica', fill: '#fff', align: 'center'})

  const player_coord = center(game.cache.getImage('cat'), [12,1])
  window.player = game.add.sprite(player_coord.x, player_coord.y, 'cat')
  game.physics.p2.enable(window.player)
  window.player.body.fixedRotation = true;
  mapRef.set({hp_now: user.hp_full, x: window.player.x, y: window.player.y})

  window.player.animations.add('left', [3, 4, 5], 10, true)
  window.player.animations.add('right', [6, 7, 8], 10, true)
  window.player.animations.add('down', [0, 1, 2], 10, true)
  window.player.animations.add('up', [9, 10, 11], 10, true)

  const emoji = ['💧', '⚔️'][user.type]
  const name = game.add.text(5, -30, `${user.name} ${emoji}`, {font: '11px Helvetica', fill: '#fff', align: 'center', stroke: '#000', strokeThickness: 2})
  name.anchor.x = Math.round(name.width * 0.5) / name.width
  window.player.addChild(name)

  game.physics.p2.setBoundsToWorld(true, true, true, true, false)
  window.cursors = game.input.keyboard.createCursorKeys()
  game.camera.follow(window.player)

  // draw all other players initially

}

function center(item, scale) {
  if (!scale) {
    scale = [1, 1]
  }
  return {
    x: game.world.centerX - (item.width/2/scale[0]),
    y: game.world.centerY - (item.height/2/scale[1])
  }
}
