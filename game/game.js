import PIXI from 'pixi.js'
import './update'
import { Spirit } from './spirits'

Game = {
  state: false,
  fullScreen: document.fullscreenElement || document.webkitFullscreenElement,
  targetWidth: 1920,
  targetHeight: 1080,
  spirits: [],
  logs: [],
  loader: PIXI.Loader.shared,
  textures: {},
  styles: {
    menu: new PIXI.TextStyle({
      name: 'menu',
      fill: "white",
      fontFamily: "Verdana",
      strokeThickness: 1
    }),
    icon: new PIXI.TextStyle({
      name: 'icon',
      fill: 0xFF0000,
      fontFamily: 'Font Awesome 5 Duotone',
      fontWeight: 900
    }),
    log: new PIXI.TextStyle({
      name: 'log',
      fill: 'white',
      fontSize: 20,
      fontFamily: 'verdana'
    }),
    get(name, clone = false){
      return clone ? this[name].clone() : this[name]
    },
    temp(name, changes){
      var tempStyle = this[name].clone()
      Tools.extend(tempStyle, changes)

      return tempStyle
    }
  },
  init(){
    this.app = new PIXI.Application({width:this.targetWidth, height:this.targetHeight, transparent:true, antialias:true})
    this.stage = this.app.stage
    this.stage.interactive = true
    this.resize()
    $('#Home').append(this.app.view)
    Session.set('fps', 0)
    window.requestAnimationFrame(GameLoop)
    this.resize()
    loadAssets()
    // this.layoutUI('combat')
    window.addEventListener('resize', this.resize)
  },
  units(units = 0, to){
    if(to == 'px'){
      return {
        h: units * ($('#UIOverlay').innerWidth()/Game.app.screen.width),
        v: units * ($('#UIOverlay').innerHeight()/Game.app.screen.height)
      }
    }
  },
  layoutUI(mode, info){
    Game.layout = mode
    for(var spirit of this.spirits.filter(a=>a.layer == 'ui')){
      spirit.remove()
    }
    switch(mode){
      case 'combat':
        // console.log(info)
        Game.background = new Spirit('ui', 'img', {src:'areas/inn.jpg', width:Game.app.screen.width, height:'auto'})
        this.stage.addChild(Game.background, new Spirit('ui', 'bottom'))
      break
      default:
        this.stage.addChild(new Spirit('ui', mode, info))
    }
  },
  initCombat(info){
    this.layoutUI('combat', info)
  },
  resize(){
    if(!Game.focus){
      Session.set('screenSize', `${$('html').innerWidth()} X ${$('html').innerHeight()}`)
      var fs = document.fullscreenElement || document.msFullScreenElement
      var shortSide = $('#Home').innerWidth() < $('#Home').innerHeight() ? 'Width' : 'Height'
      var grow = ((($('#Home').innerWidth()*9)/$('#Home').innerHeight())/9)*Game.targetHeight
      if(fs){
        Game.app.renderer.resize(shortSide == 'Width' ? Game.targetHeight : Math.floor(grow), Game.targetHeight)
        $('#Home canvas').css({width:'100vw', height:`${$('#Home')[`inner${shortSide}`]()}px`, border:'1px solid white'})
      }else{
        Game.app.renderer.resize(Game.targetWidth, Game.targetHeight)
        $('#Home canvas').css({width:'80%', height:'auto', border:'1px solid black'})
      }
      if($('#Home canvas').offset()){
        $('#UIOverlay').offset({left:$('#Home canvas').offset().left})
      }
      $('#UIOverlay').innerWidth(Math.ceil($('#Home canvas').innerWidth()))
      $('#UIOverlay').innerHeight(Math.ceil($('#Home canvas').innerHeight()))

      for(var spirit of Game.spirits.filter(a=>a.resize)){
        spirit.resize()
      }
    }else{
      delete Game.focus
    }
  },
  currentParty(newParty, callback){
    if(newParty){
      Meteor.call('setParty', newParty, (err, res)=>{
        if(err){
          console.log(err)
        }else if(callback){
          callback(new Party(Meteor.user().party))
        }
      })
    }else{
      return Meteor.user().party ? new Party(Meteor.user().party) : false
    }
  }
}

function loadAssets(){
  Game.layoutUI('loading', {progress:0, total:1})
  Meteor.call('readAssets', (err, res)=>{
    if(err){
      console.log('LOAD ASSETS ERROR:', err)
    }else{
      var total = 0
      var loaded = 0
      var target = ''
      function readAssets(asset, depth){
        for(var file of asset.files){
          Game.loader.add(`${target.split('/')[1]}-${file}`.replace(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i, ''), `${target}/${file}`)
          total++
        }
        delete asset.files
        for(var [a, b] of Object.entries(asset)){
          target = target.split('/')
          target[depth+1] = a
          target = target.join('/')
          readAssets(b, depth+1)
        }
      }
      readAssets(res, 0)
      Game.loader.onProgress.add((loader, resource)=>{
        Game.textures[resource.name] = resource.texture
        loaded++
        Game.layoutUI('loading', {verbage:'Loading Texture:', item:resource.name, progress:loaded, total:total})
        if(loaded == total){
          Game.layoutUI('mainMenu')
        }
      })
      Game.loader.load()
    }
  })
}

// Belongs in credits: MM