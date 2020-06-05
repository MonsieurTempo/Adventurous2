import PIXI from 'pixi.js'
import uiBottom from './behaviours/ui/bottom'

var behaviours = {
  'ui-bottom': uiBottom
}

export class Spirit extends PIXI.Container{
  constructor(type, name, options = {}){
    super()
    Tools.extend(this, options)
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(options.texture || `${type == 'ui' ? 'ui' : `${type}s`}/${name}.png`))
    this.addChild(this.sprite)
    this.init = behaviours[`${type}-${name}`].init
    this.init(options)
  }
}