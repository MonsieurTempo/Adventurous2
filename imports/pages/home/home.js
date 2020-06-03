import PIXI from 'pixi.js'
import './home.html'

Template.home.onRendered(()=>{
  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }
  PIXI.utils.sayHello(type)
  Session.set('state', 'initialized')
})

Tracker.autorun(()=>{
  if(Meteor.user()){
    Game.init()
    Session.set('state', 'running')
  }
})
