let timePassed
let oldTime

GameLoop = (time)=>{
  timePassed = (time - oldTime||window.mozAnimationStartTime||0)/1000
  oldTime = time
  Session.set('fps', Math.round(1/timePassed))

  for(spirit of Game.spirits.filter(a=>a.step)){
    spirit.step()
  }

  if(Game.state == 'running'){
    Game.frame = window.requestAnimationFrame(GameLoop)
  }else{
    window.cancelAnimationFrame(Game.frame)
  }
}