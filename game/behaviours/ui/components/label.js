import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    this.addChild(new PIXI.Text(options.text, options.style))
  },
  step(){
    
  }
})