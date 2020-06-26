import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10, x:Game.app.screen.width/2, y:Game.app.screen.height/3, height:660, width:960, anchor:{x:.5, y:.5}}
    Tools.extend(this, menu)

    var party = {name:''}

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'button', {x:10, y:10, width:100, height:50, text:'Back', style:Game.styles.get('menu')}, {pressed(){
        if(Game.currentParty()){
          Game.layoutUI(Game.currentParty().mode)
        }else{
          if(Parties.find().fetch().length > 1){
            Game.layoutUI('partySelect')
          }else{
            Game.layoutUI('mainMenu')
          }
        }
      }}),
      new Spirit('ui', 'label', {x:menu.width/2, y:50, text:'Create a party:', style:Game.styles.get('menu'), anchor:{x:.5}}),
      new Spirit('ui', 'label', {x:menu.width/2, y:250, text:'Party Name:', style:Game.styles.get('menu'), anchor:{x:.5}}),
      new Spirit('ui', 'textbox', {x:menu.width/2, y:300, style:Game.styles.temp('menu', {fill:0x000000}), lineStyle:{width:1}, anchor:{x:.5}}, {input(){
        party.name = this.value
      }}),
      new Spirit('ui', 'button', {x:menu.width/2, y:500, width:150, height:50, text:'Create', style:Game.styles.get('menu'), anchor:{x:.5}}, {pressed(){
        console.log(party)
      }}),
      // new Spirit('ui', 'radio', {x:menu.width/2, y:140, group:'gender', text:'Female', style:Game.styles.get('menu')}),
      // new Spirit('ui', 'radio', {x:menu.width/2, y:180, group:'gender', text:'Male', style:Game.styles.get('menu')}),
    )
    
  },
  step(){
    
  }
})
