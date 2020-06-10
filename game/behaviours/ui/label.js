import PIXI from 'pixi.js'
export default options=>({
  init(){
    this.addChild(new PIXI.Text(options.text, options.style))
  },
  step(){
    
  }
})