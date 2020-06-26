import PIXI from 'pixi.js'
import { Spirit } from '../../../spirits'
export default (options, events)=>({
  init(){
    this.bottom = new PIXI.Sprite.from('ui/bottom.png')
    this.bottom.texture.baseTexture.on('loaded', ()=>{
      this.resize()
    })

    Game.console = new PIXI.Graphics()
    Game.console.y = Game.app.screen.height
    Game.console.interactive = true

    this.addChild(this.bottom, Game.console)

    var canInteract = false

    Game.console.on('touchmove', (e)=>{
      console.log(e)
    })

    Game.console.on('pointerover', (e)=>{
      console.log('listen to scroll')

    })

    Game.console.on('pointerout', (e)=>{
      console.log('stop listening')
    })

    var parseGuide = {
      party:id=>{
        var party = new Party(id)
        return {text:`{ ${party.name} }`, color:0x34b1eb, callbacks:{
          enter(){
            console.log('open pop-up', party.name)
          },
          leave(){
            console.log('close pop-up', party.name)
          }
        }}
      },
      status:id=>{
        var status = new Status(id)
        return {text:`[ ${status.name} ]`, color:0x1b822c, info:status}
      }
    }

    Game.console.log = (...entries)=>{
      var log = []
      entries.map(entry=>{
        var formattedEntry = []
        var formattedLine = []
        entry.split(/(\[[0-9a-zA-Z_-]*:[^\]-]*]){1}/g).map((part, partIndex)=>{
          var matched = Tools.match(part, /\[(?<type>[0-9a-zA-Z_-]*):(?<text>[^\]-]*)]/g)[0] || false
          var parsedPart = matched ?
            matched.groups.type.match(/0x[0-9a-fA-F]{6}/) ?
              {text:matched.groups.text, color:matched.groups.type} :
              parseGuide[matched.groups.type] ?
                parseGuide[matched.groups.type](matched.groups.text) :
                {text:'ERROR', color:0xFF0000} :
              {text:part}
          parsedPart.text.split(/(?<![{\[])\s(?![}\]])/).map(word=>{
            var parsedWord = {part: partIndex}
            Tools.extend(parsedWord, parsedPart)
            parsedWord.text = word
            if(Tools.textMetrics(formattedLine.map(a=>a.text).concat(word).join(''), Game.styles.get('log')).width <= this.bottomHeight()){
              var lastBox = formattedLine[formattedLine.length-1]
              if(lastBox && lastBox.part == parsedWord.part){
                lastBox.text = lastBox.text.concat(' ', word)
              }else{
                formattedLine.push(parsedWord)
              }
            }else{
              formattedEntry.push(formattedLine)
              formattedLine = [parsedWord]
            }
          })
        })
        formattedEntry.push(formattedLine)
        log.push(formattedEntry)
      })
      Game.logs.push(log)
    }

    Game.console.writeLogs = ()=>{
      while(Game.console.children.length){
        Game.console.children[0].remove()
      }
      var y = 0
      Game.logs.map(log=>{
        log.map(entry=>{
          entry.map(line=>{
            var x = 0
            line.map(word=>{
              var style = Game.styles.temp('log', {fill: word.color})
              Game.console.addChild(new Spirit('ui', 'label', {x:x, y:y, text:word.text, style:style}, word.callbacks || {}))
              x += Tools.textMetrics(word.text, style).width
            })
            y += Tools.textMetrics('', Game.styles.get('log')).height
          })
          y += 10
        })
      })
    }

    Game.console.clear = ()=>{
      Game.logs = []
      while(Game.console.children.length){
        Game.console.children[0].remove()
      }
    }
  },
  step(){
    if(Game.console.children.length < Game.logs.flat(3).length){
      Game.console.writeLogs()
    }
  },
  resize(){
    this.bottom.width = Game.app.screen.width
    this.bottom.height = this.bottomHeight()
    this.bottom.y = Game.app.screen.height - this.bottomHeight()

    if(Game.console.y > Game.app.screen.height - this.bottomHeight()){
      Game.console.y = Game.app.screen.height - this.bottomHeight()
    }
    Game.console.beginFill(0x101010)
    Game.console.lineStyle(5, 0x000000, 1, 0)
    Game.console.drawRect(0, (Game.app.screen.height-Game.console.y)-this.bottomHeight(), this.bottomHeight(), this.bottomHeight())

    Game.console.writeLogs()
  },
  kill(){
    delete Game.console
  },
  bottomHeight(){
    return (Game.app.screen.width * this.bottom.texture.orig.height)/this.bottom.texture.orig.width
  }
})