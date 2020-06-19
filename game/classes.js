export class Party{
  constructor(id){
    var data = Parties.findOne(id)
    console.log(data)
    this.id = data._id
    Tools.extend(this, data, ['name', 'mode'])
    this.location = new Area(data.location)
    this.leader = new Character(data.leader)
    this.front = data.front.map(a=>new Character(a))
    this.back = data.back.map(a=>new Character(a))
  }
}

export class Character{
  constructor(id){
    var data = Characters.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'gender', 'experience', 'colors', 'gold', 'stats'])
    this.class = Classes.findOne(data.class)
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

}

export class Class{
  constructor(id){
    var data = Classes.findOne(id)
    this.id = data._id
    Tools.extend(this, data)
  }
}

export class Skill{
  constructor(id){
    var data = Skills.findOne(id)
    this.id = data._id
    Tools.extend(this, data)
  }
}

export class Item{
  constructor(id){
    var data = Items.findOne(id)
    this.id = data._id
    Tools.extend(this, data)
  }
}

export class Status{
  constructor(id){
    var data = Statuses.findOne(id)
    this.id = data._id
    Tools.extend(this, data)
  }
}

export class Area{
  constructor(id){
    var data = Areas.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description', 'background'])
    if(data.subs){
      this.subs = data.subs.map(a=>new Area(a))
    }
  }
}
