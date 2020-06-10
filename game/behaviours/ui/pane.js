import PIXI from 'pixi.js'
export default options=>({
  init(){
    var bg = new PIXI.NineSlicePlane(PIXI.Texture.from(options.texture))
    bg.width = options.width
    bg.height = options.height
    this.addChild(bg)
  },
  step(){
    
  }
})