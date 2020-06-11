import PIXI from 'pixi.js'
export default (options, events)=>({
    init(){
        var btn = new PIXI.NineSlicePlane(new PIXI.Texture.from(options.texture || '/ui/9slice/blue.png'))
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
        btn.on('pointertap', (e)=>{
            btn.tint = 0xAAAAAA
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
