class Apple {
  constructor (snake, width, height) {
    this.f = snake
    this.width = width
    this.height = height

    this.x = 0
    this.y = 0
    this.a = 0

    this.time = 200000

    this.new_position()
  }

  process() {
    let dx = this.f.x - this.x
    let dy = this.f.y - this.y
    let d = this._d = Math.sqrt(dx * dx + dy * dy)

    if (d < ss5) {
      this.f.add_section()
      this.new_position()
    }
  }

  new_position () {
    let apple = this

    this.x = Math.floor( Math.random() * this.width ) - (this.width / 2)
    this.y = Math.floor( Math.random() * this.height ) - (this.height / 2)
    
    if (typeof this.timer != 'undefined') clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      apple.new_position()
    }, this.time)
  }
  
  draw (ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.arc(0, 0, ss3, 0, two_pi)
    ctx.stroke()
    ctx.restore()
  }
}