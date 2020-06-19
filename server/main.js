import { Meteor } from 'meteor/meteor'
import '/lib/collections'

Meteor.methods({
  signUp(userInfo){
    return Accounts.createUser(userInfo)
  },
  loadData(){
    console.log(new Character('Sjt43f6bYiuFrfzmp'))
    return new Character('Sjt43f6bYiuFrfzmp')
  }
})

Meteor.publish('user', ()=>Meteor.users.find(Meteor.userId(),{
  fields:{
    username: 1,
    data: 1
  }
}))

Meteor.publish('users', ()=>Meteor.users.find({$or:[{deactivated:{$exists:false}},{deactivated:false}]},{
  sort:{
    username:1
  },
  fields:{
    username:1
  }
}))

Meteor.publish('areas', ()=>Areas.find({},{
  fields:{
    name: 1,
    description: 1,
    subs: 1,
    mode: 1
  }
}))

Meteor.publish('quests', ()=>Quests.find({},{
  fields:{
    name: 1
  }
}))

Meteor.publish('parties', ()=>Parties.find({creator:Meteor.userId()},{
  fields:{
    name: 1,
    mode: 1,
    location: 1,
    leader: 1,
    front: 1,
    back: 1,
    quests: 1
  }
}))

Meteor.publish('characters', ()=>Characters.find({creator:Meteor.userId()},{
  fields:{
    name: 1,
    gender: 1,
    experience: 1,
    class: 1,
    colors: 1,
    gold: 1,
    equipment: 1,
    inventory: 1,
    stats: 1
  }
}))

Meteor.publish('classes', ()=>Classes.find({},{
  fields:{
    name: 1,
    description: 1,
    archetype: 1,
    proficiencies: 1,
    skills: 1
  }
}))

Meteor.publish('skills', ()=>Skills.find({},{
  fields:{
    name:1,
    description: 1,
    duration: 1,
    target: 1,
    phase: 1,
    effect: 1
  }
}))

Meteor.publish('items', ()=>Items.find({},{
  fields:{
    name: 1,
    description: 1,
    type: 1,
    sub: 1,
    price: 1,
    uses: 1,
    duration: 1,
    target: 1,
    phase: 1,
    effect: 1,
    attack: 1
  }
}))

Meteor.publish('statuses', ()=>Statuses.find({},{
  fields:{
    name: 1,
    description: 1,
    duration: 1,
    target: 1,
    phase: 1,
    effect: 1
  }
}))
