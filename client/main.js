import './main.html'
import './imports'

Session.set('page', 'home')

Tracker.autorun(()=>{
  if(Session.get('page') != 'home' && Game.state == 'running'){
    Game.state = 'stopped'
  }
})

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame
