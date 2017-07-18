
/* variableStart */
let bg1H: Phaser.Sprite
let bg2H: Phaser.Sprite
let bg3H: Phaser.Sprite
let bg4H: Phaser.Sprite
let rightCircle1: Phaser.Sprite
let startBtn1: Phaser.Sprite
let zero: Phaser.Sprite

interface MyWindow extends Window {
    myFunction(): void;
}
declare var window: MyWindow
class Boot extends Phaser.State {
    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
    }
    create() {
        this.state.start('preload')
    }
}

/* variableEnd */
class PreloadInitState extends Phaser.State {
    preload() {

        console.log(this.game.device)
        /* preloadStart */
        this.load.image('bg1-h', 'assets/bg1-h.jpg')
        this.load.image('bg2-h', 'assets/bg2-h.jpg')
        this.load.image('bg3-h', 'assets/bg3-h.jpg')
        this.load.image('bg4-h', 'assets/bg4-h.jpg')
        this.load.image('right-circle-1', 'assets/right-circle-1.png')
        this.load.image('start-btn-1', 'assets/start-btn-1.png')
        this.load.image('zero', 'assets/zero.png')
        /* preloadEnd */
    }
    create() {
        /* createStart */

        // bg3H = this.add.sprite(0, 0, 'bg3-h')
        // bg4H = this.add.sprite(0, 0, 'bg4-h')
        // rightCircle1 = this.add.sprite(0, 0, 'right-circle-1')
        // startBtn1 = this.add.sprite(0, 0, 'start-btn-1')
        // zero = this.add.sprite(0, 0, 'zero')
        /* createEnd */

        window.test = this.game
        this.state.start('s1')
    }
}

class State1 extends Phaser.State {
    create() {
        bg1H = this.add.sprite(0, 0, 'bg1-h')
        rightCircle1 = this.add.sprite(568, 320, 'right-circle-1')
    }
}

class State2 extends Phaser.State {
    create() {
        bg2H = this.add.sprite(0, 0, 'bg2-h')
    }
}

class Test extends Phaser.Game {
    constructor() {
        // let width = document.body.clientHeight * 2
        // let height = document.body.clientWidth * 2
        let width = document.body.clientWidth * 2
        let height = document.body.clientHeight * 2
        // alert(width + '---' + height)
        // let width = '100%'
        // let height = '100%'
        super(width, height, Phaser.CANVAS, 'game')
        this.state.add('preload', PreloadInitState)
        this.state.add('boot', Boot)
        this.state.add('s1', State1)
        this.state.add('s2', State2)
        this.state.start('boot')
    }
}
new Test()
