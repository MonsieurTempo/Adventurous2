let timePassed
let oldTime

GameLoop = (time)=>{
  timePassed = (time - oldTime||window.mozAnimationStartTime||0)/1000
  oldTime = time
  Session.set('fps', Math.round(1/timePassed))
  if(Game.state == 'running'){
    Game.frame = window.requestAnimationFrame(GameLoop)
  }else{
    window.cancelAnimationFrame(Game.frame)
  }
}