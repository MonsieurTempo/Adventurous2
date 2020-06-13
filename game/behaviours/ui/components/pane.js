import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    // Nineslice method:

    // var bg = new PIXI.NineSlicePlane(PIXI.Texture.from(options.texture || '/ui/9slice/blue.png'))// Check if it's 9slice first, else use a regular texture
    // delete options.texture
    // Tools.extend(bg, options)

    // Rounded rect method:

    var g = new PIXI.Graphics()
    if(options.fill){
      g.beginFill(options.fill.color||0x005e7a, options.fill.alpha||1)
    }else{
      g.beginFill(0x005e7a)
    }
    if(options.lineStyle){
      g.lineStyle(options.lineStyle.width||1, options.lineStyle.color||0x000000, options.lineStyle.alpha||1)
    }else{
      g.lineStyle(1, 0x000000)
    }
    var bg = g.drawRoundedRect(options.x||0, options.y||0, options.width||300, options.height||500, options.radius||10)
    this.addChild(bg)
  },
  step(){
    
  }
})