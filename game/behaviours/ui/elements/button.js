import PIXI from 'pixi.js'
export default (options, events)=>({
    init(){
        var btn = new PIXI.Graphics()
        if(options.fill){
            btn.beginFill(options.fill.color||0x004e69, options.fill.alpha||1)
        }else{
            btn.beginFill(0x004e69)
        }
        if(options.lineStyle){
            btn.lineStyle(options.lineStyle.width||1, options.lineStyle.color||0x000000, options.lineStyle.alpha||1)
        }else{
            btn.lineStyle(1, 0x000000)
        }
        btn.drawRoundedRect(0, 0, options.width||150, options.height||50, options.radius||10)
        
        btn.interactive = true
        btn.buttonMode = true
        Tools.extend(btn, options, ['width', 'height'])
        var lbl = new PIXI.Text(options.text, options.style)
        lbl.x = options.width/2
        lbl.y = options.height/2
        lbl.anchor.set(.5, .5)

        btn.on('pointerover', (e)=>{
            btn.tint = 0xAAAAAA
            if(events.enter){
                events.enter(e)
            }
        })
        btn.on('pointerdown', (e)=>{
            btn.tint = 0x888888
        })
        btn.on('pointertap', (e)=>{
            btn.tint = 0xFFFFFF
            if(events.pressed){
                events.pressed(e)
            }
        })
        btn.on('pointerout', (e)=>{
            btn.tint = 0xFFFFFF
            if(events.leave){
                events.leave(e)
            }
        })

        this.addChild(btn, lbl)
    },
    step(){

    }
})
