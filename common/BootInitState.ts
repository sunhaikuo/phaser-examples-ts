
export class BootInitState extends Phaser.State {
    // 设置屏幕的宽高，宽高是设计图的相同。注：该设置是了适配横屏游戏，所以值是相反的
    width: number
    height: number
    // 屏幕的方向1：竖屏；一：横屏
    direction: string
    constructor(width, height) {
        super()
        this.width = width
        this.height = height
    }
    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
        this.getDirection()
        window.onorientationchange = this.getDirection
        this.game.scale.onOrientationChange.add(function () {
            this.getDirection()
        }, this)
        let game = this.game
        Phaser.World.prototype.displayObjectUpdateTransform = function () {
            if (this.direction == '1') {
                game.scale.setGameSize(this.height, this.width)
                this.x = game.camera.y + game.width;
                this.y = -game.camera.x;
                this.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
            } else {
                game.scale.setGameSize(this.width, this.height)
                this.x = -game.camera.x;
                this.y = -game.camera.y;
                this.rotation = 0;
            }
            PIXI.DisplayObject.prototype.updateTransform.call(this);
        }
    }
    create() {
        // 下一个游戏场景必须为preload
        console.log('---游戏设置成功！！')
        this.state.start('preload')
    }
    // 获取屏幕的方向1：竖屏；一：横屏
    getDirection() {
        switch (window.orientation) {
            case 0:
            case 180:
                this.direction = '1'
                break;
            case -90:
            case 90:
                this.direction = '一'
                break;
        }
    }
}