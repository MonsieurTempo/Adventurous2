import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    this.addChild(new PIXI.Text(options.text, options.style))

    if(Object.entries(events).length){
      this.interactive = true
    }

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