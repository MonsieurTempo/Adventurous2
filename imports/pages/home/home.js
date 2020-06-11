import PIXI from 'pixi.js'
import './home.html'

Template.home.onRendered(()=>{
  let type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }
  PIXI.utils.sayHello(type)
  Game.state = 'initializing'

  Tracker.autorun(()=>{
    console.log('Waiting for user.')
    if(Meteor.user() && Session.get('subscribed')){
      console.log('User found, starting game')
      Game.init()
      Game.state = 'running'
    }
  })
})

Template.home.events({
  'click .btn'(e){
    Meteor.loginWithPassword('admin', 'password')
  }
})
