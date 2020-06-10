import PIXI from 'pixi.js'
import { Spirit } from '../../spirits'
export default options=>({
  init(){
    var menu = {zIndex:10, height:450, width:600}
    menu.x = (Game.app.screen.width-menu.width)/2
    menu.y = (Game.app.screen.height-menu.height)/3
    Tools.extend(this, menu)

    var title = 'Adventurous'

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height, texture:'ui/9slice/blue.png'}),
      new Spirit('ui', 'label', {x:(menu.width-Tools.textWidth(title, 'menu'))/2, y:10, text:title, style:Game.styles.get('menu')})
    )
  },
  step(){
    
  }
})