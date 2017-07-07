namespace TextSpace {
    class PlayState extends Phaser.State {
        group: Phaser.Group
        star: Phaser.Sprite
        platfrom: Phaser.Sprite
        dude: Phaser.Sprite
        preload() {
            this.game.load.image('platform', './assets/platform.png')
            this.game.load.image('dude', './assets/dude.png')
            this.game.load.image('star', './assets/star.png')
        }
        create() {
            this.group = this.add.group()
            this.platfrom = this.group.create(100, 100, 'platform')
            this.platfrom.scale.setTo(0.1, 1)
            this.dude = this.group.create(140, 100, 'dude')
            this.dude.scale.setTo(2)
            this.star = this.group.create(180, 100, 'star')
            this.star.scale.setTo(6)
            this.star.inputEnabled = true
            this.dude.inputEnabled = true
            this.platfrom.inputEnabled = true
            this.star.events.onInputDown.add(this.click)
            this.dude.events.onInputDown.add(this.click)
            this.platfrom.events.onInputDown.add(this.click)
            // 增加提示
            let tip: Phaser.Sprite = this.add.text(this.game.width / 2, this.game.height / 2, '点击每个Sprite会提高层级', { fill: '#fff' })
            tip.anchor.setTo(0.5)
        }
        update() {
            this.group.sort()
            this.game.debug.text('platfrom:' + this.platfrom.z, 10, 10)
            this.game.debug.text('dude:' + this.dude.z, 10, 30)
            this.game.debug.text('star:' + this.star.z, 10, 50)
        }
        click(sprite) {
            sprite.z = 100
        }
        render() {

        }
    }
    class VideoState extends Phaser.State {
        create() { }
    }
    class Text extends Phaser.Game {
        name: string
        constructor() {
            super(800, 600, Phaser.AUTO, 'game')
            this.state.add('play', PlayState)
            this.state.start('play')
        }
    }

    new Text()
}
