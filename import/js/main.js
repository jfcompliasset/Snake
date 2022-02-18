$(() => {

	let canvas = $('canvas').get(0)
	let ctx = canvas.getContext('2d')

	let width = canvas.width = window.innerWidth
	let height = canvas.height = window.innerHeight
	let half_width = width / 2
	let half_height = height / 2

	let snake = new Snake
	let apple = new Apple(snake, width, height)

	let loop_running
	let process_interval

	let body = $('body')
	body.on('keyup', e => { snake.key_up(e.key) })
	body.on('keydown', e => { snake.key_down(e.key) })

	function loop() {
		draw_frame()
		if (loop_running) requestAnimationFrame(loop)
	}

	function start_loop () {
		process_interval = setInterval(process, 30)
		loop_running = true
		loop()
	}

	function stop_loop () {
		clearInterval(process_interval)
		loop_running = false
	}

	function draw_frame () {
		ctx.clearRect(0, 0, width, height)
		ctx.save()
		ctx.translate(half_width, half_height)
		snake.draw(ctx)
		apple.draw(ctx)
		ctx.restore()
	}

	function process () {
		snake.process()
		apple.process()
	}

	start_loop()

})

alerted = false
window.onresize = e => {
	if (!alerted) alert('Abra o console')
	alerted = true
	console.log('%cNão deu tempo de fazer responsivo.. Sorry..', 'font-size: 100px')
	console.log('Mas fica brisado, continua mexendo pra ver! HUAshuau')
}