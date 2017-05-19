import { GAME } from 'config'

export default class Cat {
  constructor(game, fireDB, uid, x, y) {
    // console.log('adding cat for: ' + uid)
    this.cat = new Object()
    fireDB.ref('cats/' + uid).once('value').then((snapshot) => {
      const catSettings = snapshot.val()
      this.cat = game.add.sprite(x, y, `${catSettings.color}_CAT`, 1)
      this.prev = {x: this.cat.x, y: this.cat.y}
      this.cat.anchor.x = 0.5
      this.cat.anchor.y = 0.5
      this.cat.bringToTop()
      this.cat.animations.add('left', [3, 4, 5], 10, true)
      this.cat.animations.add('right', [6, 7, 8], 10, true)
      this.cat.animations.add('down', [0, 1, 2], 10, true)
      this.cat.animations.add('up', [9, 10, 11], 10, true)

      const name = game.add.text(
        0, -30, `${catSettings.name}`,
        {
          font: '11px Helvetica',
          fill: '#fff',
          align: 'center',
          stroke: '#000',
          strokeThickness: 2
        }
      )
      name.anchor.x = Math.round(name.width * 0.5) / name.width
      const emoji = game.add.image(
        (name.width / 2) + 8, 2, `${catSettings.type}_ICON`
      )
      emoji.anchor.x = Math.round(emoji.width * 0.5) / emoji.width
      name.addChild(emoji)
      this.cat.addChild(name)
    })
  }
  setCoord(x, y) {
    if (this.cat && this.prev) {
      const angle = Math.atan2(y - this.prev.y, x - this.prev.x) //radians
      const quadrant = Math.round( 4 * angle / (2*Math.PI) + 4 ) % 4
      switch (quadrant) {
        case GAME.CAT.DIRECTION.NORTH:
          this.cat.animations.play('down')
          break
        case GAME.CAT.DIRECTION.SOUTH:
          this.cat.animations.play('up') // idk why these are flopped, but it works
          break
        case GAME.CAT.DIRECTION.EAST:
          this.cat.animations.play('right')
          break
        case GAME.CAT.DIRECTION.WEST:
          this.cat.animations.play('left')
          break
      }

      this.cat.x = x
      this.cat.y = y
      this.prev = {x: x, y: y}
    }
  }
  destroy() {
    this.cat.destroy()
  }
}
