import {Meteor} from 'meteor/meteor'
import '/lib/collections'

Meteor.methods({
  signUp(userInfo){
    return Accounts.createUser(userInfo)
  }
})

Meteor.publish('users', function(){
  return Meteor.users.find({$or:[{deactivated:{$exists:false}},{deactivated:false}]},{
    sort:{
      username:1
    },
    fields:{
      username:1
    }
  })
})

Meteor.publish('loggedUser', function(id){
  return Meteor.users.findOne(id,{
    fields:{
      username:1,
      party:1
    }
  })
})