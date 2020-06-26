import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    var pane = new PIXI.Graphics()
    if(options.fill){
      pane.beginFill(options.fill.color||0x005e7a, options.fill.alpha||1)
    }else{
      pane.beginFill(0x005e7a)
    }
    if(options.lineStyle){
      pane.lineStyle(options.lineStyle.width||1, options.lineStyle.color||0x000000, options.lineStyle.alpha||1)
    }else{
      pane.lineStyle(1, 0x000000)
    }
    pane.drawRoundedRect(options.x||0, options.y||0, options.width||300, options.height||500, options.radius||10)

    this.addChild(pane)
  },
  step(){
    
  }
})