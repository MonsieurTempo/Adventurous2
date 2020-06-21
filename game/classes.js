export class Party{
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

export class Monster{
  constructor(id){
    var data = Monsters.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description', 'skills', 'rewards'])
  }
}

export class Class{
  constructor(id){
    var data = Classes.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

export class Skill{
  constructor(id){
    var data = Skills.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

export class Item{
  constructor(id){
    var data = Items.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
  }
}

export class Status{
  constructor(id){
    var data = Statuses.findOne(id)
    this.id = data._id
    Tools.extend(this, data, ['name', 'description'])
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

export class Combat{
  constructor(){
    this.init()
  }
  init(){
    Game.layoutUI('combat')
  }
}

export class Horde{
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

export class Effect{
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
