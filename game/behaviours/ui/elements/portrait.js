import PIXI from 'pixi.js'
export default (options, events)=>({
  init(){
    Object.keys(Game.textures).filter((a)=>a.includes(`${options.character.class.name}_${options.character.gender}`)).sort().map((layer, i)=>{
      var partInfo = options.character.class.layers[options.character.gender + (`00${i}`.slice(-2))]
      var part = new PIXI.Sprite(Game.textures[layer])
      part.x = partInfo.x
      part.y = partInfo.y
      part.tint = options.character.colors ? options.character.colors[partInfo.part] || partInfo.def : partInfo.def
      this.addChild(part)
    })
  },
  step(){
    
  }
})
