let frameCount = 0
let startTime = 0

function calculateFps() {
  const currentTime = performance.now()
  const elapsedTime = currentTime - startTime

  const fps = Math.round(frameCount / elapsedTime * 1000)
  console.log(`Current FPS: ${fps}`)

  frameCount = 0
  startTime = currentTime
}

function render() {
  frameCount++
  window.requestAnimationFrame(render)
}

function start() {
  startTime = performance.now()
  window.requestAnimationFrame(render)
  setInterval(calculateFps, 1000)
}

start()
