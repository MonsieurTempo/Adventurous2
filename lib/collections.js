// Static:
// Storing functions: https://stackoverflow.com/questions/33284478/store-function-in-database-with-mongodb-in-meteor
Classes = new Mongo.Collection('classes')
Skills = new Mongo.Collection('skills')
Items = new Mongo.Collection('items')
Statuses = new Mongo.Collection('statuses')

// Dynamic:
Areas = new Mongo.Collection('areas')
Quests = new Mongo.Collection('quests')
Parties = new Mongo.Collection('parties')
Characters = new Mongo.Collection('characters')

Collections = {
  Users:Meteor.users,
  Areas:Areas,
  Quests:Quests,
  Parties:Parties,
  Classes:Classes,
  Skills:Skills,
  Items:Items,
  Statuses:Statuses
}

Party = class Party{
  constructor(id){
    var data = Parties.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'mode'])
    this.location = {area:new Area(data.location.area), x:data.location.x, y:data.location.y, z:data.location.z}
    this.leader = new Character(data.leader)
    this.front = data.front.map(a=>new Character(a))
    this.back = data.back.map(a=>new Character(a))
  }
}

Character = class Character{
  constructor(id){
    var data = Characters.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'gender', 'experience', 'colors', 'gold', 'stats'])
    this.class = new Class(data.class)
    this.equipment = data.equipment.map(a=>Items.findOne(a))
    this.inventory = data.inventory.map(a=>Items.findOne(a))
    for(var stat of ['str', 'agi', 'res', 'int', 'wis', 'cha']){
      this[stat] = function(newVal){
        if(newVal){
          this.stats[stat] = newVal
        }
        return {
          value: this.stats[stat],
          level: Math.round((15.4*this.stats[stat])/(this.stats[stat]+12))
        }
      }
    }
  }
  armor(){
    var armor = {}
    armor.base = 0
    armor.bonus = {}
    for(var equip of this.equipment){
      if(equip.stats.armor){
        armor.bonus[equip.id] = equip.stats.armor
      }
    }
    armor.total = armor.base + (Object.values(armor.bonus).length ? Object.values(armor.bonus).length.reduce((a,b)=>a+b) : 0)
    return armor
  }
  criticalChance(){
    return {base: 0, bonus: 0, total: 0}
  }
}

Monster = class Monster{
  constructor(id){
    var data = Monsters.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description', 'skills', 'rewards'])
  }
}

Class = class Class{
  constructor(id){
    var data = Classes.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

Skill = class Skill{
  constructor(id){
    var data = Skills.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

Item = class Item{
  constructor(id){
    var data = Items.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

Status = class Status{
  constructor(id){
    var data = Statuses.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

Area = class Area{
  constructor(id){
    var data = Areas.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description', 'background'])
    if(data.subs){
      this.subs = data.subs.map(a=>new Area(a))
    }
  }
}

Combat = class Combat{
  constructor(){
    this.init()
  }
  init(){
    Game.layoutUI('combat')
  }
}

Horde = class Horde{
  constructor(area, enemies = {}){
    if(enemies.minions){
      // use provided enemies
    }else{
      // get some enemies based on area spawnrates
    }
    if(enemies.boss){
      // it's a big encounter
    }
  }
}

Effect = class Effect{
  constructor(name, targets, duration, init, step){
    this.id = 
    this.name = name
    this.targets = targets// Might need to do some logic to turn 'self' into whoever cast it, or, simply pass that in... Not sure about multi-target
    this.duration = duration
    this.init = ()=>{
      init()
      this.step()
    }
    this.step = ()=>{
      if(this.duration === 0){
        //remove
      }else{
        this.duration--
        step()
      }
    }
  }
}


var schemas = {
  class: `{
    id: <MeteorID>,
    name: String,
    description: String,
    archetype: String,
    proficiencies: {
      weapons: [
        (String | to match with the sub of an item),
        ...
      ],
      armor: {
        head: [
          (String | to match with the sub of an item),
          ...
        ]
        body: [
          (String | to match with the sub of an item),
          ...
        ],
        arms: [
          (String | to match with the sub of an item),
          ...
        ]
      }
    }
    skills: {
      (Number | Level obtained): [
        <SkillID>,
        ...
      ],
      ...
    }
  }`,
  skill: `{
    id: <MeteorID>,
    name: String,
    targets: String,
    duration: Number,
    phase: (String | Represents what phase of combat to be activated on),
    effect(caster, targets, info){
      // Do stuff
    }
  }`,
  item: `{
    id: <MeteorID>,
    type: (String | either weapon, accessory, or the body part),
    sub: String,
    price: {
      buy: function(){
        // Buy price - leader's haggle
      }(),
      sell: function(){
        // Sell price + leader's haggle
      }(),
    },
    effect(caster, targets, info){
      // Do stuff
    }
    stats:{
      (String | stat to affect): (Number | how much to affect it),
      ...
    }
  }`,
  status: `{
    id: <MeteorID>,
    name: String,
    duration: Number,
    phase: (String | Represents what phase of combat to be activated on),
    effect(caster, targets, info){
      // Do stuff
    }
  }`,
  party: `{
    id: <MeteorID>,
    name: String,
    location: {
      area: <AreaID>,
      sub: String || {x: Number, y: Number}
    },
    leader: <CharacterID>,
    front: [
      <CharacterID>,
      ...
    ],
    back: [
      <CharacterID>,
      ...
    ],
    quests: {
      <QuestID>: (String | Quest status)
    }
  }`,
  character: `{
    id: <MeteorID>,
    name: String,
    class: <ClassID>,
    colors: {
      (String | the color's part): (Color | Hex code),
      ...
    }
    stats: {
      str: {
        value: Number,
        level(){
          switch(true){
            case this.value <= 3:
            return Math.floor(stat/1+1)
            case this.value <= 10:
            return Math.floor(stat/2+2.5)
            case this.value <= 16:
            return Math.floor(stat/3+4)
            case this.value <= 20:
            return Math.floor(stat/5+6)
          }
        }
      },
      (... | Same for other stats)
    },
    attributes: {
      (attribute handler functions)
    },
    gold: Number
    equipment: [
      <ItemID>,
      ...
    ]
    inventory: [
      <ItemID>,
      ...
    ]
  }`,
  Area:`{
    id: <MeteorID>,
    name: String,
    description: String,
    background: (String | Url to img),
    subs: [
      <AreaID>,
      ...
    ]
  }`
}