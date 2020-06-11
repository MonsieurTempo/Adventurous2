import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    var bg = new PIXI.NineSlicePlane(PIXI.Texture.from(options.texture || '/ui/9slice/blue.png'))// Check if it's 9slice first, else use a regular texture
    delete options.texture
    Tools.extend(bg, options)
    this.addChild(bg)
  },
  step(){
    
  }
})