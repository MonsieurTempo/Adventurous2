export class Party{
  constructor(id){
    var data = Parties.findOne(id)
    this.id = data._id
    Tools.extend(this, data)
  }
  effect(){
    // provide bonuses based on this.leader.cha()
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
        var s = {value: this.stats[stat]}
        switch(true){
          case s.value <= 3:
          s.level = Math.floor(s.value/1+1)
          case s.value <= 10:
          s.level = Math.floor(s.value/2+2.5)
          case s.value <= 16:
          s.level = Math.floor(s.value/3+4)
          case s.value <= 20:
          s.level = Math.floor(s.value/5+6)
        }
        return s
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
