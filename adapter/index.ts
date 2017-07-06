namespace Browser {
    // 屏幕的方向1：竖屏；一：横屏
    let direction = '1'
    // 设置屏幕的宽高，宽高是设计图的相同。注：该设置是了适配横屏游戏，所以值是相反的
    let width = 1334
    let height = 646
    class BootState extends Phaser.State {
        preload() {
            this.getDirection()
            window.onorientationchange = this.getDirection
            this.game.scale.onOrientationChange.add(function () {
                this.getDirection()
            }, this)
            let game = this.game
            Phaser.World.prototype.displayObjectUpdateTransform = function () {
                if (direction == '1') {
                    game.scale.setGameSize(height, width)
                    this.x = game.camera.y + game.width;
                    this.y = -game.camera.x;
                    this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
                } else {
                    game.scale.setGameSize(width, height)
                    this.x = -game.camera.x;
                    this.y = -game.camera.y;
                    this.rotation = 0;
                }
                PIXI.DisplayObject.prototype.updateTransform.call(this);
            }
        }
        create() {
            this.state.start('play')
        }
        // 获取屏幕的方向1：竖屏；一：横屏
        getDirection() {
            switch (window.orientation) {
                case 0:
                case 180:
                    direction = '1'
                    break;
                case -90:
                case 90:
                    direction = '一'
                    break;
            }
        }
    }
    class PlayState extends Phaser.State {
        preload() {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            this.game.load.image('bg', './assets/bg1.jpg')
            this.game.load.image('mtime', './assets/mtime.png')
        }
        create() {
            this.game.add.sprite(0, 0, 'bg')
            this.game.add.sprite(636, 497, 'mtime')
        }
    }
    class Adapter extends Phaser.Game {
        name: string
        constructor() {
            super(width, height, Phaser.CANVAS, 'game')
            this.state.add('boot', BootState)
            this.state.add('play', PlayState)
            this.state.start('boot')
        }
    }
    new Adapter()
}
