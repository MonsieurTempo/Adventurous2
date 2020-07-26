import PIXI from 'pixi.js'
import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    // console.log(`${options.progress}/${options.total} ${Math.floor((options.progress/options.total)*100)}%`)
    var menu = {zIndex:10, x:Game.app.screen.width/2, y:Game.app.screen.height/3, height:450, width:600, anchor:{x:.5, y:.5}}
    
    Tools.extend(this, menu)

    var loadingBar = new PIXI.Graphics()
    loadingBar.lineStyle(3, 0x000000)
    loadingBar.drawRect(menu.width/2-150, 275, 300, 10)
    var bar = new PIXI.NineSlicePlane(new PIXI.Texture.from('ui/9slice/blue.png'))
    bar.x = menu.width/2-150
    bar.y = 275
    bar.width = 300 * (options.progress/options.total)
    bar.height = 10
    loadingBar.addChild(bar)

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'label', {x:menu.width/2, y:175, text:'Loading... Please wait', style:Game.styles.get('menu'), anchor:{x:.5}}),
      new Spirit('ui', 'label', {x:menu.width/2, y:240, text:`${options.verbage || 'Loading:'} ${options.item} ${options.progress}/${options.total} ${Math.floor((options.progress/options.total)*100)}%`, style:Game.styles.temp('menu', {fontSize: 16}), anchor:{x:.5}}),
      loadingBar
    )
  },
  step(){
    
  }
})
