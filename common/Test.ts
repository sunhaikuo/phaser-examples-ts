import { BootInitState } from './BootInitState'
class Test extends Phaser.Game {
    constructor() {
        let width = 1334
        let height = 646
        let boot = new BootInitState(width, height)
        super(width, height, Phaser.AUTO, 'game')
        this.state.add('boot', boot)
        this.state.start('boot')
    }
}

new Test()