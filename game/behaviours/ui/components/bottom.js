import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    this.bottom = new PIXI.Sprite.from('ui/bottom.png')
    
    this.addChild(this.bottom)
  },
  step(){
    this.bottom.width = Game.app.screen.width
    this.bottom.height = (Game.app.screen.width * 199)/961
    this.bottom.y = Game.app.screen.height - this.bottom.height
  }
})