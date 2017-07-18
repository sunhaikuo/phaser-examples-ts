var game = new Phaser.Game(240, 400, Phaser.AUTO, 'game')

window.onorientationchange = function () {
    game.state.start('boot')
}


function getOri() {
    if (window.orientation == 180 || window.orientation == 0) {
        return 'v'
    }
    if (window.orientation == 90 || window.orientation == -90) {
        return 'h'
    }
}

// 初始化设置
var boot = {
    preload: function () {
        game.load.image('preload', './assets/preloader.gif')
        var ori = getOri()
        if (ori == 'v') {
            game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
        } else if (ori == 'h') {
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        }

        // if (!game.device.desktop) {
        //     // EXACT_FIT为满屏 SHOW_ALL为只适配宽度, 不拉伸
        //     // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT
        //     game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        // }
    },
    create: function () {
        game.state.start('load')
    }
}



// 加载资源
var load = {
    preload: function () {
        game.load.image('background', 'assets/bg1-h.jpg')
        game.load.image('copyright', 'assets/bg2-h.jpg')
    },
    create: function () {
        game.state.start('over')
    }
}

var start = {
    create: function () {
        // 版权
        game.add.sprite(0, 0, 'background')
        game.add.sprite(12, game.height - 16, 'copyright')
        // 飞机
        var myplane = game.add.sprite(game.width / 2, game.height / 2 - 100, 'myplane')
        myplane.anchor.set(0.5)
        myplane.animations.add('fly')
        myplane.animations.play('fly', 10, true)
        // 开始
        var playBtn = game.add.button(game.width / 2, game.height / 2, 'startbutton', this.play, this, 1, 1, 0)
        playBtn.anchor.set(0.5)
    },
    play: function () {
        console.log('play')
        game.state.start('play')
    }
}

// 游戏中
var play = {
    create: function () {

    }
}

game.state.add('boot', boot)
game.state.add('load', load)
game.state.start('boot')