import PIXI from 'pixi.js'
import './home.html'

Template.home.onRendered(()=>{
  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }
  PIXI.utils.sayHello(type)
  Game.state = 'Initializing'
  
  Tracker.autorun(()=>{
    console.log('Waiting for user.')
    if(Meteor.user()){
      console.log('User found, starting game')
      Game.init()
      Game.state = 'running'
    }
  })
})
