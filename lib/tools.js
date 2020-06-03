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
  }
}

for(var helper in Tools){
  Template.registerHelper(helper, Tools[helper])
}
