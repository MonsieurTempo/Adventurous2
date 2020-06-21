import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    var sprite = new PIXI.Sprite.from('monsters/nurbWurble.png')
    this.addChild(sprite)
  },
  step(){
    
  }
})