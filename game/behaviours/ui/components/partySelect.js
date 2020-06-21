import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10, height:660, width:960}
    Tools.extend(this, menu)

    var title = 'Select a party:'

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
      new Spirit('ui', 'button', {x:800, y:550, width:150, height:50, text:'New Party', style:Game.styles.get('menu')}, {pressed(){
        Game.layoutUI('partyCreate')
      }}),
    )
    var y = 30
    Parties.find().fetch().map((party, i)=>{
      this.addChild(
        new Spirit('ui', 'button', {x:(Math.floor(i%6)*160)+10, y:(Math.floor(i/6)*110)+75, width:150, height:100}, {pressed(){
          Game.currentParty(party._id)
          Game.layoutUI(Game.currentParty().mode)
          console.log('load party:', Game.currentParty())
        }}),
        new Spirit('ui', 'label', {x:(Math.floor(i%6)*160)+85, y:(Math.floor(i/6)*110)+80, text:party.name, style:Game.styles.get('menu'), anchor:{x:.5}}),
      )
    })
  },
  step(){
    
  }
})
