
import { BootInitState } from '../common/BootInitState'
class PreloadInitState extends Phaser.State {
    preload() {
        // preloadStart
        this.load.image('contact-bg', 'assets/contact-bg.png')
        this.load.image('contact-border', 'assets/contact-border.png')
        this.load.image('contact-dz-1', 'assets/contact-dz-1.png')
        // preloadEnd
        console.log('-----preload')
    }
    create() {
        // createStart
        // this.add.sprite(0, 0, 'contact-bg')
        // this.add.sprite(0, 0, 'contact-border')
        // this.add.sprite(0, 0, 'contact-dz-1')
        // createEnd
        console.log('-----create')
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
