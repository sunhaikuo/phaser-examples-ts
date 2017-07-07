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
            this.game.load.image('playBg', './assets/play-bg.png')
            this.game.load.image('playZw', './assets/play-zw.png')
            this.game.load.image('playTip', './assets/play-tip.png')
            this.load.spritesheet('playP1', './assets/play-p1.png', 200, 320)
            this.load.spritesheet('playP2', './assets/play-p2.png', 1734 / 10, 256)
            this.load.spritesheet('playP3', './assets/play-p3.png', 1694 / 10, 256)
            this.load.spritesheet('playP4', './assets/play-p4.png', 1610 / 10, 230)
            this.load.spritesheet('playP5', './assets/play-p5.png', 1658 / 10, 284)
            this.load.spritesheet('playP6', './assets/play-p6.png', 1498 / 10, 262)
            this.load.spritesheet('playP7', './assets/play-p7.png', 1942 / 10, 204)
            this.load.spritesheet('playP8', './assets/play-p8.png', 1394 / 10, 286)
            // 游戏统计
            this.game.load.image('countBg', './assets/count-bg.png')
            this.game.load.image('countClose', './assets/count-close.png')
            this.game.load.image('countBtn', './assets/count-btn.png')
            // 抽奖
            this.game.load.image('lotBg', './assets/lot-bg.png')
            this.game.load.image('lotKuang', './assets/lot-kuang.png')
            this.game.load.spritesheet('lotBorder', './assets/lot-border.png', 126, 134)
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
                let width = 460 * (process / 100)
                this.graphics.drawRoundedRect(288, 305, width, 30, 16)
                if (this.processText) {
                    this.processText.kill()
                }
                this.processText = this.game.add.text(this.game.width / 2, this.game.height / 2, '0%', style)
                this.processText.anchor.set(0.5)
                this.processText.text = process + '%'
                // this.game.world.bringToTop(this.processText)
            }, this)
        }
        create() {
            this.game.state.start('count')
        }
    }
    // 准备
    class ReadyState extends Phaser.State {
        create() {
            this.game.add.sprite(0, 0, 'readyBg')
            let startBtn = this.game.add.sprite(this.game.width / 2, 560, 'readyBtn')
            startBtn.anchor.setTo(0.5)
            startBtn.inputEnabled = true
            startBtn.events.onInputDown.add(this.play, this)
        }
        play() {
            this.state.start('play')
        }
    }
    // 游戏
    class PlayState extends Phaser.State {
        personGroup: Phaser.Group
        startTm: number
        livingCnt: number
        zw: Phaser.Sprite
        create() {
            this.add.sprite(0, 0, 'playBg')
            this.zw = this.add.sprite(480, 491, 'playZw')
            this.zw.inputEnabled = true
            this.zw.events.onInputDown.add(this.countPerson, this)
            this.add.sprite(408, 608, 'playTip')
            this.personGroup = this.add.physicsGroup(Phaser.Physics.ARCADE)
            this.personGroup.createMultiple(10, ['playP2', 'playP3', 'playP4', 'playP5', 'playP6', 'playP7', 'playP8'])
            this.personGroup.enableBody = true
            // 设置自动销毁 1.超出屏幕 2.
            this.personGroup.setAll('body.collideWorldBounds', false)
            this.personGroup.setAll('body.bounce.x', 1)
            this.personGroup.setAll('body.bounce.y', 1)
            this.personGroup.setAll('outOfBoundsKill', true)
            this.personGroup.setAll('checkWorldBounds', true)
            this.startTm = 0
        }
        update() {
            var now = +(new Date())
            if (this.startTm == 0 || (now - this.startTm) > 400) {
                // var mushroom: Phaser.Sprite = this.personGroup.getFirstExists(false)
                var mushroom: Phaser.Sprite = this.personGroup.getRandom()
                if (!mushroom) {
                    return
                }
                mushroom.scale.setTo(0.8)
                let ani = mushroom.animations.add('p1', [0, 1, 2, 3, 4, 5, 6, 7, 8], 20, true)
                ani.play()
                // var spriteSize = mushroom.width
                var spriteSize = 0
                var maxY = this.game.height - spriteSize
                var maxX = this.game.width - spriteSize
                var edge = [{
                    x: -spriteSize,
                    y: this.game.rnd.integerInRange(0, maxY)
                }, {
                    x: this.game.width + spriteSize,
                    y: this.game.rnd.integerInRange(0, maxY)
                }, {
                    x: this.game.rnd.integerInRange(0, maxX),
                    y: -spriteSize
                }, {
                    x: this.game.rnd.integerInRange(0, maxX),
                    y: this.game.height + spriteSize
                }]
                var rnIndex = this.game.rnd.integerInRange(0, edge.length - 1)
                var x = edge[rnIndex].x
                var y = edge[rnIndex].y
                var speedX = this.game.rnd.integerInRange(50, 200)
                var speedY = this.game.rnd.integerInRange(50, 200)
                var middleX = x > this.game.width / 2 ? true : false
                var middleY = y > this.game.height / 2 ? true : false
                if (rnIndex == 0) {
                    speedX = speedX * 1
                    if (middleY) {
                        speedY = speedY * -1
                    } else {
                        speedY = speedY * 1
                    }
                } else if (rnIndex == 1) {
                    speedX = speedX * -1
                    if (middleY) {
                        speedY = speedY * -1
                    } else {
                        speedY = speedY * 1
                    }
                } else if (rnIndex == 2) {
                    speedY = speedY * 1
                    if (middleX) {
                        speedX = speedX * -1
                    } else {
                        speedX = speedX * 1
                    }
                } else if (rnIndex == 3) {
                    speedY = speedY * -1
                    if (middleX) {
                        speedX = speedX * -1
                    } else {
                        speedX = speedX * 1
                    }
                }
                this.livingCnt = this.personGroup.countLiving()
                // console.log(this.personGroup.countLiving())
                mushroom.reset(x, y)
                // mushroom.scale.setTo(0.3)
                this.game.physics.arcade.enable(mushroom)
                mushroom.body.velocity.x = speedX
                mushroom.body.velocity.y = speedY
                this.startTm = +(new Date())
            }
            this.game.physics.arcade.collide(this.personGroup)
        }
        countPerson() {
            this.state.start('count')
        }
    }
    // 游戏结果统计
    class CountState extends Phaser.State {
        create() {
            this.add.sprite(0, 0, 'countBg')
            let close = this.add.sprite(659, 149, 'countClose')
            let lotter = this.add.sprite(341, 510, 'countBtn')
            close.inputEnabled = true
            close.events.onInputDown.add(this.close, this)
            lotter.inputEnabled = true
            lotter.events.onInputDown.add(this.lotter, this)
            this.add.text(282, 345, '恭喜你共拍到了12个西瓜人！', { fill: '#fff', fontSize: 36 })
            this.add.text(319, 392, '打败了全国90%的玩家！您获得了一次抽奖机会！', {
                fill: '#fff', fontSize: 18
            })
        }
        close() {
            this.state.start('play')
        }
        lotter() {
            this.state.start('lottery')
        }
    }
    // 抽奖
    class LotteryState extends Phaser.State {
        // lotGetKuang: Phaser.Sprite
        posiArr: any[] = new Array()
        borderGroup: Phaser.Group
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
            this.borderGroup = this.game.add.group()
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
                // let border = this.game.add.sprite(posi.x, posi.y, 'lotBorder', 0)
                // this.borderGroup.add(border)
                let reward: Phaser.Sprite = this.game.add.sprite(posi.x + 63, posi.y + 67, 'lot' + (i + 1))
                reward.anchor.setTo(0.5)
                this.borderGroup.create(posi.x, posi.y, 'lotBorder', 0)
            }
            this.game.add.button(277, 252, 'lotBtn', this.lottery, this)
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
                let current: any = this.borderGroup.getChildAt(this.index)
                current.frame = 1
                let pre: any = this.borderGroup.getChildAt(this.index - 1 < 0 ? 7 : this.index - 1)
                pre.frame = 0
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
    // 抽奖结果
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
        constructor() {
            super(1036, 640, Phaser.CANVAS, 'game')
            this.state.add('boot', PreloadState)
            this.state.add('preload', PreloadState)
            this.state.add('ready', ReadyState)
            this.state.add('play', PlayState)
            this.state.add('count', CountState)
            this.state.add('lottery', LotteryState)
            this.state.add('result', ResultState)
            this.state.add('contact', ContactState)
            this.state.start('boot')
        }
    }
    new Lottery()
}
