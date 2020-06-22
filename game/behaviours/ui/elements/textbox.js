import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    this.textbox = $(`<input type="${options.type || 'text'}" class="position-absolute">`)
    this.resize()
    this.textbox.focus(()=>{
      Game.focus = this.textbox
    })
    if(events.input){
      this.textbox.on('input', events.input)
    }
  },
  step(){

  },
  kill(){
    this.textbox.remove()
  },
  resize(){
    var borderColor = Tools.HEXtoRGB(options.style ? options.style.color||0x000000 : 0x000000)
    var bgColor = Tools.HEXtoRGB(options.fill ? options.fill.color||0xFFFFFF : 0xFFFFFF)
    this.textbox.val(options.text || '')
    this.textbox.css({
      'opacity': options.alpha || 1,
      'left': `${Game.units(options.x, 'px').h}px`,
      'top':`${Game.units(options.y, 'px').v}px`,
      'width': `${Game.units(options.width || 200, 'px').h}px`,
      'height': `${Game.units(options.height || Tools.textMetrics('', options.style).height + (Game.units(options.lineStyle ? (options.lineStyle.width||1):1, 'px').h)*2, 'px').v}px`,
      'border-width': `${Game.units(options.lineStyle ? (options.lineStyle.width||1):1, 'px').v}px ${Game.units(options.lineStyle ? (options.lineStyle.width||1):1, 'px').h}px`,
      'border-style': 'solid',
      'border-color': `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${options.lineStyle ? options.lineStyle.alpha:1||1})`,
      'border-radius': `${Game.units(options.radius, 'px').h}px`,
      'outline': 'none',
      'background-color': `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${options.fill ? options.fill.alpha:1||1})`,
      'text-align': options.style.align,
      'color': options.style.fill,
      'font': `${options.style.fontStyle} ${options.style.fontVariant} ${options.style.fontWeight} ${Game.units(options.style.fontSize, 'px').v}px/${Game.units(options.style.lineHeight, 'px').v}px ${options.style.fontFamily}`
    })
    
    $('#UIOverlay').append(this.textbox)

    if(options.anchor){
      this.textbox.css({
        left: this.textbox.position().left - (this.textbox.width()*(options.anchor.x||0)),
        top: this.textbox.position().top - (this.textbox.height()*(options.anchor.y||0))
      })
    }
  }
})