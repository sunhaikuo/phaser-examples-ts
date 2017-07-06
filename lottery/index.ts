namespace Lottery {
    class PreloadState extends Phaser.State {
        graphics: Phaser.Graphics
        processText: Phaser.Text
        preload() {
            // if (window.orientation == 180 || window.orientation == 0) {
            //     this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            // } else if (window.orientation == 90 || window.orientation == -90) {
            //     this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
            // } else {
            //     this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            // }
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
            // 屏幕旋转
            window.onorientationchange = function () {
                // _this.game.state.start('boot')
                window.location.reload()
            }
            this.game.stage.backgroundColor = '#11e6cd'
            // 加载前期资源
            this.game.load.image('loadMan', './assets/load-man.png')
            this.game.load.image('processWrap', './assets/process-wrap.png')
            // 准备画面
            this.game.load.image('readyBg', './assets/ready-bg.png')
            this.game.load.image('readyBtn', './assets/ready-btn.png')
            // 开始游戏
            this.game.load.image('startBg', './assets/start-bg.png')
            // 抽奖
            this.game.load.image('lotBg', './assets/lot-bg.png')
            this.game.load.image('lotKuang', './assets/lot-kuang.png')
            this.game.load.image('lotGetKuang', './assets/lot-get-kuang.png')
            this.game.load.image('lotEmptyKuang', './assets/lot-empty-kuang.png')
            this.game.load.image('lotBtn', './assets/lot-btn.png')
            this.game.load.image('lotTip', './assets/lot-tip.png')
            this.game.load.image('lot1', './assets/lot-1.png')
            this.game.load.image('lot2', './assets/lot-2.png')
            this.game.load.image('lot3', './assets/lot-3.png')
            this.game.load.image('lot4', './assets/lot-4.png')
            this.game.load.image('lot5', './assets/lot-1.png')
            this.game.load.image('lot6', './assets/lot-6.png')
            this.game.load.image('lot7', './assets/lot-3.png')
            this.game.load.image('lot8', './assets/lot-4.png')
            // 抽奖结果
            this.game.load.image('resultBg', './assets/result-bg.png')
            this.game.load.image('resultAward', './assets/result-award.png')
            this.game.load.image('resultClose', './assets/result-close.png')
            this.game.load.image('resultLearn', './assets/result-learn.png')
            this.game.load.image('resultShare', './assets/result-share.png')
            this.game.load.image('resultSj', './assets/result-sj.png')
            this.game.load.image('result0', './assets/result-0.png')
            this.game.load.image('result10', './assets/result-10.png')
            this.game.load.image('result50', './assets/result-50.png')
            // 联系方式
            this.game.load.image('contactBg', './assets/contact-bg.png')
            this.game.load.image('contactClose', './assets/contact-close.png')
            this.game.load.image('contactConfirm', './assets/contact-confirm.png')
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
                this.graphics.drawRoundedRect(0, 285, width, 30, 18)
                this.processText.text = process + '%'
                this.game.world.bringToTop(this.processText)
            }, this)
        }
        create() {
            this.game.state.start('lottery')
        }
    }
    class ReadyState extends Phaser.State {
        create() {
            this.game.add.sprite(0, 0, 'readyBg')
            var startBtn = this.game.add.sprite(this.game.width / 2, 560, 'readyBtn')
            startBtn.anchor.setTo(0.5)
        }
    }
    class PlayState extends Phaser.State {
        create() {
            console.log("--crate")
        }
    }
    class LotteryState extends Phaser.State {
        lotGetKuang: Phaser.Sprite
        posiArr: any[] = new Array()
        currentTime: number = 0
        index: number = 0
        initInter: number = 100
        minInter: number = 40
        maxInter: number = 200
        durning: number = 1000
        endTime: number = 0
        direction: string = 'up'
        result: number = 4
        start: boolean = false
        create() {
            this.game.add.sprite(0, 0, 'lotBg')
            this.game.add.sprite(78, 43, 'lotKuang')
            this.game.add.sprite(654, 236, 'lotTip')
            // this.game.add.sprite(277, 252, 'lotBtn')
            this.game.add.sprite(144, 109, 'lotEmptyKuang')
            for (let i = 0; i < 8; i++) {
                let posi: any = {}
                if (i == 0) {
                    posi = { x: 144, y: 109 }
                } else if (i == 1) {
                    posi = { x: 280, y: 109 }
                } else if (i == 2) {
                    posi = { x: 415, y: 109 }
                } else if (i == 3) {
                    posi = { x: 415, y: 252 }
                } else if (i == 4) {
                    posi = { x: 415, y: 394 }
                } else if (i == 5) {
                    posi = { x: 280, y: 394 }
                } else if (i == 6) {
                    posi = { x: 144, y: 394 }
                } else if (i == 7) {
                    posi = { x: 144, y: 252 }
                }
                this.posiArr.push(posi)
            }
            for (let i = 0; i < 8; i++) {
                let posi: any = this.posiArr[i]
                this.game.add.sprite(posi.x, posi.y, 'lotEmptyKuang')
                this.game.add.sprite(posi.x, posi.y, 'lot' + (i + 1))
            }
            this.lotGetKuang = this.game.add.sprite(-300, -300, 'lotGetKuang')
            // this.game.add.sprite(144, 109, 'lot11')
            // this.game.add.sprite(144, 109, 'lot1')
            // this.game.add.sprite(280, 109, 'lot2')
            // this.game.add.sprite(415, 109, 'lot3')
            // this.game.add.sprite(415, 252, 'lot4')
            // this.game.add.sprite(144, 394, 'lot5')
            // this.game.add.sprite(280, 394, 'lot6')
            // this.game.add.sprite(415, 394, 'lot7')
            // this.game.add.sprite(144, 252, 'lot8')
            // this.game.world.bringToTop(this.lotGetKuang)
            var btn = this.game.add.button(277, 252, 'lotBtn', this.lottery, this)
        }
        update() {
            var now = +(new Date())
            if (this.start && this.posiArr && this.posiArr.length == 8 && now - this.currentTime > this.initInter) {
                this.result = Math.floor(this.result)
                if (this.result < 0 || this.result > 7) {
                    this.start = false
                    return
                }
                if (this.direction == 'up') {
                    console.log(1)
                    this.initInter -= 5
                }
                if (this.direction == 'up' && this.initInter <= this.minInter) {
                    console.log(2)
                    this.direction = 'ease'
                    if (this.endTime == 0) {
                        this.endTime = +(new Date()) + this.durning
                    }
                }
                if ((this.direction == 'ease' || this.direction == 'down') && (this.endTime - now <= 0)) {
                    console.log(3)
                    this.direction = 'down'
                    this.initInter += 5
                }
                if ((this.initInter >= this.maxInter) && this.direction == 'down') {
                    console.log(4)
                    this.direction = 'lottery'
                }
                if (this.direction == 'lottery' && this.index == this.result) {
                    console.log(5)
                    this.direction = 'stop'
                    this.start = false
                }

                var posi = this.posiArr[this.index]
                this.lotGetKuang.reset(posi.x, posi.y)
                this.index++;
                if (this.index > 7) {
                    this.index = 0
                }
                this.currentTime = +(new Date())
            }
        }
        lottery() {
            this.start = true
        }
    }
    class ResultState extends Phaser.State {
        create() {
            this.game.add.sprite(0, 0, 'resultBg')
            this.game.add.sprite(791, 26, 'resultShare')
            this.game.add.sprite(659, 150, 'resultClose')
            this.game.add.sprite(253, 482, 'resultAward')
            this.game.add.sprite(542, 482, 'resultLearn')
            this.game.add.sprite(385, 330, 'result0')
        }
    }
    class ContactState extends Phaser.State {
        create() {
            this.game.add.sprite(0, 0, 'contactBg')
            this.game.add.sprite(760, 56, 'contactClose')
            this.game.add.sprite(409, 413, 'contactConfirm')
        }
    }
    class Lottery extends Phaser.Game {
        name: string
        constructor() {
            let docEle = document.documentElement
            // alert(docEle.clientWidth)
            super(1036, 640, Phaser.AUTO, 'game')
            this.state.add('boot', PreloadState)
            this.state.add('preload', PreloadState)
            this.state.add('ready', ReadyState)
            this.state.add('play', PlayState)
            this.state.add('lottery', LotteryState)
            this.state.add('result', ResultState)
            this.state.add('contact', ContactState)
            this.state.start('boot')
        }
    }

    new Lottery()
}
