import Phaser from 'phaser'

import { GAME } from 'config'

export function preload() {
  // Map
  game.stage.backgroundColor = '#007236'
  game.load.tilemap('map', 'assets/map/map.csv', null, Phaser.Tilemap.CSV)
  game.load.image('grass', 'assets/tile/grass_tiles.png')

  // Cats
  game.load.spritesheet(`${GAME.CAT.COLOR.WHITE_STRIPPED}_CAT`, 'assets/sprite/cat_white_stripped.png', 32, 32)
  game.load.spritesheet(`${GAME.CAT.COLOR.WHITE}_CAT`, 'assets/sprite/cat_white.png', 32, 32)
  game.load.spritesheet(`${GAME.CAT.COLOR.YELLOW_STRIPPED}_CAT`, 'assets/sprite/cat_yellow_stripped.png', 32, 32)
  game.load.spritesheet(`${GAME.CAT.COLOR.YELLOW}_CAT`, 'assets/sprite/cat_yellow.png', 32, 32)
  game.load.spritesheet(`${GAME.CAT.COLOR.ORANGE_STRIPPED}_CAT`, 'assets/sprite/cat_orange_stripped.png', 32, 32)
  game.load.spritesheet(`${GAME.CAT.COLOR.ORANGE}_CAT`, 'assets/sprite/cat_orange.png', 32, 32)
  game.load.spritesheet(`${GAME.CAT.COLOR.BLACK}_CAT`, 'assets/sprite/cat_black.png', 32, 32)

  // User Icons
  game.load.image(`${GAME.CAT.TYPE.WORRIER}_ICON`, 'assets/image/droplet_12.png')
  game.load.image(`${GAME.CAT.TYPE.WARRIOR}_ICON`, 'assets/image/swords_12.png')
}
