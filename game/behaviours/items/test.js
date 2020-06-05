import PIXI from 'pixi.js'

export default class Item {
  constructor(options){
    var info = Items.findOne(options.id)
    console.log(info)
  }
  init(){
    console.log('Test loaded')
  }
  step(){

  }
}
