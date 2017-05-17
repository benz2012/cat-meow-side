export default class Cat {
  constructor(uid, x, y) {
    this.cat = game.add.sprite(x, y, 'cat')
    this.cat.frame = 1
    this.uid = uid
    const { username, emoji } = this.catInfo(uid)
    const name = game.add.text(5, -30, `${username} ${emoji}`, {font: '11px Helvetica', fill: '#fff', align: 'center', stroke: '#000', strokeThickness: 2})
    name.anchor.x = Math.round(name.width * 0.5) / name.width
    this.cat.addChild(name)
  }
  catInfo(uid) {
    fireDB.ref('cats/' + uid).once().then((snapshot) => {
      const cat = snapshot.val()
      return {username: cat.name, emoji: ['💧', '⚔️'][cat.type]}
    })
  }
  setCoord(x, y) {
    this.cat.body.x = x
    this.cat.body.y = y
  }
}
