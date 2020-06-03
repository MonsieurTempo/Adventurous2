import PIXI from 'pixi.js'
import './update'
import test from './items/test'

Game = {
  state: false,
  init(){
    let app = new PIXI.Application({width: 960, height: 660})
    this.stage = app.stage
    $('#Home').append(app.view)
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
  },
  spawn(type, name, options){
    var spawnType = this.spawnTypes[type][name]
    spawnType.init()
    return spawnType
  },
  spawnTypes: {
    item: {
      test: test
    },
    ui: {}
  }
}
