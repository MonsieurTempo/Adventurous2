import PIXI from 'pixi.js'
import { Random } from 'meteor/random'
// components
import loading from './behaviours/ui/components/loading'
import mainMenu from './behaviours/ui/components/mainMenu'
import partySelect from './behaviours/ui/components/partySelect'
import partyCreate from './behaviours/ui/components/partyCreate'
import bottom from './behaviours/ui/components/bottom'
import gameOptions from './behaviours/ui/components/options'
// elements
import label from './behaviours/ui/elements/label'
import pane from './behaviours/ui/elements/pane'
import button from './behaviours/ui/elements/button'
import radio from './behaviours/ui/elements/radio'
import textbox from './behaviours/ui/elements/textbox'
import portrait from './behaviours/ui/elements/portrait'
import img from './behaviours/ui/elements/img'

export class Spirit extends PIXI.Container{
  constructor(layer, type, options = {}, events = {}){
    super()

    var behaviours = {
      'ui-bottom': bottom,
      'ui-loading': loading,
      'ui-mainMenu': mainMenu,
      'ui-partySelect': partySelect,
      'ui-partyCreate': partyCreate,
      'ui-label': label,
      'ui-pane': pane,
      'ui-button': button,
      'ui-radio': radio,
      'ui-textbox': textbox,
      'ui-portrait': portrait,
      'ui-img': img,
      'ui-options': gameOptions
    }

    Tools.extend(this, options)
    do{
      this._id = Random.id()
    }while(Game.spirits.map(a=>a._id).includes(this._id))
    this.layer = layer
    if(behaviours[`${layer}-${type}`]){
      Tools.extend(this, behaviours[`${layer}-${type}`](options, events))
    }else{
      console.log(`Missing behavior: ${layer}-${type}`)
    }
    Game.spirits.push(this)
    this.init()
    if(this.anchor){
      this.x -= this.width*(this.anchor.x||0)
      this.y -= this.height*(this.anchor.y||0)
    }
  }
  remove(){
    if(this.kill){
      this.kill()
    }
    for(var child of this.children){
      if(child.remove){
        child.remove()
      }
    }
    this.destroy(true)
    Game.spirits = Game.spirits.filter(a=>a._id != this._id)
  }
}
