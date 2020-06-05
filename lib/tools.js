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
        obj1[key] = obj2[key]
      }
    }
  }
}

for(var helper in Tools){
  Template.registerHelper(helper, Tools[helper])
}
