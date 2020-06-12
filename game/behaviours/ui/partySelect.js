import { Spirit } from '../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10, height:660, width:960}
    Tools.extend(this, menu)

    var title = 'Select a party:'

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'label', {x:(menu.width-Tools.textMetrics(title, Game.styles.get('menu')).width)/2, y:10, text:title, style:Game.styles.get('menu')}),
      new Spirit('ui', 'button', {x:800, y:550, width:150, height:50, text:'New Party', style:Game.styles.get('menu')}, {pressed(){
        Game.layoutUI('partyCreate')
      }}),
    )
    var y = 30
    Parties.find().fetch().map((party, i)=>{
      this.addChild(
        new Spirit('ui', 'pane', {x:Math.floor(i%6)*160, y:Math.floor(i/6)*110, width:150, height:100}),
        new Spirit('ui', 'label', {x:(menu.width-Tools.textMetrics(title, Game.styles.get('menu')).width)/2, y:10, text:title, style:Game.styles.get('menu')}),
      )
    })
  },
  step(){
    
  }
})
