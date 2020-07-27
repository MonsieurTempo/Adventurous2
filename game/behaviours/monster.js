import PIXI from 'pixi.js'
export default (id, options, events)=>({
  init(){
    var monster = Monsters.findOne(id)
    var sprite = new PIXI.Sprite.from(Game.textures[`monsters-${monster.texture}`])
    this.addChild(sprite)
  },
  step(){
    
  }
})
