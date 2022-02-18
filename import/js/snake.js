class Snake {
  constructor () {
    this.x = 0
    this.y = 0
    this.a = 0
    this.ai = two_pi * 4 / 360
    this.two_ai = this.ai * 2
    this.v = 0
    this.vi = 0.1
    this.vmx = 10
    this.vmn = 0

    this.keys = []
    this.accelerate = false
    this.turn_left = false
    this.turn_right = false

    this.sections = []
    this.load_sections(2)
  }

  key_up (key) {
    let index = this.keys.indexOf(key)
    if (index > -1) this.keys.splice(index, 1)
  }
  
  key_down (key) {
    let index = this.keys.indexOf(key)
    if (index == -1) this.keys.push(key)
  }

  process () {
    this.process_keys()
    this.move()
    this.change_angle()
    this.change_velocity()

    for(let i = 0; i < this.sections.length; i++) {
      let section = this.sections[i]
      section.process()
    }
  }

  process_keys () {
    this.turn_left = this.keys.includes('ArrowLeft')
    this.turn_right = this.keys.includes('ArrowRight')
    this.accelerate = this.keys.includes('ArrowUp')
  }

  change_angle () {
    let ai = this.ai * this.v / this.vmx
    if (this.turn_left) this.a -= ai
    if (this.turn_right) this.a += ai
    if (this.a > two_pi) this.a -= two_pi
    if (this.a < 0) this.a += two_pi
  }

  change_velocity () {
    if (this.accelerate) {
      this.v += this.vi
      if (this.v > this.vmx) this.v = this.vmx
    } else {
      this.v -= this.vi
      if (this.v < this.vmn) this.v = this.vmn
    }
  }

  move () {
    this.x += this.v * Math.cos(this.a)
    this.y += this.v * Math.sin(this.a)
  }

  draw (ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.a)
    ctx.beginPath()
    ctx.moveTo(ss4, ss2)
    ctx.lineTo(ss4, -ss2)
    ctx.lineTo(-ss2, -ss3)
    ctx.arc(-ss2, -ss1, ss2, -half_pi, pi, true)
    ctx.lineTo(-ss4, ss2)
    ctx.arc(-ss2, ss1, ss2, pi, half_pi, true)
    ctx.lineTo(ss4, ss2)
    ctx.fill()
    ctx.restore()

    for(let i = 0; i < this.sections.length; i++) {
      let section = this.sections[i]
      section.draw(ctx)
    }
  }

  load_sections (n) {
    for (let i = 0; i < n; i++) {
      this.add_section()
    }
  }

  add_section () {
    let followed = this.sections.length ? this.sections.reverse()[0] : this

    this.sections.push(new SnakeSection(followed))
  }
}