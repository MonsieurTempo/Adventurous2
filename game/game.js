import PIXI from 'pixi.js'
import './update'
import { Area, Party, Character, Class, Skill, Item, Status } from './classes'
import { Spirit } from './spirits'

Game = {
  state: false,
  mode: false, // In town: explore, in dungeon: adventure, in shop: trade, in combat: combat
  init(){
    this.app = new PIXI.Application({width: 960, height: 660})
    this.stage = this.app.stage
    $('#Home').append(this.app.view)
    // Load saved data
    this.bob = new Character('Sjt43f6bYiuFrfzmp')
    this.ui = {// Depends on the mode
      bottom: new Spirit('ui', 'bottom', {x: 0, y: 461})
    }
    this.stage.addChild(Game.ui.bottom)
    console.log(this)
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
  }
}

// Belongs in credits: Mallory Moody