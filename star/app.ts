class BootState extends Phaser.State {
    preload() {
        this.game.load.image('sky', './assets/sky.png')
        this.game.load.image('star', './assets/star.png')
        this.game.load.image('platform', './assets/platform.png')
        this.game.load.spritesheet('dude', './assets/dude.png', 32, 48)
    }
    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE)
        this.state.start('play')
    }
}
class PlayState extends Phaser.State {
    game: Phaser.Game
    platfoms: Phaser.Group
    stars: Phaser.Group
    sky: Phaser.Sprite
    dude: Phaser.Sprite
    keyboard: Phaser.Keyboard
    scordText: Phaser.Text
    scord: number
    create() {
        this.game.add.sprite(0, 0, 'sky')
        this.platfoms = this.game.add.group()
        this.platfoms.enableBody = true
        let ground: Phaser.Sprite = this.platfoms.create(0, this.game.height - 64, 'platform')
        ground.scale.setTo(2, 1)
        ground.body.immovable = true
        let edge1 = this.platfoms.create(0, 300, 'platform')
        edge1.body.immovable = true
        edge1.scale.setTo(0.5)
        let edge2 = this.platfoms.create(400, 400, 'platform')
        edge2.scale.setTo(1, 0.5)
        edge2.body.immovable = true
        this.stars = this.game.add.group()
        this.stars.enableBody = true
        for (let i = 0; i < 20; i++) {
            let star: Phaser.Sprite = this.stars.create(this.game.rnd.integerInRange(0, this.game.width), 0, 'star')
            star.body.gravity.y = 300
            star.body.bounce.y = 0.2
        }
        // 增加小人
        this.dude = this.game.add.sprite(100, this.game.height - 150, 'dude')
        this.dude.animations.add('left', [0, 1, 2, 3], 10, true)
        this.dude.animations.add('right', [5, 6, 7, 8], 10, true)
        this.game.physics.arcade.enable(this.dude)
        this.dude.body.collideWorldBounds = true
        this.dude.body.gravity.y = 300
        this.dude.body.bounce.y = 0.2
        this.keyboard = this.game.input.keyboard
        // 分数
        this.scord = 0
        this.scordText = this.game.add.text(10, 10, 'Scord:0', { fontSize: '30px', fill: '#fff' })
    }
    update() {
        this.game.physics.arcade.collide(this.stars, this.platfoms)
        this.game.physics.arcade.collide(this.dude, this.platfoms)
        this.game.physics.arcade.collide(this.stars, this.dude, this.dude2star, null, this)
        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.dude.body.velocity.x = 200
            this.dude.animations.play('right')
        } else if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.dude.body.velocity.x = -200
            this.dude.animations.play('left')
        } else {
            this.dude.body.velocity.x = 0
            this.dude.frame = 4
            this.dude.animations.stop()
        }
        if (this.keyboard.isDown(Phaser.Keyboard.UP) && this.dude.body.touching.down) {
            this.dude.body.velocity.y = -350
        }
    }
    dude2star(dude: Phaser.Sprite, star: Phaser.Sprite) {
        star.kill()
        this.scord += 10
        this.scordText.text = 'Scord:' + this.scord
    }
}
class Hello extends Phaser.Game {
    name: string
    constructor() {
        super(800, 600, Phaser.AUTO, 'game')
        this.state.add('boot', BootState)
        this.state.add('play', PlayState)
        this.state.start('boot')
    }
}

new Hello()