import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    var menu = {zIndex:10}
    Tools.extend(this, menu)

    this.addChild(
      new Spirit('ui', 'bottom'),
      new Spirit('ui', 'label', {x:100, y:100, text:'\uf6d5', style:Game.styles.get('icon')})
    )
  },
  step(){
    
  }
})
