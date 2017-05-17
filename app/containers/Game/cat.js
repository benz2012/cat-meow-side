export default class Cat {
  constructor(game, fireDB, uid, x, y) {
    this.cat = game.add.sprite(x, y, 'cat')
    this.cat.frame = 1
    this.uid = uid
    fireDB.ref('cats/' + uid).once('value').then((snapshot) => {
      const cat = snapshot.val()
      const emoji = ['💧', '⚔️'][cat.type]
      const name = game.add.text(5, -30, `${cat.name} ${emoji}`, {font: '11px Helvetica', fill: '#fff', align: 'center', stroke: '#000', strokeThickness: 2})
      name.anchor.x = Math.round(name.width * 0.5) / name.width
      this.cat.addChild(name)
    })
  }
  setCoord(x, y) {
    this.cat.body.x = x
    this.cat.body.y = y
  }
}
