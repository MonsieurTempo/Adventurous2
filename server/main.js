import { Meteor } from 'meteor/meteor'
import fs from 'fs'
import '/lib/collections'

const path = require('path').resolve('.').split('.meteor')[0]

Meteor.methods({
  signUp(userInfo){
    return Accounts.createUser(userInfo)
  },
  loadAssets(){
    return fs.readdirSync(path+'public', 'utf-8')
  },
  setParty(partyID){
    if(Parties.findOne(partyID)){
      if(Parties.findOne(partyID).creator == Meteor.userId()){
        Meteor.users.update(Meteor.userId(), {$set:{party:partyID}})
      }else{
        throw new Meteor.Error('303', 'Party not owned by user.')
      }
    }else{
      throw new Meteor.Error('404', 'Party not found.')
    }
  },
  explore(action){
    var party = Parties.findOne(Meteor.user().party)
    // authenticate the party
    var coords = {x:party.location.x, y:party.location.y, z:party.location.z}
    switch(action){
      case 'up':
        coords.y++
        break
      case 'down':
        coords.y--
        break
      case 'left':
        coords.x--
        break
      case 'right':
        coords.x++
        break
      case 'descend':
        coords.z++
        break
      case 'ascend':
        coords.z--
      case 'exit':
        break
    }
    if(party.maps[coords.z][coords.x][coords.y] !== null){
      Parties.update(party._id, {$set:{'location.x':coords.x, 'location.y':coords.y}})
      // check if tile has an event or something
      /*
      maps = [
        [
          [{actions:{exit:<AreaID>}}, null, null, null],
          [{encounter:{enemies:[gerbil, gerbilBoss, gerbil], rewards:{items:[], gold:0, exp:0}}}, {}, {flags:['secret']}, {actions:{whisk:1}],
          [null, {actions:{rest:100}}, null, null]
          [{actions:{exit:<AreaID>}}, {}, {}, {actions:{loot:{rewards:{items:[], gold:0, exp:0}}}}]
        ],
        [
          [{actions:{whisk:1}}, null, {actions:{loot:{encounter:{enemies:[mimic, rewards:{items:[], gold:0, exp:0}}}}}, null],
          [{}, null, {}, {actions:{whisk:-1}}],
          [{}, null, null, {}],
          [{}, {}, {}, {}]
        ]
      ]
      */
    }
  },
  startCombat(){

  }
})

Meteor.publish('user', ()=>Meteor.users.find(Meteor.userId(),{
  fields:{
    username: 1,
    party: 1,
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
