import { Spirit } from '../../spirits'
export default options=>({
  init(){
    var menu = {zIndex:10, height:450, width:600}
    menu.x = (Game.app.screen.width-menu.width)/2
    menu.y = (Game.app.screen.height-menu.height)/3
    Tools.extend(this, menu)

    var title = 'Adventurous'

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'label', {x:(menu.width-Tools.textMetrics(title, Game.styles.get('menu')).width)/2, y:10, text:title, style:Game.styles.get('menu')}),
      new Spirit('ui', 'button', {x:(menu.width-200)/2, y:100, width:200, height:50, text:'Play', style:Game.styles.get('menu')}),
      new Spirit('ui', 'button', {x:(menu.width-200)/2, y:200, width:200, height:50, text:'Options', style:Game.styles.get('menu')}),
      new Spirit('ui', 'button', {x:(menu.width-200)/2, y:300, width:200, height:50, text:'Credits', style:Game.styles.get('menu')})
    )
  },
  step(){
    
  }
})