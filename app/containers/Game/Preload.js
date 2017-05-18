import Phaser from 'phaser'

import { GAME } from 'config'

export function preload() {
  game.stage.backgroundColor = '#007236'
  game.load.spritesheet('cat', 'assets/sprite/cat_white.png', 32, 32)
  game.load.tilemap('map', 'assets/map/map.csv', null, Phaser.Tilemap.CSV)
  game.load.image('grass', 'assets/tile/grass_tiles.png')
  game.load.image(`${GAME.CAT.TYPE.WORRIER}_ICON`, 'assets/image/droplet_12.png')
  game.load.image(`${GAME.CAT.TYPE.WARRIOR}_ICON`, 'assets/image/swords_12.png')
}
