import PIXI from 'pixi.js'
import './home.html'

Template.home.onRendered(()=>{
  var type = "WebGL"
  if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
  }
  PIXI.utils.sayHello(type)
  Game.state = 'initializing'
  Session.set('state', 'initializing')

  Tracker.autorun(()=>{
    console.log('Waiting for user.')
    if(Meteor.user() && Session.get('subscribed') && Game.state == 'initializing'){
      console.log('User found, starting game')
      Game.init()
      Game.state = 'running'
      Session.set('state', 'running')
    }
  })
})

Template.home.helpers({
  fullscreenIcon(){
    return Session.get('fsIcon') || 'expand'
  }
})

Template.home.events({
  'keyup .loginMenu input'(e){
    if(e.key == 'Enter'){
      Meteor.loginWithPassword($('#Username').val(), $('#Password').val())
    }
  },
  'click .login'(e){
    Meteor.loginWithPassword($('#Username').val(), $('#Password').val())
  },
  'click .fs'(){
    var elem = $('#Home')[0]
    if(document.fullscreenElement || document.webkitFullscreenElement){
      if(document.exitFullscreen){
        document.exitFullscreen().catch(err=>console.log(err))
      }else if(document.msExitFullscreen){
        document.msExitFullscreen()
      }
    }else{
      if(elem.requestFullscreen){
        elem.requestFullscreen().catch(err=>console.log(err))
      }else if(elem.mozRequestFullScreen){
        elem.mozRequestFullScreen()
      }else if(elem.webkitRequestFullscreen){
        elem.webkitRequestFullscreen()
      }else if(elem.msRequestFullscreen){
        elem.msRequestFullscreen()
      }
    }
    setTimeout(()=>{Game.resize()}, 100)
  },
  'fullscreenchange #Home, MSFullscreenChange #Home'(){
    Session.set('fsIcon', (document.fullscreenElement || document.webkitFullscreenElement) ? 'compress' : 'expand')
  }
})
