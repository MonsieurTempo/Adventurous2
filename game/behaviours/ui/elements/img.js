import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    var img = new PIXI.Sprite.from(options.src)
    if(options.anchor){
      label.anchor.set(options.anchor.x||0, options.anchor.y||0)
    }
    delete options.src, options.anchor
    Tools.extend(this, options)
    
    this.addChild(img)

    if(events.enter){
      this.on('pointerover', events.enter)
    }
    if(events.pressed){
      this.on('pointertap', events.pressed)
    }
    if(events.leave){
      this.on('pointerout', events.leave)
    }
  },
  step(){
    
  }
})