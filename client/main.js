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
Session.set('subscribed', false)

var ready = [
  Meteor.subscribe('users', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('user', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('areas', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('quests', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('parties', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('characters', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('classes', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('skills', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('items', {onError(){console.log(arguments[0].message)}}),
  Meteor.subscribe('status', {onError(){console.log(arguments[0].message)}})
]

Tracker.autorun(()=>{
  if(ready.every(a=>a.ready())){
    Session.set('subscribed', true)
  }
})
