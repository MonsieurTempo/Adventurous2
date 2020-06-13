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
      lineJoin: "round",
      strokeThickness: 1
    }),
    get(name, clone = false){
      return clone ? this[name].clone() : this[name]
    }
  },
  init(){
    this.app = new PIXI.Application({width:960, height:660, transparent:true, antialias:true})
    this.stage = this.app.stage
    $('#Home').append(this.app.view)
    // Load saved data
    console.log(new Character('Sjt43f6bYiuFrfzmp'))
    this.layoutUI('mainMenu')
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
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
  }
}

// Belongs in credits: Mallory Moody