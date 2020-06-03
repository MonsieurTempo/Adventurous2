import PIXI from 'pixi.js'

export default {
  init(){
    console.log('Test loaded')
    this.hitbox = new PIXI.Container()
    this.sprite = new PIXI.Sprite(PIXI.Texture.from('items/test.png'))
    this.hitbox.addChild(this.sprite)
    Game.stage.addChild(this.hitbox)
  },
  step(){

  }
}
