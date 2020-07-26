import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10, x:Game.app.screen.width/2, y:Game.app.screen.height/3, height:450, width:600, anchor:{x:.5, y:.5}}
    
    Tools.extend(this, menu)

    this.addChild(
      new Spirit('ui', 'pane', {width:menu.width, height:menu.height}),
      new Spirit('ui', 'label', {x:menu.width/2, y:10, text:'Adventurous', style:Game.styles.get('menu'), anchor:{x:.5}}),
      new Spirit('ui', 'button', {x:(menu.width-200)/2, y:100, width:200, height:50, text:'Play', style:Game.styles.get('menu')}, {pressed(){
        if(Parties.find().fetch().length){
          Game.layoutUI('partySelect')
          // if(Parties.find().fetch().length > 1){// Allow autoload if one party. settings?
          // }else{
          //   Game.layoutUI(Game.currentParty(Parties.findOne()._id).mode)
          // }
        }else{
          Game.layoutUI('partyCreate')
        }
      }}),
      new Spirit('ui', 'button', {x:(menu.width-200)/2, y:200, width:200, height:50, text:'Options', style:Game.styles.get('menu')}, {pressed(){
        Game.layoutUI('options')
      }}),
      new Spirit('ui', 'button', {x:(menu.width-200)/2, y:300, width:200, height:50, text:'Credits', style:Game.styles.get('menu')}, {pressed(){
        console.log('go to credits')
      }})
    )
  },
  step(){
    
  }
})
