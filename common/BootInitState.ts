// 设置屏幕的宽高，宽高是设计图的相同。注：该设置是了适配横屏游戏，所以值是相反的
let width
let height
// 屏幕的方向1：竖屏；一：横屏
let direction
// 画面是否正确
let isOk = false
export class BootInitState extends Phaser.State {

    constructor(w, h) {
        super()
        width = w
        height = h
    }
    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
        this.getDirection()
        window.onorientationchange = this.getDirection
        this.game.scale.onOrientationChange.add(function () {
            isOk = false
            this.getDirection()
        }, this)
        Phaser.World.prototype.displayObjectUpdateTransform = this.renderTransform
    }
    renderTransform() {
        if (isOk) {
            return
        }
        // console.log('this.game.camera.y:', this.game.camera.y, 'this.game.camera.x:', this.game.camera.x, 'this.game.width:', this.game.width)
        let _this_: any = this
        if (direction == '1') {
            this.game.scale.setGameSize(height, width)
            _this_.x = this.game.camera.y + this.game.width;
            _this_.y = -this.game.camera.x;
            _this_.rotation = Phaser.Math.degToRad(Phaser.Math.wrapAngle(90));
        } else {
            _this_.game.scale.setGameSize(width, height)
            _this_.x = -this.game.camera.x;
            _this_.y = -this.game.camera.y;
            _this_.rotation = 0;
        }
        PIXI.DisplayObject.prototype.updateTransform.call(this)
        isOk = true
    }
    create() {
        // 下一个游戏场景必须为preload
        console.log('---游戏设置成功！！')
        this.state.start('preload')
    }
    // 获取屏幕的方向1：竖屏；一：横屏
    getDirection() {
        if (window.orientation == 0 || window.orientation == 180) {
            direction = '1'
        } else {
            direction = '一'
        }
    }
}