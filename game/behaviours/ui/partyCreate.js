import { Spirit } from '../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10, height:660, width:960}
    Tools.extend(this, menu)

    var title = 'Create a party:'

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'label', {x:(menu.width-Tools.textMetrics(title, Game.styles.get('menu')).width)/2, y:10, text:title, style:Game.styles.get('menu')}),
      new Spirit('ui', 'button', {x:10, y:10, width:100, height:50, text:'Back', style:Game.styles.get('menu')}, {pressed(){
        Game.layoutUI('partySelect')
      }}),
    )
    
  },
  step(){
    
  }
})
