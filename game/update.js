let timePassed
let oldTime

GameLoop = (time)=>{
  timePassed = (time - oldTime||0)/1000
  oldTime = time
  Session.set('fps', Math.round(1/timePassed))
  window.requestAnimationFrame(GameLoop)
}