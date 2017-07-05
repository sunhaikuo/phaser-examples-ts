var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BootState = (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootState.prototype.preload = function () {
        this.game.load.image('sky', './assets/sky.png');
        this.game.load.image('star', './assets/star.png');
        this.game.load.image('platform', './assets/platform.png');
        this.game.load.spritesheet('dude', './assets/dude.png', 32, 48);
    };
    BootState.prototype.create = function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('play');
    };
    return BootState;
}(Phaser.State));
var PlayState = (function (_super) {
    __extends(PlayState, _super);
    function PlayState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayState.prototype.create = function () {
        this.game.add.sprite(0, 0, 'sky');
        this.platfoms = this.game.add.group();
        this.platfoms.enableBody = true;
        var ground = this.platfoms.create(0, this.game.height - 64, 'platform');
        ground.scale.setTo(2, 1);
        ground.body.immovable = true;
        var edge1 = this.platfoms.create(0, 300, 'platform');
        edge1.body.immovable = true;
        edge1.scale.setTo(0.5);
        var edge2 = this.platfoms.create(400, 400, 'platform');
        edge2.scale.setTo(1, 0.5);
        edge2.body.immovable = true;
        this.stars = this.game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 20; i++) {
            var star = this.stars.create(this.game.rnd.integerInRange(0, this.game.width), 0, 'star');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.2;
        }
        // 增加小人
        this.dude = this.game.add.sprite(100, this.game.height - 150, 'dude');
        this.dude.animations.add('left', [0, 1, 2, 3], 10, true);
        this.dude.animations.add('right', [5, 6, 7, 8], 10, true);
        this.game.physics.arcade.enable(this.dude);
        this.dude.body.collideWorldBounds = true;
        this.dude.body.gravity.y = 300;
        this.dude.body.bounce.y = 0.2;
        this.keyboard = this.game.input.keyboard;
        // 分数
        this.scord = 0;
        this.scordText = this.game.add.text(10, 10, 'Scord:0', { fontSize: '30px', fill: '#fff' });
    };
    PlayState.prototype.update = function () {
        this.game.physics.arcade.collide(this.stars, this.platfoms);
        this.game.physics.arcade.collide(this.dude, this.platfoms);
        this.game.physics.arcade.collide(this.stars, this.dude, this.dude2star, null, this);
        if (this.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.dude.body.velocity.x = 200;
            this.dude.animations.play('right');
        }
        else if (this.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.dude.body.velocity.x = -200;
            this.dude.animations.play('left');
        }
        else {
            this.dude.body.velocity.x = 0;
            this.dude.frame = 4;
            this.dude.animations.stop();
        }
        if (this.keyboard.isDown(Phaser.Keyboard.UP) && this.dude.body.touching.down) {
            this.dude.body.velocity.y = -350;
        }
    };
    PlayState.prototype.dude2star = function (dude, star) {
        star.kill();
        this.scord += 10;
        this.scordText.text = 'Scord:' + this.scord;
    };
    return PlayState;
}(Phaser.State));
var Hello = (function (_super) {
    __extends(Hello, _super);
    function Hello() {
        var _this = _super.call(this, 800, 600, Phaser.AUTO, 'game') || this;
        _this.state.add('boot', BootState);
        _this.state.add('play', PlayState);
        _this.state.start('boot');
        return _this;
    }
    return Hello;
}(Phaser.Game));
new Hello();
