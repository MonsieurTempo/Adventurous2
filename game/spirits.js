import PIXI from 'pixi.js'
import { Random } from 'meteor/random'
// components
import mainMenu from './behaviours/ui/components/mainMenu'
import partySelect from './behaviours/ui/components/partySelect'
import partyCreate from './behaviours/ui/components/partyCreate'
import combat from './behaviours/ui/components/combat'
// elements
import bottom from './behaviours/ui/components/bottom'
import label from './behaviours/ui/elements/label'
import pane from './behaviours/ui/elements/pane'
import button from './behaviours/ui/elements/button'
import portrait from './behaviours/ui/elements/portrait'
import img from './behaviours/ui/elements/img'

export class Spirit extends PIXI.Container{
  constructor(layer, type, options = {}, events = {}){
    super()

    var behaviours = {
      'ui-bottom': bottom,
      'ui-mainMenu': mainMenu,
      'ui-partySelect': partySelect,
      'ui-partyCreate': partyCreate,
      'ui-label': label,
      'ui-pane': pane,
      'ui-button': button,
      'ui-portrait': portrait,
      'ui-combat': combat,
      'ui-img': img,
    }

    Tools.extend(this, options)
    do{
      this._id = Random.id()
    }while(Game.spirits.map(a=>a._id).includes(this._id))
    this.layer = layer
    Tools.extend(this, behaviours[`${layer}-${type}`](options, events))
    Game.spirits.push(this)
    this.init()
  }
  remove(){
    Game.spirits.find(a=>a._id == this._id).destroy(true)
    Game.spirits = Game.spirits.filter(a=>a._id != this._id)
  }
}
