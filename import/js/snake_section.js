class SnakeSection {
  constructor (followed) {
    this.f = followed
    this.d = ss5
    this.x = this.f.x - this.d
    this.y = this.f.y
    this.a = 0

    this._d = 0
  }

  process () {
    let dx = this.f.x - this.x
    let dy = this.f.y - this.y
    let d = this._d = Math.sqrt(dx * dx + dy * dy)
    this.a = Math.asin(dy / d)
    if (dx < 0) this.a = pi - this.a

    this.x = this.f.x - this.d * Math.cos(this.a)
    this.y = this.f.y - this.d * Math.sin(this.a)
  }

  draw (ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.a)
    ctx.strokeRect(-ss2, -ss1, ss4, ss2)
    ctx.strokeStyle = 'lime'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(this._d, 0)
    ctx.stroke()
    ctx.restore()
  }
}
