import PIXI from 'pixi.js'
import './update'
import { Area, Party, Character, Class, Skill, Item, Status } from './classes'
import { Spirit } from './spirits'

Game = {
  state: false,
  ui: {},
  spirits: [],
  mode: false, // In town: explore, in dungeon: adventure, in shop: trade, in combat: combat
  init(){
    this.app = new PIXI.Application({width: 960, height: 660})
    this.stage = this.app.stage
    $('#Home').append(this.app.view)
    // Load saved data
    this.layoutUI('mainMenu')
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
  },
  layoutUI(mode){
    for(var spirit of this.spirits.filter(a=>a.layer=='ui')){
      spirit.remove()
    }
    this.ui = {}
    switch(mode){
      case 'mainMenu':
        this.ui.menu = new Spirit('ui', 'mainMenu', {z: 10})
        this.stage.addChild(this.ui.menu)
      break;
    }
  }
}

// Belongs in credits: Mallory Moody