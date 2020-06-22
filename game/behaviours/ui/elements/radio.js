import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    var borderWidth = (options.lineStyle ? (options.lineStyle.width || options.style ? (Tools.textMetrics('', options.style).height / 6) : 4) : (options.style ? (Tools.textMetrics('', options.style).height / 6) : 4))

    this.radio = new PIXI.Graphics()
    if(options.fill){
      this.radio.beginFill(options.fill.color||0xFFA900, options.fill.alpha||1)
    }else{
      this.radio.beginFill(0xFFA900)
    }
    if(options.lineStyle){
      this.radio.lineStyle(options.lineStyle.width||borderWidth, options.lineStyle.color||0x000000, options.lineStyle.alpha||1)
    }else{
      this.radio.lineStyle(borderWidth, 0x000000)
    }

    var innerRadius = (options.radius || (options.style ? (Tools.textMetrics('', options.style).height / 2) : 0)) - borderWidth
    var trueRadius = innerRadius + borderWidth
    
    this.radio.drawCircle(
      trueRadius,
      trueRadius,
      innerRadius
    )

    var lbl = {x:0, y:0, width:0, height:0};

    if(options.text){
      lbl = new PIXI.Text(options.text, options.style)
      lbl.x = this.radio.x + trueRadius * 2 + 10
      lbl.y = this.radio.y
    }

    if(options.anchor){
      var xOffset = (trueRadius * 2 + 10 + lbl.width) * (options.anchor.x || 0)
      var yOffset = (trueRadius * 2) * (options.anchor.y || 0)
      this.radio.x -= xOffset
      this.radio.y -= yOffset
      lbl.x -= xOffset
      lbl.y -= yOffset
    }
    
    this.radio.interactive = true
    this.radio.buttonMode = true

    var empty = new PIXI.filters.ColorMatrixFilter()
    empty.brightness(.25)
    
    var hover = new PIXI.filters.ColorMatrixFilter()
    hover.brightness(.75)

    if(!this.selected){
      this.radio.filters = [empty]
    }
    

    this.radio.on('pointerover', (e)=>{
      this.radio.filters = this.selected ? [] : [hover]
      if(events.enter){
          events.enter(e)
      }
    })
    
    this.radio.on('pointertap', (e)=>{
      for(var spirit of Game.spirits.filter(a=>a.group == this.group)){
        spirit.radio.filters = [empty]
        spirit.selected = false
      }
      this.radio.filters = []
      this.selected = true
      // deselect others in group
      if(events.pressed){
          events.pressed(e)
      }
    })

    this.radio.on('pointerout', (e)=>{
      this.radio.filters = this.selected ? [] : [empty]
      if(events.leave){
          events.leave(e)
      }
    })

    this.addChild(this.radio, lbl)
  },
  step(){

  }
})
