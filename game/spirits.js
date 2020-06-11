import PIXI from 'pixi.js'
import { Random } from 'meteor/random'
// UI
import bottom from './behaviours/ui/bottom'
import mainMenu from './behaviours/ui/mainMenu'
// components
import label from './behaviours/ui/components/label'
import pane from './behaviours/ui/components/pane'
import button from './behaviours/ui/components/button'

export class Spirit extends PIXI.Container{
  constructor(layer, type, options = {}){
    super()

    var behaviours = {
      'ui-bottom': bottom,
      'ui-mainMenu': mainMenu,
      'ui-label': label,
      'ui-pane': pane,
      'ui-button': button,
    }
    Tools.extend(this, options)
    do{
      this._id = Random.id()
    }while(Game.spirits.map(a=>a._id).includes(this._id))
    this.layer = layer
    Tools.extend(this, behaviours[`${layer}-${type}`](options))
    Game.spirits.push(this)
    this.init()
  }
  remove(){
    Game.spirits.find(a=>a._id == this._id).destroy(true)
    Game.spirits = Game.spirits.filter(a=>a._id != this._id)
  }
}
