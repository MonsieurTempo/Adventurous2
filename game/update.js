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
  }else if(Game.state == 'paused'){
    Game.frame = window.requestAnimationFrame(PausedLoop)
  }else{
    window.cancelAnimationFrame(Game.frame)
  }
}

function PausedLoop(time){
  timePassed = (time - oldTime||window.mozAnimationStartTime||0)/1000
  oldTime = time
  Session.set('fps', 'Paused')

  if(Game.state == 'running'){
    Game.frame = window.requestAnimationFrame(GameLoop)
  }else if(Game.state == 'paused'){
    Game.frame = window.requestAnimationFrame(PausedLoop)
  }else{
    window.cancelAnimationFrame(Game.frame)
  }
}