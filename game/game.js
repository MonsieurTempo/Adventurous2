import PIXI from 'pixi.js'
import './update'
import { Area, Party, Character, Class, Skill, Item, Status } from './classes'
import { Spirit } from './spirits'

Game = {
  state: false,
  fullScreen: document.fullscreenElement || document.webkitFullscreenElement,
  targetWidth: 1920,
  targetHeight: 1080,
  spirits: [],
  styles: {
    menu: new PIXI.TextStyle({
      name: 'menu',
      fill: "white",
      fontFamily: "Verdana",
      strokeThickness: 1
    }),
    icon: {
      name: 'icon',
      fill: 0xFF0000,
      fontFamily: 'Font Awesome 5 Duotone',
      fontWeight: 900
    },
    get(name, clone = false){
      return clone ? this[name].clone() : this[name]
    }
  },
  init(){
    this.app = new PIXI.Application({width:this.targetWidth, height:this.targetHeight, transparent:true, antialias:true})
    this.stage = this.app.stage
    this.resize()
    $('#Home').append(this.app.view)
    this.layoutUI('mainMenu')
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  layoutUI(mode, info){
    Game.layout = mode
    for(var spirit of this.spirits.filter(a=>a.layer == 'ui')){
      spirit.remove()
    }
    switch(mode){
      case 'combat':
        console.log(info)
        this.stage.addChild(new Spirit('ui', 'bottom'))
      break
      default:
        this.stage.addChild(new Spirit('ui', mode))
    }
  },
  initCombat(info){
    this.layoutUI('combat', info)
  },
  resize(){
    Session.set('screenSize', `${$('#Home').innerWidth()} X ${$('#Home').innerHeight()}`)
    var fs = document.fullscreenElement || document.msFullScreenElement
    var shortSide = $('#Home').innerWidth() < $('#Home').innerHeight() ? 'Width' : 'Height'
    var grow = ((($('#Home').innerWidth()*9)/$('#Home').innerHeight())/9)*Game.targetHeight
    if(fs){
      Game.app.renderer.resize(shortSide == 'Width' ? Game.targetHeight : Math.floor(grow), Game.targetHeight)
      $('#Home canvas').css({width:'100vw', height:`${$('#Home')[`inner${shortSide}`]()}px`, border:'1px solid white'})
    }else{
      Game.app.renderer.resize(Game.targetWidth, Game.targetHeight)
      $('#Home canvas').css({width:'80%', height:'auto', border:'1px solid black'})
    }
    if(Game.layout){
      Game.layoutUI(Game.layout)
    }
  },
  currentParty(newParty){
    if(newParty){
      Meteor.call('setParty', newParty, (err, res)=>{
        if(err){
          console.log(err)
        }
      })
    }else{
      return Meteor.user().party ? new Party(Meteor.user().party) : false
    }
  }
}

// Belongs in credits: MM