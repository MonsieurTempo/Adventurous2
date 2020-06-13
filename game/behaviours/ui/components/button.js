import PIXI from 'pixi.js'
export default (options, events)=>({
    init(){
        // var btn = new PIXI.NineSlicePlane(new PIXI.Texture.from(options.texture || '/ui/9slice/blue.png'))
        var g = new PIXI.Graphics()
        if(options.fill){
            g.beginFill(options.fill.color||0x004e69, options.fill.alpha||1)
        }else{
            g.beginFill(0x004e69)
        }
        if(options.lineStyle){
            g.lineStyle(options.lineStyle.width||1, options.lineStyle.color||0x000000, options.lineStyle.alpha||1)
        }else{
            g.lineStyle(1, 0x000000)
        }
        var btn = g.drawRoundedRect(0, 0, options.width||150, options.height||50, options.radius||10)
        
        btn.interactive = true
        btn.buttonMode = true
        Tools.extend(btn, options, ['width', 'height'])
        var lbl = new PIXI.Text(options.text, options.style)
        lbl.x = (options.width-Tools.textMetrics(options.text, options.style).width)/2,
        lbl.y = (options.height-Tools.textMetrics(options.text, options.style).height)/2

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
