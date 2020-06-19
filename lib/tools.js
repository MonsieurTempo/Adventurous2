import PIXI from 'pixi.js'
Tools = {
  capitalize(a){
    return a.charAt(0).toUpperCase() + a.slice(1)
  },
  is(a, b){
    return a === b
  },
  get(a){
    if(a.includes('.')){
      b = a.split('.')
      return Session.get(b[0])[b[1]]
    }else{
      return Session.get(a)
    }
  },
  log(a){
    console.log(a)
  },
  extend(obj1, obj2, keys){
    for(var key of (keys || Object.keys(obj2))){
      if(obj2[key] && key != '_id'){
        switch(key){
          case 'z':
            obj1.zIndex = obj2.z
          break;
          default:
            obj1[key] = obj2[key]
        }
      }
    }
  },
  checkImage(src, callback){
    var img = new Image()
    img.onload = callback
    img.onerror = callback
    img.src = src
  },
  textMetrics(text, style, wrap = false){
    return PIXI.TextMetrics.measureText(text, style, wrap)
  }
}

for(var helper in Tools){
  Template.registerHelper(helper, Tools[helper])
}
