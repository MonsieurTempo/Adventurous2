import PIXI from 'pixi.js'
export default options=>({
    init(){
        var btn = new PIXI.NineSlicePlane(new PIXI.Texture.from(options.texture || '/ui/9slice/blue.png'))
        Tools.extend(btn, options, ['width', 'height'])
        var lbl = new PIXI.Text(options.text, options.style)
        lbl.x = (options.width-Tools.textMetrics(options.text, options.style).width)/2,
        lbl.y = (options.height-Tools.textMetrics(options.text, options.style).height)/2
        this.addChild(btn, lbl)
    },
    step(){

    }
})
