namespace Lottery {
    class PreloadState extends Phaser.State {
        graphics: Phaser.Graphics
        processText: Phaser.Text
        preload() {
            if (window.orientation == 180 || window.orientation == 0) {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            } else if (window.orientation == 90 || window.orientation == -90) {
                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
            } else {
                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            }
            // 屏幕旋转
            window.onorientationchange = function () {
                // _this.game.state.start('boot')
                window.location.reload()
            }
            this.game.stage.backgroundColor = '#11e6cd'
            // 加载前期资源
            this.game.load.image('loadMan', './assets/load-man.png')
            this.game.load.image('processWrap', './assets/process-wrap.png')
            // 开始画面
            this.game.load.image('startBg', './assets/start-bg.png')
            this.game.load.image('startBtn', './assets/start-btn.png')

            // 进度文字
            let style = {
                font: "18px Arial",
                fill: "#000000",
                wordWrap: true,
                align: "center"
            }
            this.processText = this.game.add.text(this.game.width / 2, this.game.height / 2, '0%', style)
            this.processText.anchor.set(0.5)
            // 加载进度
            this.game.load.onFileComplete.add(function (process, key) {
                // 进度外围
                var processWrap
                if (key == 'loadMan') {
                    // 人物
                    var loadMan = this.game.add.sprite(this.game.width / 2, 230, 'loadMan')
                    loadMan.anchor.setTo(0.5)
                } else if (key == 'processWrap') {
                    // 进度外围
                    processWrap = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'processWrap')
                    processWrap.anchor.setTo(0.5)
                }
                this.graphics = this.game.add.graphics(0, 0)
                this.graphics.beginFill(0xffbd05, 1)
                let width = 464 * (process / 100)
                this.graphics.drawRoundedRect(this., 285, width, 30, 18)
                this.processText.text = process + '%'
                this.game.world.bringToTop(this.processText)
            }, this)
        }
        create() {



            // 进入加载画面
            // this.game.state.start('preload')
        }
    }
    class PlayState extends Phaser.State {
        create() {
            console.log("--crate")
        }
    }
    class Lottery extends Phaser.Game {
        name: string
        constructor() {
            let docEle = document.documentElement
            // alert(docEle.clientWidth)
            super(docEle.clientWidth * 2, docEle.clientHeight * 2, Phaser.AUTO, 'game')
            this.state.add('boot', PreloadState)
            this.state.add('preload', PreloadState)
            this.state.add('play', PlayState)
            this.state.start('boot')
        }
    }

    new Lottery()
}
