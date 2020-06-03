import PIXI from 'pixi.js'
import './update'

Game = {
  state:function(){return Session.get('state')}(),
  init(){
    let app = new PIXI.Application({width: 960, height: 660})
    $('#Home').append(app.view)
    window.requestAnimationFrame(GameLoop)
  }
}
