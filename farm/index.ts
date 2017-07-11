
import { BootInitState } from '../common/BootInitState'
class PreloadInitState extends Phaser.State {
    preload() {
        // preloadStart
        this.load.image('contact-bg', 'assets/contact-bg.png')
        this.load.image('contact-border', 'assets/contact-border.png')
        this.load.image('contact-dz4', 'assets/contact-dz4.png')
        // preloadEnd
    }
    create() {
        // createStart
        // let contactBg: Phaser.Sprite = this.add.sprite(0, 0, 'contact-bg')
        // let contactBorder: Phaser.Sprite = this.add.sprite(0, 0, 'contact-border')
        // let contactDz4: Phaser.Sprite = this.add.sprite(0, 0, 'contact-dz4')
        // createEnd
    }
}
class Farm extends Phaser.Game {
    constructor() {
        let boot = new BootInitState(1334, 646)
        super(1334, 646, Phaser.CANVAS, 'game')
        this.state.add('boot', boot)
        this.state.add('preload', PreloadInitState)
        this.state.start('boot')
    }
}
new Farm()
