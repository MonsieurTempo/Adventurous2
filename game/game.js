import PIXI from 'pixi.js'
import './update'
import { Area, Party, Character, Class, Skill, Item, Status } from './classes'
import { Spirit } from './spirits'

Game = {
  state: false,
  ui: {},
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
    this.app = new PIXI.Application({width:$('#Home').innerWidth(), height:$('#Home').innerHeight(), transparent:true, antialias:true})
    this.stage = this.app.stage
    this.resize()
    $('#Home').append(this.app.view)
    // Load saved data
    this.bob = new Character('Sjt43f6bYiuFrfzmp')
    this.layoutUI('combat')
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
    window.addEventListener('resize', this.resize.bind(this))
  },
  layoutUI(mode){
    for(var spirit of this.spirits.filter(a=>a.layer == 'ui')){
      spirit.remove()
    }
    this.ui = {}
    switch(mode){
      default:
        this.ui.menu = new Spirit('ui', mode)
        this.stage.addChild(this.ui.menu)
    }
  },
  resize(){
    this.app.renderer.resize($('#Home').innerWidth(), $('#Home').innerHeight())
  },
  currentParty(newParty){
    if(newParty){
      this.party = newParty
    }
    if(!this.party){
      Game.layoutUI('partySelect')
    }else{
      return new Party(this.party)
    }
  }
}

// Belongs in credits: MM