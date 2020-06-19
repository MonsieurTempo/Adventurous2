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