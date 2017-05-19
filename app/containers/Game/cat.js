export default class Cat {
  constructor(game, fireDB, uid, x, y) {
    // console.log('adding cat for: ' + uid)
    this.cat = new Object()
    fireDB.ref('cats/' + uid).once('value').then((snapshot) => {
      const catSettings = snapshot.val()
      this.cat = game.add.sprite(x, y, `${catSettings.color}_CAT`, 1)
      this.cat.anchor.x = 0.5
      this.cat.anchor.y = 0.5
      this.cat.bringToTop()
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
    if (this.cat) {
      this.cat.x = x
      this.cat.y = y
    }
  }
  destroy() {
    this.cat.destroy()
  }
}
