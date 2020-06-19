import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    var label = new PIXI.Text(options.text, options.style)

    if(options.anchor){
      label.anchor.set(options.anchor.x||0, options.anchor.y||0)
    }
    
    this.addChild(label)

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