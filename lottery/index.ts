// 用户填写用户信息时，传给接口的值，如："1913"
let rewardId = -1
// 用户的中奖信息，后台数据，1：10话费；2：50话费；3：手机
let userReward = -1
let $: any
let bgMusic
let lotMusic
let soundArr: Phaser.Sound[] = []
let isMute: boolean
// let mOpen: Phaser.Sprite
// let mClose: Phaser.Sprite
interface MyWindow extends Window {
    myFunction(): void;
}
declare var window: MyWindow
namespace Lottery {
    // 拍到多少个西瓜人
    let killCount = 0
    // 屏幕的方向1：竖屏；一：横屏
    let direction = '1'
    // 设置屏幕的宽高，宽高是设计图的相同。注：该设置是了适配横屏游戏，所以值是相反的
    let isOk = false
    let width = 1036
    let height = 640

    // function musicInit() {
    //     mOpen.inputEnabled = true
    //     mOpen.events.onInputDown.add(() => {
    //         mClose.inputEnabled = true
    //         mOpen.inputEnabled = false
    //         mClose.alpha = 1
    //         mOpen.alpha = 0
    //     })
    //     mClose.events.onInputDown.add(() => {
    //         mClose.inputEnabled = false
    //         mOpen.inputEnabled = true
    //         mClose.alpha = 0
    //         mOpen.alpha = 1
    //     })
    // }

    class BootState extends Phaser.State {
        preload() {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            this.getDirection()
            window.onorientationchange = this.getDirection
            this.game.scale.onOrientationChange.add(function () {
                isOk = false
                this.getDirection()
            }, this)
            let game = this.game
            Phaser.World.prototype.displayObjectUpdateTransform = function () {
                if (isOk) {
                    return
                }
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
                isOk = true
            }
        }
        create() {
            document.getElementById('tip').style.display = 'none'
            document.getElementById('game').style.display = 'block'
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
            this.state.start('preload')
        }
        // 获取屏幕的方向1：竖屏；一：横屏
        getDirection() {
            console.log(window.orientation)
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
    class PreloadState extends Phaser.State {
        graphics: Phaser.Graphics
        processText: Phaser.Text
        preload() {
            // window.game1 = this.game
            this.game.stage.backgroundColor = '#11e6cd'
            // this.load.script('zepton', './assets/zepto.min.js')
            // this.load.script('script', './assets/script.js')
            // 加载前期资源
            this.game.load.image('loadMan', './assets/load-man.png')
            this.game.load.image('processWrap', './assets/process-wrap.png')
            // 准备画面
            this.game.load.image('readyBg', './assets/ready-bg.png')
            this.game.load.image('readyOther', './assets/ready-other.png')
            this.game.load.image('readyBtn', './assets/ready-btn.png')
            this.game.load.image('readyBg1', './assets/ready-bg-1.png')
            this.game.load.image('ready1', './assets/ready-1.png')
            this.game.load.image('ready2', './assets/ready-2.png')
            this.game.load.image('ready3', './assets/ready-3.png')
            this.load.audio('readyEnter', './assets/enter.wav')
            // 公共
            this.game.load.spritesheet('number', './assets/number.png', 270 / 10, 29)
            this.game.load.spritesheet('heat', './assets/man-heat.png', 250, 260)
            this.game.load.image('mOpen', './assets/music-open.png')
            this.game.load.image('mClose', './assets/music-close.png')
            // 过渡动画
            this.load.image('transBg', './assets/trans-bg.png')
            this.load.image('trans1', './assets/trans-1.png')
            this.load.image('trans2', './assets/trans-2.png')
            this.load.image('transText', './assets/trans-text.png')
            for (let i = 1; i <= 80; i++) {
                this.load.image('transText' + i, './assets/' + i + '.png')
            }
            this.load.image('transBottom', './assets/trans-bottom.png')
            this.load.image('transWdl', './assets/trans-wdl.png')
            // 开始游戏
            this.game.load.audio('playAudio', './assets/play-audio.mp3')
            this.game.load.audio('playCam', './assets/play-cam.wav')
            this.game.load.image('playBg', './assets/play-bg.png')
            this.game.load.image('playZw', './assets/play-zw.png')
            this.game.load.image('playTip', './assets/play-tip.png')
            this.load.spritesheet('playP1', './assets/play-p1.png', 1968 / 10, 294)
            this.load.spritesheet('playP2', './assets/play-p2.png', 1734 / 10, 256)
            this.load.spritesheet('playP3', './assets/play-p3.png', 1740 / 10, 302)
            this.load.spritesheet('playP4', './assets/play-p4.png', 1610 / 10, 230)
            this.load.spritesheet('playP5', './assets/play-p5.png', 1504 / 9, 286)
            this.load.spritesheet('playP6', './assets/play-p6.png', 1498 / 10, 262)
            this.load.spritesheet('playP7', './assets/play-p7.png', 1942 / 10, 204)
            this.load.spritesheet('playP8', './assets/play-p8.png', 1440 / 10, 274)
            // 失败
            this.game.load.image('failBg', './assets/count-bg.png')
            this.game.load.image('failMan', './assets/fail-man.png')
            this.game.load.image('failBtn', './assets/fail-btn.png')
            this.game.load.image('failTip', './assets/fail-tip.png')
            this.game.load.image('failWrap', './assets/fail-wrap.png')
            this.game.load.audio('failAudio', './assets/fail.wav')
            // 游戏统计
            this.game.load.image('countBg', './assets/count-bg.png')
            this.game.load.image('countTbl', './assets/count-tbl.png')
            this.game.load.image('countBorder', './assets/count-border.png')
            this.game.load.image('countClose', './assets/count-close.png')
            this.game.load.image('countBtn', './assets/count-btn.png')
            this.game.load.image('countMan', './assets/count-man.png')
            this.game.load.image('countWrap', './assets/count-wrap.png')
            // 抽奖
            this.game.load.audio('lotAudio', './assets/lot-audio.mp3')
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
            this.game.load.image('result0', './assets/result-0.png')
            this.game.load.image('result1', './assets/result-1.png')
            this.game.load.image('result2', './assets/result-2.png')
            this.game.load.image('result3', './assets/result-3.png')
            this.game.load.image('resultGxy', './assets/result-gxy.png')
            // this.load.audio('success', './assets/success.mp3')
            this.load.audio('success', './assets/huanhu.wav')
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
            var processWrap
            let lz = 0
            let pz = 0
            let debugTx
            // 加载进度
            this.game.load.onFileComplete.add(function (process, key) {
                // 进度外围
                if (key == 'loadMan') {
                    console.log(1)
                    // 人物
                    var loadMan = this.game.add.sprite(510, 240, 'loadMan')
                    this.add.tween(loadMan).to({ angle: 10 }, 400, "Linear", true, 0, -1).yoyo(true, 400)
                    loadMan.anchor.setTo(0.5)
                    lz = loadMan.z
                    console.log('--loadMan--' + loadMan.z)
                } else if (key == 'processWrap') {
                    console.log(2)
                    // 进度外围
                    processWrap = this.game.add.sprite(518, 320, 'processWrap')
                    processWrap.anchor.setTo(0.5)
                    pz = processWrap.z
                    console.log('--processWrap--' + processWrap.z)
                } else if (key == 'mOpen') {
                    console.log('--------')
                    /* Music */
                    this.time.events.repeat(2000, 1, () => {
                        let mOpen = this.add.sprite(950, 20, 'mOpen')
                        let mClose = this.add.sprite(950, 20, 'mClose')
                        var startAudio = document.getElementById('startAudio')
                        mClose.alpha = 0
                        mOpen.inputEnabled = true
                        mOpen.events.onInputDown.add(() => {
                            mClose.inputEnabled = true
                            mOpen.inputEnabled = false
                            mClose.alpha = 1
                            mOpen.alpha = 0
                            // lotMusic.mute = true
                            startAudio.muted = true
                            isMute = true
                        })
                        mClose.events.onInputDown.add(() => {
                            mClose.inputEnabled = false
                            mOpen.inputEnabled = true
                            mClose.alpha = 0
                            mOpen.alpha = 1
                            // lotMusic.mute = false
                            startAudio.muted = false
                            isMute = false
                        })
                    }, this)
                    /* Music */
                } else {
                    this.graphics = this.game.add.graphics(0, 0)
                    this.graphics.beginFill(0xffbd05)
                    // process = 10
                    if (process < 10) {
                        process = 10
                    }
                    if (debugTx) {
                        debugTx.kill()
                    }
                    // debugTx = this.add.text(100, 100, 'lz:' + lz + '  pz:' + pz)
                    if (processWrap && (lz > pz)) {
                        lz = 0
                        pz = 1
                        processWrap.bringToTop()
                    }
                    if (lz == 0 && pz >= 1) {
                        let width = 460 * (process / 100)
                        // let width = 100
                        this.graphics.drawRoundedRect(288, 305, width, 30, 50)
                        // rect.bringToTop()
                        // this.graphics.drawCircle(302, 320, 30)
                        if (this.processText) {
                            this.processText.kill()
                        }
                        this.processText = this.game.add.text(518, 324, '0%', style)
                        this.processText.anchor.set(0.5)
                        this.processText.text = process + '%'
                        this.processText.bringToTop()
                        // this.game.world.bringToTop(this.processText)
                        // if (process == 100) {
                        //     let txt = this.add.text(400, 498, '点击屏幕继续游戏...', { fill: 'white', fontSize: 28 })
                        //     this.add.tween(txt).to({
                        //         alpha: 0
                        //     }, 1500, "Linear", true, 0, -1, true)
                        // }
                    }
                }

            }, this)
        }
        create() {
            // this.game.input.enabled = true
            // this.game.input.onDown.add(() => {
            //     this.game.state.start('ready')
            // }, this)
            this.game.state.start('trans')
            // mOpen = this.add.sprite(950, 20, 'mOpen')
            // mOpen.alpha = 0
            // mClose = this.add.sprite(950, 20, 'mClose')
            // mClose.alpha = 0
            // alert($)
            // this.game.state.start('ready')
            // this.game.state.start('count')
            // this.game.state.start('trans')
            // this.game.state.start('play')
            // this.game.state.start('fail')
            // this.game.state.start('lottery')
            // this.game.state.start('result')
            // this.game.state.start('ready')
            // this.game.state.start('contact')
        }
    }
    // 过渡动画
    class TranState extends Phaser.State {
        create() {
            // lotMusic = this.add.audio('lotAudio')
            // lotMusic.play()
            this.add.sprite(0, 0, 'transBg')
            let trans2 = this.add.sprite(207, 92, 'trans2')
            this.add.tween(trans2).from({
                x: 1000,
                y: 1000, alpha: 0
                // }, 1500, Phaser.Easing.Bounce.Out, true)
            }, 1500, Phaser.Easing.Bounce.Out, true)
            // let _this = this
            // window.setTimeout(function () {

            //     // let text = _this.add.sprite(201, 223, 'transText')
            //     // _this.add.tween(text).from({ x: -1000 }, 500, Phaser.Easing.Linear.None, true)
            //     // for (var i = 1; i <= 80; i++) {
            //     //     _this
            //     // }
            //     window.setTimeout(function () {
            //         // _this.state.start('ready')
            //     }, 7000)
            // }, 2000)
            // this.time.events.destroy
            let tm = this.time.events.repeat(2000, 1, function () {
                trans2.kill()
                let trans1 = this.add.sprite(77, 22, 'trans1')
                let tw = this.add.tween(trans1).from({ x: 1000, alpha: 0 }, 500, Phaser.Easing.Linear.None, true)
                let baseX = 157
                let baseY = 218
                let posiX = baseX
                let posiY = baseY
                let i = 1
                tw.onComplete.add(function () {
                    let tm = this.time.events.loop(100, function () {
                        if (i > 80) {
                            if (i == 81) {
                                let btn = this.add.sprite(440, 500, 'transWdl')
                                btn.scale.setTo(0.8)
                                btn.inputEnabled = true
                                btn.events.onInputDown.add(() => {
                                    // lotMusic.destroy()
                                    var startAudio = document.getElementById('startAudio')
                                    startAudio.muted = true
                                    this.state.start('ready')
                                }, this)
                            }
                            return
                        }
                        // if (i == 70) {
                        //     this.add.sprite(255, 418, 'transBottom')
                        // }
                        if (i <= 10) {
                            posiX = baseX + 120 + i * 32
                        } else if (i <= 29) {
                            posiX = baseX + (i - 10) * 32
                        } else if (i <= 48) {
                            posiX = baseX + (i - 29) * 32
                        } else if (i <= 68) {
                            posiX = baseX + (i - 48) * 32
                        } else {
                            posiX = baseX + 100 + (i - 68) * 32
                        }
                        if (i == 11 || i == 30 || i == 49 || i == 69) {
                            posiY += 55
                        }
                        this.add.sprite(posiX, posiY, 'transText' + i)
                        i++
                    }, this)
                }, this)
            }, this)
            /* Music */
            this.time.events.repeat(2000, 1, () => {
                let mOpen = this.add.sprite(950, 20, 'mOpen')
                let mClose = this.add.sprite(950, 20, 'mClose')
                var startAudio = document.getElementById('startAudio')
                if (isMute) {
                    mOpen.alpha = 0
                    mClose.inputEnabled = true
                } else {
                    mClose.alpha = 0
                    mOpen.inputEnabled = true
                }

                mOpen.events.onInputDown.add(() => {
                    mClose.inputEnabled = true
                    mOpen.inputEnabled = false
                    mClose.alpha = 1
                    mOpen.alpha = 0
                    // lotMusic.mute = true
                    startAudio.muted = true
                    isMute = true
                })
                mClose.events.onInputDown.add(() => {
                    mClose.inputEnabled = false
                    mOpen.inputEnabled = true
                    mClose.alpha = 0
                    mOpen.alpha = 1
                    // lotMusic.mute = false
                    startAudio.muted = false
                    isMute = false
                })
            }, this)
            /* Music */
        }
    }
    // 准备
    class ReadyState extends Phaser.State {
        create() {
            this.game.add.sprite(0, 0, 'readyBg1')
            // this.add.sprite(515, 5, 'countMan')
            let man = this.add.sprite(480, 5, 'heat')
            man.scale.setTo(0.9)
            man.animations.add('manHeat', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true).play()
            let readyOther = this.add.sprite(170, 80, 'readyOther')
            readyOther.scale.setTo(0.95)
            let ready1 = this.add.sprite(693, 284, 'ready1')
            this.add.tween(ready1).from({ x: 1466, alpha: 0 }, 500, "Linear", true)
            let shortMusic = this.add.sound('readyEnter').play()
            if (isMute) {
                shortMusic.mute = true
            }
            this.time.events.repeat(100, 1, () => {
                let ready2 = this.add.sprite(132, 400, 'ready2')
                this.add.tween(ready2).from({ x: -100, y: 1000, alpha: 0 }, 500, "Linear", true)
            }, this)
            let ready3 = this.add.sprite(849, 0, 'ready3')
            this.add.tween(ready3).from({ x: -100, y: 1000, alpha: 0 }, 500, "Linear", true)

            let music = this.add.sound('readyEnter').play()
            if (isMute) {
                music.mute = true
            }
            let startBtn = this.game.add.sprite(518, 560, 'readyBtn')
            startBtn.anchor.setTo(0.5)
            startBtn.inputEnabled = true
            let btn = startBtn.events.onInputDown.add(this.play, this)
            this.add.tween(startBtn).to({ alpha: 0 }, 800, "Linear", true, 0, -1, true)
            // let m = new Music()
            // m.init()
        }
        play() {
            var startAudio = document.getElementById('startAudio')
            startAudio.muted = true
            // lotMusic.destroy()
            this.state.start('play')
        }
    }
    // 游戏
    class PlayState extends Phaser.State {
        personGroup: Phaser.Group
        startTm: number
        livingCnt: number
        zw: Phaser.Sprite
        bgPic: Phaser.Sprite
        canPlay: boolean
        create() {
            this.canPlay = true
            this.bgPic = this.add.sprite(0, 0, 'playBg')
            this.add.sprite(408, 608, 'playTip')
            this.add.sprite(0, 0, 'playBg')
            let tip = this.add.sprite(408, 608, 'playTip')
            this.add.tween(tip).to({ alpha: 0 }, 500, "Linear", true, 0, -1).yoyo(true, 500)
            this.personGroup = this.add.physicsGroup(Phaser.Physics.ARCADE)
            this.personGroup.createMultiple(10, ['playP1', 'playP2', 'playP3', 'playP4', 'playP5', 'playP6', 'playP7', 'playP8'])
            this.personGroup.enableBody = true
            // 设置自动销毁 1.超出屏幕 2.
            this.personGroup.setAll('body.collideWorldBounds', false)
            this.personGroup.setAll('body.bounce.x', 1)
            this.personGroup.setAll('body.bounce.y', 1)
            this.personGroup.setAll('outOfBoundsKill', true)
            this.personGroup.setAll('checkWorldBounds', true)

            this.zw = this.add.sprite(480, 491, 'playZw')
            this.zw.inputEnabled = true
            this.zw.events.onInputDown.add(this.countPerson, this)
            let zwTw = this.add.tween(this.zw)
            zwTw.to({ alpha: 0 }, 500, "Linear", true, 0, -1).yoyo(true, 500)
            this.startTm = 0

            /* Music */
            bgMusic = this.add.audio('playAudio')
            bgMusic.play()
            if (isMute) {
                bgMusic.mute = true
            }
            this.time.events.repeat(1200, 1, () => {
                let mOpen = this.add.sprite(950, 20, 'mOpen')
                let mClose = this.add.sprite(950, 20, 'mClose')
                if (isMute) {
                    mOpen.alpha = 0
                    mClose.alpha = 1
                } else {
                    mOpen.alpha = 1
                    mClose.alpha = 0
                }
                mOpen.inputEnabled = true
                mOpen.events.onInputDown.add(() => {
                    mClose.inputEnabled = true
                    mOpen.inputEnabled = false
                    mClose.alpha = 1
                    mOpen.alpha = 0
                    bgMusic.mute = true
                    isMute = true
                })
                mClose.events.onInputDown.add(() => {
                    mClose.inputEnabled = false
                    mOpen.inputEnabled = true
                    mClose.alpha = 0
                    mOpen.alpha = 1
                    bgMusic.mute = false
                    isMute = false
                })
            }, this)
            /* Music */
        }
        update() {
            var now = +(new Date())
            if (this.startTm == 0 || (now - this.startTm) > 400) {
                // var mushroom: Phaser.Sprite = this.personGroup.getFirstExists(false)
                var mushroom: Phaser.Sprite = this.personGroup.getRandom()
                if (!mushroom || !this.canPlay) {
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
            // let tw = this.add.tween(this.bgPic)
            // tw.to({
            //     alpha: 0,
            //     z: -1000,
            //     scale: 0.1
            // }, 1000)
            // tw.start()
            this.addQuake()
            this.canPlay = false
            this.personGroup.setAll('body.velocity.x', 0)
            this.personGroup.setAll('body.velocity.y', 0)
            bgMusic.stop()
            let aud = this.add.audio('playCam')
            aud.play()
            if (isMute) {
                aud.mute = true
            }
            let _this = this
            setTimeout(function () {
                killCount = _this.personGroup.countLiving()
                bgMusic.destroy()
                if (killCount < 5) {
                    _this.state.start('fail')
                } else {
                    _this.state.start('count')
                }
            }, 800)
        }
        addQuake() {
            console.log(this)
            // rumble是隆隆作响的意思，这里rumbleOffset指地震的振幅
            var rumbleOffset = 10;
            // 设置tween的参数
            // var properties = { x: this.camera.x - rumbleOffset };
            var properties = { x: this.camera.x - rumbleOffset, y: this.camera.y - rumbleOffset };
            var duration = 50;
            var repeat = 5;
            var ease = Phaser.Easing.Bounce.InOut;
            var autoStart = false;
            var delay = 0;
            var yoyo = true;
            // 给相机一个动画
            var quake = this.add.tween(this.bgPic).to(properties, duration, ease, autoStart, delay, repeat, yoyo);
            // 完了之后再来，这样就会无限循环
            // quake.onComplete.addOnce(this.addQuake);
            // 开始动画
            quake.start();
        }
        // render() {
        //     // 显示精灵的边界
        //     this.game.debug.spriteBounds(this.zw);
        // }
    }
    // 人数不足时，跳到此页
    class FailState extends Phaser.State {
        create() {
            let music = this.add.audio('failAudio')
            if (!isMute) {
                music.play()
            }
            this.add.sprite(0, 0, 'failBg')
            this.add.sprite(246, 30, 'failWrap')
            let failMan = this.add.sprite(432 + 91, 18 + 111, 'failMan')
            failMan.anchor.setTo(0.5)
            this.add.tween(failMan).to({ angle: 10 }, 400, "Linear", true, 0, -1).yoyo(true, 400)
            this.add.sprite(369, 214, 'failTip')
            this.add.sprite(282 + 30, 335, 'countWrap')
            this.add.sprite(482 + 30, 335, 'number', killCount)
            this.add.text(330, 385, '遗憾与中国移动A3s手机擦肩而过！', { fill: 'white', fontSize: 24 })
            let btn = this.add.sprite(393, 496, 'failBtn')
            btn.inputEnabled = true
            btn.events.onInputDown.add(() => {
                this.state.start('play')
            }, this)
        }
    }
    // 游戏结果统计
    class CountState extends Phaser.State {
        create() {
            let music = this.add.sound('success').play()
            if (isMute) {
                music.mute = true
            }
            this.add.sprite(0, 0, 'countBg')
            let man = this.add.sprite(400, 15, 'heat')
            man.animations.add('manHeat', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true).play()
            this.add.tween(man).from({
                y: -200,
                alpha: 0
            }, 200).start()
            let border = this.add.sprite(244, 253, 'countBorder')
            let tbl = this.add.sprite(381, 220, 'countTbl')
            let close = this.add.sprite(659, 149, 'countClose')
            let lotter = this.add.sprite(341, 510, 'countBtn')
            let radio = killCount > 10 ? Math.round(10 / 11 * 100) : Math.round(killCount / 11 * 100)
            close.inputEnabled = true
            close.events.onInputDown.add(this.close, this)
            lotter.inputEnabled = true
            lotter.events.onInputDown.add(this.lotter, this)
            if (killCount > 9) {
                killCount = 9
            }
            this.add.sprite(482 + 30, 335, 'number', killCount)
            this.add.sprite(282 + 30, 335, 'countWrap')
            // this.add.text(282, 335, '恭喜你共拍到了' + killCount + '个西瓜人！', { fill: '#fff', fontSize: 36 })
            this.add.text(280, 400, '打败了全国 ' + radio + '% 的玩家！您获得了一次抽奖机会！', {
                fill: '#fff', fontSize: 22
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
        durning: number = 500
        endTime: number = 0
        direction: string = 'up'
        result: number = 1
        start: boolean = false
        isNet: boolean = true
        create() {
            this.getResult()
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
            lotMusic = this.add.audio('lotAudio')
            lotMusic.play()
            if (isMute) {
                lotMusic.mute = true
            }
            /* Music */
            this.time.events.repeat(1200, 1, () => {
                let mOpen = this.add.sprite(950, 20, 'mOpen')
                let mClose = this.add.sprite(950, 20, 'mClose')
                if (isMute) {
                    mOpen.alpha = 0
                    mClose.alpha = 1
                } else {
                    mOpen.alpha = 1
                    mClose.alpha = 0
                }
                mOpen.inputEnabled = true
                mOpen.events.onInputDown.add(() => {
                    mClose.inputEnabled = true
                    mOpen.inputEnabled = false
                    mClose.alpha = 1
                    mOpen.alpha = 0
                    lotMusic.mute = true
                    isMute = true
                })
                mClose.events.onInputDown.add(() => {
                    mClose.inputEnabled = false
                    mOpen.inputEnabled = true
                    mClose.alpha = 0
                    mOpen.alpha = 1
                    lotMusic.mute = false
                    isMute = false
                })
            }, this)
            /* Music */
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
                if (this.direction == 'lottery' && this.index == this.result && this.isNet) {
                    console.log(5)
                    this.direction = 'stop'
                    this.start = false

                    let final = this.borderGroup.getAt(this.index)
                    console.log(final)
                    let finalTw = this.add.tween(final)
                    finalTw.to({ alpha: 0 }, 300, "Linear", true, 0, -1).yoyo(true, 300)
                    let _this = this
                    window.setTimeout(function () {
                        _this.result = 0
                        _this.state.start('result')
                    }, 1500)
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
        getResult() {
            let _this = this
            // 是否抽过奖
            // let isLottery = window.localStorage.getItem('lottery')
            let isLottery = false
            if (isLottery) {
                _this.isNet = true
                let arr = [1, 5]
                let rnd = this.rnd.integerInRange(0, 1)
                this.result = arr[rnd]
            } else {
                $.getJSON('http://lf.tongchuangjob.com/Moblie/moblie/getPrize', function (data) {
                    console.log(data)
                    _this.isNet = true
                    window.localStorage.setItem('lottery', "true")
                    if (data.result == 'success') {
                        let value = parseInt(data.value)
                        let rnd = _this.rnd.integerInRange(0, 1)
                        let tenArr = [2, 6]
                        let fifArr = [0, 4]
                        let phoArr = [3, 7]
                        let zerArr = [1, 5]
                        if (value == 1) {
                            _this.result = tenArr[rnd]
                        } else if (value == 2) {
                            _this.result = fifArr[rnd]
                        } else if (value == 3) {
                            _this.result = phoArr[rnd]
                        } else {
                            _this.result = zerArr[rnd]
                        }
                        userReward = value
                        rewardId = data.data
                    } else {
                        _this.result = 1
                        userReward = 0
                    }
                })
            }
        }
    }
    // 抽奖结果
    class ResultState extends Phaser.State {
        create() {
            if (lotMusic) {
                lotMusic.stop()
            }
            this.game.add.sprite(0, 0, 'resultBg')
            this.add.sprite(0, 0, 'countBg')
            // let man = this.add.sprite(444, 15, 'countMan')
            if (userReward == 0 || userReward == -1) {
                let music = this.add.audio('failAudio').play()
                if (isMute) {
                    music.mute = true
                }
                let failMan = this.add.sprite(432 + 91, 18 + 111, 'failMan')
                failMan.anchor.setTo(0.5)
                this.add.tween(failMan).to({ angle: 10 }, 400, "Linear", true, 0, -1).yoyo(true, 400)
            } else {
                // 音效
                let music = this.add.sound('success').play()
                if (isMute || window.isReturn) {
                    music.mute = true
                }
                // 动人
                let man = this.add.sprite(400, 15, 'heat')
                man.animations.add('manHeat', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, true).play()
                this.add.tween(man).from({
                    y: -200,
                    alpha: 0
                }, 200).start()
            }

            let border = this.add.sprite(244, 253, 'countBorder')
            if (direction == '1') {
                this.game.add.sprite(26, 26, 'resultShare')
            } else {
                this.game.add.sprite(791, 26, 'resultShare')
            }
            if (userReward == 0 || userReward == -1) {
                this.add.sprite(381, 220, 'failTip')
            } else {
                this.add.sprite(381, 220, 'resultGxy')
            }

            let reward = this.game.add.sprite(253, 482, 'resultAward')
            let learn = this.game.add.sprite(542, 482, 'resultLearn')
            if (userReward == 0 || userReward == -1) {
                this.game.add.sprite(385, 330, 'result0')
            } else if (userReward < 3) {
                this.game.add.sprite(333, 342, 'result' + userReward)
                // let music = this.add.sound('success').play()
                // if (isMute) {
                //     music.mute = true
                // }
            } else {
                this.game.add.sprite(285, 342, 'result' + userReward)
                // let music = this.add.sound('success').play()
                // if (isMute) {
                //     music.mute = true
                // }
            }
            if (userReward == 0 || userReward == -1 || window.isReturn) {
                reward.alpha = 0
                learn.x = 400
            }
            // close.inputEnabled = true
            // close.events.onInputDown.add(this.close, this)
            reward.inputEnabled = true
            reward.events.onInputDown.add(this.reward, this)
            learn.inputEnabled = true
            learn.events.onInputDown.add(this.learn, this)
            if (window.isReturn) {
                // 重置抽奖结果
                userReward = 0
            }
        }
        close() {
            this.state.start('lottery')
        }
        reward() {
            if (userReward != 0) {
                this.state.start('contact')
            }
        }
        learn() {
            window.location.href = 'https://h5.youzan.com/v2/goods/2oiv48v09uru2'
        }
    }
    class ContactState extends Phaser.State {
        create() {
            window.game1 = this.game
            $('#game').hide()
            $('#contact').show()
        }
    }
    class Lottery extends Phaser.Game {
        constructor() {
            super(width, height, Phaser.CANVAS, 'game')

            this.state.add('boot', BootState)
            this.state.add('preload', PreloadState)
            this.state.add('trans', TranState)
            this.state.add('ready', ReadyState)
            this.state.add('play', PlayState)
            this.state.add('fail', FailState)
            this.state.add('count', CountState)
            this.state.add('lottery', LotteryState)
            this.state.add('result', ResultState)
            this.state.add('contact', ContactState)
            this.state.start('boot')
        }
    }
    new Lottery()
}
