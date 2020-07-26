import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10, x:Game.app.screen.width/2, y:Game.app.screen.height/3, height:660, width:960, anchor:{x:.5, y:.5}}
    Tools.extend(this, menu)

    var title = 'Options:'

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'label', {x:menu.width/2, y:10, text:title, style:Game.styles.get('menu'), anchor:{x:.5}}),
      new Spirit('ui', 'button', {x:10, y:10, width:100, height:50, text:'Back', style:Game.styles.get('menu')}, {pressed(){
        if(Game.currentParty()){
          Game.layoutUI(Game.currentParty().mode)
        }else{
          Game.layoutUI('mainMenu')
        }
      }}),
    )
  },
  step(){
    
  }
})
