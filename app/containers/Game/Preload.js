import Phaser from 'phaser'

export function preload() {
  game.stage.backgroundColor = '#007236'
  game.load.spritesheet('cat', 'assets/sprite/cat_white.png', 32, 32)
  game.load.tilemap('map', 'assets/map/map.csv', null, Phaser.Tilemap.CSV)
  game.load.image('grass', 'assets/tile/grass_tiles.png')
}
