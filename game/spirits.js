import PIXI from 'pixi.js'
import { Random } from 'meteor/random'
// UI
import bottom from './behaviours/ui/bottom'
import mainMenu from './behaviours/ui/mainMenu'

var behaviours = {
  'ui-bottom': bottom,
  'ui-mainMenu': mainMenu,
}

export class Spirit extends PIXI.Container{
  constructor(type, name, options = {}){
    super()
    Tools.extend(this, options)
    do{
      this._id = Random.id()
    }while(Game.spirits.map(a=>a._id).includes(this._id))
    this.sprite = new PIXI.Sprite(PIXI.Texture.from(options.texture || `${type == 'ui' ? 'ui' : `${type}s`}/${name}.png`))
    this.layer = type
    this.addChild(this.sprite)
    Tools.extend(this, behaviours[`${type}-${name}`])
    Game.spirits.push(this)
    this.init(options)
  }
  remove(){
    Game.spirits.find(a=>a._id == this._id).destroy(true)
    Game.spirits = Game.spirits.filter(a=>a._id != this._id)
  }
}
