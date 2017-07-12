
import { BootInitState } from '../common/BootInitState'
class PreloadInitState extends Phaser.State {
    preload() {
        // preloadStart
        this.load.image('bg1-h', 'assets/bg1-h.jpg')
        this.load.image('bg2-h', 'assets/bg2-h.jpg')
        this.load.image('bg3-h', 'assets/bg3-h.jpg')
        this.load.image('bg4-h', 'assets/bg4-h.jpg')
        // preloadEnd
    }
    create() {
        // createStart
        // let bg1H: Phaser.Sprite = this.add.sprite(0, 0, 'bg1-h')
        // let bg2H: Phaser.Sprite = this.add.sprite(0, 0, 'bg2-h')
        // let bg3H: Phaser.Sprite = this.add.sprite(0, 0, 'bg3-h')
        // let bg4H: Phaser.Sprite = this.add.sprite(0, 0, 'bg4-h')
        // createEnd
        this.state.start('s1')
    }
}
class State1 extends Phaser.State {
    distance: number
    diffTime: number
    startX: number
    endX: number
    startTm: number
    endTm: number
    create() {
        let bg1H: Phaser.Sprite = this.add.sprite(0, 0, 'bg1-h')
        this.game.input.onDown.add(this.touchDown, this)
        this.game.input.onUp.add(this.touchUp, this)
    }
    touchDown(pointer, touch) {
        this.startTm = +(new Date())
        this.startX = touch.pageX
    }
    touchUp(pointer, touch) {
        this.endTm = +(new Date())
        this.endX = touch.pageX
        this.distance = this.endX - this.startX
        this.diffTime = this.endTm - this.startTm
        let speed = (this.distance / this.diffTime)
        console.log('distance:', this.distance, 'speed:', speed)
        if (Math.abs(speed) > 1.5) {
            this.state.start('s2')
        }
    }
}

class State2 extends Phaser.State {
    create() {
        let bg2H: Phaser.Sprite = this.add.sprite(0, 0, 'bg2-h')
    }
}
class State3 extends Phaser.State {
    create() {
        let bg3H: Phaser.Sprite = this.add.sprite(0, 0, 'bg3-h')
    }
}
class State4 extends Phaser.State {
    create() {
        let bg4H: Phaser.Sprite = this.add.sprite(0, 0, 'bg4-h')
    }
}
class Farm extends Phaser.Game {
    constructor() {
        let boot = new BootInitState(1334, 646)
        super(1334, 646, Phaser.CANVAS, 'game')
        this.state.add('boot', boot)
        this.state.add('preload', PreloadInitState)
        this.state.add('s1', State1)
        this.state.add('s2', State2)
        this.state.add('s3', State3)
        this.state.add('s4', State4)
        this.state.start('boot')
    }
}
new Farm()
