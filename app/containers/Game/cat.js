export default class Cat {
  constructor(game, fireDB, uid, x, y) {
    // console.log('adding cat for: ' + uid)
    this.cat = game.add.sprite(x, y, 'cat', 1)
    this.cat.bringToTop()
    fireDB.ref('cats/' + uid).once('value').then((snapshot) => {
      const cat = snapshot.val()
      const emoji = game.add.image(0, 0, `${cat.type}_ICON`)
      const name = game.add.text(10, -14, `${cat.name}`, {font: '11px Helvetica', fill: '#fff', align: 'center', stroke: '#000', strokeThickness: 2})
      name.anchor.x = Math.round(name.width * 0.5) / name.width
      emoji.anchor.x = Math.round(emoji.width * 0.5) / emoji.width
      name.addChild(emoji)
      this.cat.addChild(name)
    })
  }
  setCoord(x, y) {
    this.cat.x = x
    this.cat.y = y
  }
  destroy() {
    this.cat.destroy()
  }
}
